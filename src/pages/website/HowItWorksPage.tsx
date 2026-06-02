import { Link } from 'react-router-dom';
import { STEPS } from './websiteData';

export function HowItWorksPage() {
  return (
    <div className="site-page">
      <div className="site-container">
        <div className="site-page-hero">
          <span className="site-pill">How it works</span>
          <h1>Your assistant, start to finish</h1>
          <p className="site-lead">Whether you use the website or Android app, the experience is the same.</p>
        </div>

        <div className="site-timeline">
          {STEPS.map((step, i) => (
            <article key={step.num} className="site-timeline-item">
              <div className="site-timeline-marker">{step.num}</div>
              <div className="site-timeline-body">
                <h2>{step.title}</h2>
                <p>{step.desc}</p>
                {i === 0 && <p className="site-timeline-note">Sign up with email → verify OTP → complete profile.</p>}
                {i === 2 && <p className="site-timeline-note">Live map, in-app chat, and service OTP when assistant arrives.</p>}
                {i === 3 && <p className="site-timeline-note">Wallet, UPI, or cash with OTP confirmation from assistant.</p>}
              </div>
            </article>
          ))}
        </div>

        <div className="site-faq-grid">
          <div className="site-faq-card">
            <h3>When do I pay?</h3>
            <p>Only after the assistant marks the job complete. No upfront booking fee.</p>
          </div>
          <div className="site-faq-card">
            <h3>Can I cancel?</h3>
            <p>Yes — free cancellation within the window shown at booking; late cancel may have a small fee.</p>
          </div>
          <div className="site-faq-card">
            <h3>Are assistants verified?</h3>
            <p>Every assistant completes KYC and admin verification before taking jobs.</p>
          </div>
        </div>

        <div className="site-page-cta">
          <Link to="/auth/login" className="btn btn-primary">Book your first assistant</Link>
        </div>
      </div>
    </div>
  );
}
