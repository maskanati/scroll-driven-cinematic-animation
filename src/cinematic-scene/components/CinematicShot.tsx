import type { CinematicShotProps } from '../types/cinematic.types'

import React from 'react'

import '../styles/cinematic-scene.css'

/**
 * CinematicShot component - Renders the video shot element
 * Represents a single shot in the cinematic sequence
 */
export const CinematicShot: React.FC<CinematicShotProps> = ({
    src,
    shotRef,
    duration = '300vh',
}) => {
    const stageStyle: React.CSSProperties = { height: duration }

    return (
        <div
            className="scroll-video-container"
            style={stageStyle} // eslint-disable-line react/forbid-component-props
        >
            <video
                ref={shotRef}
                src={src}
                muted
                playsInline
                preload="auto"
                className="scroll-video-player"
                aria-label="Cinematic shot"
                // Performance optimizations
                disablePictureInPicture
                controlsList="nodownload nofullscreen noremoteplayback"
                // Hint for browser to prioritize performance
                poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'/%3E"
            />
        </div>
    )
}
