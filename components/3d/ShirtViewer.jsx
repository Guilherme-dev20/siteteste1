import { useRef, Suspense, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, Environment } from '@react-three/drei'
import * as THREE from 'three'

const MODELS = {
  camiseta:   '/models/camisateste2.glb',
  mangalonga: '/models/mangalonga.glb',
}

// Preload padrão
useGLTF.preload(MODELS.camiseta)

// ─── Textura fallback canvas Cometa ───────────────────────────────────────────
function buildHeroTexture(cor = '#0a0a0a') {
  const size = 1024
  const c    = document.createElement('canvas')
  c.width    = size
  c.height   = size
  const ctx  = c.getContext('2d')
  ctx.scale(2, 2)

  ctx.fillStyle = cor
  ctx.fillRect(0, 0, 512, 512)

  const nebula = ctx.createRadialGradient(256, 210, 10, 256, 210, 200)
  nebula.addColorStop(0,   'rgba(139,92,246,0.45)')
  nebula.addColorStop(0.4, 'rgba(109,40,217,0.20)')
  nebula.addColorStop(1,   'rgba(0,0,0,0)')
  ctx.fillStyle = nebula
  ctx.fillRect(0, 0, size, size)

  const nebula2 = ctx.createRadialGradient(340, 150, 0, 340, 150, 130)
  nebula2.addColorStop(0, 'rgba(59,130,246,0.25)')
  nebula2.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = nebula2
  ctx.fillRect(0, 0, size, size)

  const rng = { v: 0 }
  const rand = () => { rng.v = (rng.v * 9301 + 49297) % 233280; return rng.v / 233280 }
  for (let i = 0; i < 120; i++) {
    const x  = rand() * size
    const y  = rand() * size
    const r  = rand() * 1.4 + 0.3
    const op = rand() * 0.7 + 0.3
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(255,255,255,${op})`
    ctx.fill()
  }

  const cometGrad = ctx.createLinearGradient(60, 60, 230, 130)
  cometGrad.addColorStop(0,   'rgba(255,255,255,0)')
  cometGrad.addColorStop(0.6, 'rgba(200,180,255,0.5)')
  cometGrad.addColorStop(1,   'rgba(255,255,255,0.9)')
  ctx.save()
  ctx.strokeStyle = cometGrad
  ctx.lineWidth   = 2
  ctx.shadowColor = '#a78bfa'
  ctx.shadowBlur  = 8
  ctx.beginPath()
  ctx.moveTo(60, 60)
  ctx.lineTo(230, 130)
  ctx.stroke()
  ctx.restore()

  const starGlow = ctx.createRadialGradient(232, 131, 0, 232, 131, 18)
  starGlow.addColorStop(0,   'rgba(255,255,255,1)')
  starGlow.addColorStop(0.3, 'rgba(200,180,255,0.8)')
  starGlow.addColorStop(1,   'rgba(139,92,246,0)')
  ctx.fillStyle = starGlow
  ctx.beginPath()
  ctx.arc(232, 131, 18, 0, Math.PI * 2)
  ctx.fill()

  ctx.save()
  ctx.strokeStyle = 'rgba(139,92,246,0.35)'
  ctx.lineWidth   = 1
  ctx.setLineDash([4, 8])
  ctx.beginPath()
  ctx.arc(256, 256, 130, 0, Math.PI * 2)
  ctx.stroke()
  ctx.restore()

  ctx.save()
  ctx.strokeStyle = 'rgba(167,139,250,0.15)'
  ctx.lineWidth   = 1
  ctx.setLineDash([2, 12])
  ctx.beginPath()
  ctx.arc(256, 256, 160, 0, Math.PI * 2)
  ctx.stroke()
  ctx.restore()

  ctx.save()
  ctx.shadowColor  = '#8B5CF6'
  ctx.shadowBlur   = 24
  ctx.fillStyle    = '#ffffff'
  ctx.font         = 'bold 72px Arial Black, Arial, sans-serif'
  ctx.textAlign    = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('COMETA', 256, 220)
  ctx.restore()

  const lineGrad = ctx.createLinearGradient(96, 248, 416, 248)
  lineGrad.addColorStop(0,   'rgba(139,92,246,0)')
  lineGrad.addColorStop(0.5, 'rgba(139,92,246,0.9)')
  lineGrad.addColorStop(1,   'rgba(139,92,246,0)')
  ctx.strokeStyle = lineGrad
  ctx.lineWidth   = 1.5
  ctx.setLineDash([])
  ctx.beginPath()
  ctx.moveTo(96, 252)
  ctx.lineTo(416, 252)
  ctx.stroke()

  ctx.save()
  ctx.fillStyle    = 'rgba(167,139,250,0.85)'
  ctx.font         = 'bold 20px Arial, sans-serif'
  ctx.textAlign    = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('PERSONALIZAÇÃO', 256, 278)
  ctx.restore()

  ctx.save()
  ctx.fillStyle    = 'rgba(255,255,255,0.30)'
  ctx.font         = '13px Arial, sans-serif'
  ctx.textAlign    = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('DO UNIVERSO PARA VOCÊ', 256, 308)
  ctx.restore()

  const sparks = [[140,310],[370,290],[190,350],[320,340],[255,390],[155,240],[360,230]]
  sparks.forEach(([x, y]) => {
    const g = ctx.createRadialGradient(x, y, 0, x, y, 6)
    g.addColorStop(0, 'rgba(255,255,255,0.7)')
    g.addColorStop(1, 'rgba(139,92,246,0)')
    ctx.fillStyle = g
    ctx.beginPath()
    ctx.arc(x, y, 6, 0, Math.PI * 2)
    ctx.fill()
  })

  ctx.save()
  ctx.fillStyle    = 'rgba(139,92,246,0.50)'
  ctx.font         = 'bold 15px Arial, sans-serif'
  ctx.textAlign    = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('⚡ COMETA STORE', 256, 460)
  ctx.restore()

  return c
}

// ─── Modelo GLB com textura configurável ──────────────────────────────────────
function GLBHeroShirt({ modelo = 'camiseta', cor = '#ffffff', stamps = [] }) {
  const modelPath  = MODELS[modelo] || MODELS.camiseta
  const { scene }  = useGLTF(modelPath)
  const { gl }     = useThree()
  const groupRef   = useRef()
  const texRef     = useRef(null)
  const maxAniso   = gl.capabilities.getMaxAnisotropy()

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
    const applyCanvas = (canvas) => {
      const tex = new THREE.CanvasTexture(canvas)
      tex.colorSpace      = THREE.SRGBColorSpace
      tex.flipY           = false
      tex.anisotropy      = maxAniso
      tex.minFilter       = THREE.LinearMipmapLinearFilter
      tex.magFilter       = THREE.LinearFilter
      tex.generateMipmaps = true
      texRef.current      = tex
      const mat = new THREE.MeshStandardMaterial({
        color:     new THREE.Color('#ffffff'),
        map:       tex,
        roughness: 0.75,
        metalness: 0.0,
      })
      clone.traverse((child) => {
        if (!child.isMesh) return
        child.material      = mat
        child.castShadow    = true
        child.receiveShadow = true
      })
    }

    const buildCanvas = async (cor, stamps) => {
      const TEXTURE_SIZE = 1024
      const EDITOR_SIZE  = 500
      const scale        = TEXTURE_SIZE / EDITOR_SIZE

      const c   = document.createElement('canvas')
      c.width   = TEXTURE_SIZE
      c.height  = TEXTURE_SIZE
      const ctx = c.getContext('2d')

      ctx.fillStyle = cor || '#ffffff'
      ctx.fillRect(0, 0, TEXTURE_SIZE, TEXTURE_SIZE)

      for (const stamp of stamps || []) {
        const img = new window.Image()
        img.crossOrigin = 'anonymous'
        await new Promise((resolve) => {
          img.onload  = resolve
          img.onerror = resolve
          img.src     = stamp.url
        })

        const cx    = (stamp.x + stamp.width  / 2) * scale
        const cy    = (stamp.y + stamp.height / 2) * scale
        const dw    = stamp.width  * scale
        const dh    = stamp.height * scale
        const angle = ((stamp.rotation || 0) * Math.PI) / 180

        ctx.save()
        ctx.translate(cx, cy)
        ctx.rotate(angle)
        ctx.drawImage(img, -dw / 2, -dh / 2, dw, dh)
        ctx.restore()
      }

      return c
    }

    let cancelled = false
    ;(async () => {
      // Se não há stamps, usa textura fallback canvas Cometa
      if (!stamps || stamps.length === 0) {
        if (!cancelled) applyCanvas(buildHeroTexture(cor))
        return
      }
      const canvas = await buildCanvas(cor, stamps)
      if (!cancelled) applyCanvas(canvas)
    })()

    return () => {
      cancelled = true
      texRef.current?.dispose()
    }
  }, [clone, cor, stamps, maxAniso])

  useFrame((state) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y += 0.012
    groupRef.current.position.y  = Math.sin(state.clock.elapsedTime * 0.8) * 0.07
  })

  return (
    <group ref={groupRef}>
      <primitive object={clone} />
    </group>
  )
}

// ─── Fallback geométrico ──────────────────────────────────────────────────────
function GeometricFallback() {
  const groupRef = useRef()
  const c = useMemo(() => new THREE.Color('#0a0a0a'), [])

  useFrame((state) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y += 0.012
    groupRef.current.position.y  = Math.sin(state.clock.elapsedTime * 0.8) * 0.07
  })

  return (
    <group ref={groupRef}>
      <mesh position={[0, -0.1, 0]}>
        <boxGeometry args={[1.2, 1.45, 0.16]} />
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
        <torusGeometry args={[0.22, 0.065, 10, 24, Math.PI]} />
        <meshStandardMaterial color={c} roughness={0.65} />
      </mesh>
    </group>
  )
}

// ─── Componente exportado ─────────────────────────────────────────────────────
export default function ShirtViewer({ modelo, cor, stamps }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 3.5], fov: 44 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'default', failIfMajorPerformanceCaveat: false, preserveDrawingBuffer: false }}
      style={{ background: 'transparent', width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]}   intensity={1.2} castShadow />
      <directionalLight position={[-3, 0, -3]} intensity={0.2} color="#a855f7" />
      <pointLight       position={[0, 2, 2]}   intensity={0.6} color="#8B5CF6" />

      <Suspense fallback={<GeometricFallback />}>
        <GLBHeroShirt modelo={modelo} cor={cor} stamps={stamps} />
      </Suspense>

      <Environment preset="city" />
    </Canvas>
  )
}
