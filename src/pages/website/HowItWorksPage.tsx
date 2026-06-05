import { PageHero } from '../../components/website/PageHero';
import { SeoContentSection } from '../../components/website/SeoContentSection';
import { SeoFaqSection } from '../../components/website/SeoFaqSection';
import { SITE_INFO } from '../../config/siteInfo';
import { STEPS } from './websiteData';

export function HowItWorksPage() {
  return (
    <>
      <PageHero
        pill="How it works"
        title="Your assistant, start to finish"
        lead="Download the Liftoo app — book a service, track live on the map, chat with your assistant and pay when the job is done."
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
          <div className="site-seo-content-card" style={{ marginTop: 40 }}>
            <h2>How Liftoo works in {SITE_INFO.displayAddress}</h2>
            <p>
              Liftoo is an on-demand shopping assistant platform built for {SITE_INFO.city} shoppers.
              Download the Android app, select your venue — P&amp;M Mall, City Centre, Boring Road or any
              supported location — and book bag carry, queue help, family or senior assistance in minutes.
            </p>
            <p>
              Your assistant is matched in real time, you track them on a live map, chat in-app and confirm
              start with OTP. Payment happens only after the job is complete via wallet, UPI or cash. No web
              booking — everything runs inside the Liftoo app for a secure, transparent experience.
            </p>
          </div>
        </div>
      </div>
      <SeoContentSection variant="home" />
      <SeoFaqSection />
    </>
  );
}
