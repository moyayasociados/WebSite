import { Cinzel } from "next/font/google";

// Closest Google font to the Trajan-style wordmark of the logo.
const cinzel = Cinzel({ subsets: ["latin"], weight: ["600", "700"] });

// Swooshes are filled crescents (upper edge out, lower edge back) so they taper to a point like the logo.
const goldSwoosh = "M8 72 Q58 45 112 61 Q60 54 8 72 Z";
const silverSwoosh = "M20 78 Q64 59 108 67 Q64 63 20 78 Z";
// Buildings are clipped by the upper edge of the gold swoosh, so they rise out of it.
const aboveArc = "M8 72 Q58 45 112 61 L112 0 L8 0 Z";
const windowRows = [27, 34, 41, 48, 55];
const goldBars = [
  { x: 64, top: 37, width: 8, delay: "0.3s" },
  { x: 74, top: 27, width: 8, delay: "0.4s" },
  { x: 84, top: 13, width: 9, delay: "0.5s" },
];

export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-[100] grid place-items-center bg-primary px-4"
    >
      <div className="loader-content flex flex-col items-center">
        {/* Simplified logo mark: blue tower, silver building and gold bars rising from the swoosh. */}
        <svg viewBox="0 0 120 84" className="h-[8.75rem] w-[12.5rem]" aria-hidden="true">
          <defs>
            <linearGradient id="loader-gold-face" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#F7DF8A" />
              <stop offset="1" stopColor="#D2A32E" />
            </linearGradient>
            <linearGradient id="loader-blue-face" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#4B7FC9" />
              <stop offset="1" stopColor="#2A5899" />
            </linearGradient>
            <linearGradient id="loader-silver-face" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#F1F3F6" />
              <stop offset="1" stopColor="#B9C0C8" />
            </linearGradient>
            <linearGradient id="loader-gold-swoosh" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#B8891F" />
              <stop offset=".45" stopColor="#F3D46E" />
              <stop offset="1" stopColor="#C59B27" />
            </linearGradient>
            <linearGradient id="loader-silver-swoosh" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#8D96A1" />
              <stop offset=".5" stopColor="#E4E8EC" />
              <stop offset="1" stopColor="#8D96A1" />
            </linearGradient>
            <clipPath id="loader-above-arc">
              <path d={aboveArc} />
            </clipPath>
            {/* A thick stroke sweeping along each curve reveals the filled swooshes left to right. */}
            <mask id="loader-reveal-gold" maskUnits="userSpaceOnUse" x="0" y="0" width="120" height="84">
              <path className="loader-arc" d="M8 70 Q59 50 112 60" pathLength={1} fill="none" stroke="#fff" strokeWidth="12" />
            </mask>
            <mask id="loader-reveal-silver" maskUnits="userSpaceOnUse" x="0" y="0" width="120" height="84">
              <path
                className="loader-arc"
                style={{ animationDelay: "0.15s" }}
                d="M20 77 Q64 61 108 66"
                pathLength={1}
                fill="none"
                stroke="#fff"
                strokeWidth="10"
              />
            </mask>
          </defs>
          <g clipPath="url(#loader-above-arc)">
            <g className="loader-building">
              <rect x="24" y="4" width="16" height="72" fill="url(#loader-blue-face)" />
              <rect x="40" y="6" width="4" height="70" fill="#1A3D73" />
              <rect x="24" y="4" width="0.8" height="72" fill="#9BBDEB" fillOpacity=".7" />
              {[29, 33, 37].map((x) => (
                <rect key={x} x={x} y="8" width="1.2" height="68" fill="#8FB2E4" fillOpacity=".5" />
              ))}
            </g>
            <g className="loader-building" style={{ animationDelay: "0.15s" }}>
              <rect x="46" y="21" width="13" height="55" fill="url(#loader-silver-face)" />
              <rect x="59" y="23" width="3" height="53" fill="#8E97A2" />
              {windowRows.flatMap((y) =>
                [49, 54].map((x) => (
                  <rect key={`${x}-${y}`} x={x} y={y} width="2.6" height="3.6" fill="#6E7884" />
                )),
              )}
            </g>
            {goldBars.map((bar) => (
              <g key={bar.x} className="loader-building" style={{ animationDelay: bar.delay }}>
                <polygon
                  points={`${bar.x},${bar.top + 3} ${bar.x + bar.width - 2},${bar.top + 0.5} ${bar.x + bar.width - 2},76 ${bar.x},76`}
                  fill="url(#loader-gold-face)"
                />
                <polygon
                  points={`${bar.x + bar.width - 2},${bar.top + 0.5} ${bar.x + bar.width},${bar.top} ${bar.x + bar.width},76 ${bar.x + bar.width - 2},76`}
                  fill="#B8891F"
                />
              </g>
            ))}
          </g>
          <path d={goldSwoosh} fill="url(#loader-gold-swoosh)" mask="url(#loader-reveal-gold)" />
          <path d={silverSwoosh} fill="url(#loader-silver-swoosh)" mask="url(#loader-reveal-silver)" />
        </svg>
        <span
          className={`${cinzel.className} loader-wordmark mt-5 bg-gradient-to-b from-[#F7DF8A] to-[#C59B27] bg-clip-text text-[1.6rem] font-bold leading-none tracking-[0.04em] text-transparent`}
        >
          Moya y Asociados
        </span>
        {/* The logo's divider doubles as an indeterminate progress bar. */}
        <span className="loader-rule relative mt-3 h-[3px] w-full overflow-hidden rounded-full bg-[#C7CDD4]/20">
          <span className="loader-sweep absolute inset-y-0 left-0 w-2/5 rounded-full bg-gradient-to-r from-transparent via-[#F7DF8A] to-transparent shadow-[0_0_10px_rgba(243,212,110,0.8)]" />
        </span>
        <span className="loader-tagline mt-2.5 text-[0.65rem] font-medium uppercase tracking-[0.32em] text-[#A3ACB6]">
          Gestión empresarial
        </span>
        <span className="sr-only">Cargando contenido…</span>
      </div>
    </div>
  );
}
