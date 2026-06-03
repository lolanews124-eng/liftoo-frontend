import type { Booking } from '../api/types';
import { bookingNextStep } from '../api/types';

/** True while customer must finish current booking (including payment). */
export function bookingBlocksNew(b: Booking): boolean {
  if (b.status === 'cancelled') return false;
  if (b.status !== 'completed') return true;
  return bookingNextStep(b) === 'pay';
}

export function resolveBlockingBookingPath(b: Booking): string {
  const step = bookingNextStep(b);
  if (step === 'pay') return `/payment/${b.id}`;
  if (['pending', 'searching', 'assigned', 'arriving', 'started'].includes(b.status)) {
    return `/booking/${b.id}`;
  }
  return '/app/bookings';
}
