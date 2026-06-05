import { useLocation } from 'react-router-dom';
import { SITE_INFO } from '../../config/siteInfo';
import { getFaqsForPath } from '../../seo/seoConfig';

export function SeoFaqSection() {
  const { pathname } = useLocation();
  const faqs = getFaqsForPath(pathname);

  if (!faqs.length) return null;

  return (
    <section className="lp-section lp-section-tight" aria-labelledby="faq-heading">
      <div className="lp-container">
        <div className="lp-section-center lp-section-center-mb">
          <span className="lp-badge lp-badge-navy">FAQ</span>
          <h2 id="faq-heading" className="lp-heading">
            Common questions about{' '}
            <span className="lp-text-gradient">Liftoo in {SITE_INFO.city}</span>
          </h2>
          <p className="lp-section-lead lp-section-lead-center">
            Quick answers for shoppers, families and assistants in Bihar.
          </p>
        </div>
        <div className="site-faq-grid site-faq-grid-wide">
          {faqs.map((item) => (
            <article key={item.question} className="site-faq-card">
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
