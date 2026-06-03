import { Link } from 'react-router-dom';
import { LEGAL_POLICIES } from '../legal/policies';

/** All legal policy links for profile and settings menus. */
export function LegalProfileLinks() {
  return (
    <div className="legal-profile-section">
      <h2 className="legal-profile-heading">Legal & policies</h2>
      <div className="legal-profile-list">
        {LEGAL_POLICIES.map((policy) => (
          <Link
            key={policy.slug}
            to={`/legal/${policy.slug}`}
            className="card card-click legal-profile-item"
          >
            <span className="legal-profile-title">{policy.title}</span>
            <span className="legal-profile-arrow" aria-hidden>
              ›
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
