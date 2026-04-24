# Verex — Project Description

## What It Is

Verex is an independent research initiative studying how private clinic operators in Ontario (Toronto and the GTA) actually run their businesses. It is not a product, not a vendor, and not a lead generation tool. The goal is to produce a structured, pattern-based dataset of operational reality across 200–500 private clinics.

## The Research Problem

Private clinic owners — physicians who also run businesses, practice managers, dental and allied health operators — deal with a range of persistent operational problems that are poorly documented at scale. Revenue drivers, administrative bottlenecks, staffing strain, manual inefficiencies, and technology adoption patterns vary widely across clinic types and are largely invisible to outsiders. Verex exists to surface these patterns through direct, structured outreach.

## Research Scope

**Geographic focus:** Ontario — Toronto and the Greater Toronto Area  
**Target participants:** Private clinic owners and operators  
**Research period:** 3–4 months  
**Conversation length:** Under 2 minutes per clinic  
**Sample target:** 200–500 clinic conversations

### Four Operational Dimensions

1. **Revenue Operations** — Service mix, patient volumes, billing cycles, and income patterns across practice types
2. **Operational Efficiency** — Where clinics lose time through fragmented workflows, scheduling gaps, or administrative bottlenecks
3. **Staffing and Capacity** — How staffing decisions affect throughput, cost, and care consistency
4. **Technology Adoption** — How clinics evaluate, adopt, or avoid operational tools

### Core Research Questions

Each conversation is anchored by two questions:
- *"What is currently driving most of your revenue?"*
- *"What is the most frustrating operational issue you deal with?"*

Supporting signals captured per response:
- Whether the issue is frequent or occasional
- Whether the impact is on revenue, time, or both
- Whether the clinic has already tried to solve it
- How open the clinic is to new tools or process changes

## Expected Outputs

1. **Structured dataset** — A body of clinic-level observations that can be stored, analyzed, and compared systematically
2. **Pattern recognition** — Clear patterns across revenue drivers, operational bottlenecks, and recurring administrative inefficiencies
3. **Validated problem spaces** — A prioritized set of validated problem areas that may warrant future operational or technological solutions

## The Application

The Verex platform is a React + Vite web application with two surfaces:

### Public-facing (`/`)
A landing page designed to establish research credibility with time-poor, skeptical clinic operators. It explains the initiative, methodology, and outcomes, then presents an intake form for clinic operators to share their context and operational challenges. The form captures:
- Professional context and customer type
- The main problem and current workaround
- Frequency and preferred follow-up channel

### Admin dashboard (`/admin/*`)
A protected internal interface for the Verex research team to manage and analyze intake submissions. Includes:
- **Dashboard** — Summary statistics and activity overview
- **Submissions** — Full table view with filtering, status management, and notes
- **Submission detail** — Per-clinic submission review with status workflow and annotation
- **Analytics** — Charts and trend analysis across submission data
- **Settings** — Internal configuration

## Tech Stack

- **Frontend:** React 18, Vite, Tailwind CSS
- **Backend/Database:** Supabase (PostgreSQL + Auth)
- **Deployment:** GitHub Pages (static export via Vite build)
- **Auth:** Supabase-based admin authentication, protected routes

## Brand and Design Direction

Verex presents as institutional research, not a startup or SaaS product. The visual language draws from consultancy reports and academic sector briefs — dark mode, strong typographic hierarchy, disciplined spacing, no decorative noise. The design goal is to communicate rigorous independent research to an audience that is professionally skeptical and short on time.
