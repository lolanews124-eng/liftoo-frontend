import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import { WEB_AUTH_ENABLED } from '../../config/features';
import { AuthLoginCta } from './AuthCta';
import { PlayStoreCta } from './PlayStoreCta';
import { WebsiteLogo } from './WebsiteLogo';

const NAV = [
  { to: '/', label: 'Home', end: true },
  { to: '/how-it-works', label: 'How it works' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/become-assistant', label: 'Become Assistant' },
  { to: '/contact', label: 'Contact' },
];

export function WebsiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`site-header${scrolled ? ' scrolled' : ''}`}>
      <div className="site-header-inner">
        <WebsiteLogo onClick={() => setOpen(false)} />

        <button
          type="button"
          className="site-menu-btn"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span className={`menu-icon${open ? ' open' : ''}`} />
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
          {WEB_AUTH_ENABLED && user?.profileComplete ? (
            <Link to="/app" className="site-btn-primary site-btn-sm" onClick={() => setOpen(false)}>
              Open app
            </Link>
          ) : WEB_AUTH_ENABLED ? (
            <>
              <AuthLoginCta className="site-nav-login" onClick={() => setOpen(false)}>
                Log in
              </AuthLoginCta>
              <AuthLoginCta className="site-btn-primary site-btn-sm" onClick={() => setOpen(false)}>
                Get started
              </AuthLoginCta>
            </>
          ) : (
            <PlayStoreCta className="site-btn-primary site-btn-sm" onClick={() => setOpen(false)}>
              Download app
            </PlayStoreCta>
          )}
        </div>
      </div>
    </header>
  );
}
