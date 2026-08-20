# CulturePass — Market Analysis

**August 2026** · Companion to [`02-business-plan.md`](02-business-plan.md) §4 and §8.

---

## 1. Market definition

CulturePass operates at the intersection of four markets, and belongs cleanly to none of them. That is the opportunity and the positioning challenge in one sentence.

| Adjacent market | What we share | What we do not |
|---|---|---|
| Event ticketing | Transactions, passes, gate check-in | We are discovery-first; ticketing is a feature, not the product |
| Local discovery / listings | Feed, search, map, categories | We are organised around cultural communities, not venues or generic categories |
| Community / social platforms | Profiles, follows, groups (Circles) | We are transactional and civic; engagement is not our business model |
| Civic & govtech analytics | Participation measurement, statutory reporting | We generate the data from real behaviour rather than surveying for it |

**The category we are building:** *cultural participation infrastructure* — the layer that publishes cultural life, moves people to it, and measures who actually showed up.

---

## 2. Sizing

### 2.1 Context numbers (used in the deck, not in the plan)

Global experiential travel and the live-experience economy exceed US$1.5T annually; global digital event ticketing exceeds US$85B. These are quoted in investor materials because the audience expects category context. **They are not the basis of any number in the financial model** and should never be presented as a serviceable market. Doing so is the fastest way to lose a credible investor.

### 2.2 Bottom-up Australian SAM

**Host-side build.** The addressable host base is organisations that run at least one public cultural, community, religious, diaspora, arts or food event per year:

| Host category | Estimated count, AU metro (Melbourne, Sydney, Brisbane, Perth, Adelaide) |
|---|---|
| Cultural, ethnic and diaspora associations | 8,000–11,000 |
| Places of worship running public cultural events | 6,000–8,000 |
| Community centres, neighbourhood houses, migrant resource centres | 3,500–4,500 |
| Independent arts spaces, studios, galleries, small venues | 5,000–7,000 |
| Markets, food events, festivals | 4,000–5,500 |
| Council and library cultural programming units | 1,500–2,000 |
| First Nations organisations and cultural programs | 800–1,200 |
| Universities, student cultural societies | 4,000–6,000 |
| Dance schools, language schools, cultural education providers | 6,000–9,000 |
| Community sports and recreation with cultural programming | 6,000–8,000 |
| **Total** | **~45,000–62,000** |

These are estimates built from category structure, not from a purchased dataset. They should be validated against ACNC registrations, ABS establishment counts and council directories during pilot; that validation is a named deliverable in the FY27 plan.

**Revenue-side build.** At FY29 modelled scale, platform revenue per active host across all lines is **A$1,164**.

| Scenario | Hosts | Annual platform revenue |
|---|---|---|
| FY29 plan position | 4,800 | A$5.59M |
| 25% of AU addressable base | ~13,000 | ~A$15.1M |
| 50% of AU addressable base | ~26,000 | ~A$30.3M |
| Full AU addressable base | ~50,000 | **~A$58.2M** |

**Australian-only SAM: approximately A$58M in annual platform revenue.** The FY29 plan captures under 10% of it. This is the number that matters, because it establishes that the plan does not require heroic market share.

### 2.3 Global TAM by structural extension

The same conditions — dense diaspora populations, active community organisations, public cultural funding, and council-level participation reporting obligations — exist in roughly 120 metros worldwide.

| Region | Priority metros | Indicative annual platform revenue at AU-equivalent penetration |
|---|---|---|
| Australia & NZ | Melbourne, Sydney, Brisbane, Perth, Adelaide, Auckland, Wellington | A$65M |
| UK & Ireland | London, Birmingham, Manchester, Leicester, Bradford, Glasgow, Dublin | A$140M |
| Canada | Toronto, Vancouver, Montreal, Calgary, Ottawa | A$95M |
| GCC | Dubai, Abu Dhabi, Riyadh, Jeddah, Doha, Kuwait City | A$120M |
| USA | NYC, LA, Chicago, Houston, SF Bay, Miami, Seattle, Atlanta, Minneapolis | A$310M |
| Western Europe | Berlin, Amsterdam, Paris, Brussels, Stockholm, Copenhagen, Milan | A$185M |
| Southeast & East Asia | Singapore, Kuala Lumpur, Hong Kong, Tokyo, Seoul | A$150M |
| **Total** | ~120 metros | **~A$1.07B** |

Applying a broader definition (secondary cities, non-metro regional programs, education-sector cultural participation) gives an upper bound of **A$1.5–2.5B**. This is an extension estimate derived from the Australian unit economics, and is labelled as such wherever it appears. It is not a market study.

### 2.4 Why the GCC appears early in the priority list

Dubai and Riyadh are unusual: state-level cultural investment is very large, expatriate and diaspora populations are the majority or near-majority of residents, and government bodies actively procure cultural-participation measurement. The commercial and civic sale is faster there than in most Western markets. The offsetting factors are data residency requirements, local-entity requirements, and cultural governance sensitivity — all of which is why they are FY29, behind Auckland.

---

## 3. Segment analysis

### 3.1 Participant demand — five segments, one behaviour

The unifying behaviour is *"I want to do something meaningful this weekend and I don't know what's on."* The segments differ in why the existing options fail them.

| Segment | Est. share of AU metro adult population | Why current options fail | Our hook |
|---|---|---|---|
| Heritage-connected (2nd/3rd generation) | ~12% | Not in the WhatsApp group; parents' networks not inherited | Follow your community's profile |
| Recent migrants & international students | ~6% | No network yet; language barriers in discovery | Nearby + free events first + language-aware search |
| Cross-cultural explorers | ~15% | Cannot distinguish authentic from tourist-facing | Verified community hosts |
| Families | ~20% | Price and suitability filtering absent | Free/paid filter, calendar, Circles |
| Visitors | ~4% of presence at any time | No local knowledge | Map, calendar, digital pass |

Population shares are indicative and overlapping — they establish that the demand side is a large fraction of a metro population, not a niche.

### 3.2 Host supply — willingness to pay is the wrong first question

| Host segment | Volume | Ability to pay | Strategic value | FY27 priority |
|---|---|---|---|---|
| Diaspora & cultural associations | Very high | Low | **Very high** — they are the community graph | **1** |
| Festivals & markets | Medium | High | High — GMV concentration | **2** |
| Arts spaces & studios | High | Medium | High — publish frequently, dense feed | **2** |
| Places of worship | Very high | Low | Medium — huge reach, sensitive onboarding | 3 |
| Councils & libraries | Low count | High | **Very high** — the civic wedge | **1** |
| Universities & student societies | High | Medium | High — dense high-intent audience | 3 |
| First Nations organisations | Low count | Varies | **Very high** — cultural authority and legitimacy | **1**, relationship-led |

FY27 acquisition prioritises **community graph value and feed density**, not revenue. Diaspora associations pay nothing and are the single most important segment. Councils pay a lot, are slow, and are the second most important. This ordering is the strategy.

### 3.3 Institutional demand — what the buyer actually needs

The civic buyer is not buying software. They are buying an answer to a question their minister, council or board has already asked them and which they currently cannot answer:

- *"How many people participated in the cultural programs we funded this year?"*
- *"Which communities are we under-serving relative to their population?"*
- *"Did funded activity draw visitors outside the CBD?"*
- *"Is participation growing, or are we reaching the same people repeatedly?"*

The last question is the killer. Nobody can answer it, and everybody is asked it. Longitudinal repeat-attendance data at community granularity does not currently exist in any Australian jurisdiction. That is the product.

---

## 4. Competitive analysis

### 4.1 Direct and adjacent competitors

| Competitor | Model | Strengths | Structural weakness in this category |
|---|---|---|---|
| **Eventbrite** | Ticketing marketplace, ~3.7% + fixed | Global brand, payments maturity, SEO | Fee economics fail below ~A$20 tickets. Generic taxonomy — "Arts" is a category, "Malayalam theatre" is not. No community entity. No civic reporting. Has no commercial reason to serve a 40-person event. |
| **Humanitix** | Not-for-profit ticketing, AU-founded, fees to charity | Strong AU goodwill, genuine mission alignment, credible with councils | Ticketing utility, not discovery. No feed, no community graph, no participation measurement product. **Most likely partner rather than competitor.** |
| **Luma** | Modern event platform, freemium | Best-in-class UX, fast growth, calendar-native | Tech/professional-network audience. No multicultural depth, no language handling, no civic layer. |
| **Meta (Facebook Events)** | Free, ad-funded | Where behaviour actually is today | Discovery requires prior group membership; organic reach declining and organisers know it; no ticketing depth; **no funder will accept Facebook attendance data**; deep and rising trust deficit in migrant communities. |
| **Meetup** | Recurring-group subscriptions | Group model fits ongoing cultural groups | Interest-group framing, not heritage. Weak and weakening AU presence. |
| **Ticketmaster / Ticketek** | Large-venue ticketing | Scale, venue relationships | Entirely wrong end of the market. |
| **Klook / GetYourGuide / Viator** | Tourism experiences | Traveller distribution, high margins | Serve visitors, not residents. Curated commercial supply only — a community association cannot list. **Potential distribution partners.** |
| **Council "what's on" pages** | Free civic listings | Institutional trust and authority | One LGA each, no cross-boundary discovery, no ticketing, no data, chronically under-maintained. **Our best channel partner and our most sympathetic buyer.** |
| **WhatsApp / Telegram / community groups** | Free messaging | Complete trust, zero friction, current incumbent | Invisible to anyone outside. **This is the real incumbent** — the thing we must be additive to, not compete with. Any strategy that asks a community to abandon its WhatsApp group fails. |

### 4.2 The competitive insight

Our real competitor is not Eventbrite. It is **a WhatsApp group plus a flyer**, and it wins on trust while losing on reach.

The strategic consequence: CulturePass must never ask a community to replace its existing channel. It must be the *outward-facing* surface that the WhatsApp group posts to. That is why free stays free, why publishing must be possible in under three minutes on a phone, and why we do not scrape or auto-import without consent. A platform that positions itself as a replacement for community trust networks will be rejected by exactly the hosts it needs most.

### 4.3 Defensibility, ranked by durability

| Moat | Time to replicate | Why |
|---|---|---|
| **Civic contracts and reporting embedment** | 3–5 years | Once a council reports statutory participation from our data, switching means re-baselining a time series. Institutions do not do that voluntarily. |
| **The community graph** | 2–4 years | Verified hosts, follow relationships, cultural taxonomy, language mappings — built through relational fieldwork with consent. Unscrapable and unbuyable. |
| **Grant acquittal lock-in** | 2–3 years | A host whose last three funded applications cited our reports does not migrate. |
| **Culture Passion Awards as institution** | 3–5 years | Annual prestige compounds. A competitor must spend years and real money to match it, and it makes us the category's convening point. |
| **Product and UX** | 6 months | No moat. Stated plainly. |
| **Technology** | 6 months | No moat. Stated plainly. |

### 4.4 What we do not claim

We do not claim network effects make us unassailable. **Cultural discovery is local** — a well-funded competitor could take Sydney while we hold Melbourne, and city-level network effects would not protect us. Our defence is speed to community graph and civic contract *in each individual market*, which is exactly why the expansion plan requires an anchor partner before entry rather than opportunistic launches.

---

## 5. Market entry risks specific to this category

| Risk | Why it is category-specific |
|---|---|
| **Trust is the currency, not convenience** | In most marketplaces a bad experience costs a customer. Here, one incident of perceived cultural extraction or data misuse propagates through community networks faster than any marketing and is close to unrecoverable. |
| **Gatekeepers are informal** | There is no directory of who speaks for a community. Approaching the wrong person can close a whole network. Relationship sequencing matters more than pipeline volume. |
| **Seasonality is extreme and cultural** | Diwali, Eid, Lunar New Year, Christmas, Onam, Vaisakhi, Ramadan, NAIDOC Week, Pride. Revenue is lumpy around a calendar that varies by community and partly by lunar cycle. Cash-flow planning must reflect this. |
| **Free is the reference price** | Most of this category has never paid for event infrastructure. Any monetisation must be visibly optional and clearly worth it. |
| **Political and representational sensitivity** | Cultural representation disputes are real, occasionally intense, and sometimes geopolitical. The platform needs governance for this before it happens, not after. |
| **Public funding cycles are slow and rigid** | Grant rounds open annually with fixed windows. Missing a round costs 12 months. Pipeline management must be calendar-driven. |

---

## 6. Validation plan — what the pilot must actually prove

The market analysis above contains estimates. The Melbourne pilot exists to convert five of them into facts:

| # | Assumption | How the pilot tests it | Gate |
|---|---|---|---|
| 1 | Hosts will publish to a new platform without payment | Count hosts onboarded and events published in 6 target suburbs | 320 hosts / 2,400 events |
| 2 | Hosts stay | Month-3 cohort retention | ≥60% |
| 3 | Participants will pay through us | Paid share of attendance | ≥26% |
| 4 | Councils will buy the dashboard | One signed civic pilot | ≥1 |
| 5 | Host base sizing is real | Validate the ~50,000 estimate against ACNC, ABS and council directories in Victoria, then extrapolate | Published methodology note |

Assumption 5 is the one that most changes the investment case if wrong, and it is the cheapest to test. It should be done in the first 60 days.
