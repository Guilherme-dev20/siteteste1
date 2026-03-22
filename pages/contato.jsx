import Head from 'next/head'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import FloatingButtons from '../components/FloatingButtons'

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
}

const contactItems = [
  {
    icon: '📱',
    label: 'WhatsApp',
    value: '(11) 99999-9999',
    href: 'https://wa.me/5585981501747',
    color: '#25D366',
  },
  {
    icon: '📸',
    label: 'Instagram',
    value: '@cometapersonalizacao',
    href: 'https://instagram.com/cometapersonalizacao',
    color: '#E1306C',
  },
  {
    icon: '📧',
    label: 'E-mail',
    value: 'contato@cometapersonalizacao.com',
    href: 'mailto:contato@cometapersonalizacao.com',
    color: '#8B5CF6',
  },
]

export default function Contato() {
  const [form, setForm] = useState({ name: '', phone: '', message: '' })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleWhatsApp = () => {
    const text = `Olá! Sou ${form.name}${form.phone ? `, meu telefone é ${form.phone}` : ''}. ${form.message || 'Vim pelo site Cometa Personalização e gostaria de saber mais!'}`
    const url = `https://wa.me/5585981501747?text=${encodeURIComponent(text)}`
    window.open(url, '_blank')
  }

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="nebula-bg min-h-screen"
    >
      <Head>
        <title>Contato - Cometa Personalização</title>
      </Head>

      <Navbar />

      <main className="pt-28 pb-20 px-4 md:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="section-title"
          >
            Entre em Contato
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="section-subtitle"
          >
            Estamos aqui para ajudar! Fale com a gente pelo canal que preferir.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold font-display text-white mb-8">
              Canais de Atendimento
            </h2>

            {contactItems.map((item, i) => (
              <motion.a
                key={i}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                whileHover={{ x: 8, scale: 1.02 }}
                className="flex items-center gap-5 card-glass rounded-2xl p-6 group cursor-pointer"
                style={{ borderColor: `${item.color}30` }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ backgroundColor: `${item.color}20`, border: `1px solid ${item.color}40` }}
                >
                  {item.icon}
                </div>
                <div>
                  <p className="text-sm text-gray-500">{item.label}</p>
                  <p className="text-white font-semibold group-hover:text-nebula-purple transition-colors">
                    {item.value}
                  </p>
                </div>
              </motion.a>
            ))}

            <div className="card-glass rounded-2xl p-6 mt-8">
              <p className="text-gray-400 text-sm">
                <span className="text-nebula-purple font-semibold">Horário de atendimento:</span>
                <br />
                Segunda a Sexta: 9h às 18h
                <br />
                Sábado: 9h às 14h
              </p>
            </div>
          </motion.div>

          {/* Form / Quick Message */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="card-glass rounded-3xl p-8"
          >
            <h2 className="text-2xl font-bold font-display text-white mb-8">
              Enviar Mensagem Rápida
            </h2>

            <div className="space-y-5">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Seu nome</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Como podemos chamar você?"
                  className="w-full bg-space-dark border border-nebula-purple/30 text-white placeholder-gray-600
                             rounded-xl px-5 py-3 focus:outline-none focus:border-nebula-purple
                             focus:shadow-purple-glow transition-all duration-300"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">WhatsApp (opcional)</label>
                <input
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="(11) 99999-9999"
                  className="w-full bg-space-dark border border-nebula-purple/30 text-white placeholder-gray-600
                             rounded-xl px-5 py-3 focus:outline-none focus:border-nebula-purple
                             focus:shadow-purple-glow transition-all duration-300"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Mensagem</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Fale sobre o que você precisa..."
                  className="w-full bg-space-dark border border-nebula-purple/30 text-white placeholder-gray-600
                             rounded-xl px-5 py-3 focus:outline-none focus:border-nebula-purple
                             focus:shadow-purple-glow transition-all duration-300 resize-none"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleWhatsApp}
                className="w-full btn-primary flex items-center justify-center gap-3"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.555 4.122 1.524 5.855L0 24l6.335-1.498C8.05 23.447 9.99 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818c-1.898 0-3.667-.514-5.177-1.409l-.371-.22-3.76.889.902-3.666-.242-.382A9.787 9.787 0 012.182 12C2.182 6.58 6.58 2.182 12 2.182S21.818 6.58 21.818 12 17.42 21.818 12 21.818z" />
                </svg>
                Enviar pelo WhatsApp
              </motion.button>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
      <FloatingButtons />
    </motion.div>
  )
}
