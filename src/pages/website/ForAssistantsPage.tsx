import { PageHero } from '../../components/website/PageHero';
import { PlayStoreCta } from '../../components/website/PlayStoreCta';

const PERKS = [
  { title: 'Flexible hours', desc: 'Go online when you want. Accept jobs near you.', icon: '🕐' },
  { title: 'Fair earnings', desc: 'Paid after customer completes payment — wallet payouts available.', icon: '💰' },
  { title: 'Cash jobs', desc: 'Collect cash; settlement wallet handles company share automatically.', icon: '💵' },
  { title: 'Grow your rating', desc: 'Great service builds trust and more bookings.', icon: '⭐' },
];

export function ForAssistantsPage() {
  return (
    <>
      <PageHero
        pill="For assistants"
        title="Earn helping people shop"
        lead="Join Liftoo as a verified shopping assistant. Use the mobile app to go online, accept jobs, and track earnings."
        cta={{ label: 'Download app', to: '/auth/login' }}
      />
      <div className="site-page">
        <div className="site-container">
          <div className="site-services-page-grid">
            {PERKS.map((p) => (
              <article key={p.title} className="site-service-card-v2" style={{ cursor: 'default' }}>
                <span className="icon">{p.icon}</span>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </article>
            ))}
          </div>
          <div className="site-about-card-v2" style={{ marginTop: 24 }}>
            <h2>How to join</h2>
            <ol style={{ lineHeight: 1.9, color: 'var(--site-muted)', paddingLeft: 20 }}>
              <li>Download the Liftoo app and sign up with email.</li>
              <li>Switch to assistant mode and complete KYC documents.</li>
              <li>Wait for admin verification — usually 1–2 business days.</li>
              <li>Go online and accept nearby booking requests.</li>
            </ol>
          </div>
          <div className="site-page-actions">
            <PlayStoreCta className="site-btn-primary">Download on Google Play</PlayStoreCta>
            <p className="site-page-actions-note">
              <strong>Note:</strong> Assistant and customer features run in the Liftoo Android app.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
