import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import { categories } from '../lib/photos';
import './logo.css';
import './navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setDropOpen(false);
  }, [location]);

  const scrollTo = (id: string) => {
    setOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 80);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const anchor = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    scrollTo(id);
  };

  return (
    <header className={`nav ${scrolled || open ? 'nav-solid' : ''}`}>
      <div className="container nav-inner">
        <Link to="/" className="nav-logo" onClick={() => setOpen(false)} aria-label="lens by lna — strona główna">
          <Logo animate />
        </Link>

        <nav className={`nav-links ${open ? 'open' : ''}`}>
          <div className={`nav-drop ${dropOpen ? 'open' : ''}`}>
            <button className="nav-drop-trigger" onClick={() => setDropOpen(!dropOpen)} aria-expanded={dropOpen}>
              Portfolio <span className="nav-caret">⌄</span>
            </button>
            <div className="nav-drop-menu">
              {categories.map(c => (
                <Link key={c.slug} to={`/galeria/${c.slug}`} onClick={() => setOpen(false)}>
                  {c.title}
                  <em>{c.priceHint}</em>
                </Link>
              ))}
            </div>
          </div>
          <a href="/#o-mnie" onClick={anchor('o-mnie')}>O mnie</a>
          <a href="/#styl" onClick={anchor('styl')}>Styl</a>
          <a href="/#kontakt" onClick={anchor('kontakt')}>Kontakt</a>
          <a className="nav-ig" href="https://www.instagram.com/lensbylna" target="_blank" rel="noreferrer">
            Instagram ↗
          </a>
        </nav>

        <button className={`nav-burger ${open ? 'x' : ''}`} aria-label="Menu" onClick={() => setOpen(!open)}>
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
