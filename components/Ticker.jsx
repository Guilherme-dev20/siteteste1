const items = [
  { text: 'MAIS DE 500 PEDIDOS ENTREGUES', accent: true },
  { text: 'SEM CADASTRO NECESSÁRIO' },
  { text: 'ESTAMPA HD — NÃO DESBOTA' },
  { text: '4.9★ DE AVALIAÇÃO MÉDIA', accent: true },
  { text: 'PEDIDO VIA WHATSAPP EM 5 MIN' },
  { text: 'MOCKUP 3D GRÁTIS' },
  { text: 'SATISFAÇÃO GARANTIDA', accent: true },
  { text: 'CAMISAS · CANECAS · COPOS · CERÂMICA' },
]

const doubled = [...items, ...items]

function Dot({ accent }) {
  return (
    <svg width="5" height="5" viewBox="0 0 5 5" fill="none" aria-hidden="true">
      <circle cx="2.5" cy="2.5" r="2.5" fill={accent ? '#a855f7' : 'rgba(168,85,247,0.4)'} />
    </svg>
  )
}

export default function Ticker() {
  return (
    <div
      className="ticker-wrap py-3.5"
      style={{
        background: 'linear-gradient(to right, #0e0720, #110820, #0e0720)',
        borderTop: '1px solid rgba(168,85,247,0.1)',
        borderBottom: '1px solid rgba(168,85,247,0.1)',
      }}
    >
      <div className="ticker-track">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-3.5 mx-6"
            style={{
              color: item.accent ? '#c4b5fd' : '#6b7280',
              fontSize: '11px',
              fontWeight: item.accent ? 700 : 600,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
            }}
          >
            <Dot accent={item.accent} />
            {item.text}
          </span>
        ))}
      </div>
    </div>
  )
}
