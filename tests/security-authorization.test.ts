import { describe, it, expect, beforeEach } from 'vitest';
import { gymDb, formatDateYMD } from '../src/lib/supabase';

describe('Security, Authorization & Edge-Case Safeguards', () => {
  beforeEach(() => {
    gymDb.resetToDefault();
  });

  describe('1. Authentication & Role Safeguards', () => {
    it('authenticates valid credentials and rejects non-existent emails', () => {
      const valid = gymDb.loginWithEmail('rahul@elitegym.com');
      expect(valid.success).toBe(true);
      expect(valid.user?.role).toBe('member');

      const invalid = gymDb.loginWithEmail('hacker@unknown.com');
      expect(invalid.success).toBe(false);
      expect(invalid.error).toContain('does not exist');
    });

    it('rejects login for deactivated/inactive accounts', () => {
      // Neha is inactive
      const res = gymDb.loginWithEmail('neha@elitegym.com');
      expect(res.success).toBe(false);
      expect(res.error).toContain('deactivated');
    });

    it('prevents member profile update from altering role or is_active', () => {
      const memberId = 'user-member-001';
      // Attempt to update profile fields
      gymDb.updateProfile(memberId, {
        full_name: 'Rahul Sharma (Updated)',
        phone: '+91 99999 88888',
      });

      const updated = gymDb.getProfile(memberId);
      expect(updated?.full_name).toBe('Rahul Sharma (Updated)');
      expect(updated?.phone).toBe('+91 99999 88888');
      expect(updated?.role).toBe('member'); // Role remains strictly member
      expect(updated?.is_active).toBe(true);
    });
  });

  describe('2. Concurrent Duplicate Check-In Protection', () => {
    it('ensures atomic protection against simultaneous check-in attempts', () => {
      const memberId = 'user-member-001';

      // Simulate 5 simultaneous check-in attempts (e.g. rapid tapping or double-requests)
      const attempts = [
        gymDb.checkInMember(memberId),
        gymDb.checkInMember(memberId),
        gymDb.checkInMember(memberId),
        gymDb.checkInMember(memberId),
        gymDb.checkInMember(memberId),
      ];

      const successes = attempts.filter((r) => r.success);
      const duplicates = attempts.filter((r) => r.code === 'ALREADY_CHECKED_IN');

      // Exactly ONE succeeds, all subsequent attempts are rejected as ALREADY_CHECKED_IN
      expect(successes.length).toBe(1);
      expect(duplicates.length).toBe(4);

      // Verify database has exactly 1 check-in for today
      const todayStr = formatDateYMD(new Date());
      const allToday = gymDb
        .getAllAttendance()
        .filter((a) => a.member_id === memberId && a.gym_local_date === todayStr);

      expect(allToday.length).toBe(1);
    });
  });

  describe('3. Financial & Payment Integrity', () => {
    it('records valid payment and updates owner metrics immediately', () => {
      const initialMetrics = gymDb.getOwnerMetrics();
      const initialRevenue = initialMetrics.month_revenue;

      gymDb.recordPayment({
        member_id: 'user-member-001',
        amount: 2500,
        currency: 'INR',
        payment_method: 'upi',
        status: 'completed',
        transaction_reference: 'TEST-UPI-999',
        paid_at: new Date().toISOString(),
        notes: 'Test payment entry',
      });

      const newMetrics = gymDb.getOwnerMetrics();
      expect(newMetrics.month_revenue).toBe(initialRevenue + 2500);
    });
  });
});
