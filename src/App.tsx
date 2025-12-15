import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls, useVideoTexture, Html } from '@react-three/drei'
import { Suspense, useEffect, useMemo, useState } from 'react'
import { TOUCH } from 'three'

function VideoScreen() {
  const { viewport } = useThree()
  const [dimensions, setDimensions] = useState({ width: 4, height: 2.25 })
  
  // Choose video source based on domain; default to codata.mp4
  const videoSrc = useMemo(() => {
    const host = typeof window !== 'undefined' ? window.location.hostname : ''
    const search = typeof window !== 'undefined' ? window.location.search : ''
    const params = new URLSearchParams(search)
    const forceCdif = params.get('site') === 'cdif' || params.get('cdif') === '1'
    const isCdifDomain = host && host.toLowerCase().includes('cdif.org')
    if (isCdifDomain || forceCdif) {
      return './cdif.mp4'
    }
    return './codata.mp4'
  }, [])
  
  const texture = useVideoTexture(videoSrc, {
    muted: true,
    loop: true,
    start: true
  })

  useEffect(() => {
    const calculateDimensions = () => {
      const aspectRatio = 16 / 9 // Video aspect ratio
      const viewportAspect = viewport.width / viewport.height
      
      let width, height
      
      if (viewportAspect > aspectRatio) {
        // Viewport is wider than video - fit to height
        height = viewport.height * 0.6 // Use 60% of viewport height
        width = height * aspectRatio
      } else {
        // Viewport is taller than video - fit to width
        width = viewport.width * 0.8 // Use 80% of viewport width
        height = width / aspectRatio
      }
      
      setDimensions({ width, height })
    }
    
    calculateDimensions()
  }, [viewport.width, viewport.height])

  return (
    <mesh>
      <planeGeometry args={[dimensions.width, dimensions.height]} />
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

function LearnMoreLink() {
  const { viewport } = useThree()
  // Determine if we should show the link (cdif.org or local override)
  const host = typeof window !== 'undefined' ? window.location.hostname : ''
  const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams()
  const forceCdif = params.get('site') === 'cdif' || params.get('cdif') === '1'
  const isCdifDomain = host && host.toLowerCase().includes('cdif.org')
  if (!(isCdifDomain || forceCdif)) return null

  // Compute the same video height to place the link just below the plane
  const aspectRatio = 16 / 9
  const viewportAspect = viewport.width / viewport.height
  let width: number, height: number
  if (viewportAspect > aspectRatio) {
    height = viewport.height * 0.6
    width = height * aspectRatio
  } else {
    width = viewport.width * 0.8
    height = width / aspectRatio
  }
  const yBelow = -(height / 2) - 0.12 // 0.12 units margin below video
  const fontSize = Math.max(viewport.width * 0.015, 5) // Smaller scaling

  return (
    <Html position={[0, yBelow, 0]} transform>
      <a
        href="https://book.cdif.org"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          color: '#28435dff',
          textDecoration: 'none',
          fontFamily: 'Arial, sans-serif',
          fontSize: `${fontSize}px`,
          whiteSpace: 'nowrap'
        }}
      >
        Learn more
      </a>
    </Html>
  )
}

function App() {
  return (
    <Canvas 
      shadows 
      camera={{ position: [0, 0, 2], fov: 75 }}
      style={{ width: '100vw', height: '100vh' }}
    >
      <ambientLight intensity={0.5} />
      <OrbitControls 
        minPolarAngle={Math.PI / 2 - Math.PI / 3} 
        maxPolarAngle={Math.PI / 2 + Math.PI / 3}
        minAzimuthAngle={-Math.PI / 3}
        maxAzimuthAngle={Math.PI / 3}
        minDistance={1}
        maxDistance={4}
        enablePan={false}
        enableZoom={true}
        enableRotate={true}
        touches={{
          ONE: TOUCH.ROTATE,
          TWO: TOUCH.DOLLY_PAN
        }}
      />
      <Suspense fallback={<LoadingFallback />}>
        <VideoScreen />
        <LearnMoreLink />
      </Suspense>
    </Canvas>
  )
}

export default App;