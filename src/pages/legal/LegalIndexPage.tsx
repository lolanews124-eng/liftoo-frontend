import { Link } from 'react-router-dom';
import { LEGAL_POLICIES } from '../../legal/policies';

export function LegalIndexPage() {
  return (
    <div className="page legal-page animate-in">
      <div className="legal-hero">
        <h1 className="page-title">Legal & Policies</h1>
        <p className="page-sub">
          Transparency about how Liftoo works, how we handle your data, and your rights as a customer or assistant.
        </p>
      </div>

      <div className="legal-list">
        {LEGAL_POLICIES.map((policy) => (
          <Link key={policy.slug} to={`/legal/${policy.slug}`} className="card card-click legal-card">
            <div>
              <h2>{policy.title}</h2>
              <p>{policy.summary}</p>
              <span className="legal-updated">Updated {policy.lastUpdated}</span>
            </div>
            <span className="legal-arrow" aria-hidden>›</span>
          </Link>
        ))}
      </div>

      <p className="legal-footer-note">
        Questions? Email <a href="mailto:support@liftoo.in">support@liftoo.in</a>
      </p>
    </div>
  );
}
