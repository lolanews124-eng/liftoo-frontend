import { Link } from 'react-router-dom';
import { SITE_INFO } from '../../config/siteInfo';

type SeoContentVariant = 'home' | 'services' | 'about' | 'assistants' | 'contact';

const CONTENT: Record<
  SeoContentVariant,
  { heading: string; paragraphs: string[] }
> = {
  home: {
    heading: `Personal shopping assistant in ${SITE_INFO.displayAddress}`,
    paragraphs: [
      `Liftoo helps you shop smarter across ${SITE_INFO.city} — whether you are at P&M Mall, City Centre Mall, Boring Road market or a local exhibition. Book a trained assistant for bag carry, queue assistance, family shopping, senior citizen help or festival shopping directly from the Android app.`,
      `Our assistants are KYC-verified, rates are shown upfront per hour, and you pay only after the service is complete. Track your booking with live map, in-app chat and notifications — all inside Liftoo. Serving shoppers and families across ${SITE_INFO.state}, ${SITE_INFO.country}.`,
    ],
  },
  services: {
    heading: `Liftoo services and rates in ${SITE_INFO.city}`,
    paragraphs: [
      'Liftoo offers five on-demand shopping services in Patna: bag carry assistance, queue help, family shopping support, senior citizen help and festival shopping. Each service is charged per hour with duration options from 30 minutes to 4 hours.',
      'Rates are loaded live from the Liftoo platform and displayed in the app before you confirm a booking. Whether you are at P&M Mall, City Centre Mall, Maurya Lok or a neighbourhood market, you can book a verified assistant and pay only after the job is done.',
    ],
  },
  about: {
    heading: `About Liftoo — ${SITE_INFO.displayAddress}`,
    paragraphs: [
      `Liftoo is an on-demand shopping assistant platform built for ${SITE_INFO.city}. We connect shoppers who need an extra pair of hands with KYC-verified local assistants who want flexible, meaningful work across malls and markets in Bihar.`,
      'Our pay-after-service model keeps pricing transparent: book in the Android app, track your assistant live, and pay via wallet, UPI or cash only when the service is complete. Liftoo is a product of GOLAX, focused on making everyday shopping lighter for families and seniors.',
    ],
  },
  assistants: {
    heading: `Become a Liftoo assistant in ${SITE_INFO.displayAddress}`,
    paragraphs: [
      `Liftoo assistants in ${SITE_INFO.city} help shoppers carry bags, manage queues and support family outings. Join through the Android app, complete KYC verification and start accepting nearby jobs on your own schedule.`,
      'Earnings are credited after customers complete payment. Wallet payouts, cash job settlement and rating-based growth help you build trust and get more bookings across Patna and nearby areas in Bihar.',
    ],
  },
  contact: {
    heading: `Contact Liftoo in ${SITE_INFO.displayAddress}`,
    paragraphs: [
      `Reach Liftoo for booking questions, payment support or assistant onboarding. We are based in ${SITE_INFO.displayAddress} and serve ${SITE_INFO.serviceArea}.`,
      `Email ${SITE_INFO.email} or use in-app Help & Support from your Liftoo profile. For service details and rates, visit our services page or download the app from Google Play.`,
    ],
  },
};

interface SeoContentSectionProps {
  variant?: SeoContentVariant;
}

export function SeoContentSection({ variant = 'home' }: SeoContentSectionProps) {
  const { heading, paragraphs } = CONTENT[variant];

  return (
    <section className="lp-section site-seo-content" aria-labelledby="seo-content-heading">
      <div className="lp-container">
        <div className="site-seo-content-card">
          <h2 id="seo-content-heading">{heading}</h2>
          {paragraphs.map((text) => (
            <p key={text.slice(0, 40)}>{text}</p>
          ))}
          {variant === 'home' && (
            <p className="site-seo-content-links">
              <Link to="/services">View services</Link>
              {' · '}
              <Link to="/how-it-works">How it works</Link>
              {' · '}
              <Link to="/for-assistants">Become an assistant</Link>
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
