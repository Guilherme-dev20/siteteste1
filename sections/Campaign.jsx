import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { supabase } from '../lib/supabase'

export default function Campaign() {
  const [campaigns, setCampaigns] = useState([])
  const [dbProducts, setDbProducts] = useState([])
  const [activeId, setActiveId] = useState(null)

  useEffect(() => {
    supabase
      .from('campanhas')
      .select('*')
      .eq('active', true)
      .order('ordem')
      .then(({ data }) => {
        if (data?.length) {
          setCampaigns(data)
          setActiveId(data[0].id)
        }
      })

    // Carrega produtos do Supabase para os cards relacionados
    supabase
      .from('produtos')
      .select('id, nome, imagem_url, preco')
      .eq('active', true)
      .then(({ data }) => { if (data) setDbProducts(data) })
  }, [])

  if (!campaigns.length) return null

  const campaign = campaigns.find((c) => c.id === activeId) || campaigns[0]

  // Produtos relacionados: tenta pelo campo product_ids do Supabase, fallback para productIds estático
  const productIdList = campaign.product_ids ?? campaign.productIds ?? []
  const relatedProducts = dbProducts.length
    ? dbProducts.filter((p) => productIdList.includes(p.id))
    : []

  return (
    <section className="relative py-16 px-4 overflow-x-hidden" style={{ background: '#0b0415' }}>
      {/* Fundo nebulosa */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-500/4 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-700/8 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-0 w-64 h-64 bg-violet-900/6 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto">

        {/* ── Header premium com abas proeminentes ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-10"
        >
          {/* Label + título com barra lateral luminosa */}
          <div className="flex items-start gap-4 mb-7">
            {/* Barra vertical com glow */}
            <div
              className="flex-shrink-0 mt-1"
              style={{
                width: '4px',
                height: '52px',
                borderRadius: '4px',
                background: 'linear-gradient(to bottom, #a855f7, #6366f1)',
                boxShadow: '0 0 18px rgba(168,85,247,0.8), 0 0 36px rgba(168,85,247,0.3)',
              }}
            />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                <span style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '0.35em', textTransform: 'uppercase', color: '#f87171' }}>
                  Ao Vivo · Em destaque
                </span>
              </div>
              <h2
                className="font-display font-black uppercase leading-none"
                style={{ fontSize: 'clamp(1.75rem, 5vw, 2.75rem)', letterSpacing: '-0.03em', color: '#ffffff' }}
              >
                Campanhas
              </h2>
            </div>
          </div>

          {/* Abas — grandes, contrastantes, impossíveis de ignorar */}
          <div className="flex gap-3 flex-wrap">
            {campaigns.map((c, i) => (
              <motion.button
                key={c.id}
                onClick={() => setActiveId(c.id)}
                whileTap={{ scale: 0.96 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                style={{
                  padding: '11px 28px',
                  borderRadius: '14px',
                  fontSize: '12px',
                  fontWeight: 800,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  outline: 'none',
                  transition: 'all 0.25s ease',
                  ...(activeId === c.id
                    ? {
                        background: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)',
                        color: '#ffffff',
                        border: '1.5px solid rgba(168,85,247,0.6)',
                        boxShadow: '0 6px 28px rgba(124,58,237,0.55), 0 1px 0 rgba(255,255,255,0.12) inset',
                      }
                    : {
                        background: 'rgba(255,255,255,0.05)',
                        color: '#9ca3af',
                        border: '1.5px solid rgba(255,255,255,0.1)',
                        boxShadow: 'none',
                      }),
                }}
                onMouseEnter={e => {
                  if (activeId !== c.id) {
                    e.currentTarget.style.color = '#e5e7eb'
                    e.currentTarget.style.borderColor = 'rgba(168,85,247,0.4)'
                    e.currentTarget.style.background = 'rgba(139,92,246,0.1)'
                  }
                }}
                onMouseLeave={e => {
                  if (activeId !== c.id) {
                    e.currentTarget.style.color = '#9ca3af'
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                  }
                }}
              >
                {c.tab}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Card principal — troca com animação */}
        <AnimatePresence mode="wait">
          {/* Spotlight focal atrás do card */}
          <div className="relative">
            <div
              className="absolute -bottom-16 left-1/2 -translate-x-1/2 pointer-events-none z-0"
              style={{
                width: '80%',
                height: '260px',
                borderRadius: '50%',
                background: 'radial-gradient(ellipse at center, rgba(139,92,246,0.28) 0%, rgba(109,40,217,0.12) 45%, transparent 75%)',
                filter: 'blur(24px)',
              }}
            />

            <motion.div
              key={campaign.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="relative z-10 grid lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden"
              style={{
                border: '1px solid rgba(139,92,246,0.22)',
                background: '#0e0720',
                boxShadow: '0 0 0 1px rgba(255,255,255,0.05) inset, 0 40px 100px rgba(0,0,0,0.7), 0 0 80px rgba(109,40,217,0.15)',
              }}
            >
              {/* ── Lado esquerdo: banner ── */}
              <div className="relative h-[260px] sm:h-[320px] lg:h-auto lg:min-h-[480px] overflow-hidden">
                <Image
                  src={campaign.banner_url ?? campaign.banner}
                  alt={campaign.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  quality={95}
                  priority
                />
                {/* Overlay → funde com o painel direito no desktop */}
                <div
                  className="absolute inset-0 hidden lg:block"
                  style={{ background: 'linear-gradient(to right, transparent 55%, #1e112f 100%)' }}
                />
                {/* Overlay → funde para baixo no mobile */}
                <div
                  className="absolute inset-0 lg:hidden"
                  style={{ background: 'linear-gradient(to bottom, transparent 40%, #1e112f 100%)' }}
                />

                {/* Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <motion.span
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.15 }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold
                               tracking-widest uppercase text-white"
                    style={{
                      backgroundColor: campaign.badge_color ?? campaign.badgeColor,
                      boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
                    }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    {campaign.badge}
                  </motion.span>
                </div>
              </div>

              {/* ── Separador vertical nítido (desktop) ── */}
              <div
                className="hidden lg:block absolute top-0 bottom-0 pointer-events-none z-20"
                style={{
                  left: '50%',
                  width: '1px',
                  background: 'linear-gradient(to bottom, transparent 0%, rgba(139,92,246,0.4) 20%, rgba(168,85,247,0.5) 50%, rgba(139,92,246,0.4) 80%, transparent 100%)',
                }}
              />

              {/* ── Lado direito: conteúdo ── */}
              <div
                className="flex flex-col justify-center p-5 sm:p-8 lg:p-10 min-w-0 overflow-hidden"
                style={{
                  background: '#1e112f',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                }}
              >
                {/* Subtle inner glow top */}
                <div
                  className="absolute top-0 right-0 pointer-events-none"
                  style={{
                    width: '300px',
                    height: '200px',
                    background: 'radial-gradient(ellipse at top right, rgba(168,85,247,0.12) 0%, transparent 70%)',
                  }}
                />

                <p
                  className="text-xs font-bold tracking-widest uppercase mb-2 truncate relative z-10"
                  style={{ color: '#94a3b8' }}
                >
                  {campaign.subtitle}
                </p>
                <h2
                  className="font-black text-white leading-tight mb-3 break-words relative z-10"
                  style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.25rem)', letterSpacing: '-0.02em' }}
                >
                  {campaign.title}
                </h2>
                <p className="text-sm leading-relaxed mb-6 relative z-10" style={{ color: '#94a3b8' }}>
                  {campaign.description}
                </p>

                {/* Produtos relacionados */}
                {relatedProducts.length > 0 && (
                  <div className="mb-7 relative z-10">
                    <p style={{ fontSize: '9px', fontWeight: 800, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#4b5563', marginBottom: '10px' }}>
                      Produtos relacionados
                    </p>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                      {relatedProducts.map((product, i) => (
                        <motion.div
                          key={product.id}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: i * 0.08 }}
                          className="group flex flex-col overflow-hidden transition-all duration-200"
                          style={{
                            borderRadius: '14px',
                            background: 'rgba(255,255,255,0.04)',
                            border: '1px solid rgba(255,255,255,0.07)',
                          }}
                          onMouseEnter={e => {
                            e.currentTarget.style.borderColor = 'rgba(139,92,246,0.45)'
                            e.currentTarget.style.background = 'rgba(139,92,246,0.08)'
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                            e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                          }}
                        >
                          <div className="relative aspect-square overflow-hidden" style={{ background: '#16082a' }}>
                            <img
                              src={product.imagem_url ?? product.placeholder}
                              alt={product.nome ?? product.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <div className="p-2.5 flex flex-col gap-2">
                            <p className="text-white text-xs font-semibold leading-tight line-clamp-2 group-hover:text-purple-300 transition-colors">
                              {product.nome ?? product.name}
                            </p>
                            <button
                              onClick={() => {
                                const nome = product.nome ?? product.name
                                const text = `Olá! Vi a campanha "${campaign.title}" e tenho interesse no produto: ${nome}!`
                                window.open(`https://wa.me/5585987208308?text=${encodeURIComponent(text)}`, '_blank')
                              }}
                              className="w-full flex items-center justify-center gap-1.5 text-[10px] font-bold
                                         text-white py-1.5 rounded-lg transition-all duration-200"
                              style={{ background: 'rgba(37,211,102,0.18)', border: '1px solid rgba(37,211,102,0.28)' }}
                              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(37,211,102,0.32)' }}
                              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(37,211,102,0.18)' }}
                            >
                              <svg className="w-3 h-3 flex-shrink-0" fill="#25D366" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.555 4.122 1.524 5.855L0 24l6.335-1.498C8.05 23.447 9.99 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818c-1.898 0-3.667-.514-5.177-1.409l-.371-.22-3.76.889.902-3.666-.242-.382A9.787 9.787 0 012.182 12C2.182 6.58 6.58 2.182 12 2.182S21.818 6.58 21.818 12 17.42 21.818 12 21.818z" />
                              </svg>
                              Pedir
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA sólido — electric purple */}
                <Link
                  href={campaign.collection_link ?? campaign.collectionLink ?? '/produtos'}
                  className="relative z-10 inline-flex items-center gap-2 text-sm font-bold text-white
                             transition-all duration-200 self-start"
                  style={{
                    background: '#8b5cf6',
                    padding: '12px 24px',
                    borderRadius: '12px',
                    boxShadow: '0 4px 20px rgba(139,92,246,0.45)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = '#7c3aed'
                    e.currentTarget.style.boxShadow = '0 6px 28px rgba(139,92,246,0.65)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = '#8b5cf6'
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(139,92,246,0.45)'
                  }}
                >
                  Ver coleção completa
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          </div>
        </AnimatePresence>

      </div>
    </section>
  )
}
