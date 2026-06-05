import { Link } from 'react-router-dom';

const FAVICON_SRC = '/favicon.png';
const HEADER_LOGO_SRC = '/logo-header.png';

type WebsiteLogoProps = {
  variant?: 'header' | 'footer';
  onClick?: () => void;
};

export function WebsiteLogo({ variant = 'header', onClick }: WebsiteLogoProps) {
  const className = `site-logo${variant === 'footer' ? ' site-logo-footer' : ''}`;

  return (
    <Link to="/" className={className} onClick={onClick} aria-label="Liftoo home">
      <img src={FAVICON_SRC} alt="" className="site-logo-icon" width={36} height={36} />
      <img
        src={HEADER_LOGO_SRC}
        alt="Liftoo — Your personal shopping assistant"
        className="site-logo-wordmark"
        width={140}
        height={40}
      />
    </Link>
  );
}
