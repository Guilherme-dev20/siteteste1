import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'Início', href: '/' },
  { label: 'Personalizar', href: '/personalizar' },
  { label: 'Produtos', href: '/produtos' },
]

// Comet SVG icon for logo
function CometIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="8" r="5" fill="#a855f7" />
      <line x1="17" y1="11" x2="2" y2="26" stroke="url(#cometGrad)" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="15" y1="13" x2="3" y2="24" stroke="url(#cometGrad2)" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
      <defs>
        <linearGradient id="cometGrad" x1="17" y1="11" x2="2" y2="26" gradientUnits="userSpaceOnUse">
          <stop stopColor="#a855f7"/>
          <stop offset="1" stopColor="#a855f7" stopOpacity="0"/>
        </linearGradient>
        <linearGradient id="cometGrad2" x1="15" y1="13" x2="3" y2="24" gradientUnits="userSpaceOnUse">
          <stop stopColor="#a855f7"/>
          <stop offset="1" stopColor="#a855f7" stopOpacity="0"/>
        </linearGradient>
      </defs>
    </svg>
  )
}

export default function Navbar() {
  const router = useRouter()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{
        background: 'rgba(10,10,15,0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'border-b border-purple-500/20 shadow-[0_0_20px_rgba(168,85,247,0.15)]' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <CometIcon />
          <div>
            <span className="font-display font-bold text-xl text-white">Cometa</span>
            <span className="font-display font-bold text-xl text-purple-400"> Personalização</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link text-sm ${
                router.pathname === link.href ? 'text-purple-400 after:w-full' : ''
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://wa.me/5585987208308?text=Olá! Gostaria de entrar em contato."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-sm px-5 py-2"
          >
            Falar no WhatsApp
          </a>
        </nav>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2 z-50"
          aria-label="Menu"
        >
          <motion.span
            animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0 }}
            className="block w-6 h-0.5 bg-white origin-center"
          />
          <motion.span
            animate={{ opacity: menuOpen ? 0 : 1 }}
            className="block w-6 h-0.5 bg-white"
          />
          <motion.span
            animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 }}
            className="block w-6 h-0.5 bg-white origin-center"
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ background: 'rgba(13,13,26,0.97)', backdropFilter: 'blur(16px)' }}
            className="md:hidden border-t border-purple-500/20 overflow-hidden"
          >
            <nav className="flex flex-col px-4 py-6 gap-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`block py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200
                      ${router.pathname === link.href
                        ? 'text-purple-400 bg-purple-500/10'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                      }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mt-4 px-4"
              >
                <a
                  href="https://wa.me/5585987208308?text=Olá! Gostaria de entrar em contato."
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="btn-primary w-full text-center text-sm block"
                >
                  Falar no WhatsApp
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
