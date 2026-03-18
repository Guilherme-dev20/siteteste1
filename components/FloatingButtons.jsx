import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const WHATSAPP_NUMBER = '5585987208308'
const INSTAGRAM_URL = 'https://instagram.com/cometapersonalizacao'

function WhatsAppSVG() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.555 4.122 1.524 5.855L0 24l6.335-1.498C8.05 23.447 9.99 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818c-1.898 0-3.667-.514-5.177-1.409l-.371-.22-3.76.889.902-3.666-.242-.382A9.787 9.787 0 012.182 12C2.182 6.58 6.58 2.182 12 2.182S21.818 6.58 21.818 12 17.42 21.818 12 21.818z" />
    </svg>
  )
}

function InstagramSVG() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  )
}

const WA_HREF = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Olá! Vim pelo site Cometa Personalização e gostaria de fazer um pedido.')}`

export default function FloatingButtons() {
  const [tooltip, setTooltip] = useState(null)
  const [footerVisible, setFooterVisible] = useState(false)

  useEffect(() => {
    const footer = document.querySelector('footer')
    if (!footer) return
    const obs = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { threshold: 0.1 }
    )
    obs.observe(footer)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      className={`fixed bottom-5 right-4 sm:bottom-6 sm:right-6 flex flex-col items-end gap-2 sm:gap-3 z-50 transition-all duration-300 ${
        footerVisible ? 'opacity-0 pointer-events-none translate-y-4' : 'opacity-100 translate-y-0'
      }`}
    >
      {/* Mobile: WhatsApp FAB com texto */}
      <motion.a
        href={WA_HREF}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, type: 'spring' }}
        whileTap={{ scale: 0.95 }}
        aria-label="Pedir agora no WhatsApp"
        className="sm:hidden flex items-center gap-2 text-white font-bold text-sm"
        style={{
          background: '#25D366',
          borderRadius: '99px',
          padding: '12px 20px',
          boxShadow: '0 4px 20px rgba(37,211,102,0.45)',
        }}
      >
        <WhatsAppSVG />
        Pedir agora
      </motion.a>

      {/* Desktop: ícones circulares */}
      {[
        {
          id: 'whatsapp',
          label: 'Falar no WhatsApp',
          href: WA_HREF,
          bg: '#25D366',
          shadow: '0 0 20px rgba(37,211,102,0.5)',
          Icon: WhatsAppSVG,
        },
        {
          id: 'instagram',
          label: 'Seguir no Instagram',
          href: INSTAGRAM_URL,
          bg: 'linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
          shadow: '0 0 20px rgba(225,48,108,0.5)',
          Icon: InstagramSVG,
        },
      ].map((btn, i) => (
        <motion.div
          key={btn.id}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 + i * 0.1, type: 'spring' }}
          className="relative hidden sm:flex items-center justify-end"
        >
          <AnimatePresence>
            {tooltip === btn.id && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="absolute right-14 text-white text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap pointer-events-none"
                style={{ background: '#0d0d1a', border: '1px solid rgba(168,85,247,0.3)' }}
              >
                {btn.label}
              </motion.div>
            )}
          </AnimatePresence>
          <motion.a
            href={btn.href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={() => setTooltip(btn.id)}
            onMouseLeave={() => setTooltip(null)}
            style={{ background: btn.bg, boxShadow: btn.shadow }}
            className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-300"
            aria-label={btn.label}
          >
            <btn.Icon />
          </motion.a>
        </motion.div>
      ))}
    </div>
  )
}
