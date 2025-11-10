import type { ScreenplayRefs } from '../types/cinematic.types'

import gsap from 'gsap'

/**
 * Creates GSAP screenplay for cinematic shot animation
 * Orchestrates the visual narrative through scroll-based keyframes
 */
export const createScreenplay = (refs: ScreenplayRefs): gsap.core.Timeline => {
  const { shot, logoMaskContainer, logoMask, heroLogoContainer } = refs

  const screenplay = gsap.timeline({ defaults: { duration: 1 } })

  // Get video duration safely
  const videoDuration =
    shot.duration && !isNaN(shot.duration) && isFinite(shot.duration) ? shot.duration : 10 // fallback duration

  // Act 1: Sync shot playback with scroll
  screenplay.fromTo(
    shot,
    { currentTime: 0 },
    {
      currentTime: videoDuration,
      ease: 'none',
      duration: 1,
      onUpdate: function () {
        // Force update currentTime
        const progress = this.progress()
        const newTime = progress * videoDuration

        if (newTime >= 0 && newTime <= videoDuration && !isNaN(newTime)) {
          try {
            shot.currentTime = newTime
          } catch (e) {
            console.warn('Failed to set currentTime:', e)
          }
        }
      },
    },
  )

  // Act 2: Brighten and desaturate shot (fade to white for a classic black-and-white movie feel)
  screenplay.fromTo(
    shot,
    { filter: 'brightness(1) saturate(1)' },
    { filter: 'brightness(5) saturate(0)', duration: 0.3, ease: 'power2.in' },
    '-=0.4',
  )

  // Act 3: Fade in logo mask container
  if (logoMaskContainer) {
    screenplay.fromTo(logoMaskContainer, { opacity: 0 }, { opacity: 1, duration: 0.3 }, '-=0.2')
  }

  // Act 4a: Animate logo mask (zoom in from distance)
  screenplay.fromTo(
    logoMask,
    { scale: 25, x: 3050, y: 900, opacity: 1 },
    {
      scale: 0.3,
      x: 0,
      y: 0,
      opacity: 1,
      duration: 0.7,
      ease: 'power2.out',
    },
    '-=0.3',
  )

  // Act 4b: Logo Mask Color transition to red (separate timeline for filter)
  screenplay.fromTo(
    logoMask,
    { filter: 'brightness(2) saturate(6) hue-rotate(-11deg) contrast(1)' },
    {
      filter: 'brightness(1.3) saturate(6) hue-rotate(-11deg) contrast(0.5)',
      duration: 0.3,
      ease: 'power2.out',
    },
    '<',
  )

  // Act 5: Animate hero logo (main brand reveal with original colors)
  if (heroLogoContainer) {
    screenplay.fromTo(
      heroLogoContainer,
      { scale: 25, x: 3050, y: 900, opacity: 0 },
      { scale: 0.3, x: 0, y: 0, duration: 0.7, ease: 'power2.out' },
      '<',
    )
    screenplay.fromTo(heroLogoContainer, { opacity: 0 }, { opacity: 1, duration: 0.2 }, '-=0.2')
  }

  // Final Act: Fade out shot and logo mask
  screenplay.to(shot, { opacity: 0, duration: 0.2 }, '-=0.2')

  screenplay.to(logoMaskContainer, { opacity: 0, duration: 0.2 }, '>')

  return screenplay
}

/**
 * Activates cinematic shot on touch devices
 * Required for iOS to enable video playback
 */
export const activateShot = (shot: HTMLVideoElement): void => {
  shot.play()
  shot.pause()
}
