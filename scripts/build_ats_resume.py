"""
Build public/Robert_Wade_Resume_ATS.pdf.

Not part of the site build. Run it by hand when the resume content changes:

    pip install pymupdf
    python3 scripts/build_ats_resume.py

ATS parsers choke on multi-column layouts, text in graphics, tables, headers and
footers, and embedded subset fonts. So this emits the opposite of the designed
resume: one column, base-14 Helvetica (never subsetted, always extractable),
plain hyphen bullets, no tables, no images, no colour.
"""

import fitz

PAGE_W, PAGE_H = 612, 792  # US Letter
MARGIN_X, MARGIN_TOP, MARGIN_BOT = 54, 54, 54
COL_W = PAGE_W - 2 * MARGIN_X

BODY, BODY_LEAD = 9.6, 12.4
NAME_SIZE = 20
SECTION_SIZE = 10.5
ROLE_SIZE = 10.2

doc = fitz.open()
page = doc.new_page(width=PAGE_W, height=PAGE_H)
y = MARGIN_TOP


def space(dy):
    global y
    y += dy


def new_page_if_needed(needed):
    global page, y
    if y + needed > PAGE_H - MARGIN_BOT:
        page = doc.new_page(width=PAGE_W, height=PAGE_H)
        y = MARGIN_TOP


def wrap(text, font, size):
    """Greedy wrap using real glyph widths."""
    words, lines, cur = text.split(), [], ""
    for w in words:
        trial = w if not cur else cur + " " + w
        if fitz.get_text_length(trial, fontname=font, fontsize=size) <= COL_W:
            cur = trial
        else:
            if cur:
                lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines


def text_block(content, size=BODY, font="helv", lead=BODY_LEAD, indent=0, gap_after=0):
    global y
    width = COL_W - indent
    words, lines, cur = content.split(), [], ""
    for w in words:
        trial = w if not cur else cur + " " + w
        if fitz.get_text_length(trial, fontname=font, fontsize=size) <= width:
            cur = trial
        else:
            lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    for ln in lines:
        new_page_if_needed(lead)
        page.insert_text((MARGIN_X + indent, y + size), ln, fontname=font, fontsize=size)
        y += lead
    y += gap_after


def bullet(content):
    """Hyphen bullet with a hanging indent. Hyphen parses more reliably than a glyph."""
    global y
    hang = 11
    new_page_if_needed(BODY_LEAD)
    page.insert_text((MARGIN_X, y + BODY), "-", fontname="helv", fontsize=BODY)
    text_block(content, indent=hang)


def section(title):
    global y
    space(7)
    new_page_if_needed(26)
    page.insert_text((MARGIN_X, y + SECTION_SIZE), title, fontname="hebo", fontsize=SECTION_SIZE)
    y += SECTION_SIZE + 4
    page.draw_line(
        fitz.Point(MARGIN_X, y), fitz.Point(PAGE_W - MARGIN_X, y), color=(0, 0, 0), width=0.6
    )
    y += 8


def role(title, org_line):
    global y
    space(4)
    new_page_if_needed(34)
    for ln in wrap(title, "hebo", ROLE_SIZE):
        page.insert_text((MARGIN_X, y + ROLE_SIZE), ln, fontname="hebo", fontsize=ROLE_SIZE)
        y += ROLE_SIZE + 2.5
    page.insert_text((MARGIN_X, y + BODY), org_line, fontname="helv", fontsize=BODY)
    y += BODY_LEAD + 2


# ---------------------------------------------------------------- header ----
page.insert_text((MARGIN_X, y + NAME_SIZE), "Robert (Bob) Wade", fontname="hebo", fontsize=NAME_SIZE)
y += NAME_SIZE + 6
text_block("Senior Engineering Manager | Platform & Reliability | Partner & Product | AI-Augmented Operations", size=9.8)
space(1)
text_block("Spring Hill, TN (Greater Nashville) | bwade231@gmail.com | (314) 630-5428")
text_block("linkedin.com/in/bwade231 | github.com/bwade | bobwa.de")

# --------------------------------------------------------------- summary ----
section("PROFESSIONAL SUMMARY")
text_block(
    "Senior Engineering Manager at Button owning two engineering functions, Core Engineering and "
    "Solutions Engineering, and 13 engineers behind $100B+ in mobile commerce for Amazon, Walmart, "
    "Uber, Lyft, Fetch, and Sam's Club. 19 years in engineering, 10+ in management. I take over "
    "unstable orgs and leave behind reliable, automated systems: rebuilt on-call to 99.99% uptime, "
    "held the platform through a Super Bowl at 2.6x its planned peak with errors flat, and run "
    "delivery increasingly on AI-augmented workflows. Also found and run commerce businesses end to "
    "end, from engineering and product to brand and design."
)

# ------------------------------------------------------------ competencies ----
section("CORE COMPETENCIES")
for label, items in [
    ("Leadership", "Multi-function org design, multi-team Agile ceremonies, hiring and bar-setting, coaching and career development, performance management, PERM sponsorship, executive and VP reporting"),
    ("Platform Reliability", "Incident command, on-call and PagerDuty, blameless postmortems, SLAs, observability, peak-load readiness"),
    ("Partner Engineering", "Enterprise integrations, escalation management, attribution and event pipelines, retail media"),
    ("Product and Delivery", "Roadmapping and release planning, backlog and capacity planning, feasibility and scoping gates, cross-functional delivery across product, revenue, and support"),
    ("Design and UX", "Brand and logo design, UI/UX, Figma, front-end build"),
    ("AI and Automation", "Claude and MCP, custom MCP servers, agentic PRD-to-ticket pipelines, generative creative"),
    ("Backend and Data", "Go, Python, Node.js, Postgres, Aurora, MongoDB, BigQuery"),
    ("Frontend", "TypeScript, React, Next.js, Tailwind"),
    ("Cloud and Infrastructure", "AWS (ECS, EC2, RDS/Aurora, S3, SES, Route 53), GCP, Terraform, Docker, GitHub Actions"),
]:
    text_block(f"{label}: {items}")

# ------------------------------------------------------------- experience ----
section("PROFESSIONAL EXPERIENCE")

role(
    "Senior Engineering Manager, Core Engineering & Solutions Engineering",
    "Button, Inc. | Remote (New York, NY) | October 2020 - Present",
)
text_block(
    "Own two engineering functions and 13 direct reports: Core Engineering (routing, attribution, "
    "data, infrastructure) and Solutions Engineering (partner delivery and technical escalation), "
    "covering the platform behind $100B+ in driven mobile commerce and routing 130M+ Amazon creator "
    "clicks a month across 200+ brands including Amazon, Walmart, Uber, Lyft, Fetch, Target, and "
    "Sam's Club."
)
space(2)
for b in [
    "Own the core infrastructure Button runs on (routing, decisioning, attribution, and the order pipeline every partner and dollar flows through) and hold the run-the-business and keep-the-lights-on mandate for reliability, tech debt, and operational load.",
    "Lead Amazon Prime Day readiness year over year, Button's largest revenue event: capacity planning, load testing, and Go/No-Go across core services, scaling infrastructure up to 12x baseline at 100% uptime.",
    "Served as incident commander through Fetch's Super Bowl, holding the platform at 2.6x its planned peak with errors within normal limits. Rebuilt on-call, severity classification, and blameless postmortems from scratch, sustaining 99.99% uptime and cutting MTTR.",
    "Cut core-engineering interrupts approximately 30% by standing up a Support-to-Data-to-Core escalation flow, converting reactive firefighting into protected delivery capacity.",
    "Own the order pipeline, the platform's revenue path at 600K+ orders per day. Drove autoscaling, Aurora migrations, and ComStore and Django modernization, and led the release-confidence program (staging parity plus end-to-end testing) that cut release cycles from roughly two months to three weeks. Backed cost discipline including a single AWS saving of approximately $70K per year.",
    "Sponsored internal read-only LLM tooling (a Sam's Club order debugger and a CSV validator) that cut manual triage load, built with tightly scoped tools to prevent hallucination. Championed AI-augmented delivery; org-wide, Claude-attributed code reached approximately 45% of lines shipped and two-thirds of merged pull requests.",
    "Stood up Button's partner-support function from scratch, taking support from fully ad hoc to a structured, SLA-backed operation. Architected the Salesforce-to-Zendesk-to-Jira model with Zendesk as source of truth for routing, prioritization, and SLAs, and formed a Support Engineering team to own it.",
    "Defined tiered SLAs and the incident priority matrix across strategic partners (Uber, Amazon, Best Buy, Sam's Club, Fetch): P0 acknowledged in under 15 minutes and 30-minute response for Tier 1, plus the escalation decision tree across Solutions Engineering, Data, and on-call.",
    "Solutions Engineering landed and scaled integrations across Amazon, Walmart, Best Buy, Target, Sam's Club, Nike, Lululemon, Puma, Samsung, Expedia, Marriott, Uber One, Lyft, Disney+, and StubHub, including the Sam's Club Glass and mParticle migration.",
    "Cut enterprise integration onboarding time 30% and raised revenue per integration 20% by standardizing the integration path and removing bespoke per-partner engineering.",
    "Led formation and initial delivery of Button's retail media product, setting roadmap and release plan with product and revenue and shipping initial releases with NY Post, Forbes, and BuzzFeed.",
    "Act as engineering manager, product manager, and scrum lead for the org: roadmap, backlog prioritization, quarterly capacity planning, and full Agile cadence across multiple squads, plus the feasibility gate between Revenue, Product, and Engineering.",
    "Built the team I now run and lead through managers as well as individual contributors, with a director-track Solutions Engineering leader reporting to me. Raised the hiring bar, authored the career-growth ladder and design-review process, and sponsored a PERM labor certification end to end.",
]:
    bullet(b)

role("Founder & Principal", "Digital Tide | Remote | 2023 - Present")
text_block(
    "Independent consultancy where I found and run businesses end to end across product, engineering, "
    "business, growth, and design. I stand companies up (entity, cloud, email, go-to-market), build "
    "the applications, and take on brand and design work where it is mine to do."
)
space(2)
for b in [
    "Sanbar (sanbar.us): built the client's entire technical foundation including GCP and AWS infrastructure, DNS, email and identity, deployment pipeline, and production site.",
    "That Paleo Chick (thatpaleochick.com): built the business, not just the site, with AWS infrastructure, email, automated social content and scheduling via Postiz, and affiliate monetization, running as a near-fully automated operation.",
    "Greedy: ran project management for the full site redesign (scope, vendors, launch) and own social marketing and paid acquisition, including a Meta Ad Library-driven competitive playbook and AI-generated video creative.",
    "Charter: designed and built an invoicing application end to end covering auth, billing entities, invoice generation, and payment tracking.",
    "Designed the brand and logo for Digital Tide and That Paleo Chick, and the UI/UX for the applications shipped.",
    "Digital Tide (digitalti.de): applied the same playbook to my own firm, plus the engineering standards clients inherit: Linear-first delivery, GitHub Actions CI, and Slack automation.",
]:
    bullet(b)

role("IT Manager, Engineering Chapter", "Centene Corporation | St. Louis, MO | January 2019 - October 2020")
for b in [
    "Led 25 engineers across seven cross-functional Agile teams delivering member-facing web and mobile applications and new health-plan implementations.",
    "Built the standard engineering process layer for all web and mobile matrix teams and defined the metrics leadership used for staffing and prioritization.",
    "Created a Developer Assessment Framework that made role expectations explicit, contributing to top 10% employee engagement across web leadership teams.",
]:
    bullet(b)

role(
    "IT Manager, Member AI & Mobile; Senior Application Software Engineer",
    "Centene Corporation | St. Louis, MO | September 2014 - January 2019",
)
for b in [
    "Built and led the cross-functional team that shipped a self-service AI health assistant, reducing call-center volume, and established the SDLC framework for the inherited application.",
    "Delivered 20+ mobile applications across iOS and Android, launched care management in the Florida market, and standardized mobile build, release, and compliance for state contracts.",
    "As Senior Engineer: shipped OAuth 2.0 via API Gateway, migrated the organization from SVN to Git, and mentored approximately 10 engineers.",
]:
    bullet(b)

# ---------------------------------------------------------------- earlier ----
section("EARLIER EXPERIENCE")
for line in [
    "Software Engineer / Web Producer, Centene, 2013 - 2014",
    "Team Lead, Visual Design, N-Depth Solutions, 2008 - 2013",
    "Web Developer, Clear Pages, 2007 - 2008",
]:
    text_block(line)

# -------------------------------------------------------------- education ----
section("EDUCATION")
text_block("A.A.S., Multimedia & Web Design, St. Charles Community College, 2004 - 2007")

section("CERTIFICATIONS")
text_block("ITIL Foundation, AXELOS")
text_block("Leadership Development Program, Centene")

doc.set_metadata(
    {
        "title": "Robert (Bob) Wade - Resume",
        "author": "Robert (Bob) Wade",
        "subject": "Senior Engineering Manager",
        "keywords": "engineering manager, platform reliability, partner integrations, "
        "AI-augmented delivery, incident command, SLAs, AWS, Terraform, TypeScript",
    }
)
import os
out = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
                   "public", "Robert_Wade_Resume_ATS.pdf")
doc.save(out, deflate=True)
print("wrote", out)
print("pages:", doc.page_count)
