import { ApiError, NETWORK_MESSAGES } from '../api/client';

export type ErrorType = 'offline' | 'server' | 'notFound' | 'generic';

export function ErrorScreen({
  type = 'generic',
  message,
  onRetry,
  actionLabel,
  onAction,
}: {
  type?: ErrorType;
  message?: string;
  onRetry?: () => void;
  actionLabel?: string;
  onAction?: () => void;
}) {
  const offline = type === 'offline' || message === NETWORK_MESSAGES.offline;
  const icon = offline ? '📡' : type === 'notFound' ? '🔍' : type === 'server' ? '☁️' : '⚠️';
  const title = message ?? (offline ? NETWORK_MESSAGES.offline : NETWORK_MESSAGES.generic);
  const subtitle = offline
    ? 'Check your connection and try again'
    : type === 'server'
      ? 'Our servers are busy. Please try again shortly.'
      : type === 'notFound'
        ? 'The page or item you’re looking for doesn’t exist.'
        : 'Please try again in a moment';

  return (
    <div className="error-screen animate-in">
      <div className="error-screen-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{subtitle}</p>
      {onRetry && (
        <button type="button" className="btn btn-primary btn-sm" onClick={onRetry}>
          Try again
        </button>
      )}
      {actionLabel && onAction && (
        <button type="button" className="btn btn-outline btn-sm" style={{ marginTop: 8 }} onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}

export function NetworkErrorView({
  message,
  onRetry,
}: {
  message?: string;
  onRetry?: () => void;
}) {
  const offline = message === NETWORK_MESSAGES.offline;
  return (
    <ErrorScreen
      type={offline ? 'offline' : 'server'}
      message={message}
      onRetry={onRetry}
    />
  );
}

export function showError(err: unknown): string {
  if (err instanceof ApiError) return err.message;
  if (!navigator.onLine) return NETWORK_MESSAGES.offline;
  return NETWORK_MESSAGES.generic;
}
