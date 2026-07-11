import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './navbar.css';

const links = [
  { to: '/#portfolio', label: 'Portfolio' },
  { to: '/#o-mnie', label: 'O mnie' },
  { to: '/#cennik', label: 'Cennik' },
  { to: '/#kontakt', label: 'Kontakt' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [location]);

  const goTo = (hash: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    const id = hash.split('#')[1];
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 80);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`nav ${scrolled || open ? 'nav-solid' : ''}`}>
      <div className="container nav-inner">
        <Link to="/" className="nav-logo" onClick={() => setOpen(false)}>
          lens<span>by</span>lna
        </Link>
        <nav className={`nav-links ${open ? 'open' : ''}`}>
          {links.map((l, i) => (
            <a key={l.to} href={l.to} onClick={goTo(l.to)} style={{ transitionDelay: open ? `${i * 50}ms` : '0ms' }}>
              {l.label}
            </a>
          ))}
          <a
            className="nav-ig"
            href="https://www.instagram.com/lensbylna"
            target="_blank"
            rel="noreferrer"
            style={{ transitionDelay: open ? '200ms' : '0ms' }}
          >
            Instagram ↗
          </a>
        </nav>
        <button className={`nav-burger ${open ? 'x' : ''}`} aria-label="Menu" onClick={() => setOpen(o => !o)}>
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
