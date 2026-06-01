import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { customerApi } from '../api/client';
import type { Address } from '../api/types';
import { NetworkErrorView, showError } from '../components/NetworkError';
import { ListSkeleton } from '../components/Skeleton';
import { MapsPlaceholder } from '../components/MapsPlaceholder';
import { EmptyState } from '../components/EmptyState';

function getCoords(): Promise<{ lat: number; lng: number }> {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve({ lat: 19.076, lng: 72.8777 });
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (p) => resolve({ lat: p.coords.latitude, lng: p.coords.longitude }),
      () => resolve({ lat: 19.076, lng: 72.8777 }),
      { enableHighAccuracy: true, timeout: 12000 },
    );
  });
}

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

  const openForm = async () => {
    setShowForm(true);
    setLabel('');
    setFormatted('');
    setGeoLoading(true);
    try {
      const { lat, lng } = await getCoords();
      setCoords({ lat, lng });
      const geo = await customerApi.reverseGeocode(lat, lng);
      setFormatted(geo.formattedAddress);
    } catch {
      const { lat, lng } = await getCoords();
      setCoords({ lat, lng });
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
          <MapsPlaceholder
            title="Your location"
            subtitle={geoLoading ? 'Detecting GPS…' : 'Address pre-filled from GPS — edit if needed'}
          />
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
