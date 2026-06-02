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

export function HomePage() {
  const { user } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeBooking, setActiveBooking] = useState<Booking | null>(null);
  const [pendingPay, setPendingPay] = useState<Booking | null>(null);
  const [notifCount, setNotifCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [detailBooking, setDetailBooking] = useState<Booking | null>(null);
  const navigate = useNavigate();

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const [cats, upcoming, completed, notifs] = await Promise.all([
        customerApi.getCategories(),
        customerApi.getBookings('upcoming'),
        customerApi.getBookings('completed'),
        customerApi.getNotifications(),
      ]);
      setCategories(cats);
      const active = upcoming.find((b) =>
        ['pending', 'searching', 'assigned', 'arriving', 'started'].includes(b.status),
      );
      setActiveBooking(active ?? null);
      const payDue = completed.find((b) => bookingNextStep(b) === 'pay');
      setPendingPay(payDue ?? null);
      setNotifCount(notifs.filter((n) => !n.readAt).length);
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
    <>
      <div className="home-top-bar">
        <div>
          <p className="home-greeting">Hi, {firstName} 👋</p>
        </div>
        <div className="home-top-actions">
          <Link to="/wallet" className="wallet-chip">
            ₹{user?.walletBalance ?? 0}
          </Link>
          <Link to="/notifications" className="notif-bell">
            🔔
            {notifCount > 0 && <span className="notif-badge">{notifCount > 9 ? '9+' : notifCount}</span>}
          </Link>
        </div>
      </div>

      <HeroCarousel />

      <div className="page">
        {pendingPay && (
          <div className="card card-click payment-due-card" onClick={() => navigate(`/payment/${pendingPay.id}`)}>
            <strong>Payment due</strong>
            <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--muted)' }}>
              {pendingPay.venueName} · ₹{pendingPay.totalAmount}
            </p>
            <span className="link-text">Pay now →</span>
          </div>
        )}

        {activeBooking && (
          <div className="card card-click" onClick={() => openBooking(activeBooking)}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong>Active booking</strong>
              <span className="badge">{BOOKING_STATUS_LABEL[activeBooking.status] ?? activeBooking.status}</span>
            </div>
            <p style={{ margin: '8px 0 0', color: 'var(--muted)', fontSize: 14 }}>
              {activeBooking.venueName} · {activeBooking.category?.name}
            </p>
          </div>
        )}

        <h2 style={{ fontSize: 18, fontWeight: 800, margin: '0 0 12px' }}>Services</h2>
        <div className="category-grid">
          {categories.map((c) => (
            <Link
              key={c.id}
              to={`/booking/new?category=${c.slug}`}
              className="card card-click"
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <div>
                <strong>{c.name}</strong>
                <p style={{ margin: '4px 0 0', fontSize: 13, color: 'var(--muted)' }}>
                  ₹{c.baseRate}/hr · {c.description ?? 'Personal shopping help'}
                </p>
              </div>
              <span style={{ color: 'var(--primary)', fontWeight: 700 }}>→</span>
            </Link>
          ))}
        </div>
      </div>

      {detailBooking && (
        <BookingDetailModal booking={detailBooking} onClose={() => setDetailBooking(null)} />
      )}
    </>
  );
}
