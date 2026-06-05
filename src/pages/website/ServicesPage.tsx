import { PageHero } from '../../components/website/PageHero';
import { SeoContentSection } from '../../components/website/SeoContentSection';
import { SeoFaqSection } from '../../components/website/SeoFaqSection';
import { ServicesGrid, ServicesGridSkeleton } from '../../components/website/ServicesGrid';
import { SITE_INFO } from '../../config/siteInfo';
import { useCategories } from '../../hooks/useCategories';
import { formatHourlyRate, minHourlyRate } from '../../utils/serviceCatalog';

export function ServicesPage() {
  const { categories, loading } = useCategories();
  const startingRate = minHourlyRate(categories);

  return (
    <>
      <PageHero
        pill="Services"
        title="Pick the help you need"
        lead={
          loading
            ? 'Transparent hourly rates. Choose duration from 30 minutes to 4 hours at any supported venue.'
            : `Transparent hourly rates from ${formatHourlyRate(startingRate)}. Choose duration from 30 minutes to 4 hours at malls, markets and more.`
        }
      />
      <div className="site-page">
        <div className="site-container">
          <div className="site-services-intro">
            <p>
              Same services as the Liftoo app — book bag carry, queue help, family support, senior
              assistance or festival shopping in {SITE_INFO.displayAddress}. Rates update live from our
              platform and are shown per hour before you confirm in the app.
            </p>
            <p style={{ marginTop: 14 }}>
              Whether you are shopping at P&amp;M Mall, City Centre Mall, Maurya Lok or a local market in
              Patna, Liftoo connects you with KYC-verified assistants who help carry bags, wait in queues
              and support family or senior outings — pay only when the service is done.
            </p>
          </div>

          {loading ? (
            <ServicesGridSkeleton variant="page" />
          ) : (
            <ServicesGrid categories={categories} variant="page" showCta />
          )}

          <div className="site-pricing-note">
            <div className="site-pricing-note-card">
              <h3>How pricing works</h3>
              <ul>
                <li>Pay per hour — 30 min, 1 hr, 2 hr, 3 hr or 4 hr slots</li>
                <li>No upfront booking fee; pay only after service is complete</li>
                <li>Wallet, UPI and cash accepted in the app</li>
                <li>Promo codes can be applied at checkout in the app</li>
              </ul>
            </div>
            <div className="site-pricing-note-card accent">
              <h3>Starting rates</h3>
              {loading ? (
                <p>Loading live rates…</p>
              ) : (
                <ul className="site-rate-list">
                  {categories.map((c) => (
                    <li key={c.id}>
                      <span>{c.name}</span>
                      <strong>{formatHourlyRate(c.baseRate)}</strong>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
      <SeoContentSection variant="services" />
      <SeoFaqSection />
    </>
  );
}
