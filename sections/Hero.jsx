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

const badges = [
  { value: '+500', label: 'Pedidos' },
  { value: 'HD', label: 'Estampa' },
  { value: '3D', label: 'Designer' },
]

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #2a0a4e 0%, #180a30 35%, #0d0d1a 65%, #0a0a0f 100%)',
      }}
    >
      {/* Canvas: estrelas + cometas realistas */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <SpaceBackground />
      </div>

      {/* Noise texture for depth */}
      <div className="noise-overlay z-0" />

      {/* Purple nebula blobs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-700/18 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-600/12 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]
                        bg-purple-800/10 rounded-full blur-[100px]" />
        <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-purple-900/18 rounded-full blur-[120px]" />
        {/* Accent bottom-left */}
        <div className="absolute bottom-0 left-0 w-[400px] h-[200px] bg-indigo-900/12 rounded-full blur-[80px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 w-full pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">

          {/* Text Content — LEFT */}
          <div className="order-1">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-purple-900/30 border border-purple-500/30
                         rounded-full px-4 py-2 mb-6"
            >
              <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
              <span className="text-purple-300 text-sm font-medium tracking-wide">Editor 3D Disponível</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="font-display font-black text-5xl md:text-6xl lg:text-7xl leading-tight mb-6 uppercase tracking-tight"
            >
              <span className="text-white">Crie sua</span>
              <br />
              <span className="text-purple-400 glow-text">camisa</span>
              <br />
              <span className="text-white">personalizada</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-gray-400 text-lg md:text-xl leading-relaxed mb-8 max-w-lg"
            >
              Personalize camisas com nosso{' '}
              <span className="text-purple-300">designer 3D interativo</span> e peça direto pelo WhatsApp. Simples, rápido e sem cadastro.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/personalizar">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn-primary text-base px-8 py-4 inline-flex items-center gap-2"
                >
                  <span>ABRIR DESIGNER 3D</span>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </motion.div>
              </Link>

              <Link href="/produtos">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn-outline text-base px-8 py-4 inline-block"
                >
                  Ver Produtos
                </motion.div>
              </Link>
            </motion.div>

            {/* Metric badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-3 mt-10"
            >
              {badges.map((b) => (
                <div
                  key={b.label}
                  className="flex flex-col items-center px-5 py-3 rounded-2xl"
                  style={{
                    border: '1px solid rgba(168,85,247,0.25)',
                    background: 'rgba(15,7,36,0.7)',
                    backdropFilter: 'blur(12px)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.3), 0 1px 0 rgba(168,85,247,0.15) inset',
                  }}
                >
                  <p className="text-2xl font-black font-display" style={{ color: '#c084fc' }}>{b.value}</p>
                  <p className="text-xs mt-0.5 tracking-widest uppercase" style={{ color: '#6b7280' }}>{b.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* 3D Shirt Viewer — RIGHT */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, type: 'spring' }}
            className="order-2 h-[340px] md:h-[520px] relative"
          >
            {/* Glow behind the model */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-72 h-72 bg-purple-600/30 rounded-full blur-3xl animate-pulse" />
            </div>

            <ShirtViewer />

            {/* Floating badge — bottom right */}
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute bottom-10 right-0 md:right-4 card-glass rounded-2xl p-4 text-center"
            >
              <p className="text-purple-400 font-bold text-2xl">3D</p>
              <p className="text-gray-400 text-xs mt-1 uppercase tracking-wider">Designer</p>
            </motion.div>

            {/* Floating badge — top left */}
            <motion.div
              animate={{ y: [5, -5, 5] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute top-10 left-0 md:left-4 card-glass rounded-2xl p-4"
            >
              {/* Comet mini SVG */}
              <div className="flex items-center gap-1.5 mb-0.5">
                <svg width="14" height="14" viewBox="0 0 28 28" fill="none">
                  <circle cx="20" cy="8" r="5" fill="#a855f7" />
                  <line x1="17" y1="11" x2="2" y2="26" stroke="url(#cbadge)" strokeWidth="2.5" strokeLinecap="round"/>
                  <defs>
                    <linearGradient id="cbadge" x1="17" y1="11" x2="2" y2="26" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#a855f7"/><stop offset="1" stopColor="#a855f7" stopOpacity="0"/>
                    </linearGradient>
                  </defs>
                </svg>
                <p className="text-sm font-medium text-white">Cometa</p>
              </div>
              <p className="text-gray-500 text-xs uppercase tracking-wider">Personalização</p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ── Bottom gradient fade into Ticker ── */}
      <div
        className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none"
        style={{ height: '140px', background: 'linear-gradient(to bottom, transparent 0%, #110820 100%)' }}
      />

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <p className="text-gray-600 text-xs uppercase tracking-widest">Role para baixo</p>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-0.5 h-8 bg-gradient-to-b from-purple-500 to-transparent rounded-full"
        />
      </motion.div>
    </section>
  )
}
