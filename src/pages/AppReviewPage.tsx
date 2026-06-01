import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { customerApi } from '../api/client';
import { showError } from '../components/NetworkError';

export function AppReviewPage() {
  const { id } = useParams<{ id: string }>();
  const [stars, setStars] = useState(5);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    setLoading(true);
    try {
      await customerApi.submitAppReview(id, stars, comment.trim() || undefined);
      navigate('/bookings');
    } catch (err) {
      alert(showError(err));
    } finally {
      setLoading(false);
    }
  };

  const skip = () => navigate('/bookings');

  return (
    <div className="page">
      <h1 className="page-title">Rate Liftoo</h1>
      <p className="page-sub">How is your experience with the app?</p>

      <form onSubmit={submit}>
        <div className="star-row">
          {[1, 2, 3, 4, 5].map((s) => (
            <button
              key={s}
              type="button"
              className={`star-btn${s <= stars ? ' active' : ''}`}
              onClick={() => setStars(s)}
            >
              ★
            </button>
          ))}
        </div>

        <label className="field">
          <span>Feedback (optional)</span>
          <textarea value={comment} onChange={(e) => setComment(e.target.value)} rows={4} placeholder="Tell us what you think…" />
        </label>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Submitting…' : 'Submit feedback'}
        </button>
        <button type="button" className="btn btn-outline" style={{ marginTop: 12 }} onClick={skip}>
          Skip
        </button>
      </form>
    </div>
  );
}
