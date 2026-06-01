import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { customerApi } from '../api/client';
import type { Booking } from '../api/types';
import { useAuth } from '../auth/AuthContext';
import { showError } from '../components/NetworkError';

export function PaymentPage() {
  const { id } = useParams<{ id: string }>();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [walletBalance, setWalletBalance] = useState(0);
  const [method, setMethod] = useState('wallet');
  const [promo, setPromo] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { refreshUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    Promise.all([customerApi.getBooking(id), customerApi.getWallet()])
      .then(([b, w]) => {
        setBooking(b);
        setWalletBalance(w.balance);
      })
      .catch((err) => setError(showError(err)));
  }, [id]);

  const applyPromo = async () => {
    if (!id || !promo.trim()) return;
    try {
      await customerApi.applyPromo(id, promo.trim());
      const b = await customerApi.getBooking(id);
      setBooking(b);
      setError('');
    } catch (err) {
      setError(showError(err));
    }
  };

  const pay = async () => {
    if (!id || !booking) return;
    if (method === 'wallet' && walletBalance < booking.totalAmount) {
      setError('Insufficient wallet balance. Choose UPI or Cash.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await customerApi.payBooking(id, method);
      await refreshUser();
      if (res.nextStep === 'rate_app') navigate(`/review/app/${id}`);
      else navigate(`/review/service/${id}`);
    } catch (err) {
      setError(showError(err));
    } finally {
      setLoading(false);
    }
  };

  if (!booking) {
    return (
      <div className="page" style={{ textAlign: 'center', paddingTop: 80 }}>
        {error ? <div className="error-banner">{error}</div> : 'Loading…'}
      </div>
    );
  }

  return (
    <div className="page">
      <div className="top-bar" style={{ margin: '-20px -20px 20px' }}>
        <button type="button" onClick={() => navigate(-1)}>← Back</button>
        <h1>Payment</h1>
        <span />
      </div>

      {error && <div className="error-banner">{error}</div>}

      <div className="card">
        <strong>{booking.category?.name}</strong>
        <p style={{ color: 'var(--muted)', fontSize: 14 }}>{booking.venueName}</p>
        <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '16px 0' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 20, fontWeight: 800 }}>
          <span>Total</span>
          <span style={{ color: 'var(--primary)' }}>₹{booking.totalAmount}</span>
        </div>
        {(booking.discountAmount ?? 0) > 0 && (
          <p style={{ fontSize: 13, color: 'var(--success)' }}>Promo applied (−₹{booking.discountAmount})</p>
        )}
        <p style={{ fontSize: 13, color: 'var(--muted)' }}>Wallet: ₹{walletBalance}</p>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <input placeholder="Promo code" value={promo} onChange={(e) => setPromo(e.target.value.toUpperCase())} style={{ flex: 1, padding: 12, borderRadius: 12, border: '1px solid var(--border)' }} />
        <button type="button" className="btn btn-outline btn-sm" onClick={applyPromo}>Apply</button>
      </div>

      <p style={{ fontWeight: 700, marginBottom: 12 }}>Payment method</p>
      {['wallet', 'upi', 'cash'].map((m) => (
        <div
          key={m}
          className="card card-click"
          style={{ borderColor: method === m ? 'var(--primary)' : undefined }}
          onClick={() => setMethod(m)}
        >
          {m.toUpperCase()}
        </div>
      ))}

      <button type="button" className="btn btn-primary" style={{ marginTop: 20 }} onClick={pay} disabled={loading}>
        {loading ? 'Processing…' : `Pay ₹${booking.totalAmount}`}
      </button>
    </div>
  );
}
