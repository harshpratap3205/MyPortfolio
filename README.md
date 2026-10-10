# 🚀 3D Avatar Portfolio Website

An interactive, high-performance developer portfolio website featuring an encrypted 3D avatar model with procedural bone tracking, layered animation mixing, GSAP scroll choreography, and an interactive Rapier physics tech stack.

---

## 📖 Quick Links & Documentation

- 📘 **[In-Depth 3D Model & Animation Architecture Guide](3D_MODEL_AND_ANIMATIONS.md)**: Exhaustive technical guide detailing encryption, Draco decompression, bone filtering algorithms, lerping equations, and GSAP timelines.

---

## 🧠 How the 3D Model Works

The 3D character pipeline combines performance optimization, security, and responsive rendering:

### 1. Asset Encryption & Security (`decrypt.ts` & `encrypt.cjs`)
- To prevent 3D asset scraping, the model is stored as an AES-256-CBC encrypted file at `/models/character.enc`.
- The raw GLB file is encrypted using Node.js `crypto` with a SHA-256 key and a 16-byte initialization vector (`iv`).
- In the browser, the **Web Crypto API** (`window.crypto.subtle`) decrypts the binary data in-memory at runtime and converts it into a temporary Blob Object URL.

### 2. Mesh Decompression & Loading (`character.ts`)
- The decrypted blob is parsed using Three.js **`GLTFLoader`** coupled with **`DRACOLoader`**.
- Geometric data is decompressed on background WebAssembly threads using the `/draco/` decoder.
- Before rendering, GPU shaders are pre-compiled asynchronously using `renderer.compileAsync(character, camera, scene)` to avoid initial frame drop.
- Shadows (`castShadow`, `receiveShadow`) and frustum culling (`frustumCulled = true`) are configured across all child meshes.

### 3. Scene Setup, Camera & Lighting (`Scene.tsx` & `lighting.ts`)
- **Renderer**: `THREE.WebGLRenderer` configured with transparent alpha background, antialiasing, and `THREE.ACESFilmicToneMapping`.
- **Perspective Camera**: Telephoto lens setting (`14.5°` field of view, initial position `[0, 13.1, 24.7]`, zoom `1.1`) creating an isometric aesthetic.
- **Lighting**:
  - High Dynamic Range Environment map (`char_enviorment.hdr`) loaded with `RGBELoader` for ambient reflections.
  - Directional light (`0xc7a9ff`) with a 1024x1024 shadow map.
  - Dynamic Point Light synced to the laptop screen's emissive intensity for realistic monitor bounce light.

---

## 🎬 Animation Controls & Interaction Systems

The animation architecture (`src/components/Character/utils/animationUtils.ts`) coordinates multiple independent animation streams simultaneously:

### 1. Bone Isolation via `filterAnimationTracks`
Playing an animation clip in Three.js normally overrides all bones in the skeleton. This project solves this using selective bone filtering:
- The `filterAnimationTracks` utility extracts only the tracks relevant to designated bones.
- **`typing` Action**: Filtered to 50+ hand, finger, and arm bones (`typingBoneNames` in `src/data/boneData.ts`), leaving the neck and head bones free for dynamic procedural rotation.
- **Mechanical Keyboard Switches**: Clips `"key1"`, `"key2"`, `"key5"`, and `"key6"` play alongside typing at 1.2x speed.

### 2. Interactive Eyebrow Raise on Hover (`browup`)
- A transparent hover zone (`.character-hover`) sits over the character's face.
- Target bones: `eyebrowBoneNames = ["eyebrow_L", "eyebrow_R"]`.
- On `mouseenter`, the `browup` action fades in with weight `4`. On `mouseleave`, it fades out smoothly.

### 3. Procedural Head Tracking with Clamped Lerp (`mouseUtils.ts`)
- Listens to mouse coordinates and touch drag events, mapped to Normalized Device Coordinates (`[-1, 1]`).
- The `headBone` (`spine006`) uses linear interpolation (`THREE.MathUtils.lerp`) inside the `requestAnimationFrame` loop:
  - **Yaw (Horizontal)**: Tracks mouse X clamped to $\pm 30^\circ$ ($\pi/6$).
  - **Pitch (Vertical)**: Tracks mouse Y clamped between $-0.3$ and $0.4$ radians to prevent the neck from clipping.
  - **Auto-Reset on Scroll**: When the user scrolls past the hero section (`scrollY > 200`), the head gently locks into a fixed reading angle (`x: -0.4, y: -0.3`).

### 4. GSAP Scroll Choreography (`GsapScroll.ts`)
Three synchronized `gsap.timeline()` instances control the character and camera across sections:
- **Timeline 1 (Hero $\rightarrow$ About)**: Rotates avatar ($y: 0 \rightarrow 0.7$), zooms camera ($z: 22$), and shifts character laterally ($x: -25\%$).
- **Timeline 2 (About $\rightarrow$ What I Do)**: Pulls camera back ($z: 75, y: 8.4$), tilts neck bone forward (`spine005.rotation.x = 0.6`), slides laptop into place, and activates monitor emissive glow.
- **Timeline 3 (Exit)**: Slides character container out ($y: -100\%$) as the user enters projects and career sections.

### 5. Interactive Physics Tech Stack (`TechStack.tsx`)
- Secondary 3D interactive module built with **React Three Fiber** and **`@react-three/rapier`**.
- 30 spheres textured with tech logos floating under zero gravity (`gravity={[0, 0, 0]}`).
- Custom per-frame impulse attracts spheres toward the center.
- A kinematic sphere collider follows the cursor in 3D space, scattering and bouncing tech balls as you move your mouse.
- Post-processing: Screen-space ambient occlusion using `N8AO`.

---

## ⚙️ Tech Stack

| Technology | Purpose |
|---|---|
| **React 18** | UI component structure & lifecycle management |
| **TypeScript** | Type-safe development |
| **Vite** | Blazing-fast development and bundle tooling |
| **Three.js** | 3D scene, materials, lights, and AnimationMixer |
| **@react-three/fiber** | Declarative Three.js for the tech stack physics canvas |
| **@react-three/rapier** | Real-time WebAssembly physics engine |
| **GSAP & ScrollTrigger** | Scroll-driven animations, transitions, and text splits |
| **Web Crypto API** | Client-side AES-256-CBC 3D model decryption |

---

## 📁 Project Structure

```
├── public/
│   ├── draco/              # WebAssembly Draco mesh decompression workers
│   ├── images/             # Tech stack sphere textures & project previews
│   └── models/
│       ├── character.enc   # Encrypted 3D avatar model
│       ├── char_enviorment.hdr # 360 HDRI reflection environment
│       └── encrypt.cjs     # AES encryption utility script
├── src/
│   ├── components/
│   │   ├── Character/      # 3D Avatar Engine
│   │   │   ├── Scene.tsx   # Three.js canvas & render loop
│   │   │   └── utils/
│   │   │       ├── animationUtils.ts # AnimationMixer & track filtering
│   │   │       ├── character.ts      # Model loader & Draco pipeline
│   │   │       ├── decrypt.ts        # Web Crypto decryption
│   │   │       ├── lighting.ts       # HDRI, point & directional lights
│   │   │       ├── mouseUtils.ts     # Head tracking & clamped lerp
│   │   │       └── resizeUtils.ts    # Aspect ratio & GSAP refresh
│   │   ├── utils/
│   │   │   ├── GsapScroll.ts         # ScrollTrigger timelines
│   │   │   ├── initialFX.ts          # Page entrance effects
│   │   │   └── splitText.ts          # GSAP text reveal
│   │   ├── TechStack.tsx   # R3F + Rapier zero-gravity physics balls
│   │   ├── Landing.tsx     # Hero section
│   │   ├── About.tsx       # About Me section
│   │   ├── WhatIDo.tsx     # Services / What I Do section
│   │   ├── Career.tsx      # Experience & timeline section
│   │   ├── Work.tsx        # Projects gallery
│   │   └── Loading.tsx     # Interactive loading screen
│   └── data/
│       └── boneData.ts     # Bone lists for animation isolation
├── 3D_MODEL_AND_ANIMATIONS.md # In-depth technical architecture guide
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>

# Navigate into project directory
cd Portfolio-Website

# Install dependencies
npm install

# Start Vite local development server
npm run dev
```

### Building for Production
```bash
npm run build
```

---

## 🛠️ Instructions & GSAP Notice

I have modified the GSAP Club plugins using trial versions.  
⚠️ **Note**: Trial plugins cannot be used for production or hosting.

For official GSAP Club plugins, refer here:  
https://gsap.com/docs/v3/Installation/

