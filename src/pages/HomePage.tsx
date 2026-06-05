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
import { resolveBlockingBookingPath } from '../utils/bookingBlock';

import { categoryEmoji } from '../utils/serviceCatalog';

function categoryIcon(slug?: string) {
  if (!slug) return '✨';
  return categoryEmoji(slug);
}

export function HomePage() {
  const { user } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [blockingBooking, setBlockingBooking] = useState<Booking | null>(null);
  const [notifCount, setNotifCount] = useState(0);
  const [referralReward, setReferralReward] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [detailBooking, setDetailBooking] = useState<Booking | null>(null);
  const navigate = useNavigate();

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const [cats, blocking, notifs, referrals] = await Promise.all([
        customerApi.getCategories(),
        customerApi.getBlockingBooking().catch(() => null),
        customerApi.getNotifications(),
        customerApi.getReferrals().catch(() => null),
      ]);
      setCategories(cats);
      setBlockingBooking(blocking);
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
  const canBook = !blockingBooking;
  const payDue = blockingBooking && bookingNextStep(blockingBooking) === 'pay' ? blockingBooking : null;
  const activeBooking =
    blockingBooking && !payDue ? blockingBooking : null;

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
        {canBook ? (
          <Link to="/booking/new" className="dash-quick-card dash-quick-primary">
            <span className="dash-quick-icon">➕</span>
            <div>
              <strong>Book assistant</strong>
              <p>New shopping help</p>
            </div>
          </Link>
        ) : (
          <button
            type="button"
            className="dash-quick-card dash-quick-primary"
            style={{ cursor: 'pointer', border: 'none', textAlign: 'left', width: '100%' }}
            onClick={() => blockingBooking && navigate(resolveBlockingBookingPath(blockingBooking))}
          >
            <span className="dash-quick-icon">📋</span>
            <div>
              <strong>{payDue ? 'Payment due' : 'Booking in progress'}</strong>
              <p>Finish current booking to book again</p>
            </div>
          </button>
        )}
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

      {(payDue || activeBooking) && (
        <section className="dash-alerts">
          {payDue && (
            <button type="button" className="dash-alert dash-alert-pay" onClick={() => navigate(`/payment/${payDue.id}`)}>
              <div>
                <strong>Payment due</strong>
                <p>{payDue.venueName} · ₹{payDue.totalAmount}</p>
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
        <HeroCarousel showBookCta={canBook} />
      </section>

      {canBook && (
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
      )}

      {referralReward != null && referralReward > 0 && (
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
      )}

      {detailBooking && (
        <BookingDetailModal booking={detailBooking} onClose={() => setDetailBooking(null)} />
      )}
    </div>
  );
}
