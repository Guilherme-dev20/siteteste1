import Head from 'next/head'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import FloatingButtons from '../components/FloatingButtons'
import ThemeCard from '../components/ThemeCard'
import ProductCard from '../components/ProductCard'
import { themes } from '../data/themes'
import { products } from '../data/products'

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
}

export default function Temas() {
  const [activeTheme, setActiveTheme] = useState(null)

  const themeProducts = activeTheme
    ? products.filter((p) => p.theme === activeTheme.name)
    : []

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="nebula-bg min-h-screen"
    >
      <Head>
        <title>Temas - Cometa Personalização</title>
      </Head>

      <Navbar />

      <main className="pt-28 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="section-title"
          >
            Explore por Temas
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="section-subtitle"
          >
            Escolha seu universo favorito e encontre produtos únicos
          </motion.p>
        </div>

        {/* Themes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-16">
          {themes.map((theme, i) => (
            <ThemeCard
              key={theme.id}
              theme={theme}
              index={i}
              isActive={activeTheme?.id === theme.id}
              onClick={() => setActiveTheme(activeTheme?.id === theme.id ? null : theme)}
            />
          ))}
        </div>

        {/* Products by Theme */}
        {activeTheme && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div
                className="w-1 h-8 rounded-full"
                style={{ backgroundColor: activeTheme.color }}
              />
              <h2 className="text-2xl font-bold text-white font-display">
                {activeTheme.icon} Produtos: {activeTheme.name}
              </h2>
            </div>

            {themeProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {themeProducts.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
            ) : (
              <div className="card-glass rounded-2xl p-12 text-center">
                <p className="text-gray-400 text-lg">
                  Em breve teremos produtos para o tema <strong className="text-white">{activeTheme.name}</strong>!
                </p>
                <p className="text-gray-500 mt-2 text-sm">
                  Entre em contato pelo WhatsApp para encomendar.
                </p>
              </div>
            )}
          </motion.div>
        )}
      </main>

      <Footer />
      <FloatingButtons />
    </motion.div>
  )
}
