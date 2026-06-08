import { useId, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { SITE_INFO } from '../../config/siteInfo';
import { getFaqsForPath } from '../../seo/seoConfig';

export function SeoFaqSection() {
  const { pathname } = useLocation();
  const faqs = getFaqsForPath(pathname);
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!faqs.length) return null;

  const toggle = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

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

        <div className="site-faq-accordion">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;
            const triggerId = `${baseId}-faq-trigger-${index}`;
            const panelId = `${baseId}-faq-panel-${index}`;

            return (
              <article
                key={item.question}
                className={`site-faq-item${isOpen ? ' is-open' : ''}`}
              >
                <h3 className="site-faq-question">
                  <button
                    id={triggerId}
                    type="button"
                    className="site-faq-trigger"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggle(index)}
                  >
                    <span>{item.question}</span>
                    <ChevronDown className="site-faq-chevron" aria-hidden />
                  </button>
                </h3>
                <div
                  id={panelId}
                  className="site-faq-panel"
                  role="region"
                  aria-labelledby={triggerId}
                  aria-hidden={!isOpen}
                >
                  <div className="site-faq-panel-inner">
                    <p>{item.answer}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
