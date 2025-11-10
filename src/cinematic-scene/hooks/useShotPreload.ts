import type { ShotPreloadConfig } from '../types/cinematic.types'

import { useEffect } from 'react'

/**
 * Custom hook for preloading cinematic shot content
 * Handles shot fetching and blob URL creation for optimal performance
 * Uses IntersectionObserver to defer loading until needed
 */
export const useShotPreload = ({ shotRef, src, onBlobReady }: ShotPreloadConfig): void => {
  useEffect(() => {
    const shot = shotRef.current
    if (!shot) return

    let blobURL: string | null = null
    let abortController: AbortController | null = null

    // Force load video immediately for production reliability
    const loadVideo = () => {
      if ('fetch' in window) {
        abortController = new AbortController()

        console.log('Starting video blob fetch...')

        // Preload video with fetch API for better control
        fetch(shot.currentSrc || shot.src, {
          signal: abortController.signal,
          // Enable streaming
          mode: 'cors',
          cache: 'force-cache',
        })
          .then((response) => {
            if (!response.ok) throw new Error('Failed to fetch video')
            console.log('Video fetched, creating blob...')
            return response.blob()
          })
          .then((blob) => {
            console.log('Blob created successfully')
            blobURL = URL.createObjectURL(blob)
            const currentTime = shot.currentTime

            shot.src = blobURL
            shot.currentTime = currentTime + 0.01

            // Force load the video fully
            shot.load()

            // Notify that blob is ready
            if (onBlobReady) {
              onBlobReady()
            }
          })
          .catch((error) => {
            if (error.name !== 'AbortError') {
              console.error('Failed to preload cinematic shot:', error)
              // Fallback: try to load original video
              shot.load()
              // Still notify as "ready" to not block splash screen forever
              if (onBlobReady) {
                onBlobReady()
              }
            }
          })
      } else {
        // Fallback for browsers without fetch
        shot.load()
        if (onBlobReady) {
          onBlobReady()
        }
      }
    }

    // Start loading immediately
    loadVideo()

    return () => {
      if (abortController) {
        abortController.abort()
      }
      if (blobURL) {
        URL.revokeObjectURL(blobURL)
      }
    }
  }, [shotRef, src, onBlobReady])
}
