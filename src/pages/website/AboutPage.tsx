import { Link } from 'react-router-dom';

const VALUES = [
  { icon: '🛡️', title: 'Trust first', desc: 'KYC-verified assistants, admin oversight, and transparent pricing.' },
  { icon: '⚡', title: 'On-demand', desc: 'Book when you need help — not days in advance.' },
  { icon: '💳', title: 'Fair payments', desc: 'Customers pay after service; assistants earn when jobs are paid.' },
  { icon: '🤝', title: 'Local jobs', desc: 'We create flexible earning opportunities in your city.' },
];

export function AboutPage() {
  return (
    <div className="site-page">
      <div className="site-container">
        <div className="site-page-hero">
          <span className="site-pill">About Liftoo</span>
          <h1>Shopping should feel light</h1>
          <p className="site-lead">
            Liftoo connects people who need an extra pair of hands while shopping with verified local assistants
            who want flexible, meaningful work.
          </p>
        </div>

        <div className="site-about-split">
          <div className="site-about-card">
            <h2>Our mission</h2>
            <p>
              Crowded malls, heavy bags, long queues and family outings shouldn&apos;t be exhausting. We built Liftoo
              so anyone can book trusted help in minutes — on the web or phone — and pay only when the job is done.
            </p>
          </div>
          <div className="site-about-card site-about-card-accent">
            <h2>What we offer</h2>
            <ul>
              <li>Customer web app & Android app</li>
              <li>Live booking tracking & chat</li>
              <li>Wallet, UPI & cash payments</li>
              <li>Refer & earn for customers</li>
              <li>Assistant app with earnings & KYC</li>
            </ul>
          </div>
        </div>

        <div className="site-values-grid">
          {VALUES.map((v) => (
            <article key={v.title} className="site-value-card">
              <span>{v.icon}</span>
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </article>
          ))}
        </div>

        <div className="site-page-cta">
          <Link to="/contact" className="btn btn-outline">Contact us</Link>
          <Link to="/auth/login" className="btn btn-primary">Start booking</Link>
        </div>
      </div>
    </div>
  );
}
