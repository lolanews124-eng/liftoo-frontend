import { SITE_INFO } from '../../config/siteInfo';

export function SeoContentSection() {
  return (
    <section className="lp-section site-seo-content" aria-labelledby="seo-content-heading">
      <div className="lp-container">
        <div className="site-seo-content-card">
          <h2 id="seo-content-heading">Personal shopping assistant in {SITE_INFO.displayAddress}</h2>
          <p>
            Liftoo helps you shop smarter across {SITE_INFO.city} — whether you are at P&amp;M Mall, City
            Centre Mall, Boring Road market or a local exhibition. Book a trained assistant for{' '}
            <strong>bag carry</strong>, <strong>queue assistance</strong>, <strong>family shopping</strong>,{' '}
            <strong>senior citizen help</strong> or <strong>festival shopping</strong> directly from the
            Android app.
          </p>
          <p>
            Our assistants are KYC-verified, rates are shown upfront per hour, and you pay only after the
            service is complete. Track your booking with live map, in-app chat and notifications — all
            inside Liftoo. Serving shoppers and families across {SITE_INFO.state}, {SITE_INFO.country}.
          </p>
        </div>
      </div>
    </section>
  );
}
