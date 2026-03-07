import Link from 'next/link'
import { motion } from 'framer-motion'
import ThemeCard from '../components/ThemeCard'
import { themes } from '../data/themes'

export default function Themes() {
  return (
    <section className="py-24 px-4 md:px-8 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-nebula-violet/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-64 h-64 bg-nebula-pink/4 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 mb-3"
          >
            <div className="w-8 h-0.5 bg-nebula-purple rounded-full" />
            <span className="text-nebula-purple text-sm font-semibold uppercase tracking-widest">
              Catálogo
            </span>
            <div className="w-8 h-0.5 bg-nebula-purple rounded-full" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title"
          >
            Explore por Temas
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="section-subtitle"
          >
            Do universo dos heróis às galáxias distantes — há um tema para cada estilo
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
          {themes.slice(0, 6).map((theme, i) => (
            <Link key={theme.id} href={`/temas`}>
              <ThemeCard theme={theme} index={i} />
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link href="/temas">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="btn-outline inline-flex items-center gap-2"
            >
              <span>Ver todos os temas</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </motion.div>
          </Link>
        </div>
      </div>
    </section>
  )
}
