import { useState } from 'react'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    goal: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const highlights = [
    {
      title: 'Form-first infrastructure',
      description:
        'Start with a sharp landing page today, then grow into a reliable submission flow without rebuilding the front end.',
    },
    {
      title: 'Supabase-ready workflow',
      description:
        'The form area is structured for a future Supabase table, auth rules, and automated follow-ups when you are ready.',
    },
    {
      title: 'Built to convert',
      description:
        'Every section is designed to explain the value quickly, build trust, and push visitors toward a clear next action.',
    },
  ]

  const steps = [
    'Visitors discover Verex and understand the value in seconds.',
    'They submit an interest or intake form through a focused CTA section.',
    'Supabase can later store, validate, and route those entries into your backend workflows.',
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
          Verex
        </a>
        <nav className="nav">
          <a href="#vision">Vision</a>
          <a href="#roadmap">Roadmap</a>
          <a href="#waitlist">Waitlist</a>
        </nav>
      </header>

      <main>
        <section className="hero-section" id="hero">
          <div className="hero-copy">
            <p className="eyebrow">React landing page with a Supabase-ready future</p>
            <h1>Verex turns interest into structured, scalable form workflows.</h1>
            <p className="hero-text">
              Launch the brand now with a modern landing page, then evolve it into a
              clean backend submission system powered by Supabase when you are ready.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#waitlist">
                Join the waitlist
              </a>
              <a className="button button-secondary" href="#roadmap">
                See the roadmap
              </a>
            </div>
            <ul className="hero-points">
              <li>Fast React front end</li>
              <li>Flexible form intake UX</li>
              <li>Future backend workflow support</li>
            </ul>
          </div>

          <aside className="hero-panel">
            <p className="panel-label">Planned stack</p>
            <h2>Built for the next phase, not just the launch.</h2>
            <div className="stack-list">
              <div>
                <span>01</span>
                <strong>React landing page</strong>
                <p>Clear product story, strong CTA, and responsive layout.</p>
              </div>
              <div>
                <span>02</span>
                <strong>Supabase submissions</strong>
                <p>Persist leads, intake forms, or onboarding requests in one place.</p>
              </div>
              <div>
                <span>03</span>
                <strong>Automated follow-up</strong>
                <p>Route data into email, dashboards, or internal review flows.</p>
              </div>
            </div>
          </aside>
        </section>

        <section className="stats-strip" aria-label="Verex value points">
          <div>
            <strong>1 landing page</strong>
            <span>to define the brand and collect demand</span>
          </div>
          <div>
            <strong>1 future backend</strong>
            <span>for structured Supabase-powered form handling</span>
          </div>
          <div>
            <strong>End-to-end clarity</strong>
            <span>from first click to stored submission</span>
          </div>
        </section>

        <section className="content-section" id="vision">
          <div className="section-heading">
            <p className="eyebrow">Why Verex</p>
            <h2>Designed to launch quickly and grow into a real product system.</h2>
          </div>

          <div className="feature-grid">
            {highlights.map((item) => (
              <article className="feature-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="roadmap-section" id="roadmap">
          <div className="section-heading">
            <p className="eyebrow">Roadmap</p>
            <h2>How the landing page can evolve into your backend form system.</h2>
          </div>

          <div className="roadmap-grid">
            {steps.map((step, index) => (
              <article className="roadmap-card" key={step}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <p>{step}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="cta-banner">
          <p>Verex is positioned to start simple now and scale into a real submission pipeline later.</p>
        </section>

        <section className="contact-section" id="waitlist">
          <div className="contact-copy">
            <p className="eyebrow">Early access</p>
            <h2>Collect interest today. Connect storage and automation next.</h2>
            <p>
              This form currently works as a front-end experience and is ready to be
              connected to Supabase in the next iteration for persistence, validation,
              and backend workflows.
            </p>
            <div className="integration-note">
              <strong>Future Supabase path</strong>
              <p>
                Add a table for submissions, connect the form action, and secure access
                with row-level policies when you are ready for live data.
              </p>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <label>
              Name
              <input
                type="text"
                name="name"
                placeholder="Your name"
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
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Company
              <input
                type="text"
                name="company"
                placeholder="Your company or project"
                value={formData.company}
                onChange={handleChange}
              />
            </label>

            <label>
              What do you want Verex to help with?
              <textarea
                name="goal"
                rows="5"
                placeholder="Lead capture, onboarding forms, requests, internal workflows..."
                value={formData.goal}
                onChange={handleChange}
              />
            </label>

            <button className="button button-primary form-submit" type="submit">
              Submit interest
            </button>

            <p className={`form-status ${submitted ? 'is-visible' : ''}`} aria-live="polite">
              {submitted
                ? 'Thanks. This demo form is ready for a future Supabase connection.'
                : 'No backend is connected yet. This is the front-end experience for now.'}
            </p>
          </form>
        </section>
      </main>
    </div>
  )
}

export default App
