import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { customerApi } from '../api/client';
import type { Address, GeocodePlaceResult } from '../api/types';
import { AddressSearch } from '../components/AddressSearch';
import { NetworkErrorView, showError } from '../components/NetworkError';
import { ListSkeleton } from '../components/Skeleton';
import { LocationPreview } from '../components/LocationPreview';
import { EmptyState } from '../components/EmptyState';
import { getCoords } from '../utils/geolocation';

export function AddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [label, setLabel] = useState('');
  const [formatted, setFormatted] = useState('');
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [geoLoading, setGeoLoading] = useState(false);
  const navigate = useNavigate();

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      setAddresses(await customerApi.getAddresses());
    } catch (err) {
      setError(showError(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const applyPlace = (place: GeocodePlaceResult) => {
    setCoords({ lat: place.lat, lng: place.lng });
    setFormatted(place.formattedAddress);
    if (!label.trim()) setLabel(place.label);
  };

  const openForm = async () => {
    setShowForm(true);
    setLabel('');
    setFormatted('');
    setGeoLoading(true);
    try {
      const { lat, lng } = await getCoords();
      setCoords({ lat, lng });
      const geo = await customerApi.reverseGeocode(lat, lng);
      applyPlace(geo);
    } catch {
      const { lat, lng } = await getCoords();
      setCoords({ lat, lng });
    } finally {
      setGeoLoading(false);
    }
  };

  const refreshGps = async () => {
    setGeoLoading(true);
    try {
      const { lat, lng } = await getCoords();
      setCoords({ lat, lng });
      const geo = await customerApi.reverseGeocode(lat, lng);
      applyPlace(geo);
    } catch {
      /* keep current values */
    } finally {
      setGeoLoading(false);
    }
  };

  const add = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!label.trim() || !formatted.trim()) return;
    const { lat, lng } = coords ?? (await getCoords());
    try {
      await customerApi.createAddress({
        label: label.trim(),
        formattedAddress: formatted.trim(),
        lat,
        lng,
        isDefault: addresses.length === 0,
      });
      setShowForm(false);
      setLabel('');
      setFormatted('');
      setCoords(null);
      load();
    } catch (err) {
      alert(showError(err));
    }
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this address?')) return;
    try {
      await customerApi.deleteAddress(id);
      load();
    } catch (err) {
      alert(showError(err));
    }
  };

  if (loading) return <ListSkeleton count={3} />;
  if (error) return <NetworkErrorView message={error} onRetry={load} />;

  return (
    <div className="page">
      <div className="top-bar" style={{ margin: '-20px -20px 20px' }}>
        <button type="button" onClick={() => navigate(-1)}>← Back</button>
        <h1>Addresses</h1>
        <button type="button" onClick={openForm}>+ Add</button>
      </div>

      {showForm && (
        <form onSubmit={add} className="card animate-in">
          {coords && !geoLoading && (
            <LocationPreview
              lat={coords.lat}
              lng={coords.lng}
              title={label || 'Selected location'}
              subtitle={formatted}
            />
          )}
          {geoLoading && (
            <p className="address-search-hint" style={{ marginBottom: 12 }}>Detecting your location…</p>
          )}

          <AddressSearch
            lat={coords?.lat}
            lng={coords?.lng}
            disabled={geoLoading}
            onSelect={applyPlace}
          />

          <button
            type="button"
            className="btn btn-outline btn-sm"
            style={{ marginBottom: 12 }}
            disabled={geoLoading}
            onClick={refreshGps}
          >
            ↻ Use current GPS location
          </button>

          <label className="field">
            <span>Label</span>
            <input value={label} onChange={(e) => setLabel(e.target.value)} placeholder="Home, Work…" required />
          </label>
          <label className="field">
            <span>Full address</span>
            <textarea
              value={formatted}
              onChange={(e) => setFormatted(e.target.value)}
              rows={3}
              required
              disabled={geoLoading}
            />
          </label>
          <button type="submit" className="btn btn-primary" disabled={geoLoading}>Save</button>
        </form>
      )}

      {addresses.length === 0 && !showForm && (
        <EmptyState
          icon="📍"
          title="No saved addresses"
          subtitle="Add one to book faster — or use current GPS when booking"
          actionLabel="Add address"
          onAction={openForm}
        />
      )}

      {addresses.map((a) => (
        <div key={a.id} className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <strong>{a.label} {a.isDefault && <span className="badge">Default</span>}</strong>
            <button type="button" className="btn btn-outline btn-sm" onClick={() => remove(a.id)}>Delete</button>
          </div>
          <p style={{ margin: '8px 0 0', fontSize: 14, color: 'var(--muted)' }}>{a.formattedAddress}</p>
        </div>
      ))}
    </div>
  );
}
