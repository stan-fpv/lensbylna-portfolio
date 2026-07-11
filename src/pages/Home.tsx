import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Reveal from '../components/Reveal';
import { photos, categories, byCategory, thumb, full } from '../lib/photos';
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

const packages = [
  {
    name: 'Pakiet Mini',
    price: '500 zł',
    note: 'Dla mało wymagających.',
    featured: false,
    items: [
      'Do 3 godzin reportażu',
      'Zdjęcia z gośćmi, tortu oraz najważniejszych momentów',
      'Minimum 80 obrobionych zdjęć',
      'Galeria online do pobrania',
      'Czas realizacji do 30 dni',
    ],
  },
  {
    name: 'Pakiet Standard',
    price: '800 zł',
    note: 'Najczęściej wybierany.',
    featured: true,
    items: [
      'Do 6 godzin reportażu',
      'Zdjęcia grupowe i portretowe solenizanta, przebieg imprezy',
      'Minimum 200 obrobionych zdjęć',
      'Galeria do pobrania',
      'Krótka rolka',
      '10 zdjęć oddanych w ciągu 48 h jako zajawka',
      'Czas realizacji do 30 dni',
    ],
  },
  {
    name: 'Pakiet Premium',
    price: '1200 zł',
    note: 'Dla wymagających.',
    featured: false,
    items: [
      'Do 8 godzin reportażu',
      'Minimum 300 obrobionych zdjęć',
      'Galeria online do pobrania',
      '20 zdjęć oddanych w ciągu 48 h jako zajawka',
      'Teledysk',
      'Czas realizacji do 30 dni',
    ],
  },
];

const extras = [
  ['Dodatkowa opłata powyżej 50 km od Radomska', '1 zł/km'],
  ['Dodatkowa godzina reportażu', '100 zł'],
  ['Krótka rolka typu reels', '100 zł'],
  ['Teledysk z imprezy', '300 zł'],
];

const individualItems = [
  'Od 30 minut reportażu',
  'Kilka lokalizacji',
  'Pomoc w pozowaniu i ustawieniu pojazdu',
  'Galeria do pobrania',
  'Zdjęcia statyczne — z zewnątrz i wewnątrz',
  'Czas realizacji do 14 dni',
  'Możliwość realizacji priorytetowej',
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
            <h2>Cześć, tu <em>lensbylna</em></h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="about-text">
              Fotografuję to, co dzieje się naprawdę — bez ustawiania na siłę, bez sztucznych
              kadrów. Od zadymionych torów driftowych, przez światła sceny, po parkiet na
              osiemnastce. Pracuję reportażowo: jestem tam, gdzie dzieje się emocja, i oddaję
              ją w kadrze tak, jak wyglądała naprawdę.
            </p>
            <div className="about-stats">
              <div><strong>{photos.length}+</strong><span>zdjęć w portfolio</span></div>
              <div><strong>17</strong><span>zrealizowanych wydarzeń</span></div>
              <div><strong>3</strong><span>specjalizacje</span></div>
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
          </Reveal>
          <div className="cat-grid">
            {categories.map((cat, i) => {
              const items = byCategory(cat.slug);
              const cover = items[Math.min(2, items.length - 1)];
              return (
                <Reveal key={cat.slug} delay={i * 120}>
                  <Link to={`/galeria/${cat.slug}`} className="cat-card">
                    <div className="cat-img">
                      <img src={full(cover)} alt={cat.title} loading="lazy" />
                    </div>
                    <div className="cat-body">
                      <h3>{cat.title}</h3>
                      <p>{cat.tagline}</p>
                      <span className="cat-link">
                        Zobacz galerię <i>({items.length} zdjęć)</i> →
                      </span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------- CENNIK 18 ---------- */}
      <section className="pricing" id="cennik">
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow">Cennik osiemnastkowy 2026</p>
            <h2>Jaki rodzaj reportażu <em>Cię interesuje?</em></h2>
          </Reveal>
          <div className="price-grid">
            {packages.map((pkg, i) => (
              <Reveal key={pkg.name} delay={i * 120}>
                <div className={`price-card ${pkg.featured ? 'featured' : ''}`}>
                  {pkg.featured && <div className="price-badge">Najczęściej wybierany</div>}
                  <p className="price-note">{pkg.note}</p>
                  <h3>{pkg.name}</h3>
                  <div className="price-amount">{pkg.price}</div>
                  <ul>
                    {pkg.items.map(it => <li key={it}>{it}</li>)}
                  </ul>
                  <a className="btn ghost" href="#kontakt">Zarezerwuj termin</a>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="price-extras">
              <h4>Opłaty dodatkowe</h4>
              <ul>
                {extras.map(([label, price]) => (
                  <li key={label}>
                    <span>{label}</span>
                    <i />
                    <strong>{price}</strong>
                  </li>
                ))}
              </ul>
              <p className="price-fine">* Rezerwacja terminu następuje po wpłacie zadatku w wysokości 100 zł.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- CENNIK INDYWIDUALNY ---------- */}
      <section className="individual">
        <div className="container indiv-grid">
          <Reveal>
            <p className="eyebrow">Cennik indywidualny 2026</p>
            <h2>Elastyczna oferta <em>reportażu</em></h2>
            <p className="indiv-text">
              Z powodu różnych czynników wpływających na sesje, reportaż indywidualny
              wyceniany jest po ustaleniu szczegółów jego wykonania z fotografem.
            </p>
            <div className="indiv-price">od <strong>50 zł</strong></div>
          </Reveal>
          <Reveal delay={140}>
            <h4 className="indiv-listhead">W ramach sesji</h4>
            <ul className="indiv-list">
              {individualItems.map(it => <li key={it}>{it}</li>)}
            </ul>
            <p className="price-fine">
              Dodatkowa opłata powyżej 50 km od Radomska — 1 zł/km.<br />
              * Rezerwacja terminu następuje po wpłacie zadatku w wysokości 50 zł.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------- KONTAKT ---------- */}
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
    </main>
  );
}
