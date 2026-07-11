import { useMemo, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import Reveal from '../components/Reveal';
import Lightbox from '../components/Lightbox';
import PricingPanel from '../components/PricingPanel';
import { categories, byCategory, thumb, groupLabel, type Photo } from '../lib/photos';
import './gallery.css';

const PREVIEW_PER_GROUP = 4;

export default function Gallery() {
  const { slug } = useParams();
  const cat = categories.find(c => c.slug === slug);
  const all = useMemo(() => (cat ? byCategory(cat.slug) : []), [cat]);

  const groups = useMemo(() => {
    const map = new Map<string, Photo[]>();
    all.forEach(p => {
      const l = groupLabel(p);
      if (!map.has(l)) map.set(l, []);
      map.get(l)!.push(p);
    });
    return [...map.entries()].map(([label, photos]) => ({ label, photos }));
  }, [all]);

  const [expanded, setExpanded] = useState(false);
  const [lbIndex, setLbIndex] = useState<number | null>(null);

  if (!cat) return <Navigate to="/" replace />;

  const hasPricing = cat.pricing !== 'none';
  const multi = groups.length > 1;

  // Build visible groups + a flat list (for the lightbox) with running indices.
  let idx = 0;
  const rendered = groups.map(g => {
    const photos = expanded ? g.photos : g.photos.slice(0, PREVIEW_PER_GROUP);
    return { label: g.label, items: photos.map(p => ({ p, i: idx++ })) };
  });
  const flat = rendered.flatMap(g => g.items.map(x => x.p));
  const total = all.length;
  const canExpand = total > flat.length;

  return (
    <main className="gallery">
      <div className="container">
        <Reveal className="gallery-head">
          <Link to="/" className="gallery-back">← Strona główna</Link>
          <p className="eyebrow">Portfolio</p>
          <h1>{cat.title}</h1>
          <p className="gallery-tagline">{cat.tagline}</p>
        </Reveal>

        <div className={`gallery-layout ${hasPricing ? '' : 'no-aside'}`}>
          <div className="gallery-main">
            {rendered.map(group => (
              <section className="gallery-group" key={group.label}>
                {multi && (
                  <div className="group-head">
                    <h2>{group.label}</h2>
                    <span className="group-count">
                      {groups.find(g => g.label === group.label)!.photos.length} zdjęć
                    </span>
                  </div>
                )}
                <div className="masonry">
                  {group.items.map(({ p, i }) => (
                    <button
                      key={p.name}
                      className="masonry-item"
                      style={{ animationDelay: `${Math.min(i, 8) * 40}ms` }}
                      onClick={() => setLbIndex(i)}
                      aria-label="Powiększ zdjęcie"
                    >
                      <img
                        src={thumb(p)}
                        alt={`${cat.title} — ${group.label}`}
                        loading={i < 6 ? 'eager' : 'lazy'}
                        style={{ aspectRatio: `${p.w} / ${p.h}` }}
                      />
                    </button>
                  ))}
                </div>
              </section>
            ))}

            {(canExpand || (expanded && total > groups.length * PREVIEW_PER_GROUP)) && (
              <div className="gallery-more">
                {canExpand ? (
                  <button className="btn" onClick={() => setExpanded(true)}>
                    Pokaż całą galerię ({total} zdjęć)
                  </button>
                ) : (
                  <button className="btn ghost" onClick={() => setExpanded(false)}>
                    Zwiń galerię
                  </button>
                )}
              </div>
            )}
          </div>

          {hasPricing && (
            <Reveal className="gallery-aside" delay={80}>
              <PricingPanel kind={cat.pricing} />
            </Reveal>
          )}
        </div>
      </div>

      <Lightbox items={flat} index={lbIndex} onClose={() => setLbIndex(null)} onNavigate={setLbIndex} />
    </main>
  );
}
