import { Link } from 'react-router-dom';
import { MarketingCta } from './MarketingCta';

interface PageHeroProps {
  pill: string;
  title: string;
  lead: string;
  cta?: { label: string; to: string };
}

export function PageHero({ pill, title, lead, cta }: PageHeroProps) {
  return (
    <section className="page-hero">
      <div className="page-hero-bg" />
      <div className="site-container page-hero-inner">
        <span className="site-pill site-pill-glow">{pill}</span>
        <h1>{title}</h1>
        <p className="page-hero-lead">{lead}</p>
        {cta &&
          (cta.to === '/auth/login' ? (
            <MarketingCta className="site-btn-primary" variant="hero">
              {cta.label}
              <span className="site-btn-arrow">→</span>
            </MarketingCta>
          ) : (
            <Link to={cta.to} className="site-btn-primary">
              {cta.label}
              <span className="site-btn-arrow">→</span>
            </Link>
          ))}
      </div>
    </section>
  );
}
