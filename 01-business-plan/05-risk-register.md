# CulturePass — Risk Register

**Version 1.0 · August 2026** · Review cadence: monthly at leadership, quarterly at board.
Scoring: Likelihood (L) and Impact (I) on 1–5. Score = L × I. Anything ≥15 requires a named owner, a written mitigation, and a monthly board line.

Owner codes: **CEO** · **ENG** (Senior Engineer) · **COM** (Community & Partnerships Lead) · **TSO** (Trust, Safety & Ops) · **DAT** (Data & Impact Analyst) · **BRD** (Board / Advisory)

---

## 1. Critical risks (score ≥ 15)

### R1 — Cold-start failure: the feed is too sparse to retain participants
**L 3 · I 5 · Score 15 · Owner COM**

Marketplaces die here more than anywhere else. A participant who opens the app, sees eleven events, and closes it does not come back, and no amount of re-engagement email fixes a thin feed.

- **Leading indicators:** events published per suburb per week; day-7 participant retention; searches returning fewer than 5 results ("empty search rate").
- **Trigger:** empty search rate above 25%, or fewer than 15 published events in any target suburb at week 6.
- **Mitigation:** supply precedes demand absolutely — 120 verified hosts and 300 published events before any consumer marketing spend. Concentrate on six suburbs rather than spreading thin across Melbourne. Seed the calendar with council and library programming (public, high-volume, low-friction to onboard) to establish a floor.
- **Contingency:** pause consumer acquisition entirely, redirect 100% of growth spend to host onboarding, and narrow to three suburbs.

### R2 — Host retention below plan
**L 3 · I 5 · Score 15 · Owner COM / DAT**

A host who publishes once and never returns costs A$180 to acquire and returns nothing. Retention, not acquisition, is the real business.

- **Leading indicators:** month-1 / month-3 / month-6 cohort re-publish rate; time from signup to first published event; acquittal-report usage.
- **Trigger:** month-3 retention below 45%.
- **Mitigation:** ship the grant acquittal report in H1 FY27, not later — it is the single feature that converts a nice-to-have into a workflow dependency. Host success check-in at day 7 and day 30. Make the host's follower list visibly theirs.
- **Contingency:** freeze expansion, run structured exit interviews with 30 churned hosts, and treat the finding as a product mandate.

### R3 — Community trust breach
**L 2 · I 5 · Score 10 (escalated to critical by consequence severity) · Owner CEO / BRD**

Perceived cultural extraction, appropriation in sponsored content, a data misstep, or being seen to profit from communities that gave freely. In this category one serious incident propagates through community networks faster than any marketing and is close to unrecoverable.

- **Leading indicators:** sentiment in community partner conversations; complaint volume from cultural organisations; Cultural Advisory Council escalations.
- **Trigger:** any Advisory Council escalation, or any public complaint from a partner organisation.
- **Mitigation:** free stays free — a written, published commitment. Individual-level data never sold, ever, to anyone. Paid Cultural Advisory Council with genuine authority over representation decisions, not a rubber stamp. ICIP and Indigenous Data Sovereignty protocols for First Nations content. Sponsored content cannot use cultural imagery without a partnering community host, enforced contractually.
- **Contingency:** immediate suspension of the offending activity, Advisory Council convened within 72 hours, public account of what happened and what changed. Do not manage this through communications strategy; manage it by changing the thing.

### R4 — Key-person dependency on the founder
**L 4 · I 4 · Score 16 · Owner CEO / BRD**

The entire platform was built by one person, who is also the CEO, the fundraiser and the primary community relationship holder. This is the highest-likelihood risk in the register.

- **Leading indicators:** proportion of commits by a single author; number of systems with only one person who can deploy them; count of community relationships held by only one person.
- **Trigger:** senior engineer not hired by end of month 2 post-close.
- **Mitigation:** senior full-stack engineer is hire #1, month 1. Architecture is already documented (platform brain + technical blueprint). All infrastructure in CDK so nothing exists only in someone's head. Mandatory code review from the second engineer's first week. Community relationships transitioned to the Community Lead with joint meetings, not handover emails.
- **Contingency:** contracted engineering retainer with a known agency as a standing fallback; documented deploy runbook; key-person insurance at seed close.

### R5 — Sponsorship concentration (38% of FY29 platform revenue)
**L 3 · I 4 · Score 12 · Owner CEO**

A 50% sponsorship shortfall costs A$1.05M of FY29 revenue — nearly twice the cost of a total collapse in paid-ticket share. The model's largest single vulnerability is not the thing the company looks like it does.

- **Leading indicators:** pipeline coverage ratio (weighted pipeline ÷ target); months of runway on contracted sponsorship; renewal intent at month 9 of each term.
- **Trigger:** fewer than 3 national partners contracted by end of FY28 Q2, or pipeline coverage below 2.5×.
- **Mitigation:** minimum four independent national partners, no single partner above 15% of platform revenue. Minimum 18-month terms. Category diversification (banking, telco, airline, FMCG, university, health) so a downturn in one sector does not take the book. Self-serve boost product as a long-tail floor.
- **Contingency:** the downside case is already costed — 5 AU cities, 22 FTE, A$1.6M annual burn against grant and sponsorship income. Contract, do not raise into it.

---

## 2. High risks (score 8–14)

### R6 — Grant income does not materialise
**L 3 · I 3 · Score 9 · Owner CEO / DAT**

- **Mitigation:** grants are structurally additive in the model, not load-bearing — the business is EBITDA-negative with or without them across all three years, and the seed is sized on the commercial case alone. Maintain 3× pipeline coverage against the target. Prioritise the R&D Tax Incentive, which is a refundable offset against eligible spend rather than a competitive round and is therefore the most probable line by a wide margin.
- **Trigger:** fewer than 2 grants secured by end of FY27 Q3.
- **Contingency:** reduce FY28 community-team headcount by 2 and narrow expansion to Sydney only.

### R7 — Payment, fraud and chargeback losses
**L 3 · I 3 · Score 9 · Owner ENG / TSO**

- **Mitigation:** Stripe Radar; payout holds for new hosts until first event completes; refund reserve held against GMV; explicit cancellation and refund terms surfaced pre-purchase; velocity limits on new accounts.
- **Note:** ticket funds held between sale and event must sit under a proper trust-accounting treatment before production payments launch. This is a **pre-launch blocker**, not a nice-to-have — misuse of held ticket funds is how ticketing companies end up in regulatory trouble.

### R8 — Multi-city expansion dilutes execution
**L 3 · I 4 · Score 12 · Owner CEO / COM**

- **Mitigation:** no city entry without either a signed civic partner or a committed anchor community network. The city-launch playbook must be documented and executed twice before city three. A dedicated city lead per market, not a shared one.
- **Trigger:** any city at month 3 below 50% of the Melbourne month-3 benchmark.
- **Contingency:** withdraw from the weakest market and consolidate. A withdrawn city is recoverable; three simultaneously failing cities are not.

### R9 — Regulatory breach: privacy, consumer law, accessibility
**L 2 · I 4 · Score 8 · Owner TSO / CEO**

- **Mitigation:** 20% of seed allocated to compliance. Privacy impact assessment before launch. WCAG 2.2 AA audit before public launch (also a hard prerequisite for government procurement). ACL-compliant refund and ticket terms. Data breach response plan tested, not just written. External review before any international entry.
- **Trigger:** any regulator contact, or WCAG audit incomplete at pilot launch.

### R10 — Safety incident at a listed event
**L 2 · I 4 · Score 8 · Owner TSO**

- **Mitigation:** host attestations at publish time; insurance verification for high-risk categories; Victorian Child Safe Standards compliance where minors are involved; clear platform-versus-organiser liability terms; documented incident response with a named on-call owner; public liability and cyber insurance in place at launch.

### R11 — Cultural representation dispute escalates publicly
**L 3 · I 3 · Score 9 · Owner CEO / BRD**

Two organisations claim authority over the same cultural representation, or a geopolitical conflict surfaces between diaspora communities on the platform.

- **Mitigation:** the Cultural Advisory Council adjudicates, not the company — we are infrastructure, not arbiter. Written escalation policy published before launch so the process exists before it is needed. Content policy prohibiting political campaigning and hate speech, enforced consistently and visibly.
- **Contingency:** temporary suspension of the disputed listing pending Council review, with the reason stated publicly and neutrally.

### R12 — Participant acquisition inverts to paid channels
**L 3 · I 3 · Score 9 · Owner COM / DAT**

The model assumes A$3.60 participant CAC because acquisition is community-led. If host-led and partnership channels underperform and we start buying participants, CAC moves toward A$18–25 and the marketing line roughly triples.

- **Leading indicators:** share of new participants attributable to host referral and partnership channels; paid share of marketing spend.
- **Trigger:** paid channels exceeding 25% of marketing spend, or host-referred acquisition below 40% of new participants.
- **Mitigation:** instrument attribution from day one — this cannot be reconstructed later. Invest in the host referral mechanic (a host sharing their event should bring their audience with a single link). Hard cap paid spend at 25%.

---

## 3. Moderate risks (score 4–7)

| # | Risk | L | I | Score | Owner | Mitigation |
|---|---|---|---|---|---|---|
| R13 | Eventbrite or Meta builds a cultural vertical | 2 | 4 | 8 | CEO | Their fee structure cannot profitably serve a A$12 ticket; their taxonomy cannot express cultural community. Defence is community graph and civic contract speed, market by market. |
| R14 | International entry underestimates localisation cost | 3 | 2 | 6 | CEO | Auckland first — lowest localisation cost — to test the playbook before Dubai and London. Anchor partner required pre-entry. |
| R15 | Seasonality creates cash-flow stress | 3 | 2 | 6 | CEO | Revenue is lumpy around a multi-community festival calendar. Maintain 6 months of operating cash; do not plan headcount starts against peak-season revenue. |
| R16 | Cloud cost scales faster than modelled | 2 | 2 | 4 | ENG | Cost monitoring with alerting from month 1; Aurora Serverless v2 auto-scaling; CDN caching of public event pages; monthly unit-cost-per-attendance review. |
| R17 | Search quality fails at FY28 scale | 3 | 2 | 6 | ENG | The OpenSearch migration path is already isolated behind a repository abstraction — a two-week change, not a two-quarter one. Trigger the migration at 15,000 published events. |
| R18 | Host support volume outruns the team | 3 | 2 | 6 | TSO | Self-serve help content and onboarding video from launch; community-led peer support; support-tickets-per-host tracked as a scaling metric with a hiring trigger. |
| R19 | Sponsored content perceived as compromising the feed | 2 | 3 | 6 | CEO | Editorial firewall written into every sponsor contract: labelled placement, no organic-ranking influence, no purchase of "For You". |
| R20 | Awards program judged as tokenistic or captured by sponsors | 2 | 3 | 6 | CEO | Independent judging panel with published criteria; sponsors have no vote; prize money paid directly to recipients; conflict-of-interest declarations published. |
| R21 | Ticket-fund float creates a trust-accounting liability | 2 | 3 | 6 | CEO | Held funds segregated; trust-accounting treatment in place before production payments; float never used as working capital. |

---

## 4. Risk review process

| Cadence | Forum | Output |
|---|---|---|
| Weekly | Leadership standup | Leading indicators for R1, R2, R12 reviewed against triggers |
| Monthly | Leadership risk review | Full register reviewed; any score ≥15 gets a written status |
| Quarterly | Board + Cultural Advisory Council | Register re-scored; new risks admitted; retired risks closed with rationale |
| Event-driven | Immediate | Any trigger breach convenes the owner and CEO within 48 hours |

**Register discipline:** a risk with no owner, no leading indicator and no trigger is not a managed risk — it is a worry written down. Every entry above has all three, or it does not belong in the register.
