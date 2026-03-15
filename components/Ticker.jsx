const items = [
  'CAMISA PERSONALIZADA',
  'MANGA LONGA',
  'PEDIDO VIA WHATSAPP',
  'QUALIDADE PREMIUM',
  'ENTREGA RÁPIDA',
  'DESIGNER 3D',
  'ESTAMPA HD',
  'SEM CADASTRO',
]

const doubled = [...items, ...items]

export default function Ticker() {
  return (
    <div
      className="ticker-wrap py-4"
      style={{
        background: 'linear-gradient(to right, #0f0720, #110820, #0f0720)',
        borderTop: '1px solid rgba(168,85,247,0.12)',
        borderBottom: '1px solid rgba(168,85,247,0.12)',
        boxShadow: '0 0 40px rgba(109,40,217,0.08) inset',
      }}
    >
      <div className="ticker-track">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-4 mx-8"
            style={{ color: '#9d84c8', fontSize: '11px', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase' }}
          >
            {/* Separador comet-star */}
            <svg width="5" height="5" viewBox="0 0 6 6" fill="none" aria-hidden="true">
              <circle cx="3" cy="3" r="2.5" fill="rgba(168,85,247,0.7)" />
            </svg>
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
