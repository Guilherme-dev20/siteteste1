import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { supabase } from '../lib/supabase'

const WA_SVG = (
  <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.555 4.122 1.524 5.855L0 24l6.335-1.498C8.05 23.447 9.99 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818c-1.898 0-3.667-.514-5.177-1.409l-.371-.22-3.76.889.902-3.666-.242-.382A9.787 9.787 0 012.182 12C2.182 6.58 6.58 2.182 12 2.182S21.818 6.58 21.818 12 17.42 21.818 12 21.818z"/>
  </svg>
)

// ── Card de produto da campanha ───────────────────────────────────────────────
function CampaignProductCard({ item, campaignTitle, index }) {
  const url   = typeof item === 'string' ? item : item.url
  const name  = typeof item === 'object' && item.name  ? item.name  : null
  const price = typeof item === 'object' && item.price ? item.price : null

  const handleOrder = () => {
    const prod = name || campaignTitle
    const text = `👋 Olá! Vi o produto *${prod}* na campanha e quero encomendar! 🚀`
    window.open(`https://wa.me/5585981501747?text=${encodeURIComponent(text)}`, '_blank')
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      style={{
        borderRadius: '16px', overflow: 'hidden',
        background: '#0f0f23',
        border: '1px solid rgba(139,92,246,0.18)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.5)',
        display: 'flex', flexDirection: 'column',
        transition: 'box-shadow 0.2s ease',
      }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = '0 16px 48px rgba(109,40,217,0.3), 0 4px 16px rgba(0,0,0,0.6)'}
      onMouseLeave={e => e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.5)'}
    >
      {/* Imagem */}
      <div style={{ position: 'relative', aspectRatio: '1/1', overflow: 'hidden', background: '#18103a' }}>
        <img
          src={url} alt={name || ''}
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, transparent 55%, rgba(10,5,28,0.65) 100%)',
          pointerEvents: 'none',
        }} />
      </div>

      {/* Rodapé do card */}
      <div style={{ padding: '14px 14px 14px', display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
        {name && (
          <p style={{
            fontSize: '13px', fontWeight: 700, color: '#e2d9ff',
            margin: 0, lineHeight: 1.35,
            display: '-webkit-box', WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical', overflow: 'hidden',
          }}>
            {name}
          </p>
        )}

        {price && (
          <div>
            <p style={{ fontSize: '9px', fontWeight: 600, color: '#6b7280', letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>
              A partir de
            </p>
            <p style={{ fontSize: '20px', fontWeight: 900, color: '#c4b5fd', letterSpacing: '-0.02em', lineHeight: 1.1, margin: 0 }}>
              R$ {price}
            </p>
          </div>
        )}

        <motion.button
          whileTap={{ scale: 0.96 }}
          whileHover={{ boxShadow: '0 6px 24px rgba(109,40,217,0.6)', transition: { duration: 0.15 } }}
          onClick={handleOrder}
          style={{
            marginTop: 'auto',
            width: '100%', height: '40px', borderRadius: '10px', border: 'none', cursor: 'pointer',
            background: 'linear-gradient(135deg,#7c3aed,#5b21b6)',
            boxShadow: '0 3px 14px rgba(109,40,217,0.35)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: '6px', color: '#fff', fontSize: '11px', fontWeight: 700,
          }}
        >
          {WA_SVG} Pedir no WhatsApp
        </motion.button>
      </div>
    </motion.article>
  )
}

// ── Seção principal ───────────────────────────────────────────────────────────
export default function Campaign() {
  const router = useRouter()
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

  const campaign     = campaigns.find(c => c.id === activeId) || campaigns[0]
  const imagesArr    = Array.isArray(campaign.images) ? campaign.images.filter(Boolean) : []
  const collectionLink = campaign.collection_link ?? campaign.collectionLink

  const goToCollection = () => {
    if (campaign.tab) router.push(`/campanha/${campaign.tab}`)
  }

  return (
    <section className="relative py-16 px-4" style={{ background: '#0b0415' }}>
      {/* Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl" style={{ background: 'rgba(220,38,38,0.04)' }} />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full blur-3xl" style={{ background: 'rgba(109,40,217,0.08)' }} />
      </div>

      <div className="relative max-w-7xl mx-auto">

        {/* ── Header ── */}
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

        {/* ── Campanha ativa ── */}
        <AnimatePresence mode="wait">
          <motion.div key={campaign.id}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35 }}>

            {/* ── Banner full-width com texto sobreposto ── */}
            <div className="relative rounded-3xl overflow-hidden mb-6"
              style={{ border: '1px solid rgba(139,92,246,0.22)', boxShadow: '0 32px 80px rgba(0,0,0,0.65)' }}>

              {/* Imagem do banner */}
              <div className="relative w-full" style={{ aspectRatio: '16/9', minHeight: '320px' }}>
                <Image
                  src={campaign.banner_url ?? campaign.banner}
                  alt={campaign.title}
                  fill sizes="100vw"
                  className="object-cover"
                  quality={95} priority
                />

                {/* Gradiente: escurece da dir pra esq no desktop, de baixo pra cima no mobile */}
                <div className="hidden md:block absolute inset-0" style={{
                  background: 'linear-gradient(to right, rgba(14,7,32,0.1) 30%, rgba(14,7,32,0.92) 70%, rgba(14,7,32,0.98) 100%)',
                }} />
                <div className="md:hidden absolute inset-0" style={{
                  background: 'linear-gradient(to bottom, rgba(14,7,32,0.05) 25%, rgba(14,7,32,0.9) 75%, rgba(14,7,32,0.99) 100%)',
                }} />

                {/* Badge no topo esquerdo */}
                {campaign.badge && (
                  <div className="absolute top-4 left-4 md:top-5 md:left-5 z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase text-white"
                      style={{ backgroundColor: campaign.badge_color ?? '#7c3aed', boxShadow: '0 4px 16px rgba(0,0,0,0.5)' }}>
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      {campaign.badge}
                    </span>
                  </div>
                )}

                {/* Texto — desktop: lado direito | mobile: rodapé */}
                <div className="absolute inset-0 flex items-center justify-end">
                  {/* Desktop */}
                  <div className="hidden md:flex flex-col justify-center h-full px-10 py-8"
                    style={{ width: '42%' }}>
                    {campaign.subtitle && (
                      <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '6px' }}>
                        {campaign.subtitle}
                      </p>
                    )}
                    <h2 className="font-black text-white leading-tight mb-3"
                      style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', letterSpacing: '-0.03em' }}>
                      {campaign.title}
                    </h2>
                    {campaign.description && (
                      <p className="mb-5" style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.6 }}>
                        {campaign.description}
                      </p>
                    )}
                    {imagesArr.length > 0 && (
                      <button onClick={goToCollection}
                        className="inline-flex items-center gap-2 text-white font-bold self-start"
                        style={{ background: 'linear-gradient(135deg,#7c3aed,#5b21b6)', padding: '12px 24px',
                                 borderRadius: '12px', fontSize: '12px', textTransform: 'uppercase',
                                 letterSpacing: '0.08em', boxShadow: '0 6px 24px rgba(124,58,237,0.5)',
                                 border: 'none', cursor: 'pointer' }}>
                        Ver coleção completa
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>

                {/* Mobile: só badge + título sobre a imagem */}
                <div className="md:hidden absolute bottom-0 left-0 right-0 p-4"
                  style={{ background: 'linear-gradient(to top, rgba(14,7,32,0.85) 0%, transparent 100%)' }}>
                  {campaign.subtitle && (
                    <p style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '4px' }}>
                      {campaign.subtitle}
                    </p>
                  )}
                  <h2 className="font-black text-white leading-tight"
                    style={{ fontSize: 'clamp(1.4rem, 7vw, 2rem)', letterSpacing: '-0.02em' }}>
                    {campaign.title}
                  </h2>
                </div>
              </div>
            </div>

            {/* Mobile: descrição + botão abaixo do banner */}
            {(campaign.description || collectionLink) && (
              <div className="md:hidden px-1 pt-4 pb-2 flex flex-col gap-3">
                {campaign.description && (
                  <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 1.6, margin: 0 }}>
                    {campaign.description}
                  </p>
                )}
                {imagesArr.length > 0 && (
                  <button onClick={goToCollection}
                    className="flex items-center justify-center gap-2 text-white font-bold w-full"
                    style={{ background: 'linear-gradient(135deg,#7c3aed,#5b21b6)', height: '46px',
                             borderRadius: '12px', fontSize: '11px', textTransform: 'uppercase',
                             letterSpacing: '0.08em', boxShadow: '0 4px 18px rgba(124,58,237,0.5)',
                             border: 'none', cursor: 'pointer' }}>
                    Ver coleção completa
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                )}
              </div>
            )}

            {/* ── Grade de produtos ── */}
            {imagesArr.length > 0 && (
              <div id={`campaign-products-${campaign.id}`} className="grid grid-cols-2 md:grid-cols-4 gap-4" style={{ scrollMarginTop: '80px' }}>
                {imagesArr.map((item, i) => (
                  <CampaignProductCard key={i} item={item} campaignTitle={campaign.title} index={i} />
                ))}
              </div>
            )}

          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  )
}
