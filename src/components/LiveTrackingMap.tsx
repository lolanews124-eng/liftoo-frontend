import type { BookingTracking } from '../api/types';

function project(
  lat: number,
  lng: number,
  customer: { lat: number; lng: number },
  assistant: { lat: number; lng: number } | undefined,
  width: number,
  height: number,
) {
  const lats = [customer.lat, assistant?.lat].filter((v): v is number => v != null);
  const lngs = [customer.lng, assistant?.lng].filter((v): v is number => v != null);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);
  const latSpan = Math.max(maxLat - minLat, 0.002);
  const lngSpan = Math.max(maxLng - minLng, 0.002);
  const pad = 0.1;
  const nx = (lng - minLng) / lngSpan;
  const ny = 1 - (lat - minLat) / latSpan;
  return {
    x: width * (pad + nx * (1 - 2 * pad)),
    y: height * (pad + ny * (1 - 2 * pad)),
  };
}

export function LiveTrackingMap({ tracking }: { tracking: BookingTracking }) {
  const width = 600;
  const height = 220;
  const customer = tracking.customer;
  const assistant = tracking.assistant ?? undefined;
  const c = project(customer.lat, customer.lng, customer, assistant, width, height);
  const a = assistant
    ? project(assistant.lat, assistant.lng, customer, assistant, width, height)
    : { x: width * 0.2, y: height * 0.25 };

  const progress = Math.min(0.95, Math.max(0.1, tracking.progress ?? 0.5));
  const midX = (a.x + c.x) / 2;
  const midY = Math.min(a.y, c.y) - 30;
  const route = `M ${a.x} ${a.y} Q ${midX} ${midY} ${c.x} ${c.y}`;

  return (
    <div className="tracking-map-wrap">
      <svg viewBox={`0 0 ${width} ${height}`} className="tracking-map" role="img" aria-label="Live assistant tracking map">
        <rect width={width} height={height} fill="#e8f4ea" />
        {[1, 2, 3, 4, 5].map((i) => (
          <line key={`v${i}`} x1={(width / 6) * i} y1={0} x2={(width / 6) * i} y2={height} stroke="#fff" strokeOpacity={0.5} />
        ))}
        {[1, 2, 3].map((i) => (
          <line key={`h${i}`} x1={0} y1={(height / 4) * i} x2={width} y2={(height / 4) * i} stroke="#fff" strokeOpacity={0.5} />
        ))}
        <path d={route} fill="none" stroke="rgba(249,115,22,0.45)" strokeWidth={4} strokeLinecap="round" />
        <circle cx={a.x + (c.x - a.x) * progress} cy={a.y + (c.y - a.y) * progress} r={8} fill="#ff0064" />
        <circle cx={a.x} cy={a.y} r={18} fill="#fff" stroke="#ff0064" strokeWidth={3} />
        <text x={a.x} y={a.y + 5} textAnchor="middle" fontSize={14}>🛵</text>
        <circle cx={c.x} cy={c.y} r={18} fill="#fff" stroke="#16a34a" strokeWidth={3} />
        <text x={c.x} y={c.y + 5} textAnchor="middle" fontSize={14}>📍</text>
      </svg>
      <div className="tracking-map-footer">
        <div>
          <strong>{tracking.statusMessage}</strong>
          {customer.address && <p>{customer.address}</p>}
        </div>
        {tracking.distanceKm && (
          <div className="tracking-map-meta">
            <span>{tracking.distanceKm} km</span>
            {tracking.etaMinutes != null && <span>~{tracking.etaMinutes} min</span>}
          </div>
        )}
      </div>
    </div>
  );
}
