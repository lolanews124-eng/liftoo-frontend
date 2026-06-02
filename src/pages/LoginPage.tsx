import { useState } from 'react';

import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import { useAuth } from '../auth/AuthContext';
import type { User } from '../api/types';

function isProfileComplete(user: User) {
  const phone = user.phone?.trim() ?? '';
  return !!(
    user.name?.trim() &&
    user.emailVerified &&
    /^[6-9]\d{9}$/.test(phone)
  );
}

import { showError } from '../components/NetworkError';



const PENDING_AUTH_KEY = 'liftoo_pending_auth';

export interface PendingAuth {
  email: string;
  password: string;
  devOtp?: string;
}

export function storePendingAuth(email: string, password: string, devOtp?: string) {
  const payload: PendingAuth = { email, password };
  if (devOtp) payload.devOtp = devOtp;
  sessionStorage.setItem(PENDING_AUTH_KEY, JSON.stringify(payload));
}



export function readPendingAuth(): PendingAuth | null {
  const raw = sessionStorage.getItem(PENDING_AUTH_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as PendingAuth;
  } catch {
    return null;
  }
}



export function LoginPage() {

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [referral, setReferral] = useState('');

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState('');

  const { loginWithEmail } = useAuth();

  const navigate = useNavigate();

  const [params] = useSearchParams();



  const refFromUrl = params.get('ref');

  const referralValue = referral || refFromUrl || '';



  const submit = async (e: React.FormEvent) => {

    e.preventDefault();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {

      setError('Please enter a valid email address');

      return;

    }

    if (password.length < 6) {

      setError('Password must be at least 6 characters');

      return;

    }

    setLoading(true);

    setError('');

    try {
      const res = await loginWithEmail(email.trim(), password);

      if (res.requiresOtp === false) {
        sessionStorage.removeItem(PENDING_AUTH_KEY);
        if (res.user && !isProfileComplete(res.user)) navigate('/auth/setup-profile');
        else navigate('/app');
        return;
      }

      storePendingAuth(email.trim(), password, res.devOtp);

      const q = referralValue ? `?ref=${encodeURIComponent(referralValue)}` : '';
      navigate(`/auth/otp${q}`);
    } catch (err) {

      setError(showError(err));

    } finally {

      setLoading(false);

    }

  };



  return (
    <div className="auth-page">
      <div className="auth-panel">
        <Link to="/" className="auth-back-link">← Back to website</Link>
        <div className="hero auth-hero" style={{ margin: '0 -24px 32px', borderRadius: '0 0 28px 28px' }}>
          <div className="auth-logo">
            Lif<span>too</span>
          </div>
          <h1 style={{ margin: '0 0 8px', fontSize: 28 }}>
            Shopping
            <br />
            <span style={{ color: 'var(--primary)' }}>made easy</span>
          </h1>
          <p>Sign in with email. We will send a verification code to your inbox.</p>
        </div>

        <form onSubmit={submit}>

        {error && <div className="error-banner">{error}</div>}

        <label className="field">

          <span>Email address</span>

          <input

            type="email"

            autoComplete="email"

            placeholder="you@example.com"

            value={email}

            onChange={(e) => setEmail(e.target.value)}

          />

        </label>

        <label className="field">

          <span>Password</span>

          <input

            type="password"

            autoComplete="current-password"

            placeholder="At least 6 characters"

            value={password}

            onChange={(e) => setPassword(e.target.value)}

          />

        </label>

        <label className="field">

          <span>Referral code (optional)</span>

          <input

            placeholder="LIFRAHUL"

            value={referralValue}

            onChange={(e) => setReferral(e.target.value.toUpperCase())}

          />

        </label>

        <button type="submit" className="btn btn-primary" disabled={loading}>

          {loading ? 'Sending code…' : 'Continue'}

        </button>

      </form>



      <p className="auth-legal">
        By continuing, you agree to our{' '}
        <Link to="/legal/terms-of-service">Terms of Service</Link>
        {' '}and{' '}
        <Link to="/legal/privacy-policy">Privacy Policy</Link>.
      </p>
      </div>
    </div>
  );
}


