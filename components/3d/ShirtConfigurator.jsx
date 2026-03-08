import { useRef, useState, useEffect, Suspense, useCallback, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, OrbitControls, Environment } from '@react-three/drei'
import * as THREE from 'three'
import { motion, AnimatePresence } from 'framer-motion'
import KonvaEditor from './KonvaEditor'

// ─── Modelos disponíveis ──────────────────────────────────────────────────────
const MODELS = [
  { id: 'camisateste2',  label: 'Camisa Teste',  path: '/models/camisateste2.glb'  },
  { id: 'collar',        label: 'Camisa Gola',   path: '/models/collar.glb'         },
]
MODELS.forEach((m) => useGLTF.preload(m.path))

// ─── Paleta de cores ──────────────────────────────────────────────────────────
const COLOR_PALETTE = [
  { label: 'Amarelo',    value: '#F5C518' },
  { label: 'Azul BB',   value: '#93C5FD' },
  { label: 'Azul Mar.', value: '#1E3A5F' },
  { label: 'Azul Roy.', value: '#1D4ED8' },
  { label: 'Azul Tur.', value: '#06B6D4' },
  { label: 'Branco',    value: '#FFFFFF'  },
  { label: 'Cáqui',     value: '#C5A87A' },
  { label: 'Cinza Ch.', value: '#374151' },
  { label: 'Cinza Me.', value: '#9CA3AF' },
  { label: 'Fúcsia',    value: '#D946EF' },
  { label: 'Laranja',   value: '#F97316' },
  { label: 'Lilás',     value: '#A78BFA' },
  { label: 'Marfim',    value: '#FFF8E7' },
  { label: 'Marrom',    value: '#7C3A1E' },
  { label: 'Mostarda',  value: '#CA8A04' },
  { label: 'Pink',      value: '#EC4899' },
  { label: 'Preto',     value: '#111111' },
  { label: 'Rosa BB',   value: '#FBCFE8' },
  { label: 'Rosa Chi.', value: '#F472B6' },
  { label: 'Roxo',      value: '#8B5CF6' },
  { label: 'Salmão',    value: '#FDA4AF' },
  { label: 'Terracota', value: '#C2633A' },
  { label: 'Verde Ba.', value: '#166534' },
  { label: 'Verde BB',  value: '#86EFAC' },
  { label: 'Verde Mi.', value: '#4B5320' },
  { label: 'Verde Ve.', value: '#22C55E' },
  { label: 'Verde Vi.', value: '#16A34A' },
  { label: 'Vermelho',  value: '#EF4444' },
  { label: 'Vinho',     value: '#7F1D1D' },
]

// ─── Modelo GLB 3D com textura de canvas ──────────────────────────────────────
function GLBShirt({ path, canvasEl, canvasVersion }) {
  const { scene }  = useGLTF(path)
  const texRef     = useRef(null)
  const meshesRef  = useRef([])

  const clone = useMemo(() => {
    const c   = scene.clone(true)
    const box = new THREE.Box3().setFromObject(c)
    const sz  = box.getSize(new THREE.Vector3())
    const max = Math.max(sz.x, sz.y, sz.z)
    if (max > 0) c.scale.setScalar(2.2 / max)
    const box2   = new THREE.Box3().setFromObject(c)
    const center = box2.getCenter(new THREE.Vector3())
    c.position.sub(center)
    return c
  }, [scene])

  useEffect(() => {
    meshesRef.current = []
    clone.traverse((child) => {
      if (child.isMesh) meshesRef.current.push(child)
    })
  }, [clone])

  useEffect(() => {
    if (!canvasEl) return
    if (texRef.current) { texRef.current.dispose(); texRef.current = null }
    texRef.current = new THREE.CanvasTexture(canvasEl)
    texRef.current.colorSpace = THREE.SRGBColorSpace
    texRef.current.flipY = false  // GLTF usa V=0 no topo — sem flip
    const mat = new THREE.MeshStandardMaterial({
      color:     new THREE.Color('#FFFFFF'),
      map:       texRef.current,
      roughness: 0.72,
      metalness: 0.04,
    })
    meshesRef.current.forEach((mesh) => {
      if (mesh.material && mesh.material !== mat) mesh.material.dispose()
      mesh.material   = mat
      mesh.castShadow = true
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clone, canvasVersion])

  useFrame(() => {
    if (texRef.current) texRef.current.needsUpdate = true
  })

  return <primitive object={clone} />
}

// ─── Fallback geométrico ──────────────────────────────────────────────────────
function GeometricFallback({ color }) {
  const c = useMemo(() => new THREE.Color(color), [color])
  return (
    <group>
      <mesh position={[0, -0.1, 0]}>
        <boxGeometry args={[1.22, 1.45, 0.16]} />
        <meshStandardMaterial color={c} roughness={0.72} />
      </mesh>
      <mesh position={[-0.87, 0.4, 0]} rotation={[0, 0, -0.38]}>
        <boxGeometry args={[0.58, 0.33, 0.15]} />
        <meshStandardMaterial color={c} roughness={0.72} />
      </mesh>
      <mesh position={[0.87, 0.4, 0]} rotation={[0, 0, 0.38]}>
        <boxGeometry args={[0.58, 0.33, 0.15]} />
        <meshStandardMaterial color={c} roughness={0.72} />
      </mesh>
      <mesh position={[0, 0.73, 0]}>
        <torusGeometry args={[0.23, 0.065, 10, 24, Math.PI]} />
        <meshStandardMaterial color={c} roughness={0.65} />
      </mesh>
    </group>
  )
}

// ─── UI: Paleta de círculos ───────────────────────────────────────────────────
function ColorPalette({ selected, onSelect }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(56px,1fr))] gap-x-2 gap-y-4">
      {COLOR_PALETTE.map((c) => {
        const active = selected === c.value
        return (
          <button key={c.value} onClick={() => onSelect(c.value)} title={c.label}
            className="flex flex-col items-center gap-1.5 group">
            <div className={`w-12 h-12 rounded-full transition-all duration-200
                             group-hover:scale-110 flex-shrink-0
                             ${active ? 'ring-2 ring-nebula-purple ring-offset-2 ring-offset-[#12122a] scale-110' : ''}`}
              style={{
                backgroundColor: c.value,
                boxShadow: active
                  ? '0 0 14px rgba(139,92,246,0.65)'
                  : ['#FFFFFF','#FFF8E7','#FBCFE8'].includes(c.value)
                    ? 'inset 0 0 0 1px rgba(255,255,255,0.2)'
                    : undefined,
              }}
            />
            <span className="text-[9px] text-gray-500 uppercase tracking-wide text-center
                             leading-tight truncate w-full group-hover:text-gray-300 transition-colors">
              {c.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}

// ─── UI: Card de seção ────────────────────────────────────────────────────────
function SectionCard({ icon, label, description, children, gradient = false }) {
  return (
    <div className="bg-[#12122a] rounded-2xl p-4 border border-white/5">
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0
                         ${gradient
                           ? 'bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500'
                           : 'bg-[#1e1e40] border border-white/10'}`}>
          {icon}
        </div>
        <div>
          <p className="text-[11px] font-bold tracking-widest text-nebula-purple">{label}</p>
          <p className="text-gray-400 text-xs leading-relaxed">{description}</p>
        </div>
      </div>
      {children}
    </div>
  )
}

const PaletteIcon = () => (
  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
  </svg>
)

// ─── Componente principal ─────────────────────────────────────────────────────
export default function ShirtConfigurator() {
  const [activeModel,   setActiveModel]   = useState(MODELS[0])
  const [shirtColor,    setShirtColor]    = useState('#3B82F6')
  const [side,          setSide]          = useState('frente')

  // Estado unificado de elementos do canvas (texto + imagem)
  const [elements,      setElements]      = useState([])
  const [selectedId,    setSelectedId]    = useState(null)

  // Configuração do próximo texto a adicionar
  const [textInput,     setTextInput]     = useState('')
  const [textColor,     setTextColor]     = useState('#FFFFFF')
  const [textSize,      setTextSize]      = useState(36)

  const [activeTab,     setActiveTab]     = useState('roupa')

  // Canvas e versão para sync com o material 3D
  const canvasElRef    = useRef(null)
  const [canvasVersion, setCanvasVersion] = useState(0)

  const fileRef = useRef(null)

  // Recebe o canvas exportado pelo KonvaEditor
  const handleKonvaCanvas = useCallback((canvas) => {
    canvasElRef.current = canvas
    setCanvasVersion((v) => v + 1)
  }, [])

  // Atualiza atributos de um elemento
  const handleElementChange = useCallback((id, attrs) => {
    setElements((prev) =>
      prev.map((el) => el.id === id ? { ...el, ...attrs } : el)
    )
  }, [])

  // Remove elemento
  const handleDeleteElement = useCallback((id) => {
    setElements((prev) => prev.filter((el) => el.id !== id))
    setSelectedId((cur) => cur === id ? null : cur)
  }, [])

  // Adiciona texto ao canvas e vai para a aba CANVAS
  const addText = () => {
    if (!textInput.trim()) return
    const newEl = {
      id:       Date.now(),
      type:     'text',
      x:        180,
      y:        200,
      text:     textInput.trim(),
      fontSize: textSize,
      fill:     textColor,
      rotation: 0,
    }
    setElements((prev) => [...prev, newEl])
    setSelectedId(newEl.id)
    setTextInput('')
    setActiveTab('canvas')
  }

  // Faz upload de imagem e vai para a aba CANVAS
  const handleFile = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      const newEl = {
        id:       Date.now(),
        type:     'image',
        x:        100,
        y:        100,
        src:      ev.target.result,
        width:    200,
        height:   200,
        rotation: 0,
      }
      setElements((prev) => [...prev, newEl])
      setSelectedId(newEl.id)
      setActiveTab('canvas')
    }
    reader.readAsDataURL(file)
    // Reset input so same file can be re-uploaded
    e.target.value = ''
  }

  const sendWhatsApp = () => {
    const textEls = elements.filter((el) => el.type === 'text')
    const imgEls  = elements.filter((el) => el.type === 'image')
    const msg =
      `Olá! Personalizei uma peça no site Cometa Personalização e gostaria de fazer um pedido.\n\n` +
      `Produto: ${activeModel.label}\n` +
      `Cor: ${shirtColor}\n` +
      `Lado: ${side === 'frente' ? 'Frente' : 'Costas'}` +
      (textEls.length ? `\nTextos: ${textEls.map((t) => `"${t.text}"`).join(', ')}` : '') +
      (imgEls.length  ? `\nImagens: ${imgEls.length}` : '') +
      `\n\nAguardo o contato!`
    window.open(`https://wa.me/5511999999999?text=${encodeURIComponent(msg)}`, '_blank')
  }

  const TABS = [
    { id: 'roupa',  label: 'ROUPA',
      icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg> },
    { id: 'texto',  label: 'TEXTO',
      icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg> },
    { id: 'imagem', label: 'IMAGEM',
      icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> },
    { id: 'canvas', label: 'CANVAS',
      icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" strokeWidth={2} /></svg> },
    { id: 'acoes',  label: 'AÇÕES',
      icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg> },
  ]

  return (
    <div className="flex flex-col lg:flex-row w-full h-full">

      {/* ══ 3D Viewport ═══════════════════════════════════════════════════════ */}
      <div className="relative w-full lg:flex-1 h-[42vh] lg:h-full
                      bg-[#07071a] lg:rounded-2xl overflow-hidden flex-shrink-0">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                          w-64 h-64 bg-nebula-purple/10 rounded-full blur-3xl" />
        </div>

        <Canvas
          camera={{ position: [0, 0, 3.5], fov: 42 }}
          gl={{ antialias: true, alpha: true }}
          style={{ width: '100%', height: '100%', background: 'transparent' }}
        >
          <ambientLight intensity={0.25} />
          <directionalLight position={[4, 6, 5]}   intensity={1.2} castShadow />
          <directionalLight position={[-4, -2, -4]} intensity={0.2} color="#a855f7" />
          <pointLight       position={[0, 3, 3]}    intensity={0.5} color="#8B5CF6" />

          <Suspense fallback={<GeometricFallback color={shirtColor} />}>
            <GLBShirt
              key={activeModel.id}
              path={activeModel.path}
              canvasEl={canvasElRef.current}
              canvasVersion={canvasVersion}
            />
          </Suspense>

          <OrbitControls
            enablePan={false}
            minDistance={1.8}
            maxDistance={6}
            minPolarAngle={Math.PI / 2}
            maxPolarAngle={Math.PI / 2}
          />
          <Environment preset="city" />
        </Canvas>

        {/* Nome do modelo */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 pointer-events-none">
          <span className="text-[10px] text-gray-500 bg-black/40 backdrop-blur-sm
                           px-3 py-1 rounded-full tracking-widest uppercase select-none">
            {activeModel.label}
          </span>
        </div>

        {/* Hint */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 pointer-events-none
                        text-[11px] text-gray-500 tracking-widest uppercase
                        flex items-center gap-1.5 select-none">
          <svg className="w-3.5 h-3.5 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Arraste para girar
        </div>
      </div>

      {/* ══ Painel de Controles ════════════════════════════════════════════════ */}
      <div className="w-full lg:w-[360px] xl:w-[400px] flex flex-col flex-shrink-0
                      bg-[#0b0b1e] lg:rounded-2xl lg:ml-4
                      rounded-t-3xl lg:rounded-t-2xl -mt-5 lg:mt-0 relative z-10 overflow-hidden">

        {/* Drag handle (mobile) */}
        <div className="flex justify-center pt-3 pb-1 lg:hidden">
          <div className="w-10 h-1 bg-white/10 rounded-full" />
        </div>

        {/* Abas */}
        <div className="flex border-b border-white/8 overflow-x-auto scrollbar-none">
          {TABS.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-[60px] flex flex-col items-center gap-1
                         py-3 px-1 text-[9px] font-bold tracking-widest transition-all duration-200
                         border-b-2 whitespace-nowrap
                         ${activeTab === tab.id
                           ? 'text-nebula-purple border-nebula-purple'
                           : 'text-gray-500 border-transparent hover:text-gray-300'}`}>
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* KonvaEditor sempre montado (oculto fora da aba CANVAS) */}
        <div style={{ display: activeTab === 'canvas' ? 'block' : 'none' }}
             className="flex-1 overflow-y-auto px-4 py-4 scrollbar-none">
          <div className="bg-[#12122a] rounded-2xl p-3 border border-white/5">
            <p className="text-[11px] font-bold tracking-widest text-nebula-purple mb-3 px-1">
              EDITOR DE CANVAS
            </p>
            <KonvaEditor
              shirtColor={shirtColor}
              elements={elements}
              selectedId={selectedId}
              onSelect={setSelectedId}
              onElementChange={handleElementChange}
              onCanvasReady={handleKonvaCanvas}
              onDeleteSelected={handleDeleteElement}
            />
          </div>
          {elements.length === 0 && (
            <p className="text-center text-gray-600 text-xs mt-3">
              Adicione textos ou imagens pelas abas TEXTO e IMAGEM
            </p>
          )}
        </div>

        {/* Conteúdo rolável das outras abas */}
        <div className={`flex-1 overflow-y-auto px-4 py-4 space-y-3 scrollbar-none ${activeTab === 'canvas' ? 'hidden' : ''}`}>
          <AnimatePresence mode="wait">

            {/* ── ROUPA ─────────────────────────────────────────────────────── */}
            {activeTab === 'roupa' && (
              <motion.div key="roupa"
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }} transition={{ duration: 0.15 }}
                className="space-y-3">

                <SectionCard
                  label="MODELO 3D"
                  description="Escolha o modelo para visualizar"
                  icon={<svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>}
                >
                  <div className="flex flex-col gap-2">
                    {MODELS.map((model) => {
                      const isActive = activeModel.id === model.id
                      return (
                        <motion.button key={model.id}
                          whileHover={{ x: 4 }} whileTap={{ scale: 0.98 }}
                          onClick={() => setActiveModel(model)}
                          className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl
                                     text-sm font-medium text-left transition-all duration-200 ${
                            isActive
                              ? 'bg-nebula-purple/20 border border-nebula-purple/50 text-white shadow-purple-glow'
                              : 'bg-[#0b0b1e] border border-white/8 text-gray-400 hover:border-white/20 hover:text-white'
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                            isActive ? 'bg-nebula-purple/30' : 'bg-white/5'
                          }`}>
                            <svg className={`w-4 h-4 ${isActive ? 'text-nebula-purple' : 'text-gray-500'}`}
                              fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                          </div>
                          <span>{model.label}</span>
                          {isActive && (
                            <svg className="w-4 h-4 text-nebula-purple ml-auto" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                            </svg>
                          )}
                        </motion.button>
                      )
                    })}
                  </div>
                </SectionCard>

                <SectionCard
                  label="VISTA"
                  description="Alterne entre frente e costas da peça"
                  icon={<svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>}
                >
                  <div className="flex gap-2">
                    {['frente', 'costas'].map((s) => (
                      <button key={s} onClick={() => setSide(s)}
                        className={`flex-1 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider
                                   transition-all duration-200 ${side === s
                                     ? 'bg-nebula-purple text-white shadow-purple-glow'
                                     : 'bg-white/5 text-gray-400 border border-white/10 hover:text-white hover:bg-white/10'}`}>
                        {s}
                      </button>
                    ))}
                  </div>
                </SectionCard>

                <SectionCard label="COR DA PEÇA" description="Toque em uma cor para aplicar à peça" icon={<PaletteIcon />} gradient>
                  <ColorPalette selected={shirtColor} onSelect={setShirtColor} />
                  <div className="mt-4 pt-4 border-t border-white/8 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl border border-white/20 overflow-hidden flex-shrink-0">
                      <input type="color" value={shirtColor} onChange={(e) => setShirtColor(e.target.value)}
                        className="w-14 h-14 -m-2 cursor-pointer border-none" />
                    </div>
                    <div>
                      <p className="text-white text-xs font-mono">{shirtColor.toUpperCase()}</p>
                      <p className="text-gray-500 text-[10px]">Cor personalizada</p>
                    </div>
                  </div>
                </SectionCard>

              </motion.div>
            )}

            {/* ── TEXTO ─────────────────────────────────────────────────────── */}
            {activeTab === 'texto' && (
              <motion.div key="texto"
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }} transition={{ duration: 0.15 }}
                className="space-y-3">

                <SectionCard
                  label="ADICIONAR TEXTO"
                  description="Digite e clique em + ADD para inserir no canvas"
                  icon={<svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
                >
                  <div className="flex gap-2">
                    <input type="text" value={textInput}
                      onChange={(e) => setTextInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && addText()}
                      maxLength={30} placeholder="Ex: Minha Marca"
                      className="flex-1 bg-[#0b0b1e] border border-white/10 text-white text-sm
                                 placeholder-gray-600 rounded-xl px-4 py-2.5
                                 focus:outline-none focus:border-nebula-purple transition-all" />
                    <motion.button whileTap={{ scale: 0.95 }} onClick={addText}
                      className="px-4 py-2.5 rounded-xl bg-[#0e7c7b] hover:bg-[#0d9090]
                                 text-white text-sm font-bold tracking-wide
                                 transition-all whitespace-nowrap flex-shrink-0">
                      + ADD
                    </motion.button>
                  </div>

                  <p className="text-[10px] text-gray-600 mt-2">
                    O texto será adicionado ao canvas e pode ser arrastado, redimensionado e rotacionado.
                  </p>
                </SectionCard>

                <SectionCard
                  label="TAMANHO DO TEXTO"
                  description="Ajuste o tamanho inicial da fonte"
                  icon={<svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" /></svg>}
                >
                  <div className="flex items-center gap-3">
                    <input type="range" min="18" max="60" value={textSize}
                      onChange={(e) => setTextSize(+e.target.value)}
                      className="flex-1 accent-nebula-purple h-1.5 rounded-full" />
                    <span className="text-white text-sm w-10 text-right">{textSize}px</span>
                  </div>
                </SectionCard>

                <SectionCard label="COR DO TEXTO" description="Selecione a cor inicial do texto" icon={<PaletteIcon />} gradient>
                  <ColorPalette selected={textColor} onSelect={setTextColor} />
                </SectionCard>

              </motion.div>
            )}

            {/* ── IMAGEM ────────────────────────────────────────────────────── */}
            {activeTab === 'imagem' && (
              <motion.div key="imagem"
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }} transition={{ duration: 0.15 }}
                className="space-y-3">

                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />

                <SectionCard
                  label="ENVIAR IMAGEM"
                  description="Faça upload de uma arte para aplicar na peça"
                  icon={<svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
                >
                  <button onClick={() => fileRef.current?.click()}
                    className="w-full border-2 border-dashed border-nebula-purple/30 rounded-xl
                               py-6 text-center hover:border-nebula-purple hover:bg-nebula-purple/5
                               transition-all duration-300 cursor-pointer">
                    <div className="text-3xl mb-1">📁</div>
                    <p className="text-gray-400 text-sm">Clique para enviar</p>
                    <p className="text-gray-600 text-xs mt-0.5">PNG · JPG · GIF</p>
                  </button>
                  <p className="text-[10px] text-gray-600 mt-2">
                    A imagem será adicionada ao canvas e pode ser arrastada, redimensionada e rotacionada.
                  </p>
                </SectionCard>

              </motion.div>
            )}

            {/* ── AÇÕES ─────────────────────────────────────────────────────── */}
            {activeTab === 'acoes' && (
              <motion.div key="acoes"
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }} transition={{ duration: 0.15 }}
                className="space-y-3">

                <SectionCard
                  label="RESUMO"
                  description="Resumo da personalização atual"
                  icon={<svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>}
                >
                  <div className="space-y-2 text-sm">
                    {[
                      { label: 'Modelo',  value: activeModel.label },
                      { label: 'Lado',    value: side === 'frente' ? 'Frente' : 'Costas' },
                      { label: 'Cor',     value: (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: shirtColor }} />
                          <span>{shirtColor.toUpperCase()}</span>
                        </div>
                      )},
                      { label: 'Textos',  value: elements.filter((e) => e.type === 'text').length
                          ? elements.filter((e) => e.type === 'text').map((t) => `"${t.text}"`).join(', ')
                          : 'Nenhum' },
                      { label: 'Imagens', value: `${elements.filter((e) => e.type === 'image').length}` },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex items-center justify-between gap-2">
                        <span className="text-gray-500 flex-shrink-0">{label}:</span>
                        <span className="text-white text-right text-xs truncate max-w-[180px]">{value}</span>
                      </div>
                    ))}
                  </div>
                </SectionCard>

                <SectionCard
                  label="LIMPAR TUDO"
                  description="Remove todas as personalizações"
                  icon={<svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>}
                >
                  <button
                    onClick={() => {
                      setElements([])
                      setSelectedId(null)
                      setShirtColor('#3B82F6')
                    }}
                    className="w-full py-2.5 rounded-xl border border-red-500/30 text-red-400
                               text-sm font-medium hover:bg-red-500/10 transition-all duration-200">
                    Limpar personalizações
                  </button>
                </SectionCard>

              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Botão WhatsApp */}
        <div className="px-4 py-4 border-t border-white/8 bg-[#0b0b1e]">
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
            onClick={sendWhatsApp}
            className="w-full btn-primary flex items-center justify-center gap-2.5 py-4 text-sm font-bold">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.555 4.122 1.524 5.855L0 24l6.335-1.498C8.05 23.447 9.99 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818c-1.898 0-3.667-.514-5.177-1.409l-.371-.22-3.76.889.902-3.666-.242-.382A9.787 9.787 0 012.182 12C2.182 6.58 6.58 2.182 12 2.182S21.818 6.58 21.818 12 17.42 21.818 12 21.818z" />
            </svg>
            Enviar Pedido pelo WhatsApp
          </motion.button>
        </div>
      </div>
    </div>
  )
}
