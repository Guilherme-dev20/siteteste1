import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import ThemeCard from '../components/ThemeCard'
import { themes as localThemes } from '../data/themes'
import { supabase } from '../lib/supabase'

function mapTema(t) {
  return {
    id:          t.id,
    name:        t.nome,
    slug:        t.slug,
    icon:        t.icone || '🎨',
    color:       t.cor || '#8B5CF6',
    gradient:    'from-purple-600 to-pink-500',
    description: t.descricao || '',
    count:       t.count || 0,
    cover:       t.cover_url || `https://picsum.photos/seed/${t.slug}/600/400`,
  }
}

export default function Themes() {
  const [themes, setThemes] = useState(localThemes)

  useEffect(() => {
    if (!supabase) return
    supabase
      .from('temas')
      .select('*')
      .eq('ativo', true)
      .order('ordem')
      .then(({ data, error }) => {
        if (data?.length) setThemes(data.map(mapTema))
      })
  }, [])

  const list = themes.slice(0, 6)

  return (
    <section className="py-24 px-4 md:px-8 relative overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-[500px] h-[400px] bg-violet-900/8 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-purple-800/6 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto relative">

        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-10">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 mb-3"
            >
              <div className="w-6 h-[2px] bg-nebula-purple rounded-full" />
              <span className="text-nebula-purple text-[10px] font-bold uppercase tracking-[0.35em]">
                Catálogo / {String(themes.length).padStart(2, '0')}
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-display font-black text-white uppercase leading-none"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
            >
              Navegue por
              <br />
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(135deg, #a855f7, #ec4899)' }}
              >
                Temas
              </span>
            </motion.h2>

            {/* Subtítulo visível só no mobile, abaixo do título */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="md:hidden text-gray-500 text-sm mt-3 leading-relaxed"
            >
              Toque em um tema e veja os produtos disponíveis
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="hidden md:block md:max-w-[220px] md:pt-12"
          >
            <p className="text-gray-500 text-sm leading-relaxed mb-4">
              Escolha um tema e explore os produtos disponíveis para personalizar
            </p>
            <Link href="/temas">
              <motion.span
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="btn-outline text-xs px-5 py-2 inline-flex items-center gap-2 whitespace-nowrap"
              >
                Ver todos
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </motion.span>
            </Link>
          </motion.div>
        </div>

        {/* ── Mobile: Carrossel com snap scrolling ── */}
        <div className="md:hidden">
          {/* Dica de scroll */}
          <div className="flex items-center gap-2 mb-4 px-1">
            <div className="flex gap-1">
              {themes.slice(0, 5).map((_, i) => (
                <div key={i} className="rounded-full" style={{ width: i === 0 ? '18px' : '6px', height: '6px', background: i === 0 ? '#a855f7' : 'rgba(255,255,255,0.2)', transition: 'all 0.3s' }} />
              ))}
            </div>
            <span className="text-gray-500 text-xs">Deslize para ver mais</span>
          </div>

          {/* Carrossel */}
          <div
            className="flex gap-4 overflow-x-auto scrollbar-none pb-4 -mx-4 px-4"
            style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}
          >
            {themes.map((theme, i) => {
              const BADGES = ['🔥 Em alta', '⭐ Mais vendido', '✨ Novo', null, null, null, null]
              const badge = BADGES[i] ?? null
              return (
                <Link
                  key={theme.id}
                  href={`/temas?tema=${theme.slug}`}
                  aria-label={`Ver tema ${theme.name}`}
                  style={{ scrollSnapAlign: 'start', flexShrink: 0, width: '82vw', maxWidth: '300px' }}
                >
                  <motion.div
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-20px' }}
                    transition={{ duration: 0.4, delay: Math.min(i * 0.07, 0.25) }}
                    whileTap={{ scale: 0.97 }}
                    className="relative overflow-hidden"
                    style={{
                      height: '340px',
                      borderRadius: '24px',
                      border: `1.5px solid ${theme.color}55`,
                      boxShadow: `0 12px 40px ${theme.color}30, 0 2px 8px rgba(0,0,0,0.4)`,
                    }}
                  >
                    {/* Imagem */}
                    <img
                      src={theme.cover}
                      alt={theme.name}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover"
                      style={{ transform: 'scale(1.06)', transition: 'transform 0.4s' }}
                    />

                    {/* Overlay escuro duplo */}
                    <div
                      className="absolute inset-0"
                      style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.1) 100%)' }}
                    />
                    {/* Glow colorido no fundo */}
                    <div
                      className="absolute inset-0"
                      style={{ background: `radial-gradient(ellipse at bottom, ${theme.color}50 0%, transparent 65%)` }}
                    />

                    {/* Barra topo */}
                    <div
                      className="absolute top-0 left-0 right-0 h-[3px]"
                      style={{ background: `linear-gradient(90deg, ${theme.color}, ${theme.color}44)` }}
                    />

                    {/* Badge */}
                    {badge && (
                      <div
                        className="absolute top-4 left-4 flex items-center gap-1.5"
                        style={{
                          background: 'rgba(0,0,0,0.65)',
                          backdropFilter: 'blur(12px)',
                          borderRadius: '99px',
                          padding: '5px 12px',
                          border: `1px solid ${theme.color}70`,
                        }}
                      >
                        <span className="text-white text-[12px] font-bold">{badge}</span>
                      </div>
                    )}

                    {/* Conteúdo */}
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      {/* Emoji */}
                      <div className="text-4xl mb-3 drop-shadow-xl">{theme.icon}</div>

                      {/* Nome */}
                      <p
                        className="text-white font-black uppercase leading-tight mb-1.5"
                        style={{ fontSize: '22px', letterSpacing: '-0.01em', textShadow: '0 2px 12px rgba(0,0,0,0.6)' }}
                      >
                        {theme.name}
                      </p>

                      {/* Descrição */}
                      {theme.description && (
                        <p className="text-white/65 text-sm mb-4 line-clamp-1">{theme.description}</p>
                      )}

                      {/* CTA Button */}
                      <div
                        className="w-full flex items-center justify-center gap-2 font-black text-white text-sm uppercase tracking-wide"
                        style={{
                          background: `linear-gradient(135deg, ${theme.color} 0%, ${theme.color}bb 100%)`,
                          borderRadius: '14px',
                          height: '50px',
                          boxShadow: `0 6px 24px ${theme.color}55`,
                          letterSpacing: '0.06em',
                        }}
                      >
                        Explorar coleção
                        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              )
            })}

            {/* Card final — Ver todos */}
            <Link
              href="/temas"
              style={{ scrollSnapAlign: 'start', flexShrink: 0, width: '60vw', maxWidth: '220px' }}
            >
              <div
                className="relative overflow-hidden flex flex-col items-center justify-center gap-4 cursor-pointer"
                style={{
                  height: '340px',
                  borderRadius: '24px',
                  border: '1.5px solid rgba(168,85,247,0.3)',
                  background: 'linear-gradient(135deg, rgba(139,92,246,0.12) 0%, rgba(236,72,153,0.08) 100%)',
                }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(168,85,247,0.2)', border: '1.5px solid rgba(168,85,247,0.4)' }}
                >
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#a855f7">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                  </svg>
                </div>
                <div className="text-center px-4">
                  <p className="text-white font-black text-base">Ver todos</p>
                  <p className="text-gray-400 text-xs mt-1">{themes.length} temas disponíveis</p>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* ── Desktop: Bento Grid ── */}
        <div className="hidden md:grid md:grid-cols-3 gap-3">
          <div className="md:col-span-2">
            <Link href={`/temas?tema=${list[0]?.slug}`}>
              <ThemeCard theme={list[0]} index={0} total={list.length} featured />
            </Link>
          </div>
          <div>
            <Link href={`/temas?tema=${list[1]?.slug}`}>
              <ThemeCard theme={list[1]} index={1} total={list.length} />
            </Link>
          </div>
          {list.slice(2, 5).map((theme, i) => (
            <div key={theme.id}>
              <Link href={`/temas?tema=${theme.slug}`}>
                <ThemeCard theme={theme} index={i + 2} total={list.length} />
              </Link>
            </div>
          ))}
          {list[5] && (
            <div>
              <Link href={`/temas?tema=${list[5].slug}`}>
                <ThemeCard theme={list[5]} index={5} total={list.length} />
              </Link>
            </div>
          )}
        </div>

      </div>
    </section>
  )
}
