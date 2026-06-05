import { SITE_INFO } from '../config/siteInfo';
import {
  GEO_META,
  HOW_TO_STEPS,
  SERVICE_OFFERINGS,
  absoluteUrl,
  type BreadcrumbItem,
  type FaqItem,
  type PageSeoMeta,
} from './seoConfig';

export function buildBreadcrumbSchema(crumbs: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

export function buildFaqSchema(faqs: FaqItem[]) {
  if (!faqs.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

export function buildWebPageSchema(meta: PageSeoMeta, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    name: meta.title,
    description: meta.description,
    inLanguage: 'en-IN',
    isPartOf: { '@id': `${SITE_INFO.siteUrl}#website` },
    about: {
      '@type': 'Organization',
      name: 'Liftoo',
      areaServed: SITE_INFO.displayAddress,
    },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', '.page-hero-lead', '.site-seo-content-card p', '.site-faq-card h3', '.site-faq-card p'],
    },
  };
}

export function buildOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_INFO.siteUrl}#organization`,
    name: 'Liftoo',
    legalName: 'DLEAFTECH PRIVATE LIMITED',
    url: SITE_INFO.siteUrl,
    logo: absoluteUrl('/favicon.png'),
    email: SITE_INFO.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: SITE_INFO.city,
      addressRegion: SITE_INFO.state,
      addressCountry: SITE_INFO.country,
    },
    areaServed: {
      '@type': 'City',
      name: SITE_INFO.city,
      containedInPlace: { '@type': 'State', name: SITE_INFO.state },
    },
    knowsAbout: [
      'Personal shopping assistance',
      'Bag carry service',
      'Queue management',
      'Senior citizen shopping help',
      'Family shopping assistance',
      'On-demand services in Patna',
    ],
    sameAs: [SITE_INFO.playStoreUrl, 'https://www.golaxindia.com'],
  };
}

export function buildLocalBusinessSchema(description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_INFO.siteUrl}#localbusiness`,
    name: 'Liftoo — Personal Shopping Assistant',
    description,
    url: SITE_INFO.siteUrl,
    image: absoluteUrl('/hero-promo.png'),
    email: SITE_INFO.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: SITE_INFO.city,
      addressRegion: SITE_INFO.state,
      addressCountry: SITE_INFO.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 25.5941,
      longitude: 85.1376,
    },
    areaServed: SITE_INFO.displayAddress,
    priceRange: '₹₹',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '09:00',
      closes: '21:00',
    },
  };
}

export function buildWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_INFO.siteUrl}#website`,
    name: 'Liftoo',
    url: SITE_INFO.siteUrl,
    description: `Personal shopping assistant app in ${SITE_INFO.displayAddress}`,
    inLanguage: 'en-IN',
    publisher: { '@id': `${SITE_INFO.siteUrl}#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_INFO.siteUrl}/services?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function buildMobileAppSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Liftoo - Shopping Assistant',
    applicationCategory: 'LifestyleApplication',
    operatingSystem: 'Android',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
    installUrl: SITE_INFO.playStoreUrl,
    url: SITE_INFO.playStoreUrl,
    description: `Book verified shopping assistants in ${SITE_INFO.city} for bag carry, queue help, family and senior support.`,
    areaServed: SITE_INFO.displayAddress,
    provider: { '@id': `${SITE_INFO.siteUrl}#organization` },
  };
}

export function buildHowToSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to book a Liftoo shopping assistant in ${SITE_INFO.city}`,
    description: `Step-by-step guide to download Liftoo and book a verified assistant in ${SITE_INFO.displayAddress}.`,
    step: HOW_TO_STEPS.map((step, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: step.name,
      text: step.text,
    })),
  };
}

export function buildServicesItemListSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Liftoo services in ${SITE_INFO.city}`,
    itemListElement: SERVICE_OFFERINGS.map((service, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Service',
        name: service.name,
        description: service.description,
        areaServed: SITE_INFO.displayAddress,
        provider: { '@id': `${SITE_INFO.siteUrl}#organization` },
        url: absoluteUrl('/services'),
      },
    })),
  };
}

export function buildContactPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    url: absoluteUrl('/contact'),
    name: 'Contact Liftoo',
    description: `Contact Liftoo in ${SITE_INFO.displayAddress}`,
    mainEntity: { '@id': `${SITE_INFO.siteUrl}#organization` },
  };
}

export { GEO_META };
