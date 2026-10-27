import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uTexture;
  uniform vec2 uResolution;
  uniform float uTime;
  uniform float uFlowStrength;
  uniform vec4 uWaves[24];
  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 cell = floor(p);
    vec2 f = fract(p);
    vec2 blend = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(cell), hash(cell + vec2(1.0, 0.0)), blend.x),
      mix(hash(cell + vec2(0.0, 1.0)), hash(cell + vec2(1.0)), blend.x),
      blend.y
    );
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 5; i++) {
      value += amplitude * noise(p);
      p *= 2.0;
      amplitude *= 0.5;
    }
    return value;
  }

  void main() {
    float aspect = uResolution.x / uResolution.y;
    vec2 position = vUv * vec2(aspect, 1.0);
    vec2 displacement = vec2(0.0);
    for (int i = 0; i < 24; i++) {
      vec4 wave = uWaves[i];
      float age = uTime - wave.z;
      if (wave.w > 0.0 && age >= 0.0 && age < 1.8) {
        vec2 delta = position - wave.xy * vec2(aspect, 1.0);
        float distance = length(delta);
        float radius = age * 0.22;
        float envelope = exp(-pow((distance - radius) / 0.085, 2.0));
        float fade = pow(1.0 - age / 1.8, 2.0);
        float ripple = sin((distance - radius) * 48.0) * envelope;
        displacement += delta / max(distance, 0.001)
          * ripple * fade * wave.w * 0.009;
      }
    }
    vec2 uv = vUv + displacement / vec2(aspect, 1.0);
    // Original liquid movement runs by default; pointer waves layer over it.
    vec2 flow = vec2(
      fbm(vUv * 2.0 + vec2(uTime * 0.7, -uTime * 0.09)),
      fbm(vUv * 2.0 + vec2(-uTime * 0.9, uTime * 0.8))
    );
    uv += (flow - 0.5) * 0.018 * uFlowStrength;
    gl_FragColor = texture2D(uTexture, clamp(uv, vec2(0.001), vec2(0.999)));
    #include <colorspace_fragment>
  }
`;

const InkBlobBackground = ({ imageUrl, children, className = "" }) => {
  const sectionRef = useRef(null);
  const mountRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const mount = mountRef.current;
    if (!section || !mount || !imageUrl) return;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    } catch {
      // The CSS background remains visible if WebGL is unavailable.
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8));
    // Match the original image's browser colors after sampling its sRGB texture.
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.NoToneMapping;
    mount.appendChild(renderer.domElement);

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const waves = Array.from(
      { length: 24 },
      () => new THREE.Vector4(0, 0, -10, 0)
    );
    const uniforms = {
      uTexture: { value: null },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uTime: { value: 0 },
      uFlowStrength: { value: motion.matches ? 0 : 1 },
      uWaves: { value: waves },
    };
    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
    });
    const geometry = new THREE.PlaneGeometry(2, 2);
    const scene = new THREE.Scene();
    scene.add(new THREE.Mesh(geometry, material));
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    let frame = null;
    let loaded = false;
    let disposed = false;
    let nextWave = 0;
    let lastInput = -Infinity;
    let lastPoint = null;
    let visible = true;

    const render = (time) => {
      frame = null;
      if (!loaded || disposed || !visible || document.hidden) return;
      uniforms.uTime.value = time * 0.001;
      renderer.render(scene, camera);
      if (!motion.matches) {
        frame = window.requestAnimationFrame(render);
      }
    };
    const requestRender = () => {
      if (
        frame === null &&
        loaded &&
        visible &&
        !document.hidden &&
        !disposed
      ) {
        frame = window.requestAnimationFrame(render);
      }
    };
    const reset = () => {
      waves.forEach((wave) => (wave.w = 0));
      uniforms.uFlowStrength.value = motion.matches ? 0 : 1;
      lastPoint = null;
      lastInput = -Infinity;
      if (frame !== null) window.cancelAnimationFrame(frame);
      frame = null;
      requestRender();
    };

    const texture = new THREE.TextureLoader().load(imageUrl, () => {
      if (disposed) return;
      loaded = true;
      requestRender();
    });
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    uniforms.uTexture.value = texture;

    const resize = () => {
      renderer.setSize(section.clientWidth, section.clientHeight);
      uniforms.uResolution.value.set(section.clientWidth, section.clientHeight);
      reset();
    };
    const move = (event) => {
      if (
        motion.matches ||
        event.pointerType === "touch" ||
        !visible ||
        document.hidden
      )
        return;
      const now = performance.now();
      if (now - lastInput < 32) return;
      const bounds = section.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;
      const x = (event.clientX - bounds.left) / bounds.width;
      const y = 1 - (event.clientY - bounds.top) / bounds.height;
      const distance = lastPoint
        ? Math.hypot(
            (x - lastPoint.x) * bounds.width,
            (y - lastPoint.y) * bounds.height
          )
        : 12;
      if (distance < 3) return;
      waves[nextWave].set(
        x,
        y,
        now * 0.001,
        Math.min(1, 0.35 + distance / 100)
      );
      nextWave = (nextWave + 1) % waves.length;
      lastPoint = { x, y };
      lastInput = now;
      requestRender();
    };
    const leave = () => {
      lastPoint = null;
    };
    const visibility = () => {
      reset();
    };
    const sizeObserver = new ResizeObserver(resize);
    sizeObserver.observe(section);
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      reset();
    });
    observer.observe(section);
    resize();
    section.addEventListener("pointermove", move);
    section.addEventListener("pointerleave", leave);
    motion.addEventListener("change", reset);
    document.addEventListener("visibilitychange", visibility);

    return () => {
      disposed = true;
      if (frame !== null) window.cancelAnimationFrame(frame);
      sizeObserver.disconnect();
      observer.disconnect();
      section.removeEventListener("pointermove", move);
      section.removeEventListener("pointerleave", leave);
      motion.removeEventListener("change", reset);
      document.removeEventListener("visibilitychange", visibility);
      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [imageUrl]);

  return (
    <div
      ref={sectionRef}
      className={`ink-blob-section ${className}`}
      style={{
        backgroundImage: `url("${imageUrl}")`,
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
      }}
    >
      <div
        ref={mountRef}
        className="ink-blob-canvas"
        aria-hidden="true"
        style={{ pointerEvents: "none" }}
      />
      <div className="ink-blob-content">{children}</div>
    </div>
  );
};

export default InkBlobBackground;
