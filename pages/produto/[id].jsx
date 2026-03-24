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

// ── Ícone WhatsApp ───────────────────────────────────────────────────────────
function WAIcon() {
  return (
    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.555 4.122 1.524 5.855L0 24l6.335-1.498C8.05 23.447 9.99 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818c-1.898 0-3.667-.514-5.177-1.409l-.371-.22-3.76.889.902-3.666-.242-.382A9.787 9.787 0 012.182 12C2.182 6.58 6.58 2.182 12 2.182S21.818 6.58 21.818 12 17.42 21.818 12 21.818z"/>
    </svg>
  )
}

export default function ProdutoDetalhe() {
  const router = useRouter()
  const { id }  = router.query

  const [produto, setProduto]     = useState(null)
  const [modelos, setModelos]     = useState([])
  const [loading, setLoading]     = useState(true)
  const [modalImg, setModalImg]   = useState(null)

  useEffect(() => {
    if (!id || !supabase) return

    const numId = Number(id)

    // Busca produto
    supabase
      .from('produtos')
      .select('*')
      .eq('id', numId)
      .single()
      .then(({ data }) => {
        if (data) setProduto(data)
        setLoading(false)
      })

    // Busca modelos prontos nas campanhas ativas
    supabase
      .from('campanhas')
      .select('images')
      .eq('active', true)
      .then(({ data }) => {
        const imgs = data
          ?.flatMap(c => c.images || [])
          .filter(img => img.product_id === numId)
          .map(img => img.url)
        setModelos(imgs || [])
      })
  }, [id])

  const handleOrder = () => {
    if (!produto) return
    const text = `👋 Olá! Tenho interesse no produto *${produto.nome}* e quero personalizá-lo! 🚀`
    window.open(`https://wa.me/5585981501747?text=${encodeURIComponent(text)}`, '_blank')
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#07071a' }}>
      <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
    </div>
  )

  if (!produto) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4" style={{ background: '#07071a' }}>
      <p className="text-white text-lg">Produto não encontrado.</p>
      <Link href="/produtos" className="text-purple-400 underline text-sm">← Voltar para produtos</Link>
    </div>
  )

  const preco = produto.preco ? `R$ ${Number(produto.preco).toFixed(2).replace('.', ',')}` : 'Sob consulta'

  return (
    <>
      <Head>
        <title>{produto.nome} — Cometa Personalização</title>
        <meta name="description" content={produto.descricao || produto.nome} />
      </Head>

      <div className="nebula-bg min-h-screen">
        <Navbar />

        <AnimatePresence>
          {modalImg && <ImageModal src={modalImg} onClose={() => setModalImg(null)} />}
        </AnimatePresence>

        <main className="pt-28 pb-20 px-4 max-w-5xl mx-auto">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-8">
            <Link href="/" className="hover:text-purple-400 transition-colors">Início</Link>
            <span>/</span>
            <Link href="/produtos" className="hover:text-purple-400 transition-colors">Produtos</Link>
            <span>/</span>
            <span className="text-gray-300">{produto.nome}</span>
          </div>

          {/* ── Produto principal ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="grid md:grid-cols-2 gap-10 mb-16"
          >
            {/* Imagem */}
            <div
              className="relative rounded-2xl overflow-hidden cursor-zoom-in"
              style={{ aspectRatio: '4/3', background: '#0f0f23', border: '1px solid rgba(139,92,246,0.15)' }}
              onClick={() => produto.imagem_url && setModalImg(produto.imagem_url)}
            >
              {produto.imagem_url ? (
                <img src={produto.imagem_url} alt={produto.nome} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-600 text-sm">Sem imagem</div>
              )}
            </div>

            {/* Info */}
            <div className="flex flex-col gap-5">
              {produto.badge && (
                <span className="self-start px-3 py-1 rounded-full text-xs font-bold text-white"
                  style={{ background: 'rgba(124,58,237,0.7)' }}>
                  {produto.badge}
                </span>
              )}

              <h1 className="text-3xl font-black text-white leading-tight">{produto.nome}</h1>

              {produto.descricao && (
                <p className="text-sm leading-relaxed" style={{ color: '#94a3b8' }}>{produto.descricao}</p>
              )}

              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-1">A partir de</p>
                <p className="text-3xl font-black" style={{ color: '#c4b5fd' }}>{preco}</p>
              </div>

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleOrder}
                className="flex items-center justify-center gap-2 w-full h-14 rounded-2xl font-bold text-white text-sm"
                style={{
                  background: 'linear-gradient(135deg, #7c3aed, #5b21b6)',
                  boxShadow: '0 4px 24px rgba(124,58,237,0.45)',
                }}
              >
                <WAIcon />
                Pedir no WhatsApp
              </motion.button>

              <Link
                href="/personalizar"
                className="flex items-center justify-center gap-2 w-full h-12 rounded-2xl font-bold text-sm transition-all"
                style={{ border: '1.5px solid rgba(139,92,246,0.4)', color: '#c4b5fd' }}
              >
                Personalizar agora →
              </Link>
            </div>
          </motion.div>

          {/* ── Modelos prontos ── */}
          {modelos.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div style={{
                  width: '4px', height: '40px', borderRadius: '4px', flexShrink: 0,
                  background: 'linear-gradient(to bottom, #a855f7, #6366f1)',
                  boxShadow: '0 0 14px rgba(168,85,247,0.7)',
                }} />
                <div>
                  <p className="text-[10px] font-bold tracking-widest uppercase text-gray-500">Inspiração</p>
                  <h2 className="text-xl font-black text-white">Modelos prontos</h2>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {modelos.map((url, i) => (
                  <motion.button
                    key={i}
                    onClick={() => setModalImg(url)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="group relative overflow-hidden rounded-xl"
                    style={{ aspectRatio: '1/1', border: '1px solid rgba(255,255,255,0.06)' }}
                  >
                    <img src={url} alt="" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200
                                    flex items-center justify-center"
                      style={{ background: 'rgba(124,58,237,0.45)' }}>
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

        </main>

        <Footer />
        <FloatingButtons />
      </div>
    </>
  )
}
