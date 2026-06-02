import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';

const NAV = [
  { to: '/', label: 'Home', end: true },
  { to: '/how-it-works', label: 'How it works' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/for-assistants', label: 'For assistants' },
  { to: '/contact', label: 'Contact' },
];

export function WebsiteHeader() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link to="/" className="site-logo" onClick={() => setOpen(false)}>
          Lif<span>too</span>
        </Link>

        <button
          type="button"
          className="site-menu-btn"
          aria-label="Menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? '✕' : '☰'}
        </button>

        <nav className={`site-nav${open ? ' open' : ''}`}>
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => `site-nav-link${isActive ? ' active' : ''}`}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className={`site-header-cta${open ? ' open' : ''}`}>
          {user?.profileComplete ? (
            <Link to="/app" className="btn btn-primary site-btn" onClick={() => setOpen(false)}>
              Open app
            </Link>
          ) : (
            <>
              <Link to="/auth/login" className="btn btn-outline site-btn site-btn-ghost" onClick={() => setOpen(false)}>
                Log in
              </Link>
              <Link to="/auth/login" className="btn btn-primary site-btn" onClick={() => setOpen(false)}>
                Get started
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
