import Head from 'next/head'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import Navbar from '../components/Navbar'
import FloatingButtons from '../components/FloatingButtons'

const ShirtConfigurator = dynamic(
  () => import('../components/3d/ShirtConfigurator'),
  {
    ssr: false,
    loading: () => (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="w-14 h-14 border-4 border-nebula-purple border-t-transparent
                          rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400 text-sm">Carregando editor 3D...</p>
        </div>
      </div>
    ),
  }
)

export default function Personalizar() {
  return (
    <div className="nebula-bg flex flex-col" style={{ height: '100dvh' }}>
      <Head>
        <title>Personalizar - Cometa Personalização</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </Head>

      {/* Navbar compacta */}
      <Navbar />

      {/* Editor ocupa o restante da tela */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="flex-1 flex flex-col overflow-hidden pt-20"
      >
        {/* Desktop: max-width container com padding; Mobile: full-bleed */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden
                        lg:max-w-7xl lg:mx-auto lg:w-full lg:px-6 lg:py-6 lg:gap-4">
          <ShirtConfigurator />
        </div>
      </motion.main>

      <FloatingButtons />
    </div>
  )
}
