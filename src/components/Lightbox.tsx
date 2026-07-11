import { useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { full, type Photo } from '../lib/photos';
import './lightbox.css';

type Props = {
  items: Photo[];
  index: number | null;
  onClose: () => void;
  onNavigate: (i: number) => void;
};

export default function Lightbox({ items, index, onClose, onNavigate }: Props) {
  const prev = useCallback(() => {
    if (index === null) return;
    onNavigate((index - 1 + items.length) % items.length);
  }, [index, items.length, onNavigate]);
  const next = useCallback(() => {
    if (index === null) return;
    onNavigate((index + 1) % items.length);
  }, [index, items.length, onNavigate]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [index, onClose, prev, next]);

  const photo = index !== null ? items[index] : null;

  return (
    <AnimatePresence>
      {photo && (
        <motion.div
          className="lb"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          onClick={onClose}
        >
          <button className="lb-close" aria-label="Zamknij" onClick={onClose}>×</button>
          <button className="lb-arrow lb-prev" aria-label="Poprzednie" onClick={e => { e.stopPropagation(); prev(); }}>‹</button>
          <motion.img
            key={photo.name}
            src={full(photo)}
            alt=""
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            onClick={e => e.stopPropagation()}
          />
          <button className="lb-arrow lb-next" aria-label="Następne" onClick={e => { e.stopPropagation(); next(); }}>›</button>
          <div className="lb-count">{(index ?? 0) + 1} / {items.length}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
