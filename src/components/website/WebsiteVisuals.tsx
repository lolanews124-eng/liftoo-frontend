import { HeartHandshake, ShoppingBag, Users } from 'lucide-react';

type FeatureVisualProps = {
  variant: 'shopper' | 'family';
};

export function FeatureVisual({ variant }: FeatureVisualProps) {
  const isShopper = variant === 'shopper';

  return (
    <div className={`lp-feature-visual${isShopper ? ' lp-feature-visual-shopper' : ' lp-feature-visual-family'}`}>
      <div className="lp-feature-visual-bg" aria-hidden />
      <div className="lp-feature-visual-content">
        {isShopper ? (
          <>
            <div className="lp-feature-visual-icon lp-feature-visual-icon-main">
              <ShoppingBag aria-hidden />
            </div>
            <div className="lp-feature-visual-icon lp-feature-visual-icon-sub">
              <Users aria-hidden />
            </div>
            <p className="lp-feature-visual-caption">Hands-free shopping</p>
          </>
        ) : (
          <>
            <div className="lp-feature-visual-icon lp-feature-visual-icon-main">
              <HeartHandshake aria-hidden />
            </div>
            <p className="lp-feature-visual-caption">Care for your parents</p>
          </>
        )}
      </div>
    </div>
  );
}

export function HeroVisual() {
  return (
    <div className="lp-hero-visual-art" aria-hidden>
      <div className="lp-hero-visual-art-bg" />
      <div className="lp-hero-visual-art-card lp-hero-visual-art-card-1">
        <ShoppingBag />
        <span>Bag carry</span>
      </div>
      <div className="lp-hero-visual-art-card lp-hero-visual-art-card-2">
        <Users />
        <span>Family help</span>
      </div>
      <div className="lp-hero-visual-art-card lp-hero-visual-art-card-3">
        <HeartHandshake />
        <span>Senior care</span>
      </div>
    </div>
  );
}
