import { Link } from 'react-router-dom';
import { SERVICE_ITEMS, STATS, STEPS, TESTIMONIALS } from './websiteData';

export function LandingPage() {
  return (
    <>
      <section className="site-hero">
        <div className="site-container site-hero-grid">
          <div className="site-hero-copy">
            <span className="site-pill">India&apos;s shopping companion</span>
            <h1>
              Shop smarter.
              <br />
              <span className="site-gradient-text">Carry less. Live more.</span>
            </h1>
            <p className="site-lead">
              Book a verified Liftoo assistant for malls, markets, festivals and family outings —
              pay only after your job is complete.
            </p>
            <div className="site-hero-actions">
              <Link to="/auth/login" className="btn btn-primary site-hero-btn">Book your assistant</Link>
              <Link to="/how-it-works" className="btn btn-outline site-hero-btn">See how it works</Link>
            </div>
            <div className="site-hero-trust">
              <span>✓ Verified assistants</span>
              <span>✓ Live tracking</span>
              <span>✓ Pay after service</span>
            </div>
          </div>
          <div className="site-hero-visual">
            <div className="site-hero-card site-hero-card-main">
              <div className="site-hero-card-tag">Active booking</div>
              <strong>Phoenix Mall, Mumbai</strong>
              <p>Bag carry · 2 hours</p>
              <div className="site-hero-progress">
                <div className="site-hero-progress-fill" />
              </div>
              <span className="site-hero-status">Assistant arriving · 8 min</span>
            </div>
            <div className="site-hero-card site-hero-card-float">₹5670 wallet</div>
            <div className="site-hero-card site-hero-card-float2">★ 4.9 rated</div>
          </div>
        </div>
      </section>

      <section className="site-stats-bar">
        <div className="site-container site-stats-grid">
          {STATS.map((s) => (
            <div key={s.label} className="site-stat">
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="site-section">
        <div className="site-container">
          <div className="site-section-head">
            <span className="site-pill">How it works</span>
            <h2>From book to done in four steps</h2>
            <p>Simple flow on web and mobile — same account, same wallet.</p>
          </div>
          <div className="site-steps-grid">
            {STEPS.map((step) => (
              <article key={step.num} className="site-step-card">
                <span className="site-step-num">{step.num}</span>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </article>
            ))}
          </div>
          <Link to="/how-it-works" className="site-text-link">Full walkthrough →</Link>
        </div>
      </section>

      <section className="site-section site-section-alt">
        <div className="site-container">
          <div className="site-section-head">
            <span className="site-pill">Services</span>
            <h2>Help for every kind of shopping trip</h2>
          </div>
          <div className="site-services-grid">
            {SERVICE_ITEMS.slice(0, 3).map((s) => (
              <article key={s.title} className="site-service-card">
                <span className="site-service-icon">{s.icon}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <span className="site-service-rate">{s.rate}</span>
              </article>
            ))}
          </div>
          <Link to="/services" className="btn btn-outline site-center-btn">View all services</Link>
        </div>
      </section>

      <section className="site-section">
        <div className="site-container">
          <div className="site-section-head">
            <span className="site-pill">Stories</span>
            <h2>Loved by busy shoppers</h2>
          </div>
          <div className="site-testimonials">
            {TESTIMONIALS.map((t) => (
              <blockquote key={t.name} className="site-testimonial">
                <p>&ldquo;{t.quote}&rdquo;</p>
                <footer>
                  <strong>{t.name}</strong> · {t.city}
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="site-cta-band">
        <div className="site-container site-cta-inner">
          <div>
            <h2>Ready for hands-free shopping?</h2>
            <p>Create your account in under a minute. No payment until your assistant finishes.</p>
          </div>
          <Link to="/auth/login" className="btn btn-primary site-cta-btn">Get started free</Link>
        </div>
      </section>
    </>
  );
}
