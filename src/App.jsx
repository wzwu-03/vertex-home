import { useState, useEffect } from 'react'

/* ─── Validation (unchanged) ──────────────────────────────────── */
const LIMITS = {
  fullName:        { min: 2, max: 120 },
  role:            { max: 100 },
  companyName:     { max: 200 },
  painPoint:       { min: 20, max: 5000 },
  currentSolution: { min: 10, max: 5000 },
  location:        { max: 200 },
  additionalNotes: { max: 5000 },
}

function validateEmail(value) {
  const t = value.trim()
  if (!t) return 'Email is required.'
  if (t.length > 254) return 'Email must be 254 characters or fewer.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(t)) return 'Please enter a valid email address.'
  return ''
}

function validateOptionalPhone(value) {
  const t = value.trim()
  if (!t) return ''
  const d = t.replace(/\D/g, '')
  if (d.length < 10) return 'Enter at least 10 digits for your phone number.'
  if (d.length > 15) return 'Phone number is too long.'
  return ''
}

/* ─── Design tokens ────────────────────────────────────────────── */
const card        = 'rounded-2xl border border-[var(--border)] bg-[var(--surface)] border-glow'
const cardLifted  = 'rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-2)] border-glow'
const primaryBtn  = 'inline-flex h-11 shrink-0 items-center justify-center rounded-xl bg-[var(--accent)] px-6 text-[0.85rem] font-semibold text-white transition-all duration-200 hover:bg-[var(--accent-hover)] hover:-translate-y-px active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50'
const ghostBtn    = 'inline-flex h-11 shrink-0 items-center justify-center rounded-xl border border-[var(--border)] bg-transparent px-6 text-[0.85rem] font-semibold text-[var(--text-secondary)] transition-all duration-200 hover:border-[var(--accent)] hover:text-[var(--text-primary)] disabled:cursor-not-allowed disabled:opacity-50'
const eyebrow     = 'mb-3 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-[var(--text-muted)]'
const inputBase   = 'w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-[0.875rem] text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] sm:py-3.5'
const inputError  = 'border-rose-500 focus:border-rose-500'
const labelCls    = 'grid gap-1.5 text-[0.82rem] font-medium text-[var(--text-primary)]'
const helperCls   = 'text-xs text-[var(--text-secondary)]'
const errCls      = 'text-xs font-medium leading-snug text-rose-400'
const errSlotCls  = 'min-h-[1.6rem]'
const selectBase  = `${inputBase} appearance-none`
const textareaBase = `${inputBase} min-h-[130px] resize-y`

/* ─── App ──────────────────────────────────────────────────────── */
function App() {
  const STEP_FIELDS = {
    1: ['fullName', 'email', 'phone', 'companyName', 'industry', 'role'],
    2: ['customerType', 'businessSize', 'painPoint', 'currentSolution', 'frequency'],
    3: ['preferredFollowUp', 'location', 'additionalNotes', 'consent'],
  }

  const [submitted,      setSubmitted]      = useState(false)
  const [currentStep,    setCurrentStep]    = useState(1)
  const [touched,        setTouched]        = useState({})
  const [attemptedSteps, setAttemptedSteps] = useState({})
  const [scrolled,       setScrolled]       = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 56)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '', companyName: '', industry: '', role: '',
    customerType: '', businessSize: '', painPoint: '', currentSolution: '', frequency: '',
    budgetExpectation: '', timeline: '', preferredFollowUp: '', location: '',
    additionalNotes: '', consent: false,
  })

  /* ── Content data ────────────────────────────────────────────── */
  const researchAreas = [
    {
      number: '01',
      title: 'Revenue Operations',
      description: 'Understanding what drives clinic revenue — service mix, patient volumes, billing cycles, and the income patterns that vary across practice types.',
    },
    {
      number: '02',
      title: 'Operational Efficiency',
      description: 'Identifying where clinics consistently lose time and capacity through fragmented workflows, scheduling gaps, or administrative bottlenecks.',
    },
    {
      number: '03',
      title: 'Staffing and Capacity',
      description: 'Examining how clinical and administrative staffing decisions affect throughput, team strain, costs, and the ability to deliver consistent care.',
    },
    {
      number: '04',
      title: 'Technology Adoption',
      description: 'Assessing how clinics evaluate, adopt, or avoid operational tools — and what keeps many practices reliant on manual alternatives.',
    },
  ]

  const processSteps = [
    {
      step: '01',
      title: 'Brief outreach',
      description: 'We contact clinic operators for a short, respectful conversation. No sales pitch, no lengthy survey — designed to take under two minutes.',
    },
    {
      step: '02',
      title: 'Structured inquiry',
      description: 'Two core questions anchor each conversation, supported by a focused set of signals that help us categorize and compare responses across clinic types.',
    },
    {
      step: '03',
      title: 'Pattern synthesis',
      description: 'Responses are analyzed across clinic types, sizes, and locations to surface operational issues that recur with meaningful frequency.',
    },
    {
      step: '04',
      title: 'Research output',
      description: 'Findings are synthesized into a structured dataset identifying the most common revenue drivers, bottlenecks, and problem areas across the target market.',
    },
  ]

  const focusAreas = [
    {
      title: 'Revenue drivers',
      description: 'Identify the primary sources of revenue across private clinics, including service mix, patient demand, and recurring business patterns.',
    },
    {
      title: 'Operational friction',
      description: 'Document the operational and administrative issues that most consistently create strain for clinic teams.',
    },
    {
      title: 'Manual inefficiencies',
      description: 'Assess where clinics are losing time, margin, or efficiency because key processes remain manual, fragmented, or difficult to manage.',
    },
  ]

  const testimonials = [
    {
      quote: 'We run three chairs and billing reconciliation alone costs us half a day every week. I described the problem in about a minute — they already understood the context and asked exactly the right follow-up.',
      author: 'D. Marchetti',
      role: 'Dental Practice Owner',
      location: 'Richmond Hill, ON',
      initials: 'DM',
    },
    {
      quote: "Most of the friction we deal with is invisible until it compounds — no-shows feeding into rebooking gaps feeding into revenue gaps. Nobody had asked about it without trying to sell me scheduling software afterward.",
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

  const steps = [
    { id: 1, label: 'Profile' },
    { id: 2, label: 'Context' },
    { id: 3, label: 'Preferences' },
  ]

  const industryOptions     = ['Family practice','Dental clinic','Physiotherapy clinic','Walk-in clinic','Chiropractic clinic','Dermatology clinic','Mental health clinic','Specialist practice','Other']
  const customerTypeOptions = ['Clinic owner','Office manager','Administrator','Clinician','Operations lead','Other']
  const businessSizeOptions = ['Solo practice','2-5 staff','6-15 staff','16-50 staff','50+ staff']
  const frequencyOptions    = ['Daily','Several times a week','Weekly','A few times a month','Occasionally']
  const followUpOptions     = ['Email','Phone call','Text message','No preference']

  /* ── Form handlers (unchanged logic) ────────────────────────── */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(c => ({ ...c, [name]: type === 'checkbox' ? checked : value }))
  }
  const handleBlur = (e) => {
    setTouched(c => ({ ...c, [e.target.name]: true }))
  }
  const getStepErrors = (step) => {
    const errors = {}
    if (step === 1) {
      const name = formData.fullName.trim()
      if (!name) errors.fullName = 'Full name is required.'
      else if (name.length < LIMITS.fullName.min) errors.fullName = `Use at least ${LIMITS.fullName.min} characters.`
      else if (name.length > LIMITS.fullName.max) errors.fullName = `Keep your name under ${LIMITS.fullName.max} characters.`
      const emailErr = validateEmail(formData.email)
      if (emailErr) errors.email = emailErr
      const phoneErr = validateOptionalPhone(formData.phone)
      if (phoneErr) errors.phone = phoneErr
      if (formData.companyName.trim().length > LIMITS.companyName.max)
        errors.companyName = `Company name must be ${LIMITS.companyName.max} characters or fewer.`
      if (!formData.industry.trim()) errors.industry = 'Please select an industry.'
      const role = formData.role.trim()
      if (!role) errors.role = 'Role or job title is required.'
      else if (role.length > LIMITS.role.max) errors.role = `Role must be ${LIMITS.role.max} characters or fewer.`
    }
    if (step === 2) {
      if (!formData.customerType.trim()) errors.customerType = 'Please select a customer type.'
      if (!formData.businessSize.trim()) errors.businessSize = 'Please select a business size.'
      const pain = formData.painPoint.trim()
      if (!pain) errors.painPoint = 'Please describe the main problem or pain point.'
      else if (pain.length < LIMITS.painPoint.min) errors.painPoint = `Add a bit more detail (at least ${LIMITS.painPoint.min} characters).`
      else if (pain.length > LIMITS.painPoint.max) errors.painPoint = `Keep this under ${LIMITS.painPoint.max} characters.`
      const sol = formData.currentSolution.trim()
      if (!sol) errors.currentSolution = 'Please describe your current solution or workflow.'
      else if (sol.length < LIMITS.currentSolution.min) errors.currentSolution = `Add more detail (at least ${LIMITS.currentSolution.min} characters).`
      else if (sol.length > LIMITS.currentSolution.max) errors.currentSolution = `Keep this under ${LIMITS.currentSolution.max} characters.`
      if (!formData.frequency.trim()) errors.frequency = 'Please select how often you experience the problem.'
    }
    if (step === 3) {
      if (!formData.preferredFollowUp.trim()) errors.preferredFollowUp = 'Please select a follow-up channel.'
      if (formData.location.trim().length > LIMITS.location.max)
        errors.location = `Location must be ${LIMITS.location.max} characters or fewer.`
      if (formData.additionalNotes.trim().length > LIMITS.additionalNotes.max)
        errors.additionalNotes = `Notes must be ${LIMITS.additionalNotes.max} characters or fewer.`
      if (!formData.consent) errors.consent = 'Please confirm you consent to be contacted for follow-up.'
    }
    return errors
  }
  const currentErrors        = getStepErrors(currentStep)
  const shouldShowFieldError = (field) => Boolean(currentErrors[field] && (touched[field] || attemptedSteps[currentStep]))
  const clearStepTouched     = (step) => setTouched(c => { const n = {...c}; for (const k of STEP_FIELDS[step] ?? []) delete n[k]; return n })
  const clearStepAttempted   = (step) => setAttemptedSteps(c => { const n = {...c}; delete n[step]; return n })
  const markFieldsTouched    = (fields) => setTouched(c => { const n = {...c}; for (const f of fields) n[f] = true; return n })
  const fieldHintId          = (f) => `${f}-hint`
  const fieldErrorId         = (f) => `${f}-error`
  const describedBy          = (f, hintId) => { const ids = []; if (shouldShowFieldError(f)) ids.push(fieldErrorId(f)); if (hintId) ids.push(hintId); return ids.length > 0 ? ids.join(' ') : undefined }
  const goNext = () => {
    const errors = getStepErrors(currentStep)
    if (Object.keys(errors).length > 0) { setAttemptedSteps(c => ({...c, [currentStep]: true})); markFieldsTouched(Object.keys(errors)); return }
    const next = Math.min(currentStep + 1, 3); clearStepTouched(next); clearStepAttempted(next); setCurrentStep(next)
  }
  const goBack = () => { const prev = Math.max(currentStep - 1, 1); clearStepTouched(prev); clearStepAttempted(prev); setCurrentStep(prev) }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (currentStep < 3) { goNext(); return }
    for (const s of [1, 2, 3]) {
      const errs = getStepErrors(s)
      if (Object.keys(errs).length > 0) { clearStepTouched(s); setCurrentStep(s); setAttemptedSteps(c => ({...c, [s]: true})); markFieldsTouched(Object.keys(errs)); return }
    }
    setSubmitted(true)
  }
  const getFieldCls      = (field, base = inputBase) => shouldShowFieldError(field) ? `${base} ${inputError}` : base
  const renderFieldError = (field) => {
    const msg = currentErrors[field]; const show = Boolean(msg && shouldShowFieldError(field))
    return (
      <div className={errSlotCls}>
        {show ? <span className={errCls} id={fieldErrorId(field)} role="alert">{msg}</span> : null}
      </div>
    )
  }

  /* ── Step indicator ─────────────────────────────────────────── */
  const renderStepIndicator = () => (
    <div className="mb-7 flex items-stretch gap-0">
      {steps.map((step, i) => {
        const isActive   = currentStep === step.id
        const isComplete = currentStep > step.id
        const active     = isActive || isComplete
        return (
          <div key={step.id} className="flex min-w-0 flex-1 items-center">
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <div className="flex items-center gap-2.5">
                <div className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-[0.65rem] font-bold transition-all duration-300 ${active ? 'bg-[var(--accent)] text-white' : 'border border-[var(--border)] text-[var(--text-muted)]'}`}>
                  {isComplete ? (
                    <svg width="9" height="7" viewBox="0 0 9 7" fill="none"><path d="M1 3.5L3 5.5L8 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  ) : step.id}
                </div>
                <span className={`text-[0.75rem] font-medium transition-colors duration-200 ${active ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]'}`}>{step.label}</span>
              </div>
              <div className={`h-px transition-all duration-500 ${active ? 'bg-[var(--accent)]' : 'bg-[var(--border)]'}`} />
            </div>
            {i < steps.length - 1 && <div className="mx-3 h-px w-3 shrink-0 bg-[var(--border)]" />}
          </div>
        )
      })}
    </div>
  )

  /* ── Form steps ─────────────────────────────────────────────── */
  const renderStep1 = () => (
    <div className="grid gap-4 sm:gap-5">
      <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
        <label className={labelCls}>
          <span>Full name <span className="text-rose-400">*</span></span>
          <input id="field-fullName" aria-invalid={shouldShowFieldError('fullName')} aria-describedby={describedBy('fullName')} className={getFieldCls('fullName')} type="text" name="fullName" placeholder="Enter your full name" autoComplete="name" value={formData.fullName} onChange={handleChange} onBlur={handleBlur} />
          {renderFieldError('fullName')}
        </label>
        <label className={labelCls}>
          <span>Email <span className="text-rose-400">*</span></span>
          <input id="field-email" aria-invalid={shouldShowFieldError('email')} aria-describedby={describedBy('email')} className={getFieldCls('email')} type="email" name="email" placeholder="you@company.com" autoComplete="email" value={formData.email} onChange={handleChange} onBlur={handleBlur} />
          {renderFieldError('email')}
        </label>
        <label className={labelCls}>
          <span>Phone <span className="text-[var(--text-muted)] font-normal">(optional)</span></span>
          <input id="field-phone" aria-invalid={shouldShowFieldError('phone')} aria-describedby={describedBy('phone')} className={getFieldCls('phone')} type="tel" name="phone" placeholder="+1 555 123 4567" autoComplete="tel" value={formData.phone} onChange={handleChange} onBlur={handleBlur} />
          {renderFieldError('phone')}
        </label>
        <label className={labelCls}>
          <span>Company <span className="text-[var(--text-muted)] font-normal">(optional)</span></span>
          <input id="field-companyName" aria-invalid={shouldShowFieldError('companyName')} aria-describedby={describedBy('companyName')} className={getFieldCls('companyName')} type="text" name="companyName" placeholder="Clinic or organization" autoComplete="organization" value={formData.companyName} onChange={handleChange} onBlur={handleBlur} />
          {renderFieldError('companyName')}
        </label>
        <label className={labelCls}>
          <span>Industry <span className="text-rose-400">*</span></span>
          <select id="field-industry" aria-invalid={shouldShowFieldError('industry')} aria-describedby={describedBy('industry')} className={getFieldCls('industry', selectBase)} name="industry" value={formData.industry} onChange={handleChange} onBlur={handleBlur}>
            <option value="">Select an option</option>
            {industryOptions.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
          {renderFieldError('industry')}
        </label>
        <label className={labelCls}>
          <span>Role / job title <span className="text-rose-400">*</span></span>
          <input id="field-role" aria-invalid={shouldShowFieldError('role')} aria-describedby={describedBy('role')} className={getFieldCls('role')} type="text" name="role" placeholder="Founder, Manager, Clinician…" autoComplete="organization-title" value={formData.role} onChange={handleChange} onBlur={handleBlur} />
          {renderFieldError('role')}
        </label>
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="grid gap-4 sm:gap-5">
      <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
        <label className={labelCls}>
          <span>Customer type <span className="text-rose-400">*</span></span>
          <select id="field-customerType" aria-invalid={shouldShowFieldError('customerType')} aria-describedby={describedBy('customerType')} className={getFieldCls('customerType', selectBase)} name="customerType" value={formData.customerType} onChange={handleChange} onBlur={handleBlur}>
            <option value="">Select an option</option>
            {customerTypeOptions.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
          {renderFieldError('customerType')}
        </label>
        <label className={labelCls}>
          <span>Practice size <span className="text-rose-400">*</span></span>
          <select id="field-businessSize" aria-invalid={shouldShowFieldError('businessSize')} aria-describedby={describedBy('businessSize')} className={getFieldCls('businessSize', selectBase)} name="businessSize" value={formData.businessSize} onChange={handleChange} onBlur={handleBlur}>
            <option value="">Select an option</option>
            {businessSizeOptions.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
          {renderFieldError('businessSize')}
        </label>
      </div>
      <label className={labelCls}>
        <span>Main problem or pain point <span className="text-rose-400">*</span></span>
        <textarea id="field-painPoint" aria-invalid={shouldShowFieldError('painPoint')} aria-describedby={describedBy('painPoint', fieldHintId('painPoint'))} className={getFieldCls('painPoint', textareaBase)} name="painPoint" placeholder="Describe the biggest issue you are trying to solve." value={formData.painPoint} onChange={handleChange} onBlur={handleBlur} />
        {renderFieldError('painPoint')}
        <span className={helperCls} id={fieldHintId('painPoint')}>The more specific, the more useful for our research.</span>
      </label>
      <label className={labelCls}>
        <span>Current solution you use <span className="text-rose-400">*</span></span>
        <textarea id="field-currentSolution" aria-invalid={shouldShowFieldError('currentSolution')} aria-describedby={describedBy('currentSolution')} className={getFieldCls('currentSolution', textareaBase)} name="currentSolution" placeholder="Spreadsheets, internal process, software tools, manual work…" value={formData.currentSolution} onChange={handleChange} onBlur={handleBlur} />
        {renderFieldError('currentSolution')}
      </label>
      <label className={labelCls}>
        <span>How often do you experience this? <span className="text-rose-400">*</span></span>
        <select id="field-frequency" aria-invalid={shouldShowFieldError('frequency')} aria-describedby={describedBy('frequency')} className={getFieldCls('frequency', `${selectBase} max-w-full sm:max-w-[380px]`)} name="frequency" value={formData.frequency} onChange={handleChange} onBlur={handleBlur}>
          <option value="">Select an option</option>
          {frequencyOptions.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
        {renderFieldError('frequency')}
      </label>
    </div>
  )

  const renderStep3 = () => (
    <div className="grid gap-4 sm:gap-5">
      <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
        <label className={labelCls}>
          <span>Preferred follow-up channel <span className="text-rose-400">*</span></span>
          <select id="field-preferredFollowUp" aria-invalid={shouldShowFieldError('preferredFollowUp')} aria-describedby={describedBy('preferredFollowUp')} className={getFieldCls('preferredFollowUp', selectBase)} name="preferredFollowUp" value={formData.preferredFollowUp} onChange={handleChange} onBlur={handleBlur}>
            <option value="">Select an option</option>
            {followUpOptions.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
          {renderFieldError('preferredFollowUp')}
        </label>
        <label className={labelCls}>
          <span>Location <span className="text-[var(--text-muted)] font-normal">(optional)</span></span>
          <input id="field-location" aria-invalid={shouldShowFieldError('location')} aria-describedby={describedBy('location')} className={getFieldCls('location')} type="text" name="location" placeholder="City, region, or service area" autoComplete="address-level2" value={formData.location} onChange={handleChange} onBlur={handleBlur} />
          {renderFieldError('location')}
        </label>
      </div>
      <label className={labelCls}>
        <span>Additional notes <span className="text-[var(--text-muted)] font-normal">(optional)</span></span>
        <textarea id="field-additionalNotes" aria-invalid={shouldShowFieldError('additionalNotes')} aria-describedby={describedBy('additionalNotes')} className={getFieldCls('additionalNotes', textareaBase)} name="additionalNotes" placeholder="Anything else that would help us understand your workflow, constraints, or preferred timing." value={formData.additionalNotes} onChange={handleChange} onBlur={handleBlur} />
        {renderFieldError('additionalNotes')}
      </label>
      <div className="grid gap-1.5">
        <label className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 text-[var(--text-secondary)] transition-colors ${shouldShowFieldError('consent') ? 'border-rose-500' : 'border-[var(--border)] bg-[var(--surface)] hover:border-[var(--accent)]'}`}>
          <input id="field-consent" className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--accent)]" type="checkbox" name="consent" checked={formData.consent} aria-invalid={shouldShowFieldError('consent')} aria-describedby={describedBy('consent')} onChange={handleChange} onBlur={handleBlur} />
          <span className="text-[0.82rem] leading-6">I consent to being contacted for a brief follow-up conversation regarding this research intake.</span>
        </label>
        {renderFieldError('consent')}
      </div>
    </div>
  )

  const renderCurrentStep = () => {
    if (currentStep === 1) return renderStep1()
    if (currentStep === 2) return renderStep2()
    return renderStep3()
  }

  /* ─── Layout ────────────────────────────────────────────────── */
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>

      {/* ── Sticky nav ──────────────────────────────────────────── */}
      <header className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${scrolled ? 'nav-scrolled border-[var(--border)]' : 'border-transparent'}`}>
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-5 py-4 sm:px-8">
          <a href="#hero" className="no-underline" aria-label="Verex home">
            <span className="text-[0.95rem] font-bold tracking-[0.08em] text-[var(--text-primary)]">VEREX</span>
          </a>
          <nav className="flex items-center gap-0.5 text-[0.8rem] text-[var(--text-secondary)]">
            {[['#research','Research'],['#process','Process'],['#outcomes','Outcomes']].map(([href, label]) => (
              <a key={href} href={href} className="rounded-lg px-3 py-1.5 no-underline transition-colors hover:bg-[var(--surface)] hover:text-[var(--text-primary)]">{label}</a>
            ))}
            <a href="#contact" className={`${primaryBtn} ml-3 h-9 rounded-lg px-5 text-[0.8rem]`}>Participate</a>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-[1200px] px-5 sm:px-8">

        {/* ── Hero ─────────────────────────────────────────────── */}
        <section
          id="hero"
          className="relative grid min-h-[88vh] items-center gap-8 pb-16 pt-28 max-[960px]:grid-cols-1 lg:grid-cols-[minmax(0,1.3fr)_minmax(280px,0.7fr)] lg:gap-12"
        >
          {/* Subtle background grid */}
          <div className="hero-grid-bg pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />

          {/* Left: headline */}
          <div className="relative flex flex-col justify-center reveal">
            {/* Trust badges */}
            <div className="mb-6 flex flex-wrap gap-2">
              {[
                { label: 'Independent Research', icon: '◆' },
                { label: 'Ontario · Toronto & GTA', icon: '◆' },
                { label: 'Not affiliated with any vendor', icon: '◆' },
              ].map(({ label, icon }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-[0.72rem] font-medium text-[var(--text-secondary)]"
                  style={{ boxShadow: '0 0 7px var(--glow)' }}
                >
                  <span className="text-[0.5rem] text-[var(--warm)]" aria-hidden="true">{icon}</span>
                  {label}
                </span>
              ))}
            </div>

            <h1 className="mb-5 text-[clamp(2.6rem,6.5vw,4.6rem)] font-bold leading-[0.95] tracking-[-0.045em] text-[var(--text-primary)]">
              Studying how Ontario&apos;s private clinics{' '}
              <em className="not-italic text-[var(--accent)]">actually operate.</em>
            </h1>

            <p className="mb-8 max-w-[54ch] text-[1rem] leading-[1.78] text-[var(--text-secondary)]">
              An independent research initiative speaking with 200 to 500 private clinic operators
              across Toronto and the GTA — focused on revenue drivers, operational friction, and
              recurring inefficiencies.
            </p>

            <div className="mb-10 flex flex-wrap gap-3">
              <a className={primaryBtn + ' h-12 px-7 text-[0.875rem]'} href="#contact">Indicate availability</a>
              <a className={ghostBtn  + ' h-12 px-7 text-[0.875rem]'} href="#process">Review methodology</a>
            </div>

            {/* Metrics row */}
            <div className="flex flex-wrap gap-x-8 gap-y-3">
              {[
                { value: '200–500', label: 'Clinic conversations' },
                { value: '3–4 mo.', label: 'Research period' },
                { value: '< 2 min', label: 'Per conversation' },
              ].map(({ value, label }) => (
                <div key={label}>
                  <p className="text-[1.45rem] font-bold tracking-[-0.03em] text-[var(--text-primary)]">{value}</p>
                  <p className="text-[0.72rem] text-[var(--text-muted)]">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: intake card */}
          <aside
            className={`relative ${card} flex flex-col p-6 sm:p-7 reveal reveal-2`}
            style={{ background: `radial-gradient(ellipse at top left, var(--accent-dim), transparent 55%), var(--surface)` }}
          >
            <p className={eyebrow}>Operational issue intake</p>
            <h2 className="mb-3 text-[1.45rem] font-bold leading-[1.1] tracking-[-0.025em] text-[var(--text-primary)]">
              Share a recurring clinic challenge.
            </h2>
            <p className="mb-6 text-[0.875rem] leading-[1.7] text-[var(--text-secondary)]">
              If your clinic is dealing with a persistent administrative or operational issue, submit
              a short summary here. Your input helps identify patterns across clinics.
            </p>
            <div className="mb-6 grid gap-2.5">
              <div className={cardLifted + ' p-4'}>
                <p className="mb-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">Examples of useful input</p>
                <p className="text-[0.82rem] leading-[1.65] text-[var(--text-secondary)]">Scheduling friction, billing issues, staffing strain, follow-up gaps, intake delays, or manual workflows.</p>
              </div>
              <div className={cardLifted + ' flex items-center justify-between p-4'}>
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">Time required</p>
                <p className="text-[0.82rem] font-semibold text-[var(--warm)]">Under 1 minute</p>
              </div>
            </div>
            <a className={primaryBtn + ' w-full justify-center h-12'} href="#contact">Start the form</a>
          </aside>
        </section>

        {/* ── Credibility strip ────────────────────────────────── */}
        <section aria-label="Research scope" className="mb-20 reveal">
          <div className={`${card} grid divide-y divide-[var(--border)] sm:grid-cols-4 sm:divide-x sm:divide-y-0`}>
            {[
              { label: 'Geographic focus', value: 'Ontario — Toronto & GTA' },
              { label: 'Research method', value: 'Structured short-form outreach' },
              { label: 'Analysis approach', value: 'Pattern-based comparison' },
              { label: 'Output type',      value: 'Operational insight dataset' },
            ].map(({ label, value }) => (
              <div key={label} className="px-5 py-4">
                <p className="mb-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">{label}</p>
                <p className="text-[0.875rem] font-medium text-[var(--text-primary)]">{value}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="section-rule mb-20" />

        {/* ── Research areas ───────────────────────────────────── */}
        <section id="research" className="mb-20">
          <div className="mb-10 reveal">
            <p className={eyebrow}>Research areas</p>
            <h2 className="max-w-[22ch] text-[clamp(1.7rem,4vw,2.6rem)] font-bold leading-[1.05] tracking-[-0.04em] text-[var(--text-primary)]">
              Four operational dimensions we examine across every clinic.
            </h2>
          </div>

          <div className="grid gap-px bg-[var(--border)] overflow-hidden rounded-2xl sm:grid-cols-2 lg:grid-cols-4">
            {researchAreas.map((area, i) => (
              <article
                key={area.title}
                className="group flex flex-col justify-between bg-[var(--surface)] p-6 transition-colors duration-200 hover:bg-[var(--surface-2)] reveal"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div>
                  <p
                    className="mb-5 text-[2.2rem] font-bold leading-none tracking-[-0.04em] transition-colors duration-200 group-hover:text-[var(--accent)]"
                    style={{ color: 'var(--text-muted)' }}
                    aria-hidden="true"
                  >
                    {area.number}
                  </p>
                  <h3 className="mb-3 text-[1rem] font-semibold text-[var(--text-primary)]">{area.title}</h3>
                  <p className="text-[0.825rem] leading-[1.7] text-[var(--text-secondary)]">{area.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── Process ──────────────────────────────────────────── */}
        <section id="process" className="mb-20">
          <div className="mb-10 reveal">
            <p className={eyebrow}>Methodology</p>
            <h2 className="max-w-[26ch] text-[clamp(1.7rem,4vw,2.6rem)] font-bold leading-[1.05] tracking-[-0.04em] text-[var(--text-primary)]">
              A structured four-stage research process.
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((s, i) => (
              <div
                key={s.step}
                className={`${card} relative flex flex-col gap-4 p-5 sm:p-6 reveal`}
                style={{ animationDelay: `${i * 70}ms` }}
              >
                {/* Connector line on desktop */}
                {i < processSteps.length - 1 && (
                  <div
                    className="pointer-events-none absolute right-0 top-[1.85rem] hidden h-px w-4 translate-x-full bg-[var(--border)] lg:block"
                    aria-hidden="true"
                  />
                )}
                <div className="flex items-center justify-between">
                  <span className="text-[1.6rem] font-bold tracking-[-0.04em] text-[var(--warm)]">{s.step}</span>
                  <div className="h-px flex-1 bg-[var(--border)] ml-3" />
                </div>
                <div>
                  <h3 className="mb-2 text-[0.95rem] font-semibold text-[var(--text-primary)]">{s.title}</h3>
                  <p className="text-[0.82rem] leading-[1.7] text-[var(--text-secondary)]">{s.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="section-rule mb-20" />

        {/* ── Focus areas / Scope ───────────────────────────────── */}
        <section id="scope" className="mb-20">
          <div className="mb-10 reveal">
            <p className={eyebrow}>Research focus</p>
            <h2 className="max-w-[28ch] text-[clamp(1.7rem,4vw,2.6rem)] font-bold leading-[1.05] tracking-[-0.04em] text-[var(--text-primary)]">
              What the outreach is designed to uncover across clinics.
            </h2>
          </div>

          <div className="grid gap-4 sm:gap-5 md:grid-cols-3">
            {focusAreas.map((item, i) => (
              <article
                key={item.title}
                className={`${card} group p-6 sm:p-7 transition-colors duration-200 hover:border-[var(--accent)] reveal`}
                style={{ animationDelay: `${i * 70}ms` }}
              >
                <div className="mb-5 h-px w-8 bg-[var(--accent)] transition-all duration-300 group-hover:w-16" />
                <h3 className="mb-3 text-[1.05rem] font-semibold text-[var(--text-primary)]">{item.title}</h3>
                <p className="text-[0.85rem] leading-[1.7] text-[var(--text-secondary)]">{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ── Testimonials ─────────────────────────────────────── */}
        <section className="mb-20 reveal">
          <div className="mb-8">
            <p className={eyebrow}>From participants</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {testimonials.map((t, i) => (
              <blockquote
                key={i}
                className={`${cardLifted} flex flex-col gap-5 p-6 sm:p-7 reveal`}
                style={{ animationDelay: `${i * 80}ms` }}
              >
                {/* Opening mark */}
                <span className="text-[2rem] font-bold leading-none text-[var(--accent)] opacity-60" aria-hidden="true">&ldquo;</span>

                <p className="flex-1 text-[0.925rem] leading-[1.75] text-[var(--text-primary)]">
                  {t.quote}
                </p>

                <footer className="flex items-center gap-3 border-t border-[var(--border)] pt-5">
                  {/* Initials avatar */}
                  <div
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-[0.7rem] font-bold text-white"
                    style={{ background: 'var(--accent-subtle)', color: 'var(--accent)' }}
                    aria-hidden="true"
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-[0.8rem] font-semibold text-[var(--text-primary)]">{t.author}</p>
                    <p className="text-[0.72rem] text-[var(--text-muted)]">{t.role} · {t.location}</p>
                  </div>
                </footer>
              </blockquote>
            ))}
          </div>
        </section>

        <div className="section-rule mb-20" />

        {/* ── Core questions ───────────────────────────────────── */}
        <section id="questions" className="mb-20">
          <div className="mb-10 reveal">
            <p className={eyebrow}>Core questions</p>
            <h2 className="max-w-[30ch] text-[clamp(1.7rem,4vw,2.6rem)] font-bold leading-[1.05] tracking-[-0.04em] text-[var(--text-primary)]">
              Each interaction is anchored by two concise questions.
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {coreQuestions.map((q, i) => (
              <article
                key={q}
                className={`${card} group flex flex-col gap-5 p-6 sm:p-8 transition-colors duration-200 hover:border-[var(--accent)] reveal`}
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <span className="text-[0.65rem] font-bold tracking-[0.22em] uppercase text-[var(--text-muted)]">
                  Question {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-[1.2rem] font-semibold leading-[1.4] tracking-[-0.015em] text-[var(--text-primary)]">
                  &ldquo;{q}&rdquo;
                </p>
              </article>
            ))}
          </div>

          {/* Supporting signals */}
          <div className="mt-6 reveal">
            <div className={`${card} p-6`}>
              <p className="mb-5 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">Additional context captured</p>
              <div className="grid gap-px bg-[var(--border)] overflow-hidden rounded-xl sm:grid-cols-2">
                {researchSignals.map((sig, i) => (
                  <div key={sig} className="flex items-start gap-3 bg-[var(--surface)] px-5 py-3.5">
                    <span className="mt-0.5 text-[0.6rem] font-bold tracking-[0.15em] text-[var(--text-muted)]" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                    <p className="text-[0.85rem] leading-[1.6] text-[var(--text-secondary)]">{sig}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Outcomes ─────────────────────────────────────────── */}
        <section
          id="outcomes"
          className="mb-20 grid gap-10 max-[960px]:grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]"
        >
          <div className="flex flex-col justify-center reveal">
            <p className={eyebrow}>Expected outcome</p>
            <h2 className="mb-5 text-[clamp(1.7rem,4vw,2.6rem)] font-bold leading-[1.05] tracking-[-0.04em] text-[var(--text-primary)]">
              What this initiative is designed to produce.
            </h2>
            <p className="mb-6 max-w-[52ch] text-[0.95rem] leading-[1.78] text-[var(--text-secondary)]">
              The research is intended to produce a structured view of how clinics generate
              revenue, where efficiency is lost, and which operational issues recur frequently
              enough to justify focused attention.
            </p>

            {/* Callout */}
            <div
              className={`${card} p-5`}
              style={{ background: `linear-gradient(135deg, var(--accent-subtle), transparent 60%), var(--surface)` }}
            >
              <p className="mb-2 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">Research output</p>
              <p className="text-[0.875rem] leading-[1.7] text-[var(--text-secondary)]">
                The resulting analysis highlights the most common revenue drivers,
                administrative bottlenecks, and operational issues affecting private
                clinics across the target market.
              </p>
            </div>
          </div>

          <div className="grid gap-3.5">
            {outcomes.map((outcome, i) => (
              <article
                key={outcome.title}
                className={`${card} flex gap-4 p-5 sm:p-6 transition-colors duration-200 hover:border-[var(--accent)] reveal`}
                style={{ animationDelay: `${i * 70}ms` }}
              >
                <span className="mt-0.5 shrink-0 text-[0.65rem] font-bold tracking-[0.2em] text-[var(--warm)]" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="mb-1.5 text-[0.95rem] font-semibold text-[var(--text-primary)]">{outcome.title}</h3>
                  <p className="text-[0.85rem] leading-[1.7] text-[var(--text-secondary)]">{outcome.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <div className="section-rule mb-20" />

        {/* ── Contact / Form ───────────────────────────────────── */}
        <section
          id="contact"
          className="mb-20 grid gap-10 max-[960px]:grid-cols-1 lg:grid-cols-[minmax(280px,0.6fr)_minmax(0,1.4fr)]"
        >
          {/* Left: context */}
          <div className="flex flex-col reveal">
            <p className={eyebrow}>Research intake</p>
            <h2 className="mb-4 text-[clamp(2rem,6vw,3.5rem)] font-bold leading-[0.96] tracking-[-0.045em] text-[var(--text-primary)]">
              Share your experience
            </h2>
            <p className="mb-8 text-[0.95rem] leading-[1.78] text-[var(--text-secondary)] max-[960px]:max-w-[56ch]">
              Help us understand your workflow, pain points, and decision criteria. The
              form is brief, structured, and designed to make your input actionable.
            </p>

            <div className={cardLifted + ' mb-6 p-5 sm:p-6'}>
              <p className="mb-4 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">What we ask</p>
              <ul className="grid gap-3 text-[0.875rem] leading-[1.65] text-[var(--text-secondary)]">
                {[
                  'Your professional context and customer type',
                  'The main problem you are facing and your current workaround',
                  'Frequency and preferred follow-up channel',
                ].map(item => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-[0.4em] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Assurance line */}
            <div className="flex items-start gap-3 rounded-xl border border-[var(--border-subtle)] p-4">
              <span className="text-[0.65rem] text-[var(--warm)] mt-0.5" aria-hidden="true">◆</span>
              <p className="text-[0.8rem] leading-[1.6] text-[var(--text-muted)]">
                This is independent research. No sales pitch. No spam.
                Your responses are used only to identify patterns across clinics.
              </p>
            </div>
          </div>

          {/* Right: form */}
          <form
            className={`${card} flex flex-col p-5 sm:p-7 lg:p-8 reveal reveal-2`}
            onSubmit={handleSubmit}
          >
            {renderStepIndicator()}
            <div className="min-h-[380px] flex-1 sm:min-h-[440px]">
              {renderCurrentStep()}
            </div>
            <div className="mt-6 border-t border-[var(--border)] pt-6">
              <div className="flex items-center justify-between gap-4 max-[540px]:flex-col max-[540px]:items-stretch">
                <p className="text-[0.75rem] text-[var(--text-muted)]">Step {currentStep} of 3</p>
                <div className="flex items-center gap-3 max-[540px]:flex-col max-[540px]:items-stretch">
                  {currentStep > 1 && (
                    <button className={ghostBtn} type="button" onClick={goBack}>Back</button>
                  )}
                  {currentStep < 3 ? (
                    <button className={primaryBtn} type="button" onClick={goNext}>Continue</button>
                  ) : (
                    <button className={primaryBtn} type="submit">Submit</button>
                  )}
                </div>
              </div>
              <p
                aria-live="polite"
                className={`mt-4 min-h-5 text-[0.78rem] transition-colors ${submitted ? 'text-emerald-400' : 'text-[var(--text-muted)]'}`}
              >
                {submitted
                  ? 'Thank you. Your details have been noted in this preview experience.'
                  : 'Complete each step to provide structured context for the research intake.'}
              </p>
            </div>
          </form>
        </section>
      </main>

      {/* ── Footer ──────────────────────────────────────────────── */}
      <footer className="border-t border-[var(--border)]">
        <div className="mx-auto max-w-[1200px] px-5 py-8 sm:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="mb-1 text-[0.8rem] font-bold tracking-[0.1em] text-[var(--text-primary)]">VEREX</p>
              <p className="text-[0.72rem] text-[var(--text-muted)]">Independent research initiative · Ontario, Canada</p>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-1 text-[0.72rem] text-[var(--text-muted)]">
              <span>Private healthcare clinic operations</span>
              <span className="text-[var(--border)]">·</span>
              <span>Toronto & GTA</span>
              <span className="text-[var(--border)]">·</span>
              <span>2024–2025</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
