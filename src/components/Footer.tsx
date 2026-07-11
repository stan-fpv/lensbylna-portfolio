import { Link } from 'react-router-dom';
import Logo from './Logo';
import { categories } from '../lib/photos';
import './logo.css';
import './footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Logo variant="white" className="footer-logo" />
          <p>
            Fotografia reportażowa i eventowa. Motoryzacja, koncerty, teatr
            i imprezy okolicznościowe — Radomsko i cała Polska.
          </p>
        </div>
        <div className="footer-col">
          <h4>Portfolio</h4>
          {categories.map(c => (
            <Link key={c.slug} to={`/galeria/${c.slug}`}>
              {c.title}
            </Link>
          ))}
        </div>
        <div className="footer-col">
          <h4>Nawigacja</h4>
          <a href="/#o-mnie">O mnie</a>
          <a href="/#cennik">Cennik</a>
          <a href="/#kontakt">Kontakt</a>
        </div>
        <div className="footer-col">
          <h4>Kontakt</h4>
          <a href="https://www.instagram.com/lensbylna" target="_blank" rel="noreferrer">
            Instagram — @lensbylna
          </a>
          <a href="https://www.facebook.com/share/1SQKuN8CZ9/" target="_blank" rel="noreferrer">
            Facebook — lensbylna
          </a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} lensbylna. Wszelkie prawa zastrzeżone.</span>
        <span>Radomsko, woj. łódzkie</span>
      </div>
    </footer>
  );
}
