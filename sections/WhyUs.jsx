import { motion } from 'framer-motion'

// Inline SVG icons
function IconPalette() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/>
      <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/>
      <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/>
      <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/>
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 011.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
    </svg>
  )
}

function IconAward() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="6"/>
      <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
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

function IconZap() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  )
}

const differentials = [
  {
    Icon: IconPalette,
    title: 'O que você vê é o que chega',
    description: 'Nosso editor 3D mostra exatamente como vai ficar — cor, arte e posição. Sem surpresas, sem decepções na hora de receber.',
  },
  {
    Icon: IconAward,
    title: 'Estampa que dura lavagem',
    description: 'Impressão HD de alta fixação. As cores não desbotam nem descascam — garantimos qualidade em cada peça.',
  },
  {
    Icon: IconMessageCircle,
    title: 'Pedido em 1 mensagem',
    description: 'Criou o design? Clica em enviar. O pedido chega pra gente pelo WhatsApp com todos os detalhes — sem formulário, sem e-mail.',
  },
  {
    Icon: IconZap,
    title: 'Zero burocracia',
    description: 'Não precisa de conta, login ou cadastro. Entra, personaliza, pede. Em menos de 5 minutos o pedido está em produção.',
  },
]

export default function WhyUs() {
  return (
    <section className="py-24 px-4 md:px-8 relative overflow-hidden" style={{ background: '#0e0720' }}>
      {/* Background accent */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-900/6 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-800/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="section-label"
          >
            ✦ POR QUE ESCOLHER ✦
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title"
          >
            Por que clientes{' '}
            <span className="text-purple-400">voltam sempre</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="section-subtitle"
          >
            Qualidade, facilidade e atendimento que fazem a diferença na hora de personalizar.
          </motion.p>
        </div>

        {/* 4 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {differentials.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group p-6 transition-all duration-300 hover:shadow-[0_0_28px_rgba(168,85,247,0.2)]"
              style={{
                background: '#130b20',
                border: '1px solid rgba(168,85,247,0.22)',
                borderRadius: '16px',
              }}
            >
              {/* Icon */}
              <div
                className="w-12 h-12 mb-5 flex items-center justify-center text-purple-400 transition-colors duration-300 group-hover:text-purple-300"
                style={{ background: '#1a0a2e', borderRadius: '12px' }}
              >
                <item.Icon />
              </div>

              <h3 className="text-white font-bold text-base uppercase tracking-wide mb-3 font-display">
                {item.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
