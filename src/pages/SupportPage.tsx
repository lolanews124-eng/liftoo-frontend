import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { customerApi } from '../api/client';
import type { SupportTicket } from '../api/types';
import { NetworkErrorView, showError } from '../components/NetworkError';
import { formatAppDateTime } from '../utils/formatDate';

export function SupportPage() {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      setTickets(await customerApi.getSupportTickets());
    } catch (err) {
      setError(showError(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) return;
    setSubmitting(true);
    try {
      await customerApi.createSupportTicket(subject.trim(), message.trim());
      setSubject('');
      setMessage('');
      setShowForm(false);
      load();
    } catch (err) {
      alert(showError(err));
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="page" style={{ textAlign: 'center', paddingTop: 80 }}>Loading…</div>;
  if (error) return <NetworkErrorView message={error} onRetry={load} />;

  return (
    <div className="page">
      <div className="top-bar" style={{ margin: '-20px -20px 20px' }}>
        <button type="button" onClick={() => navigate(-1)}>← Back</button>
        <h1>Help & Support</h1>
        <button type="button" onClick={() => setShowForm(true)}>+ New</button>
      </div>

      {showForm && (
        <form onSubmit={submit} className="card">
          <label className="field">
            <span>Subject</span>
            <input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Brief summary" />
          </label>
          <label className="field">
            <span>Message</span>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={4} placeholder="Describe your issue…" />
          </label>
          <button type="submit" className="btn btn-primary" disabled={submitting}>
            {submitting ? 'Sending…' : 'Submit ticket'}
          </button>
        </form>
      )}

      {tickets.length === 0 && !showForm && (
        <div className="empty-state">
          <h3>No support tickets</h3>
          <p>Need help? Create a ticket and we will get back to you</p>
        </div>
      )}

      {tickets.map((t) => (
        <div key={t.id} className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
            <strong>{t.subject}</strong>
            <span className={`badge${t.status === 'resolved' ? ' badge-success' : ''}`}>{t.status}</span>
          </div>
          <p style={{ margin: '8px 0', fontSize: 14, color: 'var(--muted)' }}>{t.message}</p>
          {t.adminReply && (
            <div style={{ background: 'var(--primary-light)', padding: 12, borderRadius: 12, marginTop: 8 }}>
              <strong style={{ fontSize: 13 }}>Support reply</strong>
              <p style={{ margin: '4px 0 0', fontSize: 14 }}>{t.adminReply}</p>
            </div>
          )}
          <p style={{ margin: '8px 0 0', fontSize: 12, color: 'var(--muted)' }}>
            {formatAppDateTime(t.createdAt)}
          </p>
        </div>
      ))}
    </div>
  );
}
