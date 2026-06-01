import { Link, useNavigate, useParams } from 'react-router-dom';
import { getPolicyBySlug } from '../../legal/policies';

export function LegalPolicyPage() {
  const { slug = '' } = useParams();
  const navigate = useNavigate();
  const policy = getPolicyBySlug(slug);

  if (!policy) {
    return (
      <div className="page legal-page">
        <p>Policy not found.</p>
        <Link to="/legal">Back to Legal</Link>
      </div>
    );
  }

  return (
    <div className="page legal-page animate-in">
      <div className="top-bar legal-top-bar">
        <button type="button" onClick={() => navigate(-1)}>← Back</button>
        <Link to="/legal" className="legal-all-link">All policies</Link>
      </div>

      <header className="legal-doc-header">
        <h1>{policy.title}</h1>
        <p className="legal-updated">Last updated: {policy.lastUpdated}</p>
        <p className="legal-doc-summary">{policy.summary}</p>
      </header>

      <article className="legal-doc">
        {policy.sections.map((section) => (
          <section key={section.heading}>
            <h2>{section.heading}</h2>
            {section.body.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
            {section.bullets && (
              <ul>
                {section.bullets.map((item) => (
                  <li key={item.slice(0, 40)}>{item}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </article>
    </div>
  );
}
