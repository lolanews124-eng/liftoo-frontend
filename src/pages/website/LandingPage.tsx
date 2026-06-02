import { Link } from 'react-router-dom';
import { PhoneMockup } from '../../components/website/PhoneMockup';
import { SERVICE_ITEMS, STATS, STEPS, TESTIMONIALS } from './websiteData';

const MARQUEE = ['Malls', 'Markets', 'Festivals', 'Hospitals', 'Exhibitions', 'Sale days'];

export function LandingPage() {
  return (
    <div className="landing">
      <section className="landing-hero">
        <div className="landing-hero-bg">
          <div className="orb orb-1" />
          <div className="orb orb-2" />
          <div className="orb orb-3" />
          <div className="grid-pattern" />
        </div>
        <div className="site-container landing-hero-grid">
          <div className="landing-hero-copy">
            <div className="site-pill site-pill-glow">
              <span className="pill-dot" />
              Now booking across major cities
            </div>
            <h1 className="landing-headline">
              Shopping,
              <br />
              <span className="text-gradient">without the weight.</span>
            </h1>
            <p className="landing-lead">
              Hire a verified Liftoo assistant to carry bags, wait in queues, and help family —
              you pay only when the job is done.
            </p>
            <div className="landing-cta-row">
              <Link to="/auth/login" className="site-btn-primary site-btn-lg">
                Book your assistant
                <span className="site-btn-arrow">→</span>
              </Link>
              <Link to="/how-it-works" className="site-btn-glass">
                Watch how it works
              </Link>
            </div>
            <div className="landing-trust">
              {['Verified KYC', 'Live GPS', 'Pay after service'].map((t) => (
                <span key={t}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="landing-hero-visual">
            <PhoneMockup />
          </div>
        </div>
        <div className="landing-marquee">
          <div className="landing-marquee-track">
            {[...MARQUEE, ...MARQUEE].map((t, i) => (
              <span key={`${t}-${i}`}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="landing-stats">
        <div className="site-container landing-stats-grid">
          {STATS.map((s) => (
            <div key={s.label} className="landing-stat">
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="landing-section">
        <div className="site-container">
          <div className="section-label">
            <span className="site-pill">Process</span>
            <h2>Four steps to hands-free shopping</h2>
            <p>Same smooth experience on web and Android app.</p>
          </div>
          <div className="steps-rail">
            {STEPS.map((step, i) => (
              <article key={step.num} className="step-card">
                <div className="step-card-top">
                  <span className="step-num">{step.num}</span>
                  {i < STEPS.length - 1 && <div className="step-line" aria-hidden />}
                </div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="landing-section landing-bento-section">
        <div className="site-container">
          <div className="section-label section-label-light">
            <span className="site-pill site-pill-dark">Services</span>
            <h2>Every trip. Every need.</h2>
          </div>
          <div className="bento-grid">
            {SERVICE_ITEMS.map((s, i) => (
              <Link
                key={s.title}
                to="/auth/login"
                className={`bento-card bento-${i === 0 ? 'wide' : i === 2 ? 'tall' : ''}`}
              >
                <span className="bento-icon">{s.icon}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <span className="bento-rate">{s.rate}</span>
                <span className="bento-arrow">→</span>
              </Link>
            ))}
          </div>
          <div className="section-cta-center">
            <Link to="/services" className="site-btn-glass site-btn-glass-dark">
              Explore all services
            </Link>
          </div>
        </div>
      </section>

      <section className="landing-showcase">
        <div className="site-container landing-showcase-grid">
          <div className="showcase-copy">
            <span className="site-pill site-pill-glow">Why Liftoo</span>
            <h2>Built for real Indian shopping trips</h2>
            <p>
              Crowded malls, festival sales, helping parents — not everyone wants to juggle bags and kids alone.
              Liftoo sends someone trustworthy, trackable, and paid fairly.
            </p>
            <ul className="showcase-list">
              <li>
                <strong>Post-pay only</strong>
                <span>Wallet, UPI or cash after completion</span>
              </li>
              <li>
                <strong>Live tracking</strong>
                <span>See assistant ETA on map</span>
              </li>
              <li>
                <strong>In-app chat</strong>
                <span>Coordinate without sharing personal number</span>
              </li>
            </ul>
            <Link to="/about" className="site-text-link">Our story →</Link>
          </div>
          <div className="showcase-visual">
            <div className="showcase-card">
              <div className="showcase-card-header">
                <span>Payment</span>
                <span className="showcase-paid">Completed</span>
              </div>
              <div className="showcase-amount">₹1,280</div>
              <p>Platform fee + service · Phoenix Mall</p>
              <div className="showcase-split">
                <div><span>Assistant earns</span><strong>₹960</strong></div>
                <div><span>You saved</span><strong>2 hrs</strong></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="landing-testimonials">
        <div className="site-container">
          <div className="section-label section-label-light">
            <h2>Real stories from real shoppers</h2>
          </div>
          <div className="testimonial-grid">
            {TESTIMONIALS.map((t, i) => (
              <blockquote key={t.name} className={`testimonial-card t-${i}`}>
                <div className="testimonial-stars">★★★★★</div>
                <p>{t.quote}</p>
                <footer>
                  <div className="testimonial-avatar">{t.name[0]}</div>
                  <div>
                    <strong>{t.name}</strong>
                    <span>{t.city}</span>
                  </div>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="landing-final-cta">
        <div className="landing-final-cta-bg" />
        <div className="site-container landing-final-inner">
          <h2>Your next mall trip, simplified.</h2>
          <p>Join thousands booking smarter. Free to sign up — pay only when you&apos;re happy.</p>
          <div className="landing-final-actions">
            <Link to="/auth/login" className="site-btn-primary site-btn-lg site-btn-white">
              Get started — it&apos;s free
            </Link>
            <Link to="/for-assistants" className="site-btn-glass">
              Earn as an assistant
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
