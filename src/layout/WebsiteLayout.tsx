import { Outlet, useLocation } from 'react-router-dom';
import { PageSeo } from '../components/seo/PageSeo';
import { getBreadcrumbs, getSeoForPath } from '../seo/seoConfig';
import { PageBreadcrumbs } from '../components/website/PageBreadcrumbs';
import { WebsiteFooter } from '../components/website/WebsiteFooter';
import { WebsiteHeader } from '../components/website/WebsiteHeader';

export function WebsiteLayout() {
  const { pathname } = useLocation();
  const seo = getSeoForPath(pathname);
  const breadcrumbs = getBreadcrumbs(pathname);

  return (
    <div className="site-shell">
      <PageSeo {...seo} pathname={pathname} />
      <WebsiteHeader />
      <main className="site-main" id="main-content">
        {breadcrumbs.length > 1 && (
          <div className="site-container site-breadcrumbs-wrap">
            <PageBreadcrumbs items={breadcrumbs} />
          </div>
        )}
        <Outlet />
      </main>
      <WebsiteFooter />
    </div>
  );
}
