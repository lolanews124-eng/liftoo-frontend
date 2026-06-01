import { useEffect, useState } from 'react';
import { customerApi } from '../api/client';
import type { WalletData } from '../api/types';
import { useAuth } from '../auth/AuthContext';
import { NetworkErrorView, showError } from '../components/NetworkError';
import { ListSkeleton } from '../components/Skeleton';
import { EmptyState } from '../components/EmptyState';

export function WalletPage() {
  const [wallet, setWallet] = useState<WalletData | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const { refreshUser } = useAuth();

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const w = await customerApi.getWallet();
      setWallet(w);
    } catch (err) {
      setError(showError(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const topUp = async () => {
    try {
      await customerApi.topUpWallet(500);
      await refreshUser();
      load();
    } catch (err) {
      alert(showError(err));
    }
  };

  if (loading) return <ListSkeleton count={3} />;
  if (error) return <NetworkErrorView message={error} onRetry={load} />;

  return (
    <div className="page">
      <h1 className="page-title">Wallet</h1>
      <div className="wallet-layout">
        <div>
          <div
            className="card"
            style={{
              background: 'linear-gradient(135deg, #1a1a1a, #2a2a2a)',
              color: 'white',
              padding: 24,
            }}
          >
            <p style={{ margin: 0, opacity: 0.8, fontSize: 14 }}>Available balance</p>
            <p style={{ margin: '8px 0 0', fontSize: 36, fontWeight: 900 }}>₹{wallet?.balance ?? 0}</p>
          </div>

          <button type="button" className="btn btn-outline btn-inline-desktop" onClick={topUp} style={{ marginTop: 16 }}>
            + Add ₹500 (demo top-up)
          </button>
        </div>

        <div>
          <h2 style={{ fontSize: 16, fontWeight: 800 }}>Transactions</h2>
          {wallet?.transactions?.length === 0 && (
            <EmptyState icon="💳" title="No transactions yet" subtitle="Your wallet activity will show here" />
          )}
          {wallet?.transactions?.map((t) => (
            <div key={t.id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong style={{ fontSize: 14 }}>{t.description}</strong>
                <p style={{ margin: '4px 0 0', fontSize: 12, color: 'var(--muted)' }}>
                  {new Date(t.createdAt).toLocaleString()}
                </p>
              </div>
              <span style={{ fontWeight: 800, color: t.type === 'credit' ? 'var(--success)' : 'var(--text)' }}>
                {t.type === 'credit' ? '+' : '-'}₹{t.amount}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
