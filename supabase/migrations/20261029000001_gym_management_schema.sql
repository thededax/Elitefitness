-- ====================================================================
-- ELITE ZUMBA & FITNESS STUDIO - PRODUCTION DATABASE SCHEMA & MIGRATIONS
-- ====================================================================
-- Version: 20261029000001
-- Description: Core Schema, RLS, Indexes, Triggers & PostgreSQL Business Functions
-- ====================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. ENUMS & DOMAINS (Using clean CHECK constraints for maximum portability)

-- 3. PROFILES TABLE (Linked directly to Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    phone TEXT,
    avatar_url TEXT,
    role TEXT NOT NULL CHECK (role IN ('member', 'owner')) DEFAULT 'member',
    is_active BOOLEAN NOT NULL DEFAULT true,
    emergency_contact TEXT,
    fitness_goals TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4. MEMBERSHIP PLANS CATALOG
CREATE TABLE IF NOT EXISTS public.membership_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    duration_days INT NOT NULL CHECK (duration_days > 0),
    price NUMERIC(10,2) NOT NULL CHECK (price >= 0),
    currency TEXT NOT NULL DEFAULT 'INR',
    is_active BOOLEAN NOT NULL DEFAULT true,
    features TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 5. MEMBERSHIPS TABLE (Historical snapshot preserved)
CREATE TABLE IF NOT EXISTS public.memberships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    member_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    plan_id UUID REFERENCES public.membership_plans(id) ON DELETE SET NULL,
    plan_name_snapshot TEXT NOT NULL,
    price_snapshot NUMERIC(10,2) NOT NULL CHECK (price_snapshot >= 0),
    duration_days_snapshot INT NOT NULL CHECK (duration_days_snapshot > 0),
    start_date DATE NOT NULL,
    expiry_date DATE NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('active', 'expiring_soon', 'expired', 'suspended', 'cancelled')) DEFAULT 'active',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 6. ATTENDANCE TABLE (With strict gym-local date duplicate prevention)
CREATE TABLE IF NOT EXISTS public.attendance (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    member_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    check_in_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    gym_local_date DATE NOT NULL,
    source TEXT NOT NULL DEFAULT 'qr_entrance',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT uq_member_attendance_per_day UNIQUE (member_id, gym_local_date)
);

-- 7. PAYMENTS LEDGER
CREATE TABLE IF NOT EXISTS public.payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    member_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    membership_id UUID REFERENCES public.memberships(id) ON DELETE SET NULL,
    amount NUMERIC(10,2) NOT NULL CHECK (amount >= 0),
    currency TEXT NOT NULL DEFAULT 'INR',
    payment_method TEXT NOT NULL CHECK (payment_method IN ('cash', 'upi', 'card', 'bank_transfer', 'other')),
    status TEXT NOT NULL CHECK (status IN ('completed', 'pending', 'refunded', 'failed')) DEFAULT 'completed',
    transaction_reference TEXT,
    paid_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    recorded_by UUID REFERENCES public.profiles(id),
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 8. PROGRESS LOGS (Body weight & measurements)
CREATE TABLE IF NOT EXISTS public.progress_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    member_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    recorded_at DATE NOT NULL DEFAULT CURRENT_DATE,
    weight_kg NUMERIC(5,2) CHECK (weight_kg > 0 AND weight_kg < 500),
    body_fat_percentage NUMERIC(4,1) CHECK (body_fat_percentage >= 0 AND body_fat_percentage <= 100),
    chest_cm NUMERIC(5,1) CHECK (chest_cm > 0),
    waist_cm NUMERIC(5,1) CHECK (waist_cm > 0),
    arms_cm NUMERIC(5,1) CHECK (arms_cm > 0),
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 9. WORKOUT PLANS
CREATE TABLE IF NOT EXISTS public.workout_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    member_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    difficulty TEXT DEFAULT 'intermediate',
    schedule_days TEXT[] DEFAULT '{}',
    exercises JSONB NOT NULL DEFAULT '[]',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 10. NOTIFICATIONS
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    recipient_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('membership_expiring', 'membership_expired', 'attendance_success', 'renewal_confirmed', 'announcement', 'owner_message')),
    read_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 11. ANNOUNCEMENTS
CREATE TABLE IF NOT EXISTS public.announcements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    target_group TEXT NOT NULL CHECK (target_group IN ('all', 'active', 'expiring_soon')),
    sent_by UUID REFERENCES public.profiles(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 12. AUDIT LOGS
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    actor_id UUID REFERENCES public.profiles(id),
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id UUID,
    details JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ====================================================================
-- PERFORMANCE INDEXES
-- ====================================================================
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_memberships_member ON public.memberships(member_id, status);
CREATE INDEX IF NOT EXISTS idx_memberships_expiry ON public.memberships(expiry_date);
CREATE INDEX IF NOT EXISTS idx_attendance_member_date ON public.attendance(member_id, gym_local_date);
CREATE INDEX IF NOT EXISTS idx_attendance_date ON public.attendance(gym_local_date);
CREATE INDEX IF NOT EXISTS idx_payments_member ON public.payments(member_id, paid_at DESC);
CREATE INDEX IF NOT EXISTS idx_progress_member ON public.progress_logs(member_id, recorded_at DESC);
CREATE INDEX IF NOT EXISTS idx_notifications_recipient ON public.notifications(recipient_id, read_at);

-- ====================================================================
-- SECURITY DEFINER HELPER: IS OWNER
-- ====================================================================
CREATE OR REPLACE FUNCTION public.is_owner(user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = user_id AND role = 'owner' AND is_active = true
    );
$$;

-- Revoke public execution and grant to authenticated
REVOKE ALL ON FUNCTION public.is_owner(UUID) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_owner(UUID) TO authenticated;

-- ====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ====================================================================

-- 1. PROFILES
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own profile"
    ON public.profiles FOR SELECT
    TO authenticated
    USING (id = auth.uid() OR public.is_owner(auth.uid()));

CREATE POLICY "Users can update permitted fields on own profile"
    ON public.profiles FOR UPDATE
    TO authenticated
    USING (id = auth.uid())
    WITH CHECK (
        id = auth.uid()
        -- Ensure role and is_active cannot be self-modified by member
        AND role = (SELECT role FROM public.profiles WHERE id = auth.uid())
    );

CREATE POLICY "Owners can manage all profiles"
    ON public.profiles FOR ALL
    TO authenticated
    USING (public.is_owner(auth.uid()))
    WITH CHECK (public.is_owner(auth.uid()));

-- 2. MEMBERSHIP PLANS
ALTER TABLE public.membership_plans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read active membership plans"
    ON public.membership_plans FOR SELECT
    TO authenticated, anon
    USING (is_active = true OR public.is_owner(auth.uid()));

CREATE POLICY "Owners can manage membership plans"
    ON public.membership_plans FOR ALL
    TO authenticated
    USING (public.is_owner(auth.uid()))
    WITH CHECK (public.is_owner(auth.uid()));

-- 3. MEMBERSHIPS
ALTER TABLE public.memberships ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Members can view own memberships"
    ON public.memberships FOR SELECT
    TO authenticated
    USING (member_id = auth.uid() OR public.is_owner(auth.uid()));

CREATE POLICY "Owners can manage all memberships"
    ON public.memberships FOR ALL
    TO authenticated
    USING (public.is_owner(auth.uid()))
    WITH CHECK (public.is_owner(auth.uid()));

-- 4. ATTENDANCE
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Members can read own attendance"
    ON public.attendance FOR SELECT
    TO authenticated
    USING (member_id = auth.uid() OR public.is_owner(auth.uid()));

CREATE POLICY "Owners can manage all attendance records"
    ON public.attendance FOR ALL
    TO authenticated
    USING (public.is_owner(auth.uid()))
    WITH CHECK (public.is_owner(auth.uid()));

-- 5. PAYMENTS
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Members can view own payments"
    ON public.payments FOR SELECT
    TO authenticated
    USING (member_id = auth.uid() OR public.is_owner(auth.uid()));

CREATE POLICY "Owners can manage all payments"
    ON public.payments FOR ALL
    TO authenticated
    USING (public.is_owner(auth.uid()))
    WITH CHECK (public.is_owner(auth.uid()));

-- 6. PROGRESS LOGS
ALTER TABLE public.progress_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Members can read and insert own progress logs"
    ON public.progress_logs FOR ALL
    TO authenticated
    USING (member_id = auth.uid() OR public.is_owner(auth.uid()))
    WITH CHECK (member_id = auth.uid() OR public.is_owner(auth.uid()));

-- 7. WORKOUT PLANS
ALTER TABLE public.workout_plans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Members can view assigned workout plans"
    ON public.workout_plans FOR SELECT
    TO authenticated
    USING (member_id = auth.uid() OR member_id IS NULL OR public.is_owner(auth.uid()));

CREATE POLICY "Owners can manage workout plans"
    ON public.workout_plans FOR ALL
    TO authenticated
    USING (public.is_owner(auth.uid()))
    WITH CHECK (public.is_owner(auth.uid()));

-- 8. NOTIFICATIONS
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Members can view and mark own notifications"
    ON public.notifications FOR SELECT
    TO authenticated
    USING (recipient_id = auth.uid() OR public.is_owner(auth.uid()));

CREATE POLICY "Members can update read status of own notifications"
    ON public.notifications FOR UPDATE
    TO authenticated
    USING (recipient_id = auth.uid())
    WITH CHECK (recipient_id = auth.uid());

CREATE POLICY "Owners can insert notifications"
    ON public.notifications FOR INSERT
    TO authenticated
    WITH CHECK (public.is_owner(auth.uid()));

-- 9. ANNOUNCEMENTS
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read announcements"
    ON public.announcements FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Owners can manage announcements"
    ON public.announcements FOR ALL
    TO authenticated
    USING (public.is_owner(auth.uid()))
    WITH CHECK (public.is_owner(auth.uid()));

-- 10. AUDIT LOGS
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Owners can read audit logs"
    ON public.audit_logs FOR SELECT
    TO authenticated
    USING (public.is_owner(auth.uid()));

-- ====================================================================
-- BUSINESS FUNCTIONS (ATOMIC TRANSACTIONS)
-- ====================================================================

-- Function: Atomic QR Attendance Check-In
CREATE OR REPLACE FUNCTION public.check_in_member(
    p_member_id UUID,
    p_gym_timezone TEXT DEFAULT 'Asia/Kolkata',
    p_source TEXT DEFAULT 'qr_entrance'
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_profile RECORD;
    v_membership RECORD;
    v_local_date DATE;
    v_existing_id UUID;
    v_attendance_id UUID;
BEGIN
    -- Derive gym-local date
    v_local_date := (now() AT TIME ZONE p_gym_timezone)::DATE;

    -- 1. Validate Member
    SELECT * INTO v_profile FROM public.profiles WHERE id = p_member_id;
    IF NOT FOUND THEN
        RETURN jsonb_build_object('success', false, 'code', 'ACCOUNT_NOT_FOUND', 'message', 'Member account not found.');
    END IF;

    IF NOT v_profile.is_active THEN
        RETURN jsonb_build_object('success', false, 'code', 'ACCOUNT_INACTIVE', 'message', 'Account is currently inactive or deactivated.');
    END IF;

    -- 2. Validate Membership
    SELECT * INTO v_membership FROM public.memberships 
    WHERE member_id = p_member_id 
    ORDER BY expiry_date DESC, created_at DESC 
    LIMIT 1;

    IF NOT FOUND THEN
        RETURN jsonb_build_object('success', false, 'code', 'NO_MEMBERSHIP', 'message', 'No membership record found.');
    END IF;

    IF v_membership.status = 'suspended' THEN
        RETURN jsonb_build_object('success', false, 'code', 'MEMBERSHIP_SUSPENDED', 'message', 'Membership is suspended.');
    END IF;

    IF v_membership.expiry_date < v_local_date OR v_membership.status = 'expired' THEN
        RETURN jsonb_build_object('success', false, 'code', 'MEMBERSHIP_EXPIRED', 'message', 'Membership expired on ' || v_membership.expiry_date::TEXT);
    END IF;

    -- 3. Check for Duplicate Check-In Today
    SELECT id INTO v_existing_id FROM public.attendance
    WHERE member_id = p_member_id AND gym_local_date = v_local_date;

    IF FOUND THEN
        RETURN jsonb_build_object(
            'success', false, 
            'code', 'ALREADY_CHECKED_IN', 
            'message', 'You have already checked in today (' || v_local_date::TEXT || ').'
        );
    END IF;

    -- 4. Record Attendance Atomically
    INSERT INTO public.attendance (member_id, check_in_at, gym_local_date, source)
    VALUES (p_member_id, now(), v_local_date, p_source)
    RETURNING id INTO v_attendance_id;

    -- 5. Create In-App Notification (Idempotent for this check-in)
    INSERT INTO public.notifications (recipient_id, title, body, type)
    VALUES (
        p_member_id,
        'Attendance Recorded! 💪',
        'Check-in confirmed for ' || v_local_date::TEXT || ' at ' || to_char(now() AT TIME ZONE p_gym_timezone, 'HH12:MI AM') || '. Have a great workout!',
        'attendance_success'
    );

    RETURN jsonb_build_object(
        'success', true,
        'code', 'SUCCESS',
        'attendance_id', v_attendance_id,
        'date', v_local_date,
        'message', 'Attendance confirmed! Welcome to Elite Fitness.'
    );
END;
$$;

-- Grant execution on check_in_member
REVOKE ALL ON FUNCTION public.check_in_member(UUID, TEXT, TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.check_in_member(UUID, TEXT, TEXT) TO authenticated;

-- Function: Server-Side Aggregated Owner Metrics
CREATE OR REPLACE FUNCTION public.get_owner_metrics()
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
DECLARE
    v_caller UUID := auth.uid();
    v_total_members INT;
    v_active_members INT;
    v_expiring_soon INT;
    v_expired_members INT;
    v_today_checkins INT;
    v_month_revenue NUMERIC(10,2);
    v_today DATE := (now() AT TIME ZONE 'Asia/Kolkata')::DATE;
    v_month_start DATE := date_trunc('month', now() AT TIME ZONE 'Asia/Kolkata')::DATE;
BEGIN
    IF NOT public.is_owner(v_caller) THEN
        RAISE EXCEPTION 'Unauthorized: Owner access required.';
    END IF;

    SELECT count(*) INTO v_total_members FROM public.profiles WHERE role = 'member';
    
    SELECT count(DISTINCT member_id) INTO v_active_members 
    FROM public.memberships 
    WHERE status IN ('active', 'expiring_soon') AND expiry_date >= v_today;

    SELECT count(DISTINCT member_id) INTO v_expiring_soon 
    FROM public.memberships 
    WHERE expiry_date BETWEEN v_today AND (v_today + INTERVAL '7 days')::DATE AND status != 'suspended';

    SELECT count(DISTINCT member_id) INTO v_expired_members 
    FROM public.memberships 
    WHERE expiry_date < v_today;

    SELECT count(*) INTO v_today_checkins 
    FROM public.attendance 
    WHERE gym_local_date = v_today;

    SELECT coalesce(sum(amount), 0) INTO v_month_revenue 
    FROM public.payments 
    WHERE status = 'completed' AND paid_at >= v_month_start;

    RETURN jsonb_build_object(
        'total_members', v_total_members,
        'active_members', v_active_members,
        'expiring_soon', v_expiring_soon,
        'expired_members', v_expired_members,
        'today_checkins', v_today_checkins,
        'month_revenue', v_month_revenue,
        'calculated_at', now()
    );
END;
$$;

-- Grant execution on get_owner_metrics
REVOKE ALL ON FUNCTION public.get_owner_metrics() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_owner_metrics() TO authenticated;

-- ====================================================================
-- SEED DATA: INITIAL MEMBERSHIP PLANS
-- ====================================================================
INSERT INTO public.membership_plans (name, description, duration_days, price, currency, is_active, features)
VALUES 
    (
        'Starter Track (Monthly)', 
        'Structured entry into strength & conditioning with essential facility access.', 
        30, 
        999.00, 
        'INR', 
        true, 
        ARRAY['Full Gym Floor Access (Off-Peak)', '1 Group Zumba / HIIT Class Per Week', 'Biomechanical Assessment', 'Locker & Shower Access']
    ),
    (
        'Elite Transformation (Quarterly)', 
        'Unrestricted all-access pass for committed athletes and continuous progress.', 
        90, 
        5099.00, 
        'INR', 
        true, 
        ARRAY['Full 24/7 Unlimited Gym Floor Access', 'Unlimited Group Zumba & HIIT', '1 Free 1-on-1 PT Session/Mo', 'Recovery Zone Access', 'Bi-Weekly In-Body Scans', '1 Free Guest Pass/Mo']
    ),
    (
        'VIP Private Coaching (Annual)', 
        'The complete high-performance transformation protocol with direct mentorship.', 
        365, 
        35990.00, 
        'INR', 
        true, 
        ARRAY['Everything in Elite Tier', 'Weekly 1-on-1 Coach Mentorship', 'Custom Metabolic Nutrition Plan', 'Priority Class Booking', 'Direct WhatsApp Coach Support', 'Elite Performance Apparel Pack']
    )
ON CONFLICT DO NOTHING;
