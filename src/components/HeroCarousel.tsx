import { useEffect, useRef, useState } from 'react';
import type { Photo } from '../lib/photos';
import { full } from '../lib/photos';
import './hero-carousel.css';

type Slide = { photo: Photo; caption: string };

type Props = {
  slides: Slide[];
  cardsPerView?: number;
};

/** Sliding card carousel: N cards visible, arrows advance by one, caption
 *  reveals on hover. Falls back to a single card per view on narrow screens. */
export default function HeroCarousel({ slides, cardsPerView = 3 }: Props) {
  const [perView, setPerView] = useState(cardsPerView);
  const [index, setIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onResize = () => {
      const w = window.innerWidth;
      setPerView(w < 640 ? 1 : w < 980 ? 2 : cardsPerView);
    };
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [cardsPerView]);

  const cardWidth = 100 / (perView + 1);
  const canSlide = slides.length > perView;

  const step = (dir: 1 | -1) => {
    if (animating || !canSlide) return;
    const track = trackRef.current;
    if (!track) return;
    setAnimating(true);

    if (dir === 1) {
      track.style.transition = 'transform 550ms cubic-bezier(0.23,1,0.32,1)';
      track.style.transform = `translateX(-${cardWidth}%)`;
      window.setTimeout(() => {
        setIndex(i => (i + 1) % slides.length);
        track.style.transition = 'none';
        track.style.transform = 'translateX(0)';
        void track.offsetWidth;
        setAnimating(false);
      }, 550);
    } else {
      track.style.transition = 'none';
      track.style.transform = `translateX(-${cardWidth}%)`;
      setIndex(i => (i - 1 + slides.length) % slides.length);
      void track.offsetWidth;
      track.style.transition = 'transform 550ms cubic-bezier(0.23,1,0.32,1)';
      track.style.transform = 'translateX(0)';
      window.setTimeout(() => setAnimating(false), 550);
    }
  };

  const visible = Array.from({ length: perView + 1 }, (_, i) => slides[(index + i) % slides.length]);

  return (
    <div className="hcx">
      {canSlide && (
        <>
          <button className="hcx-arrow hcx-prev" onClick={() => step(-1)} disabled={animating} aria-label="Poprzednie zdjęcie">
            ‹
          </button>
          <button className="hcx-arrow hcx-next" onClick={() => step(1)} disabled={animating} aria-label="Następne zdjęcie">
            ›
          </button>
        </>
      )}
      <div className="hcx-viewport">
        <div
          ref={trackRef}
          className="hcx-track"
          style={{ width: `${((perView + 1) * 100) / perView}%` }}
        >
          {visible.map((s, i) => (
            <div key={`${s.photo.name}-${i}`} className="hcx-slot" style={{ width: `${100 / (perView + 1)}%` }}>
              <figure className="hcx-card">
                <img src={full(s.photo)} alt={s.caption} loading={i === 0 ? 'eager' : 'lazy'} draggable={false} />
                <figcaption>
                  <span>{s.caption}</span>
                </figcaption>
              </figure>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
