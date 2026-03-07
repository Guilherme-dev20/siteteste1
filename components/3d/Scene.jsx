import { useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei'

/**
 * Shared 3D scene wrapper.
 * Children should be Three.js / R3F meshes.
 */
export default function Scene({
  children,
  camera = { position: [0, 0, 3], fov: 45 },
  controls = true,
  shadows = true,
  className = 'w-full h-full',
}) {
  return (
    <Canvas
      camera={camera}
      shadows={shadows}
      className={className}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={1.2}
        castShadow={shadows}
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-5, -2, -5]} intensity={0.3} color="#a855f7" />
      <pointLight position={[0, 3, 2]} intensity={0.5} color="#8B5CF6" />

      {children}

      {shadows && (
        <ContactShadows
          position={[0, -1.5, 0]}
          opacity={0.4}
          scale={5}
          blur={2}
          far={4}
          color="#8B5CF6"
        />
      )}

      {controls && (
        <OrbitControls
          enablePan={false}
          minDistance={1.5}
          maxDistance={6}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.5}
        />
      )}

      <Environment preset="city" />
    </Canvas>
  )
}
