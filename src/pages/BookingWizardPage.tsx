import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { customerApi } from '../api/client';
import type { Address, Category, GeocodePlaceResult } from '../api/types';
import { DURATION_OPTIONS } from '../api/types';
import { AddressSearch } from '../components/AddressSearch';
import { showError } from '../components/NetworkError';
import { LocationPreview } from '../components/LocationPreview';
import { PageLoader } from '../components/PageLoader';
import { getCoords } from '../utils/geolocation';
import { resolveBlockingBookingPath } from '../utils/bookingBlock';

const STEPS = ['Service', 'Duration', 'Location', 'Confirm'];
const GPS_ID = 'gps-current';
const SEARCH_ID = 'search-picked';

type BookingLocation = {
  id: string;
  label: string;
  formattedAddress: string;
  lat: number;
  lng: number;
  isCurrentLocation?: boolean;
};

async function resolveGpsLocation(): Promise<BookingLocation> {
  const { lat, lng } = await getCoords();
  try {
    const geo = await customerApi.reverseGeocode(lat, lng);
    return {
      id: GPS_ID,
      label: geo.label,
      formattedAddress: geo.formattedAddress,
      lat: geo.lat,
      lng: geo.lng,
      isCurrentLocation: true,
    };
  } catch {
    return {
      id: GPS_ID,
      label: 'Current location',
      formattedAddress: `${lat.toFixed(5)}, ${lng.toFixed(5)}`,
      lat,
      lng,
      isCurrentLocation: true,
    };
  }
}

function addressToLocation(a: Address): BookingLocation {
  return {
    id: a.id,
    label: a.label,
    formattedAddress: a.formattedAddress,
    lat: a.lat,
    lng: a.lng,
  };
}

function placeToLocation(place: GeocodePlaceResult): BookingLocation {
  return {
    id: SEARCH_ID,
    label: place.label,
    formattedAddress: place.formattedAddress,
    lat: place.lat,
    lng: place.lng,
  };
}

export function BookingWizardPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [categories, setCategories] = useState<Category[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [categoryId, setCategoryId] = useState('');
  const [durationMin, setDurationMin] = useState(60);
  const [location, setLocation] = useState<BookingLocation | null>(null);
  const [locationLoading, setLocationLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    customerApi
      .getBlockingBooking()
      .then((blocking) => {
        if (blocking) navigate(resolveBlockingBookingPath(blocking), { replace: true });
      })
      .catch(() => null);
  }, [navigate]);

  useEffect(() => {
    Promise.all([customerApi.getCategories(), customerApi.getAddresses(), resolveGpsLocation()])
      .then(([cats, addrs, gps]) => {
        setCategories(cats);
        setAddresses(addrs);
        const slug = params.get('category');
        const picked = slug ? cats.find((c) => c.slug === slug) : cats[0];
        if (picked) setCategoryId(picked.id);
        setLocation(gps);
        setLocationLoading(false);
      })
      .catch((err) => {
        setError(showError(err));
        setLocationLoading(false);
      });
  }, [params]);

  const category = categories.find((c) => c.id === categoryId);
  const serviceFee = category ? Math.round(category.baseRate * (durationMin / 60)) : 0;
  const platformFee = Math.round(serviceFee * 0.1);
  const total = serviceFee + platformFee;

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const back = () => (step === 0 ? navigate(-1) : setStep((s) => s - 1));

  const refreshGps = async () => {
    setLocationLoading(true);
    try {
      setLocation(await resolveGpsLocation());
    } finally {
      setLocationLoading(false);
    }
  };

  const pickSearchResult = (place: GeocodePlaceResult) => {
    setLocation(placeToLocation(place));
  };

  const submit = async () => {
    if (!category || !location) return;
    setLoading(true);
    setError('');
    try {
      const booking = await customerApi.createBooking({
        categoryId: category.id,
        durationMin,
        venueName: location.label,
        scheduledAt: new Date().toISOString(),
        addressLabel: location.label,
        addressFormatted: location.formattedAddress,
        lat: location.lat,
        lng: location.lng,
      });
      await customerApi.confirmBooking(booking.id);
      navigate(`/booking/${booking.id}`);
    } catch (err) {
      setError(showError(err));
    } finally {
      setLoading(false);
    }
  };

  if ((categories.length === 0 || locationLoading) && !error) {
    return <PageLoader message="Preparing booking…" />;
  }

  return (
    <div className="page animate-in">
      <button type="button" className="btn btn-outline btn-sm" style={{ width: 'auto', marginBottom: 16 }} onClick={back}>
        ← Back
      </button>
      <h1 className="page-title">Book assistant</h1>
      <div className="wizard-steps">
        {STEPS.map((_, i) => (
          <div key={i} className={`wizard-step${i <= step ? ' done' : ''}`} />
        ))}
      </div>
      {error && <div className="error-banner">{error}</div>}

      {step === 0 && (
        <>
          <p className="page-sub">Choose a service</p>
          <div className="chip-row">
            {categories.map((c) => (
              <button
                key={c.id}
                type="button"
                className={`chip${categoryId === c.id ? ' active' : ''}`}
                onClick={() => setCategoryId(c.id)}
              >
                {c.name} · ₹{c.baseRate}/hr
              </button>
            ))}
          </div>
          <button type="button" className="btn btn-primary" style={{ marginTop: 24 }} onClick={next} disabled={!categoryId}>
            Next
          </button>
        </>
      )}

      {step === 1 && (
        <>
          <p className="page-sub">How long do you need help?</p>
          <div className="chip-row">
            {DURATION_OPTIONS.map((d) => (
              <button
                key={d.minutes}
                type="button"
                className={`chip${durationMin === d.minutes ? ' active' : ''}`}
                onClick={() => setDurationMin(d.minutes)}
              >
                {d.label}
              </button>
            ))}
          </div>
          <button type="button" className="btn btn-primary" style={{ marginTop: 24 }} onClick={next}>
            Next
          </button>
        </>
      )}

      {step === 2 && location && (
        <>
          <p className="page-sub">Where should the assistant meet you?</p>

          <LocationPreview
            lat={location.lat}
            lng={location.lng}
            title={location.label}
            subtitle={location.formattedAddress}
          />

          <AddressSearch
            lat={location.lat}
            lng={location.lng}
            onSelect={pickSearchResult}
          />

          <button type="button" className="btn btn-outline btn-sm" style={{ marginBottom: 12 }} onClick={refreshGps}>
            ↻ Refresh current location
          </button>

          <div
            className="card card-click"
            style={{ borderColor: location.isCurrentLocation ? 'var(--primary)' : undefined }}
            onClick={() => refreshGps()}
          >
            <strong>📍 Current location (GPS)</strong>
            <p style={{ margin: '4px 0 0', fontSize: 13, color: 'var(--muted)' }}>{location.formattedAddress}</p>
          </div>

          {addresses.length > 0 && (
            <p style={{ margin: '16px 0 8px', fontWeight: 700, fontSize: 14 }}>Saved addresses</p>
          )}
          {addresses.map((a) => {
            const loc = addressToLocation(a);
            const selected = location.id === a.id;
            return (
              <div
                key={a.id}
                className="card card-click"
                style={{ borderColor: selected ? 'var(--primary)' : undefined }}
                onClick={() => setLocation(loc)}
              >
                <strong>{a.label}</strong>
                <p style={{ margin: '4px 0 0', fontSize: 13, color: 'var(--muted)' }}>{a.formattedAddress}</p>
              </div>
            );
          })}

          <button type="button" className="btn btn-outline btn-sm" style={{ marginTop: 8 }} onClick={() => navigate('/addresses')}>
            Manage saved addresses
          </button>

          <button type="button" className="btn btn-primary" style={{ marginTop: 16 }} onClick={next} disabled={!location}>
            Next
          </button>
        </>
      )}

      {step === 3 && category && location && (
        <>
          <p className="page-sub">Review & confirm — assistant will be matched now</p>
          <div className="card">
            <p><strong>{category.name}</strong></p>
            <p style={{ color: 'var(--muted)', fontSize: 14 }}>{DURATION_OPTIONS.find((d) => d.minutes === durationMin)?.label}</p>
            <p style={{ marginTop: 8 }}>{location.label} — {location.formattedAddress}</p>
            <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '16px 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Service fee</span><span>₹{serviceFee}</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}><span>Platform fee</span><span>₹{platformFee}</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, fontWeight: 800, fontSize: 18 }}>
              <span>Total</span><span style={{ color: 'var(--primary)' }}>₹{total}</span>
            </div>
          </div>
          <button type="button" className="btn btn-primary" onClick={submit} disabled={loading}>
            {loading ? 'Booking…' : 'Confirm & find assistant'}
          </button>
        </>
      )}
    </div>
  );
}
