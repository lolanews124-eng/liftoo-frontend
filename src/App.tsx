import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from './auth/AuthContext';
import { CustomerLayout, StandaloneLayout } from './layout/CustomerLayout';
import { WebsiteLayout } from './layout/WebsiteLayout';
import { LoginPage } from './pages/LoginPage';
import { OtpPage } from './pages/OtpPage';
import { SetupProfilePage } from './pages/SetupProfilePage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { ResetPasswordPage } from './pages/ResetPasswordPage';
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
import { PublicEntryPage } from './pages/website/PublicEntryPage';
import { HowItWorksPage } from './pages/website/HowItWorksPage';
import { ServicesPage } from './pages/website/ServicesPage';
import { AboutPage } from './pages/website/AboutPage';
import { ForAssistantsPage } from './pages/website/ForAssistantsPage';
import { ContactPage } from './pages/website/ContactPage';
import { WEB_AUTH_ENABLED } from './config/features';

function LoadingScreen() {
  return (
    <div className="site-loading">
      <div className="site-loading-spinner" />
    </div>
  );
}

function RequireAuth({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return <LoadingScreen />;
  if (!WEB_AUTH_ENABLED && !user) return <Navigate to="/" replace />;
  if (!user) return <Navigate to="/auth/login" replace />;
  if (!user.profileComplete) return <Navigate to="/auth/setup-profile" replace />;
  return <>{children}</>;
}

function RequireGuest({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  if (!WEB_AUTH_ENABLED) return <Navigate to="/" replace />;
  if (loading) return <LoadingScreen />;
  if (user?.profileComplete) return <Navigate to="/app" replace />;
  if (user && !user.profileComplete) return <Navigate to="/auth/setup-profile" replace />;
  return <>{children}</>;
}

function RequireProfileSetup({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  if (!WEB_AUTH_ENABLED) return <Navigate to="/" replace />;
  if (loading) return <LoadingScreen />;
  if (!user) return <Navigate to="/auth/login" replace />;
  if (user.profileComplete) return <Navigate to="/app" replace />;
  return <>{children}</>;
}

export default function App() {
  return (
    <Routes>
      {/* Public marketing website */}
      <Route element={<WebsiteLayout />}>
        <Route index element={<PublicEntryPage />} />
        <Route path="how-it-works" element={<HowItWorksPage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="for-assistants" element={<ForAssistantsPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="legal" element={<LegalIndexPage />} />
        <Route path="legal/:slug" element={<LegalPolicyPage />} />
      </Route>

      {/* Auth */}
      <Route path="/auth/login" element={<RequireGuest><StandaloneLayout><LoginPage /></StandaloneLayout></RequireGuest>} />
      <Route path="/auth/otp" element={<RequireGuest><StandaloneLayout><OtpPage /></StandaloneLayout></RequireGuest>} />
      <Route path="/auth/forgot-password" element={<RequireGuest><StandaloneLayout><ForgotPasswordPage /></StandaloneLayout></RequireGuest>} />
      <Route path="/auth/reset-password" element={<RequireGuest><StandaloneLayout><ResetPasswordPage /></StandaloneLayout></RequireGuest>} />
      <Route path="/auth/setup-profile" element={<RequireProfileSetup><StandaloneLayout><SetupProfilePage /></StandaloneLayout></RequireProfileSetup>} />

      {/* Logged-in app */}
      <Route path="/app" element={<RequireAuth><CustomerLayout /></RequireAuth>}>
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

      {/* Legacy redirects */}
      <Route path="/bookings" element={<Navigate to="/app/bookings" replace />} />
      <Route path="/wallet" element={<Navigate to="/app/wallet" replace />} />
      <Route path="/profile" element={<Navigate to="/app/profile" replace />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
