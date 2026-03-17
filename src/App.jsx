import { useState } from 'react'
import './App.css'

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

  return (
    <div className="page-shell">
      <header className="topbar">
        <a className="brand" href="#hero">
          <span className="brand-mark">V</span>
          <span className="brand-name">Verex</span>
        </a>
        <nav className="nav">
          <a href="#scope">Scope</a>
          <a href="#questions">Questions</a>
          <a href="#outcomes">Outcomes</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main>
        <section className="hero-section" id="hero">
          <div className="hero-copy">
            <p className="eyebrow">Independent research on private healthcare clinic operations</p>
            <h1>
              <span className="hero-accent">Verex</span> is studying how private clinics
              in Ontario actually operate.
            </h1>
            <p className="hero-text">
              Over a three to four month period, the initiative is expected to speak with
              200 to 500 clinics across Toronto and the GTA through brief, respectful
              conversations focused on revenue drivers, operational challenges, and
              recurring inefficiencies.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#contact">
                Indicate availability
              </a>
              <a className="button button-secondary" href="#questions">
                Review the research questions
              </a>
            </div>
            <ul className="hero-points">
              <li>Ontario focus, centered on Toronto and the GTA</li>
              <li>200 to 500 clinics</li>
              <li>30 to 60 second conversations</li>
            </ul>
          </div>

          <aside className="hero-panel">
            <p className="panel-label">Operational issue intake</p>
            <h2>Share a recurring clinic challenge.</h2>
            <p className="hero-panel-text">
              If your clinic is dealing with a persistent administrative or operational
              issue, you can provide a short summary here. Submissions help identify
              patterns across clinics and highlight areas that warrant deeper research.
            </p>
            <div className="stack-list hero-intake-list">
              <div>
                <strong>Examples of useful input</strong>
                <p>Scheduling friction, billing issues, staffing strain, follow-up gaps, intake delays, or manual workflows.</p>
              </div>
              <div>
                <strong>Time required</strong>
                <p>The form is designed to be brief and can be completed in under a minute.</p>
              </div>
            </div>
            <a className="button button-primary hero-panel-button" href="#contact">
              Start the form
            </a>
          </aside>
        </section>

        <section className="stats-strip" aria-label="Verex research summary" id="scope">
          <div>
            <strong>Ontario clinic sample</strong>
            <span>focused on private healthcare operators across Toronto and the GTA</span>
          </div>
          <div>
            <strong>Short-form outreach</strong>
            <span>built around concise conversations intended to gather operational insight</span>
          </div>
          <div>
            <strong>Pattern-based analysis</strong>
            <span>designed to compare recurring operational issues across many clinics</span>
          </div>
        </section>

        <section className="content-section" id="vision">
          <div className="section-heading">
            <p className="eyebrow">Research focus</p>
            <h2>What the outreach is intended to uncover across clinics.</h2>
          </div>

          <div className="feature-grid">
            {focusAreas.map((item) => (
              <article className="feature-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section" id="questions">
          <div className="section-heading">
            <p className="eyebrow">Core questions</p>
            <h2>Each interaction is anchored by two concise questions.</h2>
          </div>

          <div className="roadmap-grid question-grid">
            {coreQuestions.map((question, index) => (
              <article className="roadmap-card question-card" key={question}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <p>{question}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section">
          <div className="section-heading">
            <p className="eyebrow">Additional signals</p>
            <h2>In addition to the primary questions, the research captures supporting context.</h2>
          </div>

          <div className="signal-card">
            <ul className="signal-list">
              {researchSignals.map((signal) => (
                <li key={signal}>{signal}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="cta-banner">
          <p>
            The objective is to collect structured operational insight, identify recurring
            sources of friction, and determine which problem areas merit deeper analysis.
          </p>
        </section>

        <section className="roadmap-section" id="outcomes">
          <div className="contact-copy">
            <p className="eyebrow">Expected outcome</p>
            <h2>What this initiative is designed to produce if the patterns are consistent.</h2>
            <p>
              The research is intended to produce a structured view of how clinics
              generate revenue, where efficiency is lost, and which operational issues
              recur frequently enough to justify focused attention.
            </p>
            <div className="integration-note">
              <strong>Research output</strong>
              <p>
                The resulting analysis is intended to highlight the most common revenue
                drivers, administrative bottlenecks, and operational issues affecting
                private clinics across the target market.
              </p>
            </div>
          </div>

          <div className="roadmap-grid outcome-grid">
            {outcomes.map((outcome, index) => (
              <article className="roadmap-card" key={outcome.title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{outcome.title}</h3>
                <p>{outcome.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-copy">
            <p className="eyebrow">Participation</p>
            <h2>Clinic operators and staff may share their contact details here if they are open to participating.</h2>
            <p>
              This is an optional way for clinic owners, office managers, administrators,
              and staff to indicate that they may be open to a brief conversation about
              operational challenges within their clinic.
            </p>
            <div className="integration-note">
              <strong>Submission note</strong>
              <p>
                The form below is intended to collect initial contact details and brief
                context ahead of outreach.
              </p>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <label>
              Name
              <input
                type="text"
                name="name"
                placeholder="Full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Email
              <input
                type="email"
                name="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Clinic
              <input
                type="text"
                name="clinic"
                placeholder="Clinic or practice name"
                value={formData.clinic}
                onChange={handleChange}
              />
            </label>

            <label>
              Role
              <input
                type="text"
                name="role"
                placeholder="Owner, manager, administrator, clinician"
                value={formData.role}
                onChange={handleChange}
              />
            </label>

            <label>
              Additional context
              <textarea
                name="note"
                rows="5"
                placeholder="Preferred timing, clinic type, or any context that may be useful before outreach"
                value={formData.note}
                onChange={handleChange}
              />
            </label>

            <button className="button button-primary form-submit" type="submit">
              Submit details
            </button>

            <p className={`form-status ${submitted ? 'is-visible' : ''}`} aria-live="polite">
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
