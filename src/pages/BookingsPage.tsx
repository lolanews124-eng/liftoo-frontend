import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { customerApi } from '../api/client';
import type { Booking } from '../api/types';
import { BOOKING_STATUS_LABEL, isPaymentPending } from '../api/types';
import { BookingDetailModal } from '../components/BookingDetailModal';
import { assistantSummary } from '../utils/assistantDisplay';
import { formatAppDateTime } from '../utils/formatDate';
import { NetworkErrorView, showError } from '../components/NetworkError';
import { ListSkeleton } from '../components/Skeleton';
import { EmptyState } from '../components/EmptyState';

const TABS = ['upcoming', 'completed', 'cancelled'] as const;

export function BookingsPage() {
  const [tab, setTab] = useState<(typeof TABS)[number]>('upcoming');
  const [data, setData] = useState<Record<string, Booking[]>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [selected, setSelected] = useState<Booking | null>(null);
  const navigate = useNavigate();

  const load = async (status: string) => {
    setLoading((l) => ({ ...l, [status]: true }));
    try {
      const list = await customerApi.getBookings(status);
      setData((d) => ({ ...d, [status]: list }));
      setErrors((e) => ({ ...e, [status]: '' }));
    } catch (err) {
      setErrors((e) => ({ ...e, [status]: showError(err) }));
      setData((d) => ({ ...d, [status]: [] }));
    } finally {
      setLoading((l) => ({ ...l, [status]: false }));
    }
  };

  useEffect(() => {
    TABS.forEach(load);
  }, []);

  const list = data[tab];
  const err = errors[tab];
  const isLoading = loading[tab];

  return (
    <div className="page">
      <h1 className="page-title">My Bookings</h1>
      <div className="tabs">
        {TABS.map((t) => (
          <button key={t} type="button" className={`tab${tab === t ? ' active' : ''}`} onClick={() => setTab(t)}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {isLoading && !list && <ListSkeleton count={4} />}
      {err && <NetworkErrorView message={err} onRetry={() => load(tab)} />}
      {!err && !isLoading && list?.length === 0 && (
        <EmptyState
          icon="📅"
          title={`No ${tab} bookings`}
          subtitle="Book an assistant from home"
          actionLabel="Book now"
          onAction={() => navigate('/booking/new')}
        />
      )}
      {!err && !isLoading && list && list.length > 0 && (
        <div className="bookings-grid">
          {list.map((b) => (
            <div key={b.id} className="card card-click" onClick={() => setSelected(b)}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong>{b.category?.name ?? 'Booking'}</strong>
                <span className="badge">{BOOKING_STATUS_LABEL[b.status] ?? b.status}</span>
              </div>
              <p style={{ margin: '8px 0', color: 'var(--muted)', fontSize: 14 }}>{b.venueName}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                <span>{formatAppDateTime(b.scheduledAt)}</span>
                <strong>₹{b.totalAmount}</strong>
              </div>
              {b.assistant?.name && (
                <p style={{ margin: '8px 0 0', fontSize: 13, fontWeight: 600 }}>{assistantSummary(b)}</p>
              )}
              {isPaymentPending(b) && (
                <p className="pay-badge">Payment pending</p>
              )}
            </div>
          ))}
        </div>
      )}

      {selected && <BookingDetailModal booking={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
