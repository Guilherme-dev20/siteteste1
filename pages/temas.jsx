import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import FloatingButtons from '../components/FloatingButtons'
import { themes as localThemes } from '../data/themes'
import { supabase } from '../lib/supabase'

function mapTema(t) {
  return {
    id:          t.id,          // mantém o id original do Supabase
    name:        t.nome,
    slug:        t.slug,
    icon:        t.icone || '🎨',
    color:       t.cor || '#8B5CF6',
    description: t.descricao || '',
    cover:       t.cover_url || `https://picsum.photos/seed/${t.slug}/600/400`,
    product_ids: t.product_ids || [],
  }
}

function mapProduto(p) {
  return {
    id:        p.id,
    name:      p.nome,
    category:  p.categoria || 'Produto',
    image:     p.imagem_url,
    price:     p.preco ? `R$ ${Number(p.preco).toFixed(2).replace('.', ',')}` : 'Sob consulta',
    badge:     p.badge || null,
    description: p.descricao || '',
  }
}

const TIPO_LABEL = {
  camiseta: 'Camiseta',
  caneca:   'Caneca',
  xicara:   'Xícara',
}

export default function Temas() {
  const router = useRouter()
  const [themes, setThemes]           = useState(localThemes)
  const [activeTheme, setActiveTheme] = useState(null)
  const [products, setProducts]       = useState([])
  const [loadingProducts, setLoadingProducts] = useState(false)
  const [filterTipo, setFilterTipo]   = useState('todos')

  // Carrega temas do Supabase
  useEffect(() => {
    if (!supabase) return
    supabase
      .from('temas')
      .select('*')
      .eq('ativo', true)
      .order('ordem')
      .then(({ data }) => {
        if (data?.length) setThemes(data.map(mapTema))
      })
  }, [])

  // Abre tema via query string (?tema=slug)
  useEffect(() => {
    if (!router.isReady || !themes.length) return
    const slug = router.query.tema
    if (slug) {
      const found = themes.find((t) => t.slug === slug)
      if (found) setActiveTheme(found)
    }
  }, [router.isReady, router.query.tema, themes])

  // Busca produtos ao selecionar tema
  useEffect(() => {
    if (!activeTheme || !supabase) {
      setProducts([])
      return
    }
    setLoadingProducts(true)
    setFilterTipo('todos')

    const ids = activeTheme.product_ids
    if (!ids || ids.length === 0) {
      setProducts([])
      setLoadingProducts(false)
      return
    }

    supabase
      .from('produtos')
      .select('*')
      .in('id', ids)
      .then(({ data }) => {
        setProducts(data ? data.map(mapProduto) : [])
        setLoadingProducts(false)
      })
  }, [activeTheme])

  const tipos = ['todos', ...new Set(products.map((p) => p.category?.toLowerCase()).filter(Boolean))]
  const filtered = filterTipo === 'todos'
    ? products
    : products.filter((p) => p.category?.toLowerCase() === filterTipo)

  function selectTheme(theme) {
    if (activeTheme?.id === theme.id) {
      setActiveTheme(null)
      router.replace('/temas', undefined, { shallow: true })
    } else {
      setActiveTheme(theme)
      router.replace(`/temas?tema=${theme.slug}`, undefined, { shallow: true })
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="nebula-bg min-h-screen"
    >
      <Head>
        <title>Temas - Cometa Personalização</title>
      </Head>

      <Navbar />

      <main className="pt-28 pb-20 px-4 md:px-8 max-w-7xl mx-auto">

        {/* Título */}
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
            Escolha um tema e veja os produtos disponíveis para personalizar
          </motion.p>
        </div>

        {/* Grid de temas */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-16">
          {themes.map((theme) => {
            const isActive = activeTheme?.id === theme.id
            return (
              <motion.button
                key={theme.id}
                onClick={() => selectTheme(theme)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="relative overflow-hidden rounded-2xl text-left"
                style={{
                  height: '160px',
                  border: isActive ? `2px solid ${theme.color}` : `1px solid ${theme.color}30`,
                  outline: 'none',
                }}
              >
                {/* Imagem */}
                <img
                  src={theme.cover}
                  alt={theme.name}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: isActive
                      ? `linear-gradient(to top, ${theme.color}cc 0%, ${theme.color}44 60%, transparent 100%)`
                      : 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)',
                  }}
                />
                {/* Conteúdo */}
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <div className="text-2xl mb-1">{theme.icon}</div>
                  <p className="text-white text-sm font-bold leading-tight">{theme.name}</p>
                  {theme.description && (
                    <p className="text-gray-300 text-xs mt-0.5 line-clamp-1">{theme.description}</p>
                  )}
                </div>
                {/* Barra ativa */}
                {isActive && (
                  <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl" style={{ background: theme.color }} />
                )}
              </motion.button>
            )
          })}
        </div>

        {/* Produtos do tema */}
        <AnimatePresence mode="wait">
          {activeTheme && (
            <motion.div
              key={activeTheme.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {/* Header da seção */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 rounded-full" style={{ backgroundColor: activeTheme.color }} />
                <h2 className="text-2xl font-bold text-white font-display">
                  {activeTheme.icon} {activeTheme.name}
                </h2>
              </div>

              {/* Filtro por tipo */}
              {tipos.length > 1 && (
                <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-none pb-1">
                  {tipos.map((tipo) => (
                    <button
                      key={tipo}
                      onClick={() => setFilterTipo(tipo)}
                      className="whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-all"
                      style={{
                        background: filterTipo === tipo ? activeTheme.color : 'rgba(255,255,255,0.06)',
                        color: filterTipo === tipo ? '#fff' : '#9ca3af',
                        border: `1px solid ${filterTipo === tipo ? activeTheme.color : 'rgba(255,255,255,0.1)'}`,
                      }}
                    >
                      {TIPO_LABEL[tipo] || tipo.charAt(0).toUpperCase() + tipo.slice(1)}
                    </button>
                  ))}
                </div>
              )}

              {/* Lista de produtos */}
              {loadingProducts ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="rounded-2xl bg-white/5 animate-pulse" style={{ height: '240px' }} />
                  ))}
                </div>
              ) : filtered.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {filtered.map((product, i) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="card-glass rounded-2xl overflow-hidden group"
                    >
                      {/* Imagem */}
                      <div className="relative aspect-square bg-white/5">
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.name}
                            loading="lazy"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-4xl">
                            {activeTheme.icon}
                          </div>
                        )}
                        {product.badge && (
                          <span className="absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-600 text-white">
                            {product.badge}
                          </span>
                        )}
                      </div>
                      {/* Info */}
                      <div className="p-3">
                        <p className="text-white text-sm font-semibold line-clamp-1">{product.name}</p>
                        <p className="text-gray-400 text-xs mt-0.5">{product.category}</p>
                        <p className="text-purple-400 text-sm font-bold mt-1">{product.price}</p>
                        <a
                          href={`https://wa.me/5585987208308?text=Olá! Quero personalizar: ${product.name}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold text-white transition-all"
                          style={{ background: activeTheme.color }}
                        >
                          Personalizar →
                        </a>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="card-glass rounded-2xl p-12 text-center">
                  <p className="text-4xl mb-4">{activeTheme.icon}</p>
                  <p className="text-gray-400 text-lg">
                    Em breve teremos produtos para <strong className="text-white">{activeTheme.name}</strong>!
                  </p>
                  <a
                    href="https://wa.me/5585987208308?text=Olá! Gostaria de encomendar um produto personalizado."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-white"
                    style={{ background: '#25D366' }}
                  >
                    Encomendar pelo WhatsApp
                  </a>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

      </main>

      <Footer />
      <FloatingButtons />
    </motion.div>
  )
}
