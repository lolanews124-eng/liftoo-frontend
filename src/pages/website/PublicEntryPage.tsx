import { Navigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import { WEB_AUTH_ENABLED } from '../../config/features';
import { LandingPage } from './LandingPage';

/** Home route: marketing site for guests, app redirect for logged-in users. */
export function PublicEntryPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="site-loading">
        <div className="site-loading-spinner" />
      </div>
    );
  }

  if (WEB_AUTH_ENABLED && user?.profileComplete) {
    return <Navigate to="/app" replace />;
  }

  return <LandingPage />;
}
