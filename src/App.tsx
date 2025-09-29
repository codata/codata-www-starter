import { Canvas } from '@react-three/fiber'
import { OrbitControls, useVideoTexture, Html } from '@react-three/drei'
import { Suspense } from 'react'

function VideoScreen() {
  const texture = useVideoTexture("/codata.mp4", {
    muted: true,
    loop: true,
    start: true
  })

  return (
    <mesh>
      <planeGeometry args={[4, 2.25]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  )
}

function LoadingFallback() {
  return (
    <Html center>
      <div style={{ 
        color: 'white', 
        fontSize: '18px', 
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center'
      }}>
        Loading...
      </div>
    </Html>
  )
}

function App() {
  return (
    <Canvas shadows camera={{ position: [0, 0, 2], fov: 75 }}>
      <ambientLight intensity={0.5} />
      <OrbitControls 
        minPolarAngle={Math.PI / 2 - Math.PI / 3} 
        maxPolarAngle={Math.PI / 2 + Math.PI / 3}
        minAzimuthAngle={-Math.PI / 3}
        maxAzimuthAngle={Math.PI / 3}
        minDistance={1}
        maxDistance={4}
      />
      <Suspense fallback={<LoadingFallback />}>
        <VideoScreen />
      </Suspense>
    </Canvas>
  )
}

export default App;