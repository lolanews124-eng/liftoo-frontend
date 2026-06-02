import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { customerApi } from '../api/client';
import type { Booking } from '../api/types';
import { isBookingPaid, isCashAwaitingConfirm } from '../api/types';
import { useAuth } from '../auth/AuthContext';
import { AddMoneyModal } from '../components/AddMoneyModal';
import { showError } from '../components/NetworkError';

export function PaymentPage() {
  const { id } = useParams<{ id: string }>();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [walletBalance, setWalletBalance] = useState(0);
  const [method, setMethod] = useState('wallet');
  const [promo, setPromo] = useState('');
  const [cashOtp, setCashOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showAddMoney, setShowAddMoney] = useState(false);
  const { refreshUser } = useAuth();
  const navigate = useNavigate();

  const load = useCallback(async () => {
    if (!id) return;
    try {
      const [b, w] = await Promise.all([customerApi.getBooking(id), customerApi.getWallet()]);
      setBooking(b);
      setWalletBalance(w.balance);
      if (isBookingPaid(b)) {
        navigate(`/review/service/${id}`, { replace: true });
      }
    } catch (err) {
      setError(showError(err));
    }
  }, [id, navigate]);

  useEffect(() => {
    load();
    const t = setInterval(() => {
      if (method === 'cash' && booking && !isCashAwaitingConfirm(booking)) load();
    }, 5000);
    return () => clearInterval(t);
  }, [load, method, booking?.payment?.cashCollectedAt]);

  const applyPromo = async () => {
    if (!id || !promo.trim()) return;
    try {
      await customerApi.applyPromo(id, promo.trim());
      await load();
      setError('');
    } catch (err) {
      setError(showError(err));
    }
  };

  const afterSuccess = async (nextStep?: string) => {
    await refreshUser();
    if (nextStep === 'rate_app') navigate(`/review/app/${id}`);
    else navigate(`/review/service/${id}`);
  };

  const pay = async () => {
    if (!id || !booking) return;

    if (method === 'cash') {
      if (!isCashAwaitingConfirm(booking)) {
        setError('Give cash to your assistant, then ask them to tap "Cash received" in their app before you enter OTP.');
        return;
      }
      if (cashOtp.trim().length !== 4) {
        setError('Enter the 4-digit OTP from your assistant');
        return;
      }
      setLoading(true);
      setError('');
      try {
        const res = await customerApi.confirmCashPayment(id, cashOtp.trim());
        await afterSuccess(res.nextStep);
      } catch (err) {
        setError(showError(err));
      } finally {
        setLoading(false);
      }
      return;
    }

    if (method === 'wallet' && walletBalance < booking.totalAmount) {
      setShowAddMoney(true);
      return;
    }

    setLoading(true);
    setError('');
    try {
      const res = await customerApi.payBooking(id, method);
      await afterSuccess(res.nextStep);
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

  const cashWaiting = method === 'cash' && !isCashAwaitingConfirm(booking);
  const cashReady = method === 'cash' && isCashAwaitingConfirm(booking);

  return (
    <div className="page">
      <div className="top-bar page-top-bar">
        <button type="button" onClick={() => navigate(-1)}>← Back</button>
        <h1>Payment</h1>
        <span />
      </div>

      {error && <div className="error-banner">{error}</div>}

      <div className="card">
        <strong>{booking.category?.name}</strong>
        <p style={{ color: 'var(--muted)', fontSize: 14 }}>{booking.venueName}</p>
        <div className="fee-card" style={{ marginTop: 16 }}>
          <div className="fee-line">
            <span>Service fee</span>
            <span>₹{booking.serviceFee}</span>
          </div>
          <div className="fee-line">
            <span>Platform fee</span>
            <span>₹{booking.platformFee}</span>
          </div>
          {(booking.discountAmount ?? 0) > 0 && (
            <div className="fee-line" style={{ color: 'var(--success)' }}>
              <span>Discount</span>
              <span>−₹{booking.discountAmount}</span>
            </div>
          )}
          <div className="fee-line fee-total">
            <span>Total</span>
            <span>₹{booking.totalAmount}</span>
          </div>
        </div>
        <p style={{ fontSize: 13, color: 'var(--muted)', marginTop: 12 }}>Wallet balance: ₹{walletBalance}</p>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <input
          className="input"
          placeholder="Promo code"
          value={promo}
          onChange={(e) => setPromo(e.target.value.toUpperCase())}
          style={{ flex: 1 }}
        />
        <button type="button" className="btn btn-outline btn-sm" onClick={applyPromo}>
          Apply
        </button>
      </div>

      <p className="field-label">Payment method</p>
      {[
        { id: 'wallet', label: 'Wallet', hint: `₹${walletBalance} available` },
        { id: 'upi', label: 'UPI', hint: 'Pay via UPI' },
        { id: 'cash', label: 'Cash', hint: 'Pay assistant in cash' },
      ].map((m) => (
        <div
          key={m.id}
          className={`card card-click method-card${method === m.id ? ' selected' : ''}`}
          onClick={() => setMethod(m.id)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && setMethod(m.id)}
        >
          <strong>{m.label}</strong>
          <span style={{ fontSize: 13, color: 'var(--muted)' }}>{m.hint}</span>
        </div>
      ))}

      {method === 'cash' && (
        <div className="card cash-instructions">
          {cashWaiting ? (
            <>
              <p><strong>Step 1:</strong> Hand cash (₹{booking.totalAmount}) to your assistant.</p>
              <p><strong>Step 2:</strong> Ask them to tap &quot;Cash received&quot; in the Liftoo assistant app.</p>
              <p><strong>Step 3:</strong> Enter the 4-digit OTP they show you below.</p>
              <button type="button" className="btn btn-outline btn-sm" style={{ marginTop: 8 }} onClick={load}>
                Refresh status
              </button>
            </>
          ) : (
            <>
              <p style={{ color: 'var(--success)', fontWeight: 600 }}>Assistant confirmed cash received</p>
              <p className="field-label">Enter OTP from assistant</p>
              <input
                className="input otp-input"
                maxLength={4}
                inputMode="numeric"
                placeholder="••••"
                value={cashOtp}
                onChange={(e) => setCashOtp(e.target.value.replace(/\D/g, ''))}
              />
            </>
          )}
        </div>
      )}

      <button
        type="button"
        className="btn btn-primary"
        style={{ marginTop: 20 }}
        onClick={pay}
        disabled={loading || (method === 'cash' && cashWaiting)}
      >
        {loading
          ? 'Processing…'
          : method === 'cash'
            ? cashReady
              ? 'Confirm cash payment'
              : 'Waiting for assistant…'
            : `Pay ₹${booking.totalAmount}`}
      </button>

      {method === 'wallet' && walletBalance < booking.totalAmount && (
        <button type="button" className="btn btn-outline" style={{ marginTop: 12 }} onClick={() => setShowAddMoney(true)}>
          Add money to wallet
        </button>
      )}

      {showAddMoney && (
        <AddMoneyModal
          currentBalance={walletBalance}
          onClose={() => setShowAddMoney(false)}
          onSuccess={(bal) => {
            setWalletBalance(bal);
            setShowAddMoney(false);
            refreshUser();
          }}
        />
      )}
    </div>
  );
}
