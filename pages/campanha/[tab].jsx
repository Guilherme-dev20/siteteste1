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
  <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.555 4.122 1.524 5.855L0 24l6.335-1.498C8.05 23.447 9.99 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818c-1.898 0-3.667-.514-5.177-1.409l-.371-.22-3.76.889.902-3.666-.242-.382A9.787 9.787 0 012.182 12C2.182 6.58 6.58 2.182 12 2.182S21.818 6.58 21.818 12 17.42 21.818 12 21.818z"/>
  </svg>
)

// ── Card de produto ───────────────────────────────────────────────────────────
function ItemCard({ item, campaignTitle, index }) {
  const url   = typeof item === 'string' ? item : item.url
  const name  = typeof item === 'object' && item.name  ? item.name  : null
  const price = typeof item === 'object' && item.price ? item.price : null

  const handleOrder = () => {
    const prod = name || campaignTitle
    const text = `👋 Olá! Vi o produto *${prod}* e quero encomendar! 🚀`
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
        transition: 'box-shadow 0.2s ease',
      }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = '0 16px 48px rgba(109,40,217,0.3), 0 4px 16px rgba(0,0,0,0.6)'}
      onMouseLeave={e => e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.5)'}
    >
      {/* Imagem */}
      <div style={{ position: 'relative', aspectRatio: '1/1', overflow: 'hidden', background: '#18103a' }}>
        <img src={url} alt={name || ''} loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        />
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'linear-gradient(to bottom, transparent 55%, rgba(10,5,28,0.6) 100%)',
        }} />
      </div>

      {/* Info */}
      <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
        {name && (
          <p style={{ fontSize: '13px', fontWeight: 700, color: '#e2d9ff', margin: 0, lineHeight: 1.4,
                      display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {name}
          </p>
        )}

        {price && (
          <div style={{ marginTop: name ? 0 : 'auto' }}>
            <p style={{ fontSize: '9px', fontWeight: 600, color: '#6b7280', letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 2px' }}>
              A partir de
            </p>
            <p style={{ fontSize: '22px', fontWeight: 900, color: '#c4b5fd', letterSpacing: '-0.02em', lineHeight: 1, margin: 0 }}>
              R$ {price}
            </p>
          </div>
        )}

        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={handleOrder}
          style={{ marginTop: 'auto', width: '100%', height: '42px', borderRadius: '11px', border: 'none',
                   cursor: 'pointer', background: 'linear-gradient(135deg,#7c3aed,#5b21b6)',
                   boxShadow: '0 3px 14px rgba(109,40,217,0.35)',
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
export default function CampanhaDetalhe() {
  const router  = useRouter()
  const { tab } = router.query

  const [campanha, setCampanha] = useState(null)
  const [loading, setLoading]   = useState(true)

  useEffect(() => {
    if (!tab || !supabase) return
    supabase
      .from('campanhas')
      .select('*')
      .eq('active', true)
      .eq('tab', tab)
      .single()
      .then(({ data }) => { setCampanha(data || null); setLoading(false) })
  }, [tab])

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#07071a' }}>
      <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
    </div>
  )

  if (!campanha) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4" style={{ background: '#07071a' }}>
      <p className="text-white text-lg">Campanha não encontrada.</p>
      <Link href="/" className="text-purple-400 underline text-sm">← Voltar para o início</Link>
    </div>
  )

  const imagesArr = Array.isArray(campanha.images) ? campanha.images.filter(Boolean) : []

  return (
    <>
      <Head>
        <title>{campanha.title} — Cometa Personalização</title>
        <meta name="description" content={campanha.description || campanha.subtitle || campanha.title} />
      </Head>

      <div className="nebula-bg min-h-screen">
        <Navbar />

        <main className="pt-24 pb-20">

          {/* ── Banner ── */}
          <div className="relative w-full overflow-hidden mb-12" style={{ maxHeight: '520px' }}>
            <img
              src={campanha.banner_url ?? campanha.banner}
              alt={campanha.title}
              className="w-full object-cover object-center"
              style={{ maxHeight: '520px' }}
            />
            <div className="absolute inset-0" style={{
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.05) 35%, #07071a 100%)',
            }} />

            {campanha.badge && (
              <div className="absolute top-5 left-5 z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase text-white"
                  style={{ backgroundColor: campanha.badge_color ?? '#7c3aed', boxShadow: '0 4px 16px rgba(0,0,0,0.5)' }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  {campanha.badge}
                </span>
              </div>
            )}
          </div>

          <div className="px-4 max-w-7xl mx-auto">

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-8">
              <Link href="/" className="hover:text-purple-400 transition-colors">Início</Link>
              <span>/</span>
              <span className="text-gray-300">{campanha.title}</span>
            </div>

            {/* Título + desc */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
              {campanha.subtitle && (
                <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: '#94a3b8' }}>
                  {campanha.subtitle}
                </p>
              )}
              <h1 className="font-black text-white leading-tight mb-3"
                style={{ fontSize: 'clamp(1.8rem, 5vw, 3rem)', letterSpacing: '-0.03em' }}>
                {campanha.title}
              </h1>
              {campanha.description && (
                <p className="text-sm leading-relaxed max-w-2xl" style={{ color: '#94a3b8' }}>
                  {campanha.description}
                </p>
              )}
            </motion.div>

            {/* Contador */}
            {imagesArr.length > 0 && (
              <p style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '0.3em', textTransform: 'uppercase',
                          color: '#4b5563', marginBottom: '20px' }}>
                Produtos da coleção
                <span style={{ marginLeft: '8px', color: '#7c3aed' }}>({imagesArr.length})</span>
              </p>
            )}

            {/* Grade */}
            {imagesArr.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {imagesArr.map((item, i) => (
                  <ItemCard key={i} item={item} campaignTitle={campanha.title} index={i} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <p className="text-gray-500 text-sm">Nenhum produto nessa coleção ainda.</p>
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
