// State variables
let activeFilePath = '';
let docsTree = [];
let searchDebounceTimeout = null;
let currentFontSize = 18; // Default reading size in pixels

// Setup marked.js options
marked.setOptions({
  gfm: true,
  breaks: true,
  headerIds: true,
  mangle: false
});

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

/**
 * Initialize application events, UI states, and load the directory tree.
 */
async function initApp() {
  // 1. Initialise Lucide icons
  lucide.createIcons();

  // 2. Load theme preference
  const savedTheme = localStorage.getItem('theme') || 'light-mode';
  document.body.className = savedTheme;

  // 3. Load font size preference
  const savedFontSize = localStorage.getItem('fontSize');
  if (savedFontSize) {
    currentFontSize = parseInt(savedFontSize, 10);
    updateFontSize();
  }

  // 4. Fetch and render document tree
  await fetchDocsTree();

  // 5. Attach event listeners
  setupEventListeners();

  // 6. Handle initial hash routing
  handleHashRouting();
  window.addEventListener('hashchange', handleHashRouting);
}

/**
 * Fetch document tree from API and render in sidebar.
 */
async function fetchDocsTree() {
  const sidebarNav = document.getElementById('sidebarNav');
  try {
    const response = await fetch('/api/docs');
    if (!response.ok) throw new Error('Network response error');
    docsTree = await response.json();
    
    // Render the tree
    sidebarNav.innerHTML = '';
    const rootUl = renderTreeNodes(docsTree);
    sidebarNav.appendChild(rootUl);
    
    // Automatically open active folders in path
    openFoldersForActiveFile();
  } catch (err) {
    console.error('Failed to load document tree:', err);
    sidebarNav.innerHTML = `
      <div class="search-no-results">
        <i data-lucide="alert-triangle" style="width:24px;height:24px;color:var(--alert-warning);margin-bottom:8px;"></i>
        <p>Failed to load files.</p>
        <button onclick="fetchDocsTree()" class="quick-link-btn" style="margin-top:12px;padding:6px 12px;font-size:12px;">Retry</button>
      </div>
    `;
    lucide.createIcons({ attrs: { class: 'meta-icon' } });
  }
}

/**
 * Recursively creates HTML nodes for files and folders.
 */
function renderTreeNodes(nodes, relativePath = '') {
  const ul = document.createElement('ul');
  ul.className = 'tree-list';

  nodes.forEach(node => {
    const li = document.createElement('li');
    li.className = 'tree-item';

    if (node.type === 'directory') {
      li.className += ' tree-folder';
      
      const row = document.createElement('div');
      row.className = 'tree-row';
      row.innerHTML = `
        <span class="folder-icon"><i data-lucide="folder"></i></span>
        <span>${node.name}</span>
        <i class="chevron-icon" data-lucide="chevron-right" style="width:14px;height:14px;"></i>
      `;

      // Expand/Collapse folder on click
      row.addEventListener('click', (e) => {
        e.stopPropagation();
        li.classList.toggle('open');
        const chevron = row.querySelector('.chevron-icon');
        // Update icon state
        if (li.classList.contains('open')) {
          row.querySelector('.folder-icon i').setAttribute('data-lucide', 'folder-open');
        } else {
          row.querySelector('.folder-icon i').setAttribute('data-lucide', 'folder');
        }
        lucide.createIcons();
      });

      li.appendChild(row);

      // Render children nodes
      const childrenUl = renderTreeNodes(node.children, node.path);
      childrenUl.className += ' folder-children';
      li.appendChild(childrenUl);

    } else {
      // File node
      const row = document.createElement('div');
      row.className = 'tree-row';
      row.setAttribute('data-type', 'file');
      row.setAttribute('data-path', node.path);
      row.innerHTML = `
        <span class="folder-icon"><i data-lucide="file-text"></i></span>
        <span>${node.name.replace('.md', '')}</span>
      `;

      // Click to open file
      row.addEventListener('click', (e) => {
        e.stopPropagation();
        window.location.hash = encodeURIComponent(node.path);
      });

      li.appendChild(row);
    }

    ul.appendChild(li);
  });

  return ul;
}

/**
 * Handle routing based on URL hash (e.g. #01-business-plan/01-executive-summary.md)
 */
function handleHashRouting() {
  const hash = window.location.hash.substring(1);
  if (hash) {
    const path = decodeURIComponent(hash);
    loadDocument(path);
  } else {
    // Show welcome view
    showWelcomeView();
  }
}

/**
 * Fetch and display a document's content.
 */
async function loadDocument(filePath) {
  const docBody = document.getElementById('documentBody');
  const docTitle = document.getElementById('documentTitle');
  const readTimeMeta = document.getElementById('readTimeMeta');
  const wordCountMeta = document.getElementById('wordCountMeta');
  
  // Highlight active element in sidebar nav
  document.querySelectorAll('.tree-row[data-type="file"]').forEach(el => {
    if (el.getAttribute('data-path') === filePath) {
      el.classList.add('active');
    } else {
      el.classList.remove('active');
    }
  });

  activeFilePath = filePath;
  openFoldersForActiveFile();

  // Show loading skeleton inside doc area
  docBody.innerHTML = `
    <div class="nav-loading-skeleton" style="padding: 24px 0;">
      <div class="skeleton-line" style="height:32px; width:40%;"></div>
      <div class="skeleton-line" style="height:18px; margin-top:24px;"></div>
      <div class="skeleton-line" style="height:18px;"></div>
      <div class="skeleton-line" style="height:18px;"></div>
      <div class="skeleton-line" style="height:18px; width:80%;"></div>
    </div>
  `;
  docTitle.textContent = filePath.split('/').pop().replace('.md', '');
  
  try {
    const response = await fetch(`/api/docs/content?path=${encodeURIComponent(filePath)}`);
    if (!response.ok) {
      if (response.status === 404) throw new Error('Document not found');
      throw new Error('Could not retrieve file content');
    }
    
    const data = await response.json();
    const markdown = data.content;

    // Render markdown content using marked
    const renderedHtml = marked.parse(markdown);
    docBody.innerHTML = renderedHtml;

    // Post-process HTML: process Alert boxes, generate header anchors, apply styles
    postProcessContent(docBody);

    // Call Prism code syntax highlight
    if (window.Prism) {
      Prism.highlightAllUnder(docBody);
    }

    // Update metadata (words, reading time)
    const wordCount = markdown.split(/\s+/).filter(w => w.length > 0).length;
    const readTime = Math.max(1, Math.round(wordCount / 200)); // assume 200 WPM
    
    wordCountMeta.innerHTML = `<i data-lucide="file-text" class="meta-icon"></i> ${wordCount.toLocaleString()} words`;
    readTimeMeta.innerHTML = `<i data-lucide="clock" class="meta-icon"></i> ${readTime} min read`;

    // Generate Table of Contents
    generateTableOfContents(docBody);

    // Update breadcrumbs
    updateBreadcrumbs(filePath);

    // Re-trigger Lucide icon rendering
    lucide.createIcons();

    // Reset scroll of document view to top
    document.querySelector('.document-view').scrollTop = 0;

  } catch (err) {
    console.error('Failed to load document:', err);
    docTitle.textContent = 'Error Loading File';
    docBody.innerHTML = `
      <div class="welcome-view">
        <div class="welcome-graphic" style="background-color: var(--alert-danger-bg); color: var(--alert-danger);">
          <i data-lucide="alert-triangle"></i>
        </div>
        <h2>Could not load document</h2>
        <p>${err.message || 'An unexpected error occurred while reading the file from the local server.'}</p>
        <button onclick="loadDocument('${filePath}')" class="quick-link-btn"><i data-lucide="rotate-cw"></i> Retry Load</button>
      </div>
    `;
    lucide.createIcons();
  }
}

/**
 * Auto-expand directories containing the selected file.
 */
function openFoldersForActiveFile() {
  if (!activeFilePath) return;
  const pathParts = activeFilePath.split('/');
  let currentAccumulatedPath = '';

  pathParts.forEach((part, index) => {
    // We only need to check directories, so ignore the last file part
    if (index === pathParts.length - 1) return;

    currentAccumulatedPath = currentAccumulatedPath ? `${currentAccumulatedPath}/${part}` : part;
    
    document.querySelectorAll('.tree-folder').forEach(folderNode => {
      const folderRow = folderNode.querySelector('.tree-row');
      if (folderRow && folderNode.querySelector(`.tree-row[data-path="${activeFilePath}"]`) || 
          folderNode.querySelector(`.tree-row[data-path^="${currentAccumulatedPath}/"]`)) {
        folderNode.classList.add('open');
        const folderIcon = folderRow.querySelector('.folder-icon i');
        if (folderIcon) folderIcon.setAttribute('data-lucide', 'folder-open');
      }
    });
  });
  lucide.createIcons();
}

/**
 * Setup layout event bindings.
 */
function setupEventListeners() {
  // Theme Toggle
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  themeToggleBtn.addEventListener('click', () => {
    if (document.body.classList.contains('light-mode')) {
      document.body.classList.replace('light-mode', 'dark-mode');
      localStorage.setItem('theme', 'dark-mode');
    } else {
      document.body.classList.replace('dark-mode', 'light-mode');
      localStorage.setItem('theme', 'light-mode');
    }
  });

  // Text resize
  document.getElementById('btnTextInc').addEventListener('click', () => {
    if (currentFontSize < 26) {
      currentFontSize += 1;
      updateFontSize();
    }
  });

  document.getElementById('btnTextDec').addEventListener('click', () => {
    if (currentFontSize > 14) {
      currentFontSize -= 1;
      updateFontSize();
    }
  });

  // Print button
  document.getElementById('btnPrint').addEventListener('click', () => {
    window.print();
  });

  // Mobile menu controls
  const mobileToggleBtn = document.getElementById('mobileToggleBtn');
  const appSidebar = document.getElementById('appSidebar');
  const sidebarOverlay = document.getElementById('sidebarOverlay');
  const mobileCloseBtn = document.getElementById('mobileCloseBtn');

  const openMobileSidebar = () => {
    appSidebar.classList.add('mobile-open');
    sidebarOverlay.style.display = 'block';
  };

  const closeMobileSidebar = () => {
    appSidebar.classList.remove('mobile-open');
    sidebarOverlay.style.display = 'none';
  };

  mobileToggleBtn.addEventListener('click', openMobileSidebar);
  sidebarOverlay.addEventListener('click', closeMobileSidebar);
  mobileCloseBtn.addEventListener('click', closeMobileSidebar);

  // Search logic
  const searchInput = document.getElementById('searchInput');
  const clearSearchBtn = document.getElementById('clearSearchBtn');
  const searchResultsPanel = document.getElementById('searchResultsPanel');
  const closeSearchPanel = document.getElementById('closeSearchPanel');

  searchInput.addEventListener('input', () => {
    const val = searchInput.value;
    if (val.trim().length > 0) {
      clearSearchBtn.style.display = 'flex';
      debounceSearch(val);
    } else {
      clearSearchBtn.style.display = 'none';
      searchResultsPanel.style.display = 'none';
    }
  });

  clearSearchBtn.addEventListener('click', () => {
    searchInput.value = '';
    clearSearchBtn.style.display = 'none';
    searchResultsPanel.style.display = 'none';
    searchInput.focus();
  });

  closeSearchPanel.addEventListener('click', () => {
    searchResultsPanel.style.display = 'none';
  });

  // Document scroll reading progress & TOC highlight
  const documentView = document.querySelector('.document-view');
  documentView.addEventListener('scroll', () => {
    // 1. Reading progress bar
    const scrollHeight = documentView.scrollHeight - documentView.clientHeight;
    const scrollPct = scrollHeight > 0 ? (documentView.scrollTop / scrollHeight) * 100 : 0;
    document.getElementById('readingProgressBar').style.width = `${scrollPct}%`;

    // 2. Table of Contents active link sync
    syncTableOfContentsActive(documentView.scrollTop);
  });

  // Welcome View Quick Link Buttons delegation
  document.addEventListener('click', (e) => {
    const quickLink = e.target.closest('.quick-link-btn');
    if (quickLink && quickLink.getAttribute('data-path')) {
      window.location.hash = encodeURIComponent(quickLink.getAttribute('data-path'));
    }
  });
}

/**
 * Debounce search input fetches to avoid overload.
 */
function debounceSearch(query) {
  clearTimeout(searchDebounceTimeout);
  searchDebounceTimeout = setTimeout(() => {
    executeSearch(query);
  }, 250);
}

/**
 * Perform API request for search.
 */
async function executeSearch(query) {
  const searchResultsList = document.getElementById('searchResultsList');
  const searchResultsPanel = document.getElementById('searchResultsPanel');

  searchResultsList.innerHTML = '<div class="search-no-results">Searching documentation...</div>';
  searchResultsPanel.style.display = 'flex';

  try {
    const response = await fetch(`/api/docs/search?q=${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error('Search failed');
    const results = await response.json();

    if (results.length === 0) {
      searchResultsList.innerHTML = '<div class="search-no-results">No matches found.</div>';
      return;
    }

    searchResultsList.innerHTML = '';
    results.forEach(result => {
      const item = document.createElement('div');
      item.className = 'search-result-item';
      
      const snippetsHtml = result.matches.map(m => {
        // Highlight query match in HTML snippet safely
        const escapedText = escapeHtml(m.text);
        const queryRegex = new RegExp(`(${escapeRegex(query)})`, 'gi');
        const highlighted = escapedText.replace(queryRegex, '<mark>$1</mark>');
        return `<span class="search-result-snippet">Line ${m.lineNumber}: ${highlighted}</span>`;
      }).join('');

      item.innerHTML = `
        <div class="search-result-title">${result.name.replace('.md', '')}</div>
        <div class="search-result-snippets">${snippetsHtml}</div>
      `;

      item.addEventListener('click', () => {
        searchResultsPanel.style.display = 'none';
        window.location.hash = encodeURIComponent(result.path);
        
        // Mobile layout: close sidebar on result click
        const appSidebar = document.getElementById('appSidebar');
        if (appSidebar.classList.contains('mobile-open')) {
          document.getElementById('sidebarOverlay').click();
        }
      });

      searchResultsList.appendChild(item);
    });
  } catch (err) {
    searchResultsList.innerHTML = `<div class="search-no-results" style="color:var(--alert-danger)">Error: ${err.message}</div>`;
  }
}

/**
 * Update document font size stylesheet variables.
 */
function updateFontSize() {
  document.documentElement.style.setProperty('--doc-font-size', `${currentFontSize}px`);
  localStorage.setItem('fontSize', currentFontSize.toString());
}

/**
 * Reset view when no file is active.
 */
function showWelcomeView() {
  activeFilePath = '';
  document.querySelectorAll('.tree-row[data-type="file"]').forEach(el => el.classList.remove('active'));
  document.getElementById('documentTitle').textContent = 'Select a Document';
  document.getElementById('readTimeMeta').innerHTML = `<i data-lucide="clock" class="meta-icon"></i> 0 min read`;
  document.getElementById('wordCountMeta').innerHTML = `<i data-lucide="file-text" class="meta-icon"></i> 0 words`;
  document.getElementById('breadcrumbs').innerHTML = '<span class="breadcrumb-item">CulturePassion</span>';
  
  document.getElementById('documentBody').innerHTML = `
    <div class="welcome-view">
      <div class="welcome-graphic">
        <i data-lucide="book-open"></i>
      </div>
      <h2>Welcome to the CulturePassion workspace docs</h2>
      <p>Select a file from the sidebar to start reading, or search for keywords to find relevant sections across business plans, strategy, marketing, outreach, and grants.</p>
      <div class="quick-links">
        <button class="quick-link-btn" data-path="brain.md">
          <i data-lucide="brain"></i> View Platform Brain
        </button>
        <button class="quick-link-btn" data-path="01-business-plan/01-executive-summary.md">
          <i data-lucide="sparkles"></i> Read Executive Summary
        </button>
      </div>
    </div>
  `;
  
  // Table of Contents clear
  const tocList = document.getElementById('tocList');
  tocList.innerHTML = '<li class="toc-empty">No active document</li>';
  
  lucide.createIcons();
}

/**
 * Breadcrumbs utility.
 */
function updateBreadcrumbs(filePath) {
  const container = document.getElementById('breadcrumbs');
  container.innerHTML = '';
  
  // Root link
  const rootSpan = document.createElement('a');
  rootSpan.className = 'breadcrumb-item';
  rootSpan.href = '#';
  rootSpan.textContent = 'CulturePassion';
  container.appendChild(rootSpan);

  const parts = filePath.split('/');
  parts.forEach((part, index) => {
    const separator = document.createElement('span');
    separator.className = 'breadcrumb-separator';
    separator.innerHTML = '&nbsp;/&nbsp;';
    container.appendChild(separator);

    const item = document.createElement('span');
    item.className = 'breadcrumb-item';
    
    if (index === parts.length - 1) {
      item.textContent = part.replace('.md', '');
    } else {
      item.textContent = part;
    }
    container.appendChild(item);
  });
}

/**
 * Generate anchors and table of contents sidebar.
 */
function generateTableOfContents(containerNode) {
  const tocList = document.getElementById('tocList');
  tocList.innerHTML = '';
  
  const headers = containerNode.querySelectorAll('h1, h2, h3');
  if (headers.length === 0) {
    tocList.innerHTML = '<li class="toc-empty">No headings in this document</li>';
    return;
  }

  headers.forEach((header, idx) => {
    // Generate safe unique ID based on header text
    const text = header.textContent.trim();
    const id = slugify(text) + '-' + idx;
    header.id = id;

    const li = document.createElement('li');
    li.className = 'toc-item';
    
    // Depth mapping: h1 -> depth 1, h2 -> depth 2, h3 -> depth 3
    const depth = header.tagName === 'H1' ? 1 : header.tagName === 'H2' ? 2 : 3;
    li.setAttribute('data-depth', depth);

    const a = document.createElement('a');
    a.className = 'toc-link';
    a.href = `#${id}`;
    a.textContent = text;
    
    // Smooth scroll event
    a.addEventListener('click', (e) => {
      e.preventDefault();
      header.scrollIntoView({ behavior: 'smooth' });
    });

    li.appendChild(a);
    tocList.appendChild(li);
  });
}

/**
 * Sync TOC active anchor based on page vertical scrolling.
 */
function syncTableOfContentsActive(scrollTop) {
  const headers = Array.from(document.querySelectorAll('#documentBody h1, #documentBody h2, #documentBody h3'));
  if (headers.length === 0) return;

  const buffer = 100; // scroll offset buffer in px
  let activeId = '';

  for (let i = 0; i < headers.length; i++) {
    const header = headers[i];
    const rect = header.getBoundingClientRect();
    const docViewRect = document.querySelector('.document-view').getBoundingClientRect();
    const relativeTop = rect.top - docViewRect.top;

    if (relativeTop <= buffer) {
      activeId = header.id;
    } else {
      break;
    }
  }

  // If no header matches, fallback to first header if we scrolled near top
  if (!activeId && headers.length > 0 && scrollTop < 150) {
    activeId = headers[0].id;
  }

  // Highlight matching TOC link
  document.querySelectorAll('.toc-link').forEach(link => {
    if (link.getAttribute('href') === `#${activeId}`) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/**
 * Processes post-marked markdown rendering.
 * Handlers: HTML sanitisation/filtering details and custom github alert blockquotes conversion.
 */
function postProcessContent(containerNode) {
  // Convert standard Github alert formats inside blockquotes into stylized boxes
  const quotes = containerNode.querySelectorAll('blockquote');
  
  quotes.forEach(quote => {
    const innerHtml = quote.innerHTML.trim();
    // Match patterns like > [!NOTE], [!TIP], etc.
    const alertMatch = innerHtml.match(/^<p>\s*\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]/i);
    
    if (alertMatch) {
      const type = alertMatch[1].toUpperCase();
      let alertClass = 'alert ';
      let iconName = 'info';
      let titleText = 'Note';
      
      switch(type) {
        case 'NOTE':
          alertClass += 'alert-note';
          iconName = 'info';
          titleText = 'Note';
          break;
        case 'TIP':
          alertClass += 'alert-tip';
          iconName = 'sparkles';
          titleText = 'Tip';
          break;
        case 'IMPORTANT':
          alertClass += 'alert-important'; // styles map to warning/note custom props
          iconName = 'alert-circle';
          titleText = 'Important';
          break;
        case 'WARNING':
          alertClass += 'alert-warning';
          iconName = 'alert-triangle';
          titleText = 'Warning';
          break;
        case 'CAUTION':
          alertClass += 'alert-danger';
          iconName = 'zap';
          titleText = 'Caution';
          break;
      }
      
      // Clean off the tag token "[!NOTE]" from blockquote HTML
      let cleanHtml = innerHtml.replace(/^<p>\s*\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\](<br>|\s)*/i, '<p>');
      
      // Re-structure node
      quote.className = alertClass;
      quote.innerHTML = `
        <div class="alert-title">
          <i data-lucide="${iconName}" class="meta-icon"></i>
          <span>${titleText}</span>
        </div>
        <div class="alert-content">${cleanHtml}</div>
      `;
    }
  });
}

// --- Helper Functions ---

function slugify(text) {
  return text.toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function escapeHtml(string) {
  const matchHtmlRegExp = /["'&<>]/;
  const str = '' + string;
  const match = matchHtmlRegExp.exec(str);

  if (!match) {
    return str;
  }

  let escape;
  let html = '';
  let index = 0;
  let lastIndex = 0;

  for (index = match.index; index < str.length; index++) {
    switch (str.charCodeAt(index)) {
      case 34: // "
        escape = '&quot;';
        break;
      case 38: // &
        escape = '&amp;';
        break;
      case 39: // '
        escape = '&#39;';
        break;
      case 60: // <
        escape = '&lt;';
        break;
      case 62: // >
        escape = '&gt;';
        break;
      default:
        continue;
    }

    if (lastIndex !== index) {
      html += str.substring(lastIndex, index);
    }

    lastIndex = index + 1;
    html += escape;
  }

  return lastIndex !== index
    ? html + str.substring(lastIndex, index)
    : html;
}

function escapeRegex(string) {
  return string.replace(/[/\-\\^$*+?.()|[\]{}]/g, '\\$&');
}
