export default function GrainOverlay() {
  return (
    <>
      {/* SVG filter invisível — define o ruído */}
      <svg style={{ position: 'fixed', width: 0, height: 0, pointerEvents: 'none' }} aria-hidden="true">
        <defs>
          <filter id="grain-filter" x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              stitchTiles="stitch"
              result="noise"
            />
            <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise" />
            <feBlend in="SourceGraphic" in2="grayNoise" mode="overlay" result="blended" />
            <feComposite in="blended" in2="SourceGraphic" operator="in" />
          </filter>
        </defs>
      </svg>

      {/* camada grain */}
      <div className="grain-overlay" aria-hidden="true" />

      <style>{`
        .grain-overlay {
          position: fixed;
          inset: -200%;          /* maior que a tela para cobrir ao animar */
          width: 400%;
          height: 400%;
          z-index: 9990;
          pointer-events: none;
          opacity: 0.13;
          mix-blend-mode: screen;
          will-change: transform;
          animation: grain-move 8s linear infinite;

          /* textura gerada via SVG data-uri — sem request externo */
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
          background-size: 140px 140px;
          background-repeat: repeat;
        }

        @keyframes grain-move {
          0%   { transform: translate(0%,    0%);   }
          25%  { transform: translate(-5%,  -10%);  }
          50%  { transform: translate(-15%,  5%);   }
          75%  { transform: translate(7%,   -8%);   }
          100% { transform: translate(0%,    0%);   }
        }

        /* versão mais sutil em motion-reduce */
        @media (prefers-reduced-motion: reduce) {
          .grain-overlay {
            animation: none;
            opacity: 0.025;
          }
        }
      `}</style>
    </>
  )
}
