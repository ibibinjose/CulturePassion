# CulturePass — Executive Summary

**Prepared:** August 2026 · **Founder & CEO:** Bibin Jose · **Contact:** cultureos.co@gmail.com
**Entity:** CulturePass (CultureOS) · **Pilot market:** Melbourne, Victoria, Australia
**Stage:** Production-ready MVP built and building cleanly. Pre-launch. Pre-revenue.

---

## The one-line version

CulturePass is the cultural participation layer for multicultural cities — a single place to discover a Malayalam theatre night, a Wurundjeri-led walk, an Eritrean coffee ceremony or a Collingwood warehouse exhibition, RSVP or buy a ticket, carry a digital pass, and be counted at the door.

## The problem

Cultural participation is real and large, but it is invisible to infrastructure. Australia's multicultural, First Nations and diaspora cultural life runs on WhatsApp broadcast lists, Facebook groups that outsiders cannot find, printed flyers in grocery shops, and council websites that were last redesigned in 2014.

Three consequences follow:

1. **Participants miss things they would have loved.** Discovery depends on already being inside the right community group. A second-generation Australian, a new migrant, or a visitor has no way in.
2. **Organisers cannot grow or prove impact.** A festival director running a 4,000-person event on volunteer labour has no ticketing that fits a A$12 price point, no attendance data, and no reporting that satisfies a grant acquittal.
3. **Funders are flying blind.** Councils, multicultural commissions and tourism bodies distribute significant public money into cultural programming and receive back attendance estimates written on the night. There is no shared measurement layer.

## The solution

A mobile-first platform (live, built, 39 screens) that does four things:

- **Discovery** — a city feed, natural-language search ("free Malayalam events this weekend"), map, and cultural calendar, organised around communities rather than generic categories.
- **Participation** — free RSVP and low-cost ticketing, digital passes with signed QR codes, and gate check-in that blocks duplicate, cancelled and wrong-event scans.
- **Organiser tooling** — event wizard, guest lists, co-hosts, verified badges, community and business profiles, offers, and analytics that export as grant-ready acquittal reports.
- **Measurement** — first-party analytics producing the participation, representation and dispersal metrics that funders need and nobody currently supplies.

## Why now

Verified digital ticketing infrastructure became cheap enough to serve a A$12 ticket only recently. Simultaneously, social-cohesion funding in Australia has moved from rhetoric to line items, and every council and multicultural body is now required to report participation outcomes it cannot currently measure. CulturePass sits exactly on that gap.

## Business model

Five revenue lines, deliberately sequenced so that no single one is load-bearing:

| Line | Mechanism | FY29 contribution |
|---|---|---|
| Ticketing commission | 3.5% + A$0.80 per paid ticket | A$1.22M |
| Organiser SaaS | A$29 / A$59 / A$99 per month | A$0.70M |
| Brand sponsorship & featured listings | Native placement, category exclusivity | A$2.10M |
| Civic & tourism-board licences | City participation dashboards | A$0.66M |
| Culture Passion Awards | Program sponsorship | A$0.90M |

Free RSVP events are free forever. We only charge where money already changes hands. That is the trust position and it is not negotiable.

## Three-year plan

| | FY27 (Y1) | FY28 (Y2) | FY29 (Y3) |
|---|---|---|---|
| Cities live | 1 (Melbourne) | 5 (AU metro) | 8 (+ Auckland, Dubai, London) |
| Active verified hosts | 320 | 1,600 | 4,800 |
| Attendances | 96,000 | 520,000 | 1,800,000 |
| GMV | A$0.80M | A$5.30M | A$21.38M |
| Platform revenue | A$0.19M | A$1.53M | A$5.59M |
| Grant income (target) | A$0.25M | A$0.90M | A$1.40M |
| Gross margin | 66% | 85% | 86% |

Full build, drivers and sensitivities: [`model/financial-model.md`](model/financial-model.md).

## Unit economics

- Host acquisition cost **A$180**; 3-year host LTV **A$728** on host-attributable gross profit only → **4.0:1**.
- Participant CAC **A$3.60** blended, because acquisition is community-led: a host who joins brings their audience.
- Sponsorship and civic revenue are deliberately excluded from LTV. Including them would show 12:1 and would not survive diligence.

## The ask

**A$2.5M seed round**, allocated 45% product & engineering, 35% growth & community, 20% operations & compliance. This funds FY27 in full and the first half of FY28.

Alongside it we are pursuing **A$2.55M in non-dilutive grant income across FY27–FY29** from arts, multicultural, social-cohesion and tourism programs, plus the R&D Tax Incentive. Grant capital subsidises market-entry CAC in precisely the communities that commercial CAC cannot reach economically.

A **Series A of approximately A$4.5M in FY28 is explicitly gated** on FY27 exit criteria. If those gates are missed, the plan contracts to Melbourne-only at 9 staff and runs to grant-plus-sponsorship breakeven rather than raising into weak retention. That downside path is costed, not hand-waved.

## What is already true

- Production MVP: 39 frontend routes, 15 API modules, 11 database schema groups, AWS CDK infrastructure, Stripe integration, signed-QR check-in. All packages typecheck and build cleanly.
- Purpose-built for the pilot market: Melbourne, Sydney, Brisbane, Perth and Adelaide are in the location selector; natural-language search already resolves diaspora-language queries.
- The Culture Passion Awards program is designed as the acquisition flywheel, not an afterthought — nominations require a platform profile, so the awards campaign is host onboarding wearing a better outfit.

## What is not yet true — stated plainly

No paying customers. No signed sponsors. No committed grants. No launched pilot. Every number in this pack is a planning assumption traced to an explicit driver, and the drivers are the thing to challenge.

---

**Next step:** a 20-minute call, the [full pitch deck](../05-pitch-deck/01-investor-deck.md), and a live walkthrough of the working product.
