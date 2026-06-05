import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { showError } from '../components/NetworkError';
import { readResetEmail } from './ForgotPasswordPage';

export function ResetPasswordPage() {
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const email = readResetEmail();
  const { resetPassword } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!email) navigate('/auth/forgot-password', { replace: true });
  }, [email, navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || otp.length < 6) return;
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await resetPassword(email, otp, password);
      sessionStorage.removeItem('liftoo_reset_email');
      navigate('/auth/login', { replace: true, state: { message: 'Password updated. Please sign in.' } });
    } catch (err) {
      setError(showError(err));
    } finally {
      setLoading(false);
    }
  };

  if (!email) return null;

  return (
    <div className="auth-page">
      <div className="auth-panel">
        <Link to="/auth/forgot-password" className="auth-back-link">← Back</Link>
        <h1 className="page-title">Reset password</h1>
        <p className="page-sub">Enter the code sent to {email}</p>
        {error && <div className="error-banner">{error}</div>}
        <form onSubmit={submit}>
          <label className="field">
            <span>6-digit code</span>
            <input
              inputMode="numeric"
              maxLength={6}
              placeholder="Enter code"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
              autoFocus
            />
          </label>
          <label className="field">
            <span>New password</span>
            <input
              type="password"
              autoComplete="new-password"
              placeholder="At least 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <label className="field">
            <span>Confirm password</span>
            <input
              type="password"
              autoComplete="new-password"
              placeholder="Re-enter password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </label>
          <button type="submit" className="btn btn-primary" disabled={loading || otp.length < 6}>
            {loading ? 'Updating…' : 'Update password'}
          </button>
        </form>
      </div>
    </div>
  );
}
