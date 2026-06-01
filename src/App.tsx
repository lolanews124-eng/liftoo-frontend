import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from './auth/AuthContext';
import { CustomerLayout, StandaloneLayout } from './layout/CustomerLayout';
import { LoginPage } from './pages/LoginPage';
import { OtpPage } from './pages/OtpPage';
import { SetupProfilePage } from './pages/SetupProfilePage';
import { HomePage } from './pages/HomePage';
import { BookingsPage } from './pages/BookingsPage';
import { WalletPage } from './pages/WalletPage';
import { ProfilePage } from './pages/ProfilePage';
import { BookingWizardPage } from './pages/BookingWizardPage';
import { LiveBookingPage } from './pages/LiveBookingPage';
import { PaymentPage } from './pages/PaymentPage';
import { AddressesPage } from './pages/AddressesPage';
import { ReferralPage } from './pages/ReferralPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { SupportPage } from './pages/SupportPage';
import { ChatPage } from './pages/ChatPage';
import { ServiceReviewPage } from './pages/ServiceReviewPage';
import { AppReviewPage } from './pages/AppReviewPage';
import { LegalIndexPage } from './pages/legal/LegalIndexPage';
import { LegalPolicyPage } from './pages/legal/LegalPolicyPage';

function LoadingScreen() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      Loading…
    </div>
  );
}

function RequireAuth({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return <LoadingScreen />;
  if (!user) return <Navigate to="/auth/login" replace />;
  if (!user.profileComplete) return <Navigate to="/auth/setup-profile" replace />;
  return <>{children}</>;
}

function RequireGuest({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return <LoadingScreen />;
  if (user?.profileComplete) return <Navigate to="/" replace />;
  if (user && !user.profileComplete) return <Navigate to="/auth/setup-profile" replace />;
  return <>{children}</>;
}

function RequireProfileSetup({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return <LoadingScreen />;
  if (!user) return <Navigate to="/auth/login" replace />;
  if (user.profileComplete) return <Navigate to="/" replace />;
  return <>{children}</>;
}

export default function App() {
  return (
    <Routes>
      <Route path="/auth/login" element={<RequireGuest><StandaloneLayout><LoginPage /></StandaloneLayout></RequireGuest>} />
      <Route path="/auth/otp" element={<RequireGuest><StandaloneLayout><OtpPage /></StandaloneLayout></RequireGuest>} />
      <Route path="/auth/setup-profile" element={<RequireProfileSetup><StandaloneLayout><SetupProfilePage /></StandaloneLayout></RequireProfileSetup>} />

      <Route element={<RequireAuth><CustomerLayout /></RequireAuth>}>
        <Route index element={<HomePage />} />
        <Route path="bookings" element={<BookingsPage />} />
        <Route path="wallet" element={<WalletPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>

      <Route path="/booking/new" element={<RequireAuth><StandaloneLayout><BookingWizardPage /></StandaloneLayout></RequireAuth>} />
      <Route path="/booking/:id" element={<RequireAuth><StandaloneLayout><LiveBookingPage /></StandaloneLayout></RequireAuth>} />
      <Route path="/payment/:id" element={<RequireAuth><StandaloneLayout><PaymentPage /></StandaloneLayout></RequireAuth>} />
      <Route path="/addresses" element={<RequireAuth><StandaloneLayout><AddressesPage /></StandaloneLayout></RequireAuth>} />
      <Route path="/referral" element={<RequireAuth><StandaloneLayout><ReferralPage /></StandaloneLayout></RequireAuth>} />
      <Route path="/notifications" element={<RequireAuth><StandaloneLayout><NotificationsPage /></StandaloneLayout></RequireAuth>} />
      <Route path="/support" element={<RequireAuth><StandaloneLayout><SupportPage /></StandaloneLayout></RequireAuth>} />
      <Route path="/chat/:bookingId" element={<RequireAuth><StandaloneLayout><ChatPage /></StandaloneLayout></RequireAuth>} />
      <Route path="/review/service/:id" element={<RequireAuth><StandaloneLayout><ServiceReviewPage /></StandaloneLayout></RequireAuth>} />
      <Route path="/review/app/:id" element={<RequireAuth><StandaloneLayout><AppReviewPage /></StandaloneLayout></RequireAuth>} />

      <Route path="/legal" element={<StandaloneLayout><LegalIndexPage /></StandaloneLayout>} />
      <Route path="/legal/:slug" element={<StandaloneLayout><LegalPolicyPage /></StandaloneLayout>} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
