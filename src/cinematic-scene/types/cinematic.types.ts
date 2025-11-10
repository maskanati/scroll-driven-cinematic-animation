import type { RefObject } from 'react'

/**
 * Cinematic Scene Component Types
 * Using film/cinema terminology for a more expressive API
 */

export interface CinematicShotProps {
  src: string
  shotRef: RefObject<HTMLVideoElement | null>
  duration?: string
}

export interface SceneOverlayProps {
  logoMaskRef: RefObject<HTMLDivElement | null>
  heroLogoRef: RefObject<HTMLDivElement | null>
}

export interface ScreenplayAnimationConfig {
  shotRef: RefObject<HTMLVideoElement | null>
  stageRef: RefObject<HTMLDivElement | null>
  logoMaskRef: RefObject<HTMLDivElement | null>
  heroLogoRef: RefObject<HTMLDivElement | null>
  sceneRef: RefObject<HTMLDivElement | null>
  src: string
}

export interface ShotPreloadConfig {
  shotRef: RefObject<HTMLVideoElement | null>
  src: string
  onBlobReady?: () => void
}

export interface CinematicSceneProps {
  src: string
  duration?: string
}

export interface ScreenplayRefs {
  shot: HTMLVideoElement
  stage: HTMLDivElement
  logoMask: SVGElement
  logoMaskContainer: HTMLDivElement | null
  heroLogoContainer: HTMLDivElement | null
}
