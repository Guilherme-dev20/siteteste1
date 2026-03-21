import { useMemo } from 'react'

// PRNG seeded — gera posições fixas (sem hidratação aleatória)
function seededRand(seed) {
  let s = seed
  return () => {
    s ^= s << 13
    s ^= s >> 17
    s ^= s << 5
    return (s >>> 0) / 0xffffffff
  }
}

function generateStars(count = 220) {
  const rand = seededRand(0xdeadbeef)
  const stars = []
  for (let i = 0; i < count; i++) {
    const x       = rand() * 100
    const y       = rand() * 100
    const size    = 1 + rand()                 // 1–2px
    const opacity = 0.15 + rand() * 0.75       // 0.15–0.90
    const blink   = rand() < 0.3              // 30% piscam
    stars.push({ x, y, size, opacity, blink, id: i })
  }
  return stars
}

export default function SpaceBackgroundCSS() {
  const stars = useMemo(() => generateStars(220), [])

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute', inset: 0,
        overflow: 'hidden', pointerEvents: 'none',
      }}
    >
      {/* ── Base ── */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 50% 60%, #0b0520, #050309, #020108)',
      }} />

      {/* ── Névoa esquerda ── */}
      <div style={{
        position: 'absolute',
        top: '-10%', left: '-10%',
        width: '55%', height: '60%',
        borderRadius: '50%',
        background: 'rgba(40,20,120,0.35)',
        filter: 'blur(28px)',
      }} />

      {/* ── Névoa direita ── */}
      <div style={{
        position: 'absolute',
        top: '-5%', right: '-10%',
        width: '50%', height: '55%',
        borderRadius: '50%',
        background: 'rgba(100,20,180,0.3)',
        filter: 'blur(24px)',
      }} />

      {/* ── Névoa superior central ── */}
      <div style={{
        position: 'absolute',
        top: '-15%', left: '15%',
        width: '70%', height: '65%',
        borderRadius: '50%',
        background: 'rgba(126,34,206,0.12)',
        filter: 'blur(18px)',
      }} />

      {/* ── Névoa inferior ── */}
      <div style={{
        position: 'absolute',
        bottom: '-10%', left: '10%',
        width: '80%', height: '35%',
        borderRadius: '50%',
        background: 'rgba(80,20,200,0.22)',
        filter: 'blur(20px)',
      }} />

      {/* ── Via Láctea ── */}
      <div style={{
        position: 'absolute',
        top: '5%', left: '-20%',
        width: '140%', height: '55%',
        background: 'linear-gradient(105deg, transparent 20%, rgba(100,60,200,0.09) 50%, transparent 80%)',
        filter: 'blur(12px)',
        transform: 'rotate(-8deg)',
      }} />

      {/* ── Estrelas ── */}
      <div style={{ position: 'absolute', inset: 0 }}>
        {stars.map(({ id, x, y, size, opacity, blink }) => (
          <div
            key={id}
            style={{
              position: 'absolute',
              left: `${x}%`,
              top:  `${y}%`,
              width:  `${size}px`,
              height: `${size}px`,
              borderRadius: '50%',
              background: '#ffffff',
              opacity,
              animation: blink ? `star-blink ${2 + (id % 15) * 0.1}s ease-in-out infinite` : undefined,
            }}
          />
        ))}
      </div>

      {/* ── Gradiente escuro na borda inferior ── */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        height: '30%',
        background: 'linear-gradient(to top, rgba(2,1,8,0.9), transparent)',
      }} />

      {/* ── Vinheta nas bordas ── */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 85% 85% at 50% 50%, transparent 55%, rgba(2,1,8,0.7) 100%)',
      }} />

      <style>{`
        @keyframes star-blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.2; }
        }
      `}</style>
    </div>
  )
}
