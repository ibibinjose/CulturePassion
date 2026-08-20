# CulturePass.App — Platform Brain

> **Last rebuilt:** 2026-08-20T23:10 AEST
> **Build status:** ✅ All packages typecheck and build cleanly (`pnpm run build` exit 0).

---

## 1. What CulturePass Is

CulturePass is the **cultural participation layer for multicultural cities**. It connects people with cultural events, community groups, local businesses, and verified hosts — from Melbourne to Dubai, Riyadh to London. The platform is designed mobile-first at 390px and scales gracefully to desktop.

**Core thesis:** Every neighbourhood deserves a living calendar rooted in the cultures that call it home — not a generic events aggregator.

---

## 2. Monorepo Structure

| Workspace | Package name | Purpose |
|---|---|---|
| [`/artifacts/culturepass`](file:///Users/bibinjose/Projects/Codebase/Projects/CulturePassApp200826/artifacts/culturepass/) | `@workspace/culturepass` | Frontend React + Vite + Wouter SPA |
| [`/artifacts/api-server`](file:///Users/bibinjose/Projects/Codebase/Projects/CulturePassApp200826/artifacts/api-server/) | `@workspace/api-server` | Backend Node.js + Express API |
| [`/artifacts/mockup-sandbox`](file:///Users/bibinjose/Projects/Codebase/Projects/CulturePassApp200826/artifacts/mockup-sandbox/) | `@workspace/mockup-sandbox` | Design sandbox (Vite) |
| [`/infrastructure`](file:///Users/bibinjose/Projects/Codebase/Projects/CulturePassApp200826/infrastructure/) | `infrastructure` | AWS CDK TypeScript IaC |
| [`/lib/db`](file:///Users/bibinjose/Projects/Codebase/Projects/CulturePassApp200826/lib/db/) | `@workspace/db` | Drizzle ORM schema, migrations, clients |
| [`/lib/api-spec`](file:///Users/bibinjose/Projects/Codebase/Projects/CulturePassApp200826/lib/api-spec/) | `@workspace/api-spec` | OpenAPI YAML contract (`openapi.yaml`, 65 KB) |
| [`/lib/api-client-react`](file:///Users/bibinjose/Projects/Codebase/Projects/CulturePassApp200826/lib/api-client-react/) | `@workspace/api-client-react` | Generated React-Query hooks (Orval codegen) |
| [`/lib/api-zod`](file:///Users/bibinjose/Projects/Codebase/Projects/CulturePassApp200826/lib/api-zod/) | `@workspace/api-zod` | Generated Zod validation schemas |

**Package manager:** pnpm (workspace defined in `pnpm-workspace.yaml`).

---

## 3. Technology Stack

| Layer | Technology |
|---|---|
| Frontend framework | React 19 + Vite 7 |
| Routing | Wouter (lightweight) |
| Styling | TailwindCSS |
| Icons | Lucide React |
| Server state | TanStack React-Query |
| Backend | Node.js + Express |
| Validation | Zod (runtime) |
| ORM | Drizzle (PostgreSQL) |
| Database | Amazon Aurora PostgreSQL Serverless v2 |
| Infrastructure | AWS CDK (TypeScript) |
| Payments | Stripe Test Gateway |
| API contract | OpenAPI 3.x YAML → Orval codegen |

---

## 4. Design System

| Property | Value |
|---|---|
| Aesthetic | Minimal editorial (Apple clarity + Luma simplicity) |
| Typography | `display-font`, `mono-font` utility classes; modern sans-serif |
| Colours | Neutral light backgrounds (white/gray/card). Colour enters only through photography and event content. Accent colour for interactive elements. |
| Spacing | Generous padding, subtle border lines |
| Layout | `content-width` utility for max-width container. Mobile-first at 390px |
| Animations | `animate-rise-in`, `animate-bounce-in`, smooth transitions |
| Cards | Rounded corners (`rounded-[20px]`–`rounded-[28px]`), `bg-card`, subtle borders |

### UI Primitives (55 components in `/components/ui/`)

Accordion, AlertDialog, Alert, AspectRatio, Avatar, Badge, Breadcrumb, ButtonGroup, Button, Calendar, Card, Carousel, Chart, Checkbox, Collapsible, Command, ContextMenu, Dialog, Drawer, DropdownMenu, Empty, Field, Form, HoverCard, InputGroup, InputOTP, Input, Item, Kbd, Label, Menubar, NavigationMenu, Pagination, Popover, Progress, RadioGroup, Resizable, ScrollArea, Select, Separator, Sheet, Sidebar, Skeleton, Slider, Sonner, Spinner, Switch, Table, Tabs, Textarea, Toast, Toaster, ToggleGroup, Toggle, Tooltip.

---

## 5. Test Personas

| Username | Role | Purpose |
|---|---|---|
| `priya` | `user` | Standard cultural participant |
| `kerala_collective` | `host` | Independent event host / community lead |
| `collingwood_arts` | `host` | Art space / studio host |
| `maya` | `admin` | Platform administrator |
| `guest` | — | Logged-out guest mode (simulated) |

Switched via the persona dropdown in the header shell. The `x-username` header is sent with all API requests.

---

## 6. Frontend Route Map (39 pages)

### Public pages

| Route | Page | File |
|---|---|---|
| `/` | My City (home feed) | [`home.tsx`](file:///Users/bibinjose/Projects/Codebase/Projects/CulturePassApp200826/artifacts/culturepass/src/pages/home.tsx) |
| `/discover` | Discover (search/browse) | [`discover.tsx`](file:///Users/bibinjose/Projects/Codebase/Projects/CulturePassApp200826/artifacts/culturepass/src/pages/discover.tsx) |
| `/calendar` | Calendar view | [`calendar.tsx`](file:///Users/bibinjose/Projects/Codebase/Projects/CulturePassApp200826/artifacts/culturepass/src/pages/calendar.tsx) |
| `/directory` | Verified directory | [`directory.tsx`](file:///Users/bibinjose/Projects/Codebase/Projects/CulturePassApp200826/artifacts/culturepass/src/pages/directory.tsx) |
| `/about` | About CulturePass | [`about.tsx`](file:///Users/bibinjose/Projects/Codebase/Projects/CulturePassApp200826/artifacts/culturepass/src/pages/about.tsx) |
| `/learn` | For organisers | [`learn.tsx`](file:///Users/bibinjose/Projects/Codebase/Projects/CulturePassApp200826/artifacts/culturepass/src/pages/learn.tsx) |
| `/offers` | Deals & offers catalog | [`offers.tsx`](file:///Users/bibinjose/Projects/Codebase/Projects/CulturePassApp200826/artifacts/culturepass/src/pages/offers.tsx) |
| `/onboarding` | First-run onboarding | [`onboarding.tsx`](file:///Users/bibinjose/Projects/Codebase/Projects/CulturePassApp200826/artifacts/culturepass/src/pages/onboarding.tsx) |

### Events

| Route | Page | File |
|---|---|---|
| `/events/:id` | Event detail | [`event-detail.tsx`](file:///Users/bibinjose/Projects/Codebase/Projects/CulturePassApp200826/artifacts/culturepass/src/pages/event-detail.tsx) |
| `/events/:id/check-in` | Event check-in | [`event-check-in.tsx`](file:///Users/bibinjose/Projects/Codebase/Projects/CulturePassApp200826/artifacts/culturepass/src/pages/event-check-in.tsx) |
| `/events/:id/manage` | Manage event hub | [`manage-event.tsx`](file:///Users/bibinjose/Projects/Codebase/Projects/CulturePassApp200826/artifacts/culturepass/src/pages/manage-event.tsx) |
| `/events/:id/manage/details` | Edit event details | [`manage-event-details.tsx`](file:///Users/bibinjose/Projects/Codebase/Projects/CulturePassApp200826/artifacts/culturepass/src/pages/manage-event-details.tsx) |
| `/events/:id/manage/guests` | Guest list | [`manage-event-guests.tsx`](file:///Users/bibinjose/Projects/Codebase/Projects/CulturePassApp200826/artifacts/culturepass/src/pages/manage-event-guests.tsx) |
| `/events/:id/manage/tickets` | Ticket management | [`manage-event-tickets.tsx`](file:///Users/bibinjose/Projects/Codebase/Projects/CulturePassApp200826/artifacts/culturepass/src/pages/manage-event-tickets.tsx) |
| `/events/:id/manage/hosts` | Co-host management | [`manage-event-hosts.tsx`](file:///Users/bibinjose/Projects/Codebase/Projects/CulturePassApp200826/artifacts/culturepass/src/pages/manage-event-hosts.tsx) |
| `/create` | Create event form | [`create-event.tsx`](file:///Users/bibinjose/Projects/Codebase/Projects/CulturePassApp200826/artifacts/culturepass/src/pages/create-event.tsx) |

### Communities

| Route | Page | File |
|---|---|---|
| `/communities/:id` | Community profile | [`community-detail.tsx`](file:///Users/bibinjose/Projects/Codebase/Projects/CulturePassApp200826/artifacts/culturepass/src/pages/community-detail.tsx) |
| `/communities/:id/about` | Community about | [`community-about.tsx`](file:///Users/bibinjose/Projects/Codebase/Projects/CulturePassApp200826/artifacts/culturepass/src/pages/community-about.tsx) |
| `/communities/:id/manage` | Manage community | [`manage-community.tsx`](file:///Users/bibinjose/Projects/Codebase/Projects/CulturePassApp200826/artifacts/culturepass/src/pages/manage-community.tsx) |
| `/communities/create` | Register community | [`create-community.tsx`](file:///Users/bibinjose/Projects/Codebase/Projects/CulturePassApp200826/artifacts/culturepass/src/pages/create-community.tsx) |

### Businesses

| Route | Page | File |
|---|---|---|
| `/businesses/:id` | Business profile | [`business-detail.tsx`](file:///Users/bibinjose/Projects/Codebase/Projects/CulturePassApp200826/artifacts/culturepass/src/pages/business-detail.tsx) |
| `/businesses/:id/about` | Business about | [`business-about.tsx`](file:///Users/bibinjose/Projects/Codebase/Projects/CulturePassApp200826/artifacts/culturepass/src/pages/business-about.tsx) |
| `/businesses/:id/manage` | Manage business | [`manage-business.tsx`](file:///Users/bibinjose/Projects/Codebase/Projects/CulturePassApp200826/artifacts/culturepass/src/pages/manage-business.tsx) |
| `/businesses/:id/offers/create` | Create offer | [`create-offer.tsx`](file:///Users/bibinjose/Projects/Codebase/Projects/CulturePassApp200826/artifacts/culturepass/src/pages/create-offer.tsx) |
| `/businesses/create` | Add business | [`create-business.tsx`](file:///Users/bibinjose/Projects/Codebase/Projects/CulturePassApp200826/artifacts/culturepass/src/pages/create-business.tsx) |

### Users & social

| Route | Page | File |
|---|---|---|
| `/users/:username` | User profile | [`profile.tsx`](file:///Users/bibinjose/Projects/Codebase/Projects/CulturePassApp200826/artifacts/culturepass/src/pages/profile.tsx) |
| `/users/:username/about` | User about | [`user-about.tsx`](file:///Users/bibinjose/Projects/Codebase/Projects/CulturePassApp200826/artifacts/culturepass/src/pages/user-about.tsx) |
| `/circles` | Circles list | [`circles.tsx`](file:///Users/bibinjose/Projects/Codebase/Projects/CulturePassApp200826/artifacts/culturepass/src/pages/circles.tsx) |
| `/circles/:id` | Circle detail | [`circle-detail.tsx`](file:///Users/bibinjose/Projects/Codebase/Projects/CulturePassApp200826/artifacts/culturepass/src/pages/circle-detail.tsx) |
| `/inbox` | Notifications inbox | [`inbox.tsx`](file:///Users/bibinjose/Projects/Codebase/Projects/CulturePassApp200826/artifacts/culturepass/src/pages/inbox.tsx) |
| `/me/events` | My events | [`my-events.tsx`](file:///Users/bibinjose/Projects/Codebase/Projects/CulturePassApp200826/artifacts/culturepass/src/pages/my-events.tsx) |
| `/me/communities` | My communities | [`my-communities.tsx`](file:///Users/bibinjose/Projects/Codebase/Projects/CulturePassApp200826/artifacts/culturepass/src/pages/my-communities.tsx) |

### Tickets & payments

| Route | Page | File |
|---|---|---|
| `/tickets` | My tickets | [`tickets.tsx`](file:///Users/bibinjose/Projects/Codebase/Projects/CulturePassApp200826/artifacts/culturepass/src/pages/tickets.tsx) |
| `/tickets/:id` | Ticket detail | [`ticket-detail.tsx`](file:///Users/bibinjose/Projects/Codebase/Projects/CulturePassApp200826/artifacts/culturepass/src/pages/ticket-detail.tsx) |
| `/tickets/:id/check-in` | Ticket check-in | [`check-in.tsx`](file:///Users/bibinjose/Projects/Codebase/Projects/CulturePassApp200826/artifacts/culturepass/src/pages/check-in.tsx) |
| `/checkout-mock` | Stripe mock checkout | [`checkout-mock.tsx`](file:///Users/bibinjose/Projects/Codebase/Projects/CulturePassApp200826/artifacts/culturepass/src/pages/checkout-mock.tsx) |

### Admin & host dashboards (protected)

| Route | Page | File | Access |
|---|---|---|---|
| `/host` | Host dashboard | [`host-dashboard.tsx`](file:///Users/bibinjose/Projects/Codebase/Projects/CulturePassApp200826/artifacts/culturepass/src/pages/host-dashboard.tsx) | `host`, `admin` |
| `/admin` | Platform admin | [`admin.tsx`](file:///Users/bibinjose/Projects/Codebase/Projects/CulturePassApp200826/artifacts/culturepass/src/pages/admin.tsx) | `admin` only |

---

## 7. Backend API Routes (15 modules)

| Module | File | Endpoints |
|---|---|---|
| Health | [`health.ts`](file:///Users/bibinjose/Projects/Codebase/Projects/CulturePassApp200826/artifacts/api-server/src/routes/health.ts) | `GET /api/health` |
| Events | [`events.ts`](file:///Users/bibinjose/Projects/Codebase/Projects/CulturePassApp200826/artifacts/api-server/src/routes/events.ts) | CRUD, search, RSVP, sections (forYou, nearby, popular, following) |
| Users | [`users.ts`](file:///Users/bibinjose/Projects/Codebase/Projects/CulturePassApp200826/artifacts/api-server/src/routes/users.ts) | Profile CRUD, follow/unfollow, preferences, onboarding |
| Communities | [`communities.ts`](file:///Users/bibinjose/Projects/Codebase/Projects/CulturePassApp200826/artifacts/api-server/src/routes/communities.ts) | CRUD, follow, member management |
| Businesses | [`businesses.ts`](file:///Users/bibinjose/Projects/Codebase/Projects/CulturePassApp200826/artifacts/api-server/src/routes/businesses.ts) | CRUD, offers, redeem |
| Tickets | [`tickets.ts`](file:///Users/bibinjose/Projects/Codebase/Projects/CulturePassApp200826/artifacts/api-server/src/routes/tickets.ts) | Purchase, check-in, QR validation |
| Circles | [`circles.ts`](file:///Users/bibinjose/Projects/Codebase/Projects/CulturePassApp200826/artifacts/api-server/src/routes/circles.ts) | CRUD, invite, share events |
| Notifications | [`notifications.ts`](file:///Users/bibinjose/Projects/Codebase/Projects/CulturePassApp200826/artifacts/api-server/src/routes/notifications.ts) | List, mark read |
| Admin | [`admin.ts`](file:///Users/bibinjose/Projects/Codebase/Projects/CulturePassApp200826/artifacts/api-server/src/routes/admin.ts) | Moderation, approvals, platform stats |
| Host | [`host.ts`](file:///Users/bibinjose/Projects/Codebase/Projects/CulturePassApp200826/artifacts/api-server/src/routes/host.ts) | Host dashboard data |
| Uploads | [`uploads.ts`](file:///Users/bibinjose/Projects/Codebase/Projects/CulturePassApp200826/artifacts/api-server/src/routes/uploads.ts) | Image upload (1:1 preferred) |
| Analytics | [`analytics.ts`](file:///Users/bibinjose/Projects/Codebase/Projects/CulturePassApp200826/artifacts/api-server/src/routes/analytics.ts) | First-party event tracking |
| Places | [`places.ts`](file:///Users/bibinjose/Projects/Codebase/Projects/CulturePassApp200826/artifacts/api-server/src/routes/places.ts) | Location/venue lookup |
| Sponsors | [`sponsors.ts`](file:///Users/bibinjose/Projects/Codebase/Projects/CulturePassApp200826/artifacts/api-server/src/routes/sponsors.ts) | Sponsor management |

---

## 8. Database Schema (11 tables)

| Schema file | Entities |
|---|---|
| [`events.ts`](file:///Users/bibinjose/Projects/Codebase/Projects/CulturePassApp200826/lib/db/src/schema/events.ts) | Events table |
| [`users.ts`](file:///Users/bibinjose/Projects/Codebase/Projects/CulturePassApp200826/lib/db/src/schema/users.ts) | Users, follows, preferences |
| [`communities.ts`](file:///Users/bibinjose/Projects/Codebase/Projects/CulturePassApp200826/lib/db/src/schema/communities.ts) | Communities, members |
| [`businesses.ts`](file:///Users/bibinjose/Projects/Codebase/Projects/CulturePassApp200826/lib/db/src/schema/businesses.ts) | Businesses, offers |
| [`tickets.ts`](file:///Users/bibinjose/Projects/Codebase/Projects/CulturePassApp200826/lib/db/src/schema/tickets.ts) | Tickets, orders, check-ins |
| [`circles.ts`](file:///Users/bibinjose/Projects/Codebase/Projects/CulturePassApp200826/lib/db/src/schema/circles.ts) | Circles, members |
| [`moderation.ts`](file:///Users/bibinjose/Projects/Codebase/Projects/CulturePassApp200826/lib/db/src/schema/moderation.ts) | Moderation queue, reviews |
| [`sponsors.ts`](file:///Users/bibinjose/Projects/Codebase/Projects/CulturePassApp200826/lib/db/src/schema/sponsors.ts) | Sponsors, placements |
| [`analytics.ts`](file:///Users/bibinjose/Projects/Codebase/Projects/CulturePassApp200826/lib/db/src/schema/analytics.ts) | Analytics events |
| [`event-credits.ts`](file:///Users/bibinjose/Projects/Codebase/Projects/CulturePassApp200826/lib/db/src/schema/event-credits.ts) | Event credits/rewards |

**Push schema changes:** `pnpm --filter @workspace/db run push`

---

## 9. Frontend Components (18 domain components)

| Component | File | Purpose |
|---|---|---|
| `CultureShell` | [`culture-shell.tsx`](file:///Users/bibinjose/Projects/Codebase/Projects/CulturePassApp200826/artifacts/culturepass/src/components/culture-shell.tsx) | App shell: header, mobile bottom nav, mobile drawer, persona switcher |
| `SiteFooter` | [`site-footer.tsx`](file:///Users/bibinjose/Projects/Codebase/Projects/CulturePassApp200826/artifacts/culturepass/src/components/site-footer.tsx) | 4-column footer (desktop only, hidden on mobile) |
| `EventCard` | [`event-card.tsx`](file:///Users/bibinjose/Projects/Codebase/Projects/CulturePassApp200826/artifacts/culturepass/src/components/event-card.tsx) | Reusable event card for lists |
| `EventSkeleton` | [`event-skeleton.tsx`](file:///Users/bibinjose/Projects/Codebase/Projects/CulturePassApp200826/artifacts/culturepass/src/components/event-skeleton.tsx) | Loading skeleton for event cards |
| `PersonCard` | [`person-card.tsx`](file:///Users/bibinjose/Projects/Codebase/Projects/CulturePassApp200826/artifacts/culturepass/src/components/person-card.tsx) | User/host profile card |
| `EmptyState` | [`empty-state.tsx`](file:///Users/bibinjose/Projects/Codebase/Projects/CulturePassApp200826/artifacts/culturepass/src/components/empty-state.tsx) | Empty data placeholder |
| `CitySelect` | [`city-select.tsx`](file:///Users/bibinjose/Projects/Codebase/Projects/CulturePassApp200826/artifacts/culturepass/src/components/city-select.tsx) | City picker dropdown |
| `InviteModal` | [`invite-modal.tsx`](file:///Users/bibinjose/Projects/Codebase/Projects/CulturePassApp200826/artifacts/culturepass/src/components/invite-modal.tsx) | Circle/event invite dialog |
| `MonthCalendar` | [`month-calendar.tsx`](file:///Users/bibinjose/Projects/Codebase/Projects/CulturePassApp200826/artifacts/culturepass/src/components/month-calendar.tsx) | Month calendar grid |
| `AddToCalendar` | [`add-to-calendar.tsx`](file:///Users/bibinjose/Projects/Codebase/Projects/CulturePassApp200826/artifacts/culturepass/src/components/add-to-calendar.tsx) | Export event to device calendar |
| `TicketQR` | [`ticket-qr.tsx`](file:///Users/bibinjose/Projects/Codebase/Projects/CulturePassApp200826/artifacts/culturepass/src/components/ticket-qr.tsx) | QR code for ticket check-in |
| `Map` | [`map.tsx`](file:///Users/bibinjose/Projects/Codebase/Projects/CulturePassApp200826/artifacts/culturepass/src/components/map.tsx) | Venue map embed |
| `ProtectedRoute` | [`protected-route.tsx`](file:///Users/bibinjose/Projects/Codebase/Projects/CulturePassApp200826/artifacts/culturepass/src/components/protected-route.tsx) | Role-based route guard |
| `RegistrationFields` | [`registration-fields.tsx`](file:///Users/bibinjose/Projects/Codebase/Projects/CulturePassApp200826/artifacts/culturepass/src/components/registration-fields.tsx) | ABN/legal registration form fields |
| `RegistrationSummary` | [`registration-summary.tsx`](file:///Users/bibinjose/Projects/Codebase/Projects/CulturePassApp200826/artifacts/culturepass/src/components/registration-summary.tsx) | Legal registration display |
| `EntityAboutNav` | [`entity-about-nav.tsx`](file:///Users/bibinjose/Projects/Codebase/Projects/CulturePassApp200826/artifacts/culturepass/src/components/entity-about-nav.tsx) | Tab nav for entity about pages |
| `ErrorBoundary` | [`error-boundary.tsx`](file:///Users/bibinjose/Projects/Codebase/Projects/CulturePassApp200826/artifacts/culturepass/src/components/error-boundary.tsx) | React error boundary with reset |

---

## 10. Shared Libraries & Hooks

### Lib utilities (`/src/lib/`)

| File | Purpose |
|---|---|
| [`access.ts`](file:///Users/bibinjose/Projects/Codebase/Projects/CulturePassApp200826/artifacts/culturepass/src/lib/access.ts) | `canAccessHostDashboard()`, `canAccessPlatformAdmin()` |
| [`analytics.ts`](file:///Users/bibinjose/Projects/Codebase/Projects/CulturePassApp200826/artifacts/culturepass/src/lib/analytics.ts) | First-party `trackEvent()` with 14 event types |
| [`cities.ts`](file:///Users/bibinjose/Projects/Codebase/Projects/CulturePassApp200826/artifacts/culturepass/src/lib/cities.ts) | 31 cities across 5 groups (Australia, Gulf, UK & Europe, Americas, Asia-Pacific) |
| [`city-context.tsx`](file:///Users/bibinjose/Projects/Codebase/Projects/CulturePassApp200826/artifacts/culturepass/src/lib/city-context.tsx) | React context for active city |
| [`legal-registration.ts`](file:///Users/bibinjose/Projects/Codebase/Projects/CulturePassApp200826/artifacts/culturepass/src/lib/legal-registration.ts) | Localised registration labels/tax codes for AU + GCC (UAE, Saudi, Qatar, Kuwait, Oman, Bahrain) |
| [`places.ts`](file:///Users/bibinjose/Projects/Codebase/Projects/CulturePassApp200826/artifacts/culturepass/src/lib/places.ts) | Venue/location data by city |
| [`session.ts`](file:///Users/bibinjose/Projects/Codebase/Projects/CulturePassApp200826/artifacts/culturepass/src/lib/session.ts) | `hasCompletedOnboarding()`, `getOnboardingCultures()`, `getOnboardingInterests()` |
| [`share.ts`](file:///Users/bibinjose/Projects/Codebase/Projects/CulturePassApp200826/artifacts/culturepass/src/lib/share.ts) | Web Share API / clipboard fallback |
| [`utils.ts`](file:///Users/bibinjose/Projects/Codebase/Projects/CulturePassApp200826/artifacts/culturepass/src/lib/utils.ts) | `cn()` classnames utility |

### Hooks (`/src/hooks/`)

| Hook | Purpose |
|---|---|
| [`use-page-meta.ts`](file:///Users/bibinjose/Projects/Codebase/Projects/CulturePassApp200826/artifacts/culturepass/src/hooks/use-page-meta.ts) | Dynamic `<title>`, OG tags, Twitter Cards |
| [`use-mobile.tsx`](file:///Users/bibinjose/Projects/Codebase/Projects/CulturePassApp200826/artifacts/culturepass/src/hooks/use-mobile.tsx) | Responsive breakpoint detection |
| [`use-toast.ts`](file:///Users/bibinjose/Projects/Codebase/Projects/CulturePassApp200826/artifacts/culturepass/src/hooks/use-toast.ts) | Toast notification state |

---

## 11. Analytics Event Types

```
event_viewed | event_saved | event_shared | event_rsvp_started | event_rsvp_completed
ticket_checkout_started | ticket_purchase_completed | event_attended | event_checked_in
community_followed | business_viewed | offer_viewed | offer_redeemed
```

---

## 12. City Coverage (31 cities, 5 groups)

| Group | Cities |
|---|---|
| **Australia** | Sydney, Melbourne, Brisbane, Perth, Adelaide, Canberra, Gold Coast |
| **Gulf** | Dubai, Abu Dhabi, Sharjah, Doha, Riyadh, Jeddah, Kuwait City, Muscat, Manama |
| **UK & Europe** | London, Manchester, Birmingham, Glasgow, Dublin, Berlin |
| **Americas** | New York, Houston, San Francisco, Los Angeles, Toronto, Vancouver |
| **Asia-Pacific** | Singapore, Kuala Lumpur, Auckland |

---

## 13. Guest Gating

When the active user is `guest`:
- **Offers page** (`/offers`): Shows a glassmorphic locked overlay prompting signup.
- **Business detail** (`/businesses/:id`): "Redeem Offer" button becomes "Sign Up to Redeem" (with Lock icon).
- Quick-signup sets `active_username` to `priya` and reloads.

---

## 14. Navigation Architecture

### Desktop header
- Brand logo + "CulturePass / find your people"
- City selector
- Notifications bell (with unread badge)
- Profile dropdown with: View Profile, My Events, My Communities, Tickets, Circles, Inbox (with count), Directory, Deals & Offers, Learn, About CulturePass, Host Dashboard (role-gated), Platform Admin (role-gated), Persona switcher

### Mobile
- **Bottom nav bar** (fixed): My City, Discover, Calendar, Create +, Profile
- **Hamburger drawer** (slide-in from right): Full navigation list + persona switcher

### Desktop footer ([`site-footer.tsx`](file:///Users/bibinjose/Projects/Codebase/Projects/CulturePassApp200826/artifacts/culturepass/src/components/site-footer.tsx))
4-column grid: Brand | Platform links | Organiser links | Company links
Bottom bar: © 2026 CulturePass Pty Ltd + Privacy Policy, Terms of Service, Cookie Policy
Hidden on mobile (`hidden md:block`).

---

## 15. Key Commands

```bash
# Full build (typecheck + production bundles)
pnpm run build

# Push DB schema changes
pnpm --filter @workspace/db run push

# Regenerate API client hooks after openapi.yaml changes
pnpm --filter @workspace/api-client-react run codegen

# Dev server
pnpm run dev
```

---

## 16. Key Conventions

1. **All images 1:1 ratio** across the app (user preference).
2. **Drizzle-only DB access** — no raw SQL if Drizzle constructs are available.
3. **API contract-first** — edit `openapi.yaml`, then regenerate.
4. **Persona-driven testing** — always test with the predefined personas.
5. **Mobile-first** — primary views at 390px, then scale to desktop.
6. **First-party analytics only** — no third-party trackers, privacy by default.
7. **Approval workflow** — communities, businesses, hosts reviewed before appearing in Discover/directory.
