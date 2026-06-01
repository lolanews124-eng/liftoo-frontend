export function EmptyState({
  icon = '📭',
  title,
  subtitle,
  actionLabel,
  onAction,
}: {
  icon?: string;
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <div className="empty-state animate-in">
      <div className="empty-state-icon">{icon}</div>
      <h3>{title}</h3>
      {subtitle && <p>{subtitle}</p>}
      {actionLabel && onAction && (
        <button type="button" className="btn btn-primary btn-sm" style={{ marginTop: 16 }} onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}
