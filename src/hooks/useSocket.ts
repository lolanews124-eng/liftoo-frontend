import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL ?? '';

export function useSocket(token: string | null, onBookingUpdate?: (data: unknown) => void) {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!token) return;
    const base = SOCKET_URL || window.location.origin;
    const socket = io(`${base}/realtime`, {
      auth: { token },
      transports: ['websocket', 'polling'],
    });
    socketRef.current = socket;

    if (onBookingUpdate) {
      socket.on('booking:updated', onBookingUpdate);
    }

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [token, onBookingUpdate]);

  const joinBooking = (bookingId: string) => {
    const socket = socketRef.current;
    if (!socket) return;
    const emitJoin = () => socket.emit('join:booking', bookingId);
    if (socket.connected) emitJoin();
    else socket.once('connect', emitJoin);
  };

  const onChatMessage = (handler: (data: unknown) => void) => {
    socketRef.current?.on('chat:message', handler);
    return () => {
      socketRef.current?.off('chat:message', handler);
    };
  };

  return { joinBooking, onChatMessage, socket: socketRef };
};
