export function Skeleton({ width, height = 16, radius = 12, className = '' }: {
  width?: string | number;
  height?: number;
  radius?: number;
  className?: string;
}) {
  return (
    <div
      className={`skeleton ${className}`}
      style={{ width: width ?? '100%', height, borderRadius: radius }}
    />
  );
}

export function HomeSkeleton() {
  return (
    <div className="page skeleton-page">
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <Skeleton width={120} height={28} />
        <div style={{ flex: 1 }} />
        <Skeleton width={40} height={40} radius={12} />
      </div>
      <Skeleton height={160} radius={20} />
      <Skeleton height={18} width="60%" className="skeleton-mt" />
      <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} width={84} height={100} radius={16} />
        ))}
      </div>
      <Skeleton height={120} radius={16} className="skeleton-mt" />
    </div>
  );
}

export function ListSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="page skeleton-page">
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} height={88} radius={16} className="skeleton-mb" />
      ))}
    </div>
  );
}

export function ProfileSkeleton() {
  return (
    <div className="page skeleton-page" style={{ textAlign: 'center' }}>
      <Skeleton width={88} height={88} radius={44} className="skeleton-center" />
      <Skeleton width={140} height={20} className="skeleton-center skeleton-mt" />
      <Skeleton width={100} height={14} className="skeleton-center skeleton-mt-sm" />
    </div>
  );
}
