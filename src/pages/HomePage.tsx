import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { customerApi } from '../api/client';
import type { Booking, Category } from '../api/types';
import { bookingNextStep, BOOKING_STATUS_LABEL } from '../api/types';
import { useAuth } from '../auth/AuthContext';
import { BookingDetailModal } from '../components/BookingDetailModal';
import { HeroCarousel } from '../components/HeroCarousel';
import { NetworkErrorView, showError } from '../components/NetworkError';
import { HomeSkeleton } from '../components/Skeleton';
import { getCoords } from '../utils/geolocation';

const CATEGORY_ICONS: Record<string, string> = {
  'bag-carry': '🛍️',
  'family-help': '👨‍👩‍👧',
  'festival': '🎉',
  'queue': '⏳',
  'senior': '♿',
};

function categoryIcon(slug?: string) {
  if (!slug) return '✨';
  return CATEGORY_ICONS[slug] ?? '✨';
}

export function HomePage() {
  const { user } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeBooking, setActiveBooking] = useState<Booking | null>(null);
  const [pendingPay, setPendingPay] = useState<Booking | null>(null);
  const [notifCount, setNotifCount] = useState(0);
  const [referralReward, setReferralReward] = useState(100);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [detailBooking, setDetailBooking] = useState<Booking | null>(null);
  const navigate = useNavigate();

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const [cats, upcoming, completed, notifs, referrals] = await Promise.all([
        customerApi.getCategories(),
        customerApi.getBookings('upcoming'),
        customerApi.getBookings('completed'),
        customerApi.getNotifications(),
        customerApi.getReferrals().catch(() => null),
      ]);
      setCategories(cats);
      const active = upcoming.find((b) =>
        ['pending', 'searching', 'assigned', 'arriving', 'started'].includes(b.status),
      );
      setActiveBooking(active ?? null);
      const payDue = completed.find((b) => bookingNextStep(b) === 'pay');
      setPendingPay(payDue ?? null);
      setNotifCount(notifs.filter((n) => !n.readAt).length);
      const reward = referrals?.rewardPerReferral;
      if (typeof reward === 'number' && reward >= 0) setReferralReward(reward);
    } catch (err) {
      setError(showError(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    getCoords().catch(() => null);
  }, []);

  const openBooking = (b: Booking) => {
    const step = bookingNextStep(b);
    if (step === 'track') navigate(`/booking/${b.id}`);
    else if (step === 'pay') navigate(`/payment/${b.id}`);
    else if (step === 'rate_service') navigate(`/review/service/${b.id}`);
    else if (step === 'rate_app') navigate(`/review/app/${b.id}`);
    else setDetailBooking(b);
  };

  if (loading) return <HomeSkeleton />;

  if (error) {
    return <NetworkErrorView message={error} onRetry={load} />;
  }

  const firstName = user?.name?.split(' ')[0] ?? 'there';

  return (
    <div className="app-dashboard">
      <header className="dash-header">
        <div className="dash-header-text">
          <p className="dash-greeting">Good to see you,</p>
          <h1 className="dash-title">{firstName} 👋</h1>
        </div>
        <div className="dash-header-actions">
          <Link to="/app/wallet" className="dash-wallet-pill">
            <span className="dash-wallet-label">Wallet</span>
            <strong>₹{user?.walletBalance ?? 0}</strong>
          </Link>
          <Link to="/notifications" className="dash-notif-btn" aria-label="Notifications">
            🔔
            {notifCount > 0 && <span className="notif-badge">{notifCount > 9 ? '9+' : notifCount}</span>}
          </Link>
        </div>
      </header>

      <div className="dash-quick-row">
        <Link to="/booking/new" className="dash-quick-card dash-quick-primary">
          <span className="dash-quick-icon">➕</span>
          <div>
            <strong>Book assistant</strong>
            <p>New shopping help</p>
          </div>
        </Link>
        <Link to="/app/bookings" className="dash-quick-card">
          <span className="dash-quick-icon">📅</span>
          <div>
            <strong>My bookings</strong>
            <p>Track & pay</p>
          </div>
        </Link>
        <Link to="/referral" className="dash-quick-card">
          <span className="dash-quick-icon">🎁</span>
          <div>
            <strong>Refer & earn</strong>
            <p>Invite friends</p>
          </div>
        </Link>
      </div>

      {(pendingPay || activeBooking) && (
        <section className="dash-alerts">
          {pendingPay && (
            <button type="button" className="dash-alert dash-alert-pay" onClick={() => navigate(`/payment/${pendingPay.id}`)}>
              <div>
                <strong>Payment due</strong>
                <p>{pendingPay.venueName} · ₹{pendingPay.totalAmount}</p>
              </div>
              <span>Pay →</span>
            </button>
          )}
          {activeBooking && (
            <button type="button" className="dash-alert dash-alert-live" onClick={() => openBooking(activeBooking)}>
              <div>
                <strong>Live booking</strong>
                <p>{activeBooking.venueName}</p>
              </div>
              <span className="badge">{BOOKING_STATUS_LABEL[activeBooking.status] ?? activeBooking.status}</span>
            </button>
          )}
        </section>
      )}

      <section className="dash-hero-wrap">
        <HeroCarousel />
      </section>

      <section className="dash-section">
        <div className="dash-section-head">
          <h2>Choose a service</h2>
          <Link to="/booking/new" className="dash-see-all">View all →</Link>
        </div>
        <div className="dash-services-grid">
          {categories.map((c) => (
            <Link key={c.id} to={`/booking/new?category=${c.slug}`} className="dash-service-card">
              <span className="dash-service-icon">{categoryIcon(c.slug)}</span>
              <div className="dash-service-body">
                <strong>{c.name}</strong>
                <p>{c.description ?? 'Personal shopping help'}</p>
                <span className="dash-service-rate">From ₹{c.baseRate}/hr</span>
              </div>
              <span className="dash-service-arrow">→</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="dash-section dash-referral-section">
        <Link to="/referral" className="dash-referral-banner">
          <span className="dash-referral-icon" aria-hidden>
            🎁
          </span>
          <div className="dash-referral-text">
            <strong>Refer &amp; earn</strong>
            <p>Earn ₹{Math.round(referralReward)} per friend on their first booking</p>
          </div>
          <span className="dash-referral-amount">₹{Math.round(referralReward)}</span>
          <span className="dash-referral-arrow" aria-hidden>
            →
          </span>
        </Link>
      </section>

      {detailBooking && (
        <BookingDetailModal booking={detailBooking} onClose={() => setDetailBooking(null)} />
      )}
    </div>
  );
}
