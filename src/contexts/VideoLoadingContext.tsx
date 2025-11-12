import React, { createContext, useCallback, useContext, useState } from 'react'

interface VideoLoadingContextType {
    isVideoReady: boolean
    setVideoReady: () => void
}

const VideoLoadingContext = createContext<VideoLoadingContextType>({
    isVideoReady: false,
    setVideoReady: () => {},
})

export const useVideoLoading = () => useContext(VideoLoadingContext)

export const VideoLoadingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isVideoReady, setIsVideoReady] = useState(false)

    const setVideoReady = useCallback(() => {
        console.log('Video marked as ready')
        setIsVideoReady(true)
    }, [])

    return (
        <VideoLoadingContext.Provider value={{ isVideoReady, setVideoReady }}>
            {children}
        </VideoLoadingContext.Provider>
    )
}
