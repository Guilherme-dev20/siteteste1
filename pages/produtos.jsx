import Head from 'next/head'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import FloatingButtons from '../components/FloatingButtons'
import ProductCard from '../components/ProductCard'
import { supabase } from '../lib/supabase'
import { sortOptions } from '../data/products'

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
}

function mapProduto(p) {
  return {
    id:          p.id,
    name:        p.nome,
    category:    p.categoria || 'Produto',
    placeholder: p.imagem_url,
    badge:       p.badge || null,
    price:       p.preco ? `R$ ${Number(p.preco).toFixed(2).replace('.', ',')}` : 'Sob consulta',
    popular:     true,
    description: p.descricao,
  }
}

export default function Produtos() {
  const [allProducts, setAllProducts] = useState([])
  const [loading, setLoading]         = useState(true)
  const [activeSort, setActiveSort]   = useState('A-Z')
  const [search, setSearch]           = useState('')

  useEffect(() => {
    if (!supabase) { setLoading(false); return }
    supabase
      .from('produtos')
      .select('*')
      .eq('active', true)
      .order('nome')
      .then(({ data }) => {
        if (data) setAllProducts(data.map(mapProduto))
        setLoading(false)
      })
  }, [])

  const filtered = allProducts
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
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
          <select
            value={activeSort}
            onChange={(e) => setActiveSort(e.target.value)}
            className="bg-space-dark border border-nebula-purple/30 text-white rounded-full px-6 py-3
                       focus:outline-none focus:border-nebula-purple transition-all duration-300 cursor-pointer"
          >
            <option value="A-Z">A-Z</option>
            <option value="Z-A">Z-A</option>
          </select>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="rounded-2xl overflow-hidden animate-pulse"
                style={{ background: '#111122', border: '1px solid rgba(139,92,246,0.1)', height: 320 }} />
            ))}
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={search}
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
        )}
      </main>

      <Footer />
      <FloatingButtons />
    </motion.div>
  )
}
