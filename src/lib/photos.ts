import manifest from '../manifest.json';

export const CDN = 'https://pub-14c1970cfc324fa2a058fee54a5f11f5.r2.dev';

export type Photo = {
  name: string;
  category: string;
  group: string;
  w: number;
  h: number;
};

const raw = manifest as Photo[];

export const full = (p: Photo) => `${CDN}/full/${p.name}`;
export const thumb = (p: Photo) => `${CDN}/thumb/${p.name}`;

/* ---------- Pricing ---------- */

export type Tier = {
  name: string;
  price: string;
  note: string;
  featured?: boolean;
  items: string[];
};

export const packageTiers: Tier[] = [
  {
    name: 'Pakiet Mini',
    price: '500 zł',
    note: 'Dla mało wymagających.',
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

export const packageExtras: [string, string][] = [
  ['Dodatkowa opłata powyżej 50 km od Radomska', '1 zł/km'],
  ['Dodatkowa godzina reportażu', '100 zł'],
  ['Krótka rolka typu reels', '100 zł'],
  ['Teledysk z imprezy', '300 zł'],
];

export const packageFine = '* Rezerwacja terminu następuje po wpłacie zadatku w wysokości 100 zł.';

export const individual = {
  from: '50 zł',
  items: [
    'Od 30 minut reportażu',
    'Kilka lokalizacji',
    'Pomoc w pozowaniu i ustawieniu pojazdu',
    'Galeria do pobrania',
    'Zdjęcia statyczne — z zewnątrz i wewnątrz',
    'Czas realizacji do 14 dni',
    'Możliwość realizacji priorytetowej',
  ],
  extras: [['Dodatkowa opłata powyżej 50 km od Radomska', '1 zł/km']] as [string, string][],
  fine: '* Rezerwacja terminu następuje po wpłacie zadatku w wysokości 50 zł. Wycena ustalana indywidualnie z fotografem.',
};

export type PricingKind = 'packages' | 'individual' | 'none';

/* ---------- Categories ---------- */

export type CategoryMeta = {
  slug: string;
  title: string;
  short: string;
  tagline: string;
  priceHint: string;
  pricing: PricingKind;
  groups: { match: string; label: string }[];
};

export const categories: CategoryMeta[] = [
  {
    slug: 'osiemnastki',
    title: 'Osiemnastki',
    short: 'Osiemnastki',
    tagline: 'Reportaż z osiemnastki — od pierwszego toastu po ostatni taniec na parkiecie.',
    priceHint: 'Pakiety od 500 zł',
    pricing: 'packages',
    groups: [
      { match: '18-agi', label: '18. Agnieszki' },
      { match: 'szymona', label: '18. Szymona' },
    ],
  },
  {
    slug: 'motoryzacja',
    title: 'Motoryzacja',
    short: 'Motoryzacja',
    tagline: 'Drift, zloty i sesje indywidualne aut — emocje na torze i klimatyczne kadry poza nim.',
    priceHint: 'Sesje od 50 zł',
    pricing: 'individual',
    groups: [
      { match: 'drift', label: 'Drift' },
      { match: 'indy', label: 'Sesje indywidualne' },
      { match: 'zloty', label: 'Zloty' },
    ],
  },
  {
    slug: 'reportaze',
    title: 'Reportaże',
    short: 'Reportaże',
    tagline: 'Koncerty, teatr i wydarzenia — autentyczne chwile uchwycone w naturalnym świetle.',
    priceHint: 'Koncerty · teatr · eventy',
    pricing: 'none',
    groups: [
      { match: 'koncerty', label: 'Koncerty' },
      { match: 'teatr', label: 'Teatr' },
      { match: 'nabor', label: 'Wydarzenia' },
      { match: 'targi', label: 'Wydarzenia' },
    ],
  },
  {
    slug: 'okolicznosciowe',
    title: 'Imprezy okolicznościowe',
    short: 'Okolicznościowe',
    tagline: 'Urodziny, jubileusze i rodzinne uroczystości — wspomnienia, do których się wraca.',
    priceHint: 'Urodziny · jubileusze',
    pricing: 'none',
    groups: [{ match: '40', label: 'Urodziny i jubileusze' }],
  },
];

// Photos are stored under original folders (motoryzacja / reportaze / okolicznosciowe).
// Osiemnastki are split out of "okolicznosciowe" based on their group.
const displayCategory = (p: Photo): string => {
  if (p.category === 'okolicznosciowe' && (p.group.startsWith('18') || p.group.startsWith('szymona'))) {
    return 'osiemnastki';
  }
  return p.category;
};

export const photos: Photo[] = raw;

export const byCategory = (slug: string) => raw.filter(p => displayCategory(p) === slug);

export const groupLabel = (p: Photo): string => {
  const cat = categories.find(c => c.slug === displayCategory(p));
  const g = cat?.groups.find(g => p.group.startsWith(g.match));
  return g?.label ?? 'Inne';
};

export const totalPhotos = raw.length;
