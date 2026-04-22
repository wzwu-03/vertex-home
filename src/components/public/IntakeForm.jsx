import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import {
  STEP_FIELDS,
  buildSubmissionPayload,
  businessSizeOptions,
  customerTypeOptions,
  followUpOptions,
  frequencyOptions,
  getStepErrors,
  industryOptions,
  intakeInitialValues,
  validateFullForm,
} from '../../lib/validators'
import { isSupabaseConfigured, supabase } from '../../lib/supabase'

const card = 'rounded-2xl border border-[var(--border)] bg-[var(--surface)] border-glow'
const primaryBtn =
  'inline-flex h-11 shrink-0 items-center justify-center rounded-xl bg-[var(--accent)] px-6 text-[0.85rem] font-semibold text-white transition-all duration-200 hover:bg-[var(--accent-hover)] hover:-translate-y-px active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50'
const ghostBtn =
  'inline-flex h-11 shrink-0 items-center justify-center rounded-xl border border-[var(--border)] bg-transparent px-6 text-[0.85rem] font-semibold text-[var(--text-secondary)] transition-all duration-200 hover:border-[var(--accent)] hover:text-[var(--text-primary)] disabled:cursor-not-allowed disabled:opacity-50'
const inputBase =
  'w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-[0.875rem] text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] sm:py-3.5'
const inputError = 'border-rose-500 focus:border-rose-500'
const labelCls = 'grid gap-1.5 text-[0.82rem] font-medium text-[var(--text-primary)]'
const helperCls = 'text-xs text-[var(--text-secondary)]'
const errCls = 'text-xs font-medium leading-snug text-rose-400'
const errSlotCls = 'min-h-[1.6rem]'
const selectBase = `${inputBase} appearance-none`
const textareaBase = `${inputBase} min-h-[130px] resize-y`

const steps = [
  { id: 1, label: 'Profile' },
  { id: 2, label: 'Context' },
  { id: 3, label: 'Preferences' },
]

async function insertSubmission(formData) {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error('Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.')
  }

  const payload = buildSubmissionPayload(formData)
  const result = await supabase.from('submissions').insert(payload).select('id').single()

  if (result.error) {
    throw result.error
  }

  return result.data
}

export default function IntakeForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [touched, setTouched] = useState({})
  const [attemptedSteps, setAttemptedSteps] = useState({})
  const [formData, setFormData] = useState(intakeInitialValues)

  const submitMutation = useMutation({
    mutationFn: insertSubmission,
    onSuccess: () => {
      setFormData(intakeInitialValues)
      setCurrentStep(1)
      setTouched({})
      setAttemptedSteps({})
    },
  })

  const currentErrors = getStepErrors(formData, currentStep)
  const shouldShowFieldError = (field) => Boolean(currentErrors[field] && (touched[field] || attemptedSteps[currentStep]))

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target
    setFormData((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleBlur = (event) => {
    const { name } = event.target
    setTouched((current) => ({ ...current, [name]: true }))
  }

  const clearStepTouched = (step) => {
    setTouched((current) => {
      const next = { ...current }
      for (const key of STEP_FIELDS[step] ?? []) {
        delete next[key]
      }
      return next
    })
  }

  const clearStepAttempted = (step) => {
    setAttemptedSteps((current) => {
      const next = { ...current }
      delete next[step]
      return next
    })
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
    return ids.length ? ids.join(' ') : undefined
  }

  const goNext = () => {
    const errors = getStepErrors(formData, currentStep)
    if (Object.keys(errors).length > 0) {
      setAttemptedSteps((current) => ({ ...current, [currentStep]: true }))
      markFieldsTouched(Object.keys(errors))
      return
    }

    const nextStep = Math.min(currentStep + 1, 3)
    clearStepTouched(nextStep)
    clearStepAttempted(nextStep)
    setCurrentStep(nextStep)
  }

  const goBack = () => {
    const previousStep = Math.max(currentStep - 1, 1)
    clearStepTouched(previousStep)
    clearStepAttempted(previousStep)
    setCurrentStep(previousStep)
  }

  const onSubmit = async (event) => {
    event.preventDefault()

    if (currentStep < 3) {
      goNext()
      return
    }

    for (const step of [1, 2, 3]) {
      const errors = getStepErrors(formData, step)
      if (Object.keys(errors).length > 0) {
        setCurrentStep(step)
        setAttemptedSteps((current) => ({ ...current, [step]: true }))
        markFieldsTouched(Object.keys(errors))
        return
      }
    }

    const parsed = validateFullForm(formData)
    if (!parsed.success) {
      setCurrentStep(1)
      return
    }

    await submitMutation.mutateAsync(formData)
  }

  const getFieldCls = (field, base = inputBase) => (shouldShowFieldError(field) ? `${base} ${inputError}` : base)

  const renderFieldError = (field) => {
    const msg = currentErrors[field]
    const show = Boolean(msg && shouldShowFieldError(field))
    return <div className={errSlotCls}>{show ? <span className={errCls} id={fieldErrorId(field)} role="alert">{msg}</span> : null}</div>
  }

  return (
    <form className={`${card} flex flex-col p-5 sm:p-7 lg:p-8 reveal reveal-2`} onSubmit={onSubmit}>
      <div className="mb-7 flex items-stretch gap-0">
        {steps.map((step, index) => {
          const isActive = currentStep === step.id
          const isComplete = currentStep > step.id
          const active = isActive || isComplete

          return (
            <div key={step.id} className="flex min-w-0 flex-1 items-center">
              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-[0.65rem] font-bold transition-all duration-300 ${
                      active ? 'bg-[var(--accent)] text-white' : 'border border-[var(--border)] text-[var(--text-muted)]'
                    }`}
                  >
                    {isComplete ? (
                      <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                        <path d="M1 3.5L3 5.5L8 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : (
                      step.id
                    )}
                  </div>
                  <span className={`text-[0.75rem] font-medium transition-colors duration-200 ${active ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]'}`}>
                    {step.label}
                  </span>
                </div>
                <div className={`h-px transition-all duration-500 ${active ? 'bg-[var(--accent)]' : 'bg-[var(--border)]'}`} />
              </div>
              {index < steps.length - 1 && <div className="mx-3 h-px w-3 shrink-0 bg-[var(--border)]" />}
            </div>
          )
        })}
      </div>

      <div className="min-h-[380px] flex-1 sm:min-h-[440px]">
        {currentStep === 1 && (
          <div className="grid gap-4 sm:gap-5">
            <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
              <label className={labelCls}>
                <span>
                  Full name <span className="text-rose-400">*</span>
                </span>
                <input
                  id="field-fullName"
                  aria-invalid={shouldShowFieldError('fullName')}
                  aria-describedby={describedBy('fullName')}
                  className={getFieldCls('fullName')}
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

              <label className={labelCls}>
                <span>
                  Email <span className="text-rose-400">*</span>
                </span>
                <input
                  id="field-email"
                  aria-invalid={shouldShowFieldError('email')}
                  aria-describedby={describedBy('email')}
                  className={getFieldCls('email')}
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

              <label className={labelCls}>
                <span>
                  Phone <span className="text-[var(--text-muted)] font-normal">(optional)</span>
                </span>
                <input
                  id="field-phone"
                  aria-invalid={shouldShowFieldError('phone')}
                  aria-describedby={describedBy('phone')}
                  className={getFieldCls('phone')}
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

              <label className={labelCls}>
                <span>
                  Company <span className="text-[var(--text-muted)] font-normal">(optional)</span>
                </span>
                <input
                  id="field-companyName"
                  aria-invalid={shouldShowFieldError('companyName')}
                  aria-describedby={describedBy('companyName')}
                  className={getFieldCls('companyName')}
                  type="text"
                  name="companyName"
                  placeholder="Clinic or organization"
                  autoComplete="organization"
                  value={formData.companyName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {renderFieldError('companyName')}
              </label>

              <label className={labelCls}>
                <span>
                  Industry <span className="text-rose-400">*</span>
                </span>
                <select
                  id="field-industry"
                  aria-invalid={shouldShowFieldError('industry')}
                  aria-describedby={describedBy('industry')}
                  className={getFieldCls('industry', selectBase)}
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

              <label className={labelCls}>
                <span>
                  Role / job title <span className="text-rose-400">*</span>
                </span>
                <input
                  id="field-role"
                  aria-invalid={shouldShowFieldError('role')}
                  aria-describedby={describedBy('role')}
                  className={getFieldCls('role')}
                  type="text"
                  name="role"
                  placeholder="Founder, Manager, Clinician..."
                  autoComplete="organization-title"
                  value={formData.role}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {renderFieldError('role')}
              </label>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="grid gap-4 sm:gap-5">
            <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
              <label className={labelCls}>
                <span>
                  Customer type <span className="text-rose-400">*</span>
                </span>
                <select
                  id="field-customerType"
                  aria-invalid={shouldShowFieldError('customerType')}
                  aria-describedby={describedBy('customerType')}
                  className={getFieldCls('customerType', selectBase)}
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

              <label className={labelCls}>
                <span>
                  Practice size <span className="text-rose-400">*</span>
                </span>
                <select
                  id="field-businessSize"
                  aria-invalid={shouldShowFieldError('businessSize')}
                  aria-describedby={describedBy('businessSize')}
                  className={getFieldCls('businessSize', selectBase)}
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

            <label className={labelCls}>
              <span>
                Main problem or pain point <span className="text-rose-400">*</span>
              </span>
              <textarea
                id="field-painPoint"
                aria-invalid={shouldShowFieldError('painPoint')}
                aria-describedby={describedBy('painPoint', fieldHintId('painPoint'))}
                className={getFieldCls('painPoint', textareaBase)}
                name="painPoint"
                placeholder="Describe the biggest issue you are trying to solve."
                value={formData.painPoint}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {renderFieldError('painPoint')}
              <span className={helperCls} id={fieldHintId('painPoint')}>
                The more specific, the more useful for our research.
              </span>
            </label>

            <label className={labelCls}>
              <span>
                Current solution you use <span className="text-rose-400">*</span>
              </span>
              <textarea
                id="field-currentSolution"
                aria-invalid={shouldShowFieldError('currentSolution')}
                aria-describedby={describedBy('currentSolution')}
                className={getFieldCls('currentSolution', textareaBase)}
                name="currentSolution"
                placeholder="Spreadsheets, internal process, software tools, manual work..."
                value={formData.currentSolution}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {renderFieldError('currentSolution')}
            </label>

            <label className={labelCls}>
              <span>
                How often do you experience this? <span className="text-rose-400">*</span>
              </span>
              <select
                id="field-frequency"
                aria-invalid={shouldShowFieldError('frequency')}
                aria-describedby={describedBy('frequency')}
                className={getFieldCls('frequency', `${selectBase} max-w-full sm:max-w-[380px]`)}
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
        )}

        {currentStep === 3 && (
          <div className="grid gap-4 sm:gap-5">
            <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
              <label className={labelCls}>
                <span>
                  Preferred follow-up channel <span className="text-rose-400">*</span>
                </span>
                <select
                  id="field-preferredFollowUp"
                  aria-invalid={shouldShowFieldError('preferredFollowUp')}
                  aria-describedby={describedBy('preferredFollowUp')}
                  className={getFieldCls('preferredFollowUp', selectBase)}
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

              <label className={labelCls}>
                <span>
                  Location <span className="text-[var(--text-muted)] font-normal">(optional)</span>
                </span>
                <input
                  id="field-location"
                  aria-invalid={shouldShowFieldError('location')}
                  aria-describedby={describedBy('location')}
                  className={getFieldCls('location')}
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

            <label className={labelCls}>
              <span>
                Additional notes <span className="text-[var(--text-muted)] font-normal">(optional)</span>
              </span>
              <textarea
                id="field-additionalNotes"
                aria-invalid={shouldShowFieldError('additionalNotes')}
                aria-describedby={describedBy('additionalNotes')}
                className={getFieldCls('additionalNotes', textareaBase)}
                name="additionalNotes"
                placeholder="Anything else that would help us understand your workflow, constraints, or preferred timing."
                value={formData.additionalNotes}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {renderFieldError('additionalNotes')}
            </label>

            <div className="grid gap-1.5">
              <label
                className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 text-[var(--text-secondary)] transition-colors ${
                  shouldShowFieldError('consent') ? 'border-rose-500' : 'border-[var(--border)] bg-[var(--surface)] hover:border-[var(--accent)]'
                }`}
              >
                <input
                  id="field-consent"
                  className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--accent)]"
                  type="checkbox"
                  name="consent"
                  checked={formData.consent}
                  aria-invalid={shouldShowFieldError('consent')}
                  aria-describedby={describedBy('consent')}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <span className="text-[0.82rem] leading-6">I consent to being contacted for a brief follow-up conversation regarding this research intake.</span>
              </label>
              {renderFieldError('consent')}
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 border-t border-[var(--border)] pt-6">
        <div className="flex items-center justify-between gap-4 max-[540px]:flex-col max-[540px]:items-stretch">
          <p className="text-[0.75rem] text-[var(--text-muted)]">Step {currentStep} of 3</p>
          <div className="flex items-center gap-3 max-[540px]:flex-col max-[540px]:items-stretch">
            {currentStep > 1 && (
              <button className={ghostBtn} type="button" onClick={goBack} disabled={submitMutation.isPending}>
                Back
              </button>
            )}
            {currentStep < 3 ? (
              <button className={primaryBtn} type="button" onClick={goNext} disabled={submitMutation.isPending}>
                Continue
              </button>
            ) : (
              <button className={primaryBtn} type="submit" disabled={submitMutation.isPending}>
                {submitMutation.isPending ? 'Submitting...' : 'Submit'}
              </button>
            )}
          </div>
        </div>

        <p
          aria-live="polite"
          className={`mt-4 min-h-5 text-[0.78rem] transition-colors ${
            submitMutation.isSuccess ? 'text-emerald-400' : submitMutation.isError ? 'text-rose-400' : 'text-[var(--text-muted)]'
          }`}
        >
          {submitMutation.isSuccess
            ? 'Thank you. Your submission was saved successfully.'
            : submitMutation.isError
              ? `Unable to submit right now: ${submitMutation.error?.message ?? 'Unknown error'}`
              : 'Complete each step to provide structured context for the research intake.'}
        </p>
      </div>
    </form>
  )
}
