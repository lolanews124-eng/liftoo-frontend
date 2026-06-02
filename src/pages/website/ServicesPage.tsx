import { Link } from 'react-router-dom';
import { SERVICE_ITEMS } from './websiteData';

export function ServicesPage() {
  return (
    <div className="site-page">
      <div className="site-container">
        <div className="site-page-hero">
          <span className="site-pill">Services</span>
          <h1>Pick the help you need</h1>
          <p className="site-lead">Transparent hourly rates. Choose duration from 30 minutes to 4 hours.</p>
        </div>

        <div className="site-services-grid site-services-grid-full">
          {SERVICE_ITEMS.map((s) => (
            <article key={s.title} className="site-service-card site-service-card-lg">
              <span className="site-service-icon">{s.icon}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <div className="site-service-footer">
                <span className="site-service-rate">{s.rate}</span>
                <Link to="/auth/login" className="site-text-link">Book →</Link>
              </div>
            </article>
          ))}
        </div>

        <div className="site-info-banner">
          <h3>Where we operate</h3>
          <p>Malls, markets, exhibitions and high-street retail across supported cities. Venue search uses live maps when you book.</p>
        </div>
      </div>
    </div>
  );
}
