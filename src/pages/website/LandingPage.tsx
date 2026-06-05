import { Link } from 'react-router-dom';
import { MarketingCta } from '../../components/website/MarketingCta';
import { SeoContentSection } from '../../components/website/SeoContentSection';
import { SeoFaqSection } from '../../components/website/SeoFaqSection';
import { ServicesGrid, ServicesGridSkeleton } from '../../components/website/ServicesGrid';
import { WEBSITE_COPY } from '../../config/websiteContent';
import { useCategories } from '../../hooks/useCategories';
import { PATNA_VENUES, SITE_INFO } from '../../config/siteInfo';
import { formatHourlyRate, minHourlyRate } from '../../utils/serviceCatalog';
import {
  ShoppingBag,
  Shield,
  Star,
  ArrowRight,
  MapPin,
  CheckCircle2,
  Quote,
  BadgeCheck,
  Zap,
  IndianRupee,
  Mail,
  MapPinned,
  MessageCircle,
} from 'lucide-react';

const HERO_PROMO_IMG = '/hero-promo.png';
const FEATURE_SHOPPER_IMG = '/feature-shopper.png';
const FEATURE_FAMILY_IMG = '/feature-family.png';

const PRICING_ICONS = {
  rates: IndianRupee,
  match: Zap,
  track: MapPinned,
  support: Mail,
} as const;

const testimonials = [
  {
    name: 'Anjali Singh',
    where: 'Patna • P&M Mall',
    text: 'Diwali shopping with two toddlers used to be a nightmare. My Liftoo assistant carried everything. Genuinely helpful.',
    stars: 5,
  },
  {
    name: 'Ravi Kumar',
    where: 'Patna • City Centre Mall',
    text: "Booked for my parents — polite, on-time, and so helpful with senior shopping.",
    stars: 5,
  },
  {
    name: 'Sneha Kapoor',
    where: 'Patna • Boring Road',
    text: 'Sale day without standing in the queue? The assistant waited while I shopped relaxed.',
    stars: 5,
  },
];

export function LandingPage() {
  const { categories, loading } = useCategories();
  const startingRate = minHourlyRate(categories);
  const serviceCount = categories.length || 5;

  return (
    <div className="lp">
      <section className="lp-hero">
        <div className="lp-grid-dots" aria-hidden />
        <div className="lp-container lp-hero-grid">
          <div className="lp-hero-copy lp-fade-in-up">
            <span className="lp-live-pill">
              <span className="lp-pulse-ring" aria-hidden>
                <span className="lp-pulse-dot" />
              </span>
              Now live in {SITE_INFO.city}
            </span>
            <h1 className="lp-hero-title">
              Shopping karo,
              <br />
              <span className="lp-text-gradient">bina bags</span> uthaye 🛍️
            </h1>
            <p className="lp-hero-lead">{WEBSITE_COPY.heroLead}</p>
            <div className="lp-hero-cta">
              <MarketingCta className="lp-btn-gradient">
                Download app
                <ArrowRight className="lp-icon-sm lp-btn-arrow" aria-hidden />
              </MarketingCta>
              <Link to="/how-it-works" className="lp-btn-outline">
                See how it works
              </Link>
            </div>
            <div className="lp-hero-trust">
              <div>
                <div className="lp-stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="lp-icon-star" aria-hidden />
                  ))}
                </div>
                <p className="lp-trust-caption">{WEBSITE_COPY.trustRating}</p>
              </div>
              <div className="lp-trust-divider" aria-hidden />
              <div className="lp-trust-shield">
                <Shield className="lp-icon-shield" aria-hidden />
                <span>{WEBSITE_COPY.trustVerified}</span>
              </div>
            </div>
          </div>

          <div className="lp-hero-visual">
            <div className="lp-hero-glow" aria-hidden />
            <div className="lp-hero-image-wrap">
              <img
                src={HERO_PROMO_IMG}
                alt="Liftoo app with a shopping assistant helping a customer at the mall"
                className="lp-hero-image lp-hero-promo-image"
                width={1024}
                height={1024}
                loading="eager"
                fetchPriority="high"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="lp-marquee-section">
        <p className="lp-marquee-label">Available at {SITE_INFO.city}&apos;s best malls &amp; markets</p>
        <div className="lp-marquee-wrap">
          <div className="lp-marquee-track">
            {[...PATNA_VENUES, ...PATNA_VENUES].map((m, i) => (
              <span key={`${m}-${i}`} className="lp-marquee-item">
                {m}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="lp-section">
        <div className="lp-container">
          <div className="lp-section-head">
            <div>
              <span className="lp-badge lp-badge-pink">Our services</span>
              <h2 className="lp-heading">
                Pick your <span className="lp-text-gradient">superpower</span>
              </h2>
              <p className="lp-section-lead">
                {serviceCount} services — same as the app. Book bag carry, queue help, family support,
                senior assistance or festival shopping.
              </p>
            </div>
            <Link to="/services" className="lp-link-arrow lp-hide-mobile">
              View all services <ArrowRight className="lp-icon-sm" aria-hidden />
            </Link>
          </div>
          {loading ? (
            <ServicesGridSkeleton variant="landing" />
          ) : (
            <ServicesGrid categories={categories} variant="landing" />
          )}
        </div>
      </section>

      <section className="lp-section lp-section-tight">
        <div className="lp-container lp-split-grid">
          <div className="lp-feature-card">
            <img
              src={FEATURE_SHOPPER_IMG}
              alt="Happy shopper using Liftoo app with assistant carrying bags at the mall"
              className="lp-feature-photo"
              width={1024}
              height={1024}
              loading="lazy"
            />
            <div className="lp-feature-body">
              <span className="lp-feature-tag">For shoppers</span>
              <h3>Walk in light. Walk out lighter.</h3>
              <p>
                No more juggling bags, kids and shopping lists. Your Liftoo assistant carries bags and
                helps you move through the mall stress-free.
              </p>
            </div>
          </div>
          <div className="lp-feature-card">
            <img
              src={FEATURE_FAMILY_IMG}
              alt="Liftoo assistant helping a senior citizen with grocery shopping"
              className="lp-feature-photo"
              width={1024}
              height={1024}
              loading="lazy"
            />
            <div className="lp-feature-body">
              <span className="lp-feature-tag">For families</span>
              <h3>A friend for your parents.</h3>
              <p>
                Patient, polite, fluent in Hindi &amp; English. Book for your parents and track the
                booking live in the app with map and chat.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="lp-section lp-stats-section">
        <div className="lp-container">
          <div className="lp-stats-panel">
            <div className="lp-stats-glow" aria-hidden />
            {WEBSITE_COPY.stats.map(({ value, label }) => (
              <div key={label} className="lp-stat">
                <p className="lp-stat-value">{value}</p>
                <p className="lp-stat-label">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="lp-section">
        <div className="lp-container">
          <div className="lp-section-center">
            <span className="lp-badge lp-badge-navy">How it works</span>
            <h2 className="lp-heading">Book in the app</h2>
            <p className="lp-section-lead lp-section-lead-center">
              Download Liftoo, pick a service and venue — track everything inside the app.
            </p>
          </div>
          <div className="lp-steps-grid">
            {[
              { n: '01', icon: MapPin, t: 'Pick location', d: `Choose a mall or market in ${SITE_INFO.displayAddress}.` },
              {
                n: '02',
                icon: ShoppingBag,
                t: 'Choose service',
                d: 'Bag carry, queue, family, senior or festival — hourly rates shown upfront.',
              },
              {
                n: '03',
                icon: BadgeCheck,
                t: 'Track in the app',
                d: 'Live map, in-app chat, OTP to start and notifications — all in Liftoo.',
              },
            ].map((s) => (
              <div key={s.n} className="lp-step-card">
                <span className="lp-step-num">{s.n}</span>
                <s.icon className="lp-icon-step" aria-hidden />
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="lp-section lp-section-tight">
        <div className="lp-container">
          <div className="lp-compare-wrap">
            <div className="lp-compare-head">
              <h2 className="lp-heading lp-heading-md">
                Mall day, <span className="lp-text-gradient">two versions</span>
              </h2>
            </div>
            <div className="lp-compare-grid">
              <div className="lp-compare-card lp-compare-bad">
                <h3>
                  <span aria-hidden>😩</span> Without Liftoo
                </h3>
                <ul>
                  {[
                    'Sore arms from heavy shopping bags',
                    'Long wait in the billing queue',
                    'Hard to manage kids and parents together',
                    'No way to check on parents remotely',
                    'Shopping feels exhausting',
                  ].map((t) => (
                    <li key={t}>
                      <span className="lp-compare-x" aria-hidden>
                        ✕
                      </span>{' '}
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="lp-compare-card lp-compare-good">
                <h3>
                  <span aria-hidden>😍</span> With Liftoo
                </h3>
                <ul>
                  {[
                    'Hands free while you browse',
                    'Assistant waits in the queue',
                    'Extra help for family outings',
                    'Live tracking & chat in the app',
                    'Pay only after service is done',
                  ].map((t) => (
                    <li key={t}>
                      <CheckCircle2 className="lp-compare-check" aria-hidden />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="lp-section">
        <div className="lp-container">
          <div className="lp-pricing-grid">
            {WEBSITE_COPY.pricingHighlights.map(({ key, title, desc }) => {
              const Icon = PRICING_ICONS[key];
              const displayTitle =
                key === 'rates' && !loading ? `From ${formatHourlyRate(startingRate)}` : title;
              return (
                <div key={key} className="lp-pricing-card">
                  <div className="lp-pricing-icon">
                    <Icon className="lp-icon-lg" aria-hidden />
                  </div>
                  <p className="lp-pricing-title">{displayTitle}</p>
                  <p className="lp-pricing-desc">{desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="lp-section">
        <div className="lp-container">
          <div className="lp-section-center lp-section-center-mb">
            <span className="lp-badge lp-badge-pink">Loved by shoppers</span>
            <h2 className="lp-heading">
              What <span className="lp-text-gradient">Patna shoppers</span> say
            </h2>
          </div>
          <div className="lp-testimonials-grid">
            {testimonials.map((t) => (
              <div key={t.name} className="lp-testimonial-card">
                <Quote className="lp-quote-icon" aria-hidden />
                <p>{t.text}</p>
                <div className="lp-testimonial-footer">
                  <div className="lp-testimonial-avatar">{t.name[0]}</div>
                  <div className="lp-testimonial-meta">
                    <p className="lp-testimonial-name">{t.name}</p>
                    <p className="lp-testimonial-where">{t.where}</p>
                  </div>
                  <div className="lp-stars lp-stars-sm">
                    {Array.from({ length: t.stars }).map((_, i) => (
                      <Star key={i} className="lp-icon-star-sm" aria-hidden />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SeoContentSection />
      <SeoFaqSection />

      <section className="lp-section lp-section-final">
        <div className="lp-container">
          <div className="lp-final-cta">
            <div className="lp-grid-dots lp-grid-dots-light" aria-hidden />
            <div className="lp-final-inner">
              <span className="lp-final-badge">{WEBSITE_COPY.finalCta.badge}</span>
              <h2 className="lp-final-title">{WEBSITE_COPY.finalCta.title}</h2>
              <p className="lp-final-lead">{WEBSITE_COPY.finalCta.lead}</p>
              <div className="lp-final-actions">
                <MarketingCta className="lp-btn-white">
                  Download on Play Store <ArrowRight className="lp-icon-sm" aria-hidden />
                </MarketingCta>
                <Link to="/contact" className="lp-btn-ghost">
                  <MessageCircle className="lp-icon-sm" aria-hidden />
                  Contact us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
