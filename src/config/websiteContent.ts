import { SITE_INFO } from './siteInfo';

/** Marketing copy aligned with the Liftoo Android app — no WhatsApp, no inflated stats. */
export const WEBSITE_COPY = {
  heroLead: `Book a verified shopping assistant in ${SITE_INFO.city} — bag carry, queue help, family & senior support at malls and markets.`,
  trustRating: 'Loved by shoppers in Patna',
  trustVerified: 'KYC verified assistants',
  stats: [
    { value: '5', label: 'Service types' },
    { value: '100%', label: 'Verified assistants' },
    { value: '10+', label: `${SITE_INFO.city} venues` },
    { value: '₹0', label: 'Pay until done' },
  ] as const,
  pricingHighlights: [
    { key: 'rates', title: 'Transparent hourly rates', desc: 'Pay only for the duration you book' },
    { key: 'match', title: 'Real-time matching', desc: 'Nearby assistants accept your request live' },
    { key: 'track', title: 'Live in-app tracking', desc: 'Map, ETA, chat & notifications in the app' },
    { key: 'support', title: 'App support', desc: `Call ${SITE_INFO.phone} or email ${SITE_INFO.email}` },
  ] as const,
  finalCta: {
    badge: 'Get started',
    title: 'Download Liftoo and book your first assistant',
    lead: 'Bag carry, queues, family outings or senior help — book in the app and pay only when the job is done.',
  },
  testimonialsHeading: 'What Patna shoppers say',
} as const;
