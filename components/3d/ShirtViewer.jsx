import { useRef, Suspense, useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Environment } from '@react-three/drei'
import * as THREE from 'three'

// Preload da camisa principal (hero)
const HERO_MODEL = '/models/camisanormal2.glb'
useGLTF.preload(HERO_MODEL)

// ─── Modelo GLB com auto-rotate e float ──────────────────────────────────────
function GLBHeroShirt({ color }) {
  const { scene } = useGLTF(HERO_MODEL)
  const groupRef   = useRef()

  // Clona e normaliza escala/posição uma única vez
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

  // Aplica cor a todos os meshes
  useEffect(() => {
    clone.traverse((child) => {
      if (!child.isMesh) return
      child.material = new THREE.MeshStandardMaterial({
        color:     new THREE.Color(color),
        roughness: 0.72,
        metalness: 0.05,
      })
      child.castShadow    = true
      child.receiveShadow = true
    })
  }, [clone, color])

  // Rotação + float
  useFrame((state) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y += 0.005
    groupRef.current.position.y  = Math.sin(state.clock.elapsedTime * 0.8) * 0.07
  })

  return (
    <group ref={groupRef}>
      <primitive object={clone} />
    </group>
  )
}

// ─── Fallback geométrico enquanto o GLB carrega ───────────────────────────────
function GeometricFallback({ color }) {
  const groupRef = useRef()
  const c = useMemo(() => new THREE.Color(color), [color])

  useFrame((state) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y += 0.005
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
export default function ShirtViewer({ color = '#8B5CF6' }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 3.5], fov: 44 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent', width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[5, 5, 5]}   intensity={1.6} castShadow />
      <directionalLight position={[-3, 0, -3]} intensity={0.4} color="#a855f7" />
      <pointLight       position={[0, 2, 2]}   intensity={0.9} color="#8B5CF6" />

      <Suspense fallback={<GeometricFallback color={color} />}>
        <GLBHeroShirt color={color} />
      </Suspense>

      <Environment preset="city" />
    </Canvas>
  )
}
