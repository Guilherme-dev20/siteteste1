import Link from 'next/link'
import { motion } from 'framer-motion'

const steps = [
  {
    number: '01',
    icon: '🎨',
    title: 'Acesse o Editor 3D',
    description: 'Abra nossa ferramenta de personalização e veja sua camisa em 3D, rotacionando em tempo real.',
  },
  {
    number: '02',
    icon: '✏️',
    title: 'Personalize',
    description: 'Escolha a cor, faça upload da sua arte, adicione textos e posicione onde quiser.',
  },
  {
    number: '03',
    icon: '📱',
    title: 'Envie pelo WhatsApp',
    description: 'Clique em "Enviar Pedido" e uma mensagem automática será enviada para nós com todos os detalhes.',
  },
  {
    number: '04',
    icon: '📦',
    title: 'Receba em Casa',
    description: 'Produzimos e entregamos seu produto personalizado direto na sua porta.',
  },
]

export default function HowItWorks() {
  return (
    <section className="py-24 px-4 md:px-8 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                        w-[800px] h-[400px] bg-nebula-purple/4 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 mb-3"
          >
            <div className="w-8 h-0.5 bg-nebula-purple rounded-full" />
            <span className="text-nebula-purple text-sm font-semibold uppercase tracking-widest">
              Como Funciona
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
            Do Clique ao Produto
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

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative"
            >
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-full w-full h-0.5
                                bg-gradient-to-r from-nebula-purple/40 to-transparent z-0 -translate-y-1/2" />
              )}

              <div className="card-glass rounded-2xl p-6 relative z-10 group
                             hover:border-nebula-purple/50 hover:shadow-purple-glow transition-all duration-300">
                {/* Step number */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-5xl">{step.icon}</span>
                  <span className="font-display font-black text-4xl text-nebula-purple/20
                                   group-hover:text-nebula-purple/40 transition-colors duration-300">
                    {step.number}
                  </span>
                </div>

                <h3 className="text-white font-semibold text-lg mb-2 font-display">
                  {step.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Final CTA */}
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
              <span>☄️</span>
              <span>Começar a Personalizar</span>
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
