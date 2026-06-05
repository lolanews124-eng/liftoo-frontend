import { PageHero } from '../../components/website/PageHero';
import { ServicesGrid, ServicesGridSkeleton } from '../../components/website/ServicesGrid';
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
              assistance or festival shopping. Rates update live from our platform.
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
                <li>Promo codes like <strong>LIFT30</strong> apply at checkout</li>
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
    </>
  );
}
