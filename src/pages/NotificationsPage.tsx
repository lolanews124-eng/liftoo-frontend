import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { customerApi } from '../api/client';
import type { Notification } from '../api/types';
import { NetworkErrorView, showError } from '../components/NetworkError';
import { formatAppDateTime } from '../utils/formatDate';

export function NotificationsPage() {
  const [items, setItems] = useState<Notification[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      setItems(await customerApi.getNotifications());
    } catch (err) {
      setError(showError(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const hasUnread = items.some((n) => !n.readAt);

  const markRead = async (id: string) => {
    try {
      await customerApi.markNotificationRead(id);
      setItems((prev) =>
        prev.map((n) => (n.id === id ? { ...n, readAt: new Date().toISOString() } : n)),
      );
    } catch {
      /* ignore */
    }
  };

  const markAllRead = async () => {
    if (busy || !hasUnread) return;
    setBusy(true);
    try {
      await customerApi.markAllNotificationsRead();
      setItems((prev) =>
        prev.map((n) => ({ ...n, readAt: n.readAt ?? new Date().toISOString() })),
      );
    } catch (err) {
      alert(showError(err));
    } finally {
      setBusy(false);
    }
  };

  const deleteOne = async (id: string) => {
    if (busy) return;
    setBusy(true);
    try {
      await customerApi.deleteNotification(id);
      setItems((prev) => prev.filter((n) => n.id !== id));
    } catch (err) {
      alert(showError(err));
    } finally {
      setBusy(false);
    }
  };

  const deleteAll = async () => {
    if (busy || items.length === 0) return;
    if (!window.confirm('Delete all notifications? This cannot be undone.')) return;
    setBusy(true);
    try {
      await customerApi.deleteAllNotifications();
      setItems([]);
    } catch (err) {
      alert(showError(err));
    } finally {
      setBusy(false);
    }
  };

  if (loading) return <div className="page" style={{ textAlign: 'center', paddingTop: 80 }}>Loading…</div>;
  if (error) return <NetworkErrorView message={error} onRetry={load} />;

  return (
    <div className="page">
      <div className="top-bar" style={{ margin: '-20px -20px 12px' }}>
        <button type="button" onClick={() => navigate(-1)}>← Back</button>
        <h1>Notifications</h1>
        <span />
      </div>

      {items.length > 0 && (
        <div className="notif-actions">
          {hasUnread && (
            <button type="button" className="btn btn-outline btn-sm" disabled={busy} onClick={markAllRead}>
              Mark all read
            </button>
          )}
          <button type="button" className="btn btn-outline btn-sm notif-delete-all" disabled={busy} onClick={deleteAll}>
            Delete all
          </button>
        </div>
      )}

      {items.length === 0 && (
        <div className="empty-state">
          <h3>No notifications</h3>
          <p>Updates about your bookings will appear here</p>
        </div>
      )}

      {items.map((n) => (
        <div
          key={n.id}
          className="card notif-card"
          style={{ opacity: n.readAt ? 0.75 : 1 }}
        >
          <div className="notif-card-body" onClick={() => !n.readAt && markRead(n.id)} role="presentation">
            <strong style={{ fontSize: 15 }}>{n.title}</strong>
            <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--muted)' }}>{n.body}</p>
            <p style={{ margin: '8px 0 0', fontSize: 12, color: 'var(--muted)' }}>
              {formatAppDateTime(n.createdAt)}
            </p>
          </div>
          <button
            type="button"
            className="notif-delete-one"
            aria-label="Delete notification"
            disabled={busy}
            onClick={() => deleteOne(n.id)}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
