# CulturePass — Data Room Checklist

**For seed diligence, grant assessment and civic procurement.** Owner: CEO.
Status key: ✅ complete · 🟡 partial · ⬜ not started · **⛔ blocking**

---

## 1. Corporate

| Item | Status | Note |
|---|---|---|
| Certificate of incorporation | **⛔** | Company not yet registered. Blocking for round close. See [`../06-funding/08-entity-and-foundation-strategy.md`](../06-funding/08-entity-and-foundation-strategy.md). |
| Constitution | ⬜ | With incorporation |
| Cap table, pre and post round | ⬜ | With lawyer |
| Founder share vesting | ⬜ | Investors will expect it |
| ESOP pool and plan rules | ⬜ | Needed before the first five hires |
| ASIC company extract | ⬜ | Post-incorporation |
| Business name registrations | ⬜ | Resolve the CulturePass / CultureOS / Culture Passion naming question first |
| Trade marks (IP Australia) | ⬜ | Search before spending on brand. International clearance is a separate FY29 task. |
| Board minutes and resolutions | ⬜ | From seed close |
| Register of members and officers | ⬜ | Post-incorporation |

## 2. Financial

| Item | Status |
|---|---|
| 3-year driver model with all assumptions exposed | ✅ [`../01-business-plan/model/`](../01-business-plan/model/) |
| Model source code (auditable, re-runnable) | ✅ `financial_model.py` |
| Sensitivity and downside cases | ✅ |
| Unit economics with LTV construction stated | ✅ |
| Capital plan and runway | ✅ |
| Historical accounts | n/a — pre-trading |
| Management accounts | ⬜ From incorporation |
| Bank statements | ⬜ From incorporation |
| Tax registrations (ABN, GST, PAYG) | ⬜ With incorporation |
| **R&D Tax Incentive registration** | ⬜ Q1 FY27 — highest-certainty funding line |
| Accountant engaged | ⬜ Prefer R&D-experienced |

## 3. Strategy and plan

| Item | Status |
|---|---|
| Business plan | ✅ [`../01-business-plan/02-business-plan.md`](../01-business-plan/02-business-plan.md) |
| Executive summary | ✅ |
| Market analysis with bottom-up sizing | ✅ |
| Risk register, scored, with owners and triggers | ✅ [`../01-business-plan/05-risk-register.md`](../01-business-plan/05-risk-register.md) |
| Strategic framework and OKRs | ✅ |
| Business process management system | ✅ [`../02-strategy-framework/02-bpms.md`](../02-strategy-framework/02-bpms.md) |
| Governance and operating model | ✅ |
| Marketing strategy and budget | ✅ |
| Pilot playbook | ✅ |
| FY27 exit gates | ✅ Business plan §14 |

## 4. Product and technology

| Item | Status |
|---|---|
| Architecture documentation | ✅ Platform brain + technical blueprint |
| Repository access (read-only, for technical diligence) | ⬜ Prepare a scoped access path |
| OpenAPI contract | ✅ `lib/api-spec/openapi.yaml` |
| Database schema documentation | ✅ |
| Infrastructure as code (AWS CDK) | ✅ |
| Deploy runbook | 🟡 Document properly — key-person mitigation |
| Product roadmap | ✅ Business plan §3.3 |
| **Live demo, rehearsed to 8 minutes** | ⬜ Do before the investor soft launch |
| Test coverage summary | 🟡 |
| Third-party dependency and licence list | ⬜ |
| Penetration test | ⬜ Before first civic contract |

## 5. Legal and compliance

| Item | Status | Note |
|---|---|---|
| Privacy policy | ⬜ | Pre-launch requirement |
| **Privacy impact assessment** | ⬜ | Pre-launch. Grant and procurement prerequisite. |
| Terms of service (participants) | ⬜ | Pre-launch |
| Host terms, including ticketing and payout terms | ⬜ | Pre-launch |
| Refund and cancellation policy (ACL-compliant) | ⬜ | Pre-launch |
| **Trust-accounting arrangement for held ticket funds** | **⛔** | **Pre-launch blocker. Disclose proactively in diligence.** See BPMS P09. |
| Data breach response plan | ⬜ | Pre-launch, and tested not just written |
| **WCAG 2.2 AA accessibility audit** | ⬜ | Pre-launch. Hard prerequisite for government procurement. |
| Child Safe Standards compliance statement | ⬜ | Pre-launch |
| Public liability and cyber insurance | ⬜ | Pre-launch |
| PCI-DSS SAQ-A | ⬜ | With Stripe production |
| IP assignment from founder to company | ⬜ | **Investors will check this specifically** |
| Contractor and employment templates | ⬜ | |
| Stripe / AWS / vendor agreements | 🟡 | |

## 6. Governance

| Item | Status |
|---|---|
| Governance and operating model | ✅ [`../02-strategy-framework/03-governance-operating-model.md`](../02-strategy-framework/03-governance-operating-model.md) |
| Reserved matters schedule | ✅ In the above |
| Decision-rights matrix | ✅ |
| **Cultural Advisory Council terms of reference** | ⬜ Q2 FY27 — write the ToR before convening |
| Conflict-of-interest register | ⬜ |
| Whistleblowing policy | ⬜ |
| Content and moderation policy | 🟡 Operational in BPMS P12; needs a public-facing version |
| Data governance policy | ✅ Governance model §4.4 |

## 7. Commercial

| Item | Status |
|---|---|
| Sponsorship prospectus | ✅ |
| Sponsor contract template with editorial firewall clause | ⬜ |
| Civic licence agreement template | ⬜ |
| Partner MoU template | ⬜ |
| Pricing schedule | ✅ Business plan §6 |
| Pipeline trackers (grants, sponsors, investors, outreach) | 🟡 Structures defined; populate as you research |
| Customer contracts | n/a — none yet |

## 8. Impact and reporting

| Item | Status |
|---|---|
| Impact measurement framework and theory of change | ✅ [`../06-funding/06-impact-measurement-framework.md`](../06-funding/06-impact-measurement-framework.md) |
| KPI dictionary | ✅ [`kpi-dictionary.md`](kpi-dictionary.md) |
| Grant application framework and answer bank | ✅ |
| Grant target pipelines (AU and international) | ✅ |
| Acquittal report specification | ⬜ H1 FY27 — highest-leverage product feature |
| Civic dashboard specification | ⬜ H2 FY27 |

## 9. Team

| Item | Status |
|---|---|
| **Founder background written up properly** | ⬜ **Currently the thinnest part of the whole pack.** Investors and grant assessors both weight founder-market fit heavily. |
| Org chart and hiring plan | ✅ Business plan §11 |
| Role descriptions for the first five hires | ⬜ |
| Advisory board — target profiles | ✅ |
| Key-person insurance | ⬜ At seed close |

---

## The three blockers, and how to handle them

| # | Blocker | Why it blocks | Action |
|---|---|---|---|
| 1 | **Company not incorporated** | No round can close; no R&D registration; no Stripe production account | Incorporate now. Resolve naming first. |
| 2 | **Trust accounting for held ticket funds** | Holding other people's money without proper segregation is how ticketing companies end up in regulatory trouble | Establish before production payments launch. Non-negotiable. |
| 3 | **WCAG 2.2 AA audit** | Government procurement is closed without it, and grant eligibility often requires it | Commence Q1 FY27, complete before public launch |

**Disclose all three proactively in diligence.** Each will surface anyway. Naming them yourself costs nothing; having them found for you discounts your credibility on everything else in the room — and the risk register you hand over unprompted is the single most effective way to establish that you already know where the problems are.
