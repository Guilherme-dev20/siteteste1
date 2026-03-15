const items = [
  { text: '+500 PEDIDOS ENTREGUES EM FORTALEZA', accent: true },
  { text: 'SEM CADASTRO — PEÇA EM 5 MINUTOS' },
  { text: 'IMPRESSÃO QUE NÃO DESBOTA NEM DESCASCA' },
  { text: '4.9★ — AVALIAÇÃO REAL DOS CLIENTES', accent: true },
  { text: 'ENTREGA EM 5 A 7 DIAS ÚTEIS' },
  { text: 'VISUALIZE EM 3D ANTES DE PEDIR' },
  { text: 'REFAZEMOS SE NÃO FICAR BOM', accent: true },
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
