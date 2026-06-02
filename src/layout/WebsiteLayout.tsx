import { Outlet } from 'react-router-dom';
import { WebsiteFooter } from '../components/website/WebsiteFooter';
import { WebsiteHeader } from '../components/website/WebsiteHeader';

export function WebsiteLayout() {
  return (
    <div className="site-shell">
      <WebsiteHeader />
      <main className="site-main">
        <Outlet />
      </main>
      <WebsiteFooter />
    </div>
  );
}
