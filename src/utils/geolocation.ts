export const DEFAULT_COORDS = { lat: 19.076, lng: 72.8777 };

export function getCoords(): Promise<{ lat: number; lng: number }> {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve(DEFAULT_COORDS);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (p) => resolve({ lat: p.coords.latitude, lng: p.coords.longitude }),
      () => resolve(DEFAULT_COORDS),
      { enableHighAccuracy: true, timeout: 12000 },
    );
  });
}
