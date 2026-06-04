import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { customerApi } from '../api/client';
import type { ReferralData } from '../api/types';
import { NetworkErrorView, showError } from '../components/NetworkError';

export function ReferralPage() {
  const [data, setData] = useState<ReferralData | null>(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    customerApi
      .getReferrals()
      .then(setData)
      .catch((err) => setError(showError(err)));
  }, []);

  const code = data?.referralCode ?? data?.code;
  const history = data?.history ?? data?.referrals ?? [];
  const reward = data?.rewardPerReferral;

  const copy = () => {
    if (!code) return;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareLink = () => {
    if (!code) return;
    const url = `${window.location.origin}/auth/login?ref=${code}`;
    navigator.clipboard.writeText(url);
    alert('Invite link copied!');
  };

  if (error) return <NetworkErrorView message={error} onRetry={() => window.location.reload()} />;
  if (!data) return <div className="page" style={{ textAlign: 'center', paddingTop: 80 }}>Loading…</div>;

  return (
    <div className="page">
      <div className="top-bar" style={{ margin: '-20px -20px 20px' }}>
        <button type="button" onClick={() => navigate(-1)}>← Back</button>
        <h1>Refer & Earn</h1>
        <span />
      </div>

      <div className="card" style={{ textAlign: 'center', background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)', color: '#fff' }}>
        <p style={{ margin: 0, fontSize: 14, opacity: 0.95 }}>Refer &amp; earn</p>
        <p style={{ margin: '8px 0 0', fontSize: 15 }}>
          {typeof reward === 'number' && reward > 0
            ? `Earn ₹${Math.round(reward)} per successful referral`
            : 'Invite friends — reward amount is set by Liftoo admin'}
        </p>
      </div>

      <div className="card" style={{ textAlign: 'center', background: 'var(--primary-light)' }}>
        <p style={{ margin: 0, fontSize: 14 }}>Your referral code</p>
        <p style={{ fontSize: 28, fontWeight: 900, letterSpacing: 4, margin: '12px 0' }}>{code}</p>
        <button type="button" className="btn btn-primary btn-sm" onClick={copy}>
          {copied ? 'Copied!' : 'Copy code'}
        </button>
        <button type="button" className="btn btn-outline btn-sm" style={{ marginTop: 8 }} onClick={shareLink}>
          Copy invite link
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
        <div className="card" style={{ textAlign: 'center' }}>
          <p style={{ margin: 0, fontSize: 24, fontWeight: 800 }}>{data.totalReferrals}</p>
          <p style={{ margin: 0, fontSize: 13, color: 'var(--muted)' }}>Referrals</p>
        </div>
        <div className="card" style={{ textAlign: 'center' }}>
          <p style={{ margin: 0, fontSize: 24, fontWeight: 800 }}>₹{data.totalEarned}</p>
          <p style={{ margin: 0, fontSize: 13, color: 'var(--muted)' }}>Earned</p>
        </div>
      </div>

      <h2 style={{ fontSize: 16, fontWeight: 800 }}>History</h2>
      {history.length === 0 && <p style={{ color: 'var(--muted)' }}>No referrals yet</p>}
      {history.map((h) => (
        <div key={h.id} className="card" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>{h.code}</span>
          <span className={`badge${h.status === 'completed' ? ' badge-success' : ''}`}>
            {h.status} · ₹{h.rewardAmount}
          </span>
        </div>
      ))}
    </div>
  );
}
