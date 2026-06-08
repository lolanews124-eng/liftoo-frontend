const API_BASE = import.meta.env.VITE_API_URL ?? '/api/v1';

export const NETWORK_MESSAGES = {
  offline: 'No internet connection. Please check your network and try again.',
  timeout: 'Connection timed out. Please try again.',
  server: 'Server is temporarily unavailable. Please try again later.',
  generic: 'Something went wrong. Please try again.',
};

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly offline = false,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

function getAccessToken() {
  return localStorage.getItem('access_token');
}

function getRefreshToken() {
  return localStorage.getItem('refresh_token');
}

export function setTokens(access: string, refresh: string) {
  localStorage.setItem('access_token', access);
  localStorage.setItem('refresh_token', refresh);
  localStorage.setItem('active_role', 'customer');
}

export function clearTokens() {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('active_role');
}

export function isLoggedIn() {
  return !!getAccessToken();
}

async function refreshAccessToken(): Promise<boolean> {
  const refresh = getRefreshToken();
  if (!refresh) return false;
  try {
    const res = await fetch(`${API_BASE}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken: refresh }),
    });
    const json = await res.json();
    const data = json.data ?? json;
    if (!res.ok) return false;
    setTokens(data.accessToken, data.refreshToken);
    return true;
  } catch {
    return false;
  }
}

function friendlyError(status: number, json: unknown): ApiError {
  if (!navigator.onLine) return new ApiError(NETWORK_MESSAGES.offline, true);
  if (status >= 500) return new ApiError(NETWORK_MESSAGES.server);
  if (json && typeof json === 'object') {
    const o = json as Record<string, unknown>;
    const err = o.error as Record<string, unknown> | undefined;
    const msg = (err?.message ?? o.message) as string | undefined;
    if (msg && typeof msg === 'string') return new ApiError(msg);
  }
  return new ApiError(NETWORK_MESSAGES.generic);
}

export async function api<T>(path: string, options: RequestInit = {}, retry = true): Promise<T> {
  if (!navigator.onLine) {
    throw new ApiError(NETWORK_MESSAGES.offline, true);
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'X-Active-Role': 'customer',
    ...(options.headers as Record<string, string> | undefined),
  };

  const token = getAccessToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  let res: Response;
  try {
    res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  } catch {
    throw new ApiError(NETWORK_MESSAGES.offline, true);
  }

  const json = await res.json().catch(() => ({}));

  if (res.status === 401 && retry) {
    const ok = await refreshAccessToken();
    if (ok) return api(path, options, false);
    clearTokens();
    throw new ApiError('Session expired. Please login again.');
  }

  if (!res.ok) {
    throw friendlyError(res.status, json);
  }

  if (json && typeof json === 'object' && 'success' in json && json.success === false) {
    throw friendlyError(res.status, json);
  }

  return (json.data ?? json) as T;
}

export const customerApi = {
  loginWithEmail: (email: string, password: string) =>
    api<import('../auth/loginTypes').LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  resendEmailOtp: (email: string, password: string) =>
    api<import('../auth/loginTypes').LoginResponse>('/auth/otp/resend', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  sendPasswordResetOtp: (email: string) =>
    api<{ message: string }>('/auth/password/forgot', {
      method: 'POST',
      body: JSON.stringify({ email }),
    }),

  resetPassword: (email: string, otp: string, newPassword: string) =>
    api<{ message: string }>('/auth/password/reset', {
      method: 'POST',
      body: JSON.stringify({ email, otp, newPassword }),
    }),

  verifyEmailOtp: (email: string, otp: string, referralCode?: string) =>
    api<{ accessToken: string; refreshToken: string; user: import('./types').User; isNewUser?: boolean }>(
      '/auth/otp/verify',
      { method: 'POST', body: JSON.stringify({ email, otp, referralCode }) },
    ),

  setRole: (role: string) =>
    api<{ accessToken: string; refreshToken: string; user: import('./types').User }>('/auth/role', {
      method: 'POST',
      body: JSON.stringify({ role }),
    }),

  getMe: () => api<import('./types').User>('/users/me'),

  updateProfile: (data: { name?: string; avatarUrl?: string; phone?: string }) =>
    api<import('./types').User>('/users/me', { method: 'PUT', body: JSON.stringify(data) }),

  getCategories: () => api<import('./types').Category[]>('/categories'),

  getBookings: (status?: string) =>
    api<import('./types').Booking[]>(`/bookings${status ? `?status=${status}` : ''}`),

  getBlockingBooking: () => api<import('./types').Booking | null>('/bookings/blocking'),

  getBooking: (id: string) => api<import('./types').Booking>(`/bookings/${id}`),

  createBooking: (data: Record<string, unknown>) =>
    api<import('./types').Booking>('/bookings', { method: 'POST', body: JSON.stringify(data) }),

  confirmBooking: (id: string) =>
    api<import('./types').Booking>(`/bookings/${id}/confirm`, { method: 'POST' }),

  cancelBooking: (id: string, reason?: string, note?: string) =>
    api(`/bookings/${id}/cancel`, {
      method: 'POST',
      body: JSON.stringify({ reason, note }),
    }),

  payBooking: (id: string, method: string) =>
    api<{ nextStep?: string; booking?: import('./types').Booking }>(`/bookings/${id}/pay`, {
      method: 'POST',
      body: JSON.stringify({ method }),
    }),

  confirmCashPayment: (id: string, otp: string) =>
    api<{ nextStep?: string; booking?: import('./types').Booking }>(`/bookings/${id}/cash/confirm`, {
      method: 'POST',
      body: JSON.stringify({ otp }),
    }),

  getAddresses: () => api<import('./types').Address[]>('/users/addresses'),

  getGeocodeConfig: () => api<import('./types').GeocodeConfig>('/geocode/config'),

  reverseGeocode: (lat: number, lng: number) =>
    api<import('./types').GeocodePlaceResult>(`/geocode/reverse?lat=${lat}&lng=${lng}`),

  geocodeAutocomplete: (q: string, lat?: number, lng?: number) => {
    const params = new URLSearchParams({ q });
    if (lat != null) params.set('lat', String(lat));
    if (lng != null) params.set('lng', String(lng));
    return api<import('./types').GeocodeSuggestion[]>(`/geocode/autocomplete?${params}`);
  },

  geocodePlace: (placeId: string) =>
    api<import('./types').GeocodePlaceResult>(`/geocode/place?placeId=${encodeURIComponent(placeId)}`),

  geocodeForward: (address: string) =>
    api<import('./types').GeocodePlaceResult>(`/geocode/forward?address=${encodeURIComponent(address)}`),

  getAssistantAvailabilitySummary: (lat: number, lng: number) =>
    api<import('./types').AssistantAvailabilitySummary>(
      `/assistants/availability-summary?lat=${lat}&lng=${lng}`,
    ),

  createAddress: (data: Omit<import('./types').Address, 'id'>) =>
    api<import('./types').Address>('/users/addresses', { method: 'POST', body: JSON.stringify(data) }),

  deleteAddress: (id: string) => api(`/users/addresses/${id}`, { method: 'DELETE' }),

  setDefaultAddress: (id: string) =>
    api(`/users/addresses/${id}/default`, { method: 'POST' }),

  getWallet: () => api<import('./types').WalletData>('/wallet'),

  topUpWallet: (amount: number, method: 'upi' | 'card' = 'upi') =>
    api<{ balance: number }>('/wallet/top-up', {
      method: 'POST',
      body: JSON.stringify({ amount, method }),
    }),

  getReferrals: () => api<import('./types').ReferralData>('/referrals'),

  getNotifications: () => api<import('./types').Notification[]>('/notifications'),

  markNotificationRead: (id: string) =>
    api(`/notifications/${id}/read`, { method: 'PATCH' }),

  markAllNotificationsRead: () =>
    api<{ updated: number }>('/notifications/read-all', { method: 'PATCH' }),

  deleteNotification: (id: string) =>
    api<{ deleted: number }>(`/notifications/${id}`, { method: 'DELETE' }),

  deleteAllNotifications: () =>
    api<{ deleted: number }>('/notifications', { method: 'DELETE' }),

  validatePromo: (code: string, orderAmount: number) =>
    api<{ discountAmount: number; finalAmount: number }>('/promos/validate', {
      method: 'POST',
      body: JSON.stringify({ code, orderAmount }),
    }),

  applyPromo: (bookingId: string, code: string) =>
    api(`/promos/bookings/${bookingId}/apply`, {
      method: 'POST',
      body: JSON.stringify({ code }),
    }),

  submitRating: (bookingId: string, stars: number, comment?: string) =>
    api('/ratings', {
      method: 'POST',
      body: JSON.stringify({ bookingId, stars, comment }),
    }),

  submitAppReview: (bookingId: string, stars: number, comment?: string, platform?: string) =>
    api('/app-reviews', {
      method: 'POST',
      body: JSON.stringify({ bookingId, stars, comment, platform: platform ?? 'web' }),
    }),

  getChatMessages: (bookingId: string) =>
    api<import('./types').ChatMessage[]>(`/chat/bookings/${bookingId}/messages`),

  sendChatMessage: (bookingId: string, message: string) =>
    api<import('./types').ChatMessage>(`/chat/bookings/${bookingId}/messages`, {
      method: 'POST',
      body: JSON.stringify({ message }),
    }),

  getSupportTickets: () => api<import('./types').SupportTicket[]>('/support/tickets'),

  createSupportTicket: (subject: string, message: string, bookingId?: string) =>
    api<import('./types').SupportTicket>('/support/tickets', {
      method: 'POST',
      body: JSON.stringify({ subject, message, bookingId }),
    }),
};

export const websiteApi = {
  submitContact: (body: { name: string; email: string; phone: string; message: string }) =>
    api<{ id: string; message: string }>('/website/contact', {
      method: 'POST',
      body: JSON.stringify(body),
    }),

  applyAsAssistant: (body: { name: string; phone: string; email?: string; message?: string }) =>
    api<{ id: string; message: string }>('/website/assistant-apply', {
      method: 'POST',
      body: JSON.stringify(body),
    }),
};
