import { useEffect, useState } from 'react'
import IntakeForm from '../components/public/IntakeForm'

const card = 'rounded-2xl border border-[var(--border)] bg-[var(--surface)] border-glow'
const cardLifted = 'rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-2)] border-glow'
const primaryBtn =
  'inline-flex h-11 shrink-0 items-center justify-center rounded-xl bg-[var(--accent)] px-6 text-[0.85rem] font-semibold text-white transition-all duration-200 hover:bg-[var(--accent-hover)] hover:-translate-y-px active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50'
const ghostBtn =
  'inline-flex h-11 shrink-0 items-center justify-center rounded-xl border border-[var(--border)] bg-transparent px-6 text-[0.85rem] font-semibold text-[var(--text-secondary)] transition-all duration-200 hover:border-[var(--accent)] hover:text-[var(--text-primary)] disabled:cursor-not-allowed disabled:opacity-50'
const eyebrow = 'mb-3 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-[var(--text-muted)]'

const researchAreas = [
  {
    number: '01',
    title: 'Revenue Operations',
    description:
      'Understanding what drives clinic revenue - service mix, patient volumes, billing cycles, and the income patterns that vary across practice types.',
  },
  {
    number: '02',
    title: 'Operational Efficiency',
    description:
      'Identifying where clinics consistently lose time and capacity through fragmented workflows, scheduling gaps, or administrative bottlenecks.',
  },
  {
    number: '03',
    title: 'Staffing and Capacity',
    description:
      'Examining how clinical and administrative staffing decisions affect throughput, team strain, costs, and the ability to deliver consistent care.',
  },
  {
    number: '04',
    title: 'Technology Adoption',
    description:
      'Assessing how clinics evaluate, adopt, or avoid operational tools - and what keeps many practices reliant on manual alternatives.',
  },
]

const processSteps = [
  {
    step: '01',
    title: 'Brief outreach',
    description:
      'We contact clinic operators for a short, respectful conversation. No sales pitch, no lengthy survey - designed to take under two minutes.',
  },
  {
    step: '02',
    title: 'Structured inquiry',
    description:
      'Two core questions anchor each conversation, supported by a focused set of signals that help us categorize and compare responses across clinic types.',
  },
  {
    step: '03',
    title: 'Pattern synthesis',
    description:
      'Responses are analyzed across clinic types, sizes, and locations to surface operational issues that recur with meaningful frequency.',
  },
  {
    step: '04',
    title: 'Research output',
    description:
      'Findings are synthesized into a structured dataset identifying the most common revenue drivers, bottlenecks, and problem areas across the target market.',
  },
]

const focusAreas = [
  {
    title: 'Revenue drivers',
    description:
      'Identify the primary sources of revenue across private clinics, including service mix, patient demand, and recurring business patterns.',
  },
  {
    title: 'Operational friction',
    description: 'Document the operational and administrative issues that most consistently create strain for clinic teams.',
  },
  {
    title: 'Manual inefficiencies',
    description:
      'Assess where clinics are losing time, margin, or efficiency because key processes remain manual, fragmented, or difficult to manage.',
  },
]

const testimonials = [
  {
    quote:
      'We run three chairs and billing reconciliation alone costs us half a day every week. I described the problem in about a minute - they already understood the context and asked exactly the right follow-up.',
    author: 'D. Marchetti',
    role: 'Dental Practice Owner',
    location: 'Richmond Hill, ON',
    initials: 'DM',
  },
  {
    quote:
      'Most of the friction we deal with is invisible until it compounds - no-shows feeding into rebooking gaps feeding into revenue gaps. Nobody had asked about it without trying to sell me scheduling software afterward.',
    author: 'K. Osei',
    role: 'Clinic Operations Manager',
    location: 'Mississauga, ON',
    initials: 'KO',
  },
]

const coreQuestions = [
  'What is currently driving most of your revenue?',
  'What is the most frustrating operational issue you deal with?',
]

const researchSignals = [
  'Whether the issue is frequent or occasional',
  'Whether the impact is on revenue, time, or both',
  'Whether the clinic has already tried to solve it',
  'How open the clinic is to new tools or process changes',
]

const outcomes = [
  {
    title: 'Structured dataset',
    description: 'A structured body of clinic-level observations that can be stored, analyzed, and compared systematically.',
  },
  {
    title: 'Pattern recognition',
    description: 'Clear patterns across revenue drivers, operational bottlenecks, and recurring sources of administrative inefficiency.',
  },
  {
    title: 'Validated problem spaces',
    description: 'A prioritized set of validated problem areas that may warrant future operational or technological solutions.',
  },
]

export default function PublicLandingPage() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 56)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <header className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${scrolled ? 'nav-scrolled border-[var(--border)]' : 'border-transparent'}`}>
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-5 py-4 sm:px-8">
          <a href="#hero" className="no-underline" aria-label="Verex home">
            <span className="text-[0.95rem] font-bold tracking-[0.08em] text-[var(--text-primary)]">VEREX</span>
          </a>
          <nav className="flex items-center gap-0.5 text-[0.8rem] text-[var(--text-secondary)]">
            {[
              ['#research', 'Research'],
              ['#process', 'Process'],
              ['#outcomes', 'Outcomes'],
            ].map(([href, label]) => (
              <a key={href} href={href} className="rounded-lg px-3 py-1.5 no-underline transition-colors hover:bg-[var(--surface)] hover:text-[var(--text-primary)]">
                {label}
              </a>
            ))}
            <a href="#contact" className={`${primaryBtn} ml-3 h-9 rounded-lg px-5 text-[0.8rem]`}>
              Participate
            </a>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <section
          id="hero"
          className="relative grid min-h-[88vh] items-center gap-8 pb-16 pt-28 max-[960px]:grid-cols-1 lg:grid-cols-[minmax(0,1.3fr)_minmax(280px,0.7fr)] lg:gap-12"
        >
          <div className="hero-grid-bg pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />

          <div className="relative flex flex-col justify-center reveal">
            <div className="mb-6 flex flex-wrap gap-2">
              {[
                { label: 'Independent Research', icon: '◆' },
                { label: 'Ontario - Toronto & GTA', icon: '◆' },
                { label: 'Not affiliated with any vendor', icon: '◆' },
              ].map(({ label, icon }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-[0.72rem] font-medium text-[var(--text-secondary)]"
                  style={{ boxShadow: '0 0 7px var(--glow)' }}
                >
                  <span className="text-[0.5rem] text-[var(--warm)]" aria-hidden="true">
                    {icon}
                  </span>
                  {label}
                </span>
              ))}
            </div>

            <h1 className="mb-5 text-[clamp(2.6rem,6.5vw,4.6rem)] font-bold leading-[0.95] tracking-[-0.045em] text-[var(--text-primary)]">
              Studying how Ontario&apos;s private clinics <em className="not-italic text-[var(--accent)]">actually operate.</em>
            </h1>

            <p className="mb-8 max-w-[54ch] text-[1rem] leading-[1.78] text-[var(--text-secondary)]">
              An independent research initiative speaking with 200 to 500 private clinic operators across Toronto and the GTA - focused on revenue drivers, operational friction, and recurring inefficiencies.
            </p>

            <div className="mb-10 flex flex-wrap gap-3">
              <a className={primaryBtn + ' h-12 px-7 text-[0.875rem]'} href="#contact">
                Indicate availability
              </a>
              <a className={ghostBtn + ' h-12 px-7 text-[0.875rem]'} href="#process">
                Review methodology
              </a>
            </div>

            <div className="flex flex-wrap gap-x-8 gap-y-3">
              {[
                { value: '200-500', label: 'Clinic conversations' },
                { value: '3-4 mo.', label: 'Research period' },
                { value: '< 2 min', label: 'Per conversation' },
              ].map(({ value, label }) => (
                <div key={label}>
                  <p className="text-[1.45rem] font-bold tracking-[-0.03em] text-[var(--text-primary)]">{value}</p>
                  <p className="text-[0.72rem] text-[var(--text-muted)]">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <aside
            className={`relative ${card} flex flex-col p-6 sm:p-7 reveal reveal-2`}
            style={{ background: 'radial-gradient(ellipse at top left, var(--accent-dim), transparent 55%), var(--surface)' }}
          >
            <p className={eyebrow}>Operational issue intake</p>
            <h2 className="mb-3 text-[1.45rem] font-bold leading-[1.1] tracking-[-0.025em] text-[var(--text-primary)]">Share a recurring clinic challenge.</h2>
            <p className="mb-6 text-[0.875rem] leading-[1.7] text-[var(--text-secondary)]">
              If your clinic is dealing with a persistent administrative or operational issue, submit a short summary here. Your input helps identify patterns across clinics.
            </p>
            <div className="mb-6 grid gap-2.5">
              <div className={cardLifted + ' p-4'}>
                <p className="mb-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">Examples of useful input</p>
                <p className="text-[0.82rem] leading-[1.65] text-[var(--text-secondary)]">
                  Scheduling friction, billing issues, staffing strain, follow-up gaps, intake delays, or manual workflows.
                </p>
              </div>
              <div className={cardLifted + ' flex items-center justify-between p-4'}>
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">Time required</p>
                <p className="text-[0.82rem] font-semibold text-[var(--warm)]">Under 1 minute</p>
              </div>
            </div>
            <a className={primaryBtn + ' w-full justify-center h-12'} href="#contact">
              Start the form
            </a>
          </aside>
        </section>

        <section aria-label="Research scope" className="mb-20 reveal">
          <div className={`${card} grid divide-y divide-[var(--border)] sm:grid-cols-4 sm:divide-x sm:divide-y-0`}>
            {[
              { label: 'Geographic focus', value: 'Ontario - Toronto & GTA' },
              { label: 'Research method', value: 'Structured short-form outreach' },
              { label: 'Analysis approach', value: 'Pattern-based comparison' },
              { label: 'Output type', value: 'Operational insight dataset' },
            ].map(({ label, value }) => (
              <div key={label} className="px-5 py-4">
                <p className="mb-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">{label}</p>
                <p className="text-[0.875rem] font-medium text-[var(--text-primary)]">{value}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="section-rule mb-20" />

        <section id="research" className="mb-20">
          <div className="mb-10 reveal">
            <p className={eyebrow}>Research areas</p>
            <h2 className="max-w-[22ch] text-[clamp(1.7rem,4vw,2.6rem)] font-bold leading-[1.05] tracking-[-0.04em] text-[var(--text-primary)]">
              Four operational dimensions we examine across every clinic.
            </h2>
          </div>

          <div className="grid gap-px overflow-hidden rounded-2xl bg-[var(--border)] sm:grid-cols-2 lg:grid-cols-4">
            {researchAreas.map((area, index) => (
              <article key={area.title} className="group flex flex-col justify-between bg-[var(--surface)] p-6 transition-colors duration-200 hover:bg-[var(--surface-2)] reveal" style={{ animationDelay: `${index * 60}ms` }}>
                <div>
                  <p className="mb-5 text-[2.2rem] font-bold leading-none tracking-[-0.04em] transition-colors duration-200 group-hover:text-[var(--accent)]" style={{ color: 'var(--text-muted)' }} aria-hidden="true">
                    {area.number}
                  </p>
                  <h3 className="mb-3 text-[1rem] font-semibold text-[var(--text-primary)]">{area.title}</h3>
                  <p className="text-[0.825rem] leading-[1.7] text-[var(--text-secondary)]">{area.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="process" className="mb-20">
          <div className="mb-10 reveal">
            <p className={eyebrow}>Methodology</p>
            <h2 className="max-w-[26ch] text-[clamp(1.7rem,4vw,2.6rem)] font-bold leading-[1.05] tracking-[-0.04em] text-[var(--text-primary)]">A structured four-stage research process.</h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, index) => (
              <div key={step.step} className={`${card} relative flex flex-col gap-4 p-5 sm:p-6 reveal`} style={{ animationDelay: `${index * 70}ms` }}>
                {index < processSteps.length - 1 && <div className="pointer-events-none absolute right-0 top-[1.85rem] hidden h-px w-4 translate-x-full bg-[var(--border)] lg:block" aria-hidden="true" />}
                <div className="flex items-center justify-between">
                  <span className="text-[1.6rem] font-bold tracking-[-0.04em] text-[var(--warm)]">{step.step}</span>
                  <div className="ml-3 h-px flex-1 bg-[var(--border)]" />
                </div>
                <div>
                  <h3 className="mb-2 text-[0.95rem] font-semibold text-[var(--text-primary)]">{step.title}</h3>
                  <p className="text-[0.82rem] leading-[1.7] text-[var(--text-secondary)]">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="section-rule mb-20" />

        <section id="scope" className="mb-20">
          <div className="mb-10 reveal">
            <p className={eyebrow}>Research focus</p>
            <h2 className="max-w-[28ch] text-[clamp(1.7rem,4vw,2.6rem)] font-bold leading-[1.05] tracking-[-0.04em] text-[var(--text-primary)]">
              What the outreach is designed to uncover across clinics.
            </h2>
          </div>

          <div className="grid gap-4 sm:gap-5 md:grid-cols-3">
            {focusAreas.map((item, index) => (
              <article key={item.title} className={`${card} group p-6 sm:p-7 transition-colors duration-200 hover:border-[var(--accent)] reveal`} style={{ animationDelay: `${index * 70}ms` }}>
                <div className="mb-5 h-px w-8 bg-[var(--accent)] transition-all duration-300 group-hover:w-16" />
                <h3 className="mb-3 text-[1.05rem] font-semibold text-[var(--text-primary)]">{item.title}</h3>
                <p className="text-[0.85rem] leading-[1.7] text-[var(--text-secondary)]">{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-20 reveal">
          <div className="mb-8">
            <p className={eyebrow}>From participants</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {testimonials.map((testimonial, index) => (
              <blockquote key={testimonial.author} className={`${cardLifted} flex flex-col gap-5 p-6 sm:p-7 reveal`} style={{ animationDelay: `${index * 80}ms` }}>
                <span className="text-[2rem] font-bold leading-none text-[var(--accent)] opacity-60" aria-hidden="true">
                  &ldquo;
                </span>
                <p className="flex-1 text-[0.925rem] leading-[1.75] text-[var(--text-primary)]">{testimonial.quote}</p>
                <footer className="flex items-center gap-3 border-t border-[var(--border)] pt-5">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-[0.7rem] font-bold text-white" style={{ background: 'var(--accent-subtle)', color: 'var(--accent)' }} aria-hidden="true">
                    {testimonial.initials}
                  </div>
                  <div>
                    <p className="text-[0.8rem] font-semibold text-[var(--text-primary)]">{testimonial.author}</p>
                    <p className="text-[0.72rem] text-[var(--text-muted)]">
                      {testimonial.role} - {testimonial.location}
                    </p>
                  </div>
                </footer>
              </blockquote>
            ))}
          </div>
        </section>

        <div className="section-rule mb-20" />

        <section id="questions" className="mb-20">
          <div className="mb-10 reveal">
            <p className={eyebrow}>Core questions</p>
            <h2 className="max-w-[30ch] text-[clamp(1.7rem,4vw,2.6rem)] font-bold leading-[1.05] tracking-[-0.04em] text-[var(--text-primary)]">
              Each interaction is anchored by two concise questions.
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {coreQuestions.map((question, index) => (
              <article key={question} className={`${card} group flex flex-col gap-5 p-6 sm:p-8 transition-colors duration-200 hover:border-[var(--accent)] reveal`} style={{ animationDelay: `${index * 80}ms` }}>
                <span className="text-[0.65rem] font-bold uppercase tracking-[0.22em] text-[var(--text-muted)]">Question {String(index + 1).padStart(2, '0')}</span>
                <p className="text-[1.2rem] font-semibold leading-[1.4] tracking-[-0.015em] text-[var(--text-primary)]">&ldquo;{question}&rdquo;</p>
              </article>
            ))}
          </div>

          <div className="mt-6 reveal">
            <div className={`${card} p-6`}>
              <p className="mb-5 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">Additional context captured</p>
              <div className="grid gap-px overflow-hidden rounded-xl bg-[var(--border)] sm:grid-cols-2">
                {researchSignals.map((signal, index) => (
                  <div key={signal} className="flex items-start gap-3 bg-[var(--surface)] px-5 py-3.5">
                    <span className="mt-0.5 text-[0.6rem] font-bold tracking-[0.15em] text-[var(--text-muted)]" aria-hidden="true">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <p className="text-[0.85rem] leading-[1.6] text-[var(--text-secondary)]">{signal}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="outcomes" className="mb-20 grid gap-10 max-[960px]:grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
          <div className="flex flex-col justify-center reveal">
            <p className={eyebrow}>Expected outcome</p>
            <h2 className="mb-5 text-[clamp(1.7rem,4vw,2.6rem)] font-bold leading-[1.05] tracking-[-0.04em] text-[var(--text-primary)]">What this initiative is designed to produce.</h2>
            <p className="mb-6 max-w-[52ch] text-[0.95rem] leading-[1.78] text-[var(--text-secondary)]">
              The research is intended to produce a structured view of how clinics generate revenue, where efficiency is lost, and which operational issues recur frequently enough to justify focused attention.
            </p>

            <div className={`${card} p-5`} style={{ background: 'linear-gradient(135deg, var(--accent-subtle), transparent 60%), var(--surface)' }}>
              <p className="mb-2 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">Research output</p>
              <p className="text-[0.875rem] leading-[1.7] text-[var(--text-secondary)]">
                The resulting analysis highlights the most common revenue drivers, administrative bottlenecks, and operational issues affecting private clinics across the target market.
              </p>
            </div>
          </div>

          <div className="grid gap-3.5">
            {outcomes.map((outcome, index) => (
              <article key={outcome.title} className={`${card} flex gap-4 p-5 sm:p-6 transition-colors duration-200 hover:border-[var(--accent)] reveal`} style={{ animationDelay: `${index * 70}ms` }}>
                <span className="mt-0.5 shrink-0 text-[0.65rem] font-bold tracking-[0.2em] text-[var(--warm)]" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="mb-1.5 text-[0.95rem] font-semibold text-[var(--text-primary)]">{outcome.title}</h3>
                  <p className="text-[0.85rem] leading-[1.7] text-[var(--text-secondary)]">{outcome.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <div className="section-rule mb-20" />

        <section id="contact" className="mb-20 grid gap-10 max-[960px]:grid-cols-1 lg:grid-cols-[minmax(280px,0.6fr)_minmax(0,1.4fr)]">
          <div className="flex flex-col reveal">
            <p className={eyebrow}>Research intake</p>
            <h2 className="mb-4 text-[clamp(2rem,6vw,3.5rem)] font-bold leading-[0.96] tracking-[-0.045em] text-[var(--text-primary)]">Share your experience</h2>
            <p className="mb-8 text-[0.95rem] leading-[1.78] text-[var(--text-secondary)] max-[960px]:max-w-[56ch]">
              Help us understand your workflow, pain points, and decision criteria. The form is brief, structured, and designed to make your input actionable.
            </p>

            <div className={cardLifted + ' mb-6 p-5 sm:p-6'}>
              <p className="mb-4 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">What we ask</p>
              <ul className="grid gap-3 text-[0.875rem] leading-[1.65] text-[var(--text-secondary)]">
                {[
                  'Your professional context and customer type',
                  'The main problem you are facing and your current workaround',
                  'Frequency and preferred follow-up channel',
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-[0.4em] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-start gap-3 rounded-xl border border-[var(--border-subtle)] p-4">
              <span className="mt-0.5 text-[0.65rem] text-[var(--warm)]" aria-hidden="true">
                ◆
              </span>
              <p className="text-[0.8rem] leading-[1.6] text-[var(--text-muted)]">
                This is independent research. No sales pitch. No spam. Your responses are used only to identify patterns across clinics.
              </p>
            </div>
          </div>

          <IntakeForm />
        </section>
      </main>

      <footer className="border-t border-[var(--border)]">
        <div className="mx-auto max-w-[1200px] px-5 py-8 sm:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="mb-1 text-[0.8rem] font-bold tracking-[0.1em] text-[var(--text-primary)]">VEREX</p>
              <p className="text-[0.72rem] text-[var(--text-muted)]">Independent research initiative - Ontario, Canada</p>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-1 text-[0.72rem] text-[var(--text-muted)]">
              <span>Private healthcare clinic operations</span>
              <span className="text-[var(--border)]">-</span>
              <span>Toronto & GTA</span>
              <span className="text-[var(--border)]">-</span>
              <span>2024-2025</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
