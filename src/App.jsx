import { useState } from 'react'

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    clinic: '',
    role: '',
    note: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const focusAreas = [
    {
      title: 'Revenue drivers',
      description:
        'Identify the primary sources of revenue across private clinics, including service mix, patient demand, and recurring business patterns.',
    },
    {
      title: 'Operational friction',
      description:
        'Document the operational and administrative issues that most consistently create strain for clinic teams.',
    },
    {
      title: 'Manual inefficiencies',
      description:
        'Assess where clinics are losing time, margin, or efficiency because key processes remain manual, fragmented, or difficult to manage.',
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
      description:
        'A structured body of clinic-level observations that can be stored, analyzed, and compared systematically.',
    },
    {
      title: 'Pattern recognition',
      description:
        'Clear patterns across revenue drivers, operational bottlenecks, and recurring sources of administrative inefficiency.',
    },
    {
      title: 'Validated problem spaces',
      description:
        'A prioritized set of validated problem areas that may warrant future operational or technological solutions.',
    },
  ]

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmitted(true)
  }

  const shellCard =
    'rounded-[28px] border border-[rgba(148,163,184,0.18)] bg-[rgba(9,18,34,0.82)] shadow-[0_24px_60px_rgba(2,8,23,0.28)]'
  const mutedCard =
    'rounded-[20px] border border-[rgba(148,163,184,0.18)] bg-[rgba(14,25,45,0.92)]'
  const primaryButton =
    'inline-flex min-h-12 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 px-5 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5'
  const secondaryButton =
    'inline-flex min-h-12 items-center justify-center rounded-full border border-[rgba(148,163,184,0.32)] px-5 text-sm font-semibold text-slate-100 transition-transform duration-200 hover:-translate-y-0.5'
  const eyebrow =
    'mb-4 text-[0.8rem] uppercase tracking-[0.16em] text-violet-400'
  const sectionHeading =
    'mb-5 text-[clamp(1.8rem,2.7vw,2.5rem)] leading-[1.05] tracking-[-0.04em] text-slate-50'
  const gradientText =
    'inline-block bg-[linear-gradient(120deg,#8b5cf6_0%,#7c3aed_28%,#06b6d4_62%,#38bdf8_100%)] bg-clip-text text-transparent [animation:verex-hue_2.8s_linear_infinite] [will-change:filter]'
  const chip =
    'rounded-full border border-[rgba(148,163,184,0.18)] bg-[rgba(14,25,45,0.92)] px-[14px] py-[10px] text-sm text-slate-100'
  const inputClass =
    'w-full rounded-2xl border border-[rgba(148,163,184,0.32)] bg-[rgba(8,17,31,0.9)] px-4 py-3.5 text-slate-50 outline-none transition focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-[rgba(139,92,246,0.32)]'

  return (
    <div className="mx-auto min-h-screen w-full max-w-[1180px] px-8 pb-8 pt-6 max-[960px]:px-5 max-[960px]:pt-5">
      <header className="mb-9 flex items-center justify-between gap-6 max-[960px]:mb-8">
        <a
          className="inline-flex items-center gap-3 text-slate-50 no-underline"
          href="#hero"
        >
          <span
            className={`grid h-10 w-10 place-items-center rounded-[14px] bg-[linear-gradient(135deg,#8b5cf6_0%,#7c3aed_28%,#06b6d4_62%,#38bdf8_100%)] text-base font-bold text-white shadow-[0_16px_40px_rgba(99,102,241,0.35)] [animation:verex-hue_2.8s_linear_infinite] [will-change:filter]`}
          >
            V
          </span>
          <span className={`text-lg font-bold tracking-[-0.03em] ${gradientText}`}>
            Verex
          </span>
        </a>
        <nav className="flex flex-wrap gap-5 max-[640px]:gap-3.5">
          <a className="text-slate-400 no-underline transition-colors hover:text-slate-100" href="#scope">
            Scope
          </a>
          <a
            className="text-slate-400 no-underline transition-colors hover:text-slate-100"
            href="#questions"
          >
            Questions
          </a>
          <a
            className="text-slate-400 no-underline transition-colors hover:text-slate-100"
            href="#outcomes"
          >
            Outcomes
          </a>
          <a className="text-slate-400 no-underline transition-colors hover:text-slate-100" href="#contact">
            Contact
          </a>
        </nav>
      </header>

      <main>
        <section
          className="mb-6 grid gap-[22px] max-[960px]:grid-cols-1 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]"
          id="hero"
        >
          <div className={`${shellCard} p-[26px] max-[960px]:p-6`}>
            <p className={eyebrow}>Independent research on private healthcare clinic operations</p>
            <h1 className="mb-3.5 text-[clamp(2.6rem,5.2vw,4.7rem)] leading-[0.96] tracking-[-0.06em] text-slate-50">
              <span className={gradientText}>Verex</span> is studying how private clinics
              in Ontario actually operate.
            </h1>
            <p className="max-w-[60ch] text-base text-slate-400">
              Over a three to four month period, the initiative is expected to speak with
              200 to 500 clinics across Toronto and the GTA through brief, respectful
              conversations focused on revenue drivers, operational challenges, and
              recurring inefficiencies.
            </p>
            <div className="my-[24px] flex flex-wrap gap-3.5 max-[640px]:flex-col">
              <a className={primaryButton} href="#contact">
                Indicate availability
              </a>
              <a className={secondaryButton} href="#questions">
                Review the research questions
              </a>
            </div>
            <ul className="flex flex-wrap gap-2.5">
              <li className={chip}>Ontario focus, centered on Toronto and the GTA</li>
              <li className={chip}>200 to 500 clinics</li>
              <li className={chip}>30 to 60 second conversations</li>
            </ul>
          </div>

          <aside
            className={`${shellCard} bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.16),transparent_45%),rgba(9,18,34,0.82)] p-[26px] max-[960px]:p-6`}
          >
            <p className={eyebrow}>Operational issue intake</p>
            <h2 className={sectionHeading}>Share a recurring clinic challenge.</h2>
            <p className="mb-[18px] mt-2 text-base text-slate-400">
              If your clinic is dealing with a persistent administrative or operational
              issue, you can provide a short summary here. Submissions help identify
              patterns across clinics and highlight areas that warrant deeper research.
            </p>
            <div className="mb-[18px] mt-[18px] grid gap-3.5">
              <div className={`${mutedCard} p-4`}>
                <strong className="mb-2 block text-slate-50">Examples of useful input</strong>
                <p className="text-sm leading-6 text-slate-400">
                  Scheduling friction, billing issues, staffing strain, follow-up gaps, intake delays, or manual workflows.
                </p>
              </div>
              <div className={`${mutedCard} p-4`}>
                <strong className="mb-2 block text-slate-50">Time required</strong>
                <p className="text-sm leading-6 text-slate-400">
                  The form is designed to be brief and can be completed in under a minute.
                </p>
              </div>
            </div>
            <a className={`${primaryButton} w-full`} href="#contact">
              Start the form
            </a>
          </aside>
        </section>

        <section
          aria-label="Verex research summary"
          className="mb-7 grid gap-[18px] md:grid-cols-3"
          id="scope"
        >
          <div className={`${shellCard} rounded-3xl p-6`}>
            <strong className="mb-2.5 block text-slate-50">Ontario clinic sample</strong>
            <span className="text-sm text-slate-400">
              focused on private healthcare operators across Toronto and the GTA
            </span>
          </div>
          <div className={`${shellCard} rounded-3xl p-6`}>
            <strong className="mb-2.5 block text-slate-50">Short-form outreach</strong>
            <span className="text-sm text-slate-400">
              built around concise conversations intended to gather operational insight
            </span>
          </div>
          <div className={`${shellCard} rounded-3xl p-6`}>
            <strong className="mb-2.5 block text-slate-50">Pattern-based analysis</strong>
            <span className="text-sm text-slate-400">
              designed to compare recurring operational issues across many clinics
            </span>
          </div>
        </section>

        <section className="mb-7" id="vision">
          <div className="mb-5">
            <p className={eyebrow}>Research focus</p>
            <h2 className={sectionHeading}>What the outreach is intended to uncover across clinics.</h2>
          </div>

          <div className="grid gap-[18px] md:grid-cols-3">
            {focusAreas.map((item) => (
              <article className={`${shellCard} rounded-3xl p-6`} key={item.title}>
                <h3 className="mb-2.5 text-[1.2rem] text-slate-50">{item.title}</h3>
                <p className="text-sm leading-6 text-slate-400">{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-7" id="questions">
          <div className="mb-5">
            <p className={eyebrow}>Core questions</p>
            <h2 className={sectionHeading}>Each interaction is anchored by two concise questions.</h2>
          </div>

          <div className="grid gap-[18px] md:grid-cols-2">
            {coreQuestions.map((question, index) => (
              <article className={`${shellCard} rounded-3xl p-6`} key={question}>
                <span className="mb-3.5 inline-flex h-[42px] min-w-[42px] items-center justify-center rounded-full bg-[rgba(139,92,246,0.14)] font-bold text-violet-400">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <p className="max-w-[34ch] text-base text-slate-200">{question}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-7">
          <div className="mb-5">
            <p className={eyebrow}>Additional signals</p>
            <h2 className={sectionHeading}>
              In addition to the primary questions, the research captures supporting context.
            </h2>
          </div>

          <div className={`${shellCard} rounded-3xl p-7`}>
            <ul className="grid gap-3 md:grid-cols-2">
              {researchSignals.map((signal) => (
                <li
                  className="rounded-[18px] border border-[rgba(148,163,184,0.18)] bg-[rgba(14,25,45,0.92)] px-[18px] py-4 text-slate-100"
                  key={signal}
                >
                  {signal}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          className={`${shellCard} mb-7 rounded-3xl bg-[linear-gradient(135deg,rgba(139,92,246,0.12),rgba(6,182,212,0.08)),rgba(9,18,34,0.82)] p-6 text-center`}
        >
          <p className="text-base text-slate-300">
            The objective is to collect structured operational insight, identify recurring
            sources of friction, and determine which problem areas merit deeper analysis.
          </p>
        </section>

        <section
          className="mb-7 grid gap-[18px] max-[960px]:grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]"
          id="outcomes"
        >
          <div className="flex flex-col justify-center">
            <p className={eyebrow}>Expected outcome</p>
            <h2 className={sectionHeading}>
              What this initiative is designed to produce if the patterns are consistent.
            </h2>
            <p className="max-w-[60ch] text-base text-slate-400">
              The research is intended to produce a structured view of how clinics
              generate revenue, where efficiency is lost, and which operational issues
              recur frequently enough to justify focused attention.
            </p>
            <div className={`${shellCard} mt-6 rounded-[20px] p-5`}>
              <strong className="mb-3 inline-block text-slate-50">Research output</strong>
              <p className="text-sm leading-6 text-slate-400">
                The resulting analysis is intended to highlight the most common revenue
                drivers, administrative bottlenecks, and operational issues affecting
                private clinics across the target market.
              </p>
            </div>
          </div>

          <div className="grid gap-[18px] md:grid-cols-3">
            {outcomes.map((outcome, index) => (
              <article className={`${shellCard} rounded-3xl p-6`} key={outcome.title}>
                <span className="mb-3.5 inline-flex h-[42px] min-w-[42px] items-center justify-center rounded-full bg-[rgba(139,92,246,0.14)] font-bold text-violet-400">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mb-2.5 text-[1.2rem] text-slate-50">{outcome.title}</h3>
                <p className="max-w-[34ch] text-sm leading-6 text-slate-400">{outcome.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="grid gap-[22px] max-[960px]:grid-cols-1 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]"
          id="contact"
        >
          <div className="flex flex-col justify-center">
            <p className={eyebrow}>Participation</p>
            <h2 className={sectionHeading}>
              Clinic operators and staff may share their contact details here if they are open to participating.
            </h2>
            <p className="max-w-[60ch] text-base text-slate-400">
              This is an optional way for clinic owners, office managers, administrators,
              and staff to indicate that they may be open to a brief conversation about
              operational challenges within their clinic.
            </p>
            <div className={`${shellCard} mt-6 rounded-[20px] p-5`}>
              <strong className="mb-3 inline-block text-slate-50">Submission note</strong>
              <p className="text-sm leading-6 text-slate-400">
                The form below is intended to collect initial contact details and brief
                context ahead of outreach.
              </p>
            </div>
          </div>

          <form className={`${shellCard} grid gap-4 p-[26px] max-[960px]:p-6`} onSubmit={handleSubmit}>
            <label className="grid gap-2 font-medium text-slate-50">
              Name
              <input
                className={inputClass}
                type="text"
                name="name"
                placeholder="Full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </label>

            <label className="grid gap-2 font-medium text-slate-50">
              Email
              <input
                className={inputClass}
                type="email"
                name="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>

            <label className="grid gap-2 font-medium text-slate-50">
              Clinic
              <input
                className={inputClass}
                type="text"
                name="clinic"
                placeholder="Clinic or practice name"
                value={formData.clinic}
                onChange={handleChange}
              />
            </label>

            <label className="grid gap-2 font-medium text-slate-50">
              Role
              <input
                className={inputClass}
                type="text"
                name="role"
                placeholder="Owner, manager, administrator, clinician"
                value={formData.role}
                onChange={handleChange}
              />
            </label>

            <label className="grid gap-2 font-medium text-slate-50">
              Additional context
              <textarea
                className={inputClass}
                name="note"
                rows="5"
                placeholder="Preferred timing, clinic type, or any context that may be useful before outreach"
                value={formData.note}
                onChange={handleChange}
              />
            </label>

            <button className={`${primaryButton} mt-1.5 w-full`} type="submit">
              Submit details
            </button>

            <p
              aria-live="polite"
              className={`min-h-6 text-sm ${submitted ? 'text-green-400' : 'text-slate-400'}`}
            >
              {submitted
                ? 'Thank you. Your details have been noted in this preview experience.'
                : 'Use this form to provide contact details and a brief description of the issue.'}
            </p>
          </form>
        </section>
      </main>
    </div>
  )
}

export default App
