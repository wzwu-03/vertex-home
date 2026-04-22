import { z } from 'zod'

export const LIMITS = {
  fullName: { min: 2, max: 120 },
  role: { max: 100 },
  companyName: { max: 200 },
  painPoint: { min: 20, max: 5000 },
  currentSolution: { min: 10, max: 5000 },
  location: { max: 200 },
  additionalNotes: { max: 5000 },
}

export const STEP_FIELDS = {
  1: ['fullName', 'email', 'phone', 'companyName', 'industry', 'role'],
  2: ['customerType', 'businessSize', 'painPoint', 'currentSolution', 'frequency'],
  3: ['preferredFollowUp', 'location', 'additionalNotes', 'consent'],
}

export const intakeInitialValues = {
  fullName: '',
  email: '',
  phone: '',
  companyName: '',
  industry: '',
  role: '',
  customerType: '',
  businessSize: '',
  painPoint: '',
  currentSolution: '',
  frequency: '',
  preferredFollowUp: '',
  location: '',
  additionalNotes: '',
  consent: false,
}

export const industryOptions = [
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

export const customerTypeOptions = [
  'Clinic owner',
  'Office manager',
  'Administrator',
  'Clinician',
  'Operations lead',
  'Other',
]

export const businessSizeOptions = [
  'Solo practice',
  '2-5 staff',
  '6-15 staff',
  '16-50 staff',
  '50+ staff',
]

export const frequencyOptions = ['Daily', 'Several times a week', 'Weekly', 'A few times a month', 'Occasionally']

export const followUpOptions = ['Email', 'Phone call', 'Text message', 'No preference']

const optionalTrimmed = (max) =>
  z
    .string()
    .transform((value) => value.trim())
    .refine((value) => value.length <= max, `Must be ${max} characters or fewer.`)

const optionalPhoneSchema = z
  .string()
  .transform((value) => value.trim())
  .refine((value) => {
    if (!value) return true
    const digits = value.replace(/\D/g, '')
    return digits.length >= 10 && digits.length <= 15
  }, 'Enter a valid phone number (10-15 digits).')

const intakeSchema = z.object({
  fullName: z
    .string()
    .transform((value) => value.trim())
    .min(LIMITS.fullName.min, `Use at least ${LIMITS.fullName.min} characters.`)
    .max(LIMITS.fullName.max, `Keep your name under ${LIMITS.fullName.max} characters.`),
  email: z
    .string()
    .transform((value) => value.trim())
    .min(1, 'Email is required.')
    .max(254, 'Email must be 254 characters or fewer.')
    .email('Please enter a valid email address.'),
  phone: optionalPhoneSchema,
  companyName: optionalTrimmed(LIMITS.companyName.max),
  industry: z
    .string()
    .transform((value) => value.trim())
    .min(1, 'Please select an industry.'),
  role: z
    .string()
    .transform((value) => value.trim())
    .min(1, 'Role or job title is required.')
    .max(LIMITS.role.max, `Role must be ${LIMITS.role.max} characters or fewer.`),
  customerType: z
    .string()
    .transform((value) => value.trim())
    .min(1, 'Please select a customer type.'),
  businessSize: z
    .string()
    .transform((value) => value.trim())
    .min(1, 'Please select a business size.'),
  painPoint: z
    .string()
    .transform((value) => value.trim())
    .min(LIMITS.painPoint.min, `Add a bit more detail (at least ${LIMITS.painPoint.min} characters).`)
    .max(LIMITS.painPoint.max, `Keep this under ${LIMITS.painPoint.max} characters.`),
  currentSolution: z
    .string()
    .transform((value) => value.trim())
    .min(LIMITS.currentSolution.min, `Add more detail (at least ${LIMITS.currentSolution.min} characters).`)
    .max(LIMITS.currentSolution.max, `Keep this under ${LIMITS.currentSolution.max} characters.`),
  frequency: z
    .string()
    .transform((value) => value.trim())
    .min(1, 'Please select how often you experience the problem.'),
  preferredFollowUp: z
    .string()
    .transform((value) => value.trim())
    .min(1, 'Please select a follow-up channel.'),
  location: optionalTrimmed(LIMITS.location.max),
  additionalNotes: optionalTrimmed(LIMITS.additionalNotes.max),
  consent: z.boolean().refine((value) => value, 'Please confirm you consent to be contacted for follow-up.'),
})

export function getStepErrors(formData, step) {
  const parsed = intakeSchema.safeParse(formData)
  if (parsed.success) {
    return {}
  }

  const stepFields = STEP_FIELDS[step] ?? []
  return parsed.error.issues.reduce((acc, issue) => {
    const field = issue.path[0]
    if (typeof field === 'string' && stepFields.includes(field) && !acc[field]) {
      acc[field] = issue.message
    }
    return acc
  }, {})
}

export function validateFullForm(formData) {
  return intakeSchema.safeParse(formData)
}

export function buildSubmissionPayload(formData) {
  return {
    full_name: formData.fullName.trim(),
    email: formData.email.trim().toLowerCase(),
    phone: formData.phone.trim() || null,
    company_name: formData.companyName.trim() || null,
    industry: formData.industry.trim(),
    role: formData.role.trim(),
    customer_type: formData.customerType.trim(),
    business_size: formData.businessSize.trim(),
    pain_point: formData.painPoint.trim(),
    current_solution: formData.currentSolution.trim(),
    frequency: formData.frequency.trim(),
    preferred_follow_up: formData.preferredFollowUp.trim(),
    location: formData.location.trim() || null,
    additional_notes: formData.additionalNotes.trim() || null,
    consent: formData.consent,
    source: 'public_landing',
  }
}
