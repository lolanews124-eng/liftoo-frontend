import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { customerApi } from '../api/client';
import type { Notification } from '../api/types';
import { NetworkErrorView, showError } from '../components/NetworkError';

export function NotificationsPage() {
  const [items, setItems] = useState<Notification[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
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

  if (loading) return <div className="page" style={{ textAlign: 'center', paddingTop: 80 }}>Loading…</div>;
  if (error) return <NetworkErrorView message={error} onRetry={load} />;

  return (
    <div className="page">
      <div className="top-bar" style={{ margin: '-20px -20px 20px' }}>
        <button type="button" onClick={() => navigate(-1)}>← Back</button>
        <h1>Notifications</h1>
        <span />
      </div>

      {items.length === 0 && (
        <div className="empty-state">
          <h3>No notifications</h3>
          <p>Updates about your bookings will appear here</p>
        </div>
      )}

      {items.map((n) => (
        <div
          key={n.id}
          className="card card-click"
          style={{ opacity: n.readAt ? 0.7 : 1 }}
          onClick={() => !n.readAt && markRead(n.id)}
        >
          <strong style={{ fontSize: 15 }}>{n.title}</strong>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--muted)' }}>{n.body}</p>
          <p style={{ margin: '8px 0 0', fontSize: 12, color: 'var(--muted)' }}>
            {new Date(n.createdAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}
