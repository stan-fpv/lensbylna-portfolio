import { useMemo, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import Reveal from '../components/Reveal';
import Lightbox from '../components/Lightbox';
import { categories, byCategory, thumb, groupLabel, type Photo } from '../lib/photos';
import './gallery.css';

export default function Gallery() {
  const { slug } = useParams();
  const cat = categories.find(c => c.slug === slug);
  const all = useMemo(() => (cat ? byCategory(cat.slug) : []), [cat]);
  const labels = useMemo(
    () => ['Wszystkie', ...Array.from(new Set(all.map(groupLabel)))],
    [all],
  );
  const [filter, setFilter] = useState('Wszystkie');
  const [lbIndex, setLbIndex] = useState<number | null>(null);

  if (!cat) return <Navigate to="/" replace />;

  const items: Photo[] = filter === 'Wszystkie' ? all : all.filter(p => groupLabel(p) === filter);

  return (
    <main className="gallery">
      <div className="container">
        <Reveal className="gallery-head">
          <Link to="/" className="gallery-back">← Strona główna</Link>
          <p className="eyebrow">Portfolio</p>
          <h1>{cat.title}</h1>
          <p className="gallery-tagline">{cat.tagline}</p>
        </Reveal>

        {labels.length > 2 && (
          <Reveal className="gallery-filters" delay={100}>
            {labels.map(l => (
              <button
                key={l}
                className={`filter-btn ${filter === l ? 'active' : ''}`}
                onClick={() => { setFilter(l); setLbIndex(null); }}
              >
                {l}
              </button>
            ))}
          </Reveal>
        )}

        <div className="masonry" key={filter}>
          {items.map((p, i) => (
            <button
              key={p.name}
              className="masonry-item"
              style={{ animationDelay: `${Math.min(i, 12) * 45}ms` }}
              onClick={() => setLbIndex(i)}
              aria-label="Powiększ zdjęcie"
            >
              <img
                src={thumb(p)}
                alt={`${cat.title} — ${groupLabel(p)}`}
                loading={i < 8 ? 'eager' : 'lazy'}
                style={{ aspectRatio: `${p.w} / ${p.h}` }}
              />
              <span className="masonry-tag">{groupLabel(p)}</span>
            </button>
          ))}
        </div>
      </div>

      <Lightbox items={items} index={lbIndex} onClose={() => setLbIndex(null)} onNavigate={setLbIndex} />
    </main>
  );
}
