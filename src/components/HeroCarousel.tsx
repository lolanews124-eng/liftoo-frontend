import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const SLIDES = [
  {
    tag: '⚡ Instant booking',
    title: 'Shop without carrying bags',
    subtitle: 'Verified assistants for malls, markets & exhibitions.',
    cta: 'Book Assistant',
    className: 'hero-slide-pink',
  },
  {
    tag: '🛍️ Bag carry',
    title: 'Hands-free shopping',
    subtitle: 'Let an assistant carry bags while you browse freely.',
    cta: 'Book now',
    className: 'hero-slide-blue',
  },
  {
    tag: '👨‍👩‍👧 Family help',
    title: 'Help for family & seniors',
    subtitle: 'Trusted support at hospitals, malls and crowded places.',
    cta: 'Get help',
    className: 'hero-slide-green',
  },
  {
    tag: '🎉 Events',
    title: 'Festival & queue support',
    subtitle: 'Skip long lines — assistants wait so you do not have to.',
    cta: 'Find assistant',
    className: 'hero-slide-purple',
  },
];

export function HeroCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), 5000);
    return () => clearInterval(t);
  }, []);

  const slide = SLIDES[index];

  return (
    <div className={`hero-carousel ${slide.className}`}>
      <div className="hero-carousel-inner">
        <span className="hero-tag">{slide.tag}</span>
        <h1>{slide.title}</h1>
        <p>{slide.subtitle}</p>
        <Link to="/booking/new" className="btn btn-primary hero-cta">
          {slide.cta}
        </Link>
        <div className="hero-dots" role="tablist" aria-label="Hero slides">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === index}
              className={`hero-dot${i === index ? ' active' : ''}`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
