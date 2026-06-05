import { SITE_INFO } from '../config/siteInfo';

export interface PageSeoMeta {
  title: string;
  description: string;
  keywords: string;
  path: string;
  ogType?: string;
}

const BASE_KEYWORDS = [
  'Liftoo',
  'shopping assistant Patna',
  'bag carry service Patna',
  'mall assistant Bihar',
  'personal shopping help India',
  'queue assistance Patna',
  'senior shopping help',
  'family shopping assistant',
].join(', ');

export const DEFAULT_SEO: PageSeoMeta = {
  title: 'Liftoo — Personal Shopping Assistant in Patna, Bihar',
  description:
    'Download Liftoo to book a verified shopping assistant in Patna, Bihar. Bag carry, queue help, family & senior support at malls and markets. Pay after service.',
  keywords: BASE_KEYWORDS,
  path: '/',
};

export const PAGE_SEO: Record<string, PageSeoMeta> = {
  '/': {
    ...DEFAULT_SEO,
    title: 'Liftoo — Shopping Assistant App in Patna, Bihar | Bag Carry & Mall Help',
    description:
      'Liftoo is Patna\'s on-demand shopping assistant app. Book bag carry, queue help, family and senior support at P&M Mall, City Centre and markets across Bihar. Download free on Google Play.',
    path: '/',
  },
  '/how-it-works': {
    title: 'How Liftoo Works — Book a Shopping Assistant in Patna',
    description:
      'Learn how to download Liftoo, pick a service, track your assistant live in the app and pay only when the job is done. Simple booking for Patna shoppers.',
    keywords: `${BASE_KEYWORDS}, how Liftoo works, book shopping assistant`,
    path: '/how-it-works',
  },
  '/services': {
    title: 'Liftoo Services & Rates in Patna — Bag Carry, Queue, Family, Senior',
    description:
      'Explore Liftoo services in Patna: bag carry assistance, queue help, family shopping, senior citizen help and festival shopping. Transparent hourly rates from the app.',
    keywords: `${BASE_KEYWORDS}, Liftoo rates Patna, bag carry price, queue assistance`,
    path: '/services',
  },
  '/about': {
    title: 'About Liftoo — Shopping Assistant Platform in Patna, Bihar',
    description:
      'Liftoo connects Patna shoppers with KYC-verified assistants for malls, markets and family outings. Based in Patna, Bihar, India. Fair pay-after-service model.',
    keywords: `${BASE_KEYWORDS}, about Liftoo, Dleaftech`,
    path: '/about',
  },
  '/for-assistants': {
    title: 'Become a Liftoo Assistant in Patna — Earn Helping Shoppers',
    description:
      'Join Liftoo as a verified shopping assistant in Patna, Bihar. Flexible hours, fair earnings and jobs near you. Download the app and complete KYC to start.',
    keywords: `${BASE_KEYWORDS}, Liftoo assistant jobs Patna, earn money shopping help`,
    path: '/for-assistants',
  },
  '/contact': {
    title: 'Contact Liftoo — Patna, Bihar, India',
    description:
      `Contact Liftoo in Patna, Bihar, India. Email ${SITE_INFO.email} or use in-app support for booking and assistant queries.`,
    keywords: `${BASE_KEYWORDS}, contact Liftoo Patna`,
    path: '/contact',
  },
  '/legal': {
    title: 'Liftoo Legal & Policies',
    description: 'Privacy policy, terms of service, refunds and other legal policies for Liftoo customers and assistants in India.',
    keywords: 'Liftoo privacy policy, Liftoo terms, legal',
    path: '/legal',
  },
};

export const FAQ_ITEMS = [
  {
    question: 'What is Liftoo?',
    answer:
      'Liftoo is a personal shopping assistant app in Patna, Bihar. You book a verified assistant to carry bags, wait in queues, or help family and senior citizens at malls and markets.',
  },
  {
    question: 'Where does Liftoo operate?',
    answer:
      'Liftoo currently serves Patna, Bihar, India — including P&M Mall, City Centre Mall, Boring Road, Fraser Road and other popular shopping venues.',
  },
  {
    question: 'How much does Liftoo cost?',
    answer:
      'Services are charged per hour with transparent rates shown in the app before you book. You pay only after the assistant completes the job via wallet, UPI or cash.',
  },
  {
    question: 'How do I book a Liftoo assistant?',
    answer:
      'Download the Liftoo Android app from Google Play, sign up, choose your location in Patna, pick a service and duration, then confirm. Track everything live in the app.',
  },
  {
    question: 'Are Liftoo assistants verified?',
    answer:
      'Yes. Every assistant completes KYC and admin verification before accepting jobs on the Liftoo platform.',
  },
  {
    question: 'Can I book Liftoo for my parents?',
    answer:
      'Yes. Senior help and family shopping services are designed for parents and family outings. You can track the booking live with map and in-app chat.',
  },
] as const;

export const SITEMAP_PATHS = [
  '/',
  '/how-it-works',
  '/services',
  '/about',
  '/for-assistants',
  '/contact',
  '/legal',
  '/legal/privacy-policy',
  '/legal/terms-of-service',
  '/legal/refund-cancellation',
  '/legal/assistant-partner-agreement',
  '/legal/acceptable-use',
  '/legal/account-deletion',
  '/legal/cookie-policy',
] as const;

export function getSeoForPath(pathname: string): PageSeoMeta {
  if (PAGE_SEO[pathname]) return PAGE_SEO[pathname];
  if (pathname.startsWith('/legal/')) {
    const slug = pathname.replace('/legal/', '');
    const title = slug
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
    return {
      title: `${title} — Liftoo`,
      description: `Read Liftoo's ${title.toLowerCase()} for customers and assistants in India.`,
      keywords: `Liftoo ${slug.replace(/-/g, ' ')}, legal`,
      path: pathname,
    };
  }
  return DEFAULT_SEO;
}

export function absoluteUrl(path: string) {
  const base = SITE_INFO.siteUrl.replace(/\/$/, '');
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}
