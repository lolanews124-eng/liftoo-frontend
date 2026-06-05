import { Link } from 'react-router-dom';
import { MarketingCta } from '../../components/website/MarketingCta';
import { PageHero } from '../../components/website/PageHero';
import { SITE_INFO } from '../../config/siteInfo';

const VALUES = [
  { icon: '🛡️', title: 'Trust first', desc: 'KYC-verified assistants, admin oversight, transparent pricing.' },
  { icon: '⚡', title: 'On-demand', desc: 'Book when you need help — not days in advance.' },
  { icon: '💳', title: 'Fair payments', desc: 'Customers pay after service; assistants earn when jobs are paid.' },
  { icon: '🤝', title: 'Local jobs', desc: `Flexible earning opportunities in ${SITE_INFO.city} and nearby areas.` },
];

export function AboutPage() {
  return (
    <>
      <PageHero
        pill="About Liftoo"
        title="Shopping should feel light"
        lead={`Based in ${SITE_INFO.shortAddress}, we connect people who need an extra pair of hands with verified local assistants who want meaningful, flexible work.`}
      />
      <div className="site-page">
        <div className="site-container">
          <div className="site-about-grid">
            <div className="site-about-card-v2">
              <h2>Our mission</h2>
              <p>
                Crowded malls, heavy bags, long queues and family outings shouldn&apos;t be exhausting. We built Liftoo
                so anyone in {SITE_INFO.city} can book trusted help in minutes through the Android app and pay only when the job is done.
              </p>
            </div>
            <div className="site-about-card-v2 accent">
              <h2>What we offer</h2>
              <ul>
                <li>Bag carry, queue, family, senior & festival shopping help</li>
                <li>Book on the Liftoo Android app</li>
                <li>Live tracking, in-app chat & OTP start</li>
                <li>Wallet, UPI & cash — pay after service</li>
                <li>Refer & earn rewards for customers</li>
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
          <div className="site-page-actions">
            <Link to="/contact" className="site-btn-glass">Contact us</Link>
            <MarketingCta className="site-btn-primary">Download app</MarketingCta>
          </div>
        </div>
      </div>
    </>
  );
}
