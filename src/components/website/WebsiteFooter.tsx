import { Link } from 'react-router-dom';
import { AuthLoginCta } from './AuthCta';

export function WebsiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-glow" />
      <div className="site-container">
        <div className="site-footer-top">
          <div className="site-footer-brand">
            <Link to="/" className="site-logo site-logo-footer">
              <span className="logo-mark">L</span>
              Lif<span>too</span>
            </Link>
            <p>
              India&apos;s on-demand shopping assistant platform. Book help at malls, markets and more —
              pay when the job is done.
            </p>
            <AuthLoginCta className="site-btn-primary site-btn-sm">
              Book now
            </AuthLoginCta>
          </div>
          <div className="site-footer-links">
            <div>
              <h4>Product</h4>
              <Link to="/services">Services</Link>
              <Link to="/how-it-works">How it works</Link>
              <AuthLoginCta>Customer app</AuthLoginCta>
            </div>
            <div>
              <h4>Company</h4>
              <Link to="/about">About</Link>
              <Link to="/for-assistants">For assistants</Link>
              <Link to="/contact">Contact</Link>
            </div>
            <div>
              <h4>Legal</h4>
              <Link to="/legal/privacy-policy">Privacy</Link>
              <Link to="/legal/terms-of-service">Terms</Link>
              <Link to="/legal">All policies</Link>
            </div>
          </div>
        </div>
        <div className="site-footer-bottom">
          <span>© {new Date().getFullYear()} Liftoo Technologies</span>
          <a href="mailto:contact@liftoo.in">contact@liftoo.in</a>
        </div>
      </div>
    </footer>
  );
}
