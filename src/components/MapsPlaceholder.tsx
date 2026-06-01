export function MapsPlaceholder({
  title,
  subtitle,
  onClick,
}: {
  title: string;
  subtitle?: string;
  onClick?: () => void;
}) {
  return (
    <button type="button" className="maps-placeholder" onClick={onClick}>
      <div className="maps-placeholder-grid" aria-hidden />
      <div className="maps-placeholder-pin">📍</div>
      <div className="maps-placeholder-content">
        <strong>{title}</strong>
        {subtitle && <span>{subtitle}</span>}
        <em>Maps coming soon</em>
      </div>
    </button>
  );
}
