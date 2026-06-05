import { PageHero } from '../../components/website/PageHero';
import { AuthLoginCta } from '../../components/website/AuthCta';
import { SERVICE_ITEMS } from './websiteData';

export function ServicesPage() {
  return (
    <>
      <PageHero
        pill="Services"
        title="Pick the help you need"
        lead="Transparent hourly rates. Choose duration from 30 minutes to 4 hours at any supported venue."
      />
      <div className="site-page">
        <div className="site-container">
          <div className="site-services-page-grid">
            {SERVICE_ITEMS.map((s) => (
              <AuthLoginCta key={s.title} className="site-service-card-v2">
                <span className="icon">{s.icon}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <span className="rate">{s.rate}</span>
              </AuthLoginCta>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
