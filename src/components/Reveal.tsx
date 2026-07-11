import { useEffect, useRef, type ReactNode, type CSSProperties } from 'react';

type Props = {
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: CSSProperties;
};

export default function Reveal({ children, delay = 0, className = '', style }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('in');
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${className}`} style={{ ...style, transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}
