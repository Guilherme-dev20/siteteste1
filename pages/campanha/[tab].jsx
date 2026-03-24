import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import FloatingButtons from '../../components/FloatingButtons'
import { supabase } from '../../lib/supabase'

// ── Modal de imagem ──────────────────────────────────────────────────────────
function ImageModal({ src, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(10px)' }}
    >
      <motion.div
        initial={{ scale: 0.88, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.88, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 26 }}
        onClick={e => e.stopPropagation()}
        className="relative max-w-3xl w-full"
      >
        <img src={src} alt="" className="w-full max-h-[85vh] object-contain rounded-2xl" />
        <button onClick={onClose}
          className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center text-white text-base"
          style={{ background: 'rgba(0,0,0,0.65)', border: '1px solid rgba(255,255,255,0.2)' }}>✕</button>
      </motion.div>
    </motion.div>
  )
}

// ── Card de produto com modelos prontos ─────────────────────────────────────
function ProdutoCard({ produto, modelos }) {
  const [modalImg, setModalImg] = useState(null)
  const preco = produto.preco
    ? `R$ ${Number(produto.preco).toFixed(2).replace('.', ',')}`
    : 'Sob consulta'

  const handleOrder = () => {
    const text = `👋 Olá! Vi a campanha e tenho interesse no produto *${produto.nome}*! 🚀`
    window.open(`https://wa.me/5585981501747?text=${encodeURIComponent(text)}`, '_blank')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      className="rounded-2xl overflow-hidden"
      style={{ background: '#0f0820', border: '1px solid rgba(139,92,246,0.15)' }}
    >
      <AnimatePresence>
        {modalImg && <ImageModal src={modalImg} onClose={() => setModalImg(null)} />}
      </AnimatePresence>

      {/* Imagem principal */}
      <div className="relative" style={{ aspectRatio: '4/3', background: '#0a0618' }}>
        {produto.imagem_url && (
          <img src={produto.imagem_url} alt={produto.nome} className="w-full h-full object-cover" />
        )}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 50%, #0f0820 100%)' }} />
        {produto.badge && (
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold text-white"
            style={{ background: 'rgba(124,58,237,0.8)' }}>
            {produto.badge}
          </span>
        )}
      </div>

      <div className="p-4 flex flex-col gap-3">
        <h3 className="font-bold text-white text-sm leading-tight">{produto.nome}</h3>

        {produto.descricao && (
          <p className="text-xs leading-relaxed line-clamp-2" style={{ color: '#94a3b8' }}>{produto.descricao}</p>
        )}

        <div>
          <p className="text-[9px] font-semibold uppercase tracking-widest text-gray-600 mb-0.5">A partir de</p>
          <p className="text-xl font-black" style={{ color: '#c4b5fd' }}>{preco}</p>
        </div>

        {/* Modelos prontos deste produto */}
        {modelos.length > 0 && (
          <div>
            <p className="text-[9px] font-bold uppercase tracking-widest text-gray-600 mb-2">Modelos prontos</p>
            <div className="grid grid-cols-3 gap-1.5">
              {modelos.map((url, i) => (
                <button key={i} onClick={() => setModalImg(url)}
                  className="group relative overflow-hidden rounded-lg"
                  style={{ aspectRatio: '1/1' }}>
                  <img src={url} alt="" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: 'rgba(124,58,237,0.45)' }} />
                </button>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={handleOrder}
          className="flex items-center justify-center gap-2 w-full h-10 rounded-xl font-bold text-white text-xs mt-1"
          style={{ background: 'linear-gradient(135deg, #7c3aed, #5b21b6)', boxShadow: '0 3px 14px rgba(124,58,237,0.4)' }}
        >
          <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.555 4.122 1.524 5.855L0 24l6.335-1.498C8.05 23.447 9.99 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818c-1.898 0-3.667-.514-5.177-1.409l-.371-.22-3.76.889.902-3.666-.242-.382A9.787 9.787 0 012.182 12C2.182 6.58 6.58 2.182 12 2.182S21.818 6.58 21.818 12 17.42 21.818 12 21.818z"/>
          </svg>
          Pedir no WhatsApp
        </button>
      </div>
    </motion.div>
  )
}

// ── Página principal ─────────────────────────────────────────────────────────
export default function CampanhaDetalhe() {
  const router      = useRouter()
  const { tab }     = router.query

  const [campanha, setCampanha]   = useState(null)
  const [produtos, setProdutos]   = useState([])
  const [allImages, setAllImages] = useState([])
  const [loading, setLoading]     = useState(true)
  const [modalImg, setModalImg]   = useState(null)

  useEffect(() => {
    if (!tab || !supabase) return

    supabase
      .from('campanhas')
      .select('*')
      .eq('active', true)
      .eq('tab', tab)
      .single()
      .then(async ({ data: camp }) => {
        if (!camp) { setLoading(false); return }
        setCampanha(camp)
        setAllImages(Array.isArray(camp.images) ? camp.images : [])

        const ids = camp.product_ids ?? []
        if (!ids.length) { setLoading(false); return }

        const { data: prods } = await supabase
          .from('produtos')
          .select('*')
          .in('id', ids)
          .eq('active', true)

        setProdutos(prods || [])
        setLoading(false)
      })
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

  // Modelos por produto
  const modelosPorProduto = (prodId) =>
    allImages.filter(img => img.product_id === prodId).map(img => img.url)

  return (
    <>
      <Head>
        <title>{campanha.title} — Cometa Personalização</title>
        <meta name="description" content={campanha.subtitle || campanha.title} />
      </Head>

      <div className="nebula-bg min-h-screen">
        <Navbar />

        <AnimatePresence>
          {modalImg && <ImageModal src={modalImg} onClose={() => setModalImg(null)} />}
        </AnimatePresence>

        <main className="pt-24 pb-20">

          {/* ── Banner ── */}
          <div className="relative w-full overflow-hidden mb-10" style={{ maxHeight: '480px' }}>
            <img
              src={campanha.banner_url ?? campanha.banner}
              alt={campanha.title}
              className="w-full object-cover object-top"
              style={{ maxHeight: '480px' }}
            />
            <div className="absolute inset-0" style={{
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 40%, #07071a 100%)',
            }} />

            {campanha.badge && (
              <div className="absolute top-5 left-5 z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase text-white"
                  style={{ backgroundColor: campanha.badge_color ?? '#7c3aed', boxShadow: '0 4px 16px rgba(0,0,0,0.4)' }}>
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

            {/* ── Título + subtítulo ── */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
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

            {/* ── Produtos com modelos prontos ── */}
            {produtos.length > 0 && (
              <div>
                <p style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#4b5563', marginBottom: '20px' }}>
                  Produtos da coleção
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
                  {produtos.map((p, i) => (
                    <ProdutoCard
                      key={p.id}
                      produto={p}
                      modelos={modelosPorProduto(p.id)}
                    />
                  ))}
                </div>
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
