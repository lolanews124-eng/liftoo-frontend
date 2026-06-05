import type { ReactNode } from 'react';
import { WEB_AUTH_ENABLED } from '../../config/features';
import { AuthHeroCta, AuthLoginCta } from './AuthCta';
import { PlayStoreCta } from './PlayStoreCta';

type MarketingCtaProps = {
  className?: string;
  children: ReactNode;
  onClick?: () => void;
  variant?: 'link' | 'hero';
};

/** Routes to login when web auth is on; otherwise opens the Play Store listing. */
export function MarketingCta({ className, children, onClick, variant = 'link' }: MarketingCtaProps) {
  if (WEB_AUTH_ENABLED) {
    if (variant === 'hero') {
      return <AuthHeroCta className={className}>{children}</AuthHeroCta>;
    }
    return (
      <AuthLoginCta className={className} onClick={onClick}>
        {children}
      </AuthLoginCta>
    );
  }

  return (
    <PlayStoreCta className={className} onClick={onClick}>
      {children}
    </PlayStoreCta>
  );
}
