import { Link } from 'react-router-dom';

const PERKS = [
  { title: 'Flexible hours', desc: 'Go online when you want. Accept jobs near you.' },
  { title: 'Fair earnings', desc: 'Get paid after customer completes payment — wallet payouts available.' },
  { title: 'Cash jobs', desc: 'Collect cash from customer; settlement wallet handles company share.' },
  { title: 'Grow your rating', desc: 'Great service builds trust and more bookings.' },
];

export function ForAssistantsPage() {
  return (
    <div className="site-page">
      <div className="site-container">
        <div className="site-page-hero site-page-hero-assistant">
          <span className="site-pill">For assistants</span>
          <h1>Earn helping people shop</h1>
          <p className="site-lead">
            Join Liftoo as a verified shopping assistant. Use the Liftoo assistant mobile app to go online,
            accept jobs, and track earnings.
          </p>
        </div>

        <div className="site-perks-grid">
          {PERKS.map((p) => (
            <article key={p.title} className="site-perk-card">
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </article>
          ))}
        </div>

        <div className="site-assistant-steps">
          <h2>How to join</h2>
          <ol>
            <li>Download the Liftoo app and sign up with the same email you use for customers (or a new one).</li>
            <li>Switch to assistant mode in profile and complete KYC documents.</li>
            <li>Wait for admin verification — usually within 1–2 business days.</li>
            <li>Go online and start accepting nearby booking requests.</li>
          </ol>
        </div>

        <div className="site-info-banner">
          <p>
            <strong>Note:</strong> Assistant features run in the Liftoo mobile app today. Customer booking is available on this website.
          </p>
        </div>

        <div className="site-page-cta">
          <Link to="/contact" className="btn btn-outline">Questions? Contact us</Link>
          <Link to="/auth/login" className="btn btn-primary">Sign up as customer first</Link>
        </div>
      </div>
    </div>
  );
}
