import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { supabase } from '../lib/supabase'

const WA_SVG = (
  <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.555 4.122 1.524 5.855L0 24l6.335-1.498C8.05 23.447 9.99 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818c-1.898 0-3.667-.514-5.177-1.409l-.371-.22-3.76.889.902-3.666-.242-.382A9.787 9.787 0 012.182 12C2.182 6.58 6.58 2.182 12 2.182S21.818 6.58 21.818 12 17.42 21.818 12 21.818z"/>
  </svg>
)

// ── Card produto ──────────────────────────────────────────────────────────────
function ProductItem({ item, campaignTitle }) {
  const url   = typeof item === 'string' ? item : item.url
  const name  = typeof item === 'object' ? item.name  : null
  const price = typeof item === 'object' ? item.price : null

  const handleOrder = () => {
    const prod = name || campaignTitle
    const text = `👋 Olá! Vi esse modelo na campanha *${prod}* e quero personalizar! 🚀`
    window.open(`https://wa.me/5585981501747?text=${encodeURIComponent(text)}`, '_blank')
  }

  return (
    <motion.div
      whileHover={{ y: -3, boxShadow: '0 12px 32px rgba(109,40,217,0.3)', transition: { duration: 0.2 } }}
      style={{
        borderRadius: '14px', overflow: 'hidden',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(139,92,246,0.18)',
        display: 'flex', flexDirection: 'column',
      }}
    >
      {/* Imagem quadrada */}
      <div style={{ position: 'relative', aspectRatio: '1/1', overflow: 'hidden', background: '#111' }}>
        <img
          src={url} alt={name || ''}
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        {price && (
          <div style={{
            position: 'absolute', top: '8px', right: '8px',
            background: 'rgba(10,5,28,0.85)', backdropFilter: 'blur(6px)',
            border: '1px solid rgba(168,85,247,0.45)',
            borderRadius: '7px', padding: '3px 8px',
            fontSize: '11px', fontWeight: 800, color: '#d8b4fe',
          }}>
            R$ {price}
          </div>
        )}
      </div>

      {/* Info */}
      <div style={{ padding: '10px 10px 10px', display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
        {name && (
          <p style={{
            fontSize: '12px', fontWeight: 700, color: '#e9e4ff',
            margin: 0, lineHeight: 1.35,
            display: '-webkit-box', WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical', overflow: 'hidden',
          }}>
            {name}
          </p>
        )}
        <button
          onClick={handleOrder}
          style={{
            marginTop: 'auto',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
            height: '34px', borderRadius: '8px', border: 'none', cursor: 'pointer',
            background: 'rgba(34,197,94,0.15)',
            color: '#4ade80', fontSize: '11px', fontWeight: 700,
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(34,197,94,0.28)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(34,197,94,0.15)'}
        >
          {WA_SVG} Pedir
        </button>
      </div>
    </motion.div>
  )
}

// ── Seção principal ───────────────────────────────────────────────────────────
export default function Campaign() {
  const [campaigns, setCampaigns] = useState([])
  const [activeId, setActiveId]   = useState(null)

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

  if (!campaigns.length) return null

  const campaign  = campaigns.find(c => c.id === activeId) || campaigns[0]
  const imagesArr = Array.isArray(campaign.images) ? campaign.images.filter(Boolean) : []
  const collectionLink = campaign.collection_link ?? campaign.collectionLink

  return (
    <section className="relative py-16 px-4" style={{ background: '#0b0415' }}>
      {/* Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl" style={{ background: 'rgba(220,38,38,0.04)' }} />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full blur-3xl" style={{ background: 'rgba(109,40,217,0.08)' }} />
      </div>

      <div className="relative max-w-7xl mx-auto">

        {/* ── Header seção ── */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-8">
          <div className="flex items-start gap-4 mb-6">
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
          {campaigns.length > 1 && (
            <div className="flex gap-3 flex-wrap">
              {campaigns.map((c, i) => (
                <motion.button key={c.id} onClick={() => setActiveId(c.id)}
                  whileTap={{ scale: 0.96 }} initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                  style={{
                    padding: '10px 24px', borderRadius: '14px', fontSize: '12px',
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
          )}
        </motion.div>

        {/* ── Painel da campanha ── */}
        <AnimatePresence mode="wait">
          <motion.div key={campaign.id}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35 }}>

            <div className="rounded-3xl overflow-hidden"
              style={{ border: '1px solid rgba(139,92,246,0.22)', boxShadow: '0 40px 100px rgba(0,0,0,0.65)', background: '#0e0720' }}>

              {/* ── Desktop: banner esq + conteúdo dir ── */}
              <div className="hidden md:flex" style={{ minHeight: '480px' }}>

                {/* Banner — esquerda */}
                <div className="relative flex-shrink-0" style={{ width: '45%' }}>
                  <Image
                    src={campaign.banner_url ?? campaign.banner}
                    alt={campaign.title}
                    fill sizes="45vw"
                    className="object-cover"
                    quality={95} priority
                  />
                </div>

                {/* Conteúdo — direita */}
                <div className="flex flex-col flex-1 min-w-0 p-8"
                  style={{ background: 'linear-gradient(135deg, #130d2e 0%, #0e0720 100%)', borderLeft: '1px solid rgba(139,92,246,0.12)' }}>

                  {/* Badge + título + desc */}
                  <div className="mb-6">
                    {campaign.badge && (
                      <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase text-white mb-3"
                        style={{ backgroundColor: campaign.badge_color ?? '#7c3aed' }}>
                        {campaign.badge}
                      </span>
                    )}
                    <h2 className="font-black text-white leading-tight mb-2"
                      style={{ fontSize: 'clamp(1.5rem, 2.8vw, 2.2rem)', letterSpacing: '-0.02em' }}>
                      {campaign.title}
                    </h2>
                    {campaign.description && (
                      <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.6 }}>
                        {campaign.description}
                      </p>
                    )}
                  </div>

                  {/* Produtos */}
                  {imagesArr.length > 0 && (
                    <div className="flex-1">
                      <p style={{ fontSize: '9px', fontWeight: 800, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#6b7280', marginBottom: '12px' }}>
                        Produtos relacionados
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        {imagesArr.map((item, i) => (
                          <ProductItem key={i} item={item} campaignTitle={campaign.title} />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Botão ver coleção */}
                  {collectionLink && (
                    <div className="mt-6">
                      <Link href={collectionLink}
                        className="flex items-center justify-center gap-2 w-full text-white font-bold"
                        style={{ background: 'linear-gradient(135deg,#7c3aed,#5b21b6)', height: '48px',
                                 borderRadius: '14px', fontSize: '12px', textTransform: 'uppercase',
                                 letterSpacing: '0.1em', boxShadow: '0 6px 24px rgba(124,58,237,0.45)' }}>
                        Ver coleção completa
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  )}
                </div>
              </div>

              {/* ── Mobile: banner no topo + conteúdo abaixo ── */}
              <div className="md:hidden">
                {/* Banner */}
                <div className="relative" style={{ aspectRatio: '16/9' }}>
                  <Image
                    src={campaign.banner_url ?? campaign.banner}
                    alt={campaign.title}
                    fill sizes="100vw"
                    className="object-cover"
                    quality={90} priority
                  />
                  <div className="absolute inset-0" style={{
                    background: 'linear-gradient(to bottom, transparent 40%, rgba(14,7,32,0.95) 100%)',
                  }} />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    {campaign.badge && (
                      <span className="inline-block px-2.5 py-1 rounded-full text-[9px] font-bold tracking-widest uppercase text-white mb-2"
                        style={{ backgroundColor: campaign.badge_color ?? '#7c3aed' }}>
                        {campaign.badge}
                      </span>
                    )}
                    <h2 className="font-black text-white leading-tight"
                      style={{ fontSize: 'clamp(1.5rem, 7vw, 2.2rem)', letterSpacing: '-0.02em' }}>
                      {campaign.title}
                    </h2>
                  </div>
                </div>

                {/* Conteúdo */}
                <div className="p-5" style={{ background: '#130d2e' }}>
                  {campaign.description && (
                    <p className="mb-5" style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 1.6 }}>
                      {campaign.description}
                    </p>
                  )}

                  {imagesArr.length > 0 && (
                    <>
                      <p style={{ fontSize: '9px', fontWeight: 800, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#6b7280', marginBottom: '12px' }}>
                        Produtos relacionados
                      </p>
                      <div className="grid grid-cols-2 gap-3 mb-5">
                        {imagesArr.map((item, i) => (
                          <ProductItem key={i} item={item} campaignTitle={campaign.title} />
                        ))}
                      </div>
                    </>
                  )}

                  {collectionLink && (
                    <Link href={collectionLink}
                      className="flex items-center justify-center gap-2 w-full text-white font-bold"
                      style={{ background: 'linear-gradient(135deg,#7c3aed,#5b21b6)', height: '48px',
                               borderRadius: '14px', fontSize: '12px', textTransform: 'uppercase',
                               letterSpacing: '0.1em', boxShadow: '0 6px 24px rgba(124,58,237,0.45)' }}>
                      Ver coleção completa
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  )}
                </div>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  )
}
