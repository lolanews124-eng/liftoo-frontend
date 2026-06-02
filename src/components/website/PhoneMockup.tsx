export function PhoneMockup() {
  return (
    <div className="phone-mockup" aria-hidden>
      <div className="phone-mockup-glow" />
      <div className="phone-frame">
        <div className="phone-notch" />
        <div className="phone-screen">
          <div className="phone-status-bar">
            <span>9:41</span>
            <span className="phone-signal">●●●</span>
          </div>
          <div className="phone-app-header">
            <span>Hi, Priya 👋</span>
            <span className="phone-wallet">₹2,450</span>
          </div>
          <div className="phone-card phone-card-live">
            <div className="phone-card-badge">Live</div>
            <strong>Phoenix Mall</strong>
            <p>Bag carry · 2h</p>
            <div className="phone-map">
              <div className="phone-map-dot you" />
              <div className="phone-map-line" />
              <div className="phone-map-dot assistant" />
            </div>
            <span className="phone-eta">Arriving in 6 min</span>
          </div>
          <div className="phone-card phone-card-sm">
            <span>🛍️</span>
            <div>
              <strong>Book assistant</strong>
              <p>From ₹150/hr</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
