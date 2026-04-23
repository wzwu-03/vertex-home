-- Seed data for Verex admin dashboard testing
-- Safe to run multiple times due to ON CONFLICT DO NOTHING.

BEGIN;

INSERT INTO public.submissions (
  id,
  created_at,
  full_name,
  email,
  phone,
  company_name,
  industry,
  role,
  customer_type,
  business_size,
  pain_point,
  current_solution,
  frequency,
  preferred_follow_up,
  location,
  additional_notes,
  consent,
  source
)
VALUES
  ('11111111-1111-1111-1111-111111111001', now() - interval '20 days', 'Aria Nguyen', 'aria.nguyen@evergreenclinic.ca', '+1 416 555 1001', 'Evergreen Family Clinic', 'Family practice', 'Clinic owner', 'Clinic owner', '6-15 staff', 'Referral intake delays create scheduling bottlenecks and lost appointment slots.', 'Manual referral triage in email and spreadsheets.', 'Daily', 'Email', 'Toronto, ON', 'Interested in quick process improvements first.', true, 'public_landing'),
  ('11111111-1111-1111-1111-111111111002', now() - interval '18 days', 'Daniel Brooks', 'daniel@lakeviewdental.ca', '+1 647 555 1002', 'Lakeview Dental', 'Dental clinic', 'Operations manager', 'Operations lead', '16-50 staff', 'Insurance pre-approval follow-ups consume front desk time and delay treatment booking.', 'Two admins call insurers manually and track in sheets.', 'Several times a week', 'Phone call', 'Mississauga, ON', NULL, true, 'public_landing'),
  ('11111111-1111-1111-1111-111111111003', now() - interval '16 days', 'Nina Patel', 'nina@motionpathphysio.com', '+1 905 555 1003', 'MotionPath Physio', 'Physiotherapy clinic', 'Founder', 'Clinic owner', '2-5 staff', 'No-show management is inconsistent and hurts weekly revenue predictability.', 'Reminder texts plus ad hoc calls by staff.', 'Weekly', 'Text message', 'Oakville, ON', 'Would like to compare with peers.', true, 'public_landing'),
  ('11111111-1111-1111-1111-111111111004', now() - interval '14 days', 'Owen Carter', 'ocarter@citywalkin.ca', '+1 437 555 1004', 'City Walk-In Centre', 'Walk-in clinic', 'Administrator', 'Administrator', '50+ staff', 'Patient check-in and triage handoffs are fragmented across tools.', 'Legacy EMR plus printed queues.', 'Daily', 'Email', 'Toronto, ON', NULL, true, 'public_landing'),
  ('11111111-1111-1111-1111-111111111005', now() - interval '12 days', 'Sara Ibrahim', 's.ibrahim@spineplus.ca', '+1 416 555 1005', 'SpinePlus Chiropractic', 'Chiropractic clinic', 'Office manager', 'Office manager', '6-15 staff', 'Billing reconciliation at month-end takes too long and creates cash flow blind spots.', 'Manual exports into accounting software.', 'A few times a month', 'Email', 'Vaughan, ON', NULL, true, 'public_landing'),
  ('11111111-1111-1111-1111-111111111006', now() - interval '11 days', 'Leah Morrison', 'leah@northderm.ca', '+1 289 555 1006', 'NorthDerm Specialists', 'Dermatology clinic', 'Clinic director', 'Clinician', '16-50 staff', 'Procedure room utilization is hard to forecast, causing idle capacity.', 'Weekly planning meetings and manual estimates.', 'Weekly', 'Phone call', 'Markham, ON', NULL, true, 'public_landing'),
  ('11111111-1111-1111-1111-111111111007', now() - interval '9 days', 'Amir Hassan', 'amir@mindwellcollective.ca', '+1 905 555 1007', 'Mindwell Collective', 'Mental health clinic', 'Operations lead', 'Operations lead', '6-15 staff', 'Therapist matching and reassignment after cancellations is slow.', 'Coordinator handles reassignment manually.', 'Several times a week', 'Email', 'Brampton, ON', 'Prioritizing patient continuity.', true, 'public_landing'),
  ('11111111-1111-1111-1111-111111111008', now() - interval '7 days', 'Priya Shah', 'priya@harbourspecialists.ca', '+1 647 555 1008', 'Harbour Specialist Group', 'Specialist practice', 'Practice manager', 'Administrator', '50+ staff', 'Referral-to-consult cycle time is too long for non-urgent cases.', 'Fax intake plus manual call-backs.', 'Daily', 'Phone call', 'Toronto, ON', NULL, true, 'public_landing'),
  ('11111111-1111-1111-1111-111111111009', now() - interval '6 days', 'Marco De Luca', 'marco@lakeshoredental.ca', '+1 416 555 1009', 'Lakeshore Dental Arts', 'Dental clinic', 'Owner dentist', 'Clinic owner', '2-5 staff', 'Chair downtime between patients reduces throughput.', 'Whiteboard scheduling and receptionist judgment.', 'Daily', 'Text message', 'Etobicoke, ON', NULL, true, 'public_landing'),
  ('11111111-1111-1111-1111-111111111010', now() - interval '4 days', 'Emily Chen', 'emily.chen@riverstoneclinic.ca', '+1 905 555 1010', 'Riverstone Family Health', 'Family practice', 'Administrator', 'Administrator', '16-50 staff', 'Prescription refill requests overwhelm inbound phone lines.', 'Nurse triage with callback queue.', 'Daily', 'Email', 'Richmond Hill, ON', NULL, true, 'public_landing'),
  ('11111111-1111-1111-1111-111111111011', now() - interval '2 days', 'Jacob Sinclair', 'jacob@coremotionphysio.ca', '+1 289 555 1011', 'CoreMotion Physiotherapy', 'Physiotherapy clinic', 'Clinic owner', 'Clinic owner', '6-15 staff', 'Progress note documentation takes time away from patient-facing work.', 'Mixed dictation and manual charting.', 'Several times a week', 'Phone call', 'Burlington, ON', NULL, true, 'public_landing'),
  ('11111111-1111-1111-1111-111111111012', now() - interval '1 day', 'Hannah Lee', 'hannah@uptownwalkin.ca', '+1 437 555 1012', 'Uptown Walk-In', 'Walk-in clinic', 'Office manager', 'Office manager', '16-50 staff', 'Shift handover notes are inconsistent across front desk teams.', 'Shared docs with uneven adoption.', 'Weekly', 'Email', 'North York, ON', NULL, true, 'public_landing')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.submission_reviews (
  submission_id,
  status,
  priority_score,
  pain_category,
  impact_type,
  workflow_maturity,
  follow_up_status,
  follow_up_owner,
  internal_notes,
  last_contacted_at,
  updated_at
)
VALUES
  ('11111111-1111-1111-1111-111111111001', 'qualified', 90, 'Intake Bottleneck', 'Revenue + Time', 'Medium', 'contacted', 'ops.team@verex.ai', 'Clear recurring issue, high openness to workflow redesign.', now() - interval '17 days', now() - interval '17 days'),
  ('11111111-1111-1111-1111-111111111002', 'in_review', 78, 'Billing Friction', 'Time', 'Low', 'scheduled', 'analyst@verex.ai', 'Need volume estimates by insurer type.', now() - interval '13 days', now() - interval '13 days'),
  ('11111111-1111-1111-1111-111111111003', 'contact_pending', 72, 'Retention Risk', 'Revenue', 'Medium', 'not_started', 'ops.team@verex.ai', 'Good candidate for no-show pattern analysis.', NULL, now() - interval '10 days'),
  ('11111111-1111-1111-1111-111111111004', 'new', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, now() - interval '14 days'),
  ('11111111-1111-1111-1111-111111111005', 'qualified', 84, 'Finance Operations', 'Revenue + Time', 'Medium', 'contacted', 'finance.research@verex.ai', 'Month-end process appears highly manual.', now() - interval '9 days', now() - interval '9 days'),
  ('11111111-1111-1111-1111-111111111006', 'in_review', 66, 'Capacity Planning', 'Time', 'Medium', 'waiting_response', 'analyst@verex.ai', 'Waiting for utilization baseline numbers.', now() - interval '6 days', now() - interval '6 days'),
  ('11111111-1111-1111-1111-111111111007', 'qualified', 88, 'Scheduling Friction', 'Revenue + Time', 'Low', 'contacted', 'ops.team@verex.ai', 'Strong qualitative detail and clear frequency.', now() - interval '5 days', now() - interval '5 days'),
  ('11111111-1111-1111-1111-111111111008', 'contact_pending', 74, 'Referral Delay', 'Revenue', 'Low', 'scheduled', 'specialty.ops@verex.ai', 'Potentially high impact for specialist cohort.', NULL, now() - interval '4 days'),
  ('11111111-1111-1111-1111-111111111009', 'new', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, now() - interval '6 days'),
  ('11111111-1111-1111-1111-111111111010', 'in_review', 69, 'Comms Overload', 'Time', 'Medium', 'not_started', 'triage@verex.ai', 'Needs call-volume segmentation.', NULL, now() - interval '3 days'),
  ('11111111-1111-1111-1111-111111111011', 'contact_pending', 71, 'Documentation Load', 'Time', 'Low', 'scheduled', 'analyst@verex.ai', 'Follow-up requested on charting stack.', NULL, now() - interval '2 days')
ON CONFLICT (submission_id) DO NOTHING;

INSERT INTO public.submission_tags (id, submission_id, tag)
VALUES
  ('22222222-2222-2222-2222-222222222001', '11111111-1111-1111-1111-111111111001', 'high-priority'),
  ('22222222-2222-2222-2222-222222222002', '11111111-1111-1111-1111-111111111001', 'intake'),
  ('22222222-2222-2222-2222-222222222003', '11111111-1111-1111-1111-111111111002', 'billing'),
  ('22222222-2222-2222-2222-222222222004', '11111111-1111-1111-1111-111111111003', 'no-show'),
  ('22222222-2222-2222-2222-222222222005', '11111111-1111-1111-1111-111111111005', 'finance'),
  ('22222222-2222-2222-2222-222222222006', '11111111-1111-1111-1111-111111111007', 'scheduling'),
  ('22222222-2222-2222-2222-222222222007', '11111111-1111-1111-1111-111111111008', 'referrals'),
  ('22222222-2222-2222-2222-222222222008', '11111111-1111-1111-1111-111111111010', 'communications')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.activity_log (id, submission_id, action, actor_id, metadata, created_at)
VALUES
  ('33333333-3333-3333-3333-333333333001', '11111111-1111-1111-1111-111111111001', 'review_created', NULL, '{"status":"qualified","priority_score":90}'::jsonb, now() - interval '17 days'),
  ('33333333-3333-3333-3333-333333333002', '11111111-1111-1111-1111-111111111001', 'follow_up_contacted', NULL, '{"channel":"email"}'::jsonb, now() - interval '16 days'),
  ('33333333-3333-3333-3333-333333333003', '11111111-1111-1111-1111-111111111002', 'review_created', NULL, '{"status":"in_review"}'::jsonb, now() - interval '13 days'),
  ('33333333-3333-3333-3333-333333333004', '11111111-1111-1111-1111-111111111003', 'tag_added', NULL, '{"tag":"no-show"}'::jsonb, now() - interval '10 days'),
  ('33333333-3333-3333-3333-333333333005', '11111111-1111-1111-1111-111111111005', 'review_updated', NULL, '{"status":"qualified"}'::jsonb, now() - interval '9 days'),
  ('33333333-3333-3333-3333-333333333006', '11111111-1111-1111-1111-111111111007', 'follow_up_scheduled', NULL, '{"scheduled_for":"next_week"}'::jsonb, now() - interval '5 days'),
  ('33333333-3333-3333-3333-333333333007', '11111111-1111-1111-1111-111111111008', 'review_created', NULL, '{"status":"contact_pending"}'::jsonb, now() - interval '4 days'),
  ('33333333-3333-3333-3333-333333333008', '11111111-1111-1111-1111-111111111010', 'review_created', NULL, '{"status":"in_review"}'::jsonb, now() - interval '3 days')
ON CONFLICT (id) DO NOTHING;

COMMIT;
