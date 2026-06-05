import { Outlet, useLocation } from 'react-router-dom';
import { PageSeo } from '../components/seo/PageSeo';
import { getSeoForPath } from '../seo/seoConfig';
import { WebsiteFooter } from '../components/website/WebsiteFooter';
import { WebsiteHeader } from '../components/website/WebsiteHeader';

export function WebsiteLayout() {
  const { pathname } = useLocation();
  const seo = getSeoForPath(pathname);
  const includeFaq = pathname === '/' || pathname === '/how-it-works';

  return (
    <div className="site-shell">
      <PageSeo {...seo} includeFaq={includeFaq} />
      <WebsiteHeader />
      <main className="site-main">
        <Outlet />
      </main>
      <WebsiteFooter />
    </div>
  );
}
