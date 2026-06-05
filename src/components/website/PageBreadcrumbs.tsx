import { Link } from 'react-router-dom';
import type { BreadcrumbItem } from '../../seo/seoConfig';

interface PageBreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function PageBreadcrumbs({ items }: PageBreadcrumbsProps) {
  if (items.length <= 1) return null;

  return (
    <nav className="site-breadcrumbs" aria-label="Breadcrumb">
      <ol className="site-breadcrumbs-list">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={item.path} className="site-breadcrumbs-item">
              {isLast ? (
                <span aria-current="page">{item.name}</span>
              ) : (
                <Link to={item.path}>{item.name}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
