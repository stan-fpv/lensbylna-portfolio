import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Reveal from '../components/Reveal';
import Logo from '../components/Logo';
import '../components/logo.css';
import lena from '../assets/lena.png';
import { photos, categories, thumb, full, type Photo } from '../lib/photos';
import './home.css';

const byName = Object.fromEntries(photos.map(p => [p.name, p]));
const P = (name: string): Photo => byName[name] ?? photos[0];

const hero = ['motoryzacja-drift-osaka-26.jpg', 'reportaze-koncerty-dzem-10.jpg', 'okolicznosciowe-szymona-18-18.jpg'].map(P);

const marquee = [
  'motoryzacja-drift-osaka-59.jpg',
  'reportaze-koncerty-dzem-16.jpg',
  'okolicznosciowe-szymona-18-19.jpg',
  'motoryzacja-indy-squad-radomsko-indywidualne-143.jpg',
  'reportaze-teatr-118.jpg',
  'motoryzacja-zloty-osaka-202-osaka-indywidualen-2-2.jpg',
  'okolicznosciowe-18-agi-18.jpg',
  'reportaze-koncerty-zespol-piersi-10.jpg',
].map(P);

const cardCover: Record<string, string> = {
  osiemnastki: 'okolicznosciowe-18-agi-15.jpg',
  motoryzacja: 'motoryzacja-zloty-osaka-202-osaka-indywidualen-19.jpg',
  reportaze: 'reportaze-teatr-116.jpg',
  okolicznosciowe: 'okolicznosciowe-40-plus-1.jpg',
};

const features = [
  {
    title: 'Personalizacja',
    desc: 'Każda sesja jest inna — kadr, światło i klimat dopasowuję do Ciebie oraz charakteru wydarzenia.',
    photo: 'reportaze-teatr-115.jpg',
  },
  {
    title: 'Detal',
    desc: 'Zwracam uwagę na szczegóły, które budują historię — od faktury lakieru po emocje na twarzy.',
    photo: 'motoryzacja-indy-squad-radomsko-indywidualne-117.jpg',
  },
  {
    title: 'Autentyczność',
    desc: 'Bez sztucznych pozów i ustawiania na siłę. Łapię chwile takimi, jakie są naprawdę.',
    photo: 'reportaze-koncerty-wiktor-dydula-10.jpg',
  },
  {
    title: 'Wyzwania',
    desc: 'Trudne światło, ruch, dym na torze — im większe wyzwanie, tym ciekawszy kadr.',
    photo: 'motoryzacja-drift-osaka-54.jpg',
  },
];

const stats = [
  ['2100+', 'Wykonanych zdjęć'],
  ['20+', 'Zrealizowanych sesji'],
  ['6+', 'Zlotów samochodowych'],
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

          <div className="hero-gallery">
            {hero.map((p, i) => (
              <motion.figure
                key={p.name}
                className={`hero-frame hero-frame-${i + 1}`}
                initial={{ opacity: 0, y: 46 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.23, 1, 0.32, 1], delay: 0.3 + i * 0.16 }}
              >
                <img src={full(p)} alt="" fetchPriority={i === 0 ? 'high' : 'auto'} />
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- MARQUEE ---------- */}
      <section className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...marquee, ...marquee].map((p, i) => (
            <img key={i} src={thumb(p)} alt="" loading="lazy" />
          ))}
        </div>
      </section>

      {/* ---------- O MNIE ---------- */}
      <section className="about" id="o-mnie">
        <div className="container">
          <div className="about-grid">
            <Reveal className="about-photo">
              <img src={lena} alt="Lena Kropisz — fotografka" loading="lazy" />
              <span className="about-photo-badge">@lensbylna</span>
            </Reveal>
            <Reveal className="about-copy" delay={100}>
              <p className="eyebrow">O mnie</p>
              <h2>Hejka, jestem <em>Lena!</em></h2>
              <p className="about-lead">
                Nazywam się <strong>Lena Kropisz</strong> i mam 17 lat. Pochodzę z Radomska i pasjonuję
                się mediami, szczególnie fotografią. Skupiam się na rozwijaniu swoich umiejętności oraz
                budowaniu własnego stylu wizualnego. To dla mnie sposób pokazywania świata z mojej
                perspektywy. Zajmuję się fotografią okolicznościową jak i motoryzacyjną. Montuję również
                krótkie rolki z wydarzeń.
              </p>
              <p className="about-aside-q">A prywatnie?</p>
              <p className="about-text">
                Jestem uczennicą liceum ogólnokształcącego na kierunku matematyczno-fizycznym. Wiadomo,
                <strong> duuużo focę</strong>. Wszędzie chodzę ze swoim aparatem, bo <strong>ZAWSZE</strong> znajdzie
                się obraz warty uwiecznienia. Oprócz tego często maluję, rysuję i tworzę grafiki. Wieczorami
                lubię położyć się pod kocykiem z herbatką i obejrzeć ulubiony serial 🙂. Uwielbiam gry
                horrorowe i akcji.
              </p>
              <p className="about-text">
                Fotografuję to, co dzieje się naprawdę — bez ustawiania na siłę, bez sztucznych kadrów. Od
                zadymionych torów driftowych, przez światła sceny, po parkiet na osiemnastce. Pracuję
                reportażowo: jestem tam, gdzie dzieje się emocja, i oddaję ją w kadrze tak, jak wyglądała
                naprawdę.
              </p>
            </Reveal>
          </div>

          <Reveal className="about-stats">
            {stats.map(([n, label]) => (
              <div key={label}>
                <strong>{n}</strong>
                <span>{label}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ---------- QUOTE ---------- */}
      <section className="quote">
        <div className="container">
          <Reveal className="quote-inner">
            <span className="quote-mark">”</span>
            <blockquote>
              Do obiektywu trzeba podkraść się na palcach, nawet w przypadku martwej natury. Trzeba włożyć
              aksamitne rękawiczki i być czujnym. Bez przepychania i tłoczenia się: wędkarz zawczasu nie
              wzburza wody.
            </blockquote>
            <cite>— Henri Cartier-Bresson</cite>
          </Reveal>
        </div>
      </section>

      {/* ---------- STYL ---------- */}
      <section className="style" id="styl">
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow">Styl</p>
            <h2>Jak <em>fotografuję</em></h2>
            <p className="section-lead">
              Cztery rzeczy, na których zależy mi najbardziej — bez względu na to, czy to tor driftowy,
              scena koncertowa czy parkiet na osiemnastce.
            </p>
          </Reveal>
          <div className="style-grid">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={(i % 4) * 90}>
                <article className="style-card">
                  <div className="style-img">
                    <img src={full(P(f.photo))} alt={f.title} loading="lazy" />
                    <span className="style-num">0{i + 1}</span>
                  </div>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- PORTFOLIO ---------- */}
      <section className="portfolio" id="portfolio">
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow">Portfolio</p>
            <h2>Wybierz <em>kategorię</em></h2>
            <p className="section-lead">Cztery specjalizacje, każda z osobną galerią i podkategoriami.</p>
          </Reveal>
          <div className="cat-grid">
            {categories.map((cat, i) => (
              <Reveal key={cat.slug} delay={(i % 2) * 120}>
                <Link to={`/galeria/${cat.slug}`} className="cat-card">
                  <div className="cat-img">
                    <img src={full(P(cardCover[cat.slug]))} alt={cat.title} loading="lazy" />
                    <span className="cat-price">{cat.priceHint}</span>
                  </div>
                  <div className="cat-body">
                    <h3>{cat.title}</h3>
                    <p>{cat.tagline}</p>
                    <span className="cat-link">Zobacz galerię →</span>
                  </div>
                </Link>
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
              Najszybciej złapiesz mnie na Instagramie — odpowiadam na bieżąco. Napisz, co planujesz,
              a wspólnie ustalimy szczegóły.
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
            <p>Stwórzmy razem coś wyjątkowego!</p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
