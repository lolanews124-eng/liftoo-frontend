import { useEffect } from 'react';
import { getBreadcrumbs, getFaqsForPath, absoluteUrl, type PageSeoMeta } from '../../seo/seoConfig';
import {
  GEO_META,
  buildBreadcrumbSchema,
  buildContactPageSchema,
  buildFaqSchema,
  buildHowToSchema,
  buildLocalBusinessSchema,
  buildMobileAppSchema,
  buildOrganizationSchema,
  buildServicesItemListSchema,
  buildWebPageSchema,
  buildWebsiteSchema,
} from '../../seo/structuredData';

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

function upsertLink(rel: string, href: string, linkId: string, attrs?: Record<string, string>) {
  let el = document.querySelector(
    `link[${MANAGED_ATTR}][data-link-id="${linkId}"]`,
  ) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.setAttribute(MANAGED_ATTR, 'true');
    el.setAttribute('data-link-id', linkId);
    document.head.appendChild(el);
  }
  el.rel = rel;
  el.href = href;
  if (attrs) {
    Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
  }
}

function upsertJsonLd(id: string, data: object | null) {
  if (!data) {
    document.getElementById(id)?.remove();
    return;
  }
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
  pathname: string;
}

export function PageSeo({ title, description, keywords, path, ogType = 'website', pathname }: PageSeoProps) {
  useEffect(() => {
    const url = absoluteUrl(path);
    const faqs = getFaqsForPath(pathname);
    const crumbs = getBreadcrumbs(pathname);

    document.title = title;
    document.documentElement.lang = 'en-IN';

    upsertMeta('description', description);
    upsertMeta('keywords', keywords);
    upsertMeta('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    upsertMeta('author', 'Liftoo');
    upsertMeta('publisher', 'Liftoo');
    upsertMeta('language', 'English');
    upsertMeta('content-language', 'en-IN');

    upsertMeta('geo.region', GEO_META.region);
    upsertMeta('geo.placename', GEO_META.placename);
    upsertMeta('geo.position', GEO_META.position);
    upsertMeta('ICBM', GEO_META.icbm);

    upsertMeta('og:title', title, 'property');
    upsertMeta('og:description', description, 'property');
    upsertMeta('og:type', ogType, 'property');
    upsertMeta('og:url', url, 'property');
    upsertMeta('og:site_name', 'Liftoo', 'property');
    upsertMeta('og:locale', 'en_IN', 'property');
    upsertMeta('og:locale:alternate', 'hi_IN', 'property');
    upsertMeta('og:image', absoluteUrl('/hero-promo.png'), 'property');
    upsertMeta('og:image:alt', 'Liftoo shopping assistant app in Patna, Bihar', 'property');
    upsertMeta('og:image:width', '1024', 'property');
    upsertMeta('og:image:height', '1024', 'property');

    upsertMeta('twitter:card', 'summary_large_image');
    upsertMeta('twitter:title', title);
    upsertMeta('twitter:description', description);
    upsertMeta('twitter:image', absoluteUrl('/hero-promo.png'));
    upsertMeta('twitter:image:alt', 'Liftoo shopping assistant app in Patna, Bihar');

    upsertLink('canonical', url, 'canonical');
    upsertLink('alternate', absoluteUrl('/llms.txt'), 'llms-txt', {
      type: 'text/plain',
      title: 'LLM content index',
    });

    upsertJsonLd('liftoo-org-schema', buildOrganizationSchema());
    upsertJsonLd('liftoo-website-schema', buildWebsiteSchema());
    upsertJsonLd('liftoo-webpage-schema', buildWebPageSchema({ title, description, keywords, path }, path));
    upsertJsonLd('liftoo-breadcrumb-schema', crumbs.length > 1 ? buildBreadcrumbSchema(crumbs) : null);
    upsertJsonLd('liftoo-faq-schema', buildFaqSchema(faqs));
    upsertJsonLd('liftoo-app-schema', buildMobileAppSchema());

    if (pathname === '/' || pathname === '/contact') {
      upsertJsonLd('liftoo-local-schema', buildLocalBusinessSchema(description));
    } else {
      upsertJsonLd('liftoo-local-schema', null);
    }

    if (pathname === '/how-it-works') {
      upsertJsonLd('liftoo-howto-schema', buildHowToSchema());
    } else {
      upsertJsonLd('liftoo-howto-schema', null);
    }

    if (pathname === '/services') {
      upsertJsonLd('liftoo-services-schema', buildServicesItemListSchema());
    } else {
      upsertJsonLd('liftoo-services-schema', null);
    }

    if (pathname === '/contact') {
      upsertJsonLd('liftoo-contact-schema', buildContactPageSchema());
    } else {
      upsertJsonLd('liftoo-contact-schema', null);
    }
  }, [title, description, keywords, path, ogType, pathname]);

  return null;
}
