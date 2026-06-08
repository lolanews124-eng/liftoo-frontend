import { useState } from 'react';
import { CheckCircle2, Mail, MapPin, MessageCircle, Send } from 'lucide-react';
import { PlayStoreCta } from '../../components/website/PlayStoreCta';
import { PageHero } from '../../components/website/PageHero';
import { SeoContentSection } from '../../components/website/SeoContentSection';
import { SeoFaqSection } from '../../components/website/SeoFaqSection';
import { SITE_INFO } from '../../config/siteInfo';
import { websiteApi, ApiError } from '../../api/client';

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

function normalizePhone(value: string) {
  return value.replace(/\D/g, '').slice(0, 10);
}

export function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    const cleanPhone = normalizePhone(phone);
    if (cleanPhone.length !== 10) {
      setFeedback({ type: 'error', text: 'Please enter a valid 10-digit mobile number.' });
      return;
    }

    setSubmitting(true);
    try {
      const res = await websiteApi.submitContact({
        name: name.trim(),
        email: email.trim(),
        phone: cleanPhone,
        message: message.trim(),
      });
      setFeedback({ type: 'success', text: res.message });
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    } catch (err) {
      const text = err instanceof ApiError ? err.message : 'Something went wrong. Please try again.';
      setFeedback({ type: 'error', text });
    } finally {
      setSubmitting(false);
    }
  };

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

            <form className="site-contact-form-v2" onSubmit={handleSubmit}>
              <div className="site-contact-form-head">
                <div className="site-contact-form-icon" aria-hidden>
                  <Send />
                </div>
                <div>
                  <h2>Send a message</h2>
                  <p>Tell us how we can help — we&apos;ll get back to you from {SITE_INFO.displayAddress}.</p>
                </div>
              </div>

              {feedback && (
                <div
                  className={`site-form-alert site-form-alert--${feedback.type}`}
                  role={feedback.type === 'error' ? 'alert' : 'status'}
                >
                  {feedback.type === 'success' && <CheckCircle2 aria-hidden />}
                  <span>{feedback.text}</span>
                </div>
              )}

              <div className="site-form-row">
                <label className="field">
                  <span>Name</span>
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    maxLength={120}
                  />
                </label>
                <label className="field">
                  <span>Email</span>
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>
              </div>
              <label className="field">
                <span>Mobile number</span>
                <input
                  type="tel"
                  required
                  inputMode="numeric"
                  placeholder="10-digit mobile number"
                  value={phone}
                  onChange={(e) => setPhone(normalizePhone(e.target.value))}
                  maxLength={10}
                />
              </label>
              <label className="field">
                <span>Message</span>
                <textarea
                  rows={5}
                  required
                  placeholder="How can we help?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  maxLength={2000}
                />
              </label>
              <button
                type="submit"
                className="site-btn-primary site-contact-submit"
                disabled={submitting}
              >
                {submitting ? 'Sending…' : 'Send message'}
              </button>
            </form>
          </div>
        </div>
      </div>
      <SeoContentSection variant="contact" />
      <SeoFaqSection />
    </>
  );
}
