import { Link } from 'react-router-dom';
import { PageHero } from '../../components/website/PageHero';

const VALUES = [
  { icon: '🛡️', title: 'Trust first', desc: 'KYC-verified assistants, admin oversight, transparent pricing.' },
  { icon: '⚡', title: 'On-demand', desc: 'Book when you need help — not days in advance.' },
  { icon: '💳', title: 'Fair payments', desc: 'Customers pay after service; assistants earn when jobs are paid.' },
  { icon: '🤝', title: 'Local jobs', desc: 'Flexible earning opportunities in your city.' },
];

export function AboutPage() {
  return (
    <>
      <PageHero
        pill="About Liftoo"
        title="Shopping should feel light"
        lead="We connect people who need an extra pair of hands with verified local assistants who want meaningful, flexible work."
      />
      <div className="site-page">
        <div className="site-container">
          <div className="site-about-grid">
            <div className="site-about-card-v2">
              <h2>Our mission</h2>
              <p>
                Crowded malls, heavy bags, long queues and family outings shouldn&apos;t be exhausting. We built Liftoo
                so anyone can book trusted help in minutes — on the web or phone — and pay only when the job is done.
              </p>
            </div>
            <div className="site-about-card-v2 accent">
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
          <div className="site-values-grid-v2">
            {VALUES.map((v) => (
              <article key={v.title} className="site-value-card-v2">
                <span>{v.icon}</span>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </article>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link to="/contact" className="site-btn-glass">Contact us</Link>
            <Link to="/auth/login" className="site-btn-primary">Start booking</Link>
          </div>
        </div>
      </div>
    </>
  );
}
