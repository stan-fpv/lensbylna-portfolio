import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Reveal from '../components/Reveal';
import Logo from '../components/Logo';
import '../components/logo.css';
import { photos, categories, byCategory, thumb, full, totalPhotos } from '../lib/photos';
import './home.css';

const pick = (name: string) => photos.find(p => p.name.includes(name)) ?? photos[0];

const heroMain = pick('reportaze-koncerty-dzem');
const heroSide = pick('motoryzacja-drift-osaka-17');
const heroSmall = pick('okolicznosciowe-40-plus');

const marqueePhotos = [
  pick('motoryzacja-drift-osaka-22'),
  pick('reportaze-koncerty-zespol-piersi'),
  pick('okolicznosciowe-szymona-18'),
  pick('motoryzacja-indy-squad'),
  pick('reportaze-teatr'),
  pick('motoryzacja-zloty-osaka'),
  pick('reportaze-koncerty-wiktor'),
  pick('okolicznosciowe-18-agi'),
];

const pricingOverview = [
  {
    kind: 'Pakiety imprezowe',
    from: 'od 500 zł',
    desc: 'Gotowe pakiety reportażu na osiemnastki, urodziny i jubileusze — Mini, Standard i Premium.',
    cats: ['osiemnastki', 'okolicznosciowe'],
  },
  {
    kind: 'Sesje indywidualne',
    from: 'od 50 zł',
    desc: 'Elastyczna wycena pod konkretną sesję — motoryzacja, koncerty, teatr i wydarzenia.',
    cats: ['motoryzacja', 'reportaze'],
  },
];

export default function Home() {
  return (
    <main className="home">
      {/* ---------- HERO ---------- */}
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <motion.p
              className="eyebrow"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1], delay: 0.1 }}
            >
              Fotografia eventowa & reportażowa
            </motion.p>
            <h1>
              {['Zatrzymuję', 'emocje,', 'zanim miną.'].map((line, i) => (
                <span className="hero-line" key={line}>
                  <motion.span
                    initial={{ y: '110%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1], delay: 0.2 + i * 0.12 }}
                  >
                    {i === 1 ? <em>{line}</em> : line}
                  </motion.span>
                </span>
              ))}
            </h1>
            <motion.p
              className="hero-sub"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1], delay: 0.65 }}
            >
              Motoryzacja, koncerty, teatr i imprezy okolicznościowe.
              Reportaże, które wyglądają jak wspomnienia — tylko ostrzejsze.
            </motion.p>
            <motion.div
              className="hero-cta"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1], delay: 0.8 }}
            >
              <a className="btn" href="#portfolio">Zobacz portfolio</a>
              <a className="btn ghost" href="#kontakt">Skontaktuj się</a>
            </motion.div>
          </div>
          <div className="hero-visual">
            <motion.div
              className="hero-img hero-img-main"
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1], delay: 0.25 }}
            >
              <img src={full(heroMain)} alt="Koncert — fotografia reportażowa" fetchPriority="high" />
            </motion.div>
            <motion.div
              className="hero-img hero-img-side"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.23, 1, 0.32, 1], delay: 0.55 }}
            >
              <img src={thumb(heroSide)} alt="Drift — fotografia motoryzacyjna" />
            </motion.div>
            <motion.div
              className="hero-img hero-img-small"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.23, 1, 0.32, 1], delay: 0.75 }}
            >
              <img src={thumb(heroSmall)} alt="Impreza okolicznościowa" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ---------- MARQUEE ---------- */}
      <section className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...marqueePhotos, ...marqueePhotos].map((p, i) => (
            <img key={i} src={thumb(p)} alt="" loading="lazy" />
          ))}
        </div>
      </section>

      {/* ---------- O MNIE ---------- */}
      <section className="about" id="o-mnie">
        <div className="container about-grid">
          <Reveal>
            <p className="eyebrow">O mnie</p>
            <h2>Cześć, tu <em>lens by lna</em></h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="about-text">
              Fotografuję to, co dzieje się naprawdę — bez ustawiania na siłę, bez sztucznych
              kadrów. Od zadymionych torów driftowych, przez światła sceny, po parkiet na
              osiemnastce. Pracuję reportażowo: jestem tam, gdzie dzieje się emocja, i oddaję
              ją w kadrze tak, jak wyglądała naprawdę.
            </p>
            <div className="about-stats">
              <div><strong>{totalPhotos}+</strong><span>zdjęć w portfolio</span></div>
              <div><strong>17</strong><span>zrealizowanych wydarzeń</span></div>
              <div><strong>4</strong><span>specjalizacje</span></div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- PORTFOLIO ---------- */}
      <section className="portfolio" id="portfolio">
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow">Portfolio</p>
            <h2>Wybierz <em>kategorię</em></h2>
            <p className="section-lead">
              Cztery specjalizacje, każda z osobną galerią i dopasowanym cennikiem.
            </p>
          </Reveal>
          <div className="cat-grid">
            {categories.map((cat, i) => {
              const items = byCategory(cat.slug);
              const cover = items[Math.min(2, items.length - 1)];
              return (
                <Reveal key={cat.slug} delay={(i % 2) * 120}>
                  <Link to={`/galeria/${cat.slug}`} className="cat-card">
                    <div className="cat-img">
                      <img src={full(cover)} alt={cat.title} loading="lazy" />
                      <span className="cat-price">{cat.priceHint}</span>
                    </div>
                    <div className="cat-body">
                      <h3>{cat.title}</h3>
                      <p>{cat.tagline}</p>
                      <span className="cat-link">
                        Galeria i cennik <i>({items.length} zdjęć)</i> →
                      </span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------- CENNIK (overview) ---------- */}
      <section className="cennik" id="cennik">
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow">Cennik</p>
            <h2>Dwa sposoby <em>współpracy</em></h2>
            <p className="section-lead">
              Pełny cennik wraz z galerią znajdziesz w każdej kategorii. Oto szybki przegląd.
            </p>
          </Reveal>
          <div className="cennik-grid">
            {pricingOverview.map((o, i) => (
              <Reveal key={o.kind} delay={i * 120}>
                <div className="cennik-card">
                  <p className="cennik-from">{o.from}</p>
                  <h3>{o.kind}</h3>
                  <p className="cennik-desc">{o.desc}</p>
                  <div className="cennik-links">
                    {o.cats.map(slug => {
                      const c = categories.find(cc => cc.slug === slug)!;
                      return (
                        <Link key={slug} to={`/galeria/${slug}`} className="cennik-pill">
                          {c.short} →
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- CONTACT ---------- */}
      <section className="contact" id="kontakt">
        <div className="container contact-inner">
          <Reveal>
            <p className="eyebrow">Kontakt</p>
            <h2>Porozmawiajmy o <em>Twoim wydarzeniu</em></h2>
            <p className="contact-text">
              Najszybciej złapiesz mnie na Instagramie — odpowiadam na bieżąco.
              Napisz, co planujesz, a wspólnie ustalimy szczegóły.
            </p>
            <div className="contact-cta">
              <a className="btn" href="https://www.instagram.com/lensbylna" target="_blank" rel="noreferrer">
                Napisz na Instagramie
              </a>
              <a className="btn ghost" href="https://www.facebook.com/share/1SQKuN8CZ9/" target="_blank" rel="noreferrer">
                Facebook
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- LOGO OUTRO ---------- */}
      <section className="logo-outro">
        <div className="container">
          <Reveal className="logo-outro-inner">
            <Logo onView className="logo-outro-mark" />
            <p>Fotografia, która zostaje na dłużej.</p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
