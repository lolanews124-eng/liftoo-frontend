export function LocationPreview({
  lat,
  lng,
  title,
  subtitle,
}: {
  lat: number;
  lng: number;
  title: string;
  subtitle?: string;
}) {
  const pad = 0.008;
  const bbox = `${lng - pad},${lat - pad},${lng + pad},${lat + pad}`;
  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lng}`;

  return (
    <div className="location-preview">
      <iframe
        title={`Map: ${title}`}
        className="location-preview-map"
        src={mapSrc}
        loading="lazy"
      />
      <div className="location-preview-info">
        <strong>{title}</strong>
        {subtitle && <span>{subtitle}</span>}
      </div>
    </div>
  );
}
