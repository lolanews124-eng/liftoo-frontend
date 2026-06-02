import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { customerApi, isLoggedIn } from '../api/client';
import type { Booking } from '../api/types';
import { bookingNextStep, BOOKING_STATUS_LABEL, isBookingPaid, isPaymentPending } from '../api/types';
import { NetworkErrorView, showError } from '../components/NetworkError';
import { AssistantAvailabilityCard } from '../components/AssistantAvailabilityCard';
import { LiveTrackingMap } from '../components/LiveTrackingMap';
import { useSocket } from '../hooks/useSocket';

const TIMELINE = ['searching', 'assigned', 'arriving', 'started', 'completed'];

export function LiveBookingPage() {
  const { id } = useParams<{ id: string }>();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [error, setError] = useState('');
  const [cancelling, setCancelling] = useState(false);
  const navigate = useNavigate();

  const onUpdate = useCallback((data: unknown) => {
    if (!data || typeof data !== 'object') return;
    const payload = data as { booking?: Booking };
    if (payload.booking) setBooking(payload.booking);
  }, []);

  const token = isLoggedIn() ? localStorage.getItem('access_token') : null;
  const { joinBooking } = useSocket(token, onUpdate);

  const load = async () => {
    if (!id) return;
    try {
      const b = await customerApi.getBooking(id);
      setBooking(b);
      setError('');
      const step = bookingNextStep(b);
      if (b.status === 'cancelled') {
        navigate('/app/bookings');
        return;
      }
      if (step === 'pay') navigate(`/payment/${id}`);
      else if (step === 'rate_service') navigate(`/review/service/${id}`);
    } catch (err) {
      setError(showError(err));
    }
  };

  useEffect(() => {
    load();
    if (id) joinBooking(id);
    const poll = setInterval(() => {
      if (booking && (isBookingPaid(booking) || booking.status === 'cancelled')) return;
      load();
    }, 8000);
    return () => clearInterval(poll);
  }, [id, booking?.status, booking?.payment?.status]);

  const cancel = async () => {
    if (!id || !confirm('Cancel this booking?')) return;
    setCancelling(true);
    try {
      await customerApi.cancelBooking(id, 'Changed plans', 'Cancelled by customer');
      navigate('/app/bookings');
    } catch (err) {
      alert(showError(err));
    } finally {
      setCancelling(false);
    }
  };

  if (error) return <NetworkErrorView message={error} onRetry={load} />;
  if (!booking) {
    return (
      <div className="page" style={{ textAlign: 'center', paddingTop: 80 }}>
        Loading booking…
      </div>
    );
  }

  const currentIdx = TIMELINE.indexOf(booking.status === 'pending' ? 'searching' : booking.status);

  return (
    <div className="page">
      <div className="top-bar page-top-bar">
        <button type="button" onClick={() => navigate(-1)}>← Back</button>
        <h1>Live booking</h1>
        {['pending', 'searching', 'assigned', 'arriving'].includes(booking.status) && (
          <button type="button" onClick={cancel} disabled={cancelling} style={{ color: 'var(--danger)' }}>
            Cancel
          </button>
        )}
      </div>

      {isPaymentPending(booking) && (
        <div className="card payment-due-card" style={{ marginBottom: 16 }}>
          <strong>Service complete — payment due</strong>
          <p style={{ margin: '8px 0', fontSize: 14, color: 'var(--muted)' }}>
            Pay ₹{booking.totalAmount} to finish this booking.
          </p>
          <button type="button" className="btn btn-primary" onClick={() => navigate(`/payment/${booking.id}`)}>
            Pay now
          </button>
        </div>
      )}

      <div className="live-booking-grid">
        {booking.tracking && ['assigned', 'arriving', 'started'].includes(booking.status) && (
          <div style={{ gridColumn: '1 / -1' }}>
            <LiveTrackingMap tracking={booking.tracking} />
          </div>
        )}
        <div>
          <div className="card">
            <div style={{ textAlign: 'center', marginBottom: 16 }}>
              <span className="badge">{BOOKING_STATUS_LABEL[booking.status] ?? booking.status}</span>
            </div>
            <ul className="timeline">
              {TIMELINE.map((s, i) => (
                <li key={s} className={i < currentIdx ? 'done' : i === currentIdx ? 'active' : ''}>
                  <div className="timeline-dot" />
                  <span>{BOOKING_STATUS_LABEL[s] ?? s}</span>
                </li>
              ))}
            </ul>
          </div>

          {booking.status === 'searching' && booking.searchAvailability && (
            <AssistantAvailabilityCard data={booking.searchAvailability} />
          )}

          <div className="card">
            <strong>{booking.category?.name}</strong>
            <p style={{ color: 'var(--muted)', fontSize: 14 }}>{booking.venueName}</p>
            <p style={{ fontSize: 14 }}>{booking.addressFormatted}</p>
            <p style={{ fontSize: 14, color: 'var(--muted)' }}>
              {new Date(booking.scheduledAt).toLocaleString()} · {booking.durationMin} min
            </p>
          </div>
        </div>

        <div>
          {booking.assistant && (
            <div className="card">
              <strong>Your assistant</strong>
              <p style={{ margin: '8px 0 0' }}>{booking.assistant.name ?? 'Assistant'}</p>
              <p style={{ fontSize: 13, color: 'var(--muted)' }}>+91 {booking.assistant.phone}</p>
              {booking.assistant.assistantProfile?.rating && (
                <p style={{ fontSize: 13 }}>★ {booking.assistant.assistantProfile.rating.toFixed(1)}</p>
              )}
            </div>
          )}

          {booking.assistant && (
            <button type="button" className="btn btn-outline" onClick={() => navigate(`/chat/${booking.id}`)}>
              💬 Chat with assistant
            </button>
          )}

          {(booking.status === 'arriving' || booking.status === 'assigned') && booking.serviceOtp && (
            <div className="card" style={{ textAlign: 'center', background: 'var(--primary-light)' }}>
              <p style={{ margin: 0, fontSize: 13, fontWeight: 600 }}>Share OTP with assistant to start</p>
              <p style={{ fontSize: 32, fontWeight: 900, letterSpacing: 8, margin: '8px 0' }}>{booking.serviceOtp}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
