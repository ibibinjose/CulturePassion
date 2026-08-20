const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3030;

// Serve static files from the public folder
app.use(express.static(path.join(process.cwd(), 'public')));

// Root directory for documents (the current directory)
const DOCS_DIR = process.cwd();

// Directories to ignore during scanning
const IGNORE_DIRS = new Set(['node_modules', '.git', 'public', '.agents', '.gemini']);

/**
 * Recursively scans the directory and returns a structured tree.
 */
function getDocsTree(dirPath, relativeDir = '') {
  const items = [];
  let files;
  
  try {
    files = fs.readdirSync(dirPath);
  } catch (err) {
    console.error(`Error reading directory ${dirPath}:`, err);
    return [];
  }

  // Sort files naturally so "01-business-plan" comes before "02-strategy-framework"
  files.sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));

  for (const name of files) {
    if (name.startsWith('.') || IGNORE_DIRS.has(name)) {
      continue;
    }

    const fullPath = path.join(dirPath, name);
    const relPath = relativeDir ? path.join(relativeDir, name) : name;
    let stat;

    try {
      stat = fs.statSync(fullPath);
    } catch (err) {
      continue;
    }

    if (stat.isDirectory()) {
      const children = getDocsTree(fullPath, relPath);
      // Only include directories if they contain markdown files or subdirectories
      if (children.length > 0) {
        items.push({
          name,
          type: 'directory',
          path: relPath,
          children
        });
      }
    } else if (stat.isFile() && name.endsWith('.md')) {
      items.push({
        name,
        type: 'file',
        path: relPath
      });
    }
  }

  return items;
}

/**
 * Recursively find all markdown files in the directory for full-text search.
 */
function getAllMdFiles(dirPath, relativeDir = '') {
  let list = [];
  let files;
  
  try {
    files = fs.readdirSync(dirPath);
  } catch (err) {
    return [];
  }

  for (const name of files) {
    if (name.startsWith('.') || IGNORE_DIRS.has(name)) {
      continue;
    }

    const fullPath = path.join(dirPath, name);
    const relPath = relativeDir ? path.join(relativeDir, name) : name;
    let stat;

    try {
      stat = fs.statSync(fullPath);
    } catch (err) {
      continue;
    }

    if (stat.isDirectory()) {
      list = list.concat(getAllMdFiles(fullPath, relPath));
    } else if (stat.isFile() && name.endsWith('.md')) {
      list.push({
        name,
        fullPath,
        relPath
      });
    }
  }

  return list;
}

/**
 * Safe file resolver to prevent directory traversal vulnerability.
 */
function safeResolvePath(reqPath) {
  if (!reqPath) return null;
  
  // Resolve path relative to DOCS_DIR
  const resolved = path.resolve(DOCS_DIR, reqPath);
  
  // Ensure the resolved path begins with DOCS_DIR and is a Markdown file
  if (resolved.startsWith(DOCS_DIR) && resolved.endsWith('.md')) {
    return resolved;
  }
  return null;
}

// --- API Endpoints ---

/**
 * GET /api/docs
 * Returns the document tree structure.
 */
app.get('/api/docs', (req, res) => {
  try {
    const tree = getDocsTree(DOCS_DIR);
    res.json(tree);
  } catch (err) {
    console.error('Failed to generate docs tree:', err);
    res.status(500).json({ error: 'Failed to generate document directory structure.' });
  }
});

/**
 * GET /api/docs/content
 * Returns the raw Markdown content of a specific file.
 * Query Param: path (relative path to file)
 */
app.get('/api/docs/content', (req, res) => {
  const relPath = req.query.path;
  const safePath = safeResolvePath(relPath);

  if (!safePath) {
    return res.status(400).json({ error: 'Invalid file path. Traversal blocked or not a markdown file.' });
  }

  if (!fs.existsSync(safePath)) {
    return res.status(404).json({ error: 'Requested file not found.' });
  }

  try {
    const content = fs.readFileSync(safePath, 'utf-8');
    res.json({ path: relPath, content });
  } catch (err) {
    console.error(`Failed to read file ${safePath}:`, err);
    res.status(500).json({ error: 'Failed to read file content.' });
  }
});

/**
 * GET /api/docs/search
 * Full text search across all markdown documents.
 * Query Param: q (search term)
 */
app.get('/api/docs/search', (req, res) => {
  const query = req.query.q;
  if (!query || query.trim().length < 2) {
    return res.json([]);
  }

  const normalizedQuery = query.toLowerCase().trim();
  const files = getAllMdFiles(DOCS_DIR);
  const searchResults = [];

  for (const file of files) {
    try {
      const content = fs.readFileSync(file.fullPath, 'utf-8');
      const lines = content.split(/\r?\n/);
      const matches = [];

      lines.forEach((line, idx) => {
        const lineLower = line.toLowerCase();
        if (lineLower.includes(normalizedQuery)) {
          // Clean up formatting markdown characters from snippet for cleaner display
          const cleanLine = line.replace(/([#*`_\-\[\]()|])/g, '').trim();
          if (cleanLine.length > 0) {
            matches.push({
              lineNumber: idx + 1,
              text: cleanLine
            });
          }
        }
      });

      if (matches.length > 0) {
        // Exclude the path node_modules or public files
        searchResults.push({
          name: file.name,
          path: file.relPath,
          matches: matches.slice(0, 5) // limit matches per file to keep output clean
        });
      }
    } catch (err) {
      console.error(`Failed to search file ${file.fullPath}:`, err);
      // Continue searching other files
    }
  }

  res.json(searchResults);
});

// Serve UI for any other request (SPA routing fallback)
app.get('*', (req, res, next) => {
  // If it looks like an API or asset request, pass it to other handlers
  if (req.path.startsWith('/api') || req.path.includes('.')) {
    return next();
  }
  res.sendFile(path.join(process.cwd(), 'public', 'index.html'));
});

// Start Server or Export for Vercel
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`==================================================`);
    console.log(`📚 CulturePassion Document Reader running!`);
    console.log(`🔗 Web Application: http://localhost:${PORT}`);
    console.log(`==================================================`);
  });
}

module.exports = app;
