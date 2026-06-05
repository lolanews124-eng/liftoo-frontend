import { SITE_INFO, PATNA_VENUES } from '../config/siteInfo';

export interface PageSeoMeta {
  title: string;
  description: string;
  keywords: string;
  path: string;
  ogType?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface BreadcrumbItem {
  name: string;
  path: string;
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
  'festival shopping Patna',
  'on-demand helper Patna',
  'P&M Mall assistant',
  'City Centre Mall Patna',
].join(', ');

export const GEO_META = {
  region: 'IN-BR',
  placename: SITE_INFO.displayAddress,
  position: '25.5941;85.1376',
  icbm: '25.5941, 85.1376',
} as const;

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
      "Liftoo is Patna's on-demand shopping assistant app. Book bag carry, queue help, family and senior support at P&M Mall, City Centre and markets across Bihar. Download free on Google Play.",
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
    description: `Contact Liftoo in Patna, Bihar, India. Email ${SITE_INFO.email} or use in-app support for booking and assistant queries.`,
    keywords: `${BASE_KEYWORDS}, contact Liftoo Patna`,
    path: '/contact',
  },
  '/legal': {
    title: 'Liftoo Legal & Policies',
    description:
      'Privacy policy, terms of service, refunds and other legal policies for Liftoo customers and assistants in India.',
    keywords: 'Liftoo privacy policy, Liftoo terms, legal',
    path: '/legal',
  },
};

export const GLOBAL_FAQ_ITEMS: FaqItem[] = [
  {
    question: 'What is Liftoo?',
    answer:
      'Liftoo is a personal shopping assistant app in Patna, Bihar, India. You book a KYC-verified assistant to carry bags, wait in queues, or help family and senior citizens at malls and markets.',
  },
  {
    question: 'Where does Liftoo operate?',
    answer: `Liftoo serves ${SITE_INFO.displayAddress} — including ${PATNA_VENUES.slice(0, 6).join(', ')} and other popular shopping venues.`,
  },
  {
    question: 'How much does Liftoo cost?',
    answer:
      'Services are charged per hour with transparent rates shown in the app before you book. You pay only after the assistant completes the job via wallet, UPI or cash. No upfront booking fee.',
  },
  {
    question: 'How do I book a Liftoo assistant?',
    answer:
      'Download the Liftoo Android app from Google Play, sign up, choose your location in Patna, pick a service and duration (30 min to 4 hours), then confirm. Track everything live in the app.',
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
  {
    question: 'Is Liftoo available on iPhone?',
    answer:
      'Liftoo is currently available on Android via Google Play. Bookings, tracking and payments run inside the Liftoo mobile app.',
  },
  {
    question: 'When do I pay for a Liftoo booking?',
    answer:
      'You pay only after the assistant marks the job complete. Wallet, UPI and cash are accepted in the app. Free cancellation is available within the window shown at booking.',
  },
  {
    question: 'What services does Liftoo offer in Patna?',
    answer:
      'Liftoo offers bag carry, queue assistance, family shopping help, senior citizen support and festival shopping assistance — all bookable from the Android app with live tracking.',
  },
  {
    question: 'How do I contact Liftoo support?',
    answer: `Email ${SITE_INFO.email} or open Help & Support from your profile in the Liftoo app. We are based in ${SITE_INFO.displayAddress}.`,
  },
];

const PAGE_FAQ_EXTRAS: Record<string, FaqItem[]> = {
  '/services': [
    {
      question: 'What are Liftoo hourly rates in Patna?',
      answer:
        'Rates vary by service type and are shown live in the Liftoo app before you confirm. Choose 30 minutes, 1, 2, 3 or 4 hour slots with transparent per-hour pricing.',
    },
    {
      question: 'Can I book Liftoo at P&M Mall or City Centre?',
      answer:
        'Yes. Liftoo supports major Patna malls and markets including P&M Mall, City Centre Mall, Boring Road, Fraser Road and more — select your venue in the app.',
    },
  ],
  '/for-assistants': [
    {
      question: 'How do I become a Liftoo assistant in Patna?',
      answer:
        'Download the Liftoo app, switch to assistant mode, complete KYC documents and wait for admin verification (usually 1–2 business days). Then go online and accept nearby jobs.',
    },
    {
      question: 'How do Liftoo assistants get paid?',
      answer:
        'Assistants earn after the customer completes payment. Wallet payouts are available. Cash jobs are supported with automatic settlement through the assistant wallet.',
    },
  ],
  '/contact': [
    {
      question: 'What is Liftoo office address?',
      answer: `Liftoo is based in ${SITE_INFO.displayAddress}. Service is available across ${SITE_INFO.serviceArea}.`,
    },
  ],
};

/** @deprecated Use GLOBAL_FAQ_ITEMS */
export const FAQ_ITEMS = GLOBAL_FAQ_ITEMS;

export const HOW_TO_STEPS = [
  {
    name: 'Download Liftoo',
    text: 'Install the Liftoo Android app from Google Play and sign up with your email.',
  },
  {
    name: 'Pick location in Patna',
    text: 'Choose your mall or market — P&M Mall, City Centre, Boring Road or another supported venue.',
  },
  {
    name: 'Choose a service',
    text: 'Select bag carry, queue help, family, senior or festival shopping and pick your duration.',
  },
  {
    name: 'Track in the app',
    text: 'Follow your assistant on a live map, chat in-app and confirm start with OTP.',
  },
  {
    name: 'Pay after service',
    text: 'Pay only when the job is done via wallet, UPI or cash inside the app.',
  },
] as const;

export const SERVICE_OFFERINGS = [
  {
    name: 'Bag Carry Assistance',
    description: 'A verified assistant carries your shopping bags while you browse Patna malls and markets.',
    slug: 'bag_carry',
  },
  {
    name: 'Queue Assistance',
    description: 'Your assistant waits in billing or service queues so you can continue shopping.',
    slug: 'queue',
  },
  {
    name: 'Family Shopping Help',
    description: 'Extra hands for family outings, kids and group shopping trips in Patna.',
    slug: 'family',
  },
  {
    name: 'Senior Citizen Help',
    description: 'Trusted support for parents and seniors — bookable and trackable from the Liftoo app.',
    slug: 'senior',
  },
  {
    name: 'Festival Shopping',
    description: 'Seasonal shopping help for exhibitions, festivals and busy market days in Bihar.',
    slug: 'festival',
  },
] as const;

export const MARKETING_PATHS = [
  '/',
  '/how-it-works',
  '/services',
  '/about',
  '/for-assistants',
  '/contact',
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

const BREADCRUMB_LABELS: Record<string, string> = {
  '/': 'Home',
  '/how-it-works': 'How it works',
  '/services': 'Services',
  '/about': 'About',
  '/for-assistants': 'For assistants',
  '/contact': 'Contact',
  '/legal': 'Legal',
};

export function isMarketingPath(pathname: string) {
  return (MARKETING_PATHS as readonly string[]).includes(pathname);
}

export function getFaqsForPath(pathname: string): FaqItem[] {
  if (pathname.startsWith('/legal')) return [];
  const extras = PAGE_FAQ_EXTRAS[pathname] ?? [];
  if (isMarketingPath(pathname)) {
    return [...GLOBAL_FAQ_ITEMS, ...extras];
  }
  return GLOBAL_FAQ_ITEMS.slice(0, 6);
}

export function getBreadcrumbs(pathname: string): BreadcrumbItem[] {
  if (pathname === '/') return [{ name: 'Home', path: '/' }];

  const crumbs: BreadcrumbItem[] = [{ name: 'Home', path: '/' }];

  if (pathname.startsWith('/legal/')) {
    crumbs.push({ name: 'Legal', path: '/legal' });
    const slug = pathname.replace('/legal/', '');
    const title = slug
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
    crumbs.push({ name: title, path: pathname });
    return crumbs;
  }

  const label = BREADCRUMB_LABELS[pathname];
  if (label) crumbs.push({ name: label, path: pathname });

  return crumbs;
}

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
      description: `Read Liftoo's ${title.toLowerCase()} for customers and assistants in Patna, Bihar, India.`,
      keywords: `Liftoo ${slug.replace(/-/g, ' ')}, legal, Patna`,
      path: pathname,
    };
  }
  return DEFAULT_SEO;
}

export function absoluteUrl(path: string) {
  const base = SITE_INFO.siteUrl.replace(/\/$/, '');
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}
