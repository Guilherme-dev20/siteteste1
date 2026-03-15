import Link from 'next/link'
import { motion } from 'framer-motion'

export default function FinalCTA() {
  return (
    <section
      className="py-24 px-4 md:px-8 relative overflow-hidden text-center"
      style={{ background: '#0a0a0f' }}
    >
      {/* Glow backdrop */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[500px] h-[300px] bg-purple-700/12 rounded-full blur-[80px]" />
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="section-label"
        >
          ✦ PRONTO PARA COMEÇAR ✦
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="section-title mb-4"
        >
          Sua camisa <span className="text-purple-400">única</span> começa aqui
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 text-base md:text-lg leading-relaxed mb-10 max-w-xl mx-auto"
        >
          É grátis, sem cadastro e em poucos minutos você tem seu design pronto para pedir.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
        >
          <Link href="/personalizar">
            <motion.div
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 text-white font-black text-lg px-10 py-5 rounded-full uppercase tracking-wider transition-all duration-300"
              style={{
                background: '#6b21a8',
                boxShadow: '0 0 32px rgba(168,85,247,0.5), 0 0 60px rgba(168,85,247,0.2)',
              }}
            >
              ABRIR DESIGNER 3D
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
