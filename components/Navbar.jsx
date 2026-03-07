import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Produtos', href: '/produtos' },
  { label: 'Personalizar', href: '/personalizar' },
  { label: 'Temas', href: '/temas' },
  { label: 'Sobre', href: '/sobre' },
  { label: 'Contato', href: '/contato' },
]

export default function Navbar() {
  const router = useRouter()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [cometVisible, setCometVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', handleScroll)

    // Animate comet every 8 seconds
    const interval = setInterval(() => {
      setCometVisible(true)
      setTimeout(() => setCometVisible(false), 2000)
    }, 8000)

    setTimeout(() => {
      setCometVisible(true)
      setTimeout(() => setCometVisible(false), 2000)
    }, 1500)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearInterval(interval)
    }
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-space-black/90 backdrop-blur-md border-b border-nebula-purple/20 shadow-purple-glow'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 relative overflow-hidden">
          <div className="relative">
            {/* Comet animation */}
            <AnimatePresence>
              {cometVisible && (
                <motion.div
                  initial={{ x: -60, y: 10, opacity: 0 }}
                  animate={{ x: 80, y: -10, opacity: [0, 1, 0] }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                  className="absolute top-0 left-0 pointer-events-none z-10"
                >
                  <div className="relative">
                    <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_8px_#fff,0_0_16px_#a855f7]" />
                    <div className="absolute top-1/2 right-full -translate-y-1/2 w-12 h-0.5
                                    bg-gradient-to-l from-white/80 to-transparent rounded-full" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <span className="text-2xl">☄️</span>
          </div>
          <div>
            <span className="font-display font-bold text-xl text-white">
              Cometa
            </span>
            <span className="font-display font-bold text-xl text-gradient">
              {' '}Personalização
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link text-sm ${
                router.pathname === link.href
                  ? 'text-nebula-purple after:w-full'
                  : ''
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/personalizar"
            className="btn-primary text-sm px-5 py-2"
          >
            Personalizar
          </Link>
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
            className="md:hidden bg-space-dark/95 backdrop-blur-md border-t border-nebula-purple/20 overflow-hidden"
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
                        ? 'text-nebula-purple bg-nebula-purple/10'
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
                transition={{ delay: 0.3 }}
                className="mt-4 px-4"
              >
                <Link
                  href="/personalizar"
                  onClick={() => setMenuOpen(false)}
                  className="btn-primary w-full text-center text-sm block"
                >
                  Personalizar Agora
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
