import { useRef } from 'react';
import { customerApi } from '../api/client';
import { useAuth } from '../auth/AuthContext';
import { showError } from './NetworkError';

export function AvatarPicker({
  name,
  phone,
  avatarUrl,
  onUpdated,
}: {
  name?: string | null;
  phone?: string | null;
  avatarUrl?: string | null;
  onUpdated?: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { refreshUser } = useAuth();
  const initial = (name ?? phone ?? 'U')[0].toUpperCase();

  const upload = async (file: File) => {
    try {
      const form = new FormData();
      form.append('file', file);
      const token = localStorage.getItem('access_token');
      const res = await fetch(`${import.meta.env.VITE_API_URL ?? '/api/v1'}/upload/file`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'X-Active-Role': 'customer',
        },
        body: form,
      });
      const json = await res.json();
      const data = json.data ?? json;
      const url = data.url;
      if (!url) throw new Error('Upload failed');
      await customerApi.updateProfile({ avatarUrl: url });
      await refreshUser();
      onUpdated?.();
    } catch (err) {
      alert(showError(err));
    }
  };

  return (
    <div className="avatar-picker">
      <button type="button" className="avatar-picker-btn" onClick={() => inputRef.current?.click()}>
        {avatarUrl ? (
          <img src={avatarUrl} alt="" className="avatar-picker-img" />
        ) : (
          <span className="avatar-picker-initial">{initial}</span>
        )}
        <span className="avatar-picker-badge">📷</span>
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) upload(f);
        }}
      />
      <p className="avatar-picker-hint">Tap to change photo</p>
    </div>
  );
}
