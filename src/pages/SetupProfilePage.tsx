import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { showError } from '../components/NetworkError';

export function SetupProfilePage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { completeProfile, user } = useAuth();
  const navigate = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedPhone = phone.replace(/\D/g, '');
    if (trimmedName.length < 2) {
      setError('Please enter your name');
      return;
    }
    if (!/^[6-9]\d{9}$/.test(trimmedPhone)) {
      setError('Enter a valid 10-digit mobile number');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await completeProfile(trimmedName, trimmedPhone);
      navigate('/');
    } catch (err) {
      setError(showError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-panel">
        <h1 className="page-title">Welcome!</h1>
        <p className="page-sub">
          Add your name and mobile number. We use it for booking calls and updates.
        </p>
        {error && <div className="error-banner">{error}</div>}
        <form onSubmit={submit}>
        <label className="field">
          <span>Full name</span>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Rahul Sharma" autoFocus />
        </label>
        <label className="field">
          <span>Mobile number</span>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
            placeholder="10-digit number"
            inputMode="numeric"
            autoComplete="tel"
          />
        </label>
        {user?.email && (
          <label className="field">
            <span>Email</span>
            <input value={user.email} disabled />
          </label>
        )}
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Saving…' : 'Continue'}
        </button>
      </form>
      </div>
    </div>
  );
}
