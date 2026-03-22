import { useState, useEffect } from 'react'
import Head from 'next/head'

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'cometa2025'

// Chama a API server-side (usa service role key, bypassa RLS)
async function adminFetch(method, body) {
  const res = await fetch('/api/admin/avaliacoes', {
    method,
    headers: {
      'Content-Type': 'application/json',
      'x-admin-password': sessionStorage.getItem('admin_pwd') || '',
    },
    body: body ? JSON.stringify(body) : undefined,
  })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

// ─── Tela de login ─────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }) {
  const [pwd, setPwd]   = useState('')
  const [err, setErr]   = useState(false)

  const submit = (e) => {
    e.preventDefault()
    if (pwd === ADMIN_PASSWORD) {
      sessionStorage.setItem('admin_pwd', pwd)
      onLogin()
      setErr(false)
    } else { setErr(true) }
  }

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#07071a' }}>
      <form onSubmit={submit} className="w-full max-w-sm flex flex-col gap-4 p-8 rounded-3xl"
        style={{ background: '#0f0f24', border: '1px solid rgba(139,92,246,0.2)' }}>
        <div className="text-center mb-2">
          <p className="text-2xl font-black text-white">Painel Admin</p>
          <p className="text-gray-500 text-sm mt-1">Cometa Personalização</p>
        </div>
        <input
          type="password"
          placeholder="Senha"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          autoFocus
          className="rounded-xl px-4 py-3 text-white text-sm outline-none focus:ring-1 focus:ring-purple-500"
          style={{ background: 'rgba(255,255,255,0.05)', border: `1px solid ${err ? '#ef4444' : 'rgba(139,92,246,0.2)'}` }}
        />
        {err && <p className="text-red-400 text-xs text-center">Senha incorreta</p>}
        <button type="submit"
          className="py-3 rounded-xl text-white font-bold text-sm"
          style={{ background: 'linear-gradient(135deg, #7c3aed, #5b21b6)' }}>
          Entrar
        </button>
      </form>
    </div>
  )
}

// ─── Badge de status ───────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const map = {
    pendente:  { label: 'Pendente',  bg: 'rgba(234,179,8,0.15)',  color: '#fbbf24' },
    aprovado:  { label: 'Aprovado',  bg: 'rgba(34,197,94,0.15)',  color: '#4ade80' },
    rejeitado: { label: 'Rejeitado', bg: 'rgba(239,68,68,0.15)',  color: '#f87171' },
  }
  const s = map[status] ?? map.pendente
  return (
    <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
      style={{ background: s.bg, color: s.color }}>
      {s.label}
    </span>
  )
}

// ─── Estrelas estáticas ────────────────────────────────────────────────────────
function Stars({ count = 5 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"
          style={{ color: i < count ? '#facc15' : '#374151' }}>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

// ─── Card de avaliação ─────────────────────────────────────────────────────────
function ReviewCard({ review, onUpdate }) {
  const [loading, setLoading] = useState(false)
  const [expanded, setExpanded] = useState(false)

  const updateStatus = async (status) => {
    setLoading(true)
    await adminFetch('PATCH', { id: review.id, status })
    onUpdate(review.id, status)
    setLoading(false)
  }

  const deleteReview = async () => {
    if (!confirm('Apagar esta avaliação?')) return
    setLoading(true)
    await adminFetch('DELETE', { id: review.id })
    onUpdate(review.id, 'deleted')
    setLoading(false)
  }

  const date = new Date(review.created_at).toLocaleDateString('pt-BR', {
    day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
  })

  return (
    <div className="rounded-2xl overflow-hidden transition-all"
      style={{ background: '#0f0f24', border: '1px solid rgba(139,92,246,0.15)' }}>

      {/* Foto/Vídeo */}
      {(review.foto_url || review.video_url) && (
        <div className="flex gap-2 p-3 pb-0">
          {review.foto_url && (
            <a href={review.foto_url} target="_blank" rel="noopener noreferrer"
              className="block rounded-xl overflow-hidden flex-shrink-0"
              style={{ width: 100, height: 100 }}>
              <img src={review.foto_url} alt="foto" className="w-full h-full object-cover" />
            </a>
          )}
          {review.video_url && (
            <a href={review.video_url} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center rounded-xl flex-shrink-0 gap-2 text-xs text-purple-400 font-bold"
              style={{ width: 100, height: 100, background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.2)' }}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
              </svg>
              Ver vídeo
            </a>
          )}
        </div>
      )}

      <div className="p-4 flex flex-col gap-3">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="text-white font-bold text-sm">{review.nome}</p>
              {review.cidade && <p className="text-gray-500 text-xs">{review.cidade}</p>}
              <StatusBadge status={review.status} />
            </div>
            <div className="flex items-center gap-2">
              <Stars count={review.estrelas} />
              <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
                style={{ background: 'rgba(139,92,246,0.12)', color: '#a78bfa' }}>
                {review.produto}
              </span>
            </div>
          </div>
          <p className="text-gray-600 text-[10px] flex-shrink-0">{date}</p>
        </div>

        {/* Texto */}
        <p className="text-gray-300 text-sm leading-relaxed"
          style={expanded ? {} : { display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          &ldquo;{review.texto}&rdquo;
        </p>
        {review.texto.length > 120 && (
          <button onClick={() => setExpanded(!expanded)}
            className="text-purple-400 text-xs self-start hover:text-purple-300 transition-colors">
            {expanded ? 'Ver menos' : 'Ver mais'}
          </button>
        )}

        {/* Ações */}
        <div className="flex items-center gap-2 pt-1 border-t border-white/5">
          {review.status !== 'aprovado' && (
            <button
              onClick={() => updateStatus('aprovado')}
              disabled={loading}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all hover:opacity-90 disabled:opacity-50"
              style={{ background: 'rgba(34,197,94,0.15)', color: '#4ade80', border: '1px solid rgba(34,197,94,0.2)' }}>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Aprovar
            </button>
          )}
          {review.status !== 'rejeitado' && (
            <button
              onClick={() => updateStatus('rejeitado')}
              disabled={loading}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all hover:opacity-90 disabled:opacity-50"
              style={{ background: 'rgba(239,68,68,0.1)', color: '#f87171', border: '1px solid rgba(239,68,68,0.2)' }}>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              Rejeitar
            </button>
          )}
          {review.status === 'pendente' && (
            <button
              onClick={deleteReview}
              disabled={loading}
              className="ml-auto flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs text-gray-600 hover:text-red-400 transition-colors disabled:opacity-50">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Apagar
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Painel principal ──────────────────────────────────────────────────────────
function AdminPanel() {
  const [reviews,   setReviews]   = useState([])
  const [loading,   setLoading]   = useState(true)
  const [activeTab, setActiveTab] = useState('pendente')

  const fetchReviews = async () => {
    setLoading(true)
    try {
      const data = await adminFetch('GET')
      setReviews(data)
    } catch (e) {
      console.error(e)
    }
    setLoading(false)
  }

  useEffect(() => { fetchReviews() }, [])

  const handleUpdate = (id, newStatus) => {
    if (newStatus === 'deleted') {
      setReviews((prev) => prev.filter((r) => r.id !== id))
    } else {
      setReviews((prev) => prev.map((r) => r.id === id ? { ...r, status: newStatus } : r))
    }
  }

  const tabs = [
    { id: 'pendente',  label: 'Pendentes',  color: '#fbbf24' },
    { id: 'aprovado',  label: 'Aprovadas',  color: '#4ade80' },
    { id: 'rejeitado', label: 'Rejeitadas', color: '#f87171' },
  ]

  const filtered  = reviews.filter((r) => r.status === activeTab)
  const counts    = tabs.reduce((acc, t) => ({ ...acc, [t.id]: reviews.filter((r) => r.status === t.id).length }), {})

  return (
    <div className="min-h-screen" style={{ background: '#07071a' }}>
      <Head>
        <title>Admin — Avaliações</title>
      </Head>

      {/* Topbar */}
      <div className="sticky top-0 z-10 px-4 md:px-8 py-4 flex items-center justify-between"
        style={{ background: 'rgba(7,7,26,0.9)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(139,92,246,0.12)' }}>
        <div>
          <h1 className="text-white font-black text-lg">Avaliações</h1>
          <p className="text-gray-500 text-xs">{reviews.length} no total</p>
        </div>
        <button onClick={fetchReviews}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-purple-400 transition-all hover:bg-purple-500/10"
          style={{ border: '1px solid rgba(139,92,246,0.2)' }}>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Atualizar
        </button>
      </div>

      <div className="px-4 md:px-8 py-6 max-w-4xl mx-auto">
        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all"
              style={{
                background: activeTab === tab.id ? 'rgba(139,92,246,0.15)' : 'rgba(255,255,255,0.04)',
                border: activeTab === tab.id ? '1px solid rgba(139,92,246,0.4)' : '1px solid rgba(255,255,255,0.06)',
                color: activeTab === tab.id ? '#a78bfa' : '#6b7280',
              }}
            >
              {tab.label}
              <span className="px-1.5 py-0.5 rounded-full text-[10px] font-black"
                style={{ background: activeTab === tab.id ? 'rgba(139,92,246,0.2)' : 'rgba(255,255,255,0.06)', color: tab.color }}>
                {counts[tab.id]}
              </span>
            </button>
          ))}
        </div>

        {/* Lista */}
        {loading ? (
          <div className="flex flex-col gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="rounded-2xl animate-pulse h-40"
                style={{ background: '#0f0f24', border: '1px solid rgba(139,92,246,0.1)' }} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
              style={{ background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.15)' }}>
              <svg className="w-7 h-7 text-gray-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
              </svg>
            </div>
            <p className="text-gray-500 text-sm">Nenhuma avaliação {activeTab === 'pendente' ? 'pendente' : activeTab === 'aprovado' ? 'aprovada' : 'rejeitada'}</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {filtered.map((review) => (
              <ReviewCard key={review.id} review={review} onUpdate={handleUpdate} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Export com proteção de senha ──────────────────────────────────────────────
export default function AdminPage() {
  const [auth, setAuth] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setAuth(sessionStorage.getItem('admin_auth') === '1')
    }
  }, [])

  const handleLogin = () => {
    sessionStorage.setItem('admin_auth', '1')
    setAuth(true)
  }

  if (!auth) return <LoginScreen onLogin={handleLogin} />
  return <AdminPanel />
}
