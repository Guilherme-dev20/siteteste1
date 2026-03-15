import Link from 'next/link'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'

const SpaceBackground = dynamic(() => import('../components/3d/SpaceBackground'), { ssr: false })

const ShirtViewer = dynamic(() => import('../components/3d/ShirtViewer'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
    </div>
  ),
})

// Trust signals — address the main conversion blockers
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
      <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    text: 'Pedido em 5 min',
  },
  {
    icon: (
      <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.127.555 4.122 1.524 5.855L0 24l6.335-1.498C8.05 23.447 9.99 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818c-1.898 0-3.667-.514-5.177-1.409l-.371-.22-3.76.889.902-3.666-.242-.382A9.787 9.787 0 012.182 12C2.182 6.58 6.58 2.182 12 2.182S21.818 6.58 21.818 12 17.42 21.818 12 21.818z" />
      </svg>
    ),
    text: 'Refazemos se precisar',
    color: '#34d399',
  },
  {
    icon: (
      <svg width="14" height="14" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ),
    text: '4.9 · +500 pedidos',
    color: '#facc15',
  },
]

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #2a0a4e 0%, #180a30 35%, #0d0d1a 65%, #0b0415 100%)',
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
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-700/18 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-600/12 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]
                        bg-purple-800/10 rounded-full blur-[100px]" />
        <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-purple-900/18 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[200px] bg-indigo-900/12 rounded-full blur-[80px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 w-full pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">

          {/* ── Texto — ESQUERDA ── */}
          <div className="order-1">

            {/* Social proof badge — acima do título */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="inline-flex items-center gap-2.5 mb-6"
              style={{
                background: 'rgba(250,204,21,0.08)',
                border: '1px solid rgba(250,204,21,0.22)',
                borderRadius: '99px',
                padding: '6px 14px',
              }}
            >
              {/* Mini avatars */}
              <div className="flex -space-x-1.5">
                {['#7c3aed','#db2777','#0891b2','#059669'].map((c, i) => (
                  <div
                    key={i}
                    className="w-5 h-5 rounded-full border-2 flex-shrink-0"
                    style={{ background: c, borderColor: '#0b0415', zIndex: 4 - i }}
                  />
                ))}
              </div>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} width="10" height="10" fill="#facc15" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span style={{ color: '#fde68a', fontSize: '12px', fontWeight: 700 }}>
                4.9 · +500 clientes satisfeitos
              </span>
            </motion.div>

            {/* Headline — reescrita para clareza de benefício */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="font-display font-black leading-tight mb-5 uppercase tracking-tight"
              style={{ fontSize: 'clamp(2.4rem, 6vw, 4.25rem)' }}
            >
              <span className="text-white">Veja sua roupa</span>
              <br />
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(90deg, #c084fc 0%, #a855f7 50%, #7c3aed 100%)', WebkitBackgroundClip: 'text' }}
              >
                personalizada
              </span>
              <br />
              <span className="text-white">em 3D antes de pedir</span>
            </motion.h1>

            {/* Sub-headline — clareza máxima, sem jargão */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{ color: '#94a3b8', fontSize: '17px', lineHeight: 1.65, marginBottom: '32px', maxWidth: '480px' }}
            >
              Escolha o produto, coloque sua arte ou texto, gire em 360° para ver como vai ficar —
              e envie o pedido{' '}
              <span style={{ color: '#e2d9f3', fontWeight: 600 }}>direto pelo WhatsApp</span>.
              Sem conta, sem formulário.
            </motion.p>

            {/* CTAs — hierarquia clara: 1 dominante + 1 secundário */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.52 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4"
            >
              {/* CTA PRIMÁRIO — único, dominante */}
              <Link href="/personalizar">
                <motion.div
                  whileHover={{ scale: 1.04, boxShadow: '0 0 40px rgba(124,58,237,0.65)' }}
                  whileTap={{ scale: 0.97 }}
                  className="relative overflow-hidden inline-flex items-center gap-3 font-black uppercase tracking-wider text-white cursor-pointer"
                  style={{
                    background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
                    padding: '16px 32px',
                    borderRadius: '16px',
                    fontSize: '15px',
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
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>
                  </svg>
                  <span>Personalizar Agora</span>
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </motion.div>
              </Link>

              {/* CTA SECUNDÁRIO — claramente menor */}
              <Link href="/produtos">
                <motion.div
                  whileHover={{ color: '#e9d5ff' }}
                  className="inline-flex items-center gap-2 font-semibold transition-colors duration-200 cursor-pointer"
                  style={{ color: '#9ca3af', fontSize: '14px' }}
                >
                  Ver catálogo
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
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

            <ShirtViewer />

            {/* Floating badge — TOP LEFT: Social proof */}
            <motion.div
              animate={{ y: [5, -5, 5] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-10 left-0 md:left-4 card-glass rounded-2xl p-3.5"
            >
              <div className="flex items-center gap-2 mb-1">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} width="11" height="11" fill="#facc15" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-white text-xs font-black">4.9</p>
              </div>
              <p className="text-gray-400 text-[10px] uppercase tracking-wider">+500 pedidos</p>
            </motion.div>

            {/* Floating badge — BOTTOM RIGHT: Gire 360° */}
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute bottom-10 right-0 md:right-4 card-glass rounded-2xl p-3.5 text-center"
            >
              <div className="flex items-center gap-1.5 justify-center mb-0.5">
                <svg width="13" height="13" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0118.8-4.3M22 12.5a10 10 0 01-18.8 4.2"/>
                </svg>
                <p className="text-purple-400 font-bold text-xs">Gire 360°</p>
              </div>
              <p className="text-gray-400 text-[10px] uppercase tracking-wider">Veja ao Vivo</p>
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
