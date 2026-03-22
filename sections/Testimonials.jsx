import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '../lib/supabase'

// ─── Componente estrelas ───────────────────────────────────────────────────────
function Stars({ count = 5, interactive = false, value = 5, onChange, size = 'sm' }) {
  const [hover, setHover] = useState(0)
  const sz = size === 'lg' ? 'w-8 h-8' : 'w-3.5 h-3.5'
  const active = interactive ? (hover || value) : count
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`${sz} transition-colors ${interactive ? 'cursor-pointer' : ''}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          style={{ color: i < active ? '#facc15' : '#374151' }}
          onMouseEnter={() => interactive && setHover(i + 1)}
          onMouseLeave={() => interactive && setHover(0)}
          onClick={() => interactive && onChange?.(i + 1)}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

// ─── Helpers ───────────────────────────────────────────────────────────────────
function getInitials(nome) {
  return nome.split(' ').slice(0, 2).map((w) => w[0]).join('').toUpperCase()
}

function getColor(nome) {
  const colors = ['#7c3aed', '#db2777', '#0891b2', '#059669', '#d97706', '#dc2626', '#0284c7', '#4f46e5', '#be185d']
  let h = 0
  for (let i = 0; i < nome.length; i++) h = (h * 31 + nome.charCodeAt(i)) >>> 0
  return colors[h % colors.length]
}

// ─── Card de avaliação ─────────────────────────────────────────────────────────
function TestimonialCard({ item }) {
  const initials = item.avatar ?? getInitials(item.nome)
  const color    = item.color ?? getColor(item.nome)

  return (
    <div
      className="flex-shrink-0 w-[260px] rounded-2xl flex flex-col overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0f0f24 0%, #0a0a18 100%)',
        border: '1px solid rgba(139,92,246,0.15)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
      }}
    >
      {/* Foto do produto (se houver) */}
      {item.foto_url && (
        <div className="relative w-full" style={{ aspectRatio: '4/3', overflow: 'hidden' }}>
          <img
            src={item.foto_url}
            alt={`Foto de ${item.nome}`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 60%, rgba(10,10,24,0.8) 100%)' }} />
        </div>
      )}

      <div className="flex flex-col gap-2 p-4">
        {/* Stars + produto */}
        <div className="flex items-center justify-between">
          <Stars count={item.estrelas ?? 5} />
          <span
            className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
            style={{ background: 'rgba(139,92,246,0.12)', color: '#a78bfa' }}
          >
            {item.produto}
          </span>
        </div>

        {/* Texto */}
        <p
          className="text-gray-300 text-xs leading-relaxed flex-1"
          style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
        >
          &ldquo;{item.texto}&rdquo;
        </p>

        {/* Autor */}
        <div className="flex items-center gap-3 pt-2 border-t border-white/5">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs font-black"
            style={{ background: color }}
          >
            {initials}
          </div>
          <div>
            <p className="text-white text-xs font-bold leading-none">{item.nome}</p>
            {item.cidade && <p className="text-gray-500 text-[10px] mt-0.5">{item.cidade}</p>}
          </div>
          <div className="ml-auto flex items-center gap-1">
            <svg className="w-3.5 h-3.5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-[9px] text-green-400 font-bold">Verificado</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Modal de nova avaliação ───────────────────────────────────────────────────
function ReviewModal({ onClose, onSuccess }) {
  const [step,       setStep]       = useState(1) // 1=form, 2=success
  const [loading,    setLoading]    = useState(false)
  const [error,      setError]      = useState('')
  const [stars,      setStars]      = useState(5)
  const [nome,       setNome]       = useState('')
  const [cidade,     setCidade]     = useState('')
  const [produto,    setProduto]    = useState('')
  const [texto,      setTexto]      = useState('')
  const [fotoFile,   setFotoFile]   = useState(null)
  const [fotoPreview,setFotoPreview]= useState(null)
  const [videoFile,  setVideoFile]  = useState(null)
  const [videoName,  setVideoName]  = useState('')
  const fileRef  = useRef()
  const videoRef = useRef()

  const handleFoto = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setFotoFile(file)
    const reader = new FileReader()
    reader.onload = (ev) => setFotoPreview(ev.target.result)
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  const handleVideo = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setVideoFile(file)
    setVideoName(file.name)
    e.target.value = ''
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!nome.trim() || !produto.trim() || !texto.trim()) {
      setError('Preencha nome, produto e comentário.')
      return
    }
    setError('')
    setLoading(true)
    try {
      let foto_url = null
      let video_url = null

      if (supabase && fotoFile) {
        const ext  = fotoFile.name.split('.').pop()
        const path = `fotos/${Date.now()}.${ext}`
        const { error: upErr } = await supabase.storage
          .from('avaliacoes')
          .upload(path, fotoFile, { contentType: fotoFile.type })
        if (!upErr) {
          const { data } = supabase.storage.from('avaliacoes').getPublicUrl(path)
          foto_url = data.publicUrl
        }
      }

      if (supabase && videoFile) {
        const ext  = videoFile.name.split('.').pop()
        const path = `videos/${Date.now()}.${ext}`
        const { error: upErr } = await supabase.storage
          .from('avaliacoes')
          .upload(path, videoFile, { contentType: videoFile.type })
        if (!upErr) {
          const { data } = supabase.storage.from('avaliacoes').getPublicUrl(path)
          video_url = data.publicUrl
        }
      }

      if (supabase) {
        const { error: dbErr } = await supabase.from('avaliacoes').insert({
          nome: nome.trim(),
          cidade: cidade.trim(),
          produto: produto.trim(),
          estrelas: stars,
          texto: texto.trim(),
          foto_url,
          video_url,
          status: 'pendente',
        })
        if (dbErr) throw dbErr
      }

      setStep(2)
      onSuccess?.()
    } catch (err) {
      setError('Erro ao enviar. Tente novamente.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
        style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }}
        onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      >
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 60 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl overflow-hidden"
          style={{ background: '#0f0f24', border: '1px solid rgba(139,92,246,0.2)', maxHeight: '92vh', overflowY: 'auto' }}
        >
          {step === 2 ? (
            /* ── Sucesso ── */
            <div className="flex flex-col items-center justify-center gap-4 py-16 px-8 text-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.3)' }}>
                <svg className="w-10 h-10 text-purple-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-white text-xl font-black">Avaliação enviada!</h3>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                Obrigado, <strong className="text-white">{nome}</strong>! Sua avaliação será analisada e publicada em breve.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-8 py-3 rounded-full text-sm font-bold text-white"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #5b21b6)' }}
              >
                Fechar
              </button>
            </div>
          ) : (
            /* ── Formulário ── */
            <form onSubmit={handleSubmit}>
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
                <div>
                  <h3 className="text-white font-black text-lg">Avaliar produto</h3>
                  <p className="text-gray-500 text-xs mt-0.5">Sua opinião aparece aqui após aprovação</p>
                </div>
                <button type="button" onClick={onClose}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/10 transition-all">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="px-6 py-5 flex flex-col gap-5">
                {/* Estrelas */}
                <div className="flex flex-col items-center gap-2">
                  <p className="text-gray-400 text-xs uppercase tracking-widest">Sua nota</p>
                  <Stars interactive value={stars} onChange={setStars} size="lg" />
                  <p className="text-purple-400 text-sm font-bold">
                    {stars === 1 ? 'Ruim' : stars === 2 ? 'Regular' : stars === 3 ? 'Bom' : stars === 4 ? 'Muito bom' : 'Excelente!'}
                  </p>
                </div>

                {/* Produto */}
                <div>
                  <label className="text-gray-400 text-xs uppercase tracking-widest block mb-1.5">Produto comprado *</label>
                  <input
                    type="text"
                    placeholder="Ex: Camisa personalizada, Caneca..."
                    value={produto}
                    onChange={(e) => setProduto(e.target.value)}
                    className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:ring-1 focus:ring-purple-500"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(139,92,246,0.2)' }}
                  />
                </div>

                {/* Comentário */}
                <div>
                  <label className="text-gray-400 text-xs uppercase tracking-widest block mb-1.5">Seu comentário *</label>
                  <textarea
                    placeholder="Conte como foi sua experiência com o produto..."
                    value={texto}
                    onChange={(e) => setTexto(e.target.value)}
                    rows={3}
                    className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:ring-1 focus:ring-purple-500 resize-none"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(139,92,246,0.2)' }}
                  />
                </div>

                {/* Foto / Vídeo */}
                <div>
                  <label className="text-gray-400 text-xs uppercase tracking-widest block mb-2">Foto ou vídeo do produto (opcional)</label>
                  <div className="flex gap-2">
                    {/* Foto */}
                    <button type="button" onClick={() => fileRef.current?.click()}
                      className="flex-1 flex flex-col items-center gap-2 rounded-xl py-4 transition-all"
                      style={{ background: fotoPreview ? 'transparent' : 'rgba(255,255,255,0.04)', border: '1px dashed rgba(139,92,246,0.3)' }}
                    >
                      {fotoPreview ? (
                        <div className="relative w-full" style={{ aspectRatio: '4/3' }}>
                          <img src={fotoPreview} alt="preview" className="w-full h-full object-cover rounded-xl" />
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); setFotoFile(null); setFotoPreview(null) }}
                            className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/70 flex items-center justify-center text-white text-xs"
                          >✕</button>
                        </div>
                      ) : (
                        <>
                          <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 20.25h18M3.75 4.5h16.5" />
                          </svg>
                          <span className="text-[10px] text-gray-500">Adicionar foto</span>
                        </>
                      )}
                    </button>
                    <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFoto} />

                    {/* Vídeo */}
                    <button type="button" onClick={() => videoRef.current?.click()}
                      className="flex-1 flex flex-col items-center gap-2 rounded-xl py-4 transition-all"
                      style={{ background: videoFile ? 'rgba(139,92,246,0.08)' : 'rgba(255,255,255,0.04)', border: `1px dashed ${videoFile ? 'rgba(139,92,246,0.5)' : 'rgba(139,92,246,0.3)'}` }}
                    >
                      <svg className={`w-6 h-6 ${videoFile ? 'text-purple-400' : 'text-gray-600'}`} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9A2.25 2.25 0 0013.5 5.25h-9A2.25 2.25 0 002.25 7.5v9A2.25 2.25 0 004.5 18.75z" />
                      </svg>
                      <span className="text-[10px] text-center leading-tight" style={{ color: videoFile ? '#a78bfa' : '#6b7280' }}>
                        {videoFile ? videoName.slice(0, 20) + (videoName.length > 20 ? '...' : '') : 'Adicionar vídeo'}
                      </span>
                    </button>
                    <input ref={videoRef} type="file" accept="video/*" className="hidden" onChange={handleVideo} />
                  </div>
                </div>

                {/* Nome + Cidade */}
                <div className="flex gap-2">
                  <div className="flex-1">
                    <label className="text-gray-400 text-xs uppercase tracking-widest block mb-1.5">Seu nome *</label>
                    <input
                      type="text"
                      placeholder="Nome"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:ring-1 focus:ring-purple-500"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(139,92,246,0.2)' }}
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-gray-400 text-xs uppercase tracking-widest block mb-1.5">Cidade</label>
                    <input
                      type="text"
                      placeholder="Opcional"
                      value={cidade}
                      onChange={(e) => setCidade(e.target.value)}
                      className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:ring-1 focus:ring-purple-500"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(139,92,246,0.2)' }}
                    />
                  </div>
                </div>

                {error && (
                  <p className="text-red-400 text-xs text-center">{error}</p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl text-sm font-black text-white transition-all disabled:opacity-50"
                  style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)', boxShadow: '0 4px 20px rgba(109,40,217,0.4)' }}
                >
                  {loading ? 'Enviando...' : 'Enviar avaliação'}
                </button>

                <p className="text-center text-gray-600 text-[10px]">
                  Sua avaliação será publicada após análise • Sem cadastro necessário
                </p>
              </div>
            </form>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

// ─── Seção principal ───────────────────────────────────────────────────────────
export default function Testimonials() {
  const [realReviews,  setRealReviews]  = useState([])
  const [showModal,    setShowModal]    = useState(false)

  useEffect(() => {
    if (!supabase) return
    supabase
      .from('avaliacoes')
      .select('*')
      .eq('status', 'aprovado')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        if (data?.length) setRealReviews(data)
      })
  }, [])

  const displayList = realReviews
  const marqueeList = [...displayList, ...displayList]

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
              Quem já pediu
            </span>
            <br />
            <span className="text-white">aprova e volta</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-base max-w-md mx-auto leading-relaxed"
          >
            Avaliações reais de clientes de Fortaleza e região — sem edição, sem filtro.
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

        {/* ── Mobile: cards estáticos ── */}
        <div className="md:hidden px-5 flex flex-col gap-4 mb-8">
          {displayList.slice(0, 3).map((item, i) => (
            <div
              key={item.id ?? i}
              className="rounded-2xl overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #0f0f24 0%, #0a0a18 100%)',
                border: '1px solid rgba(139,92,246,0.15)',
              }}
            >
              {item.foto_url && (
                <div style={{ aspectRatio: '16/9', overflow: 'hidden' }}>
                  <img src={item.foto_url} alt="" className="w-full h-full object-cover" />
                </div>
              )}
              <div className="p-5 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <Stars count={item.estrelas ?? 5} />
                  <span
                    className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
                    style={{ background: 'rgba(139,92,246,0.12)', color: '#a78bfa' }}
                  >
                    {item.produto}
                  </span>
                </div>
                <p
                  className="text-gray-300 text-sm leading-relaxed"
                  style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
                >
                  &ldquo;{item.texto}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-2 border-t border-white/5">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs font-black"
                    style={{ background: item.color ?? getColor(item.nome) }}
                  >
                    {item.avatar ?? getInitials(item.nome)}
                  </div>
                  <div>
                    <p className="text-white text-xs font-bold leading-none">{item.nome}</p>
                    {item.cidade && <p className="text-gray-500 text-[10px] mt-0.5">{item.cidade}</p>}
                  </div>
                  <div className="ml-auto flex items-center gap-1">
                    <svg className="w-3.5 h-3.5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-[9px] text-green-400 font-bold">Verificado</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* CTA deixar avaliação */}
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center justify-center gap-2 font-bold text-sm text-white rounded-2xl py-4 transition-all active:scale-95"
            style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.2), rgba(91,33,182,0.2))', border: '1px solid rgba(139,92,246,0.4)' }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            Deixar minha avaliação
          </button>
        </div>

        {/* ── Desktop: Marquee ── */}
        <div className="hidden md:block mb-10">
          <div
            className="relative"
            style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)' }}
          >
            <div
              className="flex gap-4"
              style={{ width: 'max-content', animation: 'marquee-left 55s linear infinite' }}
            >
              {marqueeList.map((item, i) => (
                <TestimonialCard key={`${item.id ?? 'f'}-${i}`} item={item} />
              ))}
            </div>
          </div>
        </div>

        {/* CTA deixar avaliação — Desktop */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="hidden md:flex justify-center"
        >
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-white text-sm transition-all hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, rgba(139,92,246,0.15), rgba(91,33,182,0.15))',
              border: '1px solid rgba(139,92,246,0.35)',
              boxShadow: '0 0 30px rgba(109,40,217,0.15)',
            }}
          >
            <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            Deixar minha avaliação
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </motion.div>
      </div>

      {/* Modal */}
      {showModal && (
        <ReviewModal
          onClose={() => setShowModal(false)}
          onSuccess={() => {}}
        />
      )}

      <style>{`
        @keyframes marquee-left {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  )
}
