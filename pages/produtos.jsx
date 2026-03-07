import Head from 'next/head'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import FloatingButtons from '../components/FloatingButtons'
import ProductCard from '../components/ProductCard'
import { products, categories, sortOptions } from '../data/products'

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
}

export default function Produtos() {
  const [activeCategory, setActiveCategory] = useState('Todos')
  const [activeSort, setActiveSort] = useState('Mais Populares')
  const [search, setSearch] = useState('')

  const filtered = products
    .filter((p) => {
      const matchCat = activeCategory === 'Todos' || p.category === activeCategory
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase())
      return matchCat && matchSearch
    })
    .sort((a, b) => {
      if (activeSort === 'Mais Populares') return b.popular - a.popular
      if (activeSort === 'A-Z') return a.name.localeCompare(b.name)
      return 0
    })

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="nebula-bg min-h-screen"
    >
      <Head>
        <title>Produtos - Cometa Personalização</title>
      </Head>

      <Navbar />

      <main className="pt-28 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="section-title"
          >
            Nossos Produtos
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="section-subtitle"
          >
            Encontre o produto perfeito para personalizar do seu jeito
          </motion.p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          {/* Search */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="Buscar produtos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-space-dark border border-nebula-purple/30 text-white placeholder-gray-500
                         rounded-full px-6 py-3 focus:outline-none focus:border-nebula-purple
                         focus:shadow-purple-glow transition-all duration-300"
            />
          </div>

          {/* Sort */}
          <select
            value={activeSort}
            onChange={(e) => setActiveSort(e.target.value)}
            className="bg-space-dark border border-nebula-purple/30 text-white rounded-full px-6 py-3
                       focus:outline-none focus:border-nebula-purple transition-all duration-300 cursor-pointer"
          >
            {sortOptions.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full font-medium text-sm transition-all duration-300
                ${activeCategory === cat
                  ? 'bg-nebula-purple text-white shadow-purple-glow'
                  : 'border border-nebula-purple/40 text-gray-400 hover:border-nebula-purple hover:text-white'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory + search}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {filtered.length > 0 ? (
              filtered.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))
            ) : (
              <div className="col-span-full text-center py-20 text-gray-500">
                <p className="text-xl">Nenhum produto encontrado.</p>
                <p className="mt-2 text-sm">Tente uma busca diferente.</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
      <FloatingButtons />
    </motion.div>
  )
}
