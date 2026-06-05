import { useEffect } from 'react';
import { FAQ_ITEMS, absoluteUrl, type PageSeoMeta } from '../../seo/seoConfig';
import { SITE_INFO } from '../../config/siteInfo';

const MANAGED_ATTR = 'data-liftoo-seo';

function upsertMeta(name: string, content: string, attr: 'name' | 'property' = 'name') {
  let el = document.querySelector(`meta[${attr}="${name}"][${MANAGED_ATTR}]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    el.setAttribute(MANAGED_ATTR, 'true');
    document.head.appendChild(el);
  }
  el.content = content;
}

function upsertLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"][${MANAGED_ATTR}]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.rel = rel;
    el.setAttribute(MANAGED_ATTR, 'true');
    document.head.appendChild(el);
  }
  el.href = href;
}

function upsertJsonLd(id: string, data: object) {
  let el = document.getElementById(id) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement('script');
    el.id = id;
    el.type = 'application/ld+json';
    el.setAttribute(MANAGED_ATTR, 'true');
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

interface PageSeoProps extends PageSeoMeta {
  includeFaq?: boolean;
}

export function PageSeo({ title, description, keywords, path, ogType = 'website', includeFaq }: PageSeoProps) {
  useEffect(() => {
    const url = absoluteUrl(path);

    document.title = title;
    upsertMeta('description', description);
    upsertMeta('keywords', keywords);
    upsertMeta('robots', 'index, follow, max-image-preview:large');
    upsertMeta('author', 'Liftoo');
    upsertMeta('geo.region', 'IN-BR');
    upsertMeta('geo.placename', SITE_INFO.displayAddress);

    upsertMeta('og:title', title, 'property');
    upsertMeta('og:description', description, 'property');
    upsertMeta('og:type', ogType, 'property');
    upsertMeta('og:url', url, 'property');
    upsertMeta('og:site_name', 'Liftoo', 'property');
    upsertMeta('og:locale', 'en_IN', 'property');
    upsertMeta('og:image', absoluteUrl('/hero-promo.png'), 'property');

    upsertMeta('twitter:card', 'summary_large_image');
    upsertMeta('twitter:title', title);
    upsertMeta('twitter:description', description);
    upsertMeta('twitter:image', absoluteUrl('/hero-promo.png'));

    upsertLink('canonical', url);

    upsertJsonLd('liftoo-org-schema', {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Liftoo',
      legalName: 'DLEAFTECH PRIVATE LIMITED',
      url: SITE_INFO.siteUrl,
      logo: absoluteUrl('/favicon.png'),
      email: SITE_INFO.email,
      telephone: SITE_INFO.phone,
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
      sameAs: [SITE_INFO.playStoreUrl],
    });

    upsertJsonLd('liftoo-local-schema', {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'Liftoo — Personal Shopping Assistant',
      description,
      url,
      image: absoluteUrl('/hero-promo.png'),
      telephone: SITE_INFO.phone,
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
    });

    upsertJsonLd('liftoo-website-schema', {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Liftoo',
      url: SITE_INFO.siteUrl,
      description: 'Personal shopping assistant app in Patna, Bihar, India',
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE_INFO.siteUrl}/services?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    });

    upsertJsonLd('liftoo-app-schema', {
      '@context': 'https://schema.org',
      '@type': 'MobileApplication',
      name: 'Liftoo - Shopping Assistant',
      operatingSystem: 'Android',
      applicationCategory: 'LifestyleApplication',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
      installUrl: SITE_INFO.playStoreUrl,
      url: SITE_INFO.playStoreUrl,
      description:
        'Book verified shopping assistants in Patna for bag carry, queue help, family and senior support.',
    });

    if (includeFaq) {
      upsertJsonLd('liftoo-faq-schema', {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: FAQ_ITEMS.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
      });
    } else {
      document.getElementById('liftoo-faq-schema')?.remove();
    }
  }, [title, description, keywords, path, ogType, includeFaq]);

  return null;
}
