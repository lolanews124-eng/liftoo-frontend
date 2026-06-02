import { Link } from 'react-router-dom';

export function ContactPage() {
  return (
    <div className="site-page">
      <div className="site-container">
        <div className="site-page-hero">
          <span className="site-pill">Contact</span>
          <h1>We&apos;re here to help</h1>
          <p className="site-lead">Questions about booking, payments, or becoming an assistant? Reach out.</p>
        </div>

        <div className="site-contact-grid">
          <div className="site-contact-card">
            <span className="site-contact-icon">✉️</span>
            <h3>Email</h3>
            <a href="mailto:contact@liftoo.in">contact@liftoo.in</a>
            <p>We respond within 24 hours on business days.</p>
          </div>
          <div className="site-contact-card">
            <span className="site-contact-icon">💬</span>
            <h3>In-app support</h3>
            <p>Logged-in customers can open Help & support from profile for ticket tracking.</p>
            <Link to="/auth/login" className="site-text-link">Log in to app →</Link>
          </div>
          <div className="site-contact-card">
            <span className="site-contact-icon">📍</span>
            <h3>Service areas</h3>
            <p>Mumbai, Pune, Delhi NCR and expanding. Check availability when you book a venue.</p>
          </div>
        </div>

        <form
          className="site-contact-form"
          onSubmit={(e) => {
            e.preventDefault();
            window.location.href = 'mailto:contact@liftoo.in?subject=Liftoo%20website%20inquiry';
          }}
        >
          <h2>Send a message</h2>
          <div className="site-form-row">
            <label className="field">
              <span>Name</span>
              <input type="text" required placeholder="Your name" />
            </label>
            <label className="field">
              <span>Email</span>
              <input type="email" required placeholder="you@example.com" />
            </label>
          </div>
          <label className="field">
            <span>Message</span>
            <textarea rows={4} required placeholder="How can we help?" />
          </label>
          <button type="submit" className="btn btn-primary" style={{ width: 'auto' }}>
            Open email to send
          </button>
        </form>
      </div>
    </div>
  );
}
