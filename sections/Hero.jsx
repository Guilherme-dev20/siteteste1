import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'

const SpaceBackground = dynamic(() => import('../components/3d/SpaceBackground'), { ssr: false })
const ShirtViewer = dynamic(() => import('../components/3d/ShirtViewer'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-nebula-purple border-t-transparent rounded-full animate-spin" />
    </div>
  ),
})

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Space Background Canvas */}
      <div className="absolute inset-0 z-0">
        <SpaceBackground />
      </div>

      {/* Nebula Blobs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-nebula-purple/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-nebula-violet/6 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]
                        bg-nebula-indigo/4 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 w-full pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Text Content */}
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-nebula-purple/10 border border-nebula-purple/30
                         rounded-full px-4 py-2 mb-6"
            >
              <span className="w-2 h-2 bg-nebula-purple rounded-full animate-pulse" />
              <span className="text-nebula-purple text-sm font-medium">Editor 3D Disponível</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="font-display font-black text-5xl md:text-6xl lg:text-7xl leading-tight mb-6"
            >
              <span className="text-white">Crie sua</span>
              <br />
              <span className="text-gradient glow-text">camisa</span>
              <br />
              <span className="text-white">personalizada</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-gray-400 text-lg md:text-xl leading-relaxed mb-8 max-w-lg"
            >
              Personalize camisas, copos, canecas e muito mais com nosso
              <span className="text-nebula-light"> editor 3D interativo.</span> Do universo para você.
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
                  <span>PERSONALIZAR AGORA</span>
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

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex gap-8 mt-12"
            >
              {[
                { value: '500+', label: 'Pedidos' },
                { value: '98%', label: 'Satisfação' },
                { value: '50+', label: 'Modelos' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold font-display text-gradient">{stat.value}</p>
                  <p className="text-gray-500 text-sm">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* 3D Shirt Viewer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, type: 'spring' }}
            className="order-1 lg:order-2 h-[400px] md:h-[500px] relative"
          >
            {/* Glow behind the model */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-64 h-64 bg-nebula-purple/15 rounded-full blur-3xl animate-pulse-slow" />
            </div>

            <ShirtViewer />

            {/* Floating badge */}
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute bottom-10 right-0 md:right-4 card-glass rounded-2xl p-4 text-center"
            >
              <p className="text-nebula-purple font-bold text-2xl">3D</p>
              <p className="text-gray-400 text-xs mt-1">Editor</p>
            </motion.div>

            <motion.div
              animate={{ y: [5, -5, 5] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute top-10 left-0 md:left-4 card-glass rounded-2xl p-4"
            >
              <p className="text-sm font-medium text-white">☄️ Cometa</p>
              <p className="text-gray-500 text-xs">Personalização</p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <p className="text-gray-600 text-xs">Role para baixo</p>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-0.5 h-8 bg-gradient-to-b from-nebula-purple to-transparent rounded-full"
        />
      </motion.div>
    </section>
  )
}
