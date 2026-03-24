import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { supabase } from '../lib/supabase'

function WAIcon() {
  return (
    <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.555 4.122 1.524 5.855L0 24l6.335-1.498C8.05 23.447 9.99 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818c-1.898 0-3.667-.514-5.177-1.409l-.371-.22-3.76.889.902-3.666-.242-.382A9.787 9.787 0 012.182 12C2.182 6.58 6.58 2.182 12 2.182S21.818 6.58 21.818 12 17.42 21.818 12 21.818z"/>
    </svg>
  )
}

// ── Lightbox ─────────────────────────────────────────────────────────────────
function Lightbox({ url, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[10000] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.93)' }}
    >
      <motion.img
        initial={{ scale: 0.88, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.88, opacity: 0 }}
        src={url} alt=""
        className="max-w-full max-h-[90vh] rounded-2xl object-contain"
        onClick={e => e.stopPropagation()}
      />
      <button onClick={onClose}
        className="absolute top-4 right-4 w-10 h-10 rounded-full text-white text-lg flex items-center justify-center"
        style={{ background: 'rgba(0,0,0,0.7)', border: '1px solid rgba(255,255,255,0.2)' }}>✕</button>
    </motion.div>
  )
}

// ── Card de produto com miniaturas de modelos ─────────────────────────────────
function ProductWithModelos({ product, modelos, onLightbox }) {
  const handleOrder = () => {
    const text = `👋 Olá! Tenho interesse no produto *${product.name}* e quero personalizá-lo! 🚀`
    window.open(`https://wa.me/5585981501747?text=${encodeURIComponent(text)}`, '_blank')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.4 }}
      className="flex flex-col overflow-hidden rounded-2xl"
      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
    >
      {/* Imagem do produto */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '1/1', background: '#0f0820' }}>
        {product.imagem_url && (
          <img src={product.imagem_url} alt={product.name}
            className="w-full h-full object-cover" />
        )}
        {product.badge && (
          <span className="absolute top-2 left-2 text-[9px] font-bold px-2 py-0.5 rounded-full text-white"
            style={{ background: 'rgba(124,58,237,0.9)' }}>{product.badge}</span>
        )}
      </div>

      {/* Info */}
      <div className="p-3 flex flex-col flex-1">
        <p className="text-white text-sm font-bold leading-tight mb-0.5 line-clamp-2">{product.name}</p>
        <p className="text-purple-300 text-sm font-black mb-3">
          {product.preco ? `R$ ${Number(product.preco).toFixed(2).replace('.', ',')}` : ''}
        </p>

        {/* Miniaturas de modelos prontos */}
        {modelos.length > 0 && (
          <div className="mb-3">
            <p className="text-[9px] font-bold tracking-widest uppercase text-gray-500 mb-1.5">
              Modelos prontos
            </p>
            <div className="flex gap-1.5 flex-wrap">
              {modelos.map((url, i) => (
                <button key={i} onClick={() => onLightbox(url)}
                  className="group relative overflow-hidden rounded-lg flex-shrink-0"
                  style={{ width: '48px', height: '48px', border: '1px solid rgba(139,92,246,0.3)' }}>
                  <img src={url} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-200" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                    style={{ background: 'rgba(124,58,237,0.5)' }}>
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Botão */}
        <button onClick={handleOrder}
          className="mt-auto w-full h-9 rounded-xl flex items-center justify-center gap-1.5 text-xs font-bold text-white"
          style={{ background: 'linear-gradient(135deg,#7c3aed,#5b21b6)', boxShadow: '0 3px 14px rgba(124,58,237,0.4)' }}>
          <WAIcon /> Pedir no WhatsApp
        </button>
      </div>
    </motion.div>
  )
}

// ── Seção principal ──────────────────────────────────────────────────────────
export default function Campaign() {
  const [campaigns, setCampaigns]   = useState([])
  const [products, setProducts]     = useState([])
  const [activeId, setActiveId]     = useState(null)
  const [lightbox, setLightbox]     = useState(null)
  const [loadingProds, setLoadingProds] = useState(false)

  // 1. Busca campanhas ativas
  useEffect(() => {
    if (!supabase) return
    supabase
      .from('campanhas')
      .select('*')
      .eq('active', true)
      .order('ordem')
      .then(({ data }) => {
        if (data?.length) { setCampaigns(data); setActiveId(data[0].id) }
      })
  }, [])

  // 2. Ao trocar de campanha, busca os produtos vinculados
  const campaign = campaigns.find(c => c.id === activeId) || campaigns[0]

  useEffect(() => {
    if (!campaign || !supabase) return

    const ids = campaign.product_ids ?? []
    if (!ids.length) { setProducts([]); return }

    setLoadingProds(true)
    supabase
      .from('produtos')
      .select('*')
      .in('id', ids)
      .then(({ data }) => {
        setProducts(data ?? [])
        setLoadingProds(false)
      })
  }, [activeId])

  if (!campaigns.length || !campaign) return null

  const imagesArr = Array.isArray(campaign.images) ? campaign.images : []

  // Filtra modelos prontos por produto
  const modelosDoProduto = (prodId) =>
    imagesArr
      .filter(img => String(img.product_id) === String(prodId))
      .map(img => img.url)

  return (
    <section className="relative py-16 px-4 overflow-x-hidden" style={{ background: '#0b0415' }}>
      {/* Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-500/4 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-700/8 rounded-full blur-3xl" />
      </div>

      {/* Lightbox global */}
      <AnimatePresence>
        {lightbox && <Lightbox url={lightbox} onClose={() => setLightbox(null)} />}
      </AnimatePresence>

      <div className="relative max-w-7xl mx-auto">

        {/* ── Header + abas ── */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.55 }} className="mb-10">
          <div className="flex items-start gap-4 mb-7">
            <div className="flex-shrink-0 mt-1" style={{
              width: '4px', height: '52px', borderRadius: '4px',
              background: 'linear-gradient(to bottom, #a855f7, #6366f1)',
              boxShadow: '0 0 18px rgba(168,85,247,0.8)',
            }} />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                <span style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '0.35em', textTransform: 'uppercase', color: '#f87171' }}>
                  Ao Vivo · Em destaque
                </span>
              </div>
              <h2 className="font-display font-black uppercase leading-none"
                style={{ fontSize: 'clamp(1.75rem, 5vw, 2.75rem)', letterSpacing: '-0.03em', color: '#ffffff' }}>
                Campanhas
              </h2>
            </div>
          </div>

          {/* Abas */}
          <div className="flex gap-3 flex-wrap">
            {campaigns.map((c, i) => (
              <motion.button key={c.id} onClick={() => setActiveId(c.id)}
                whileTap={{ scale: 0.96 }} initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                style={{
                  padding: '11px 28px', borderRadius: '14px', fontSize: '12px',
                  fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase',
                  cursor: 'pointer', outline: 'none', transition: 'all 0.25s ease',
                  ...(activeId === c.id
                    ? { background: 'linear-gradient(135deg,#7c3aed,#4f46e5)', color: '#fff',
                        border: '1.5px solid rgba(168,85,247,0.6)', boxShadow: '0 6px 28px rgba(124,58,237,0.55)' }
                    : { background: 'rgba(255,255,255,0.05)', color: '#9ca3af',
                        border: '1.5px solid rgba(255,255,255,0.1)' }),
                }}>
                {c.tab}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* ── Banner ── */}
        <AnimatePresence mode="wait">
          <motion.div key={campaign.id}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35 }}>

            {/* Banner principal */}
            <div className="relative rounded-3xl overflow-hidden mb-6"
              style={{ border: '1px solid rgba(139,92,246,0.22)', background: '#0e0720',
                       boxShadow: '0 40px 100px rgba(0,0,0,0.7)' }}>
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Imagem */}
                <div className="relative h-[260px] sm:h-[320px] lg:h-[400px] overflow-hidden">
                  <Image src={campaign.banner_url ?? campaign.banner} alt={campaign.title}
                    fill sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover" quality={95} priority />
                  <div className="absolute inset-0 hidden lg:block"
                    style={{ background: 'linear-gradient(to right, transparent 55%, #1e112f 100%)' }} />
                  <div className="absolute inset-0 lg:hidden"
                    style={{ background: 'linear-gradient(to bottom, transparent 40%, #1e112f 100%)' }} />
                  {campaign.badge && (
                    <div className="absolute top-4 left-4 z-10">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase text-white"
                        style={{ backgroundColor: campaign.badge_color ?? '#7c3aed', boxShadow: '0 4px 16px rgba(0,0,0,0.4)' }}>
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        {campaign.badge}
                      </span>
                    </div>
                  )}
                </div>

                {/* Texto */}
                <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10"
                  style={{ background: '#1e112f' }}>
                  <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: '#94a3b8' }}>
                    {campaign.subtitle}
                  </p>
                  <h2 className="font-black text-white leading-tight mb-3"
                    style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.25rem)', letterSpacing: '-0.02em' }}>
                    {campaign.title}
                  </h2>
                  {campaign.description && (
                    <p className="text-sm leading-relaxed mb-6" style={{ color: '#94a3b8' }}>
                      {campaign.description}
                    </p>
                  )}
                  <Link href={campaign.collection_link ?? campaign.collectionLink ?? '/produtos'}
                    className="inline-flex items-center gap-2 text-sm font-bold text-white self-start"
                    style={{ background: '#8b5cf6', padding: '12px 24px', borderRadius: '12px',
                             boxShadow: '0 4px 20px rgba(139,92,246,0.45)' }}>
                    Ver coleção completa
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            {/* ── Grade de produtos ── */}
            {loadingProds ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="rounded-2xl animate-pulse"
                    style={{ aspectRatio: '3/4', background: 'rgba(255,255,255,0.05)' }} />
                ))}
              </div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map(product => (
                  <ProductWithModelos
                    key={product.id}
                    product={product}
                    modelos={modelosDoProduto(product.id)}
                    onLightbox={setLightbox}
                  />
                ))}
              </div>
            ) : null}
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  )
}
