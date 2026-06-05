import { Link } from 'react-router-dom';
import { AuthLoginCta } from '../../components/website/AuthCta';
import { ServicesGrid, ServicesGridSkeleton } from '../../components/website/ServicesGrid';
import { useCategories } from '../../hooks/useCategories';
import { formatHourlyRate, minHourlyRate } from '../../utils/serviceCatalog';
import {
  ShoppingBag,
  Shield,
  Star,
  ArrowRight,
  MapPin,
  CheckCircle2,
  Quote,
  Smartphone,
  BadgeCheck,
  Zap,
  IndianRupee,
  Phone,
} from 'lucide-react';

const HERO_IMG =
  'https://images.unsplash.com/photo-1555529669-2269763671c0?w=1280&h=1600&fit=crop&q=80';
const SENIOR_IMG =
  'https://images.unsplash.com/photo-1581579438747-1dc8d17bb4ec?w=1024&h=768&fit=crop&q=80';
const HANDS_FREE_IMG =
  'https://images.unsplash.com/photo-1483985988350-763728e3685b?w=1280&h=960&fit=crop&q=80';

const malls = [
  'Phoenix Marketcity',
  'DLF Mall of India',
  'Inorbit Mall',
  'Select CITYWALK',
  'Forum Mall',
  'Oberoi Mall',
  'Pacific Mall',
  'Ambience Mall',
  'VR Mall',
  'Quest Mall',
  'Lulu Mall',
  'R City',
];

const testimonials = [
  {
    name: 'Anjali Mehta',
    where: 'Mumbai • Phoenix Marketcity',
    text: 'Diwali shopping with two toddlers used to be a nightmare. My Liftoo assistant carried everything and even held my coffee. Genuinely life-changing.',
    stars: 5,
  },
  {
    name: 'Ravi Iyer',
    where: 'Bangalore • Forum Mall',
    text: "Booked for my parents — they call it their 'mall friend' now. Polite, on-time, and so helpful with senior shopping.",
    stars: 5,
  },
  {
    name: 'Sneha Kapoor',
    where: 'Delhi • Select CITYWALK',
    text: 'Sale day at Zara without standing in the queue? Yes please. Liftoo paid for itself in saved time.',
    stars: 5,
  },
];

export function LandingPage() {
  const { categories, loading } = useCategories();
  const startingRate = minHourlyRate(categories);
  const serviceCount = categories.length || 5;

  return (
    <div className="lp">
      {/* HERO */}
      <section className="lp-hero">
        <div className="lp-grid-dots" aria-hidden />
        <div className="lp-container lp-hero-grid">
          <div className="lp-hero-copy lp-fade-in-up">
            <span className="lp-live-pill">
              <span className="lp-pulse-ring" aria-hidden>
                <span className="lp-pulse-dot" />
              </span>
              200+ assistants live near you
            </span>
            <h1 className="lp-hero-title">
              Shopping karo,
              <br />
              <span className="lp-text-gradient">bina bags</span> uthaye 🛍️
            </h1>
            <p className="lp-hero-lead">
              Liftoo gets you a trained personal assistant at the mall in minutes — to carry your bags,
              stand in queues, and help your parents and kids enjoy the day.
            </p>
            <div className="lp-hero-cta">
              <AuthLoginCta className="lp-btn-gradient">
                Book an assistant
                <ArrowRight className="lp-icon-sm lp-btn-arrow" aria-hidden />
              </AuthLoginCta>
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
                <p className="lp-trust-caption">4.9 from 12,400+ bookings</p>
              </div>
              <div className="lp-trust-divider" aria-hidden />
              <div className="lp-trust-shield">
                <Shield className="lp-icon-shield" aria-hidden />
                <span>Verified & insured</span>
              </div>
            </div>
          </div>

          <div className="lp-hero-visual">
            <div className="lp-hero-glow" aria-hidden />
            <div className="lp-hero-image-wrap lp-float">
              <img
                src={HERO_IMG}
                alt="Liftoo assistant carrying shopping bags with a happy family"
                width={1280}
                height={1600}
                className="lp-hero-image"
              />
            </div>
            <div className="lp-float-card lp-float-card-left lp-fade-in-up">
              <div className="lp-float-card-icon lp-float-card-icon-pink">
                <CheckCircle2 className="lp-icon-md" aria-hidden />
              </div>
              <div>
                <p className="lp-float-card-label">Assistant assigned</p>
                <p className="lp-float-card-value">Priya • 4 min away</p>
              </div>
            </div>
            <div className="lp-float-card lp-float-card-right">
              <div className="lp-float-card-icon lp-float-card-icon-navy">₹</div>
              <div>
                <p className="lp-float-card-label">Starting at</p>
                <p className="lp-float-card-value">
                  {loading ? '…' : `${formatHourlyRate(startingRate).replace('/hr', '')} / hour`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MALL MARQUEE */}
      <section className="lp-marquee-section">
        <p className="lp-marquee-label">Available at India&apos;s best malls</p>
        <div className="lp-marquee-wrap">
          <div className="lp-marquee-track">
            {[...malls, ...malls].map((m, i) => (
              <span key={`${m}-${i}`} className="lp-marquee-item">
                {m}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="lp-section">
        <div className="lp-container">
          <div className="lp-section-head">
            <div>
              <span className="lp-badge lp-badge-pink">Our services</span>
              <h2 className="lp-heading">
                Pick your <span className="lp-text-gradient">superpower</span>
              </h2>
              <p className="lp-section-lead">
                {serviceCount} ways Liftoo makes a mall trip feel like a spa day. Mix and match — your
                assistant adapts.
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

      {/* WHY LIFTOO */}
      <section className="lp-section lp-section-tight">
        <div className="lp-container lp-split-grid">
          <div className="lp-feature-card">
            <img
              src={HANDS_FREE_IMG}
              alt="Happy shopper walking hands-free with an assistant carrying bags"
              width={1280}
              height={960}
              loading="lazy"
              className="lp-feature-image"
            />
            <div className="lp-feature-body">
              <span className="lp-feature-tag">For shoppers</span>
              <h3>Walk in light. Walk out lighter.</h3>
              <p>
                No more juggling bags, kids and shopping lists. Your Liftoo assistant handles the heavy
                lifting — literally — so you can actually enjoy the mall.
              </p>
            </div>
          </div>
          <div className="lp-feature-card">
            <img
              src={SENIOR_IMG}
              alt="Assistant gently helping a senior citizen shopper"
              width={1024}
              height={768}
              loading="lazy"
              className="lp-feature-image"
            />
            <div className="lp-feature-body">
              <span className="lp-feature-tag">For families</span>
              <h3>A friend for your parents.</h3>
              <p>
                Patient, polite, fluent in Hindi & English. Book a Liftoo for your parents when you
                can&apos;t be there — and check in live from your phone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="lp-section lp-stats-section">
        <div className="lp-container">
          <div className="lp-stats-panel">
            <div className="lp-stats-glow" aria-hidden />
            {(
              [
                ['12K+', 'Happy shoppers'],
                ['200+', 'Trained assistants'],
                ['35', 'Malls covered'],
                ['4.9★', 'Average rating'],
              ] as const
            ).map(([n, l]) => (
              <div key={l} className="lp-stat">
                <p className="lp-stat-value">{n}</p>
                <p className="lp-stat-label">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOOK IN 30s */}
      <section className="lp-section">
        <div className="lp-container">
          <div className="lp-section-center">
            <span className="lp-badge lp-badge-navy">How it works</span>
            <h2 className="lp-heading">Book in 30 seconds</h2>
            <p className="lp-section-lead lp-section-lead-center">
              Three taps. No phone calls, no waiting around, no surprises.
            </p>
          </div>
          <div className="lp-steps-grid">
            {[
              { n: '01', icon: MapPin, t: 'Pick your mall', d: 'Choose from 35+ premium locations across India.' },
              {
                n: '02',
                icon: ShoppingBag,
                t: 'Choose service',
                d: 'Bag carry, queue, family, senior or festival — your call.',
              },
              {
                n: '03',
                icon: BadgeCheck,
                t: 'Meet your assistant',
                d: 'Verified, trained, smiling — and on the way.',
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

      {/* COMPARISON */}
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
                    'Sore arms from 6 shopping bags',
                    '20 min in the billing queue',
                    'Toddler meltdown near the food court',
                    'Forgot the car — wandering parking',
                    'Promised to never shop again',
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
                    'Hands free, posture intact',
                    'Skip the queue — we stand in it',
                    'Extra grown-up for the kids',
                    'Walked straight to the car',
                    'Already booking the next trip',
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

      {/* PRICING TEASE */}
      <section className="lp-section">
        <div className="lp-container">
          <div className="lp-pricing-grid">
            {[
              {
                icon: IndianRupee,
                t: loading ? 'Hourly rates' : `From ${formatHourlyRate(startingRate)}`,
                d: 'Pay only for what you use',
              },
              { icon: Zap, t: 'Live in 8 minutes', d: 'Average assistant arrival time' },
              { icon: Smartphone, t: 'Track on WhatsApp', d: 'No app install needed' },
              { icon: Phone, t: '24×7 helpline', d: 'Real humans, real fast' },
            ].map(({ icon: Icon, t, d }) => (
              <div key={t} className="lp-pricing-card">
                <div className="lp-pricing-icon">
                  <Icon className="lp-icon-lg" aria-hidden />
                </div>
                <p className="lp-pricing-title">{t}</p>
                <p className="lp-pricing-desc">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="lp-section">
        <div className="lp-container">
          <div className="lp-section-center lp-section-center-mb">
            <span className="lp-badge lp-badge-pink">Loved by shoppers</span>
            <h2 className="lp-heading">
              12,400+ smiles, <span className="lp-text-gradient">and counting</span>
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

      {/* FINAL CTA */}
      <section className="lp-section lp-section-final">
        <div className="lp-container">
          <div className="lp-final-cta">
            <div className="lp-grid-dots lp-grid-dots-light" aria-hidden />
            <div className="lp-final-inner">
              <span className="lp-final-badge">Limited launch offer</span>
              <h2 className="lp-final-title">
                Pehli booking par
                <br />
                30% off — bas <span className="lp-final-code">LIFT30</span> lagao.
              </h2>
              <p className="lp-final-lead">
                Walk into your next mall trip like royalty. Liftoo handles the bags, the queues, and even
                the chai stop.
              </p>
              <div className="lp-final-actions">
                <AuthLoginCta className="lp-btn-white">
                  Book your first assistant <ArrowRight className="lp-icon-sm" aria-hidden />
                </AuthLoginCta>
                <Link to="/contact" className="lp-btn-ghost">
                  Have a question?
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
