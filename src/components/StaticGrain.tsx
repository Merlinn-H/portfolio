export default function StaticGrain({ opacity = 0.09, fixed = false }: { opacity?: number; fixed?: boolean }) {
  return (
    <div
      className={`${fixed ? "fixed" : "absolute"} inset-0 pointer-events-none z-10`}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
        opacity,
      }}
    />
  );
}
