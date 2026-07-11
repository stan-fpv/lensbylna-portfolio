import { useState } from 'react';
import {
  packageTiers,
  packageExtras,
  packageFine,
  individual,
  type PricingKind,
} from '../lib/photos';
import './pricing-panel.css';

export default function PricingPanel({ kind }: { kind: PricingKind }) {
  if (kind === 'none') return null;
  if (kind === 'individual') return <IndividualPanel />;
  return <PackagesPanel />;
}

function PackagesPanel() {
  const [open, setOpen] = useState(() => packageTiers.findIndex(t => t.featured));
  return (
    <aside className="pp">
      <p className="eyebrow">Cennik</p>
      <h3 className="pp-title">Pakiety reportażu</h3>
      <p className="pp-lead">Wybierz zakres, a resztą zajmę się ja. Ceny pakietów imprezowych i osiemnastkowych.</p>

      <div className="pp-tiers">
        {packageTiers.map((t, i) => {
          const isOpen = open === i;
          return (
            <div key={t.name} className={`pp-tier ${t.featured ? 'featured' : ''} ${isOpen ? 'open' : ''}`}>
              <button className="pp-tier-head" onClick={() => setOpen(isOpen ? -1 : i)} aria-expanded={isOpen}>
                <span className="pp-tier-name">
                  {t.name}
                  {t.featured && <em>Najczęściej wybierany</em>}
                </span>
                <span className="pp-tier-price">{t.price}</span>
                <span className={`pp-chevron ${isOpen ? 'up' : ''}`}>⌄</span>
              </button>
              <div className="pp-tier-body" style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}>
                <ul>
                  {t.items.map(it => <li key={it}>{it}</li>)}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      <div className="pp-extras">
        <h4>Opłaty dodatkowe</h4>
        <ul>
          {packageExtras.map(([label, price]) => (
            <li key={label}>
              <span>{label}</span>
              <i />
              <strong>{price}</strong>
            </li>
          ))}
        </ul>
      </div>

      <p className="pp-fine">{packageFine}</p>
      <a className="btn pp-cta" href="/#kontakt">Zarezerwuj termin</a>
    </aside>
  );
}

function IndividualPanel() {
  return (
    <aside className="pp">
      <p className="eyebrow">Cennik</p>
      <h3 className="pp-title">Sesja indywidualna</h3>
      <p className="pp-lead">Elastyczna oferta — zakres i wycenę ustalamy wspólnie pod konkretną sesję.</p>

      <div className="pp-from">
        od <strong>{individual.from}</strong>
      </div>

      <ul className="pp-list">
        {individual.items.map(it => <li key={it}>{it}</li>)}
      </ul>

      <div className="pp-extras">
        <h4>Opłaty dodatkowe</h4>
        <ul>
          {individual.extras.map(([label, price]) => (
            <li key={label}>
              <span>{label}</span>
              <i />
              <strong>{price}</strong>
            </li>
          ))}
        </ul>
      </div>

      <p className="pp-fine">{individual.fine}</p>
      <a className="btn pp-cta" href="/#kontakt">Ustal szczegóły</a>
    </aside>
  );
}
