import { motion } from 'framer-motion'

const TESTIMONIALS = [
  {
    name: 'Lucas Andrade',
    city: 'Fortaleza, CE',
    avatar: 'LA',
    color: '#7c3aed',
    product: 'Camisa Galáxia',
    stars: 5,
    text: 'Ficou incrível! A qualidade da estampa superou minha expectativa. Fiz o pedido pelo WhatsApp e em menos de uma semana estava na minha mão.',
  },
  {
    name: 'Fernanda Souza',
    city: 'Caucaia, CE',
    avatar: 'FS',
    color: '#db2777',
    product: 'Caneca Personalizada',
    stars: 5,
    text: 'Presentei minha mãe no aniversário dela e ela amou. A arte ficou exatamente como eu pedi, super atenciosos no atendimento.',
  },
  {
    name: 'Rafael Lima',
    city: 'Maracanaú, CE',
    avatar: 'RL',
    color: '#0891b2',
    product: 'Camisa Dragon Ball',
    stars: 5,
    text: 'Comprei uma camisa do Dragon Ball e o resultado foi perfeito. Cor vibrante, tecido ótimo. Já indiquei para todos os amigos!',
  },
  {
    name: 'Juliana Costa',
    city: 'Eusébio, CE',
    avatar: 'JC',
    color: '#059669',
    product: 'Copo Naruto',
    stars: 5,
    text: 'Atendimento super rápido e o produto chegou bem embalado. Vou pedir mais coisas com certeza. Recomendo muito!',
  },
  {
    name: 'Mateus Ferreira',
    city: 'Fortaleza, CE',
    avatar: 'MF',
    color: '#d97706',
    product: 'Camisa Minecraft',
    stars: 5,
    text: 'Fiz para o aniversário do meu filho de 8 anos — ele ficou feliz demais! A estampa é de altíssima qualidade, não desbotou nem um pouco.',
  },
  {
    name: 'Carla Mendes',
    city: 'Pacatuba, CE',
    avatar: 'CM',
    color: '#7c3aed',
    product: 'Xícara Mágica',
    stars: 5,
    text: 'Produto lindo demais! A xícara personalizada com a foto da família ficou perfeita. Entrega rápida e atendimento humanizado.',
  },
  {
    name: 'Bruno Oliveira',
    city: 'Fortaleza, CE',
    avatar: 'BO',
    color: '#dc2626',
    product: 'Camisa Homem-Aranha',
    stars: 5,
    text: 'Cara, essa camisa é top demais. Comprei pra mim mesmo e já quero mais. A qualidade da impressão é nível outro.',
  },
  {
    name: 'Aline Torres',
    city: 'Caucaia, CE',
    avatar: 'AT',
    color: '#0284c7',
    product: 'Caneca Batman',
    stars: 5,
    text: 'Dei de presente pro meu namorado e ele ficou apaixonado. Atendimento excelente, me ajudaram a escolher o melhor modelo!',
  },
  {
    name: 'Thiago Pinheiro',
    city: 'Fortaleza, CE',
    avatar: 'TP',
    color: '#4f46e5',
    product: 'Camisa Personalizada',
    stars: 5,
    text: 'Pedi uma camisa com a logo do meu negócio e ficou melhor do que imaginei. Profissionalismo do início ao fim.',
  },
  {
    name: 'Isabela Rocha',
    city: 'Horizonte, CE',
    avatar: 'IR',
    color: '#be185d',
    product: 'Copo Personalizado',
    stars: 5,
    text: 'Comprei para a formatura da turma inteira — foram 30 copos e todos ficaram perfeitos! Preço justo e entrega no prazo.',
  },
]

function Stars() {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

function TestimonialCard({ item }) {
  return (
    <div
      className="flex-shrink-0 w-[300px] sm:w-[320px] p-5 rounded-2xl flex flex-col gap-3"
      style={{
        background: 'linear-gradient(135deg, #0f0f24 0%, #0a0a18 100%)',
        border: '1px solid rgba(139,92,246,0.15)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
      }}
    >
      {/* Stars + product */}
      <div className="flex items-center justify-between">
        <Stars />
        <span
          className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
          style={{ background: 'rgba(139,92,246,0.12)', color: '#a78bfa' }}
        >
          {item.product}
        </span>
      </div>

      {/* Quote */}
      <p className="text-gray-300 text-sm leading-relaxed flex-1">
        &ldquo;{item.text}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 pt-2 border-t border-white/5">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs font-black"
          style={{ background: item.color }}
        >
          {item.avatar}
        </div>
        <div>
          <p className="text-white text-xs font-bold leading-none">{item.name}</p>
          <p className="text-gray-500 text-[10px] mt-0.5">{item.city}</p>
        </div>
        {/* Verified badge */}
        <div className="ml-auto flex items-center gap-1">
          <svg className="w-3.5 h-3.5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span className="text-[9px] text-green-400 font-bold">Verificado</span>
        </div>
      </div>
    </div>
  )
}

// Split into two rows
const row1 = TESTIMONIALS.slice(0, 5)
const row2 = TESTIMONIALS.slice(5, 10)

export default function Testimonials() {
  return (
    <section className="py-20 relative overflow-hidden" style={{ background: '#09091a' }}>
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[300px] bg-purple-900/8 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[250px] bg-violet-900/6 rounded-full blur-[80px]" />
      </div>

      <div className="relative">
        {/* Header */}
        <div className="text-center mb-12 px-4">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="section-label"
          >
            ✦ DEPOIMENTOS ✦
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display font-black uppercase leading-none mt-3 mb-4"
            style={{ fontSize: 'clamp(1.75rem,4.5vw,3rem)' }}
          >
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(135deg, #a855f7 0%, #6366f1 60%, #3b82f6 100%)' }}
            >
              O que nossos clientes
            </span>
            <br />
            <span className="text-white">estão dizendo</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-base max-w-md mx-auto leading-relaxed"
          >
            Mais de 200 clientes satisfeitos em toda a região.
          </motion.p>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-6 mt-6 px-6 py-3 rounded-2xl"
            style={{
              background: 'rgba(139,92,246,0.08)',
              border: '1px solid rgba(139,92,246,0.18)',
            }}
          >
            <div className="flex items-center gap-2">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-white font-black text-lg">4.9</span>
            </div>
            <div className="w-px h-5 bg-white/10" />
            <span className="text-gray-400 text-sm">+200 avaliações</span>
            <div className="w-px h-5 bg-white/10" />
            <span className="text-gray-400 text-sm">100% recomendariam</span>
          </motion.div>
        </div>

        {/* ── Marquee Row 1 — esquerda para direita ── */}
        <div className="relative mb-4" style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)' }}>
          <div
            className="flex gap-4"
            style={{
              width: 'max-content',
              animation: 'marquee-left 35s linear infinite',
            }}
          >
            {[...row1, ...row1].map((item, i) => (
              <TestimonialCard key={i} item={item} />
            ))}
          </div>
        </div>

        {/* ── Marquee Row 2 — direita para esquerda ── */}
        <div className="relative" style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)' }}>
          <div
            className="flex gap-4"
            style={{
              width: 'max-content',
              animation: 'marquee-right 40s linear infinite',
            }}
          >
            {[...row2, ...row2].map((item, i) => (
              <TestimonialCard key={i} item={item} />
            ))}
          </div>
        </div>
      </div>

      {/* Keyframes via style tag */}
      <style>{`
        @keyframes marquee-left {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
      `}</style>
    </section>
  )
}
