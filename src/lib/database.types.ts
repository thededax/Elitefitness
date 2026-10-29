export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type UserRole = 'member' | 'owner';

export type MembershipStatus =
  | 'active'
  | 'expiring_soon'
  | 'expired'
  | 'suspended'
  | 'cancelled';

export type PaymentMethod =
  | 'cash'
  | 'upi'
  | 'card'
  | 'bank_transfer'
  | 'other';

export type PaymentStatus =
  | 'completed'
  | 'pending'
  | 'refunded'
  | 'failed';

export type NotificationType =
  | 'membership_expiring'
  | 'membership_expired'
  | 'attendance_success'
  | 'renewal_confirmed'
  | 'announcement'
  | 'owner_message';

export interface Profile {
  id: string;
  full_name: string;
  email: string;
  phone?: string | null;
  avatar_url?: string | null;
  role: UserRole;
  is_active: boolean;
  emergency_contact?: string | null;
  fitness_goals?: string | null;
  created_at: string;
  updated_at: string;
}

export interface MembershipPlan {
  id: string;
  name: string;
  description?: string | null;
  duration_days: number;
  price: number;
  currency: string;
  is_active: boolean;
  features?: string[];
  created_at: string;
  updated_at: string;
}

export interface Membership {
  id: string;
  member_id: string;
  plan_id?: string | null;
  plan_name_snapshot: string;
  price_snapshot: number;
  duration_days_snapshot: number;
  start_date: string; // YYYY-MM-DD
  expiry_date: string; // YYYY-MM-DD
  status: MembershipStatus;
  created_at: string;
  updated_at: string;
}

export interface Attendance {
  id: string;
  member_id: string;
  check_in_at: string;
  gym_local_date: string; // YYYY-MM-DD
  source: string;
  created_at: string;
}

export interface Payment {
  id: string;
  member_id: string;
  membership_id?: string | null;
  amount: number;
  currency: string;
  payment_method: PaymentMethod;
  status: PaymentStatus;
  transaction_reference?: string | null;
  paid_at: string;
  recorded_by?: string | null;
  notes?: string | null;
  created_at: string;
}

export interface ProgressLog {
  id: string;
  member_id: string;
  recorded_at: string; // YYYY-MM-DD
  weight_kg?: number | null;
  body_fat_percentage?: number | null;
  chest_cm?: number | null;
  waist_cm?: number | null;
  arms_cm?: number | null;
  notes?: string | null;
  created_at: string;
}

export interface WorkoutExercise {
  name: string;
  sets: number;
  reps: string;
  target_muscle: string;
  notes?: string;
}

export interface WorkoutPlan {
  id: string;
  member_id?: string | null;
  name: string;
  description?: string | null;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  schedule_days: string[];
  exercises: WorkoutExercise[];
  created_at: string;
}

export interface NotificationItem {
  id: string;
  recipient_id: string;
  title: string;
  body: string;
  type: NotificationType;
  read_at?: string | null;
  created_at: string;
}

export interface Announcement {
  id: string;
  title: string;
  body: string;
  target_group: 'all' | 'active' | 'expiring_soon';
  sent_by?: string | null;
  created_at: string;
}

export interface AuditLog {
  id: string;
  actor_id?: string | null;
  action: string;
  entity_type: string;
  entity_id?: string | null;
  details?: Record<string, unknown> | null;
  created_at: string;
}

export interface CheckInResult {
  success: boolean;
  code:
    | 'SUCCESS'
    | 'ALREADY_CHECKED_IN'
    | 'LOGIN_REQUIRED'
    | 'MEMBERSHIP_EXPIRED'
    | 'MEMBERSHIP_SUSPENDED'
    | 'ACCOUNT_INACTIVE'
    | 'NO_MEMBERSHIP'
    | 'ACCOUNT_NOT_FOUND'
    | 'VALIDATION_ERROR'
    | 'TEMPORARY_ERROR';
  message: string;
  attendance_id?: string;
  date?: string;
}

export interface OwnerMetrics {
  total_members: number;
  active_members: number;
  expiring_soon: number;
  expired_members: number;
  today_checkins: number;
  month_revenue: number;
  calculated_at: string;
}
