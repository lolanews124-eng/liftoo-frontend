import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export interface ToastNotification {
  id: string;
  title: string;
  body: string;
}

let pushToast: ((t: Omit<ToastNotification, 'id'>) => void) | null = null;

export function showToast(title: string, body: string) {
  pushToast?.({ title, body });
}

export function InAppNotificationBanner() {
  const [toast, setToast] = useState<ToastNotification | null>(null);

  useEffect(() => {
    pushToast = ({ title, body }) => {
      const id = String(Date.now());
      setToast({ id, title, body });
      window.setTimeout(() => {
        setToast((t) => (t?.id === id ? null : t));
      }, 5000);
    };
    return () => {
      pushToast = null;
    };
  }, []);

  if (!toast) return null;

  return (
    <div className="in-app-toast">
      <Link to="/notifications" className="in-app-toast-inner">
        <span className="in-app-toast-icon">🔔</span>
        <div>
          <strong>{toast.title}</strong>
          {toast.body && <p>{toast.body}</p>}
        </div>
      </Link>
      <button type="button" className="in-app-toast-close" aria-label="Dismiss" onClick={() => setToast(null)}>
        ×
      </button>
    </div>
  );
}
