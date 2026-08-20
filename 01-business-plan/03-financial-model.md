# CulturePass — Financial Model Walkthrough

**Companion to** [`model/financial-model.md`](model/financial-model.md) (generated tables) and [`model/financial-model.csv`](model/financial-model.csv) (raw data).
**Source of truth:** [`model/financial_model.py`](model/financial_model.py). Change assumptions there and re-run — never hand-edit the outputs, or the pack stops tying out.

```bash
cd 01-business-plan/model && python3 financial_model.py
```

Currency: AUD throughout. Financial year starts 1 September. FY27 = Sep 2026 – Aug 2027.

---

## 1. How to read this model

This is a **driver model**, not a growth-rate model. There are no "we grow 15% month over month" assumptions. Every dollar traces back to a countable physical thing: a host who signed up, an event they published, a person who walked through a door.

The chain is:

```
active hosts → events published → attendances → paid tickets → GMV → revenue
```

If you want to disagree with the model, disagree with one of those five numbers. The arithmetic between them is not where the risk lives.

---

## 2. The volume drivers, and why each number

### Active verified hosts: 320 → 1,600 → 4,800

FY27 is one city. 320 hosts in Melbourne over 12 months means roughly 27 per month, or about 6 per week for a two-person community team doing relational fieldwork. That is achievable but not trivial — it assumes partnership leverage (one peak-body MoU introducing 40 member organisations) rather than 320 individual cold conversations.

FY28's 1,600 across 5 cities is 320 per city — the Melbourne playbook repeated four times, with Melbourne itself continuing to grow. FY29's 4,800 across 8 cities is 600 per city, which assumes the earlier markets mature rather than every market starting fresh.

**Sanity check:** 4,800 hosts is under 10% of the estimated Australian addressable host base. The plan does not require category dominance.

### Events per host per year: 7.5 → 7.5 → 7.9

Held roughly flat deliberately. Cultural organisations are seasonal — many run 2–4 events a year around specific festivals; arts spaces run 20+. A blended 7.5 assumes the mix, and holding it flat avoids the classic model error of assuming existing customers linearly intensify.

### Attendances per event: 40 → 43 → 47

Small. That is the point. This category is 40-person hall events, not 4,000-person festivals. The gentle rise reflects growing feed reach making each event better attended, which is the actual product promise.

### Paid share of attendance: 26% → 30% → 33%

The most contested assumption in the model, and the one the FY27 gate is set against. Most cultural community events are free or donation-based. 26% in year one assumes ticketing adoption is led by festivals, performances and food events while free community gatherings stay free (permanently, by policy).

**Downside tested:** at 22% held flat, FY29 platform revenue falls about 10%. This is a meaningful but not fatal sensitivity, because transaction revenue is only 22% of FY29 platform revenue.

### Average ticket price: A$32 → A$34 → A$36

Reflects a real mix: A$10–15 community events, A$25–40 performances and food events, A$60–120 festival and premium tickets. Rising slightly with mix shift toward larger events, not with price inflation on the same events.

---

## 3. Revenue lines

### Ticketing commission — 3.5% + A$0.80

| | FY27 | FY28 | FY29 |
|---|---|---|---|
| Paid tickets | 24,960 | 156,000 | 594,000 |
| GMV | A$798,720 | A$5,304,000 | A$21,384,000 |
| Commission revenue | A$48,000 | A$310,400 | A$1,223,600 |
| Effective take on GMV | 6.01% | 5.85% | 5.72% |

The fixed A$0.80 component is what makes low-price tickets viable for us: on a A$12 ticket the percentage alone (A$0.42) would not cover the payment cost. Combined, we take A$1.22 against a payment cost of about A$0.51 — thin but positive. On a A$40 ticket we take A$2.20 against A$1.00 of cost. The structure is deliberately regressive in our favour at the low end and generous to the host at the high end, which is the opposite of mainstream platform pricing and is the whole competitive argument.

Note the effective take rate *declines* as we scale, because average price rises. Anyone modelling this as an expanding take rate has misread it.

### Organiser SaaS

| | FY27 | FY28 | FY29 |
|---|---|---|---|
| Avg paying seats across year | 30 | 220 | 850 |
| Blended ARPA / month | A$49 | A$59 | A$69 |
| Revenue | A$17,640 | A$155,760 | A$703,800 |

Paying seats are only 9% of hosts in FY27 rising to 18% in FY29. That is intentional: most hosts stay on the free Community tier forever, and nonprofits and First Nations organisations get Professional at no cost. ARPA rises because the mix shifts toward Professional and Institution tiers as the acquittal-report and multi-entity features land.

**This is the highest-quality revenue in the model** — recurring, high margin, low churn once the acquittal report is embedded in a host's grant cycle. It is deliberately under-modelled.

### Sponsorship and featured listings — A$120k → A$620k → A$2.1M

The largest FY29 line (38% of platform revenue) and therefore the largest concentration risk. FY27's A$120k is two anchor partners at ~A$50k plus local placements. FY29's A$2.1M assumes 4 national partners, 8 city partners, and a self-serve boost product.

Sponsorship is priced on reach into a demographic that is genuinely hard to reach and rarely well-measured. That scarcity is the pricing power. It also means the number is only defensible once we can prove audience composition — which is why the FY27 gate on attendances matters more to this line than to ticketing.

### Civic and tourism licences — A$0 → A$180k → A$660k

Zero in FY27 on purpose: we cannot sell a participation dashboard before we have participation data. FY28 is 4 councils at ~A$45k; FY29 is 12 at ~A$55k.

Long sales cycles (6–12 months), procurement overhead, but exceptional retention once a council's statutory reporting cycle depends on it. **This is the strategic line.** It is small in the model and large in the company's long-term value, because it is the piece a competitor cannot dislodge.

### Culture Passion Awards — A$0 → A$260k → A$900k

Sponsorship revenue attached specifically to the awards program, held separate from general sponsorship so the program's own P&L is visible:

| | FY27 | FY28 | FY29 |
|---|---|---|---|
| Awards revenue | A$0 | A$260,000 | A$900,000 |
| Awards delivery cost | A$95,000 | A$340,000 | A$980,000 |
| **Net** | **(A$95,000)** | **(A$80,000)** | **(A$80,000)** |

The awards run at a small planned loss throughout — roughly A$80–95k a year. That is the acquisition budget. Judged as a marketing line rather than a business line, A$95k in FY27 to deliver 400+ nominations (each requiring a host profile) and 15,000+ votes (each requiring a participant account) is efficient by any paid-channel comparison. If an anchor presenting partner is secured in FY27, this line goes to roughly breakeven a year early.

### Grant income — A$250k → A$900k → A$1.4M

Shown as a separate line, never blended into platform revenue. Two reasons: investors need to see the commercial business without it, and grant assessors need to see that we are not dependent on them.

**Grants are additive in this model, not load-bearing.** The business is EBITDA-negative with or without them across all three years, and the seed round is sized on the commercial case. What grants actually buy is CAC in communities where commercial CAC would never justify the spend — which is both the mission and the reason the community graph gets built at all.

---

## 4. Cost structure

### Cost of revenue and the margin shape

| | FY27 | FY28 | FY29 |
|---|---|---|---|
| Payment processing | A$21,465 | A$139,620 | A$552,420 |
| Cloud & infrastructure | A$42,000 | A$96,000 | A$210,000 |
| **Cost of revenue** | A$63,465 | A$235,620 | A$762,420 |
| **Gross margin** | **65.8%** | **84.6%** | **86.4%** |

The 20-point margin expansion is not operating leverage — it is **mix shift**. FY27 revenue is 26% ticketing (which carries ~1.75% + A$0.30 of payment cost); FY29 revenue is 66% sponsorship, licences and SaaS (which carry almost no variable cost). Anyone reading the margin expansion as improving efficiency has misread it. Efficiency is roughly flat; the business is simply selling a different mix.

Cloud cost is modelled at 0.6% of GMV against a floor. Aurora Serverless v2 scaling to near-zero between traffic peaks matters here: cultural event traffic is severely spiky, concentrated Friday evening through Saturday morning.

### Operating expense

| | FY27 | FY28 | FY29 |
|---|---|---|---|
| People (FTE fully loaded) | A$708,000 | A$2,142,000 | A$5,016,000 |
| Headcount | 6 | 17 | 38 |
| Cost per FTE | A$118,000 | A$126,000 | A$132,000 |
| Marketing & community | A$180,000 | A$760,000 | A$1,900,000 |
| Awards delivery | A$95,000 | A$340,000 | A$980,000 |
| G&A | A$140,000 | A$420,000 | A$900,000 |
| **Total opex** | **A$1,123,000** | **A$3,662,000** | **A$8,796,000** |

People is 63% of FY27 opex and 57% of FY29 — normal for a platform business at this stage. Cost per FTE includes superannuation and on-costs and blends engineering (higher) with community and operations roles (lower).

G&A at A$140k in FY27 is heavier than a typical pre-seed company. That is the compliance allocation: privacy impact assessment, WCAG 2.2 AA audit, insurance, legal, government-procurement readiness. It is spent early because grant eligibility and council procurement both require it, and retrofitting compliance costs more than building it.

---

## 5. Unit economics, and the honest version of LTV

| Metric | Value |
|---|---|
| Host CAC (FY28) | A$180 |
| 3-year host LTV | A$728 |
| **LTV : CAC** | **4.0:1** |
| Participant CAC (FY28, blended) | A$3.60 |

**How LTV is built, and what is excluded.** LTV uses only host-*attributable* gross profit: ticketing commission plus SaaS, less the proportional share of payment and cloud cost. Sponsorship, civic licences and awards revenue are excluded entirely.

If sponsorship and civic revenue were allocated across hosts, LTV would read approximately A$2,193 and LTV:CAC would read 12.2:1. That number is in the model's history and was deliberately removed, because sponsorship revenue is earned by aggregate audience reach, not by any individual host, and allocating it per-host would not survive ten minutes of diligence. 4.0:1 is the number we defend.

**Participant CAC of A$3.60** is low because the acquisition mix is dominated by host-led (a host brings their existing list at zero marginal cost) and partnership channels. Paid social and search are capped at under 25% of marketing spend. If that mix inverts — if we end up buying participants — CAC moves toward A$18–25 and the marketing line roughly triples. This is the quiet fragility in the plan and worth stating: **the model assumes community-led growth works.**

**The discipline rule:** LTV:CAC below 3:1 for two consecutive quarters freezes growth spend until retention is fixed. That is a stated operating commitment, not an aspiration.

---

## 6. Capital and runway

| Source | Amount | Note |
|---|---|---|
| Seed equity (current ask) | A$2,500,000 | Funds FY27 in full plus H1 FY28 |
| Grant income FY27–FY29 (target) | A$2,550,000 | None committed |
| Series A, FY28 (gated) | A$4,500,000 | Only if FY27 exit gates are met |
| **Total capital modelled** | **A$7,000,000** | |
| Cumulative EBITDA excl. grants FY27–FY29 | (A$7,343,302) | |
| **Net funding need after grants** | **(A$4,793,302)** | A$2.2M of buffer against the A$7.0M modelled |

**FY27 net burn after grant income is A$750,902.** Against a A$2.5M seed that is roughly 24 months of runway at FY27 spend levels — but runway shortens sharply as FY28 headcount lands, which is precisely why the Series A is gated at the FY27 boundary rather than assumed.

**The gate is real.** If the FY27 exit criteria in the business plan are missed, the plan contracts: Melbourne only, headcount holds at 9, expansion stops, and the business runs toward grant-plus-sponsorship breakeven. That path is survivable on the seed plus a small bridge. Raising a Series A into weak host retention would not be.

---

## 7. Sensitivities — what actually breaks this

| Lever | Downside case | FY29 platform revenue | Change |
|---|---|---|---|
| Base case | — | A$5,587,440 | — |
| Paid share 33% → 22% | Ticketing adoption stalls |  A$5,179,560 | −7.3% |
| Avg price A$36 → A$28 | Mix stays low-price | A$5,315,520 | −4.9% |
| Sponsorship at 50% of plan | Only 2 national partners | A$4,537,440 | −18.8% |
| Civic contracts do not close | Procurement fails | A$4,927,440 | −11.8% |

**The single biggest risk in this model is sponsorship, not ticketing.** A 50% sponsorship shortfall costs nearly twice what a total collapse in paid-ticket share costs. This is counter-intuitive for a "ticketing platform" and it changes where management attention should go: the sponsorship pipeline needs the same rigour as the product roadmap.

**Combined downside** (all four adverse simultaneously): FY29 platform revenue of **A$3,358,680 — 60% of plan**. At that level the FY29 international expansion does not happen: the business runs 5 Australian cities at roughly 22 FTE, burning about A$1.6M a year against grant and sponsorship income. That is a smaller company, not a dead one, and it is reachable on the seed plus one bridge.

---

## 8. What this model does not include

Stated so nobody has to discover it in diligence:

- **Passport+ subscription revenue.** Designed and priced (A$8.99/mo, A$79/yr) but modelled at zero. It is a retention mechanism first, and counting consumer subscription revenue pre-launch flatters models.
- **FY30+ projections.** Three-year driver models are planning tools. Five-year models in a pre-launch company are creative writing.
- **R&D Tax Incentive** as a separate line — it sits inside the grant target and is the single most probable component of it.
- **Working capital timing.** Ticket funds are held between sale and event, then paid out to hosts. This creates a float that is not modelled as a financing source (deliberately conservative) but does need a trust-accounting treatment before production payments launch.
- **FX exposure** on FY29 international revenue.
- **Any contracted revenue.** As at August 2026 there are no paying customers, no signed sponsors and no committed grants. Every figure above is a planning assumption.
