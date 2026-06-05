import { Mail, MapPin, MessageCircle, Send } from 'lucide-react';
import { PlayStoreCta } from '../../components/website/PlayStoreCta';
import { PageHero } from '../../components/website/PageHero';
import { SITE_INFO } from '../../config/siteInfo';

const CONTACT_ITEMS = [
  {
    icon: MapPin,
    title: 'Office address',
    highlight: SITE_INFO.displayAddress,
    detail: `Service available across ${SITE_INFO.serviceArea}.`,
  },
  {
    icon: Mail,
    title: 'Email us',
    highlight: SITE_INFO.email,
    detail: 'We respond within 24 hours on business days.',
    href: `mailto:${SITE_INFO.email}`,
  },
  {
    icon: MessageCircle,
    title: 'In-app support',
    highlight: 'Help & support in app',
    detail: 'Open Support from profile in the Liftoo app to raise a ticket or chat with our team.',
    cta: true,
  },
] as const;

export function ContactPage() {
  return (
    <>
      <PageHero
        pill="Contact"
        title="We're here to help"
        lead={`Based in ${SITE_INFO.displayAddress}. Questions about booking, payments, or becoming an assistant? Reach out anytime.`}
      />
      <div className="site-page">
        <div className="site-container">
          <div className="site-contact-address-banner">
            <div className="site-contact-address-icon" aria-hidden>
              <MapPin />
            </div>
            <div>
              <p className="site-contact-address-label">Our location</p>
              <h2>{SITE_INFO.displayAddress}</h2>
              <p>{SITE_INFO.serviceArea}</p>
            </div>
          </div>

          <div className="site-contact-layout">
            <div className="site-contact-cards">
              {CONTACT_ITEMS.map(({ icon: Icon, title, highlight, detail, ...rest }) => (
                <article key={title} className="site-contact-card-v2">
                  <div className="site-contact-card-icon">
                    <Icon aria-hidden />
                  </div>
                  <h3>{title}</h3>
                  {'href' in rest && rest.href ? (
                    <a href={rest.href}>{highlight}</a>
                  ) : 'cta' in rest && rest.cta ? (
                    <PlayStoreCta className="site-text-link">{highlight} →</PlayStoreCta>
                  ) : (
                    <p className="site-contact-highlight">{highlight}</p>
                  )}
                  <p>{detail}</p>
                </article>
              ))}
            </div>

            <form
              className="site-contact-form-v2"
              onSubmit={(e) => {
                e.preventDefault();
                window.location.href = `mailto:${SITE_INFO.email}?subject=Liftoo%20inquiry`;
              }}
            >
              <div className="site-contact-form-head">
                <div className="site-contact-form-icon" aria-hidden>
                  <Send />
                </div>
                <div>
                  <h2>Send a message</h2>
                  <p>Tell us how we can help — we&apos;ll get back to you from {SITE_INFO.displayAddress}.</p>
                </div>
              </div>
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
                <textarea rows={5} required placeholder="How can we help?" />
              </label>
              <button type="submit" className="site-btn-primary site-contact-submit">
                Send via email
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
