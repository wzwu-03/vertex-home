import { useEffect, useMemo, useState } from 'react'

const LIMITS = {
  fullName: { min: 2, max: 120 },
  role: { max: 100 },
  companyName: { max: 200 },
  painPoint: { min: 20, max: 5000 },
  currentSolution: { min: 10, max: 5000 },
  location: { max: 200 },
  additionalNotes: { max: 5000 },
}

function validateEmail(value) {
  const trimmed = value.trim()
  if (!trimmed) return 'Email is required.'
  if (trimmed.length > 254) return 'Email must be 254 characters or fewer.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed)) {
    return 'Please enter a valid email address.'
  }
  return ''
}

function validateOptionalPhone(value) {
  const trimmed = value.trim()
  if (!trimmed) return ''
  const digits = trimmed.replace(/\D/g, '')
  if (digits.length < 10) {
    return 'Enter at least 10 digits for your phone number.'
  }
  if (digits.length > 15) {
    return 'Phone number is too long.'
  }
  return ''
}

function App() {
  const [submitted, setSubmitted] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [touched, setTouched] = useState({})
  const [attemptedStepAdvance, setAttemptedStepAdvance] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window === 'undefined') return false

    const savedTheme = window.localStorage.getItem('verex-theme')
    if (savedTheme) return savedTheme === 'dark'

    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })
/* const [attemptedSteps, setAttemptedSteps] = useState({}) */

  useEffect(() => {
    const theme = isDarkMode ? 'dark' : 'light'
    document.documentElement.setAttribute('data-theme', theme)
    window.localStorage.setItem('verex-theme', theme)
  }, [isDarkMode])

  const [formData, setFormData] = useState({
    // Step 1: Profile
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    industry: '',
    role: '',

    // Step 2: Context
    customerType: '',
    businessSize: '',
    painPoint: '',
    currentSolution: '',
    frequency: '',

    // Step 3: Preferences
    budgetExpectation: '',
    timeline: '',
    preferredFollowUp: '',
    location: '',
    additionalNotes: '',
    consent: false,
  })

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

  const steps = [
    { id: 1, label: 'Profile' },
    { id: 2, label: 'Context' },
    { id: 3, label: 'Preferences' },
  ]

  const industryOptions = [
    'Family practice',
    'Dental clinic',
    'Physiotherapy clinic',
    'Walk-in clinic',
    'Chiropractic clinic',
    'Dermatology clinic',
    'Mental health clinic',
    'Specialist practice',
    'Other',
  ]

  const customerTypeOptions = [
    'Clinic owner',
    'Office manager',
    'Administrator',
    'Clinician',
    'Operations lead',
    'Other',
  ]

  const businessSizeOptions = [
    'Solo practice',
    '2-5 staff',
    '6-15 staff',
    '16-50 staff',
    '50+ staff',
  ]

  const frequencyOptions = [
    'Daily',
    'Several times a week',
    'Weekly',
    'A few times a month',
    'Occasionally',
  ]

  const followUpOptions = [
    'Email',
    'Phone call',
    'Text message',
    'No preference',
  ]

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target

    setFormData((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleBlur = (event) => {
    const { name } = event.target

    setTouched((current) => ({
      ...current,
      [name]: true,
    }))
  }

  const getStepErrors = (step) => {
    const errors = {}

    if (step === 1) {
      const name = formData.fullName.trim()
      if (!name) {
        errors.fullName = 'Full name is required.'
      } else if (name.length < LIMITS.fullName.min) {
        errors.fullName = `Use at least ${LIMITS.fullName.min} characters.`
      } else if (name.length > LIMITS.fullName.max) {
        errors.fullName = `Keep your name under ${LIMITS.fullName.max} characters.`
      }

      const emailError = validateEmail(formData.email)
      if (emailError) errors.email = emailError

      const phoneError = validateOptionalPhone(formData.phone)
      if (phoneError) errors.phone = phoneError

      const company = formData.companyName.trim()
      if (company.length > LIMITS.companyName.max) {
        errors.companyName = `Company name must be ${LIMITS.companyName.max} characters or fewer.`
      }

      if (!formData.industry.trim()) {
        errors.industry = 'Please select an industry.'
      }

      const role = formData.role.trim()
      if (!role) {
        errors.role = 'Role or job title is required.'
      } else if (role.length > LIMITS.role.max) {
        errors.role = `Role must be ${LIMITS.role.max} characters or fewer.`
      }
    }

    if (step === 2) {
      if (!formData.customerType.trim()) {
        errors.customerType = 'Please select a customer type.'
      }
      if (!formData.businessSize.trim()) {
        errors.businessSize = 'Please select a business size.'
      }

      const pain = formData.painPoint.trim()
      if (!pain) {
        errors.painPoint = 'Please describe the main problem or pain point.'
      } else if (pain.length < LIMITS.painPoint.min) {
        errors.painPoint = `Add a bit more detail (at least ${LIMITS.painPoint.min} characters).`
      } else if (pain.length > LIMITS.painPoint.max) {
        errors.painPoint = `Keep this under ${LIMITS.painPoint.max} characters.`
      }

      const solution = formData.currentSolution.trim()
      if (!solution) {
        errors.currentSolution = 'Please describe your current solution or workflow.'
      } else if (solution.length < LIMITS.currentSolution.min) {
        errors.currentSolution = `Add more detail (at least ${LIMITS.currentSolution.min} characters).`
      } else if (solution.length > LIMITS.currentSolution.max) {
        errors.currentSolution = `Keep this under ${LIMITS.currentSolution.max} characters.`
      }

      if (!formData.frequency.trim()) {
        errors.frequency = 'Please select how often you experience the problem.'
      }
    }

    if (step === 3) {
      if (!formData.preferredFollowUp.trim()) {
        errors.preferredFollowUp = 'Please select a follow-up channel.'
      }

      const loc = formData.location.trim()
      if (loc.length > LIMITS.location.max) {
        errors.location = `Location must be ${LIMITS.location.max} characters or fewer.`
      }

      const notes = formData.additionalNotes.trim()
      if (notes.length > LIMITS.additionalNotes.max) {
        errors.additionalNotes = `Notes must be ${LIMITS.additionalNotes.max} characters or fewer.`
      }

      if (!formData.consent) {
        errors.consent = 'Please confirm you consent to be contacted for follow-up.'
      }
    }

    return errors
  }

  const currentErrors = useMemo(() => getStepErrors(currentStep), [formData, currentStep])

  const shouldShowFieldError = (field) => {
    return Boolean(currentErrors[field] && (touched[field] || attemptedStepAdvance))
  }

  const markFieldsTouched = (fields) => {
    setTouched((current) => {
      const next = { ...current }
      for (const key of fields) {
        next[key] = true
      }
      return next
    })
  }

  const fieldHintId = (field) => `${field}-hint`

  const fieldErrorId = (field) => `${field}-error`

  const describedBy = (field, hintId) => {
    const ids = []
    if (shouldShowFieldError(field)) ids.push(fieldErrorId(field))
    if (hintId) ids.push(hintId)
    return ids.length > 0 ? ids.join(' ') : undefined
  }

  const goNext = () => {
    const errors = getStepErrors(currentStep)

    if (Object.keys(errors).length > 0) {
      setAttemptedStepAdvance(true)
      markFieldsTouched(Object.keys(errors))
      return
    }

    setCurrentStep((step) => Math.min(step + 1, 3))
    setAttemptedStepAdvance(false)
  }

  const goBack = () => {
    setCurrentStep((step) => Math.max(step - 1, 1))
    setAttemptedStepAdvance(false)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const step1Errors = getStepErrors(1)
    const step2Errors = getStepErrors(2)
    const step3Errors = getStepErrors(3)

    if (Object.keys(step1Errors).length > 0) {
      setCurrentStep(1)
      setAttemptedStepAdvance(true)
      markFieldsTouched(Object.keys(step1Errors))
      return
    }

    if (Object.keys(step2Errors).length > 0) {
      setCurrentStep(2)
      setAttemptedStepAdvance(true)
      markFieldsTouched(Object.keys(step2Errors))
      return
    }

    if (Object.keys(step3Errors).length > 0) {
      setCurrentStep(3)
      setAttemptedStepAdvance(true)
      markFieldsTouched(Object.keys(step3Errors))
      return
    }

    setSubmitted(true)
  }

  const shellCard =
    'rounded-[28px] border border-[var(--color-surface)] bg-[var(--color-background)] shadow-[0_12px_30px_rgba(17,24,39,0.08)]'
  const mutedCard =
    'rounded-[20px] border border-[var(--color-surface)] bg-[var(--color-surface)]'
  const primaryButton =
    'inline-flex min-h-12 items-center justify-center rounded-[18px] bg-[var(--color-secondary)] px-6 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--color-accent)] disabled:cursor-not-allowed disabled:opacity-50'
  const secondaryButton =
    'inline-flex min-h-12 items-center justify-center rounded-[18px] border border-[var(--color-secondary)] bg-[var(--color-background)] px-6 text-sm font-semibold text-[var(--color-secondary)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--color-surface)]'
  const eyebrow =
    'mb-4 text-[0.8rem] uppercase tracking-[0.16em] text-[var(--color-accent)]'
  const sectionHeading =
    'mb-5 text-[clamp(1.8rem,2.7vw,2.5rem)] leading-[1.05] tracking-[-0.04em] text-[var(--color-primary)]'
  const gradientText =
    'inline-block text-[var(--color-secondary)]'
  const chip =
    'rounded-full border border-[var(--color-surface)] bg-[var(--color-surface)] px-[14px] py-[10px] text-sm text-[var(--color-text)]'
  const inputClass =
    'w-full rounded-2xl border border-[var(--color-surface)] bg-[var(--color-background)] px-4 py-3.5 text-[var(--color-text)] outline-none transition placeholder:text-[var(--color-text)] focus:border-[var(--color-accent)] focus:outline-none'
  const inputErrorClass = 'border-rose-500 focus:border-rose-500'
  const labelClass = 'grid gap-2 font-medium text-[var(--color-primary)]'
  const helperClass = 'text-sm text-[var(--color-text)]'
  const errorTextClass = 'text-sm font-medium leading-snug text-rose-500'
  /** Keeps layout stable when validation messages appear (avoids fields jumping). */
  const fieldErrorSlotClass = 'min-h-[2.75rem]'
  const selectClass = `${inputClass} appearance-none`
  const textareaClass = `${inputClass} min-h-[150px] resize-y`

  const getFieldClassName = (field, baseClass = inputClass) =>
    shouldShowFieldError(field) ? `${baseClass} ${inputErrorClass}` : baseClass

  const renderFieldError = (field) => {
    const message = currentErrors[field]
    const show = Boolean(message && shouldShowFieldError(field))
    return (
      <div className={fieldErrorSlotClass}>
        {show ? (
          <span className={errorTextClass} id={fieldErrorId(field)} role="alert">
            {message}
          </span>
        ) : null}
      </div>
    )
  }

  const renderStepIndicator = () => (
    <div className="mb-8 grid grid-cols-3 gap-4 max-[640px]:gap-2">
      {steps.map((step, index) => {
        const isActive = currentStep === step.id
        const isComplete = currentStep > step.id

        return (
          <div className="flex items-center gap-3" key={step.id}>
            <div
              className={`grid h-14 w-14 shrink-0 place-items-center rounded-full border text-xl font-semibold transition-all max-[640px]:h-11 max-[640px]:w-11 max-[640px]:text-base ${
                isActive || isComplete
                  ? 'border-[var(--color-secondary)] bg-[var(--color-secondary)] text-white'
                  : 'border-[var(--color-surface)] bg-transparent text-[var(--color-text)]'
              }`}
            >
              {step.id}
            </div>

            <div className="min-w-0 flex-1">
              <div
                className={`text-[1.05rem] font-medium ${
                  isActive || isComplete ? 'text-[var(--color-primary)]' : 'text-[var(--color-text)]'
                }`}
              >
                {step.label}
              </div>
            </div>

            {index < steps.length - 1 ? (
              <div className="hidden h-px flex-1 bg-[var(--color-surface)] lg:block" />
            ) : null}
          </div>
        )
      })}
    </div>
  )

  const renderStep1 = () => (
    <div className="grid gap-6">
      <div className="grid gap-6 md:grid-cols-2">
        <label className={labelClass}>
          <span>
            Full name <span className="text-rose-400">*</span>
          </span>
          <input
            id="field-fullName"
            aria-invalid={shouldShowFieldError('fullName')}
            aria-describedby={describedBy('fullName')}
            className={getFieldClassName('fullName')}
            type="text"
            name="fullName"
            placeholder="Enter your full name"
            autoComplete="name"
            value={formData.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {renderFieldError('fullName')}
        </label>

        <label className={labelClass}>
          <span>
            Email <span className="text-rose-400">*</span>
          </span>
          <input
            id="field-email"
            aria-invalid={shouldShowFieldError('email')}
            aria-describedby={describedBy('email')}
            className={getFieldClassName('email')}
            type="email"
            name="email"
            placeholder="you@company.com"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {renderFieldError('email')}
        </label>

        <label className={labelClass}>
          <span>
            Phone number <span className="text-[var(--color-text)]">(optional)</span>
          </span>
          <input
            id="field-phone"
            aria-invalid={shouldShowFieldError('phone')}
            aria-describedby={describedBy('phone')}
            className={getFieldClassName('phone')}
            type="tel"
            name="phone"
            placeholder="+1 555 123 4567"
            autoComplete="tel"
            value={formData.phone}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {renderFieldError('phone')}
        </label>

        <label className={labelClass}>
          <span>
            Company name <span className="text-[var(--color-text)]">(optional)</span>
          </span>
          <input
            id="field-companyName"
            aria-invalid={shouldShowFieldError('companyName')}
            aria-describedby={describedBy('companyName')}
            className={getFieldClassName('companyName')}
            type="text"
            name="companyName"
            placeholder="Company or organization"
            autoComplete="organization"
            value={formData.companyName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {renderFieldError('companyName')}
        </label>

        <label className={labelClass}>
          <span>
            Industry <span className="text-rose-400">*</span>
          </span>
          <select
            id="field-industry"
            aria-invalid={shouldShowFieldError('industry')}
            aria-describedby={describedBy('industry')}
            className={getFieldClassName('industry', selectClass)}
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <option value="">Select an option</option>
            {industryOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {renderFieldError('industry')}
        </label>

        <label className={labelClass}>
          <span>
            Role / job title <span className="text-rose-400">*</span>
          </span>
          <input
            id="field-role"
            aria-invalid={shouldShowFieldError('role')}
            aria-describedby={describedBy('role')}
            className={getFieldClassName('role')}
            type="text"
            name="role"
            placeholder="Product Manager, Founder, Analyst..."
            autoComplete="organization-title"
            value={formData.role}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {renderFieldError('role')}
        </label>
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="grid gap-6">
      <div className="grid gap-6 md:grid-cols-2">
        <label className={labelClass}>
          <span>
            Customer type <span className="text-rose-400">*</span>
          </span>
          <select
            id="field-customerType"
            aria-invalid={shouldShowFieldError('customerType')}
            aria-describedby={describedBy('customerType')}
            className={getFieldClassName('customerType', selectClass)}
            name="customerType"
            value={formData.customerType}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <option value="">Select an option</option>
            {customerTypeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {renderFieldError('customerType')}
        </label>

        <label className={labelClass}>
          <span>
            Age range or business size <span className="text-rose-400">*</span>
          </span>
          <select
            id="field-businessSize"
            aria-invalid={shouldShowFieldError('businessSize')}
            aria-describedby={describedBy('businessSize')}
            className={getFieldClassName('businessSize', selectClass)}
            name="businessSize"
            value={formData.businessSize}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <option value="">Select an option</option>
            {businessSizeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {renderFieldError('businessSize')}
        </label>
      </div>

      <label className={labelClass}>
        <span>
          Main problem or pain point <span className="text-rose-400">*</span>
        </span>
        <textarea
          id="field-painPoint"
          aria-invalid={shouldShowFieldError('painPoint')}
          aria-describedby={describedBy('painPoint', fieldHintId('painPoint'))}
          className={getFieldClassName('painPoint', textareaClass)}
          name="painPoint"
          placeholder="Describe the biggest issue you are trying to solve."
          value={formData.painPoint}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {renderFieldError('painPoint')}
        <span className={helperClass} id={fieldHintId('painPoint')}>
          The more specific, the more useful for our research.
        </span>
      </label>

      <label className={labelClass}>
        <span>
          Current solution you use <span className="text-rose-400">*</span>
        </span>
        <textarea
          id="field-currentSolution"
          aria-invalid={shouldShowFieldError('currentSolution')}
          aria-describedby={describedBy('currentSolution')}
          className={getFieldClassName('currentSolution', textareaClass)}
          name="currentSolution"
          placeholder="Spreadsheets, internal process, software tools, manual work..."
          value={formData.currentSolution}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {renderFieldError('currentSolution')}
      </label>

      <label className={labelClass}>
        <span>
          How often do you experience the problem? <span className="text-rose-400">*</span>
        </span>
        <select
          id="field-frequency"
          aria-invalid={shouldShowFieldError('frequency')}
          aria-describedby={describedBy('frequency')}
          className={getFieldClassName('frequency', `${selectClass} max-w-[420px]`)}
          name="frequency"
          value={formData.frequency}
          onChange={handleChange}
          onBlur={handleBlur}
        >
          <option value="">Select an option</option>
          {frequencyOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {renderFieldError('frequency')}
      </label>
    </div>
  )

  const renderStep3 = () => (
    <div className="grid gap-6">
      <div className="grid gap-6 md:grid-cols-2">
      
{/*         <label className={labelClass}>
          <span>
            Budget expectations <span className="text-rose-400">*</span>
          </span>
          <select
            className={getFieldClassName('budgetExpectation', selectClass)}
            name="budgetExpectation"
            value={formData.budgetExpectation}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <option value="">Select an option</option>
            {budgetOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label> */}

{/*         <label className={labelClass}>
          <span>
            Timeline <span className="text-rose-400">*</span>
          </span>
          <select
            className={getFieldClassName('timeline', selectClass)}
            name="timeline"
            value={formData.timeline}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <option value="">Select an option</option>
            {timelineOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label> */}

        <label className={labelClass}>
          <span>
            Preferred follow-up channel <span className="text-rose-400">*</span>
          </span>
          <select
            id="field-preferredFollowUp"
            aria-invalid={shouldShowFieldError('preferredFollowUp')}
            aria-describedby={describedBy('preferredFollowUp')}
            className={getFieldClassName('preferredFollowUp', selectClass)}
            name="preferredFollowUp"
            value={formData.preferredFollowUp}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <option value="">Select an option</option>
            {followUpOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {renderFieldError('preferredFollowUp')}
        </label>

        <label className={labelClass}>
          <span>
            Location <span className="text-[var(--color-text)]">(optional)</span>
          </span>
          <input
            id="field-location"
            aria-invalid={shouldShowFieldError('location')}
            aria-describedby={describedBy('location')}
            className={getFieldClassName('location')}
            type="text"
            name="location"
            placeholder="City, region, or service area"
            autoComplete="address-level2"
            value={formData.location}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {renderFieldError('location')}
        </label>
      </div>

      <label className={labelClass}>
        <span>
          Additional notes <span className="text-[var(--color-text)]">(optional)</span>
        </span>
        <textarea
          id="field-additionalNotes"
          aria-invalid={shouldShowFieldError('additionalNotes')}
          aria-describedby={describedBy('additionalNotes')}
          className={getFieldClassName('additionalNotes', textareaClass)}
          name="additionalNotes"
          placeholder="Anything else that would help us understand your workflow, constraints, or preferred timing."
          value={formData.additionalNotes}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {renderFieldError('additionalNotes')}
      </label>

      <div className="grid gap-2">
        <label
          className={`flex cursor-pointer items-start gap-3 rounded-2xl border bg-[var(--color-surface)] p-4 text-[var(--color-text)] ${
            shouldShowFieldError('consent') ? 'border-rose-500' : 'border-[var(--color-surface)]'
          }`}
        >
          <input
            id="field-consent"
            className="mt-1 h-4 w-4 accent-[var(--color-secondary)]"
            type="checkbox"
            name="consent"
            checked={formData.consent}
            aria-invalid={shouldShowFieldError('consent')}
            aria-describedby={describedBy('consent')}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <span className="text-sm leading-6">
            I consent to being contacted for a brief follow-up conversation regarding this
            research intake.
          </span>
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

  return (
    <div className="mx-auto min-h-screen w-full max-w-[1180px] px-8 pb-8 pt-6 max-[960px]:px-5 max-[960px]:pt-5">
      <header className="mb-9 flex items-center justify-between gap-6 max-[960px]:mb-8">
        <a
          className="inline-flex items-center gap-3 text-[var(--color-primary)] no-underline"
          href="#hero"
        >
          <span className="grid h-10 w-10 place-items-center rounded-[14px] bg-[var(--color-secondary)] text-base font-bold text-white shadow-[0_12px_30px_rgba(37,99,235,0.25)]">
            V
          </span>
          <span className={`text-lg font-bold tracking-[-0.03em] ${gradientText}`}>
            Verex
          </span>
        </a>
        <div className="flex items-center gap-4 max-[640px]:gap-3">
          <nav className="flex flex-wrap gap-5 max-[640px]:gap-3.5">
            <a
              className="text-[var(--color-text)] no-underline transition-colors hover:text-[var(--color-secondary)]"
              href="#scope"
            >
              Scope
            </a>
            <a
              className="text-[var(--color-text)] no-underline transition-colors hover:text-[var(--color-secondary)]"
              href="#questions"
            >
              Questions
            </a>
            <a
              className="text-[var(--color-text)] no-underline transition-colors hover:text-[var(--color-secondary)]"
              href="#outcomes"
            >
              Outcomes
            </a>
            <a
              className="text-[var(--color-text)] no-underline transition-colors hover:text-[var(--color-secondary)]"
              href="#contact"
            >
              Contact
            </a>
          </nav>
          <button
            aria-label="Toggle dark mode"
            className="inline-flex min-h-10 items-center rounded-xl border border-[var(--color-surface)] bg-[var(--color-background)] px-3 text-sm font-semibold text-[var(--color-text)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-secondary)]"
            type="button"
            onClick={() => setIsDarkMode((current) => !current)}
          >
            {isDarkMode ? 'Light' : 'Dark'}
          </button>
        </div>
      </header>

      <main>
        <section
          className="mb-6 grid gap-[22px] max-[960px]:grid-cols-1 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]"
          id="hero"
        >
          <div className={`${shellCard} p-[26px] max-[960px]:p-6`}>
            <p className={eyebrow}>Independent research on private healthcare clinic operations</p>
            <h1 className="mb-3.5 text-[clamp(2.6rem,5.2vw,4.7rem)] leading-[0.96] tracking-[-0.06em] text-[var(--color-primary)]">
              <span className={gradientText}>Verex</span> is studying how private clinics
              in Ontario actually operate.
            </h1>
            <p className="max-w-[60ch] text-base text-[var(--color-text)]">
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
            className={`${shellCard} bg-[radial-gradient(circle_at_top,rgba(96,165,250,0.2),transparent_45%),var(--color-background)] p-[26px] max-[960px]:p-6`}
          >
            <p className={eyebrow}>Operational issue intake</p>
            <h2 className={sectionHeading}>Share a recurring clinic challenge.</h2>
            <p className="mb-[18px] mt-2 text-base text-[var(--color-text)]">
              If your clinic is dealing with a persistent administrative or operational
              issue, you can provide a short summary here. Submissions help identify
              patterns across clinics and highlight areas that warrant deeper research.
            </p>
            <div className="mb-[18px] mt-[18px] grid gap-3.5">
              <div className={`${mutedCard} p-4`}>
                <strong className="mb-2 block text-[var(--color-primary)]">Examples of useful input</strong>
                <p className="text-sm leading-6 text-[var(--color-text)]">
                  Scheduling friction, billing issues, staffing strain, follow-up gaps,
                  intake delays, or manual workflows.
                </p>
              </div>
              <div className={`${mutedCard} p-4`}>
                <strong className="mb-2 block text-[var(--color-primary)]">Time required</strong>
                <p className="text-sm leading-6 text-[var(--color-text)]">
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
            <strong className="mb-2.5 block text-[var(--color-primary)]">Ontario clinic sample</strong>
            <span className="text-sm text-[var(--color-text)]">
              focused on private healthcare operators across Toronto and the GTA
            </span>
          </div>
          <div className={`${shellCard} rounded-3xl p-6`}>
            <strong className="mb-2.5 block text-[var(--color-primary)]">Short-form outreach</strong>
            <span className="text-sm text-[var(--color-text)]">
              built around concise conversations intended to gather operational insight
            </span>
          </div>
          <div className={`${shellCard} rounded-3xl p-6`}>
            <strong className="mb-2.5 block text-[var(--color-primary)]">Pattern-based analysis</strong>
            <span className="text-sm text-[var(--color-text)]">
              designed to compare recurring operational issues across many clinics
            </span>
          </div>
        </section>

        <section className="mb-7" id="vision">
          <div className="mb-5">
            <p className={eyebrow}>Research focus</p>
            <h2 className={sectionHeading}>
              What the outreach is intended to uncover across clinics.
            </h2>
          </div>

          <div className="grid gap-[18px] md:grid-cols-3">
            {focusAreas.map((item) => (
              <article className={`${shellCard} rounded-3xl p-6`} key={item.title}>
                <h3 className="mb-2.5 text-[1.2rem] text-[var(--color-primary)]">{item.title}</h3>
                <p className="text-sm leading-6 text-[var(--color-text)]">{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-7" id="questions">
          <div className="mb-5">
            <p className={eyebrow}>Core questions</p>
            <h2 className={sectionHeading}>
              Each interaction is anchored by two concise questions.
            </h2>
          </div>

          <div className="grid gap-[18px] md:grid-cols-2">
            {coreQuestions.map((question, index) => (
              <article className={`${shellCard} rounded-3xl p-6`} key={question}>
                <span className="mb-3.5 inline-flex h-[42px] min-w-[42px] items-center justify-center rounded-full bg-[rgba(96,165,250,0.2)] font-bold text-[var(--color-secondary)]">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <p className="max-w-[34ch] text-base text-[var(--color-text)]">{question}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-7">
          <div className="mb-5">
            <p className={eyebrow}>Additional signals</p>
            <h2 className={sectionHeading}>
              In addition to the primary questions, the research captures supporting
              context.
            </h2>
          </div>

          <div className={`${shellCard} rounded-3xl p-7`}>
            <ul className="grid gap-3 md:grid-cols-2">
              {researchSignals.map((signal) => (
                <li
                  className="rounded-[18px] border border-[var(--color-surface)] bg-[var(--color-surface)] px-[18px] py-4 text-[var(--color-text)]"
                  key={signal}
                >
                  {signal}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          className={`${shellCard} mb-7 rounded-3xl bg-[linear-gradient(135deg,rgba(96,165,250,0.2),rgba(37,99,235,0.08)),var(--color-background)] p-6 text-center`}
        >
          <p className="text-base text-[var(--color-text)]">
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
            <p className="max-w-[60ch] text-base text-[var(--color-text)]">
              The research is intended to produce a structured view of how clinics
              generate revenue, where efficiency is lost, and which operational issues
              recur frequently enough to justify focused attention.
            </p>
            <div className={`${shellCard} mt-6 rounded-[20px] p-5`}>
              <strong className="mb-3 inline-block text-[var(--color-primary)]">Research output</strong>
              <p className="text-sm leading-6 text-[var(--color-text)]">
                The resulting analysis is intended to highlight the most common revenue
                drivers, administrative bottlenecks, and operational issues affecting
                private clinics across the target market.
              </p>
            </div>
          </div>

          <div className="grid gap-[18px] md:grid-cols-3">
            {outcomes.map((outcome, index) => (
              <article className={`${shellCard} rounded-3xl p-6`} key={outcome.title}>
                <span className="mb-3.5 inline-flex h-[42px] min-w-[42px] items-center justify-center rounded-full bg-[rgba(96,165,250,0.2)] font-bold text-[var(--color-secondary)]">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mb-2.5 text-[1.2rem] text-[var(--color-primary)]">{outcome.title}</h3>
                <p className="max-w-[34ch] text-sm leading-6 text-[var(--color-text)]">
                  {outcome.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="grid gap-[22px] max-[960px]:grid-cols-1 lg:grid-cols-[minmax(320px,0.72fr)_minmax(0,1.28fr)]"
          id="contact"
        >
          <div className="flex flex-col justify-start pt-1">
            <p className={eyebrow}>Research intake</p>
            <h2 className="mb-4 text-[clamp(2.3rem,4.3vw,4.3rem)] leading-[0.96] tracking-[-0.05em] text-[var(--color-primary)]">
              Share your experience
            </h2>
            <p className="max-w-[22ch] text-[1.05rem] leading-8 text-[var(--color-text)] max-[960px]:max-w-[60ch]">
              Help us understand your workflow, pain points, and decision criteria. The
              form is brief, structured, and designed to make your input actionable.
            </p>

            <div className={`${mutedCard} mt-10 max-w-[620px] p-8`}>
              <strong className="mb-6 block text-[1.2rem] text-[var(--color-primary)]">What we ask</strong>
              <ul className="grid gap-5 text-[var(--color-text)]">
                <li>• Your professional context and customer type</li>
                <li>• The main problem you are facing and current workaround</li>
                <li>• Frequency, budget expectations, and preferred follow-up channel</li>
              </ul>
            </div>
          </div>

          <form className={`${shellCard} p-[34px] max-[960px]:p-6`} onSubmit={handleSubmit}>
            {renderStepIndicator()}

            <div className="min-h-[460px]">{renderCurrentStep()}</div>

            <div className="mt-8 border-t border-[var(--color-surface)] pt-8">
              <div className="flex items-center justify-between gap-4 max-[640px]:flex-col max-[640px]:items-stretch">
                <div className="text-[1.05rem] text-[var(--color-text)]">Step {currentStep} of 3</div>

                <div className="flex items-center gap-3 max-[640px]:flex-col max-[640px]:items-stretch">
                  {currentStep > 1 ? (
                    <button className={secondaryButton} type="button" onClick={goBack}>
                      Back
                    </button>
                  ) : null}

                  {currentStep < 3 ? (
                    <button className={primaryButton} type="button" onClick={goNext}>
                      Continue
                    </button>
                  ) : (
                    <button className={primaryButton} type="submit">
                      Submit
                    </button>
                  )}
                </div>
              </div>

              <p
                aria-live="polite"
                className={`mt-4 min-h-6 text-sm ${submitted ? 'text-[var(--color-secondary)]' : 'text-[var(--color-text)]'}`}
              >
                {submitted
                  ? 'Thank you. Your details have been noted in this preview experience.'
                  : 'Complete each step to provide structured context for the research intake.'}
              </p>
            </div>
          </form>
        </section>
      </main>
    </div>
  )
}

export default App