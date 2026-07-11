import manifest from '../manifest.json';

export const CDN = 'https://pub-14c1970cfc324fa2a058fee54a5f11f5.r2.dev';

export type Photo = {
  name: string;
  category: string;
  group: string;
  w: number;
  h: number;
};

export const photos: Photo[] = manifest as Photo[];

export const full = (p: Photo) => `${CDN}/full/${p.name}`;
export const thumb = (p: Photo) => `${CDN}/thumb/${p.name}`;

export type CategoryMeta = {
  slug: string;
  title: string;
  tagline: string;
  groups: { match: string; label: string }[];
};

export const categories: CategoryMeta[] = [
  {
    slug: 'motoryzacja',
    title: 'Motoryzacja',
    tagline: 'Drift, zloty i sesje indywidualne — emocje na torze i poza nim.',
    groups: [
      { match: 'drift', label: 'Drift' },
      { match: 'indy', label: 'Sesje indywidualne' },
      { match: 'zloty', label: 'Zloty' },
    ],
  },
  {
    slug: 'reportaze',
    title: 'Reportaże',
    tagline: 'Koncerty, teatr i wydarzenia — autentyczne chwile w naturalnym świetle.',
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
    tagline: 'Osiemnastki i urodziny — wspomnienia, do których wraca się latami.',
    groups: [
      { match: '18', label: 'Osiemnastki' },
      { match: 'szymona', label: 'Osiemnastki' },
      { match: '40', label: 'Urodziny' },
    ],
  },
];

export const byCategory = (slug: string) => photos.filter(p => p.category === slug);

export const groupLabel = (p: Photo): string => {
  const cat = categories.find(c => c.slug === p.category);
  const g = cat?.groups.find(g => p.group.startsWith(g.match));
  return g?.label ?? 'Inne';
};
