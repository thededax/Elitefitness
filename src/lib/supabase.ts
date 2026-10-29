import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type {
  Profile,
  MembershipPlan,
  Membership,
  Attendance,
  Payment,
  ProgressLog,
  WorkoutPlan,
  NotificationItem,
  Announcement,
  CheckInResult,
  OwnerMetrics,
  UserRole,
} from './database.types';

// Environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Determine if real Supabase cloud credentials are configured and reachable
export const isRealSupabaseConfigured = Boolean(
  supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl.startsWith('https://') &&
    !supabaseUrl.includes('placeholder')
);

// Standard Supabase client instance (or dummy instance if credentials not present)
export const supabase: SupabaseClient = createClient(
  isRealSupabaseConfigured ? supabaseUrl : 'https://placeholder.supabase.co',
  isRealSupabaseConfigured ? supabaseAnonKey : 'placeholder-anon-key'
);

// ====================================================================
// LOCAL SEEDED DATABASE & PERSISTENCE LAYER
// Ensures 100% offline & testable full-stack functionality
// ====================================================================

interface LocalDatabaseState {
  profiles: Profile[];
  plans: MembershipPlan[];
  memberships: Membership[];
  attendance: Attendance[];
  payments: Payment[];
  progress: ProgressLog[];
  workouts: WorkoutPlan[];
  notifications: NotificationItem[];
  announcements: Announcement[];
  currentUserId: string | null;
}

const STORAGE_KEY = 'elite_gym_db_state_v1';

// Initial seed data
const initialSeedPlans: MembershipPlan[] = [
  {
    id: 'plan-starter-30',
    name: 'Starter Track (Monthly)',
    description: 'Structured entry into strength & conditioning with essential facility access.',
    duration_days: 30,
    price: 999,
    currency: 'INR',
    is_active: true,
    features: [
      'Full Gym Floor Access (Off-Peak Hours)',
      '1 Group Zumba / HIIT Class Per Week',
      'Initial Biomechanical Assessment',
      'Locker & Shower Amenities Access',
    ],
    created_at: new Date(Date.now() - 90 * 86400000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'plan-elite-90',
    name: 'Elite Transformation (Quarterly)',
    description: 'Unrestricted all-access pass for committed athletes and continuous progress.',
    duration_days: 90,
    price: 5099,
    currency: 'INR',
    is_active: true,
    features: [
      'Full 24/7 Unlimited Gym Floor Access',
      'Unlimited Group Zumba & HIIT Classes',
      '1 Free 1-on-1 Personal Training Session/Mo',
      'Recovery Zone & Foam Rolling Station',
      'Bi-Weekly In-Body Composition Scans',
      'Complimentary Guest Pass (1 per month)',
    ],
    created_at: new Date(Date.now() - 90 * 86400000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'plan-vip-365',
    name: 'VIP Private Coaching (Annual)',
    description: 'The complete high-performance transformation protocol with direct mentorship.',
    duration_days: 365,
    price: 35990,
    currency: 'INR',
    is_active: true,
    features: [
      'Everything Included in Elite Tier',
      'Weekly 1-on-1 Dedicated Coach Mentorship',
      'Customized Metabolic Nutrition & Macro Plan',
      'Priority Class Reservation Privileges',
      'Direct WhatsApp Coach Check-in Support',
      'Free Elite Gym Performance Apparel Pack',
    ],
    created_at: new Date(Date.now() - 90 * 86400000).toISOString(),
    updated_at: new Date().toISOString(),
  },
];

const initialSeedProfiles: Profile[] = [
  {
    id: 'user-owner-001',
    full_name: 'Vikram Singh (Head Coach & Owner)',
    email: 'owner@elitegym.com',
    phone: '+91 90655 16492',
    avatar_url: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=200&auto=format&fit=crop',
    role: 'owner',
    is_active: true,
    emergency_contact: '+91 98765 43210',
    fitness_goals: 'Maintain facility excellence & elite coaching standards.',
    created_at: new Date(Date.now() - 180 * 86400000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'user-member-001',
    full_name: 'Rahul Sharma',
    email: 'rahul@elitegym.com',
    phone: '+91 98350 11223',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    role: 'member',
    is_active: true,
    emergency_contact: 'Sunita Sharma (+91 98350 99887)',
    fitness_goals: 'Build lean muscle mass and improve deadlift 1RM from 140kg to 180kg.',
    created_at: new Date(Date.now() - 60 * 86400000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'user-member-002',
    full_name: 'Priya Patel',
    email: 'priya@elitegym.com',
    phone: '+91 94312 44556',
    avatar_url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop',
    role: 'member',
    is_active: true,
    emergency_contact: 'Amit Patel (+91 94312 77889)',
    fitness_goals: 'Tone up with high-intensity Zumba and cardiovascular conditioning.',
    created_at: new Date(Date.now() - 26 * 86400000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'user-member-003',
    full_name: 'Amit Verma',
    email: 'amit@elitegym.com',
    phone: '+91 91234 56789',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    role: 'member',
    is_active: true,
    emergency_contact: 'Pooja Verma (+91 91234 11223)',
    fitness_goals: 'Weight loss and functional mobility training.',
    created_at: new Date(Date.now() - 45 * 86400000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'user-member-004',
    full_name: 'Neha Gupta',
    email: 'neha@elitegym.com',
    phone: '+91 97711 22334',
    avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
    role: 'member',
    is_active: false,
    emergency_contact: 'Karan Gupta (+91 97711 99887)',
    fitness_goals: 'Rehabilitation following shoulder injury.',
    created_at: new Date(Date.now() - 75 * 86400000).toISOString(),
    updated_at: new Date().toISOString(),
  },
];

// Helper to format Date as YYYY-MM-DD
export function formatDateYMD(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

const todayYMD = formatDateYMD(new Date());

const initialSeedMemberships: Membership[] = [
  {
    id: 'mship-rahul-001',
    member_id: 'user-member-001',
    plan_id: 'plan-elite-90',
    plan_name_snapshot: 'Elite Transformation (Quarterly)',
    price_snapshot: 5099,
    duration_days_snapshot: 90,
    start_date: formatDateYMD(new Date(Date.now() - 48 * 86400000)),
    expiry_date: formatDateYMD(new Date(Date.now() + 42 * 86400000)), // Active: 42 days left
    status: 'active',
    created_at: new Date(Date.now() - 48 * 86400000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'mship-priya-001',
    member_id: 'user-member-002',
    plan_id: 'plan-starter-30',
    plan_name_snapshot: 'Starter Track (Monthly)',
    price_snapshot: 999,
    duration_days_snapshot: 30,
    start_date: formatDateYMD(new Date(Date.now() - 26 * 86400000)),
    expiry_date: formatDateYMD(new Date(Date.now() + 4 * 86400000)), // Expiring soon: 4 days left
    status: 'expiring_soon',
    created_at: new Date(Date.now() - 26 * 86400000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'mship-amit-001',
    member_id: 'user-member-003',
    plan_id: 'plan-starter-30',
    plan_name_snapshot: 'Starter Track (Monthly)',
    price_snapshot: 999,
    duration_days_snapshot: 30,
    start_date: formatDateYMD(new Date(Date.now() - 42 * 86400000)),
    expiry_date: formatDateYMD(new Date(Date.now() - 12 * 86400000)), // Expired 12 days ago
    status: 'expired',
    created_at: new Date(Date.now() - 42 * 86400000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'mship-neha-001',
    member_id: 'user-member-004',
    plan_id: 'plan-elite-90',
    plan_name_snapshot: 'Elite Transformation (Quarterly)',
    price_snapshot: 5099,
    duration_days_snapshot: 90,
    start_date: formatDateYMD(new Date(Date.now() - 60 * 86400000)),
    expiry_date: formatDateYMD(new Date(Date.now() + 30 * 86400000)),
    status: 'suspended',
    created_at: new Date(Date.now() - 60 * 86400000).toISOString(),
    updated_at: new Date().toISOString(),
  },
];

// Seed attendance for Rahul (regular athlete, high streak starting from yesterday)
const rahulAttendanceDates = [
  1, 2, 3, 5, 6, 7, 9, 10, 11, 12, 14, 15, 16, 18, 19, 20, 22, 23, 24, 25
].map((daysAgo) => formatDateYMD(new Date(Date.now() - daysAgo * 86400000)));

const initialSeedAttendance: Attendance[] = [
  ...rahulAttendanceDates.map((dateStr, idx) => ({
    id: `att-rahul-${idx}`,
    member_id: 'user-member-001',
    check_in_at: new Date(`${dateStr}T06:45:00+05:30`).toISOString(),
    gym_local_date: dateStr,
    source: 'qr_entrance',
    created_at: new Date(`${dateStr}T06:45:00+05:30`).toISOString(),
  })),
  {
    id: 'att-priya-01',
    member_id: 'user-member-002',
    check_in_at: new Date(Date.now() - 1 * 86400000).toISOString(),
    gym_local_date: formatDateYMD(new Date(Date.now() - 1 * 86400000)),
    source: 'qr_entrance',
    created_at: new Date(Date.now() - 1 * 86400000).toISOString(),
  },
];

const initialSeedPayments: Payment[] = [
  {
    id: 'pay-rahul-001',
    member_id: 'user-member-001',
    membership_id: 'mship-rahul-001',
    amount: 5099,
    currency: 'INR',
    payment_method: 'upi',
    status: 'completed',
    transaction_reference: 'UPI/2026/8947291',
    paid_at: new Date(Date.now() - 48 * 86400000).toISOString(),
    recorded_by: 'user-owner-001',
    notes: 'Paid via PhonePe at front desk reception.',
    created_at: new Date(Date.now() - 48 * 86400000).toISOString(),
  },
  {
    id: 'pay-priya-001',
    member_id: 'user-member-002',
    membership_id: 'mship-priya-001',
    amount: 999,
    currency: 'INR',
    payment_method: 'cash',
    status: 'completed',
    transaction_reference: 'CASH-REC-042',
    paid_at: new Date(Date.now() - 26 * 86400000).toISOString(),
    recorded_by: 'user-owner-001',
    notes: 'Cash received at desk.',
    created_at: new Date(Date.now() - 26 * 86400000).toISOString(),
  },
];

const initialSeedProgress: ProgressLog[] = [
  {
    id: 'prog-rahul-01',
    member_id: 'user-member-001',
    recorded_at: formatDateYMD(new Date(Date.now() - 45 * 86400000)),
    weight_kg: 82.5,
    body_fat_percentage: 19.8,
    chest_cm: 104,
    waist_cm: 88,
    arms_cm: 37,
    notes: 'Baseline assessment on joining Elite.',
    created_at: new Date(Date.now() - 45 * 86400000).toISOString(),
  },
  {
    id: 'prog-rahul-02',
    member_id: 'user-member-001',
    recorded_at: formatDateYMD(new Date(Date.now() - 20 * 86400000)),
    weight_kg: 80.2,
    body_fat_percentage: 17.5,
    chest_cm: 105.5,
    waist_cm: 85,
    arms_cm: 38,
    notes: 'Significant improvement in strength & waist reduction.',
    created_at: new Date(Date.now() - 20 * 86400000).toISOString(),
  },
  {
    id: 'prog-rahul-03',
    member_id: 'user-member-001',
    recorded_at: formatDateYMD(new Date(Date.now() - 2 * 86400000)),
    weight_kg: 78.8,
    body_fat_percentage: 15.8,
    chest_cm: 106.5,
    waist_cm: 82.5,
    arms_cm: 39.2,
    notes: 'Vascularity showing, high endurance during deadlift sets.',
    created_at: new Date(Date.now() - 2 * 86400000).toISOString(),
  },
];

const initialSeedWorkouts: WorkoutPlan[] = [
  {
    id: 'workout-rahul-01',
    member_id: 'user-member-001',
    name: 'Push / Pull / Legs Hypertrophy Split',
    description: '4-day powerbuilding routine emphasizing progressive overload on barbell compounds.',
    difficulty: 'intermediate',
    schedule_days: ['Monday', 'Tuesday', 'Thursday', 'Friday'],
    exercises: [
      { name: 'Barbell Flat Bench Press', sets: 4, reps: '6-8', target_muscle: 'Chest', notes: 'Warm up thoroughly. RPE 8.' },
      { name: 'Incline Dumbbell Press', sets: 3, reps: '8-10', target_muscle: 'Upper Chest', notes: '30 degree bench angle.' },
      { name: 'Barbell Conventional Deadlift', sets: 4, reps: '5', target_muscle: 'Posterior Chain', notes: 'Reset between reps. Chalk permitted.' },
      { name: 'Barbell Back Squats', sets: 4, reps: '6-8', target_muscle: 'Quadriceps', notes: 'Full depth below parallel.' },
      { name: 'Overhead Barbell Military Press', sets: 3, reps: '8-10', target_muscle: 'Shoulders', notes: 'Core engaged tight.' },
      { name: 'Weighted Pull-Ups', sets: 3, reps: 'AMRAP', target_muscle: 'Lats & Back', notes: 'Slow negative control.' },
    ],
    created_at: new Date(Date.now() - 40 * 86400000).toISOString(),
  },
];

const initialSeedNotifications: NotificationItem[] = [
  {
    id: 'notif-rahul-01',
    recipient_id: 'user-member-001',
    title: 'Membership Active: 42 Days Left',
    body: 'Your Elite Transformation pass is active until your next renewal date. Keep crushing it!',
    type: 'renewal_confirmed',
    read_at: new Date(Date.now() - 10 * 86400000).toISOString(),
    created_at: new Date(Date.now() - 10 * 86400000).toISOString(),
  },
  {
    id: 'notif-rahul-02',
    recipient_id: 'user-member-001',
    title: 'New PR Logged! 🔥',
    body: 'Your attendance streak reached 5 consecutive workouts this week. Outstanding commitment.',
    type: 'attendance_success',
    read_at: null,
    created_at: new Date(Date.now() - 1 * 86400000).toISOString(),
  },
  {
    id: 'notif-priya-01',
    recipient_id: 'user-member-002',
    title: 'Membership Expiring Soon ⚠️',
    body: 'Your Starter Track plan expires in 4 days. Contact the front desk to renew without interruption.',
    type: 'membership_expiring',
    read_at: null,
    created_at: new Date(Date.now() - 1 * 86400000).toISOString(),
  },
];

const initialSeedAnnouncements: Announcement[] = [
  {
    id: 'ann-01',
    title: 'Special Sunday Power Zumba Masterclass with Coach Vikram',
    body: 'Join us this Sunday at 8:00 AM on the 5th floor main studio for an electrifying 90-minute high-tempo session!',
    target_group: 'all',
    sent_by: 'user-owner-001',
    created_at: new Date(Date.now() - 3 * 86400000).toISOString(),
  },
];

// Database state accessor with auto-initialization
class LocalGymDatabase {
  private state: LocalDatabaseState;

  constructor() {
    this.state = this.loadState();
  }

  private loadState(): LocalDatabaseState {
    try {
      if (typeof localStorage !== 'undefined') {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          return JSON.parse(stored);
        }
      }
    } catch {
      // In SSR or if localStorage disabled, fall back to in-memory
    }
    const freshState: LocalDatabaseState = {
      profiles: JSON.parse(JSON.stringify(initialSeedProfiles)),
      plans: JSON.parse(JSON.stringify(initialSeedPlans)),
      memberships: JSON.parse(JSON.stringify(initialSeedMemberships)),
      attendance: JSON.parse(JSON.stringify(initialSeedAttendance)),
      payments: JSON.parse(JSON.stringify(initialSeedPayments)),
      progress: JSON.parse(JSON.stringify(initialSeedProgress)),
      workouts: JSON.parse(JSON.stringify(initialSeedWorkouts)),
      notifications: JSON.parse(JSON.stringify(initialSeedNotifications)),
      announcements: JSON.parse(JSON.stringify(initialSeedAnnouncements)),
      currentUserId: 'user-member-001', // Default authenticated member for instant testability
    };
    this.saveState(freshState);
    return freshState;
  }

  private saveState(state: LocalDatabaseState = this.state) {
    this.state = state;
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      }
    } catch {
      // Ignore in SSR / Node
    }
  }

  public resetToDefault() {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // Ignore
    }
    this.state = this.loadState();
    return this.state;
  }

  // --- AUTHENTICATION ---
  public getCurrentUser(): Profile | null {
    if (!this.state.currentUserId) return null;
    return this.state.profiles.find((p) => p.id === this.state.currentUserId) || null;
  }

  public setCurrentUser(userId: string | null) {
    this.state.currentUserId = userId;
    this.saveState();
  }

  public loginWithEmail(email: string): { success: boolean; user?: Profile; error?: string } {
    const normalized = email.trim().toLowerCase();
    const found = this.state.profiles.find((p) => p.email.toLowerCase() === normalized);
    if (!found) {
      return { success: false, error: 'Invalid credentials. User with this email does not exist.' };
    }
    if (!found.is_active) {
      return { success: false, error: 'This account has been deactivated. Please contact gym management.' };
    }
    this.setCurrentUser(found.id);
    return { success: true, user: found };
  }

  public logout() {
    this.setCurrentUser(null);
  }

  // --- PROFILES ---
  public getProfile(userId: string): Profile | null {
    return this.state.profiles.find((p) => p.id === userId) || null;
  }

  public updateProfile(
    userId: string,
    updates: Partial<Pick<Profile, 'full_name' | 'phone' | 'emergency_contact' | 'fitness_goals' | 'avatar_url'>>
  ): Profile {
    const profile = this.getProfile(userId);
    if (!profile) throw new Error('Profile not found.');

    Object.assign(profile, updates, { updated_at: new Date().toISOString() });
    this.saveState();
    return profile;
  }

  // --- MEMBERSHIPS & PLANS ---
  public getPlans(): MembershipPlan[] {
    return this.state.plans.filter((p) => p.is_active);
  }

  public getAllPlans(): MembershipPlan[] {
    return this.state.plans;
  }

  public createPlan(plan: Omit<MembershipPlan, 'id' | 'created_at' | 'updated_at'>): MembershipPlan {
    const newPlan: MembershipPlan = {
      ...plan,
      id: `plan-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    this.state.plans.push(newPlan);
    this.saveState();
    return newPlan;
  }

  public updatePlan(id: string, updates: Partial<MembershipPlan>): MembershipPlan {
    const p = this.state.plans.find((plan) => plan.id === id);
    if (!p) throw new Error('Plan not found.');
    Object.assign(p, updates, { updated_at: new Date().toISOString() });
    this.saveState();
    return p;
  }

  public getMemberCurrentMembership(memberId: string): Membership | null {
    const list = this.state.memberships
      .filter((m) => m.member_id === memberId)
      .sort((a, b) => new Date(b.expiry_date).getTime() - new Date(a.expiry_date).getTime());

    if (!list.length) return null;
    const current = list[0];

    // Compute dynamic status relative to today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const expiry = new Date(current.expiry_date);
    expiry.setHours(0, 0, 0, 0);

    const diffDays = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    if (current.status !== 'suspended' && current.status !== 'cancelled') {
      if (diffDays < 0) {
        current.status = 'expired';
      } else if (diffDays <= 7) {
        current.status = 'expiring_soon';
      } else {
        current.status = 'active';
      }
    }

    return current;
  }

  public getMembershipHistory(memberId: string): Membership[] {
    return this.state.memberships
      .filter((m) => m.member_id === memberId)
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }

  public assignMembership(
    memberId: string,
    planId: string,
    startDateStr?: string,
    paymentMethod: Payment['payment_method'] = 'cash'
  ): { membership: Membership; payment: Payment } {
    const plan = this.state.plans.find((p) => p.id === planId);
    if (!plan) throw new Error('Selected plan does not exist.');

    const start = startDateStr ? new Date(startDateStr) : new Date();
    const expiry = new Date(start);
    expiry.setDate(expiry.getDate() + plan.duration_days);

    const newMembership: Membership = {
      id: `mship-${Date.now()}`,
      member_id: memberId,
      plan_id: plan.id,
      plan_name_snapshot: plan.name,
      price_snapshot: plan.price,
      duration_days_snapshot: plan.duration_days,
      start_date: formatDateYMD(start),
      expiry_date: formatDateYMD(expiry),
      status: 'active',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    this.state.memberships.push(newMembership);

    // Record verified payment
    const payment: Payment = {
      id: `pay-${Date.now()}`,
      member_id: memberId,
      membership_id: newMembership.id,
      amount: plan.price,
      currency: plan.currency,
      payment_method: paymentMethod,
      status: 'completed',
      transaction_reference: `MANUAL-${Date.now().toString().slice(-6)}`,
      paid_at: new Date().toISOString(),
      recorded_by: this.state.currentUserId || 'owner',
      notes: `Assigned plan ${plan.name}`,
      created_at: new Date().toISOString(),
    };
    this.state.payments.push(payment);

    // Add notification
    this.addNotification({
      recipient_id: memberId,
      title: 'Membership Activated! 🎟️',
      body: `Your ${plan.name} is now active through ${formatDateYMD(expiry)}.`,
      type: 'renewal_confirmed',
    });

    this.saveState();
    return { membership: newMembership, payment };
  }

  public renewMembership(
    memberId: string,
    planId: string,
    paymentMethod: Payment['payment_method'] = 'cash'
  ): { membership: Membership; payment: Payment } {
    const current = this.getMemberCurrentMembership(memberId);
    const plan = this.state.plans.find((p) => p.id === planId);
    if (!plan) throw new Error('Selected plan does not exist.');

    let start = new Date();
    // Rule: If currently active, extend from current expiry. If expired, renew from today.
    if (current && new Date(current.expiry_date) > new Date()) {
      start = new Date(current.expiry_date);
      start.setDate(start.getDate() + 1); // Next day after expiry
    }

    const expiry = new Date(start);
    expiry.setDate(expiry.getDate() + plan.duration_days);

    const renewedMembership: Membership = {
      id: `mship-${Date.now()}`,
      member_id: memberId,
      plan_id: plan.id,
      plan_name_snapshot: plan.name,
      price_snapshot: plan.price,
      duration_days_snapshot: plan.duration_days,
      start_date: formatDateYMD(start),
      expiry_date: formatDateYMD(expiry),
      status: 'active',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    this.state.memberships.push(renewedMembership);

    const payment: Payment = {
      id: `pay-${Date.now()}`,
      member_id: memberId,
      membership_id: renewedMembership.id,
      amount: plan.price,
      currency: plan.currency,
      payment_method: paymentMethod,
      status: 'completed',
      transaction_reference: `RENEW-${Date.now().toString().slice(-6)}`,
      paid_at: new Date().toISOString(),
      recorded_by: this.state.currentUserId || 'owner',
      notes: `Renewed membership for ${plan.name}`,
      created_at: new Date().toISOString(),
    };
    this.state.payments.push(payment);

    this.addNotification({
      recipient_id: memberId,
      title: 'Membership Renewed Successfully! 🎉',
      body: `Your ${plan.name} has been extended to ${formatDateYMD(expiry)}. Thank you for training with Elite!`,
      type: 'renewal_confirmed',
    });

    this.saveState();
    return { membership: renewedMembership, payment };
  }

  public setMembershipStatus(membershipId: string, status: Membership['status']) {
    const m = this.state.memberships.find((item) => item.id === membershipId);
    if (!m) throw new Error('Membership not found.');
    m.status = status;
    m.updated_at = new Date().toISOString();
    this.saveState();
    return m;
  }

  // --- ATTENDANCE & QR CHECK-IN ---
  public checkInMember(
    memberId: string,
    timezone = 'Asia/Kolkata',
    source = 'qr_entrance'
  ): CheckInResult {
    const profile = this.getProfile(memberId);
    if (!profile) {
      return { success: false, code: 'ACCOUNT_NOT_FOUND', message: 'Member profile does not exist.' };
    }
    if (!profile.is_active) {
      return { success: false, code: 'ACCOUNT_INACTIVE', message: 'Account is deactivated. Please contact gym desk.' };
    }

    const membership = this.getMemberCurrentMembership(memberId);
    if (!membership) {
      return { success: false, code: 'NO_MEMBERSHIP', message: 'No active gym membership found on your account.' };
    }
    if (membership.status === 'suspended') {
      return { success: false, code: 'MEMBERSHIP_SUSPENDED', message: 'Membership is currently suspended. Please see the front desk.' };
    }
    if (membership.status === 'expired') {
      return { success: false, code: 'MEMBERSHIP_EXPIRED', message: `Membership expired on ${membership.expiry_date}. Please renew to check in.` };
    }

    const todayStr = formatDateYMD(new Date());

    // Duplicate check on same gym-local date
    const already = this.state.attendance.find(
      (a) => a.member_id === memberId && a.gym_local_date === todayStr
    );
    if (already) {
      return {
        success: false,
        code: 'ALREADY_CHECKED_IN',
        message: `You have already checked in today (${todayStr}). One check-in per day allowed.`,
        attendance_id: already.id,
        date: todayStr,
      };
    }

    // Atomic insertion
    const newAttendance: Attendance = {
      id: `att-${Date.now()}`,
      member_id: memberId,
      check_in_at: new Date().toISOString(),
      gym_local_date: todayStr,
      source,
      created_at: new Date().toISOString(),
    };
    this.state.attendance.unshift(newAttendance);

    // In-app notification
    this.addNotification({
      recipient_id: memberId,
      title: 'Attendance Confirmed! 💪',
      body: `Check-in recorded for ${todayStr} at ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}. Enjoy your session!`,
      type: 'attendance_success',
    });

    this.saveState();
    return {
      success: true,
      code: 'SUCCESS',
      message: 'Attendance recorded successfully! Welcome to Elite Fitness.',
      attendance_id: newAttendance.id,
      date: todayStr,
    };
  }

  public getAttendanceHistory(memberId: string): Attendance[] {
    return this.state.attendance
      .filter((a) => a.member_id === memberId)
      .sort((a, b) => new Date(b.check_in_at).getTime() - new Date(a.check_in_at).getTime());
  }

  public getAllAttendance(): Attendance[] {
    return this.state.attendance.sort(
      (a, b) => new Date(b.check_in_at).getTime() - new Date(a.check_in_at).getTime()
    );
  }

  public getAttendanceStreak(memberId: string): number {
    const list = this.getAttendanceHistory(memberId);
    if (!list.length) return 0;

    const uniqueDates = Array.from(new Set(list.map((a) => a.gym_local_date))).sort().reverse();
    const todayStr = formatDateYMD(new Date());
    const yesterdayStr = formatDateYMD(new Date(Date.now() - 86400000));

    // If neither today nor yesterday is present, streak is 0
    if (uniqueDates[0] !== todayStr && uniqueDates[0] !== yesterdayStr) {
      return 0;
    }

    let streak = 0;
    let expectedDate = new Date(uniqueDates[0]);

    for (const dStr of uniqueDates) {
      const actualDate = new Date(dStr);
      const diffDays = Math.round(
        (expectedDate.getTime() - actualDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (diffDays === 0) {
        streak++;
        expectedDate.setDate(expectedDate.getDate() - 1);
      } else {
        break;
      }
    }
    return streak;
  }

  public getMonthlyVisits(memberId: string): number {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    return this.state.attendance.filter((a) => {
      if (a.member_id !== memberId) return false;
      const d = new Date(a.gym_local_date);
      return d.getFullYear() === currentYear && d.getMonth() === currentMonth;
    }).length;
  }

  // --- PROGRESS TRACKING ---
  public getProgressLogs(memberId: string): ProgressLog[] {
    return this.state.progress
      .filter((p) => p.member_id === memberId)
      .sort((a, b) => new Date(b.recorded_at).getTime() - new Date(a.recorded_at).getTime());
  }

  public addProgressLog(
    log: Omit<ProgressLog, 'id' | 'created_at'>
  ): ProgressLog {
    const newLog: ProgressLog = {
      ...log,
      id: `prog-${Date.now()}`,
      created_at: new Date().toISOString(),
    };
    this.state.progress.unshift(newLog);
    this.saveState();
    return newLog;
  }

  public deleteProgressLog(logId: string) {
    this.state.progress = this.state.progress.filter((p) => p.id !== logId);
    this.saveState();
  }

  // --- WORKOUT PLANS ---
  public getWorkoutPlan(memberId: string): WorkoutPlan | null {
    return (
      this.state.workouts.find((w) => w.member_id === memberId) ||
      this.state.workouts[0] ||
      null
    );
  }

  // --- NOTIFICATIONS & ANNOUNCEMENTS ---
  public getNotifications(recipientId: string): NotificationItem[] {
    return this.state.notifications
      .filter((n) => n.recipient_id === recipientId)
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }

  public markNotificationRead(id: string) {
    const n = this.state.notifications.find((notif) => notif.id === id);
    if (n) {
      n.read_at = new Date().toISOString();
      this.saveState();
    }
  }

  public markAllNotificationsRead(recipientId: string) {
    const nowStr = new Date().toISOString();
    this.state.notifications.forEach((n) => {
      if (n.recipient_id === recipientId && !n.read_at) {
        n.read_at = nowStr;
      }
    });
    this.saveState();
  }

  public addNotification(
    item: Omit<NotificationItem, 'id' | 'read_at' | 'created_at'>
  ): NotificationItem {
    const newNotif: NotificationItem = {
      ...item,
      id: `notif-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      read_at: null,
      created_at: new Date().toISOString(),
    };
    this.state.notifications.unshift(newNotif);
    this.saveState();
    return newNotif;
  }

  public sendAnnouncement(
    title: string,
    body: string,
    targetGroup: Announcement['target_group'] = 'all'
  ): Announcement {
    const announcement: Announcement = {
      id: `ann-${Date.now()}`,
      title,
      body,
      target_group: targetGroup,
      sent_by: this.state.currentUserId,
      created_at: new Date().toISOString(),
    };
    this.state.announcements.unshift(announcement);

    // Deliver internal notifications to target member profiles
    let recipients = this.state.profiles.filter((p) => p.role === 'member' && p.is_active);

    if (targetGroup === 'active') {
      recipients = recipients.filter((p) => {
        const m = this.getMemberCurrentMembership(p.id);
        return m && (m.status === 'active' || m.status === 'expiring_soon');
      });
    } else if (targetGroup === 'expiring_soon') {
      recipients = recipients.filter((p) => {
        const m = this.getMemberCurrentMembership(p.id);
        return m && m.status === 'expiring_soon';
      });
    }

    recipients.forEach((member) => {
      this.addNotification({
        recipient_id: member.id,
        title: `📢 ${title}`,
        body,
        type: 'announcement',
      });
    });

    this.saveState();
    return announcement;
  }

  // --- PAYMENTS ---
  public getPayments(): Payment[] {
    return this.state.payments.sort(
      (a, b) => new Date(b.paid_at).getTime() - new Date(a.paid_at).getTime()
    );
  }

  public recordPayment(payment: Omit<Payment, 'id' | 'created_at'>): Payment {
    const newPay: Payment = {
      ...payment,
      id: `pay-${Date.now()}`,
      created_at: new Date().toISOString(),
    };
    this.state.payments.unshift(newPay);
    this.saveState();
    return newPay;
  }

  // --- OWNER AGGREGATED METRICS ---
  public getOwnerMetrics(): OwnerMetrics {
    const todayStr = formatDateYMD(new Date());
    const members = this.state.profiles.filter((p) => p.role === 'member');
    let active = 0;
    let expiring = 0;
    let expired = 0;

    members.forEach((m) => {
      const mship = this.getMemberCurrentMembership(m.id);
      if (!mship) {
        expired++;
      } else if (mship.status === 'active') {
        active++;
      } else if (mship.status === 'expiring_soon') {
        active++;
        expiring++;
      } else if (mship.status === 'expired') {
        expired++;
      }
    });

    const todayCheckins = this.state.attendance.filter(
      (a) => a.gym_local_date === todayStr
    ).length;

    // Monthly revenue
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();

    const monthRevenue = this.state.payments
      .filter((p) => {
        if (p.status !== 'completed') return false;
        const d = new Date(p.paid_at);
        return d.getFullYear() === currentYear && d.getMonth() === currentMonth;
      })
      .reduce((sum, p) => sum + Number(p.amount), 0);

    return {
      total_members: members.length,
      active_members: active,
      expiring_soon: expiring,
      expired_members: expired,
      today_checkins: todayCheckins,
      month_revenue: monthRevenue,
      calculated_at: new Date().toISOString(),
    };
  }

  public getAllMembersWithDetails() {
    const members = this.state.profiles.filter((p) => p.role === 'member');
    return members.map((m) => {
      const membership = this.getMemberCurrentMembership(m.id);
      const attendance = this.getAttendanceHistory(m.id);
      const latestAttendance = attendance[0] || null;
      const streak = this.getAttendanceStreak(m.id);
      const monthlyVisits = this.getMonthlyVisits(m.id);

      let remainingDays = 0;
      if (membership) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const exp = new Date(membership.expiry_date);
        exp.setHours(0, 0, 0, 0);
        remainingDays = Math.ceil((exp.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      }

      return {
        profile: m,
        membership,
        latestAttendance,
        streak,
        monthlyVisits,
        remainingDays,
      };
    });
  }

  public createMember(data: {
    full_name: string;
    email: string;
    phone?: string;
    plan_id?: string;
    payment_method?: Payment['payment_method'];
  }): Profile {
    const existing = this.state.profiles.find(
      (p) => p.email.toLowerCase() === data.email.trim().toLowerCase()
    );
    if (existing) {
      throw new Error('A user with this email address already exists.');
    }

    const newId = `user-member-${Date.now()}`;
    const newProfile: Profile = {
      id: newId,
      full_name: data.full_name.trim(),
      email: data.email.trim().toLowerCase(),
      phone: data.phone?.trim() || null,
      role: 'member',
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    this.state.profiles.push(newProfile);

    if (data.plan_id) {
      this.assignMembership(newId, data.plan_id, undefined, data.payment_method || 'cash');
    }

    this.saveState();
    return newProfile;
  }
}

// Global Singleton for database operations
export const gymDb = new LocalGymDatabase();
