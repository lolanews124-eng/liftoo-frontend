import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { showError } from '../components/NetworkError';

const RESET_EMAIL_KEY = 'liftoo_reset_email';

export function storeResetEmail(email: string) {
  sessionStorage.setItem(RESET_EMAIL_KEY, email);
}

export function readResetEmail() {
  return sessionStorage.getItem(RESET_EMAIL_KEY) ?? '';
}

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { sendPasswordResetOtp } = useAuth();
  const navigate = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please enter a valid email address');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await sendPasswordResetOtp(email.trim());
      storeResetEmail(email.trim());
      navigate('/auth/reset-password');
    } catch (err) {
      setError(showError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-panel">
        <Link to="/auth/login" className="auth-back-link">← Back to sign in</Link>
        <h1 className="page-title">Forgot password?</h1>
        <p className="page-sub">Enter your email and we will send a 6-digit code to reset your password.</p>
        {error && <div className="error-banner">{error}</div>}
        <form onSubmit={submit}>
          <label className="field">
            <span>Email address</span>
            <input
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
            />
          </label>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Sending code…' : 'Send reset code'}
          </button>
        </form>
      </div>
    </div>
  );
}
