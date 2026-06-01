import { Link, useNavigate } from 'react-router-dom';

import { AvatarPicker } from '../components/AvatarPicker';

import { useAuth } from '../auth/AuthContext';

export function ProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth/login');
  };

  return (
    <div className="page animate-in">
      <AvatarPicker name={user?.name} phone={user?.phone} avatarUrl={user?.avatarUrl} />
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <h1 className="page-title" style={{ marginBottom: 4 }}>{user?.name ?? 'User'}</h1>
        <p className="page-sub" style={{ margin: 0 }}>{user?.email}</p>
      </div>

      <div className="profile-menu-grid">
        {[
          { to: '/addresses', label: '📍 Saved addresses' },
          { to: '/wallet', label: '💳 Wallet' },
          { to: '/referral', label: '🎁 Refer & earn' },
          { to: '/bookings', label: '📅 My bookings' },
          { to: '/notifications', label: '🔔 Notifications' },
          { to: '/support', label: '💬 Help & support' },
          { to: '/legal', label: '📄 Legal & policies' },
        ].map((item) => (
          <Link key={item.to} to={item.to} className="card card-click" style={{ display: 'block' }}>
            {item.label}
          </Link>
        ))}
      </div>

      <button type="button" className="btn btn-outline" style={{ marginTop: 16, color: 'var(--danger)', borderColor: 'var(--danger)' }} onClick={handleLogout}>
        Log out
      </button>
    </div>
  );
}
