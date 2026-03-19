import { Component } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'

class WebGLErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { failed: false } }
  static getDerivedStateFromError() { return { failed: true } }
  render() {
    if (this.state.failed) return (
      <div className="w-full h-full flex items-center justify-center opacity-30">
        <svg width="80" height="80" viewBox="0 0 100 120" fill="none">
          <rect x="10" y="5" width="80" height="110" rx="4" fill="#6d28d9" opacity="0.4"/>
          <rect x="22" y="18" width="56" height="70" rx="2" fill="#4c1d95" opacity="0.6"/>
        </svg>
      </div>
    )
    return this.props.children
  }
}

const SpaceBackground = dynamic(() => import('../components/3d/SpaceBackground'), { ssr: false })

const ShirtViewer = dynamic(() => import('../components/3d/ShirtViewer'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
    </div>
  ),
})

// Trust signals
const trustItems = [
  {
    icon: (
      <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
    text: 'Sem cadastro',
  },
  {
    icon: (
      <svg width="14" height="14" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ),
    text: '+100 pedidos',
    color: '#facc15',
  },
]

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #130626 0%, #0d0620 35%, #080810 65%, #050310 100%)',
      }}
    >
      {/* Canvas: estrelas + cometas */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <SpaceBackground />
      </div>

      {/* Noise texture */}
      <div className="noise-overlay z-0" />

      {/* Purple nebula blobs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-700/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-600/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]
                        bg-purple-800/5 rounded-full blur-[100px]" />
        <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-purple-900/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[200px] bg-indigo-900/5 rounded-full blur-[80px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 w-full pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">

          {/* ── Texto — ESQUERDA ── */}
          <div className="order-1">


            {/* Headline — reescrita para clareza de benefício */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="font-display font-black leading-tight mb-5 uppercase tracking-tight"
              style={{ fontSize: 'clamp(2.4rem, 6vw, 4.25rem)' }}
            >
              <span className="text-white">Transforme sua</span>
              <br />
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(90deg, #c084fc 0%, #a855f7 50%, #7c3aed 100%)', WebkitBackgroundClip: 'text' }}
              >
                ideia
              </span>
              {' '}
              <span className="text-white">em</span>
              <br />
              <span className="text-white">camisa única</span>
            </motion.h1>

            {/* Sub-headline — clareza máxima, sem jargão, com prazo de entrega */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{ color: '#94a3b8', fontSize: '17px', lineHeight: 1.65, marginBottom: '32px', maxWidth: '480px' }}
            >
              Monte seu design no editor 3D, baixe a imagem e peça{' '}
              <span style={{ color: '#e2d9f3', fontWeight: 600 }}>direto no WhatsApp</span>.
              {' '}Qualidade profissional,{' '}
              <span style={{ color: '#fbbf24', fontWeight: 600 }}>entrega rápida.</span>
            </motion.p>

            {/* CTAs — hierarquia clara: 1 dominante + 1 secundário */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.52 }}
              className="flex flex-col gap-3 mb-4"
            >
              {/* CTA PRIMÁRIO — único, dominante */}
              <Link href="/personalizar" className="block sm:inline-block" aria-label="Personalizar produto agora">
                <motion.div
                  whileHover={{ scale: 1.04, boxShadow: '0 0 40px rgba(124,58,237,0.65)' }}
                  whileTap={{ scale: 0.97 }}
                  className="hero-cta-primary relative overflow-hidden flex items-center justify-center gap-3 font-black uppercase tracking-wider text-white cursor-pointer sm:inline-flex"
                  style={{
                    background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
                    padding: '16px 32px',
                    borderRadius: '16px',
                    fontSize: '15px',
                    minHeight: '52px',
                    boxShadow: '0 6px 32px rgba(109,40,217,0.5), 0 1px 0 rgba(255,255,255,0.15) inset',
                  }}
                >
                  {/* Shine sweep */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.12) 50%, transparent 70%)' }}
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3, ease: 'easeInOut' }}
                  />
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>
                  </svg>
                  <span>Personalizar Agora</span>
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </motion.div>
              </Link>

              {/* CTA SECUNDÁRIO */}
              <Link href="/produtos" className="block sm:inline-block" aria-label="Ver catálogo de produtos">
                <motion.div
                  whileHover={{ color: '#e9d5ff' }}
                  className="hero-cta-secondary flex items-center justify-center gap-2 font-semibold transition-colors duration-200 cursor-pointer sm:inline-flex"
                  style={{ color: '#9ca3af', fontSize: '14px' }}
                >
                  Ver catálogo
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </motion.div>
              </Link>
            </motion.div>

            {/* Micro-copy abaixo do CTA */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65 }}
              style={{ color: '#4b5563', fontSize: '12px', marginBottom: '32px' }}
            >
              ✓ 100% grátis &nbsp;·&nbsp; ✓ Sem conta &nbsp;·&nbsp; ✓ Resultado em menos de 5 minutos
            </motion.p>

            {/* Trust bar — 4 sinais de confiança horizontais */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75 }}
              className="flex flex-wrap gap-3"
            >
              {trustItems.map((item, i) => (
                <div
                  key={i}
                  className="inline-flex items-center gap-2"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.09)',
                    borderRadius: '99px',
                    padding: '6px 12px',
                    color: item.color ?? '#9ca3af',
                    fontSize: '12px',
                    fontWeight: 600,
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <span style={{ color: item.color ?? '#a78bfa', flexShrink: 0 }}>{item.icon}</span>
                  {item.text}
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── 3D Shirt Viewer — DIREITA ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.35, type: 'spring', stiffness: 80 }}
            className="order-2 h-[340px] md:h-[520px] relative"
          >
            {/* Glow behind the model */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-72 h-72 bg-purple-600/28 rounded-full blur-3xl animate-pulse" />
            </div>

            <WebGLErrorBoundary>
              <ShirtViewer />
            </WebGLErrorBoundary>

            {/* Floating badge — TOP LEFT: Social proof */}
            <motion.div
              animate={{ y: [4, -4, 4] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-6 left-0 md:left-2 card-glass rounded-xl p-2"
            >
              <div className="flex items-center gap-1.5 mb-0.5">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} width="9" height="9" fill="#facc15" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-white text-[10px] font-black">4.9</p>
              </div>
              <p className="text-gray-400 text-[9px] uppercase tracking-wider">+100 pedidos</p>
            </motion.div>

            {/* Floating badge — BOTTOM RIGHT: Gire 360° */}
            <motion.div
              animate={{ y: [-4, 4, -4] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute bottom-6 right-0 md:right-2 card-glass rounded-xl p-2 text-center"
            >
              <div className="flex items-center gap-1 justify-center mb-0.5">
                <svg width="10" height="10" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0118.8-4.3M22 12.5a10 10 0 01-18.8 4.2"/>
                </svg>
                <p className="text-purple-400 font-bold text-[10px]">Gire 360°</p>
              </div>
              <p className="text-gray-400 text-[9px] uppercase tracking-wider">Veja ao Vivo</p>
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Bottom gradient fade into Ticker */}
      <div
        className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none"
        style={{ height: '140px', background: 'linear-gradient(to bottom, transparent 0%, #110820 100%)' }}
      />

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <p style={{ color: '#374151', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
          Ver mais
        </p>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-0.5 h-8 bg-gradient-to-b from-purple-500 to-transparent rounded-full"
        />
      </motion.div>
    </section>
  )
}
