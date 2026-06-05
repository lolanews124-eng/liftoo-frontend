import { PageHero } from '../../components/website/PageHero';
import { STEPS } from './websiteData';

export function HowItWorksPage() {
  return (
    <>
      <PageHero
        pill="How it works"
        title="Your assistant, start to finish"
        lead="Whether you use the website or Android app, the experience is the same — book, track, pay when done."
        cta={{ label: 'Download app', to: '/auth/login' }}
      />
      <div className="site-page">
        <div className="site-container">
          <div className="site-timeline">
            {STEPS.map((step) => (
              <article key={step.num} className="site-timeline-item">
                <div className="site-timeline-marker">{step.num}</div>
                <div className="site-timeline-body">
                  <h2>{step.title}</h2>
                  <p>{step.desc}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="site-faq-grid">
            <div className="site-faq-card">
              <h3>When do I pay?</h3>
              <p>Only after the assistant marks the job complete. No upfront booking fee.</p>
            </div>
            <div className="site-faq-card">
              <h3>Can I cancel?</h3>
              <p>Free cancellation within the window shown at booking; late cancel may have a small fee.</p>
            </div>
            <div className="site-faq-card">
              <h3>Are assistants verified?</h3>
              <p>Every assistant completes KYC and admin verification before taking jobs.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
