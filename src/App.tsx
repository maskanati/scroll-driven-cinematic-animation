import { CinematicScene } from './cinematic-scene'
import { VideoLoadingProvider } from './contexts/VideoLoadingContext.tsx'

function App() {
  return (
    <VideoLoadingProvider>
      <CinematicScene src="./shot.mp4" duration="500vh" />
    </VideoLoadingProvider>
  )
}

export default App
