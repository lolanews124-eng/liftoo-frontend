import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { isLoggedIn } from '../api/client';
import { InAppNotificationBanner } from '../components/InAppNotificationBanner';
import { useRealtimeNotifications } from '../hooks/useRealtimeNotifications';

function NavIcon({ name, active }: { name: string; active: boolean }) {
  const c = active ? '#ff0064' : '#9ca3af';
  switch (name) {
    case 'home':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2">
          <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1V9.5z" />
        </svg>
      );
    case 'bookings':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2">
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <path d="M16 2v4M8 2v4M3 10h18" />
        </svg>
      );
    case 'wallet':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2">
          <path d="M21 12V7H5a2 2 0 010-4h14v4" />
          <rect x="3" y="7" width="18" height="14" rx="2" />
          <path d="M16 14h.01" />
        </svg>
      );
    case 'profile':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
        </svg>
      );
    default:
      return null;
  }
}

const TABS = [
  { to: '/app', label: 'Home', icon: 'home', end: true },
  { to: '/app/bookings', label: 'Bookings', icon: 'bookings', end: false },
  { to: '/app/wallet', label: 'Wallet', icon: 'wallet', end: false },
  { to: '/app/profile', label: 'Profile', icon: 'profile', end: false },
] as const;

function useOffline() {
  const [offline, setOffline] = useState(!navigator.onLine);
  useEffect(() => {
    const on = () => setOffline(false);
    const off = () => setOffline(true);
    window.addEventListener('online', on);
    window.addEventListener('offline', off);
    return () => {
      window.removeEventListener('online', on);
      window.removeEventListener('offline', off);
    };
  }, []);
  return offline;
}

function NavItems({ variant }: { variant: 'bottom' | 'sidebar' }) {
  const location = useLocation();
  const className = variant === 'bottom' ? 'nav-item' : 'sidebar-item';

  return (
    <>
      {TABS.map((t) => {
        const active =
          t.to === '/app'
            ? location.pathname === '/app'
            : location.pathname === t.to || location.pathname.startsWith(`${t.to}/`);
        return (
          <NavLink
            key={t.to}
            to={t.to}
            end={t.end}
            className={`${className}${active ? ' active' : ''}`}
          >
            <NavIcon name={t.icon} active={active} />
            {t.label}
          </NavLink>
        );
      })}
    </>
  );
}

export function CustomerLayout() {
  const offline = useOffline();
  const token = isLoggedIn() ? localStorage.getItem('access_token') : null;
  useRealtimeNotifications(token);

  return (
    <div className="app-shell">
      {offline && <div className="offline-banner">No internet connection</div>}
      <InAppNotificationBanner />
      <div className="app-body">
        <aside className="desktop-sidebar" aria-label="Main navigation">
          <div className="sidebar-brand">
            <Link to="/app" className="sidebar-logo-link">
              <span className="sidebar-logo">Lif<span>too</span></span>
            </Link>
            <span className="sidebar-tagline">Shopping assistant</span>
            <Link to="/" className="sidebar-website-link">← Website</Link>
          </div>
          <nav className="sidebar-nav">
            <NavItems variant="sidebar" />
          </nav>
        </aside>
        <div className="app-main">
          <div className="page-content">
            <Outlet />
          </div>
          <nav className="bottom-nav mobile-nav" aria-label="Mobile navigation">
            <NavItems variant="bottom" />
          </nav>
        </div>
      </div>
    </div>
  );
}

export function StandaloneLayout({ children }: { children: React.ReactNode }) {
  const offline = useOffline();

  return (
    <div className="app-shell standalone-shell">
      {offline && <div className="offline-banner">No internet connection</div>}
      <div className="page-content no-nav">{children}</div>
    </div>
  );
}
