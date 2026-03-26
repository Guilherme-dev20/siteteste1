import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import FloatingButtons from '../../components/FloatingButtons'
import { supabase } from '../../lib/supabase'

const WA_SVG = (
  <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.555 4.122 1.524 5.855L0 24l6.335-1.498C8.05 23.447 9.99 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818c-1.898 0-3.667-.514-5.177-1.409l-.371-.22-3.76.889.902-3.666-.242-.382A9.787 9.787 0 012.182 12C2.182 6.58 6.58 2.182 12 2.182S21.818 6.58 21.818 12 17.42 21.818 12 21.818z"/>
  </svg>
)

// ── Card de produto ───────────────────────────────────────────────────────────
function ProductCard({ product, themeColor, index }) {
  const price = product.preco
    ? `${Number(product.preco).toFixed(2).replace('.', ',')}`
    : null

  const handleOrder = () => {
    const text = `👋 Olá! Vi o produto *${product.nome}* e quero encomendar! 🚀`
    window.open(`https://wa.me/5585981501747?text=${encodeURIComponent(text)}`, '_blank')
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.38, delay: (index % 8) * 0.05 }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      style={{
        borderRadius: '18px', overflow: 'hidden',
        background: '#0f0f23',
        border: '1px solid rgba(139,92,246,0.16)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.5)',
        display: 'flex', flexDirection: 'column',
        transition: 'box-shadow 0.2s, border-color 0.2s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = `0 16px 48px ${themeColor}44, 0 4px 16px rgba(0,0,0,0.6)`
        e.currentTarget.style.borderColor = `${themeColor}55`
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.5)'
        e.currentTarget.style.borderColor = 'rgba(139,92,246,0.16)'
      }}
    >
      {/* Imagem */}
      <div style={{ position: 'relative', aspectRatio: '1/1', overflow: 'hidden', background: '#18103a' }}>
        {product.imagem_url ? (
          <img src={product.imagem_url} alt={product.nome} loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl"
            style={{ background: `${themeColor}22` }}>
            🎨
          </div>
        )}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'linear-gradient(to bottom, transparent 55%, rgba(10,5,28,0.6) 100%)',
        }} />
        {product.badge && (
          <span style={{
            position: 'absolute', top: '10px', left: '10px',
            background: themeColor, borderRadius: '20px',
            padding: '3px 10px', fontSize: '10px', fontWeight: 700, color: '#fff',
          }}>
            {product.badge}
          </span>
        )}
      </div>

      {/* Info */}
      <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
        <p style={{ fontSize: '13px', fontWeight: 700, color: '#e2d9ff', margin: 0, lineHeight: 1.4,
                    display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {product.nome}
        </p>

        {price && (
          <div>
            <p style={{ fontSize: '9px', fontWeight: 600, color: '#6b7280', letterSpacing: '0.1em',
                        textTransform: 'uppercase', margin: '0 0 2px' }}>
              A partir de
            </p>
            <p style={{ fontSize: '22px', fontWeight: 900, color: '#c4b5fd',
                        letterSpacing: '-0.02em', lineHeight: 1, margin: 0 }}>
              R$ {price}
            </p>
          </div>
        )}

        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={handleOrder}
          style={{ marginTop: 'auto', width: '100%', height: '42px', borderRadius: '11px', border: 'none',
                   cursor: 'pointer', background: `linear-gradient(135deg, ${themeColor}, ${themeColor}bb)`,
                   boxShadow: `0 3px 14px ${themeColor}55`,
                   display: 'flex', alignItems: 'center', justifyContent: 'center',
                   gap: '7px', color: '#fff', fontSize: '12px', fontWeight: 700 }}
        >
          {WA_SVG} Pedir no WhatsApp
        </motion.button>
      </div>
    </motion.article>
  )
}

// ── Página ────────────────────────────────────────────────────────────────────
export default function TemaDetalhe() {
  const router   = useRouter()
  const { slug } = router.query

  const [tema, setTema]         = useState(null)
  const [products, setProducts] = useState([])
  const [loading, setLoading]   = useState(true)

  useEffect(() => {
    if (!slug || !supabase) return

    supabase
      .from('temas')
      .select('*')
      .eq('slug', slug)
      .single()
      .then(async ({ data: t }) => {
        if (!t) { setLoading(false); return }

        setTema({
          id:          t.id,
          name:        t.nome,
          slug:        t.slug,
          icon:        t.icone || '🎨',
          color:       t.cor || '#8B5CF6',
          description: t.descricao || '',
          cover:       t.cover_url || '',
          product_ids: t.product_ids || [],
        })

        const ids = t.product_ids || []
        if (!ids.length) { setLoading(false); return }

        const { data: prods } = await supabase
          .from('produtos')
          .select('*')
          .in('id', ids)
          .eq('active', true)

        setProducts(prods || [])
        setLoading(false)
      })
  }, [slug])

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#07071a' }}>
      <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
    </div>
  )

  if (!tema) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4" style={{ background: '#07071a' }}>
      <p className="text-white text-lg">Tema não encontrado.</p>
      <Link href="/temas" className="text-purple-400 underline text-sm">← Ver todos os temas</Link>
    </div>
  )

  return (
    <>
      <Head>
        <title>{tema.name} — Cometa Personalização</title>
        <meta name="description" content={tema.description || tema.name} />
      </Head>

      <div className="nebula-bg min-h-screen">
        <Navbar />

        <main className="pb-24">

          {/* ── Hero ── */}
          <div className="relative w-full overflow-hidden" style={{ minHeight: '380px', maxHeight: '520px' }}>
            {tema.cover ? (
              <img src={tema.cover} alt={tema.name}
                className="w-full object-cover object-center"
                style={{ minHeight: '380px', maxHeight: '520px' }}
              />
            ) : (
              <div style={{ minHeight: '380px', background: `linear-gradient(135deg, ${tema.color}33, #07071a)` }} />
            )}

            {/* Gradiente */}
            <div className="absolute inset-0" style={{
              background: 'linear-gradient(to bottom, rgba(7,7,26,0.2) 0%, rgba(7,7,26,0.6) 55%, #07071a 100%)',
            }} />

            {/* Barra de cor */}
            <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ background: tema.color }} />

            {/* Conteúdo hero */}
            <div className="absolute bottom-0 left-0 right-0 px-4 md:px-8 pb-10 max-w-7xl mx-auto">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}>
                <div style={{ fontSize: '3rem', marginBottom: '8px', lineHeight: 1 }}>{tema.icon}</div>
                <h1 className="font-black text-white leading-tight mb-2"
                  style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', letterSpacing: '-0.03em',
                           textShadow: '0 2px 20px rgba(0,0,0,0.8)' }}>
                  {tema.name}
                </h1>
                {tema.description && (
                  <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.75)', maxWidth: '520px',
                               lineHeight: 1.6, textShadow: '0 1px 8px rgba(0,0,0,0.8)' }}>
                    {tema.description}
                  </p>
                )}
              </motion.div>
            </div>
          </div>

          <div className="px-4 md:px-8 max-w-7xl mx-auto pt-10">

            {/* Breadcrumb + voltar */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Link href="/" className="hover:text-purple-400 transition-colors">Início</Link>
                <span>/</span>
                <Link href="/temas" className="hover:text-purple-400 transition-colors">Temas</Link>
                <span>/</span>
                <span style={{ color: tema.color }}>{tema.name}</span>
              </div>
              <Link href="/temas"
                className="inline-flex items-center gap-1.5 text-xs font-bold"
                style={{ color: tema.color }}>
                ← Todos os temas
              </Link>
            </div>

            {/* Contador */}
            {products.length > 0 && (
              <p style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '0.3em',
                          textTransform: 'uppercase', color: '#4b5563', marginBottom: '20px' }}>
                Modelos disponíveis
                <span style={{ marginLeft: '8px', color: tema.color }}>({products.length})</span>
              </p>
            )}

            {/* Grade */}
            {products.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {products.map((p, i) => (
                  <ProductCard key={p.id} product={p} themeColor={tema.color} index={i} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div style={{ fontSize: '4rem', marginBottom: '16px' }}>{tema.icon}</div>
                <p className="text-white font-bold text-lg mb-2">Em breve!</p>
                <p className="text-gray-500 text-sm mb-8">
                  Estamos preparando os modelos para <strong className="text-white">{tema.name}</strong>.
                </p>
                <a href="https://wa.me/5585981501747?text=Olá! Quero encomendar um produto personalizado."
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-white"
                  style={{ background: '#25D366' }}>
                  {WA_SVG} Encomendar pelo WhatsApp
                </a>
              </div>
            )}

          </div>
        </main>

        <Footer />
        <FloatingButtons />
      </div>
    </>
  )
}
