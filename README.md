# 🎬 Cinematic Scroll-Driven Video Experiences in React

<div align="center">

[![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=flat&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![GSAP](https://img.shields.io/badge/GSAP-3.13.0-88CE02?style=flat&logo=greensock&logoColor=white)](https://greensock.com/gsap/)
[![Vite](https://img.shields.io/badge/Vite-7.1.7-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat)](LICENSE)


**This project is the complete source code from my Medium article:**  
**[Cinematic Scroll-Driven Video Experiences in React](https://medium.com/@maskanati/cinematic-scroll-driven-video-experiences-in-react-fe33f7749b26)**

</div>

---


This project demonstrates how to create cinematic scroll-driven animations.
<div align="center">
  <img
    src="./docs/images/scroll-driven-cinematic-preview.gif"
    alt="Cinematic Scroll-Driven Video Experience Preview"
    width="800"
  />
</div>

## Demo

- **Live Preview:** [View Demo](https://codeboy.ai/) _(temporarily available)_
- **Playground:** [Open in CodeSandbox](https://codesandbox.io/p/github/maskanati/scroll-driven-cinematic-animation/main?import=true)

## Getting Started

### Prerequisites

- Node.js 18+ or higher
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/maskanati/scroll-driven-cinematic-animation.git
cd scroll-driven-cinematic-animation
```

2. **Install dependencies**

```bash
pnpm install
```
or
```bash
npm install
```

3. **Start the development server**

```bash
pnpm dev
```
or
```bash
npm run dev
```

4. **Open your browser**

Navigate to `http://localhost:5173` to see the cinematic experience in action.

###  Linting & Formatting Scripts

```bash
pnpm lint         # Lint code
pnpm lint:fix     # Fix linting issues
pnpm format       # Format code with Prettier
pnpm format:check # Check code formatting
```

## Architecture

### Project Structure

```
src/
├── App.tsx                            
├── cinematic-scene/                   # Core cinematic system
│   ├── cinematic-scene.tsx            # Scene orchestrator component
│   ├── components/
│   │   ├── CinematicShot.tsx          # Video element with scroll sync
│   │   └── SceneOverlay.tsx           # Logo mask and overlay renderer
│   ├── hooks/
│   │   ├── useScreenplayAnimation.ts  # GSAP scroll animation logic
│   │   └── useShotPreload.ts          # Video preload & buffering
│   ├── styles/
│   │   └── cinematic-scene.css        # Scene-specific styles
│   ├── types/
│   │   └── cinematic.types.ts         # TypeScript definitions
│   └── utils/
│       └── screenplay.utils.ts        # GSAP timeline creation
└── contexts/
    └── VideoLoadingContext.tsx        # Global video readiness state
```

### Thinking Like a Director

This project borrows filmmaking terminology to create a shared language between engineers and designers:

| Cinema Term | Implementation | Purpose |
|------------|----------|------------------|
| **Scene** | \`CinematicScene\` | Orchestrates all visual layers |
| **Shot** | \`<video>\` element | Main video element tied to scroll |
| **Screenplay** | GSAP Timeline | Defines animation flow and pacing |
| **Stage** | Scroll container | Provides space for the narrative |
| **Mask / Logo** | SVG overlays | Brand reveals and transitions |
| **Acts** | Timeline segments | Animation phases |

## The Screenplay: Animation Breakdown

### Act 1: Scroll-Controlled Playback
Links video playback directly to scroll position, giving users the feeling of controlling the scene.

⚠️ **Performance Tip:** Works best at 30fps for smooth synchronization. Convert videos using [Video2Edit](https://www.video2edit.com/convert-to-mp4) if playback feels choppy.

### Act 2: Cinematic Glow Transition
The video gradually brightens and loses color, creating a soft fade-to-white moment that evokes classic black-and-white films.

### Act 3 & 4: Logo Mask Reveal (Most Complex)
The brand logo appears by showing the video only through the logo shape using \`mix-blend-mode: multiply\` with proper z-index layering.

**Key CSS:**
```css
.scroll-video-player {
  position: sticky;
  z-index: 1;
}

.mask-container {
  mix-blend-mode: multiply;
  color: white;
  background: black;
  z-index: 2;
}
```

### Act 5: Hero Logo Entrance
The main logo enters in its original colors, creating a clean brand lockup.

### Final Act: Smooth Fade Out
Video and mask fade smoothly, resetting for the next sequence.

## Key Components

### CinematicScene
The main orchestrator that unites video, overlays, preloading, and animation logic.

```tsx
import { CinematicScene } from './cinematic-scene'

<CinematicScene 
  src="/path/to/video.mp4" 
  duration="300vh" 
/>
```

### useScreenplayAnimation Hook
Manages scroll-driven interactions and ensures GSAP animations start only when the video is ready.

**Features:**
- Touch activation for iOS
- Metadata readiness checks
- Proper cleanup on unmount
- ScrollTrigger integration

### useShotPreload Hook
Handles video preloading, blob creation, and buffer management for smooth playback.

## Performance Optimization

Creating cinematic scroll experiences requires more than beautiful animation. It needs consistent, high-performance execution. Follow these techniques to keep your animations smooth and reliable:

* One ScrollTrigger per narrative to prevent overlapping playheads.
* Use fromTo() to avoid cached start values.
* Create timelines only after video metadata is ready.
* Merge small tweens to minimize layout recalculations.
* Use blob caching and readiness gates to avoid buffering.
* Be sure to include muted and playsInline attributes, enabling touch activation on Safari.
* Call URL.revokeObjectURL on unmount to prevent memory leaks.

## Core Principles

1. **Give every motion meaning** - Don't animate for the sake of movement
2. **Pace the rhythm** - A pause or gentle fade can say more than speed
3. **Prioritize performance** - Dropped frames break immersion
4. **Design modularly** - Reusable hooks make iteration faster
5. **Document your vision** - Treat timelines like storyboards

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

### Inspired By
- [Rockstar Games' Grand Theft Auto VI](https://www.rockstargames.com/VI) - Cinematic pacing, framing, and logo reveal style

### References
- [Play Video on Scroll](https://www.youtube.com/watch?v=s7n9vRFvmM0) -  Sync video element to scroll progress
- [Easy GSAP Scrolling Mask Animation](https://www.youtube.com/watch?v=aUZpwBx9Vdw) - Mask effects

---

<div align="center">

**If this project helped you, consider giving it a ⭐ star!**

Made with ❤️ and a filmmaker's mindset

</div>
