import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const BADGE = {
  'Mais Vendido': { bg: 'rgba(154,52,18,0.92)',  text: '#fed7aa', label: '🔥 Mais Vendido' },
  'Popular':      { bg: 'rgba(88,28,220,0.92)',  text: '#ede9fe', label: '⭐ Popular'      },
  'Novo':         { bg: 'rgba(6,78,59,0.92)',    text: '#bbf7d0', label: '✦ Novo'          },
}

function WAIcon() {
  return (
    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" className="flex-shrink-0">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.555 4.122 1.524 5.855L0 24l6.335-1.498C8.05 23.447 9.99 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818c-1.898 0-3.667-.514-5.177-1.409l-.371-.22-3.76.889.902-3.666-.242-.382A9.787 9.787 0 012.182 12C2.182 6.58 6.58 2.182 12 2.182S21.818 6.58 21.818 12 17.42 21.818 12 21.818z"/>
    </svg>
  )
}

function ProductModal({ product, price, badge, onClose, onOrder }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 9999,
          background: 'rgba(0,0,0,0.75)',
          backdropFilter: 'blur(6px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '16px',
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.93, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.93, y: 20 }}
          transition={{ type: 'spring', stiffness: 320, damping: 28 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            background: '#0f0f23',
            border: '1px solid rgba(139,92,246,0.25)',
            borderRadius: '20px',
            width: '100%',
            maxWidth: '480px',
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: '0 24px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(139,92,246,0.1)',
          }}
        >
          {/* Imagem */}
          <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', borderRadius: '20px 20px 0 0' }}>
            <img
              src={product.placeholder}
              alt={product.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 50%, rgba(15,15,35,0.8) 100%)' }} />

            {badge && (
              <span style={{
                position: 'absolute', top: '12px', left: '12px',
                background: badge.bg, color: badge.text,
                fontSize: '9px', fontWeight: 800, letterSpacing: '0.02em',
                padding: '3px 10px', borderRadius: '99px', backdropFilter: 'blur(4px)',
              }}>
                {badge.label}
              </span>
            )}

            {/* Fechar */}
            <button
              onClick={onClose}
              style={{
                position: 'absolute', top: '12px', right: '12px',
                width: '32px', height: '32px', borderRadius: '50%',
                background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)',
                border: '1px solid rgba(255,255,255,0.15)',
                color: '#fff', fontSize: '16px', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              ✕
            </button>
          </div>

          {/* Conteúdo */}
          <div style={{ padding: '20px 24px 24px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#eee9ff', margin: '0 0 10px' }}>
              {product.name}
            </h2>

            {product.description && (
              <p style={{ fontSize: '13px', color: '#9ca3af', lineHeight: 1.7, margin: '0 0 20px' }}>
                {product.description}
              </p>
            )}

            <div style={{ marginBottom: '20px' }}>
              <p style={{ fontSize: '9px', fontWeight: 600, color: '#6b7280', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '2px' }}>
                A partir de
              </p>
              <p style={{ fontSize: '26px', fontWeight: 900, color: '#c4b5fd', letterSpacing: '-0.02em', lineHeight: 1 }}>
                {price}
              </p>
            </div>

            <motion.button
              whileTap={{ scale: 0.96 }}
              whileHover={{ boxShadow: '0 6px 24px rgba(109,40,217,0.55)' }}
              onClick={onOrder}
              style={{
                width: '100%', height: '48px', borderRadius: '14px',
                background: 'linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)',
                boxShadow: '0 3px 14px rgba(109,40,217,0.35)',
                border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                gap: '8px', color: '#fff', fontSize: '13px', fontWeight: 700,
              }}
            >
              <WAIcon />
              Pedir no WhatsApp
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default function ProductCard({ product, index = 0 }) {
  const [modalOpen, setModalOpen] = useState(false)
  const badge = product.badge ? BADGE[product.badge] : null
  const price = product.price?.replace('A partir de ', '') ?? 'Sob consulta'

  const handleOrder = async () => {
    const text   = `👋 Olá! Tenho interesse no produto *${product.name}* e quero personalizá-lo! 🚀`
    const waUrl  = `https://wa.me/5585981501747?text=${encodeURIComponent(text)}`
    const imgSrc = product.placeholder || product.image

    // Mobile: Web Share API com imagem
    if (imgSrc && navigator.canShare) {
      try {
        const res  = await fetch(imgSrc)
        const blob = await res.blob()
        const file = new File([blob], `${product.name}.jpg`, { type: blob.type })
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({ files: [file], text })
          return
        }
      } catch {}
    }

    // Desktop: baixa a imagem e abre o WhatsApp
    if (imgSrc) {
      try {
        const res  = await fetch(imgSrc)
        const blob = await res.blob()
        const url  = URL.createObjectURL(blob)
        const a    = document.createElement('a')
        a.href     = url
        a.download = `${product.name}.jpg`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
        await new Promise((r) => setTimeout(r, 400))
      } catch {}
    }

    window.open(waUrl, '_blank')
  }

  return (
    <>
      {modalOpen && (
        <ProductModal
          product={product}
          price={price}
          badge={badge}
          onClose={() => setModalOpen(false)}
          onOrder={() => { setModalOpen(false); handleOrder() }}
        />
      )}

      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20px' }}
        transition={{ duration: 0.35, delay: index * 0.06 }}
        whileHover={{
          y: -4,
          boxShadow: '0 20px 50px rgba(109,40,217,0.25), 0 4px 16px rgba(0,0,0,0.5)',
          transition: { duration: 0.2 },
        }}
        className="flex flex-col h-full"
        style={{
          borderRadius: '18px',
          overflow: 'hidden',
          background: '#0f0f23',
          border: '1px solid rgba(139,92,246,0.14)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.45)',
        }}
      >
        {/* ── Imagem ── */}
        <div className="relative flex-shrink-0" style={{ aspectRatio: '4/3', overflow: 'hidden' }}>
          <motion.img
            src={product.placeholder}
            alt={product.name}
            className="w-full h-full object-cover"
            loading="lazy"
            whileHover={{ scale: 1.05, transition: { duration: 0.4 } }}
          />

          {/* Gradiente */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, transparent 50%, rgba(15,15,35,0.7) 100%)' }}
          />

          {/* Badge */}
          {badge && (
            <span
              className="absolute top-2.5 left-2.5 z-10 backdrop-blur-sm"
              style={{
                background: badge.bg,
                color: badge.text,
                fontSize: '9px',
                fontWeight: 800,
                letterSpacing: '0.02em',
                padding: '3px 8px',
                borderRadius: '99px',
              }}
            >
              {badge.label}
            </span>
          )}
        </div>

        {/* ── Conteúdo ── */}
        <div className="flex flex-col flex-1 p-4 gap-3">

          {/* Nome */}
          <h3
            style={{
              fontSize: '13px',
              fontWeight: 700,
              color: '#eee9ff',
              lineHeight: 1.4,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              margin: 0,
            }}
          >
            {product.name}
          </h3>

          {/* Descrição com "ver mais" */}
          {product.description && (
            <div>
              <p style={{
                fontSize: '11px',
                color: '#9ca3af',
                lineHeight: 1.5,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                margin: '0 0 2px',
              }}>
                {product.description}
              </p>
              <button
                onClick={() => setModalOpen(true)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontSize: '11px', color: '#7c3aed', fontWeight: 600,
                  padding: 0, textDecoration: 'underline',
                }}
              >
                ver mais
              </button>
            </div>
          )}

          {/* Preço */}
          <div className="mt-auto">
            <p style={{ fontSize: '9px', fontWeight: 600, color: '#6b7280', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '2px' }}>
              A partir de
            </p>
            <p style={{ fontSize: '20px', fontWeight: 900, color: '#c4b5fd', letterSpacing: '-0.02em', lineHeight: 1 }}>
              {price}
            </p>
          </div>

          {/* Botão */}
          <motion.button
            whileTap={{ scale: 0.96 }}
            whileHover={{ boxShadow: '0 6px 24px rgba(109,40,217,0.55)', transition: { duration: 0.15 } }}
            onClick={handleOrder}
            style={{
              width: '100%',
              height: '42px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)',
              boxShadow: '0 3px 14px rgba(109,40,217,0.35)',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              color: '#fff',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.02em',
              flexShrink: 0,
            }}
          >
            <WAIcon />
            Pedir no WhatsApp
          </motion.button>
        </div>
      </motion.article>
    </>
  )
}
