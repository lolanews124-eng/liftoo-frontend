import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { customerApi } from '../api/client';
import { AvatarPicker } from '../components/AvatarPicker';
import { showError } from '../components/NetworkError';
import { useAuth } from '../auth/AuthContext';

export function ProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [switching, setSwitching] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/auth/login');
  };

  const switchToAssistant = async () => {
    if (!user?.roles?.includes('assistant')) {
      alert('Assistant mode is available in the Liftoo mobile app. Download the app to work as an assistant.');
      return;
    }
    setSwitching(true);
    try {
      const upcoming = await customerApi.getBookings('upcoming');
      if (upcoming.length > 0) {
        alert('You have an active booking. Complete or cancel it before switching to assistant mode.');
        return;
      }
      alert('Assistant mode works in the Liftoo mobile app. Open the app and switch role from your profile.');
    } catch (err) {
      alert(showError(err));
    } finally {
      setSwitching(false);
    }
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

      {user?.roles?.includes('assistant') && (
        <button type="button" className="btn btn-outline" style={{ marginTop: 16 }} onClick={switchToAssistant} disabled={switching}>
          Switch to assistant mode
        </button>
      )}

      <button type="button" className="btn btn-outline" style={{ marginTop: 12, color: 'var(--danger)', borderColor: 'var(--danger)' }} onClick={handleLogout}>
        Log out
      </button>
    </div>
  );
}
