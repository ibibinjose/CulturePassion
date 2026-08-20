# CulturePass — Full Business Plan

**Version 1.0 · August 2026 · Confidential**
Founder & CEO: Bibin Jose · cultureos.co@gmail.com

---

## Table of contents

1. [Company and mission](#1-company-and-mission)
2. [The problem, evidenced](#2-the-problem-evidenced)
3. [Product](#3-product)
4. [Market](#4-market)
5. [Customer segments and value propositions](#5-customer-segments-and-value-propositions)
6. [Business model and pricing](#6-business-model-and-pricing)
7. [Go-to-market](#7-go-to-market)
8. [Competition and defensibility](#8-competition-and-defensibility)
9. [Operations and technology](#9-operations-and-technology)
10. [Trust, safety and cultural governance](#10-trust-safety-and-cultural-governance)
11. [Organisation and hiring plan](#11-organisation-and-hiring-plan)
12. [Financial plan](#12-financial-plan)
13. [Funding strategy](#13-funding-strategy)
14. [Milestones and gates](#14-milestones-and-gates)
15. [Risks](#15-risks)
16. [Exit and long-term value](#16-exit-and-long-term-value)

---

## 1. Company and mission

**Vision.** To become the global cultural events and community platform — the default place where cultural life is published, discovered, joined and measured.

**Mission.** Democratise access to cultural heritage, give local organisers professional-grade tools at community-grade prices, and create the shared measurement layer that lets public and private funders see what their money actually produced.

**Core thesis.** Every neighbourhood deserves a living calendar rooted in the cultures that call it home — not a generic events aggregator. Eventbrite optimises for the 500-person paid conference. Facebook Events optimises for engagement. Neither optimises for the 60-person Onam sadya in a church hall that is the actual texture of a multicultural city.

**Operating principles.**

1. **Free stays free.** Free-RSVP events never attract a platform fee. We monetise where money already moves.
2. **Community consent before scale.** We do not scrape or auto-import a community's events without the organiser's agreement. Growth that burns organiser trust is not growth.
3. **Measurement is a product, not surveillance.** Participation data goes back to hosts and, in aggregate only, to funders. It is never sold to advertisers as individual behaviour.
4. **Cultural authority sits with communities.** We do not adjudicate what counts as authentic. Verified hosts and cultural advisors do.

---

## 2. The problem, evidenced

### 2.1 For participants: discovery requires prior membership

Cultural events reach audiences through channels that are closed by design. A WhatsApp broadcast list reaches the people already on it. A Facebook group requires knowing its name. A flyer in a Dandenong grocery shop reaches people who shop there. The result is a hard ceiling on audience: the same 200 families attend, year after year, while a city of five million has no route in.

The people most excluded are exactly the ones cultural policy is trying to reach: second-generation Australians reconnecting with heritage, recent arrivals who have not yet found their community, cross-cultural attendees, and visitors.

### 2.2 For organisers: the tooling gap is structural, not preferential

A community organiser running a A$12-ticket event faces this: mainstream ticketing platforms charge fee structures calibrated for A$80 tickets, which consume 15–20% of a low-price ticket. So organisers take cash at the door, or bank transfers to a personal account, or a spreadsheet. Consequences compound:

- No attendance data, so no evidence for the next grant application.
- No pre-sale, so no cash flow to pay a deposit on a venue.
- No list, so next year's marketing starts from zero again.
- Volunteer labour absorbed by admin instead of programming.

### 2.3 For funders: money out, no signal back

Councils, multicultural commissions, foundations and tourism bodies fund cultural programming and receive back self-reported attendance figures of unknown quality. They cannot answer basic questions: How many distinct cultural communities did we reach? Did funded activity draw visitors outside the CBD? Which communities are underserved relative to their population share? Is participation growing or churning?

This is not a reporting-diligence failure. There is no instrument. CulturePass is the instrument.

### 2.4 Why this is a platform problem

Each of the three problems is unsolvable alone. Participants will not use a discovery app with no events. Organisers will not publish to an app with no audience. Funders will not licence a dashboard with no coverage. They are solvable together, in one city, with a wedge: **make the single best cultural discovery feed for one metro area, and organisers come because that is where the audience is.**

---

## 3. Product

### 3.1 Current state — this is built, not planned

| Layer | Status |
|---|---|
| Frontend | React 19 + Vite 7 + Wouter SPA, mobile-first at 390px, 39 routes, 55 UI primitives |
| Backend | Node.js + Express, 15 route modules, OpenAPI 3.x contract with Orval codegen |
| Data | PostgreSQL + Drizzle ORM, 11 schema groups (events, users, communities, businesses, tickets, circles, moderation, sponsors, analytics, event-credits) |
| Infrastructure | AWS CDK (TypeScript): CloudFront + S3, ALB, ECS Fargate, Aurora Serverless v2, Cognito, SQS, SES — `ap-southeast-2` |
| Payments | Stripe (test gateway integrated; production onboarding pending) |
| Build health | All packages typecheck and build cleanly |

### 3.2 Capability map

**Discovery**
- City home feed ("My City") with magazine-style editorial layout
- Location selector: Melbourne, Sydney, Brisbane, Perth, Adelaide
- Natural-language query parser: "Malayalam events this weekend", "free events tonight" resolve to structured filters
- Filters by category, city, date, price (free vs paid)
- Map discovery, cultural calendar view, verified directory
- Feed sections: For You, Nearby, Popular, Following

**Participation**
- Event detail answering what / when / where / who / how much / why go
- Sticky primary CTA: RSVP free or buy ticket
- `.ics` download plus Google and Apple Calendar deep links
- Digital pass with signed-token SVG QR code
- Gate check-in that rejects duplicate scans, wrong-event scans, and cancelled or refunded tickets
- Circles: private groups for sharing events with friends and family
- Notification inbox with per-channel preferences (email, push, in-app)

**Organiser tooling**
- Multi-step event creation wizard
- Explicit lifecycle: `DRAFT → PENDING_REVIEW → PUBLISHED → SOLD_OUT / CANCELLED → COMPLETED → ARCHIVED`
- Manage hub: details, guest list, ticket types, co-hosts
- Community profiles with follow, subscriber counts and verified badges
- Business directory profiles with hours, address, website
- Offers and redemption coupon codes for local businesses
- Host dashboard with performance data

**Platform operations**
- Admin console: platform KPIs (registered users, GMV, published events, check-in rate), moderation queue, approvals, audit trail
- User safety reporting from any profile, routed to the moderation queue
- Sponsor management and placement inventory
- First-party analytics (`event_viewed`, `community_followed`, `offer_redeemed`, and the full `AnalyticsEventName` set)

### 3.3 Roadmap

**H1 FY27 — pilot hardening (funded by seed)**
- Stripe production, Stripe Connect payouts to host accounts, refunds and chargeback handling
- Cognito production auth, replacing demo persona switching
- Grant acquittal report export (PDF + CSV) — the single highest-leverage organiser feature
- Multi-language event content: organiser-supplied translations, priority languages Mandarin, Arabic, Vietnamese, Hindi, Punjabi, Greek, Italian, Malayalam
- Accessibility audit to WCAG 2.2 AA
- Native app shells (iOS/Android) wrapping the PWA, for home-screen presence and push

**H2 FY27 — the measurement product**
- Cultural Passport: stamps, streaks, tiers, and Culture Passion Awards eligibility
- Civic dashboard v1: participation by community, suburb-level dispersal, funded-activity attribution
- Host CRM: audience lists, re-engagement campaigns, repeat-attendance cohorts

**FY28 — multi-city and marketplace depth**
- Multi-city operations tooling, city-level content curation roles
- OpenSearch migration behind the existing search repository abstraction (already isolated for this)
- Sponsorship self-serve inventory, seasonal campaign packages
- Public API and iCal/webhook feeds for council and university websites

**FY29 — international**
- Multi-currency, multi-tax, regional payment methods
- Data residency options for EU and GCC deployments
- Auckland, Dubai and London market entry

---

## 4. Market

### 4.1 Sizing, honestly

Top-down experiential-tourism and digital-ticketing numbers (a US$1.5T+ experience economy, an US$85B+ ticketing market) are context, not a serviceable market. They are quoted in the deck because investors expect them; they are not the basis of this plan. The bottom-up build is:

**Australia, bottom-up SAM.**
- Melbourne, Sydney, Brisbane, Perth, Adelaide contain, conservatively, 45,000–60,000 organisations and groups that run at least one public cultural, community, religious, diaspora, arts or food event per year — community associations, cultural collectives, places of worship, arts spaces, migrant resource centres, markets, councils, libraries.
- At the FY29 modelled position we serve 4,800 of them across 8 cities: **under 10% of the Australian addressable host base.** The plan does not require market dominance to work.
- Revenue per active host at FY29 modelled scale is A$1,164 across all lines. 50,000 Australian hosts × A$1,164 = **an Australian-only SAM of roughly A$58M in annual platform revenue.**

**Global TAM by extension.** The same structure exists in every multicultural metro: Toronto, Vancouver, London, Birmingham, Auckland, Dubai, Singapore, Riyadh, Berlin, Amsterdam, Chicago. Roughly 120 metros with comparable diaspora density and cultural-funding infrastructure implies **a global platform-revenue TAM in the A$1.5–2.5B range.** This is an extension estimate, and it is labelled as one.

### 4.2 Why Melbourne first

- Highest concentration of active multicultural community organisations in Australia, with the deepest funding infrastructure behind them: Creative Victoria, the Victorian Multicultural Commission, the City of Melbourne and 30 metro councils each running cultural grant programs.
- Dense, walkable, transit-connected inner suburbs — Footscray, Dandenong, Brunswick, Springvale, Collingwood, Preston — where a discovery feed produces genuinely actionable results.
- The product was built for it. Melbourne is the default city; the demo hosts are a Kerala collective and a Collingwood arts space.
- Founder proximity and existing community relationships.
- Victoria's cultural and multicultural policy settings make the civic-dashboard sale plausible in year one rather than year three.

### 4.3 Expansion sequence and rationale

| Wave | Markets | Trigger |
|---|---|---|
| FY27 | Melbourne | Pilot |
| FY28 H1 | Sydney, Brisbane | Melbourne hits 60% month-3 host retention |
| FY28 H2 | Perth, Adelaide | Repeatable city-launch playbook documented and executed twice |
| FY29 H1 | Auckland | English-language, similar policy environment, low localisation cost |
| FY29 H2 | Dubai, London | Multi-currency shipped; anchor sponsor or civic partner secured pre-entry |

We do not enter a city without either a civic partner or an anchor community network already committed. Cold city launches are how marketplaces burn capital.

---

## 5. Customer segments and value propositions

### 5.1 Participants

| Segment | What they need | What CulturePass gives them |
|---|---|---|
| Heritage-connected (2nd/3rd generation) | A way back into their own culture without an inside contact | Community profiles to follow; language-aware search |
| New arrivals and international students | Fast belonging in an unfamiliar city | Nearby feed, free events surfaced first, Circles to attend with others |
| Cross-cultural explorers | Genuine experiences, not tourist-facing pastiche | Verified hosts, community-authored descriptions |
| Visitors and travellers | What is actually on, this week, near here | Map, calendar, digital pass, no local knowledge required |
| Families | Filters that respect price and suitability | Free vs paid filter, calendar planning, Circles |

### 5.2 Organisers and hosts

| Segment | Pain | Value |
|---|---|---|
| Diaspora and cultural associations | Audience capped at existing membership; no data for grants | New audience reach; acquittal-ready reports; free RSVP tooling |
| Grassroots festival and market organisers | Manual ticketing; no pre-sale cash flow; door chaos | Low-fee ticketing; pre-sale; QR gate check-in that actually works |
| Arts spaces and studios | Fragmented promotion across five platforms | One profile, followers, repeat-attendance data |
| Places of worship and community centres | Digital capability gap | Zero-cost publishing, wizard-driven, mobile-only workable |
| First Nations organisations | Control over cultural representation and data | Community-controlled profiles, consent-based publishing, cultural protocol governance (see §10) |
| Local businesses | Reaching cultural audiences affordably | Directory profile, offers with redemption codes tied to attendance |

### 5.3 Institutions

| Segment | What they buy | Why |
|---|---|---|
| Local councils | Participation dashboard licence | Statutory and policy reporting on cultural participation they cannot currently measure |
| State cultural and multicultural bodies | Program-level measurement, grant-recipient tooling | Evidence of outcomes across a funded portfolio |
| Tourism boards | Dispersal and visitor-participation data | Proof that visitors moved beyond the CBD |
| Universities | Student cultural participation and belonging data | International student retention and wellbeing programs |
| Corporate sponsors | Category-exclusive placement, awards partnership | Measurable, mission-aligned reach into diverse, high-intent audiences |

---

## 6. Business model and pricing

### 6.1 Ticketing commission

**3.5% + A$0.80 per paid ticket.** Free RSVP tickets: A$0.00, permanently.

Effective platform take on GMV is 6.0% at an A$32 average price, falling toward 5.7% as average price rises. Payment processing (~1.75% + A$0.30) is a pass-through cost we absorb inside the commission, leaving a positive net margin on every transaction.

Positioning: materially below the effective rate a low-price ticket attracts on mainstream platforms, which is the entire reason a A$12 community ticket can exist on CulturePass and cannot exist elsewhere.

Hosts may pass the fee to attendees or absorb it. Default is absorb, because it keeps the displayed price honest.

### 6.2 Organiser SaaS

| Tier | Price | For | Includes |
|---|---|---|---|
| **Community** | Free | Any verified host | Unlimited free events, basic profile, RSVP, guest list, basic analytics |
| **Organiser** | A$29/mo | Regular hosts | Paid ticketing, ticket types, co-hosts, `.ics` and calendar tools, standard analytics |
| **Professional** | A$59/mo | Festivals, arts spaces | Grant acquittal exports, audience CRM, promotional boosts, multi-language content, 3 seats |
| **Institution** | A$99/mo | Councils, peak bodies, universities | Multi-entity management, custom reporting, API access, 10 seats, priority support |

Blended ARPA is modelled at A$49–69/month across the plan. Nonprofit and First Nations organisations receive Professional at no cost — this is a deliberate cost of doing business honestly in this category, and it is what makes the grant case credible.

### 6.3 Brand sponsorship and featured listings

| Package | Indicative annual | Includes |
|---|---|---|
| City Partner | A$25,000–60,000 | Category exclusivity in one city, feed placement, co-branded collection |
| National Partner | A$120,000–250,000 | All AU cities, Culture Passion Awards category naming, data reporting |
| Awards Presenting Partner | A$150,000–350,000 | Naming of the Culture Passion Awards, event presence, year-round campaign |
| Featured listing / boost (self-serve) | A$40–400 per campaign | Placement in feed and category surfaces, clearly labelled |

Target categories: banks and payments, airlines, telecommunications, grocery and FMCG brands with diaspora audiences, universities, health insurers, money-transfer services. Full inventory: [`04-culture-passion-awards/04-sponsorship-prospectus.md`](../04-culture-passion-awards/04-sponsorship-prospectus.md).

**Editorial firewall.** Sponsored placement is always labelled and never alters organic ranking. Sponsors cannot buy their way into "For You". This is stated in every sponsor contract because the platform's value dies without it.

### 6.4 Civic and tourism-board licences

Annual licence, A$35,000–75,000 depending on population and scope, for a participation dashboard covering: attendance by cultural community, suburb-level dispersal, funded-activity attribution, underserved-community gap analysis, and exportable reporting for statutory and program use. Individual-level data is never exposed; all civic reporting is aggregated with small-cell suppression.

### 6.5 Cultural Passport and loyalty

Free tier with stamps for attendance, streaks and city collections. Paid **Passport+** at A$8.99/month or A$79/year: early access to high-demand events, partner offers, and Culture Passion Awards voting rights. Not modelled as revenue in FY27–FY29 — it is a retention mechanism first, and counting it as revenue this early would flatter the model.

### 6.6 Revenue mix discipline

No single revenue line exceeds 40% of platform revenue in any modelled year. Sponsorship is the largest at 38% in FY29, which is a concentration risk named in §15 with a mitigation: contract minimum 18-month terms, and hold at least four independent national partners.

---

## 7. Go-to-market

### 7.1 The wedge

**Event discovery is the wedge.** Not ticketing. Not SaaS. The first thing that must be true is that CulturePass is the single best answer to "what cultural thing is on in Melbourne this weekend". Everything else is downstream of that.

This means FY27 supply acquisition is not gated on willingness to pay. We onboard hosts publishing free events aggressively, because feed density is the product.

### 7.2 The 90-day Melbourne pilot

Detail in [`03-marketing/02-gtm-pilot-playbook.md`](../03-marketing/02-gtm-pilot-playbook.md). Summary:

**Days 1–30 — supply first, in six suburbs.** Footscray, Dandenong, Brunswick, Springvale, Collingwood, Preston. Target 120 verified hosts and 300 published events before any consumer marketing. A feed with 30 events does not retain anyone.

**Days 31–60 — demand.** Suburb-level launch with community media, ethnic radio, university orientation, council newsletters, and a founding-member Passport cohort. Target 8,000 registered participants and 12,000 attendances.

**Days 61–90 — prove the loop.** First paid ticketing cohort, first gate check-ins at scale, first grant acquittal reports delivered to hosts, first council conversation backed by real data. Target 60% month-3 host retention.

### 7.3 Acquisition channels, ranked by expected efficiency

1. **Host-led (free).** Every onboarded host brings their existing audience. Each host onboarded historically converts a fraction of their list; this is why participant CAC is A$3.60 rather than A$25.
2. **Community partnership (near-free).** Peak bodies, migrant resource centres, ethnic media, places of worship, libraries, councils. One MoU with a peak body can reach 40 member organisations.
3. **Culture Passion Awards (paid, high leverage).** Nominations require a platform profile. The awards campaign is a host-acquisition campaign with a prize pool. See §7.5.
4. **Local business offers.** Businesses promote CulturePass to their customers to drive redemption of their own offers. Their incentive is aligned and free to us.
5. **University and student channels.** International student orientation is the single densest concentration of high-intent cultural participants in the country.
6. **Content and SEO.** City cultural calendars, "what's on" pages, community landing pages. Slow to compound, extremely durable. Start in month 1 for a FY28 payoff.
7. **Paid social and search.** Capped at under 25% of marketing spend. Used for retargeting and event-specific campaigns, not for cold audience building.

### 7.4 Retention

- **Participants:** weekly personalised digest, Passport streaks, Circles (attending with people is the strongest retention mechanic we have), calendar integration.
- **Hosts:** the acquittal report is the retention product. Once a host has used CulturePass data to win a grant, switching costs become real. Second mechanism: audience list ownership — their followers live here.

### 7.5 The Culture Passion Awards as a growth engine

The awards are not brand marketing. They are the acquisition flywheel:

1. Nomination requires a CulturePass community profile → supply acquisition.
2. Public voting requires a participant account → demand acquisition.
3. Nominees promote their own nomination to their own networks → viral loop at zero CAC.
4. Sponsors fund the prize pool → the acquisition channel is revenue-positive.
5. Winners become case studies for grant applications and civic sales → sales enablement.
6. Media covers awards in a way it never covers app launches → earned reach.

Full program design: [`04-culture-passion-awards/`](../04-culture-passion-awards/).

---

## 8. Competition and defensibility

### 8.1 Landscape

| Player | Strength | Why they lose this category |
|---|---|---|
| **Eventbrite** | Brand, scale, payments | Fee structure designed for high-price tickets; generic categories; no cultural community model; no civic reporting; no incentive to serve a 60-person event |
| **Facebook Events / Meta** | Ubiquity, zero cost | Discovery requires prior group membership; declining organic reach; no ticketing depth; no data a funder will accept; organisers do not trust it |
| **Humanitix** | Not-for-profit model, AU presence, goodwill | Ticketing utility, not a discovery platform; no community graph; no participation measurement product |
| **Luma** | Excellent UX, fast growth | Tech-event and professional-network focus; no cultural or civic layer; no multicultural or language depth |
| **Council "what's on" pages** | Authority, trust | One LGA each, no cross-city discovery, no ticketing, no data |
| **WhatsApp / community groups** | Trust, actual current behaviour | Invisible to non-members; the incumbent we are replacing, and the reason free must stay free |
| **Meetup** | Recurring-group model | Interest groups not cultural heritage; declining relevance in AU |

### 8.2 Where the moat comes from

Not the code. The code is replicable in six months. The moat is four things that compound:

1. **The community graph.** Verified hosts, follower relationships, cultural taxonomy, and language mappings built with community consent. This is slow, relational, unscrapable work. A competitor cannot buy it.
2. **Civic embedment.** Once a council reports statutory cultural participation using CulturePass data, we are inside their reporting cycle. Switching means re-baselining a time series — which nobody does voluntarily.
3. **The acquittal-report lock-in.** A host whose last three successful grant applications cited CulturePass reports does not move platforms.
4. **The Culture Passion Awards as owned institution.** An annual awards program with recognised prestige is an asset a competitor must spend years and real money to match, and it makes us the category's convening point.

### 8.3 What we do not claim

We do not claim a technology advantage. We do not claim network effects will make us unassailable — cultural discovery is local, so a competitor could win Sydney while we hold Melbourne. Our defence is speed to the community graph and civic contracts in each market, city by city.

---

## 9. Operations and technology

### 9.1 Architecture

```
Participants / Hosts (mobile-first web + native shells)
        │
        ├── static bundle ──> CloudFront ──> S3
        └── HTTPS API ──────> ALB ──> ECS Fargate (Express API)
                                       ├── Aurora Serverless v2 (PostgreSQL)
                                       ├── SQS (notifications, async jobs)
                                       ├── SES (transactional email)
                                       ├── S3 (uploads)
                                       └── Stripe (payments, Connect payouts)
Auth: Amazon Cognito (SRP) · Region: ap-southeast-2 · IaC: AWS CDK (TypeScript)
```

Key deliberate decisions, carried from the technical blueprint:

- **SPA over SSR.** Static bundle on CloudFront gives sub-100ms asset delivery at minimal ops overhead. SEO for public event pages is handled by pre-rendered public routes, planned H2 FY27.
- **Search behind a repository abstraction.** Postgres full-text search today; swapping to OpenSearch requires overriding one repository implementation, not touching controllers. This is the difference between a two-week and a two-quarter migration at FY28 scale.
- **Signed QR tokens.** Check-in integrity is enforced server-side: duplicate, wrong-event, cancelled and refunded tickets all fail at the gate. Door integrity is what makes attendance data trustworthy, which is what makes the civic product sellable.
- **OpenAPI as contract.** Zod schemas and React Query hooks are generated from `openapi.yaml`. Frontend and backend cannot drift silently.

### 9.2 Cost of service

Cloud cost is modelled at 0.6% of GMV with a floor (A$42k FY27 → A$210k FY29). Aurora Serverless v2 scales to near-zero between event peaks, which matters because cultural event traffic is extremely spiky — Friday evening and Saturday morning dominate.

### 9.3 Compliance and data protection

| Obligation | Position |
|---|---|
| Australian Privacy Act 1988 / APPs | Privacy policy, collection notices, data minimisation, breach response plan — all required pre-launch |
| Payment security | PCI-DSS SAQ-A; no card data touches our infrastructure (Stripe Elements) |
| Consumer law (ACL) | Refund and cancellation policy, ticket terms, clear pre-purchase disclosure of all fees |
| Child safety | Victorian Child Safe Standards where events involve minors; host attestation at publish time |
| Working with Children / insurance | Host attestation and, for high-risk categories, verification before publish |
| Accessibility | WCAG 2.2 AA target, audited before public launch — non-negotiable for government procurement |
| Data residency | AU data in `ap-southeast-2`. EU/GCC regional deployment planned for FY29 entry |
| GDPR (FY29, London entry) | DPA, lawful basis, DSAR process, EU deployment before UK/EU launch |
| Indigenous data | ICIP protocols and Indigenous Data Sovereignty principles — see §10 |

Compliance is 20% of the seed allocation. Government procurement and grant eligibility both require it, and retrofitting it is more expensive than building it.

### 9.4 Business process management

The full process architecture — 14 core processes with owners, RACI, SLAs, KPIs, controls and failure modes, mapped to the actual API and route surface — is in [`02-strategy-framework/02-bpms.md`](../02-strategy-framework/02-bpms.md).

---

## 10. Trust, safety and cultural governance

This section exists because it is the part most platforms get wrong, and in this category getting it wrong is fatal.

### 10.1 Host verification

Three tiers:
- **Unverified** — can create drafts. Cannot publish paid events.
- **Verified** — identity plus organisational evidence (ABN, incorporation, or two community references). Can publish, sell tickets, receive payouts. Displays the verified badge.
- **Trusted partner** — verified plus a track record of three completed events with clean check-in and no upheld reports. Gets promotional placement eligibility and reduced review latency.

### 10.2 Content moderation

Every event enters `PENDING_REVIEW` before first publish for a new host; established hosts publish directly with post-hoc sampling. Reports from any profile route to the admin moderation queue. Every decision writes an audit log entry. Target: 90% of reports triaged within 24 hours, harmful content within 2 hours.

### 10.3 Cultural protocol governance

- **Cultural Advisory Council.** Six to nine members representing First Nations, major diaspora communities, and arts practice. Meets quarterly. Reviews taxonomy, verification standards, awards judging, and any escalated representation dispute. Members are paid — unpaid advisory councils are extraction.
- **First Nations protocol.** Events involving First Nations culture require the host to attest to community authority or partnership. ICIP is respected: cultural knowledge shared on the platform remains the property of its community. First Nations organisations control their own profiles and can restrict data use. We follow Indigenous Data Sovereignty principles for any aggregate reporting that identifies First Nations activity.
- **Representation disputes.** A community can contest another host's representation of its culture. Escalates to the Advisory Council, not to us. We are infrastructure, not arbiter.
- **No cultural appropriation for commercial gain.** Sponsored content cannot use cultural imagery without a partnering community host. Enforced contractually.

### 10.4 Participant safety

Signed-QR passes prevent ticket fraud. Reporting is available on every profile. Circles are private by default. Venue and address data is public by necessity but exact-location display is host-controlled for sensitive gatherings — some communities have legitimate safety reasons to restrict venue visibility until RSVP.

---

## 11. Organisation and hiring plan

### 11.1 Current team

**Bibin Jose — Founder & CEO.** Built the CulturePass platform end to end: React frontend, Express API, PostgreSQL data model, AWS CDK infrastructure. Product, engineering and community relationships to date. *[Expand with background, prior ventures, and community credentials before external circulation — investors and grant assessors both weight founder-market fit heavily, and this is currently the thinnest part of the pack.]*

### 11.2 Hiring sequence

**FY27 — 6 FTE (A$708k fully loaded)**

| Role | Timing | Why first |
|---|---|---|
| Founder & CEO | — | Product, fundraising, partnerships |
| Senior Full-Stack Engineer | Month 1 | Removes the single-engineer bus factor; owns payments and auth hardening |
| Community & Partnerships Lead (Melbourne) | Month 1 | Host acquisition is relational fieldwork, not marketing |
| Growth & Content Marketer | Month 2 | Owns the city feed as an editorial product |
| Trust, Safety & Operations Coordinator | Month 3 | Moderation SLAs, verification, host support |
| Data & Impact Analyst | Month 5 | Builds the civic dashboard and the grant acquittal reports — the two highest-value assets |

**FY28 — 17 FTE.** +3 engineering, +3 city community leads (Sydney, Brisbane, Perth/Adelaide), +1 designer, +1 sponsorship sales, +1 civic/government sales, +1 finance & compliance, +1 support.

**FY29 — 38 FTE.** Engineering to 12, international market leads, dedicated awards program manager, expanded sales and trust & safety.

### 11.3 Governance

- Advisory board (commercial): marketplace operator, arts-sector executive, government-procurement specialist.
- Cultural Advisory Council (§10.3) — paid, quarterly, with real authority over representation decisions.
- Board formed at seed close: founder, lead investor, independent chair.

### 11.4 Key-person risk

Named plainly: the platform was built by one person and that person is also the CEO. Mitigations, in order of priority — hire the senior engineer in month 1, document architecture (already substantially done in the technical blueprint), enforce code review from the second engineer's first week, and keep infrastructure fully in CDK so nothing lives only in someone's head.

---

## 12. Financial plan

Complete build with all drivers, sensitivities and the generating script: [`model/financial-model.md`](model/financial-model.md) and [`model/financial-model.csv`](model/financial-model.csv).

### 12.1 Summary P&L (A$)

| | FY27 | FY28 | FY29 |
|---|---|---|---|
| GMV | 798,720 | 5,304,000 | 21,384,000 |
| Ticketing commission | 48,000 | 310,400 | 1,223,600 |
| Organiser SaaS | 17,640 | 155,760 | 703,800 |
| Sponsorship & featured | 120,000 | 620,000 | 2,100,000 |
| Civic & tourism licences | 0 | 180,000 | 660,000 |
| Awards sponsorship | 0 | 260,000 | 900,000 |
| **Platform revenue** | **185,563** | **1,526,200** | **5,587,440** |
| Grant income (target) | 250,000 | 900,000 | 1,400,000 |
| **Total income** | **435,563** | **2,426,200** | **6,987,440** |
| Cost of revenue | 63,465 | 235,620 | 762,420 |
| **Gross profit** | **122,098** | **1,290,580** | **4,825,020** |
| Gross margin | 65.8% | 84.6% | 86.4% |
| People | 708,000 | 2,142,000 | 5,016,000 |
| Marketing & community | 180,000 | 760,000 | 1,900,000 |
| Awards delivery | 95,000 | 340,000 | 980,000 |
| G&A | 140,000 | 420,000 | 900,000 |
| **EBITDA excl. grants** | **(1,000,902)** | **(2,371,420)** | **(3,970,980)** |
| **EBITDA incl. grants** | **(750,902)** | **(1,471,420)** | **(2,570,980)** |
| Headcount (FTE) | 6 | 17 | 38 |

### 12.2 Reading the shape

Gross margin expands from 66% to 86% because FY27 revenue is dominated by transaction income (which carries payment-processing cost) while FY28–29 mix shifts toward sponsorship and licences (which carry almost none). This is the intended mix shift, not an accident of the spreadsheet.

FY29 loss grows in absolute terms because FY29 is the deliberate multi-city expansion year. Cumulative EBITDA excluding grants across the three years is **(A$7.34M)**; net funding need after modelled grant income is **A$4.79M** against A$7.0M of modelled capital, leaving buffer for slippage.

### 12.3 Unit economics

| Metric | Value | Basis |
|---|---|---|
| Host CAC | A$180 | FY28; field team plus partnership sourcing |
| 3-year host LTV | A$728 | Host-attributable gross profit only (ticketing + SaaS, net of payment and cloud cost) |
| **LTV : CAC** | **4.0:1** | Floor is 3:1. Two consecutive quarters below 3:1 freezes growth spend. |
| Participant CAC | A$3.60 | Blended; host-led and partnership acquisition dominate the mix |
| Platform revenue per active host (all lines) | A$580 / A$954 / A$1,164 | FY27/28/29. Scale reference only — not used in LTV. |

### 12.4 Path to profitability

Platform revenue crosses total operating expense at approximately **A$13–15M annual platform revenue**, reached in FY31 on the current trajectory. Grant income accelerates that by roughly two to three quarters. The FY30–FY31 plan is deliberately not modelled in detail here: three-year models are planning tools, five-year models are fiction.

### 12.5 Downside case

If paid-ticket share holds at 22% rather than 33%, average price lands at A$28, sponsorship delivers at half of plan, and civic contracts do not close, FY29 platform revenue falls to A$3.36M — 60% of plan. In that scenario the FY29 expansion does not happen; the business runs 5 Australian cities at 22 FTE with a burn of roughly A$1.6M/year against grant plus sponsorship income, which is survivable on the seed plus one bridge. The plan degrades; it does not break.

---

## 13. Funding strategy

Three capital sources, deliberately blended. Full detail: [`06-funding/01-funding-strategy.md`](../06-funding/01-funding-strategy.md).

### 13.1 Equity — A$2.5M seed (the current ask)

| Allocation | Share | Amount | Use |
|---|---|---|---|
| Product & engineering | 45% | A$1,125,000 | 4 engineers, payments/auth hardening, acquittal reports, civic dashboard, native shells |
| Growth & community | 35% | A$875,000 | Melbourne field team, Culture Passion Awards year 1, content and community partnerships |
| Operations & compliance | 20% | A$500,000 | Legal, privacy, WCAG audit, insurance, finance, government-procurement readiness |

18–24 months of runway. Target investors: Australian pre-seed/seed funds with marketplace or civic-tech theses, impact funds, and angels with arts, migration or local-government backgrounds.

### 13.2 Non-dilutive — A$2.55M grant target FY27–FY29

Grants are not charity in this plan; they are the mechanism that makes market-entry CAC viable in communities where commercial CAC never would be. Target categories:

- Arts and cultural development (Creative Australia, Creative Victoria, council arts grants)
- Multicultural affairs and social cohesion (Victorian Multicultural Commission, Department of Home Affairs programs, Scanlon Foundation)
- Tourism and visitor economy (Visit Victoria, City of Melbourne event partnerships)
- Digital inclusion and capability (philanthropic trusts, corporate foundations)
- R&D Tax Incentive — the most reliable line, a refundable offset on eligible development spend
- International: UNESCO IFCD, British Council, Creative Europe (FY29)

Full pipeline with amounts, fit assessment and application status: [`06-funding/03-grant-target-list-australia.md`](../06-funding/03-grant-target-list-australia.md) and [`06-funding/04-grant-target-list-international.md`](../06-funding/04-grant-target-list-international.md).

### 13.3 Commercial — sponsorship and civic contracts

A$4.56M contracted across FY27–FY29 in the model. This is revenue, not funding, but it functions as capital because it arrives largely in advance of delivery. Two anchor national sponsors in FY27 would fund the entire Culture Passion Awards program and remove that cost line from the burn.

### 13.4 Sequencing

| Quarter | Action |
|---|---|
| Q1 FY27 (Sep–Nov 2026) | Seed round open. Submit 3 grant applications. Secure 2 foundation sponsors. Launch Melbourne pilot. |
| Q2 FY27 | Seed close. R&D Tax Incentive registration. First civic conversation with data behind it. Awards nominations open. |
| Q3 FY27 | Awards ceremony. First anchor national sponsor. State-level grant submissions. |
| Q4 FY27 | FY27 gate review. Series A materials if gates met. Sydney/Brisbane pre-launch partnerships. |

---

## 14. Milestones and gates

### 14.1 FY27 exit gates — these decide whether the Series A happens

| # | Gate | Target | Consequence if missed |
|---|---|---|---|
| 1 | Active verified hosts (Melbourne) | 320 | Below 200: the wedge is wrong. Re-examine whether discovery or organiser tooling is the real entry point. |
| 2 | Month-3 host retention | ≥60% | Below 45%: no expansion. Fix retention before adding cities. |
| 3 | Published events | 2,400 | Below 1,500: feed density insufficient; reallocate all growth spend to supply. |
| 4 | Attendances | 96,000 | Below 60,000: demand-side channels are not working. |
| 5 | Paid-ticket share of attendance | ≥26% | Below 18%: revisit the transaction-revenue thesis; SaaS and civic become primary. |
| 6 | Grant income secured | ≥A$250,000 | Below A$150,000: the public-funding thesis is unproven; the model must stand on commercial revenue alone. |
| 7 | Civic pilot signed | ≥1 council | Zero: the civic product is FY29, not FY28. Remove A$180k from FY28. |
| 8 | Culture Passion Awards delivered | ≥400 nominations, ≥15,000 votes | Under half: the awards are marketing, not an acquisition channel. Re-cost. |
| 9 | Check-in integrity | ≥85% of paid tickets scanned at gate | Below 70%: attendance data is not trustworthy and the civic product cannot be sold. |
| 10 | WCAG 2.2 AA and privacy compliance | Complete | Incomplete: government procurement is closed to us. Blocking. |

### 14.2 Longer arc

| Period | Milestone |
|---|---|
| FY28 H1 | Sydney and Brisbane live; 3 civic licences; first national sponsor renewed |
| FY28 H2 | Perth and Adelaide live; 1,600 hosts; awards year 2 at national scale |
| FY29 H1 | Auckland live; multi-currency shipped; A$1M+ quarterly GMV |
| FY29 H2 | Dubai and London live; 4,800 hosts; A$5.5M platform revenue |
| FY30–31 | Operating-profit crossover at A$13–15M platform revenue |

---

## 15. Risks

| # | Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|---|
| 1 | **Cold-start failure** — feed too sparse to retain participants | Medium | Critical | Supply-first sequencing: 120 hosts and 300 events before any consumer marketing. Six-suburb concentration rather than city-wide thin coverage. |
| 2 | **Host retention below plan** | Medium | Critical | The acquittal report is the retention product. Ship it in H1 FY27, not later. Retention gate blocks expansion spend. |
| 3 | **Key-person dependency on founder** | High | High | Senior engineer in month 1. Architecture documented. Full CDK IaC. Code review mandatory from the second engineer onward. |
| 4 | **Community trust breach** — perceived extraction, appropriation, or a data misstep | Low | Critical | Free stays free. Paid Cultural Advisory Council with real authority. No individual data sold, ever. ICIP and Indigenous Data Sovereignty protocols. One serious breach ends the company in this category. |
| 5 | **Sponsorship concentration** (38% of FY29 revenue) | Medium | High | Minimum four independent national partners. 18-month minimum terms. Downside case runs without sponsorship at plan. |
| 6 | **Grant income does not materialise** | Medium | Medium | Grants are additive in the model, not load-bearing: the business is EBITDA-negative with or without them in FY27–29, and the seed is sized on the commercial case. R&D Tax Incentive is the most probable line. |
| 7 | **Eventbrite or Meta builds a cultural vertical** | Low | High | Their fee structure and generic taxonomy cannot serve a A$12 ticket profitably. Our defence is the community graph and civic contracts, acquired city by city, faster than an incumbent will bother. |
| 8 | **Payment, fraud or chargeback losses** | Medium | Medium | Stripe Radar; payout holds for new hosts until first event completes; refund reserve; clear cancellation terms. |
| 9 | **Regulatory — privacy or consumer-law breach** | Low | High | 20% of seed to compliance. Privacy impact assessment pre-launch. External review before international entry. |
| 10 | **Multi-city expansion dilutes execution** | Medium | High | No city entry without a civic partner or committed anchor network. Documented, twice-executed launch playbook required before city 3. |
| 11 | **Safety incident at a listed event** | Low | High | Host attestations, insurance verification for high-risk categories, Child Safe Standards compliance, clear platform-versus-organiser liability terms, incident response plan. |
| 12 | **International entry underestimates localisation** | Medium | Medium | Auckland first (lowest localisation cost) to test the playbook before Dubai and London. Anchor partner required pre-entry. |

Expanded register with owners, triggers and review cadence: [`05-risk-register.md`](05-risk-register.md).

---

## 16. Exit and long-term value

We are building to be durable infrastructure, not to flip. That said, investors are owed a clear view of the paths:

- **Strategic acquisition.** Ticketing and experience platforms (Eventbrite, Ticketmaster, Klook, GetYourGuide, Humanitix) buying the community graph and civic relationships they cannot build. Travel and hospitality platforms buying authentic-local supply.
- **Government and civic technology.** The participation dashboard is a standalone govtech asset with recurring, contracted, extremely sticky revenue. Civic-tech acquirers value that multiple highly.
- **Continued independence.** At A$13–15M platform revenue the business is profitable and self-funding. A profitable, mission-critical piece of cultural infrastructure is a legitimate terminal state, and one worth more to the communities on it than any acquisition.

The asset that matters in all three cases is the same: the only trustworthy, longitudinal dataset of cultural participation in the cities we operate in, built with community consent. That is what compounds.

---

## Appendices

- [`model/financial-model.md`](model/financial-model.md) — full model, drivers, sensitivities
- [`03-financial-model.md`](03-financial-model.md) — narrative walkthrough of the model
- [`04-market-analysis.md`](04-market-analysis.md) — market sizing, segments, competitive detail
- [`05-risk-register.md`](05-risk-register.md) — expanded risk register with owners and triggers
- [`../02-strategy-framework/01-strategic-framework.md`](../02-strategy-framework/01-strategic-framework.md) — strategy, pillars, OKRs
- [`../02-strategy-framework/02-bpms.md`](../02-strategy-framework/02-bpms.md) — business process management system
- [`../08-appendix/data-room-checklist.md`](../08-appendix/data-room-checklist.md) — diligence data room
- [`../08-appendix/kpi-dictionary.md`](../08-appendix/kpi-dictionary.md) — metric definitions

---

*This document contains forward-looking planning assumptions. No revenue is contracted, no grant is committed, and no sponsorship is signed as at August 2026.*
