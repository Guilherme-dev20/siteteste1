import Link from 'next/link'
import { motion } from 'framer-motion'
import ThemeCard from '../components/ThemeCard'
import { themes } from '../data/themes'

export default function Themes() {
  const list = themes.slice(0, 6)

  return (
    <section className="py-24 px-4 md:px-8 relative overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-[500px] h-[400px] bg-violet-900/8 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-purple-800/6 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto relative">

        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-10">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 mb-3"
            >
              <div className="w-6 h-[2px] bg-nebula-purple rounded-full" />
              <span className="text-nebula-purple text-[10px] font-bold uppercase tracking-[0.35em]">
                Catálogo / 06
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-display font-black text-white uppercase leading-none"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
            >
              Navegue por
              <br />
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(135deg, #a855f7, #ec4899)' }}
              >
                Temas
              </span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:max-w-[220px] md:pt-12"
          >
            <p className="text-gray-500 text-sm leading-relaxed mb-4">
              Escolha um tema e explore os produtos disponíveis para personalizar
            </p>
            <Link href="/temas">
              <motion.span
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="btn-outline text-xs px-5 py-2 inline-flex items-center gap-2 whitespace-nowrap"
              >
                Ver todos
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </motion.span>
            </Link>
          </motion.div>
        </div>

        {/* ── Mobile: chips com scroll horizontal ── */}
        <div className="md:hidden overflow-x-auto scrollbar-none -mx-4 px-4 pb-4">
          <div className="flex gap-3" style={{ width: 'max-content' }}>
            {list.map((theme) => (
              <Link key={theme.id} href="/temas" aria-label={`Ver tema ${theme.name}`}>
                <div
                  className="flex items-center gap-2 whitespace-nowrap cursor-pointer"
                  style={{
                    background: `${theme.color}18`,
                    border: `1px solid ${theme.color}45`,
                    borderRadius: '99px',
                    padding: '10px 16px',
                  }}
                >
                  <span role="img" aria-hidden="true">{theme.icon}</span>
                  <span className="text-white text-sm font-semibold">{theme.name}</span>
                  <span className="text-gray-500 text-xs">· {theme.count}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ── Desktop: Bento Grid ──
              Row 1: [  featured — col-span-2  ] [ card 1 ]
              Row 2: [ card 2 ] [ card 3 ] [ card 4 ]
              Row 3: [ card 5 ]
        */}
        <div className="hidden md:grid md:grid-cols-3 gap-3">

          {/* Featured — spans 2 cols */}
          <div className="md:col-span-2">
            <Link href="/temas">
              <ThemeCard theme={list[0]} index={0} total={list.length} featured />
            </Link>
          </div>

          {/* Card 1 */}
          <div>
            <Link href="/temas">
              <ThemeCard theme={list[1]} index={1} total={list.length} />
            </Link>
          </div>

          {/* Row 2: 3 equal cards */}
          {list.slice(2, 5).map((theme, i) => (
            <div key={theme.id}>
              <Link href="/temas">
                <ThemeCard theme={theme} index={i + 2} total={list.length} />
              </Link>
            </div>
          ))}

          {/* Last card alone */}
          <div>
            <Link href="/temas">
              <ThemeCard theme={list[5]} index={5} total={list.length} />
            </Link>
          </div>
        </div>

      </div>
    </section>
  )
}
