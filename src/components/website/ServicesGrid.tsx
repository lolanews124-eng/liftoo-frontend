import { MarketingCta } from './MarketingCta';
import type { Category } from '../../api/types';
import {
  categoryDescription,
  categoryIcon,
  categoryShortName,
  formatHourlyRate,
} from '../../utils/serviceCatalog';

interface ServicesGridProps {
  categories: Category[];
  variant?: 'landing' | 'page';
  showCta?: boolean;
}

export function ServicesGrid({ categories, variant = 'landing', showCta = false }: ServicesGridProps) {
  const gridClass = variant === 'landing' ? 'lp-categories-grid' : 'site-services-page-grid';

  return (
    <div className={gridClass}>
      {categories.map((c) => {
        const Icon = categoryIcon(c.slug);
        const title = categoryShortName(c.name, c.slug);
        const desc = categoryDescription(c.slug, c.description);
        const rate = formatHourlyRate(c.baseRate);

        const card = (
          <>
            <div className={variant === 'landing' ? 'lp-category-icon' : 'site-service-icon-wrap'}>
              <Icon className={variant === 'landing' ? 'lp-icon-lg' : 'site-service-lucide'} aria-hidden />
            </div>
            <h3>{title}</h3>
            <p>{desc}</p>
            <span className={variant === 'landing' ? 'lp-category-rate' : 'rate'}>{rate}</span>
            {variant === 'page' && (
              <span className="site-service-duration">30 min – 4 hours</span>
            )}
          </>
        );

        if (showCta) {
          return (
            <MarketingCta key={c.id} className="site-service-card-v2">
              {card}
            </MarketingCta>
          );
        }

        return (
          <div key={c.id} className={variant === 'landing' ? 'lp-category-card' : 'site-service-card-v2 site-service-card-static'}>
            {card}
          </div>
        );
      })}
    </div>
  );
}

export function ServicesGridSkeleton({ variant = 'landing' }: { variant?: 'landing' | 'page' }) {
  const gridClass = variant === 'landing' ? 'lp-categories-grid' : 'site-services-page-grid';
  const cardClass = variant === 'landing' ? 'lp-category-card' : 'site-service-card-v2';

  return (
    <div className={gridClass}>
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className={`${cardClass} site-skeleton-card`}>
          <div className="site-skeleton-icon" />
          <div className="site-skeleton-line site-skeleton-line-md" />
          <div className="site-skeleton-line site-skeleton-line-lg" />
          <div className="site-skeleton-line site-skeleton-line-sm" />
        </div>
      ))}
    </div>
  );
}
