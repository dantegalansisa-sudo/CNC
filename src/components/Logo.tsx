/** CNC circular mark (from the firm's logo). `size` is the rendered width in px. */
export function Monogram({
  size = 40,
  light = false,
  className = '',
}: {
  size?: number;
  light?: boolean;
  className?: string;
}) {
  return (
    <img
      src={light ? '/images/cnc-mark-light.png' : '/images/cnc-mark.png'}
      width={size}
      height={Math.round(size * 1.017)}
      className={`monogram ${className}`}
      alt=""
      aria-hidden
      draggable={false}
    />
  );
}

export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className={`logo ${light ? 'logo--light' : ''}`} aria-label="CNC Law Firm">
      <span className="logo__marks">
        <Monogram size={40} className="logo__mark logo__mark--dark" />
        <Monogram size={40} light className="logo__mark logo__mark--light" />
      </span>
      <span className="logo__divider" />
      <span className="logo__text">
        <strong>Law Firm</strong>
        <small>Contract · Notary · Civil Legal Services</small>
      </span>
    </span>
  );
}
