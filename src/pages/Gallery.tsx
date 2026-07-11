import { useMemo, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import Reveal from '../components/Reveal';
import Lightbox from '../components/Lightbox';
import PricingPanel from '../components/PricingPanel';
import { categories, byCategory, thumb, groupLabel, type Photo } from '../lib/photos';
import './gallery.css';

const PREVIEW = 6;

export default function Gallery() {
  const { slug } = useParams();
  const cat = categories.find(c => c.slug === slug);
  const all = useMemo(() => (cat ? byCategory(cat.slug) : []), [cat]);
  const labels = useMemo(
    () => ['Wszystkie', ...Array.from(new Set(all.map(groupLabel)))],
    [all],
  );
  const [filter, setFilter] = useState('Wszystkie');
  const [expanded, setExpanded] = useState(false);
  const [lbIndex, setLbIndex] = useState<number | null>(null);

  if (!cat) return <Navigate to="/" replace />;

  const items: Photo[] = filter === 'Wszystkie' ? all : all.filter(p => groupLabel(p) === filter);
  const visible = expanded ? items : items.slice(0, PREVIEW);
  const hidden = items.length - visible.length;

  const setFilterReset = (l: string) => {
    setFilter(l);
    setExpanded(false);
    setLbIndex(null);
  };

  return (
    <main className="gallery">
      <div className="container">
        <Reveal className="gallery-head">
          <Link to="/" className="gallery-back">← Strona główna</Link>
          <p className="eyebrow">Portfolio</p>
          <h1>{cat.title}</h1>
          <p className="gallery-tagline">{cat.tagline}</p>
        </Reveal>

        <div className="gallery-layout">
          {/* ---- Gallery ---- */}
          <div className="gallery-main">
            {labels.length > 2 && (
              <div className="gallery-filters">
                {labels.map(l => (
                  <button
                    key={l}
                    className={`filter-btn ${filter === l ? 'active' : ''}`}
                    onClick={() => setFilterReset(l)}
                  >
                    {l}
                  </button>
                ))}
              </div>
            )}

            <div className={`masonry ${expanded ? 'expanded' : 'collapsed'}`} key={filter + expanded}>
              {visible.map((p, i) => (
                <button
                  key={p.name}
                  className="masonry-item"
                  style={{ animationDelay: `${Math.min(i, 8) * 45}ms` }}
                  onClick={() => setLbIndex(i)}
                  aria-label="Powiększ zdjęcie"
                >
                  <img
                    src={thumb(p)}
                    alt={`${cat.title} — ${groupLabel(p)}`}
                    loading={i < 6 ? 'eager' : 'lazy'}
                    style={{ aspectRatio: `${p.w} / ${p.h}` }}
                  />
                  <span className="masonry-tag">{groupLabel(p)}</span>
                </button>
              ))}
            </div>

            {hidden > 0 && (
              <div className="gallery-more">
                <button className="btn" onClick={() => setExpanded(true)}>
                  Pokaż całą galerię ({items.length} zdjęć)
                </button>
              </div>
            )}
            {expanded && items.length > PREVIEW && (
              <div className="gallery-more">
                <button className="btn ghost" onClick={() => setExpanded(false)}>
                  Zwiń galerię
                </button>
              </div>
            )}
          </div>

          {/* ---- Pricing sidebar ---- */}
          <Reveal className="gallery-aside" delay={80}>
            <PricingPanel kind={cat.pricing} />
          </Reveal>
        </div>
      </div>

      <Lightbox items={items} index={lbIndex} onClose={() => setLbIndex(null)} onNavigate={setLbIndex} />
    </main>
  );
}
