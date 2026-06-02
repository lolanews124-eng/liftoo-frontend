import { Link } from 'react-router-dom';

export function WebsiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-grid">
        <div>
          <div className="site-logo site-logo-footer">Lif<span>too</span></div>
          <p className="site-footer-tagline">
            Your personal shopping assistant for malls, markets, festivals and everyday errands.
          </p>
        </div>
        <div>
          <h4>Company</h4>
          <Link to="/about">About us</Link>
          <Link to="/how-it-works">How it works</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div>
          <h4>Services</h4>
          <Link to="/services">All services</Link>
          <Link to="/for-assistants">Become an assistant</Link>
          <Link to="/auth/login">Book now</Link>
        </div>
        <div>
          <h4>Legal</h4>
          <Link to="/legal/privacy-policy">Privacy</Link>
          <Link to="/legal/terms-of-service">Terms</Link>
          <Link to="/legal">All policies</Link>
        </div>
      </div>
      <div className="site-footer-bottom">
        <span>© {new Date().getFullYear()} Liftoo. All rights reserved.</span>
        <span>Made for stress-free shopping in India</span>
      </div>
    </footer>
  );
}
