/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import SmoothScroll from './components/SmoothScroll';
import CustomCursor from './components/CustomCursor';
import SplashScreen from './components/SplashScreen';
import { AuthProvider } from './lib/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Programs from './pages/Programs';
import Gallery from './pages/Gallery';
import Reviews from './pages/Reviews';
import Contact from './pages/Contact';
import Login from './pages/Login';
import CheckIn from './pages/CheckIn';

// Member Portal
import MemberLayout from './components/member/MemberLayout';
import MemberOverview from './pages/member/MemberOverview';
import MemberAttendance from './pages/member/MemberAttendance';
import MemberProgress from './pages/member/MemberProgress';
import MemberWorkouts from './pages/member/MemberWorkouts';
import MemberMembership from './pages/member/MemberMembership';
import MemberNotifications from './pages/member/MemberNotifications';
import MemberProfile from './pages/member/MemberProfile';

// Owner Portal
import OwnerLayout from './components/owner/OwnerLayout';
import OwnerOverview from './pages/owner/OwnerOverview';
import OwnerMembers from './pages/owner/OwnerMembers';
import OwnerMemberDetail from './pages/owner/OwnerMemberDetail';
import OwnerPlans from './pages/owner/OwnerPlans';
import OwnerAttendance from './pages/owner/OwnerAttendance';
import OwnerPayments from './pages/owner/OwnerPayments';
import OwnerNotifications from './pages/owner/OwnerNotifications';
import OwnerQRCode from './pages/owner/OwnerQRCode';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <AuthProvider>
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}
      <SmoothScroll>
        <CustomCursor />
        <BrowserRouter>
          <Routes>
            {/* Public Website Routes */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="programs" element={<Programs />} />
              <Route path="gallery" element={<Gallery />} />
              <Route path="reviews" element={<Reviews />} />
              <Route path="contact" element={<Contact />} />
              <Route path="login" element={<Login />} />
              <Route path="check-in" element={<CheckIn />} />
            </Route>

            {/* Protected Member Portal Routes */}
            <Route
              path="/member"
              element={
                <ProtectedRoute allowedRole="member">
                  <MemberLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<MemberOverview />} />
              <Route path="attendance" element={<MemberAttendance />} />
              <Route path="progress" element={<MemberProgress />} />
              <Route path="workouts" element={<MemberWorkouts />} />
              <Route path="membership" element={<MemberMembership />} />
              <Route path="notifications" element={<MemberNotifications />} />
              <Route path="profile" element={<MemberProfile />} />
            </Route>

            {/* Protected Owner Portal Routes */}
            <Route
              path="/owner"
              element={
                <ProtectedRoute allowedRole="owner">
                  <OwnerLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<OwnerOverview />} />
              <Route path="members" element={<OwnerMembers />} />
              <Route path="members/:id" element={<OwnerMemberDetail />} />
              <Route path="plans" element={<OwnerPlans />} />
              <Route path="attendance" element={<OwnerAttendance />} />
              <Route path="payments" element={<OwnerPayments />} />
              <Route path="notifications" element={<OwnerNotifications />} />
              <Route path="qr-code" element={<OwnerQRCode />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </SmoothScroll>
    </AuthProvider>
  );
}
