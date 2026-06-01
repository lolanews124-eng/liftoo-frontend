import { useEffect, useRef, useState } from 'react';
import { customerApi } from '../api/client';
import type { GeocodePlaceResult } from '../api/types';

type AddressSearchProps = {
  lat?: number;
  lng?: number;
  placeholder?: string;
  onSelect: (place: GeocodePlaceResult) => void;
  disabled?: boolean;
};

export function AddressSearch({
  lat,
  lng,
  placeholder = 'Search for a mall, market, or address…',
  onSelect,
  disabled,
}: AddressSearchProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<
    { placeId: string; description: string; mainText: string; secondaryText: string }[]
  >([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchEnabled, setSearchEnabled] = useState(true);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    customerApi
      .getGeocodeConfig()
      .then((cfg) =>
        setSearchEnabled(cfg.autocompleteEnabled ?? cfg.googleMapsEnabled ?? cfg.enabled ?? true),
      )
      .catch(() => setSearchEnabled(true));
  }, []);

  useEffect(() => {
    if (!searchEnabled || query.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const results = await customerApi.geocodeAutocomplete(query.trim(), lat, lng);
        setSuggestions(results);
        setOpen(results.length > 0);
      } catch {
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query, lat, lng, searchEnabled]);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  const pick = async (placeId: string, description: string) => {
    setOpen(false);
    setQuery(description);
    setLoading(true);
    try {
      const place = await customerApi.geocodePlace(placeId);
      onSelect(place);
    } finally {
      setLoading(false);
    }
  };

  if (!searchEnabled) return null;

  return (
    <div className="address-search" ref={wrapRef}>
      <label className="field">
        <span>Search location</span>
        <input
          type="search"
          value={query}
          placeholder={placeholder}
          disabled={disabled || loading}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => suggestions.length > 0 && setOpen(true)}
          autoComplete="off"
        />
      </label>
      {loading && query.length >= 2 && <p className="address-search-hint">Searching…</p>}
      {open && suggestions.length > 0 && (
        <ul className="address-search-results" role="listbox">
          {suggestions.map((s) => (
            <li key={s.placeId}>
              <button
                type="button"
                role="option"
                onClick={() => pick(s.placeId, s.description)}
              >
                <strong>{s.mainText}</strong>
                {s.secondaryText && <span>{s.secondaryText}</span>}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
