import type { CinematicSceneProps } from './types/cinematic.types'

import React, { useCallback, useEffect, useRef, useState } from 'react'

import { useVideoLoading } from '../contexts/VideoLoadingContext'
import { CinematicShot } from './components/CinematicShot'
import { SceneOverlay } from './components/SceneOverlay'
import { useScreenplayAnimation } from './hooks/useScreenplayAnimation'
import { useShotPreload } from './hooks/useShotPreload'

/**
 * CinematicScene - Orchestrates a scroll-driven cinematic experience
 * Composes shot, overlays, and screenplay animations into a cohesive scene
 *
 * Cinema Metaphor:
 * - Scene: The complete visual sequence
 * - Shot: The video element being played
 * - Screenplay: The animation timeline
 * - Stage: The container for the shot
 * - LogoMask: Colored branding that masks the video during zoom-out (brand-colored.svg)
 * - HeroLogo: Main brand identity with original colors (brand-hero.svg)
 */
export const CinematicScene: React.FC<CinematicSceneProps> = ({ src, duration = '300vh' }) => {
    // Scene element references
    const shotRef = useRef<HTMLVideoElement>(null)
    const stageRef = useRef<HTMLDivElement>(null)
    const logoMaskRef = useRef<HTMLDivElement>(null)
    const heroLogoRef = useRef<HTMLDivElement>(null)
    const sceneRef = useRef<HTMLDivElement>(null)

    // Track loading states
    const [isBlobReady, setIsBlobReady] = useState(false)
    const [isBufferReady, setIsBufferReady] = useState(false)

    // Get video loading context
    const { setVideoReady } = useVideoLoading()

    // Handle blob creation complete
    const handleBlobReady = useCallback(() => {
        console.log('Blob is ready')
        setIsBlobReady(true)
    }, [])

    // Check if both conditions are met
    useEffect(() => {
        if (isBlobReady && isBufferReady) {
            console.log('Both blob and buffer ready - marking video as ready')
            setVideoReady()
        }
    }, [isBlobReady, isBufferReady, setVideoReady])

    // Orchestrate the cinematic experience
    useShotPreload({ shotRef, src, onBlobReady: handleBlobReady })
    useScreenplayAnimation({
        shotRef,
        stageRef,
        logoMaskRef,
        heroLogoRef,
        sceneRef,
        src,
    })

    // Monitor video buffer status
    useEffect(() => {
        const video = shotRef.current
        if (!video) return

        console.log('Starting video buffer monitoring')
        let isReady = false

        // Check video buffer
        const checkBuffer = () => {
            if (isReady) return false

            const buffered = video.buffered
            const duration = video.duration

            // Check if we have at least 2 seconds buffered OR 30% of video buffered
            if (buffered.length > 0 && duration > 0) {
                const bufferedEnd = buffered.end(buffered.length - 1)
                const bufferedAmount = bufferedEnd
                const bufferPercentage = (bufferedAmount / duration) * 100

                console.log(
                    `Video buffer: ${bufferedAmount.toFixed(2)}s / ${duration.toFixed(2)}s (${bufferPercentage.toFixed(1)}%)`,
                )

                // Wait for meaningful buffer: 2s minimum OR 30% of video
                if (bufferedAmount >= 2 || bufferPercentage >= 30) {
                    console.log('Video has sufficient buffer')
                    isReady = true
                    setIsBufferReady(true)
                    return true
                }
            }
            return false
        }

        // Listen for progress events to check buffer
        const handleProgress = () => {
            if (video.readyState >= 3) {
                checkBuffer()
            }
        }

        // Multiple strategies to detect when video has data
        video.addEventListener('progress', handleProgress)
        video.addEventListener('canplay', checkBuffer)
        video.addEventListener('canplaythrough', checkBuffer)
        video.addEventListener('loadeddata', checkBuffer)

        // Check immediately if already loaded
        if (video.readyState >= 3) {
            setTimeout(checkBuffer, 100)
        }

        // Fallback timeout - ensure we don't block forever
        const fallbackTimeout = setTimeout(() => {
            if (!isReady) {
                console.log('Buffer check timeout - marking as ready anyway')
                isReady = true
                setIsBufferReady(true)
            }
        }, 8000)

        return () => {
            video.removeEventListener('progress', handleProgress)
            video.removeEventListener('canplay', checkBuffer)
            video.removeEventListener('canplaythrough', checkBuffer)
            video.removeEventListener('loadeddata', checkBuffer)
            clearTimeout(fallbackTimeout)
        }
    }, [src])

    return (
        <div ref={sceneRef}>
            <div ref={stageRef}>
                <CinematicShot src={src} shotRef={shotRef} duration={duration} />
            </div>

            <SceneOverlay logoMaskRef={logoMaskRef} heroLogoRef={heroLogoRef} />
        </div>
    )
}
