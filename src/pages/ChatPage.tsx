import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { customerApi, isLoggedIn } from '../api/client';
import type { ChatMessage } from '../api/types';
import { useAuth } from '../auth/AuthContext';
import { NetworkErrorView, showError } from '../components/NetworkError';
import { useSocket } from '../hooks/useSocket';

export function ChatPage() {
  const { bookingId } = useParams<{ bookingId: string }>();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  const onChatMessage = useCallback((data: unknown) => {
    if (!data || typeof data !== 'object' || !bookingId) return;
    const msg = data as ChatMessage;
    if (msg.bookingId !== bookingId) return;
    setMessages((prev) => (prev.some((m) => m.id === msg.id) ? prev : [...prev, msg]));
  }, [bookingId]);

  const token = isLoggedIn() ? localStorage.getItem('access_token') : null;
  const { joinBooking, onChatMessage: subscribeChat } = useSocket(token);

  const load = async () => {
    if (!bookingId) return;
    setLoading(true);
    setError('');
    try {
      const list = await customerApi.getChatMessages(bookingId);
      setMessages(list);
    } catch (err) {
      setError(showError(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    if (bookingId) joinBooking(bookingId);
  }, [bookingId]);

  useEffect(() => {
    const unsub = subscribeChat(onChatMessage);
    return unsub;
  }, [subscribeChat, onChatMessage]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingId || !text.trim()) return;
    setSending(true);
    try {
      const msg = await customerApi.sendChatMessage(bookingId, text.trim());
      setMessages((prev) => (prev.some((m) => m.id === msg.id) ? prev : [...prev, msg]));
      setText('');
    } catch (err) {
      alert(showError(err));
    } finally {
      setSending(false);
    }
  };

  if (loading) return <div className="page" style={{ textAlign: 'center', paddingTop: 80 }}>Loading chat…</div>;
  if (error) return <NetworkErrorView message={error} onRetry={load} />;

  return (
    <div className="page chat-page">
      <div className="top-bar" style={{ margin: '-20px -20px 12px' }}>
        <button type="button" onClick={() => navigate(-1)}>← Back</button>
        <h1>Chat</h1>
        <span />
      </div>

      <div className="chat-messages">
        {messages.length === 0 && (
          <p style={{ textAlign: 'center', color: 'var(--muted)', fontSize: 14 }}>No messages yet. Say hello!</p>
        )}
        {messages.map((m) => {
          const mine = m.senderId === user?.id;
          return (
            <div key={m.id} className={`chat-bubble${mine ? ' me' : ''}`}>
              {!mine && m.sender?.name && (
                <span className="chat-sender">{m.sender.name}</span>
              )}
              <p>{m.message}</p>
              <span className="chat-time">{new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      <form className="chat-input" onSubmit={send}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message…"
          disabled={sending}
        />
        <button
          type="submit"
          className="chat-send-btn"
          disabled={sending || !text.trim()}
          aria-label="Send message"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </button>
      </form>
    </div>
  );
}
