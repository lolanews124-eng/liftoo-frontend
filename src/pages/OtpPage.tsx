import { useEffect, useState } from 'react';

import { useNavigate, useSearchParams } from 'react-router-dom';

import { useAuth } from '../auth/AuthContext';

import { showError } from '../components/NetworkError';

import { readPendingAuth } from './LoginPage';



export function OtpPage() {

  const [params] = useSearchParams();

  const [otp, setOtp] = useState('');

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState('');

  const pending = readPendingAuth();
  const email = pending?.email ?? '';

  const [resendSec, setResendSec] = useState(30);

  const { verifyEmailOtp, resendEmailOtp } = useAuth();
  const navigate = useNavigate();



  useEffect(() => {

    if (!email) navigate('/auth/login', { replace: true });

  }, [email, navigate]);



  useEffect(() => {

    if (resendSec <= 0) return;

    const t = setTimeout(() => setResendSec((s) => s - 1), 1000);

    return () => clearTimeout(t);

  }, [resendSec]);



  const verify = async (e?: React.FormEvent) => {

    e?.preventDefault();

    if (!email || otp.length < 6) return;

    setLoading(true);

    setError('');

    try {

      const ref = params.get('ref') ?? undefined;

      const user = await verifyEmailOtp(email, otp, ref);

      if (!user.profileComplete) navigate('/auth/setup-profile');

      else navigate('/app');

    } catch (err) {

      setError(showError(err));

    } finally {

      setLoading(false);

    }

  };



  const resend = async () => {
    if (!pending || resendSec > 0) return;
    try {
      await resendEmailOtp(pending.email, pending.password);
      setResendSec(30);
      setError('');
    } catch (err) {
      setError(showError(err));
    }
  };



  if (!email) return null;



  return (
    <div className="auth-page">
      <div className="auth-panel">
        <button type="button" className="btn btn-outline btn-sm" style={{ width: 'auto', marginBottom: 24 }} onClick={() => navigate(-1)}>
          ← Back
        </button>
        <h1 className="page-title">Verify your email</h1>
        <p className="page-sub">Enter the 6-digit code sent to {email}</p>
        <p className="page-sub" style={{ fontSize: 13 }}>
          Check your inbox and spam folder. Code expires in 5 minutes.
        </p>
        {error && <div className="error-banner">{error}</div>}
        <form onSubmit={verify}>

        <label className="field">

          <span>6-digit code</span>

          <input

            inputMode="numeric"

            maxLength={6}

            placeholder="Enter code"

            value={otp}

            onChange={(e) => {

              const v = e.target.value.replace(/\D/g, '');

              setOtp(v);

              if (v.length === 6) setTimeout(() => verify(), 100);

            }}

            autoFocus

          />

        </label>

        <button type="button" className="btn btn-outline" disabled={resendSec > 0} onClick={resend} style={{ marginBottom: 12 }}>

          {resendSec > 0 ? `Resend code in ${resendSec}s` : 'Resend code'}

        </button>

        <button type="submit" className="btn btn-primary" disabled={loading || otp.length < 6}>

          {loading ? 'Verifying…' : 'Verify & Continue'}

        </button>

      </form>
      </div>
    </div>
  );
}


