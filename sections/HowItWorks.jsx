import Link from 'next/link'
import { motion } from 'framer-motion'

// Lucide-style SVG icons
function Icon3D() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5z"/>
      <path d="M2 17l10 5 10-5"/>
      <path d="M2 12l10 5 10-5"/>
    </svg>
  )
}
function IconPen() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9"/>
      <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>
    </svg>
  )
}
function IconMessageCircle() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
    </svg>
  )
}

const steps = [
  {
    number: '01',
    Icon: Icon3D,
    title: 'Acesse o Designer 3D',
    description: 'Abra nossa ferramenta de personalização e veja sua camisa em 3D, rotacionando em tempo real.',
  },
  {
    number: '02',
    Icon: IconPen,
    title: 'Personalize',
    description: 'Escolha a cor, faça upload da sua arte, adicione textos e posicione onde quiser.',
  },
  {
    number: '03',
    Icon: IconMessageCircle,
    title: 'Envie pelo WhatsApp',
    description: 'Clique em "Enviar Pedido" e uma mensagem automática será enviada para nós com todos os detalhes.',
  },
]

export default function HowItWorks() {
  return (
    <section className="py-24 px-4 md:px-8 relative overflow-hidden" style={{ background: '#0b0415' }}>
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                        w-[700px] h-[350px] bg-purple-900/6 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="section-label"
          >
            ✦ COMO FUNCIONA ✦
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title"
          >
            Do Clique ao <span className="text-purple-400">Produto</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="section-subtitle"
          >
            Simples, rápido e sem complicação
          </motion.p>
        </div>

        {/* Steps — 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="relative group"
            >
              {/* Connector */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-full w-full h-px z-0
                                bg-gradient-to-r from-purple-500/40 to-transparent -translate-y-1/2" />
              )}

              <div
                className="relative z-10 p-6 rounded-2xl transition-all duration-300
                           hover:shadow-[0_0_28px_rgba(168,85,247,0.25)]"
                style={{
                  background: '#130b20',
                  border: '1px solid rgba(168,85,247,0.25)',
                  borderRadius: '16px',
                }}
              >
                {/* Step number + icon row */}
                <div className="flex items-center justify-between mb-5">
                  {/* Icon in purple container */}
                  <div
                    className="purple-icon-container w-12 h-12"
                    style={{ borderRadius: '12px', background: '#1a0a2e' }}
                  >
                    <step.Icon />
                  </div>
                  {/* Step number */}
                  <span
                    className="font-mono font-black text-4xl text-purple-400/30 group-hover:text-purple-400/60 transition-colors duration-300"
                  >
                    {step.number}
                  </span>
                </div>

                <h3 className="text-white font-bold text-lg mb-2 font-display uppercase tracking-wide">
                  {step.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <Link href="/personalizar">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="btn-primary text-lg px-10 py-4 inline-flex items-center gap-3"
            >
              <span>COMEÇAR AGORA</span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
