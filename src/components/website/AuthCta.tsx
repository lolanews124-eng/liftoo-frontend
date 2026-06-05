import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { AUTH_DISABLED_MESSAGE, WEB_AUTH_ENABLED } from '../../config/features';

const LOGIN_PATH = '/auth/login';

type AuthLoginCtaProps = {
  className?: string;
  children: ReactNode;
  onClick?: () => void;
};

function DisabledCta({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <span
      className={[className, 'auth-cta-disabled'].filter(Boolean).join(' ')}
      role="button"
      aria-disabled="true"
      title={AUTH_DISABLED_MESSAGE}
    >
      {children}
    </span>
  );
}

/** Header/footer/marketing link or button that opens login when auth is enabled. */
export function AuthLoginCta({ className, children, onClick }: AuthLoginCtaProps) {
  if (!WEB_AUTH_ENABLED) {
    return <DisabledCta className={className}>{children}</DisabledCta>;
  }
  return (
    <Link to={LOGIN_PATH} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}

/** Page hero / primary CTA that would route to login. */
export function AuthHeroCta({ className, children }: { className?: string; children: ReactNode }) {
  if (!WEB_AUTH_ENABLED) {
    return <DisabledCta className={className}>{children}</DisabledCta>;
  }
  return (
    <Link to={LOGIN_PATH} className={className}>
      {children}
    </Link>
  );
}

export function isAuthRoute(path: string) {
  return path === LOGIN_PATH || path.startsWith('/auth/');
}
