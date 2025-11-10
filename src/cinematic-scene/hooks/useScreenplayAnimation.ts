import type { ScreenplayAnimationConfig } from '../types/cinematic.types'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { activateShot, createScreenplay } from '../utils/screenplay.utils'

gsap.registerPlugin(ScrollTrigger)

/**
 * Custom hook for orchestrating cinematic screenplay animations
 * Manages scroll-based shot sequencing and visual narrative
 */
export const useScreenplayAnimation = ({
  shotRef,
  stageRef,
  logoMaskRef,
  heroLogoRef,
  sceneRef,
  src,
}: ScreenplayAnimationConfig): void => {
  useGSAP(
    () => {
      const shot = shotRef.current
      const stage = stageRef.current
      const logoMaskContainer = logoMaskRef.current
      const heroLogoContainer = heroLogoRef.current

      if (!shot || !stage) return

      const logoMask = stage.nextElementSibling?.querySelector('svg')
      if (!logoMask) return

      // Setup touch activation for iOS
      const handleActivateShot = (): void => activateShot(shot)
      document.documentElement.addEventListener('touchstart', handleActivateShot, { once: true })

      // Setup screenplay when video is fully ready
      const handleVideoReady = (): void => {
        // Ensure video is ready and has valid duration
        if (!shot.duration || isNaN(shot.duration) || !isFinite(shot.duration)) {
          console.warn('Video duration not ready, retrying...', shot.duration)
          // Retry after a short delay
          setTimeout(handleVideoReady, 100)
          return
        }

        // Double-check readyState
        if (shot.readyState < 2) {
          console.warn('Video not ready, waiting for data...', shot.readyState)
          setTimeout(handleVideoReady, 100)
          return
        }

        console.log('Video ready! Duration:', shot.duration, 'ReadyState:', shot.readyState)

        const screenplay = createScreenplay({
          shot,
          stage,
          logoMask: logoMask as SVGElement,
          logoMaskContainer,
          heroLogoContainer,
        })

        // Attach scroll trigger to screenplay
        ScrollTrigger.create({
          trigger: stage,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          animation: screenplay,
          invalidateOnRefresh: true,
        })
      }

      // Listen to multiple events to ensure video is ready
      shot.addEventListener('loadedmetadata', handleVideoReady, { once: true })
      shot.addEventListener('loadeddata', handleVideoReady, { once: true })
      shot.addEventListener('canplay', handleVideoReady, { once: true })

      // Fallback: try after a timeout if events don't fire
      const fallbackTimeout = setTimeout(() => {
        console.warn('Fallback: forcing video ready check')
        handleVideoReady()
      }, 2000)

      return () => {
        clearTimeout(fallbackTimeout)
        shot.removeEventListener('loadedmetadata', handleVideoReady)
        shot.removeEventListener('loadeddata', handleVideoReady)
        shot.removeEventListener('canplay', handleVideoReady)
        document.documentElement.removeEventListener('touchstart', handleActivateShot)
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      }
    },
    { scope: sceneRef, dependencies: [src] },
  )
}
