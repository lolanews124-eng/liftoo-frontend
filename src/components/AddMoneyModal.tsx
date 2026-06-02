import { useState } from 'react';
import { customerApi } from '../api/client';
import { showError } from './NetworkError';

const PRESETS = [100, 200, 500, 1000, 2000, 5000];
const MIN = 100;
const MAX = 10000;

interface Props {
  currentBalance: number;
  onClose: () => void;
  onSuccess: (newBalance: number) => void;
}

export function AddMoneyModal({ currentBalance, onClose, onSuccess }: Props) {
  const [preset, setPreset] = useState<number | null>(500);
  const [custom, setCustom] = useState('');
  const [method, setMethod] = useState<'upi' | 'card'>('upi');
  const [step, setStep] = useState<'amount' | 'pay' | 'done'>('amount');
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState('');

  const amount = preset ?? (custom.trim() ? Number(custom) : NaN);
  const valid = !Number.isNaN(amount) && amount >= MIN && amount <= MAX;

  const pay = async () => {
    if (!valid) {
      setError(amount < MIN ? `Minimum ₹${MIN}` : `Maximum ₹${MAX}`);
      return;
    }
    setPaying(true);
    setError('');
    setStep('pay');
    await new Promise((r) => setTimeout(r, 1800));
    try {
      const res = await customerApi.topUpWallet(amount, method);
      setStep('done');
      onSuccess(res.balance ?? currentBalance + amount);
    } catch (err) {
      setStep('amount');
      setError(showError(err));
    } finally {
      setPaying(false);
    }
  };

  if (step === 'pay') {
    return (
      <div className="modal-overlay" onClick={onClose} role="presentation">
        <div className="modal-sheet modal-sheet-sm" onClick={(e) => e.stopPropagation()}>
          <div className="pay-processing">
            <div className="spinner" />
            <p>Processing {method === 'upi' ? 'UPI' : 'Card'} payment…</p>
            <p className="modal-sub">₹{amount}</p>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'done') {
    return (
      <div className="modal-overlay" onClick={onClose} role="presentation">
        <div className="modal-sheet modal-sheet-sm" onClick={(e) => e.stopPropagation()}>
          <div className="pay-success">
            <span className="pay-success-icon">✓</span>
            <h2>Money added</h2>
            <p>₹{amount} added to your wallet</p>
            <button type="button" className="btn btn-primary" onClick={onClose}>
              Done
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={onClose} role="presentation">
      <div className="modal-sheet" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <div className="modal-handle" />
        <h2 className="modal-title">Add money</h2>
        <p className="modal-sub">Balance: ₹{currentBalance}</p>

        {error && <div className="error-banner">{error}</div>}

        <p className="field-label">Quick amounts</p>
        <div className="amount-grid">
          {PRESETS.map((a) => (
            <button
              key={a}
              type="button"
              className={`amount-chip${preset === a ? ' active' : ''}`}
              onClick={() => {
                setPreset(a);
                setCustom('');
              }}
            >
              ₹{a}
            </button>
          ))}
        </div>

        <p className="field-label">Or enter amount (₹{MIN}–₹{MAX})</p>
        <input
          type="number"
          className="input"
          placeholder="Custom amount"
          value={custom}
          onChange={(e) => {
            setCustom(e.target.value);
            setPreset(null);
          }}
        />

        <p className="field-label">Payment method</p>
        <div className="method-row">
          {(['upi', 'card'] as const).map((m) => (
            <button
              key={m}
              type="button"
              className={`method-chip${method === m ? ' active' : ''}`}
              onClick={() => setMethod(m)}
            >
              {m === 'upi' ? 'UPI' : 'Debit / Credit card'}
            </button>
          ))}
        </div>

        <div className="modal-actions">
          <button type="button" className="btn btn-primary" disabled={!valid || paying} onClick={pay}>
            Pay ₹{valid ? amount : '—'}
          </button>
          <button type="button" className="btn btn-outline" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
