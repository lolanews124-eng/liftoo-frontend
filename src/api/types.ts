export interface User {
  id: string;
  email: string;
  emailVerified?: boolean;
  phone?: string | null;
  name?: string | null;
  avatarUrl?: string | null;
  roles: string[];
  activeRole?: string | null;
  referralCode?: string | null;
  walletBalance?: number;
  profileComplete?: boolean;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description?: string;
  icon?: string;
  baseRate: number;
}

export interface Address {
  id: string;
  label: string;
  formattedAddress: string;
  lat: number;
  lng: number;
  isDefault: boolean;
}

export interface BookingZoneAvailability {
  label: string;
  count: number;
}

export interface BookingSearchAvailability {
  nearbyAvailable: number;
  matchRadiusKm: number;
  areaLabel: string;
  zones: BookingZoneAvailability[];
  notifiedCount: number;
  message: string;
}

export interface BookingTrackingPoint {
  lat: number;
  lng: number;
  label?: string;
  name?: string;
  address?: string;
}

export interface BookingTracking {
  customer: BookingTrackingPoint;
  assistant?: BookingTrackingPoint | null;
  distanceKm?: string | null;
  etaMinutes?: number | null;
  statusMessage: string;
  progress?: number;
}

export interface Booking {
  id: string;
  status: string;
  durationMin: number;
  venueName: string;
  scheduledAt: string;
  addressLabel: string;
  addressFormatted: string;
  lat: number;
  lng: number;
  serviceFee: number;
  platformFee: number;
  discountAmount?: number;
  totalAmount: number;
  serviceOtp?: string | null;
  category?: Category;
  assistant?: { id: string; name?: string; phone?: string; assistantProfile?: { rating?: number } } | null;
  customer?: { id: string; name?: string; phone?: string };
  statusHistory?: { status: string; note?: string; createdAt: string }[];
  payment?: { method: string; status: string; amount: number } | null;
  rating?: { stars: number; comment?: string } | null;
  appReview?: { stars: number } | null;
  searchAvailability?: BookingSearchAvailability | null;
  tracking?: BookingTracking | null;
}

export interface WalletData {
  balance: number;
  transactions: {
    id: string;
    type: string;
    amount: number;
    description: string;
    createdAt: string;
  }[];
}

export interface Notification {
  id: string;
  title: string;
  body: string;
  readAt?: string | null;
  createdAt: string;
}

export interface SupportTicket {
  id: string;
  subject: string;
  message: string;
  status: string;
  adminReply?: string | null;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  bookingId: string;
  senderId: string;
  message: string;
  createdAt: string;
  sender?: { id: string; name?: string };
}

export interface ReferralData {
  referralCode: string;
  totalReferrals: number;
  totalEarned: number;
  history: { id: string; code: string; rewardAmount: number; status: string; createdAt: string }[];
}

export const DURATION_OPTIONS = [
  { minutes: 30, label: '30 min' },
  { minutes: 60, label: '1 hour' },
  { minutes: 120, label: '2 hours' },
  { minutes: 180, label: '3 hours' },
  { minutes: 240, label: '4 hours' },
];

export const BOOKING_STATUS_LABEL: Record<string, string> = {
  pending: 'Pending',
  searching: 'Finding assistant',
  assigned: 'Assistant assigned',
  arriving: 'Assistant arriving',
  started: 'Service in progress',
  completed: 'Completed',
  cancelled: 'Cancelled',
};

export function isBookingPaid(b: Booking): boolean {
  if (!b.payment) return false;
  return b.payment.status === 'completed';
}

export function bookingNextStep(b: Booking): string | null {
  if (['pending', 'searching', 'assigned', 'arriving', 'started'].includes(b.status)) return 'track';
  if (b.status === 'completed' && !isBookingPaid(b)) return 'pay';
  if (b.status === 'completed' && isBookingPaid(b) && !b.rating) return 'rate_service';
  if (b.status === 'completed' && b.rating && !b.appReview) return 'rate_app';
  return null;
}
