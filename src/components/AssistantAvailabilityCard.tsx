import type { AssistantAvailabilitySummary, BookingSearchAvailability } from '../api/types';

type AvailabilityData = BookingSearchAvailability | AssistantAvailabilitySummary;

export function AssistantAvailabilityCard({ data }: { data: AvailabilityData }) {
  return (
    <div className="card availability-card">
      <div className="availability-card-head">
        <div className="availability-icon">👥</div>
        <div>
          <strong>{data.message}</strong>
          <p className="availability-sub">
            {data.areaLabel} · within {data.matchRadiusKm} km
          </p>
        </div>
        <div className="availability-spinner" aria-hidden />
      </div>
      {data.zones.length > 0 && (
        <div className="availability-zones">
          <p className="availability-zones-title">Available by area</p>
          {data.zones.map((z) => (
            <div key={z.label} className="availability-zone-row">
              <span>{z.label}</span>
              <span className="availability-zone-count">{z.count} online</span>
            </div>
          ))}
        </div>
      )}
      {'notifiedCount' in data && data.notifiedCount > 0 && (
        <p className="availability-notified">Notified {data.notifiedCount} nearby assistant(s)…</p>
      )}
    </div>
  );
}
