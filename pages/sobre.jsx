import Head from 'next/head'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import FloatingButtons from '../components/FloatingButtons'

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
}

const stats = [
  { value: '500+', label: 'Pedidos Entregues' },
  { value: '98%', label: 'Clientes Satisfeitos' },
  { value: '50+', label: 'Modelos Disponíveis' },
  { value: '3', label: 'Anos de Experiência' },
]

const values = [
  {
    icon: '✨',
    title: 'Qualidade Premium',
    description: 'Usamos materiais de alta qualidade para garantir durabilidade e satisfação.',
  },
  {
    icon: '🚀',
    title: 'Entrega Rápida',
    description: 'Produção ágil e entrega para todo o Brasil com rastreamento.',
  },
  {
    icon: '🎨',
    title: 'Arte Exclusiva',
    description: 'Cada produto é personalizado de forma única para você.',
  },
  {
    icon: '💬',
    title: 'Atendimento Humano',
    description: 'Suporte direto via WhatsApp, sem chatbots ou filas de espera.',
  },
]

export default function Sobre() {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="nebula-bg min-h-screen"
    >
      <Head>
        <title>Sobre Nós - Cometa Personalização</title>
      </Head>

      <Navbar />

      <main className="pt-28 pb-20 px-4 md:px-8 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.1 }}
            className="text-8xl mb-6"
          >
            ☄️
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="section-title"
          >
            Nossa História
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="section-subtitle max-w-3xl mx-auto mt-4"
          >
            A Cometa Personalização nasceu da paixão por criar produtos únicos que expressam
            a personalidade de cada cliente. Como cometas que cruzam o universo deixando
            um rastro inesquecível, nossos produtos marcam momentos especiais.
          </motion.p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card-glass rounded-2xl p-6 text-center neon-border"
            >
              <p className="text-4xl font-bold text-gradient font-display">{stat.value}</p>
              <p className="text-gray-400 text-sm mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Values */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold font-display text-center text-white mb-10">
            Nossos Valores
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((val, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card-glass rounded-2xl p-8 flex gap-5 hover:border-nebula-purple/50 transition-all duration-300"
              >
                <div className="text-4xl flex-shrink-0">{val.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{val.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{val.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card-glass rounded-3xl p-12 text-center neon-border"
        >
          <h2 className="text-3xl font-bold font-display text-white mb-4">
            Pronto para criar algo incrível?
          </h2>
          <p className="text-gray-400 mb-8">
            Use nosso editor 3D ou fale diretamente conosco pelo WhatsApp.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/personalizar" className="btn-primary">
              Personalizar Agora
            </a>
            <a
              href="https://wa.me/5585981501747?text=Olá, vim pelo site Cometa Personalização e gostaria de saber mais!"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              Falar no WhatsApp
            </a>
          </div>
        </motion.div>
      </main>

      <Footer />
      <FloatingButtons />
    </motion.div>
  )
}
