import logo from '../assets/logo.png';
import logoWhite from '../assets/logo-white.png';

type Props = {
  variant?: 'dark' | 'white';
  className?: string;
  animate?: boolean;
  onView?: boolean;
};

/**
 * Wordmark logo.
 * `animate` — reveal + shine plays on mount (used in navbar, on page load).
 * `onView`  — reveal + shine plays when an ancestor `.reveal` gains `.in`.
 */
export default function Logo({ variant = 'dark', className = '', animate = false, onView = false }: Props) {
  const cls = ['logo', animate && 'logo-animate', onView && 'logo-onview', className].filter(Boolean).join(' ');
  return (
    <span className={cls}>
      <img src={variant === 'white' ? logoWhite : logo} alt="lens by lna — fotografia" />
      {(animate || onView) && <span className="logo-shine" aria-hidden="true" />}
    </span>
  );
}
