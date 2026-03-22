import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import ProductCard from '../components/ProductCard'
import { supabase } from '../lib/supabase'

function mapProduto(p) {
  return {
    id:          p.id,
    name:        p.nome,
    category:    p.categoria || 'Produto',
    placeholder: p.imagem_url,
    badge:       p.badge || null,
    price:       p.preco ? `R$ ${Number(p.preco).toFixed(2).replace('.', ',')}` : 'Sob consulta',
    popular:     true,
    description: p.descricao,
  }
}

export default function FeaturedProducts() {
  const [featured, setFeatured] = useState([])

  useEffect(() => {
    if (!supabase) return
    supabase
      .from('produtos')
      .select('*')
      .eq('active', true)
      .eq('destaque', true)
      .limit(4)
      .then(({ data }) => { if (data) setFeatured(data.map(mapProduto)) })
  }, [])
  return (
    <section className="py-24 px-4 md:px-8 relative overflow-hidden">

      {/* Top fade bridge from Campaign section */}
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none z-10"
        style={{ height: '80px', background: 'linear-gradient(to bottom, rgba(10,10,15,0.6) 0%, transparent 100%)' }}
      />

      {/* Noise for depth */}
      <div className="noise-overlay" />

      {/* Background glow accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-purple-900/12 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[300px] bg-violet-900/8 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-0 w-[300px] h-[300px] bg-indigo-900/6 rounded-full blur-[80px]" />
      </div>

      <div className="max-w-7xl mx-auto relative">

        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-4"
            >
              <div style={{ width: '28px', height: '2px', background: 'linear-gradient(to right, #a855f7, #6366f1)', borderRadius: '2px' }} />
              <span style={{ color: '#a855f7', fontSize: '10px', fontWeight: 800, letterSpacing: '0.35em', textTransform: 'uppercase' }}>
                Mais Pedidos
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-display font-black uppercase leading-none mb-3"
              style={{ fontSize: 'clamp(2rem,5vw,3.25rem)' }}
            >
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(135deg, #c084fc 0%, #818cf8 55%, #60a5fa 100%)' }}
              >
                Produtos em
              </span>
              <br />
              <span className="text-white">Destaque</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gray-400 text-base max-w-md leading-relaxed"
            >
              Os produtos mais pedidos pelos nossos clientes — qualidade premium e entrega rápida.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            <Link href="/produtos">
              <motion.span
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="btn-outline text-sm px-6 py-2.5 inline-flex items-center gap-2 whitespace-nowrap"
              >
                Ver todos os produtos
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </motion.span>
            </Link>
          </motion.div>
        </div>

        {/* ── Mobile < 768px: lista vertical ── */}
        <div className="md:hidden flex flex-col gap-3">
          {featured.map((product) => (
            <Link key={product.id} href="/personalizar" aria-label={`Personalizar ${product.name}`}>
              <div
                className="flex items-center gap-4 p-4 rounded-2xl active:scale-[0.98] transition-transform duration-150"
                style={{ background: 'rgba(15,15,35,0.9)', border: '1px solid rgba(139,92,246,0.15)' }}
              >
                {product.placeholder ? (
                  <img
                    src={product.placeholder}
                    alt={product.name}
                    className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                    loading="lazy"
                  />
                ) : (
                  <div
                    className="w-20 h-20 rounded-xl flex-shrink-0 flex items-center justify-center"
                    style={{ background: 'rgba(139,92,246,0.15)' }}
                  >
                    <svg width="28" height="28" fill="none" stroke="#a855f7" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true">
                      <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
                    </svg>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-white font-bold text-base leading-tight truncate">{product.name}</p>
                  <p className="text-gray-400 text-sm truncate mt-0.5">{product.category}</p>
                  <p className="text-purple-400 font-bold text-sm mt-1">{product.price}</p>
                </div>
                <span className="text-purple-400 text-lg font-bold flex-shrink-0" aria-hidden="true">→</span>
              </div>
            </Link>
          ))}
        </div>

        {/* ── Tablet 768-1024px: scroll horizontal ── */}
        <div className="hidden md:flex lg:hidden gap-4 overflow-x-auto pb-3 -mx-4 px-4 scrollbar-none">
          {featured.map((product, i) => (
            <div key={product.id} className="flex-shrink-0 w-[240px]">
              <ProductCard product={product} index={i} />
            </div>
          ))}
        </div>

        {/* ── Desktop > 1024px: grid 4 colunas ── */}
        <div className="hidden lg:grid grid-cols-4 gap-5">
          {featured.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        {/* ── CTA Banner ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-16 relative overflow-hidden rounded-3xl p-8 md:p-12 flex flex-col md:flex-row
                     items-center justify-between gap-8"
          style={{
            background: 'linear-gradient(135deg, #0f0720 0%, #110d2e 50%, #0d0d1e 100%)',
            border: '1px solid rgba(139,92,246,0.25)',
            boxShadow: '0 0 60px rgba(139,92,246,0.08)',
          }}
        >
          {/* Glow orbs */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-purple-700/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-blue-700/10 rounded-full blur-3xl pointer-events-none" />

          {/* Left */}
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
              <span className="text-purple-400 text-xs font-bold uppercase tracking-widest">Personalizado</span>
            </div>
            <h3 className="font-display font-black text-white text-2xl md:text-3xl leading-tight mb-2">
              Crie seu produto
              <br />
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(135deg, #a855f7, #6366f1)' }}
              >
                personalizado
              </span>
            </h3>
            <p className="text-gray-400 text-sm max-w-sm leading-relaxed">
              Fale conosco no WhatsApp e criamos um produto exclusivo para você — sem complicação.
            </p>
          </div>

          {/* Right */}
          <motion.a
            href="https://wa.me/5585981501747?text=Olá! Gostaria de um produto personalizado que não vi no site."
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(139,92,246,0.45)' }}
            whileTap={{ scale: 0.97 }}
            className="relative z-10 flex items-center gap-3 text-white font-bold text-base
                       px-8 py-4 rounded-2xl whitespace-nowrap flex-shrink-0 transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
              boxShadow: '0 0 24px rgba(139,92,246,0.3)',
            }}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.555 4.122 1.524 5.855L0 24l6.335-1.498C8.05 23.447 9.99 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818c-1.898 0-3.667-.514-5.177-1.409l-.371-.22-3.76.889.902-3.666-.242-.382A9.787 9.787 0 012.182 12C2.182 6.58 6.58 2.182 12 2.182S21.818 6.58 21.818 12 17.42 21.818 12 21.818z" />
            </svg>
            Pedir Produto Personalizado
          </motion.a>
        </motion.div>

      </div>
    </section>
  )
}
