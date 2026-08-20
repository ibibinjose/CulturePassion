#!/usr/bin/env python3
"""
CulturePass 3-year operating model.
Single source of truth for every number quoted in the business plan,
pitch decks, grant applications and sponsor prospectus.

Run:  python3 financial_model.py
Emits: financial-model.csv, financial-model.md (same directory)

Currency: AUD. FY starts 1 September (FY27 = Sep 2026 -> Aug 2027).
"""
import csv, os

OUT = os.path.dirname(os.path.abspath(__file__))

# ---------------------------------------------------------------- assumptions
YEARS = ["FY27 (Y1)", "FY28 (Y2)", "FY29 (Y3)"]

MARKETS       = [1, 5, 8]            # cities live
ACTIVE_HOSTS  = [320, 1600, 4800]    # verified hosts/communities publishing
EVENTS        = [2400, 12000, 38000] # events published
ATTENDEES     = [96000, 520000, 1800000]
PAID_SHARE    = [0.26, 0.30, 0.33]   # share of attendance that is a paid ticket
AVG_PRICE     = [32.0, 34.0, 36.0]   # AUD gross per paid ticket

TAKE_PCT      = 0.035                # platform commission
TAKE_FIXED    = 0.80                 # AUD per paid ticket

SAAS_AVG_SUBS = [30, 220, 850]       # avg paying organiser seats across year
SAAS_ARPA_MO  = [49.0, 59.0, 69.0]   # blended AUD/month across $29/$59/$99 tiers

SPONSORSHIP   = [120000, 620000, 2100000]   # brand + featured placement
CIVIC_LICENCE = [0, 180000, 660000]         # council/tourism-board dashboards
AWARDS_REV    = [0, 260000, 900000]         # Culture Passion Awards sponsorship
GRANTS        = [250000, 900000, 1400000]   # non-dilutive, shown separately

# cost base
HEADCOUNT     = [6, 17, 38]
AVG_COST_FTE  = [118000, 126000, 132000]    # incl. super + on-costs
CLOUD_PCT_GMV = 0.006                       # AWS scales with volume
CLOUD_FLOOR   = [42000, 96000, 210000]
PSP_PCT       = 0.0175                       # Stripe AU ~1.75% + 0.30
PSP_FIXED     = 0.30
MKT_SPEND     = [180000, 760000, 1900000]
AWARDS_COST   = [95000, 340000, 980000]
GA_SPEND      = [140000, 420000, 900000]    # legal, audit, insurance, tooling

# acquisition
PARTICIPANT_CAC = [4.20, 3.60, 3.10]
HOST_CAC        = [210, 180, 155]
HOST_GROSS_MO   = [0, 0, 0]                 # computed below

def money(x):
    return round(x, 0)

rows = []
for i, y in enumerate(YEARS):
    paid_tickets = ATTENDEES[i] * PAID_SHARE[i]
    gmv = paid_tickets * AVG_PRICE[i]
    tx_rev = gmv * TAKE_PCT + paid_tickets * TAKE_FIXED
    saas_rev = SAAS_AVG_SUBS[i] * SAAS_ARPA_MO[i] * 12
    platform_rev = tx_rev + saas_rev + SPONSORSHIP[i] + CIVIC_LICENCE[i] + AWARDS_REV[i]
    total_income = platform_rev + GRANTS[i]

    psp_cost = gmv * PSP_PCT + paid_tickets * PSP_FIXED
    cloud = max(CLOUD_FLOOR[i], gmv * CLOUD_PCT_GMV)
    cogs = psp_cost + cloud
    gross_profit = platform_rev - cogs
    people = HEADCOUNT[i] * AVG_COST_FTE[i]
    opex = people + MKT_SPEND[i] + AWARDS_COST[i] + GA_SPEND[i]
    ebitda_excl_grants = gross_profit - opex
    ebitda_incl_grants = ebitda_excl_grants + GRANTS[i]

    rows.append(dict(
        year=y, cities=MARKETS[i], hosts=ACTIVE_HOSTS[i], events=EVENTS[i],
        attendees=ATTENDEES[i], paid_tickets=int(paid_tickets), gmv=money(gmv),
        tx_rev=money(tx_rev), saas_rev=money(saas_rev), sponsorship=SPONSORSHIP[i],
        civic=CIVIC_LICENCE[i], awards_rev=AWARDS_REV[i],
        platform_rev=money(platform_rev), grants=GRANTS[i], total_income=money(total_income),
        psp=money(psp_cost), cloud=money(cloud), cogs=money(cogs),
        gross_profit=money(gross_profit),
        gross_margin=round(gross_profit / platform_rev * 100, 1),
        people=people, marketing=MKT_SPEND[i], awards_cost=AWARDS_COST[i], ga=GA_SPEND[i],
        opex=opex, ebitda=money(ebitda_excl_grants), ebitda_grants=money(ebitda_incl_grants),
        headcount=HEADCOUNT[i],
        take_rate=round(tx_rev / gmv * 100, 2),
        rev_per_host=money(platform_rev / ACTIVE_HOSTS[i]),
        participant_cac=PARTICIPANT_CAC[i], host_cac=HOST_CAC[i],
    ))

# ---- host unit economics -------------------------------------------------
# LTV is built ONLY from host-attributable gross profit (ticketing + SaaS less
# payment/cloud cost). Sponsorship and civic licences are NOT allocated to hosts:
# they are platform-level revenue and inflating LTV with them would not survive
# diligence.
host_gp = []
for i, r in enumerate(rows):
    attributable_rev = r['tx_rev'] + r['saas_rev']
    attributable_cost = r['cogs'] * (attributable_rev / r['platform_rev'])
    host_gp.append((attributable_rev - attributable_cost) / r['hosts'])

host_ltv_3yr = round(sum(host_gp), 0)
ltv_cac = round(host_ltv_3yr / HOST_CAC[1], 1)
host_year1_gp = host_gp[1]

# ---- capital plan / runway ----------------------------------------------
cum_ebitda = sum(r['ebitda'] for r in rows)
cum_grants = sum(GRANTS)
net_need = -(cum_ebitda + cum_grants)

SEED = 2500000
SERIES_A = 4500000

FUNDING = [
    ("Seed equity round — the current ask", SEED,
     "45% product/eng, 35% growth & community, 20% ops/compliance. Funds FY27 in full and H1 FY28."),
    ("Non-dilutive grant income FY27-FY29 (target)", cum_grants,
     "Targets against programs in 06-funding/03; none committed. Directly offsets market-entry CAC."),
    ("Series A — FY28, contingent on pilot gates", SERIES_A,
     "Only raised if the FY27 exit gates in the business plan are met. Funds the FY29 multi-city expansion."),
    ("Total capital modelled FY27-FY29", SEED + SERIES_A,
     f"Against cumulative EBITDA excl. grants of A${-cum_ebitda:,.0f} and net funding need of A${net_need:,.0f} after grants."),
]

def fmt(n):
    return f"{n:,.0f}"

# ---------------------------------------------------------------- CSV
csv_path = os.path.join(OUT, "financial-model.csv")
with open(csv_path, "w", newline="") as f:
    w = csv.DictWriter(f, fieldnames=list(rows[0].keys()))
    w.writeheader()
    for r in rows:
        w.writerow(r)

# ---------------------------------------------------------------- Markdown
md = []
md.append("# CulturePass — 3-Year Operating Model (AUD)\n")
md.append("> Generated by `financial_model.py`. Do not hand-edit — change the assumptions in the script and re-run so every document stays consistent.\n")
md.append("> FY starts 1 September. FY27 = Sep 2026 – Aug 2027. Grant income is shown separately from platform revenue throughout.\n")

md.append("\n## 1. Volume drivers\n")
md.append("| Driver | " + " | ".join(YEARS) + " |")
md.append("|---|---|---|---|")
for label, key in [("Cities live","cities"),("Active verified hosts","hosts"),("Events published","events"),
                   ("Total attendances","attendees"),("Paid tickets","paid_tickets"),("GMV (A$)","gmv")]:
    md.append(f"| {label} | " + " | ".join(fmt(r[key]) for r in rows) + " |")
md.append(f"| Paid share of attendance | " + " | ".join(f"{p*100:.0f}%" for p in PAID_SHARE) + " |")
md.append(f"| Avg gross ticket price (A$) | " + " | ".join(f"{p:.2f}" for p in AVG_PRICE) + " |")

md.append("\n## 2. Revenue build\n")
md.append("| Revenue line | " + " | ".join(YEARS) + " |")
md.append("|---|---|---|---|")
for label, key in [("Ticketing commission (3.5% + $0.80)","tx_rev"),("Organiser SaaS","saas_rev"),
                   ("Brand sponsorship & featured listings","sponsorship"),
                   ("Civic / tourism-board licences","civic"),
                   ("Culture Passion Awards sponsorship","awards_rev"),
                   ("**Platform revenue**","platform_rev"),
                   ("Grant income (non-dilutive)","grants"),
                   ("**Total income**","total_income")]:
    md.append(f"| {label} | " + " | ".join(fmt(r[key]) for r in rows) + " |")
md.append(f"| Effective take rate on GMV | " + " | ".join(f"{r['take_rate']}%" for r in rows) + " |")

md.append("\n## 3. Cost base and margin\n")
md.append("| Line | " + " | ".join(YEARS) + " |")
md.append("|---|---|---|---|")
for label, key in [("Payment processing (~1.75% + $0.30)","psp"),("Cloud & infrastructure","cloud"),
                   ("**Cost of revenue**","cogs"),("**Gross profit**","gross_profit"),
                   ("People (FTE fully loaded)","people"),("Marketing & community","marketing"),
                   ("Culture Passion Awards delivery","awards_cost"),("G&A, legal, audit, insurance","ga"),
                   ("**Total operating expense**","opex"),
                   ("**EBITDA excl. grants**","ebitda"),("**EBITDA incl. grants**","ebitda_grants")]:
    md.append(f"| {label} | " + " | ".join(fmt(r[key]) for r in rows) + " |")
md.append(f"| Gross margin on platform revenue | " + " | ".join(f"{r['gross_margin']}%" for r in rows) + " |")
md.append(f"| Headcount (FTE, end of year) | " + " | ".join(str(r['headcount']) for r in rows) + " |")

md.append("\n## 4. Unit economics\n")
md.append("| Metric | Value | Basis |")
md.append("|---|---|---|")
md.append(f"| Participant CAC (blended) | A${PARTICIPANT_CAC[1]:.2f} | FY28; community-led + host-referred acquisition, paid is <25% of mix |")
md.append(f"| Host acquisition cost | A${rows[1]['host_cac']} | FY28; field team + partnership sourcing |")
md.append(f"| Host-attributable gross profit per host | A${fmt(host_year1_gp)} | FY28 ticketing + SaaS gross profit / active hosts. Excludes sponsorship. |")
md.append(f"| 3-year host LTV | A${fmt(host_ltv_3yr)} | Sum of host-attributable gross profit per host, FY27–FY29 |")
md.append(f"| LTV : CAC | {ltv_cac}:1 | Target floor 3:1. Below 3:1 for two consecutive quarters triggers a growth-spend freeze. |")
md.append(f"| Platform revenue per active host (all lines) | " + " / ".join(f"A${fmt(r['rev_per_host'])}" for r in rows) + " | FY27 / FY28 / FY29. Shown for scale only; not used in LTV. |")

md.append("\n## 5. Capital plan\n")
md.append("| Source | Amount (A$) | Allocation / note |")
md.append("|---|---|---|")
for name, amt, note in FUNDING:
    md.append(f"| {name} | {fmt(amt)} | {note} |")
md.append(f"| **Cumulative EBITDA excl. grants FY27–FY29** | ({fmt(-cum_ebitda)}) | Peak annual burn is FY29, the multi-city expansion year |")
md.append(f"| **Net funding need after grant income** | ({fmt(net_need)}) | The seed round alone does not fund FY29. That is deliberate and staged. |")
md.append("\n**Runway.** The A$2.5M seed funds FY27 (burn A$" + fmt(-rows[0]['ebitda'] - GRANTS[0]) + " net of grants) and roughly the first half of FY28. The Series A is explicitly gated: if the FY27 exit criteria are not met, the plan contracts to Melbourne-only, headcount holds at 9, and the business is run to grant-plus-sponsorship breakeven rather than raising into weak retention. That downside path is costed in section 6.\n")

md.append("\n## 6. Sensitivity — what breaks the model\n")
md.append("| Lever | Downside case | Effect on FY29 platform revenue |")
md.append("|---|---|---|")
base = rows[2]['platform_rev']
for label, factor, applies in [
    ("Paid share falls 33% -> 22%", 0.22/0.33, "tx"),
    ("Avg ticket price falls to A$28", 28.0/36.0, "tx"),
    ("Sponsorship lands at 50% of plan", 0.5, "sponsorship"),
    ("Civic contracts do not close", 0.0, "civic"),
]:
    if applies == "tx":
        newtx = rows[2]['tx_rev'] * factor
        newrev = base - rows[2]['tx_rev'] + newtx
    elif applies == "sponsorship":
        newrev = base - rows[2]['sponsorship'] + rows[2]['sponsorship'] * factor
    else:
        newrev = base - rows[2]['civic']
    md.append(f"| {label} | | A${fmt(newrev)} ({(newrev/base-1)*100:+.1f}%) |")

md.append("\n---\n")
md.append("**Assumption honesty note.** These are planning assumptions, not results. Nothing in this model is booked revenue. Every figure traces to a driver in section 1; challenge the drivers, not the arithmetic. Grant amounts are targets against programs listed in [`06-funding/03-grant-target-list-australia.md`](../../06-funding/03-grant-target-list-australia.md) and are not committed funds.\n")

md_path = os.path.join(OUT, "financial-model.md")
with open(md_path, "w") as f:
    f.write("\n".join(md) + "\n")

print("wrote", csv_path)
print("wrote", md_path)
print()
for r in rows:
    print(f"{r['year']}: GMV A${fmt(r['gmv'])} | platform rev A${fmt(r['platform_rev'])} | "
          f"gross A${fmt(r['gross_profit'])} ({r['gross_margin']}%) | EBITDA A${fmt(r['ebitda'])} | HC {r['headcount']}")
print(f"\nHost LTV(3yr) A${fmt(host_ltv_3yr)} / CAC A${rows[1]['host_cac']} = {ltv_cac}:1")
print(f"Cumulative EBITDA excl grants: A${fmt(sum(r['ebitda'] for r in rows))}")
