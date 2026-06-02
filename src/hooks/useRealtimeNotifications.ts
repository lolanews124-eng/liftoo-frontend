import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { showToast } from '../components/InAppNotificationBanner';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL ?? '';

export function useRealtimeNotifications(token: string | null) {
  useEffect(() => {
    if (!token) return;
    const base = SOCKET_URL || window.location.origin;
    const socket = io(`${base}/realtime`, {
      auth: { token },
      transports: ['websocket', 'polling'],
    });

    const onNotif = (data: unknown) => {
      if (!data || typeof data !== 'object') return;
      const n = data as { title?: string; body?: string };
      if (n.title) showToast(n.title, n.body ?? '');
    };

    socket.on('notification:new', onNotif);
    socket.on('booking:updated', (data: unknown) => {
      if (!data || typeof data !== 'object') return;
      const payload = data as { booking?: { status?: string } };
      const status = payload.booking?.status;
      if (status === 'assigned') showToast('Assistant assigned', 'Your assistant is on the way.');
      else if (status === 'arriving') showToast('Assistant arriving', 'Your assistant is nearby.');
      else if (status === 'started') showToast('Service started', 'Your shopping assistant has started.');
      else if (status === 'completed') showToast('Service complete', 'Please complete payment to finish.');
    });

    return () => {
      socket.disconnect();
    };
  }, [token]);
}
