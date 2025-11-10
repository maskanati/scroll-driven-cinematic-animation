import type { SceneOverlayProps } from '../types/cinematic.types'

import React from 'react'

import { ReactComponent as BrandHero } from '../../assets/brand-hero.svg'

import '../styles/cinematic-scene.css'

/**
 * SceneOverlay component - Renders layered scene graphics
 * Manages LogoMask (colored, masks video) and HeroLogo (original brand colors)
 */
export const SceneOverlay: React.FC<SceneOverlayProps> = ({ logoMaskRef, heroLogoRef }) => {
  return (
    <>
      <div className="mask-container" ref={logoMaskRef}>
        <div className="overlay-container">
          <BrandHero className="overlay-svg" />
        </div>
      </div>
      <div className="logo-container" ref={heroLogoRef}>
        <div className="overlay-container">
          <BrandHero className="overlay-svg" />
        </div>
      </div>
    </>
  )
}
