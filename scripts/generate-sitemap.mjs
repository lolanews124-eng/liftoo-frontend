import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const baseUrl = (process.env.VITE_SITE_URL ?? 'https://liftoo.in').replace(/\/$/, '');
const lastmod = new Date().toISOString().slice(0, 10);

const pages = [
  { path: '/', priority: '1.0', changefreq: 'weekly', image: true },
  { path: '/how-it-works', priority: '0.9', changefreq: 'monthly' },
  { path: '/services', priority: '0.9', changefreq: 'weekly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/become-assistant', priority: '0.8', changefreq: 'monthly' },
  { path: '/contact', priority: '0.7', changefreq: 'monthly' },
  { path: '/legal', priority: '0.4', changefreq: 'yearly' },
  { path: '/legal/privacy-policy', priority: '0.3', changefreq: 'yearly' },
  { path: '/legal/terms-of-service', priority: '0.3', changefreq: 'yearly' },
  { path: '/legal/refund-cancellation', priority: '0.3', changefreq: 'yearly' },
  { path: '/legal/assistant-partner-agreement', priority: '0.3', changefreq: 'yearly' },
  { path: '/legal/acceptable-use', priority: '0.3', changefreq: 'yearly' },
  { path: '/legal/account-deletion', priority: '0.3', changefreq: 'yearly' },
  { path: '/legal/cookie-policy', priority: '0.3', changefreq: 'yearly' },
];

const urls = pages
  .map(({ path, priority, changefreq, image }) => {
    const imageBlock = image
      ? `
    <image:image>
      <image:loc>${baseUrl}/hero-promo.png</image:loc>
      <image:title>Liftoo shopping assistant app in Patna, Bihar</image:title>
    </image:image>`
      : '';
    return `  <url>
    <loc>${baseUrl}${path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>${imageBlock}
  </url>`;
  })
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>
`;

writeFileSync(join(__dirname, '../public/sitemap.xml'), xml, 'utf8');
console.log(`Sitemap generated for ${baseUrl} (${pages.length} URLs)`);
