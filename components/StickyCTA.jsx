import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

export default function StickyCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 620)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 280, damping: 26 }}
          className="sticky-cta-bar"
        >
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">

            {/* Trust signals — desktop only */}
            <div className="hidden md:flex items-center gap-5 flex-shrink-0">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold" style={{ color: '#facc15' }}>
                <svg width="11" height="11" fill="#facc15" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                ★ 4.9 · +500 pedidos
              </span>
              <span className="w-px h-4 bg-white/10" />
              <span className="inline-flex items-center gap-1.5 text-xs font-bold" style={{ color: '#6ee7b7' }}>
                <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
                </svg>
                Compra segura
              </span>
              <span className="w-px h-4 bg-white/10" />
              <span className="text-xs font-semibold" style={{ color: '#94a3b8' }}>
                Entrega 5–7 dias úteis
              </span>
            </div>

            {/* Progress hint — mobile */}
            <div className="md:hidden flex items-center gap-2">
              <span className="text-xs" style={{ color: '#6b7280' }}>
                Veja como fica em 3D →
              </span>
            </div>

            {/* CTA Button */}
            <Link href="/personalizar" className="ml-auto flex-shrink-0">
              <motion.div
                whileHover={{ scale: 1.05, boxShadow: '0 0 36px rgba(236,72,153,0.65)' }}
                whileTap={{ scale: 0.97 }}
                className="relative overflow-hidden inline-flex items-center gap-2 text-white font-black uppercase tracking-widest cursor-pointer btn-cta-vibrant"
                style={{ padding: '11px 26px', borderRadius: '12px', fontSize: '13px' }}
              >
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'linear-gradient(105deg, transparent 25%, rgba(255,255,255,0.15) 50%, transparent 75%)' }}
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 3 }}
                />
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>
                </svg>
                CRIAR MINHA ESTAMPA
              </motion.div>
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
