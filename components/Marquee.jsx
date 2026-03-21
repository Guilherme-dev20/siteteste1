const items = [
  { text: '+200 pedidos entregues' },
  { text: 'Sem cadastro — peça em 5 minutos' },
  { text: 'Peça única do jeito que você imaginou' },
  { text: '4.9★ — Avaliação dos clientes' },
  { text: 'Camisetas · Xícaras · Garrafas · Entre outros' },
  { text: 'Qualidade garantida em cada peça' },
  { text: 'Design exclusivo feito por você' },
]

const DOT = (
  <span
    aria-hidden="true"
    style={{
      display: 'inline-block',
      width: '5px',
      height: '5px',
      borderRadius: '50%',
      background: '#7c3aed',
      margin: '0 20px',
      verticalAlign: 'middle',
      flexShrink: 0,
    }}
  />
)

export default function Marquee() {
  // duplica para loop infinito seamless
  const repeated = [...items, ...items]

  return (
    <div
      style={{
        background: 'linear-gradient(90deg, #0d0520 0%, #0a0418 50%, #0d0520 100%)',
        borderTop:    '1px solid rgba(124,58,237,0.18)',
        borderBottom: '1px solid rgba(124,58,237,0.18)',
        padding: '13px 0',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* fade esquerda */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', top: 0, left: 0, bottom: 0,
          width: '80px', zIndex: 2, pointerEvents: 'none',
          background: 'linear-gradient(to right, #0d0520, transparent)',
        }}
      />
      {/* fade direita */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', top: 0, right: 0, bottom: 0,
          width: '80px', zIndex: 2, pointerEvents: 'none',
          background: 'linear-gradient(to left, #0d0520, transparent)',
        }}
      />

      <div className="ticker-track" style={{ gap: 0 }}>
        {repeated.map((item, i) => (
          <span
            key={i}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              whiteSpace: 'nowrap',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: i % 2 === 0 ? '#a78bfa' : '#e2d9f3',
            }}
          >
            {DOT}
            {item.text}
          </span>
        ))}
      </div>
    </div>
  )
}
