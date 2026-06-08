import { useState } from 'react';
import { Briefcase, CheckCircle2, Clock, IndianRupee, Send, Star } from 'lucide-react';
import { PageHero } from '../../components/website/PageHero';
import { SeoContentSection } from '../../components/website/SeoContentSection';
import { SeoFaqSection } from '../../components/website/SeoFaqSection';
import { PlayStoreCta } from '../../components/website/PlayStoreCta';
import { SITE_INFO } from '../../config/siteInfo';
import { websiteApi } from '../../api/client';
import { ApiError } from '../../api/client';

const PERKS = [
  { icon: Clock, title: 'Flexible hours', desc: 'Go online when you want. Accept jobs near you in Patna.' },
  { icon: IndianRupee, title: 'Fair earnings', desc: 'Get paid after the customer completes payment — wallet payouts available.' },
  { icon: Briefcase, title: 'Simple onboarding', desc: 'Apply here, download the app, complete KYC, and start accepting jobs.' },
  { icon: Star, title: 'Build your rating', desc: 'Great service brings more bookings and repeat customers.' },
];

function normalizePhone(value: string) {
  return value.replace(/\D/g, '').slice(0, 10);
}

export function BecomeAssistantPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
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
      const res = await websiteApi.applyAsAssistant({
        name: name.trim(),
        phone: cleanPhone,
        email: email.trim() || undefined,
        message: message.trim() || undefined,
      });
      setFeedback({ type: 'success', text: res.message });
      setName('');
      setPhone('');
      setEmail('');
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
        pill="Become an assistant"
        title="Earn helping people shop in Patna"
        lead="Join Liftoo as a verified shopping assistant. Flexible hours, fair pay, and jobs near you — apply in under a minute."
      />
      <div className="site-page">
        <div className="site-container">
          <div className="site-assistant-perks">
            {PERKS.map(({ icon: Icon, title, desc }) => (
              <article key={title} className="site-assistant-perk">
                <div className="site-assistant-perk-icon" aria-hidden>
                  <Icon />
                </div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </article>
            ))}
          </div>

          <div className="site-assistant-apply-layout">
            <div className="site-about-card-v2 site-assistant-steps">
              <h2>What happens next?</h2>
              <ol>
                <li>Submit this quick form — our team reviews applications in Patna.</li>
                <li>Download the Liftoo app and sign up with your mobile number.</li>
                <li>Complete KYC documents in assistant mode.</li>
                <li>After admin verification, go online and accept nearby jobs.</li>
              </ol>
              <PlayStoreCta className="site-btn-glass site-btn-sm">Download app</PlayStoreCta>
            </div>

            <form className="site-contact-form-v2 site-assistant-apply-form" onSubmit={handleSubmit}>
              <div className="site-contact-form-head">
                <div className="site-contact-form-icon" aria-hidden>
                  <Send />
                </div>
                <div>
                  <h2>Apply now</h2>
                  <p>Just your name and mobile — we&apos;ll call you from {SITE_INFO.displayAddress}.</p>
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

              <label className="field">
                <span>Full name *</span>
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
                <span>Mobile number *</span>
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
                <span>Email (optional)</span>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>

              <label className="field">
                <span>Message (optional)</span>
                <textarea
                  rows={3}
                  placeholder="Any area in Patna you prefer, or questions…"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  maxLength={500}
                />
              </label>

              <button
                type="submit"
                className="site-btn-primary site-contact-submit"
                disabled={submitting}
              >
                {submitting ? 'Submitting…' : 'Submit application'}
              </button>
            </form>
          </div>
        </div>
      </div>
      <SeoContentSection variant="assistants" />
      <SeoFaqSection />
    </>
  );
}
