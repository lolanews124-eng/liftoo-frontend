import { Outlet, useLocation } from 'react-router-dom';
import { PageSeo } from '../components/seo/PageSeo';
import { getSeoForPath } from '../seo/seoConfig';
import { WebsiteFooter } from '../components/website/WebsiteFooter';
import { WebsiteHeader } from '../components/website/WebsiteHeader';

export function WebsiteLayout() {
  const { pathname } = useLocation();
  const seo = getSeoForPath(pathname);

  return (
    <div className="site-shell">
      <PageSeo {...seo} pathname={pathname} />
      <WebsiteHeader />
      <main className="site-main" id="main-content">
        <Outlet />
      </main>
      <WebsiteFooter />
    </div>
  );
}
