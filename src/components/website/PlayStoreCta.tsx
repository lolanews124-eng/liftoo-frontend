import type { ReactNode } from 'react';
import { SITE_INFO } from '../../config/siteInfo';

type PlayStoreCtaProps = {
  className?: string;
  children: ReactNode;
  onClick?: () => void;
};

export function PlayStoreCta({ className, children, onClick }: PlayStoreCtaProps) {
  return (
    <a
      href={SITE_INFO.playStoreUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={onClick}
    >
      {children}
    </a>
  );
}
