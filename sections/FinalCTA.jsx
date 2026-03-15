import Link from 'next/link'
import { motion } from 'framer-motion'

const guarantees = [
  { icon: '✓', text: 'Grátis, sem cadastro' },
  { icon: '✓', text: 'Design pronto em 5 min' },
  { icon: '✓', text: 'Refazemos se precisar' },
]

export default function FinalCTA() {
  return (
    <section
      className="py-24 px-4 md:px-8 relative overflow-hidden text-center"
      style={{ background: '#09091a' }}
    >
      {/* Glow backdrop */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[600px] h-[400px] bg-purple-700/10 rounded-full blur-[100px]" />
      </div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-20 bg-gradient-to-b from-purple-500/30 to-transparent pointer-events-none" />

      <div className="max-w-2xl mx-auto relative z-10">

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="section-label"
        >
          ✦ COMECE AGORA ✦
        </motion.p>

        {/* Headline — focada no resultado, sem jargão */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display font-black uppercase leading-tight mb-4"
          style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)' }}
        >
          <span className="text-white">Seu produto</span>
          <br />
          <span
            className="text-transparent bg-clip-text"
            style={{ backgroundImage: 'linear-gradient(135deg, #c084fc 0%, #8b5cf6 60%, #6366f1 100%)' }}
          >
            personalizado agora
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="leading-relaxed mb-10 max-w-md mx-auto"
          style={{ color: '#94a3b8', fontSize: '16px' }}
        >
          Escolha o produto, adicione sua arte ou texto, veja em 3D como vai ficar
          e mande o pedido pelo WhatsApp — tudo em menos de 5 minutos.
        </motion.p>

        {/* CTA com shine */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.28, type: 'spring', stiffness: 200 }}
          className="mb-6"
        >
          <Link href="/personalizar">
            <motion.div
              whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(139,92,246,0.65)' }}
              whileTap={{ scale: 0.97 }}
              className="relative overflow-hidden inline-flex items-center gap-3 text-white font-black text-base px-10 py-5 rounded-2xl uppercase tracking-wider cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
                boxShadow: '0 0 36px rgba(139,92,246,0.45), 0 1px 0 rgba(255,255,255,0.15) inset',
              }}
            >
              {/* Shine sweep */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.12) 50%, transparent 70%)' }}
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 2.5, ease: 'easeInOut' }}
              />
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>
              </svg>
              Personalizar Meu Produto
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </motion.div>
          </Link>
        </motion.div>

        {/* Guarantees inline */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap justify-center gap-x-6 gap-y-2"
        >
          {guarantees.map((g, i) => (
            <span key={i} style={{ color: '#4b5563', fontSize: '13px', fontWeight: 500 }}>
              <span style={{ color: '#7c3aed', marginRight: '4px' }}>{g.icon}</span>
              {g.text}
            </span>
          ))}
        </motion.div>

        {/* Guarantee badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="inline-flex items-center gap-2.5 mt-8 px-5 py-3 rounded-2xl"
          style={{
            background: 'rgba(52,211,153,0.07)',
            border: '1px solid rgba(52,211,153,0.2)',
          }}
        >
          <svg width="16" height="16" fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/>
            <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/>
          </svg>
          <span style={{ color: '#6ee7b7', fontSize: '13px', fontWeight: 600 }}>
            Garantia de satisfação — refazemos sem custo adicional se necessário
          </span>
        </motion.div>

      </div>
    </section>
  )
}
