import type { Booking } from '../api/types';

export function assistantCode(booking: Booking): string | null {
  const code = booking.assistant?.assistantProfile?.assistantCode?.trim();
  return code || null;
}

export function assistantSummary(booking: Booking): string {
  const name = booking.assistant?.name ?? 'Assistant';
  const code = assistantCode(booking);
  return code ? `${name} · ID ${code}` : name;
}
