import React, { useEffect, useRef } from "react"
import * as THREE from "three"

const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`

const fragmentShader = `
  uniform sampler2D uTexture;
  uniform vec2 uResolution;
  uniform float uTime;
  uniform vec2 uTrail[8];
  // Removed cursor interaction uniforms

  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);

    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) +
           (c - a) * u.y * (1.0 - u.x) +
           (d - b) * u.x * u.y;
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amp = 0.5;

    for (int i = 0; i < 5; i++) {
      value += amp * noise(p);
      p *= 2.0;
      amp *= 0.5;
    }

    return value;
  }

  void main() {
    vec2 uv = vUv;

    vec2 baseFlow = vec2(
      fbm(uv * 2.0 + vec2(uTime * 0.7, -uTime * 0.09)),
      fbm(uv * 2.0 + vec2(-uTime * 0.9, uTime * 0.8))
    );

    float field = 0.0;
    vec2 distort = vec2(0.0);

    for (int i = 0; i < 8; i++) {
      float idx = float(i);
      float falloff = 1.0 - (idx / 8.0);
      vec2 p = uTrail[i];

      vec2 organic = vec2(
        fbm((uv - p) * 8.0 + idx * 1.73 + uTime * 0.45),
        fbm((uv - p) * 8.0 - idx * 1.21 - uTime * 0.4)
      ) - 0.5;

      float radius = mix(0.02, 0.085, falloff);
      float d = length((uv - p) + organic * 0.03 * falloff);

      float blob = smoothstep(radius + 0.03, radius - 0.01, d);
      field += blob * (0.75 + falloff * 0.9);

      vec2 dir = normalize((uv - p) + vec2(0.0001));
      distort += dir * blob * 0.005 * falloff;
    }

    // Remove cursor/hover interaction
    field = 0.0;
    float halo = 0.0;

    vec2 texUv = uv;
    texUv += (baseFlow - 0.5) * 0.018;
    texUv += (vec2(
      fbm(uv * 4.0 + uTime * 0.14),
      fbm(uv * 4.0 - uTime * 0.17)
    ) - 0.5) * 0.014 * halo;

    vec3 color = texture2D(uTexture, texUv).rgb;

    float grain = (hash(uv * uResolution.xy + uTime) - 0.5) * 0.018;
    color += grain;

    gl_FragColor = vec4(color, 1.0);
  }
`

const InkBlobBackground = ({ imageUrl, children, className = "" }) => {
  const sectionRef = useRef(null)
  const canvasWrapRef = useRef(null)

  useEffect(() => {
    if (typeof window === "undefined") return
    if (!sectionRef.current || !canvasWrapRef.current || !imageUrl) return

    const section = sectionRef.current
    const mount = canvasWrapRef.current

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
    })

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8))
    renderer.setSize(section.clientWidth, section.clientHeight)
    mount.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

    const textureLoader = new THREE.TextureLoader()
    const texture = textureLoader.load(imageUrl)
    texture.minFilter = THREE.LinearFilter
    texture.magFilter = THREE.LinearFilter

    const trailCount = 8
    const trail = Array.from({ length: trailCount }, () => new THREE.Vector2(0.5, 0.5))

    const uniforms = {
      uTexture: { value: texture },
      uResolution: { value: new THREE.Vector2(section.clientWidth, section.clientHeight) },
      uTime: { value: 0 },
      uTrail: { value: trail.map((p) => p.clone()) },
    }

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
    })

    const geometry = new THREE.PlaneGeometry(2, 2)
    const plane = new THREE.Mesh(geometry, material)
    scene.add(plane)

    // No cursor interaction for the background animation

    let sectionVisible = true

    let rafId = null
    const stopAnimation = () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId)
        rafId = null
      }
    }

    const startAnimation = () => {
      if (rafId === null) {
        rafId = window.requestAnimationFrame(animate)
      }
    }

    const resetHoverOnVisibilityChange = (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          sectionVisible = false
          stopAnimation()
        } else {
          sectionVisible = true
          startAnimation()
        }
      })
    }

    const observer = new IntersectionObserver(resetHoverOnVisibilityChange, {
      threshold: 0,
    })
    observer.observe(section)

    // No pointer listeners needed for static background animation

    const onResize = () => {
      renderer.setSize(section.clientWidth, section.clientHeight)
      uniforms.uResolution.value.set(section.clientWidth, section.clientHeight)
    }

    window.addEventListener("resize", onResize)

    const animate = (time) => {
      uniforms.uTime.value = time * 0.001

      // No hover or cursor trail updates for the background-only effect

      if (sectionVisible) {
        renderer.render(scene, camera)
      }
      rafId = window.requestAnimationFrame(animate)
    }

    startAnimation()

    return () => {
      window.cancelAnimationFrame(rafId)
      window.removeEventListener("resize", onResize)
      observer.disconnect()

      geometry.dispose()
      material.dispose()
      texture.dispose()
      renderer.dispose()

      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement)
      }
    }
  }, [imageUrl])

return (
  <div ref={sectionRef} className={`ink-blob-section ${className}`}>
    <div ref={canvasWrapRef} className="ink-blob-canvas" />
    <div className="ink-blob-content">{children}</div>
  </div>
)
}

export default InkBlobBackground