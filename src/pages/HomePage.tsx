import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { customerApi } from '../api/client';
import type { Booking, Category } from '../api/types';
import { bookingNextStep, BOOKING_STATUS_LABEL, DURATION_OPTIONS } from '../api/types';
import { NetworkErrorView, showError } from '../components/NetworkError';
import { HomeSkeleton } from '../components/Skeleton';

export function HomePage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeBooking, setActiveBooking] = useState<Booking | null>(null);
  const [notifCount, setNotifCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const [cats, upcoming, notifs] = await Promise.all([
        customerApi.getCategories(),
        customerApi.getBookings('upcoming'),
        customerApi.getNotifications(),
      ]);
      setCategories(cats);
      const active = upcoming.find((b) =>
        ['pending', 'searching', 'assigned', 'arriving', 'started'].includes(b.status),
      );
      setActiveBooking(active ?? null);
      setNotifCount(notifs.filter((n) => !n.readAt).length);
    } catch (err) {
      setError(showError(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const openBooking = (b: Booking) => {
    const step = bookingNextStep(b);
    if (step === 'track') navigate(`/booking/${b.id}`);
    else if (step === 'pay') navigate(`/payment/${b.id}`);
    else if (step === 'rate_service') navigate(`/review/service/${b.id}`);
    else if (step === 'rate_app') navigate(`/review/app/${b.id}`);
    else navigate(`/booking/${b.id}`);
  };

  if (loading) return <HomeSkeleton />;

  if (error) {
    return <NetworkErrorView message={error} onRetry={load} />;
  }

  return (
    <>
      <div className="hero">
        <div className="hero-inner">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h1>Book your shopping assistant</h1>
              <p>Malls, markets & exhibitions — we've got you covered.</p>
            </div>
            <Link to="/notifications" className="notif-bell" style={{ position: 'relative', fontSize: 24 }}>
              🔔
              {notifCount > 0 && (
                <span className="notif-badge">
                  {notifCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      <div className="page">
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

        <div className="home-cta-row">
          <Link to="/booking/new" className="btn btn-primary" style={{ textAlign: 'center' }}>
            Book assistant now
          </Link>
        </div>

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

        <p style={{ marginTop: 24, fontSize: 12, color: 'var(--muted)', textAlign: 'center' }}>
          Duration options: {DURATION_OPTIONS.map((d) => d.label).join(' · ')}
        </p>
      </div>
    </>
  );
}
