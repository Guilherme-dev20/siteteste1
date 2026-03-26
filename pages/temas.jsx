import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import FloatingButtons from '../components/FloatingButtons'
import { themes as localThemes } from '../data/themes'
import { supabase } from '../lib/supabase'

function mapTema(t) {
  return {
    id:          t.id,
    name:        t.nome,
    slug:        t.slug,
    icon:        t.icone || '🎨',
    color:       t.cor || '#8B5CF6',
    description: t.descricao || '',
    cover:       t.cover_url || `https://picsum.photos/seed/${t.slug}/600/400`,
    product_ids: t.product_ids || [],
  }
}

export default function Temas() {
  const router = useRouter()
  const [themes, setThemes] = useState(localThemes)

  useEffect(() => {
    if (!supabase) return
    supabase
      .from('temas')
      .select('*')
      .eq('ativo', true)
      .order('ordem')
      .then(({ data }) => {
        if (data?.length) setThemes(data.map(mapTema))
      })
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="nebula-bg min-h-screen"
    >
      <Head>
        <title>Temas — Cometa Personalização</title>
      </Head>
      <Navbar />

      <main className="pt-28 pb-24 px-4 max-w-7xl mx-auto">

        {/* ── Header ── */}
        <div className="mb-14">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }} className="flex items-start gap-4">
            <div style={{
              width: '4px', height: '56px', borderRadius: '4px', flexShrink: 0, marginTop: '4px',
              background: 'linear-gradient(to bottom, #a855f7, #6366f1)',
              boxShadow: '0 0 18px rgba(168,85,247,0.8)',
            }} />
            <div>
              <p style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '0.35em', textTransform: 'uppercase',
                           color: '#a855f7', marginBottom: '6px' }}>
                Coleções temáticas
              </p>
              <h1 className="font-black text-white leading-none"
                style={{ fontSize: 'clamp(2rem, 6vw, 3.2rem)', letterSpacing: '-0.03em' }}>
                Explore por Temas
              </h1>
              <p className="mt-2" style={{ fontSize: '15px', color: '#94a3b8', maxWidth: '480px' }}>
                Escolha um universo e veja os modelos disponíveis para personalizar
              </p>
            </div>
          </motion.div>
        </div>

        {/* ── Grid de temas ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {themes.map((theme, i) => (
            <motion.button
              key={theme.id}
              onClick={() => router.push(`/tema/${theme.slug}`)}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.97 }}
              className="relative overflow-hidden text-left"
              style={{
                borderRadius: '20px',
                height: '200px',
                border: `1px solid ${theme.color}35`,
                outline: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 24px rgba(0,0,0,0.45)',
                transition: 'box-shadow 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = `0 16px 48px ${theme.color}44, 0 4px 16px rgba(0,0,0,0.6)`
                e.currentTarget.style.border = `1px solid ${theme.color}80`
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.45)'
                e.currentTarget.style.border = `1px solid ${theme.color}35`
              }}
            >
              {/* Imagem de fundo */}
              <img
                src={theme.cover} alt={theme.name} loading="lazy"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ transition: 'transform 0.4s ease' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              />

              {/* Gradiente */}
              <div className="absolute inset-0" style={{
                background: `linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.45) 50%, transparent 100%)`,
              }} />

              {/* Barra de cor no topo */}
              <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: theme.color }} />

              {/* Conteúdo */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div style={{ fontSize: '24px', marginBottom: '4px', lineHeight: 1 }}>{theme.icon}</div>
                <p style={{ fontSize: '14px', fontWeight: 800, color: '#fff', lineHeight: 1.3, margin: 0 }}>
                  {theme.name}
                </p>
                {theme.description && (
                  <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', margin: '3px 0 0',
                               overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 1,
                               WebkitBoxOrient: 'vertical' }}>
                    {theme.description}
                  </p>
                )}
                {/* Pill "Ver modelos" */}
                <div className="mt-2 inline-flex items-center gap-1"
                  style={{ background: theme.color, borderRadius: '20px', padding: '3px 10px' }}>
                  <span style={{ fontSize: '10px', fontWeight: 700, color: '#fff', letterSpacing: '0.05em' }}>
                    Ver modelos →
                  </span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

      </main>

      <Footer />
      <FloatingButtons />
    </motion.div>
  )
}
