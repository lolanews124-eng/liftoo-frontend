import { useNavigate } from 'react-router-dom';
import type { Booking } from '../api/types';
import { assistantCode, assistantSummary } from '../utils/assistantDisplay';
import {
  BOOKING_STATUS_LABEL,
  bookingNextStep,
  isBookingPaid,
  isPaymentPending,
} from '../api/types';

interface Props {
  booking: Booking;
  onClose: () => void;
}

function feeLine(label: string, amount: number) {
  return (
    <div className="fee-line">
      <span>{label}</span>
      <span>₹{amount}</span>
    </div>
  );
}

export function BookingDetailModal({ booking, onClose }: Props) {
  const navigate = useNavigate();
  const step = bookingNextStep(booking);
  const shortId = booking.id.length > 8 ? booking.id.slice(-8) : booking.id;

  const primary =
    step === 'track'
      ? { label: 'Track live', path: `/booking/${booking.id}` }
      : step === 'pay'
        ? { label: 'Pay now', path: `/payment/${booking.id}` }
        : step === 'rate_service'
          ? { label: 'Rate service', path: `/review/service/${booking.id}` }
          : step === 'rate_app'
            ? { label: 'Rate app', path: `/review/app/${booking.id}` }
            : null;

  return (
    <div className="modal-overlay" onClick={onClose} role="presentation">
      <div className="modal-sheet" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <div className="modal-handle" />
        <div className="modal-header">
          <div>
            <h2>{booking.category?.name ?? 'Booking'}</h2>
            <p className="modal-sub">Booking #{shortId}</p>
          </div>
          <span className="badge">{BOOKING_STATUS_LABEL[booking.status] ?? booking.status}</span>
        </div>

        <div className="modal-body">
          <div className="detail-row">
            <span className="detail-label">Scheduled</span>
            <span>{new Date(booking.scheduledAt).toLocaleString()}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Duration</span>
            <span>{booking.durationMin} minutes</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Venue</span>
            <span>{booking.venueName}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Address</span>
            <span>{booking.addressFormatted || booking.addressLabel}</span>
          </div>
          {booking.assistant?.name && (
            <div className="detail-row">
              <span className="detail-label">Assistant</span>
              <span>{assistantSummary(booking)}</span>
            </div>
          )}
          {assistantCode(booking) && (
            <div className="detail-row">
              <span className="detail-label">Assistant ID</span>
              <span style={{ fontWeight: 800 }}>{assistantCode(booking)}</span>
            </div>
          )}

          <div className="fee-card">
            {feeLine('Service fee', booking.serviceFee)}
            {feeLine('Platform fee', booking.platformFee)}
            {(booking.discountAmount ?? 0) > 0 && feeLine('Discount', -(booking.discountAmount ?? 0))}
            <div className="fee-line fee-total">
              <span>Total</span>
              <span>₹{booking.totalAmount}</span>
            </div>
          </div>

          {isPaymentPending(booking) && (
            <p className="payment-pending-hint">Payment pending — pay after service is complete.</p>
          )}
          {isBookingPaid(booking) && (
            <p className="payment-paid-hint">Payment completed</p>
          )}
        </div>

        <div className="modal-actions">
          {primary && (
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                onClose();
                navigate(primary.path);
              }}
            >
              {primary.label}
            </button>
          )}
          {['assigned', 'arriving', 'started'].includes(booking.status) && booking.assistant && (
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => {
                onClose();
                navigate(`/chat/${booking.id}`);
              }}
            >
              Chat with assistant
            </button>
          )}
          <button type="button" className="btn btn-outline" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
