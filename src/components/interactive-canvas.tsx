"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import * as THREE from "three";
import { useTheme } from "../context/theme-context";
import { getAudioManager } from "../lib/audio-manager";

export default function InteractiveCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { theme } = useTheme();

  // Keep references to animate transitions
  const currentMeshRef = useRef<THREE.Mesh | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const targetShapeRef = useRef<string>("home");
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // Update target shape based on pathname
  useEffect(() => {
    if (pathname === "/") {
      targetShapeRef.current = "home";
    } else if (pathname.startsWith("/about")) {
      targetShapeRef.current = "about";
    } else if (pathname.startsWith("/portfolio")) {
      targetShapeRef.current = "portfolio";
    } else if (pathname.startsWith("/words")) {
      targetShapeRef.current = "words";
    } else {
      targetShapeRef.current = "home";
    }
  }, [pathname]);

  useEffect(() => {
    if (!containerRef.current) return;

    // 1. Setup Scene, Camera, Renderer
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight || 350;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. Setup Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(0x3b82f6, 1.5, 15);
    pointLight.position.set(-3, -3, 3);
    scene.add(pointLight);

    // 3. Define Geometries
    const geometries: Record<string, THREE.BufferGeometry> = {
      home: new THREE.IcosahedronGeometry(2, 4), // Smooth sphere
      about: new THREE.TorusKnotGeometry(1.2, 0.4, 120, 16), // Complex knot
      portfolio: new THREE.BoxGeometry(1.8, 1.8, 1.8, 4, 4, 4), // Segmented box
      words: new THREE.PlaneGeometry(3.5, 3.5, 15, 15), // Waves grid
    };

    // Store original positions for vertex manipulation (morphing/waves)
    const originalPositions: Record<string, Float32Array> = {};
    Object.entries(geometries).forEach(([key, geo]) => {
      const posAttr = geo.attributes.position;
      originalPositions[key] = new Float32Array(posAttr.array);
    });

    // 4. Create Material with theme colors
    const isDark = theme === "dark";
    const materialColor = isDark ? 0x60a5fa : 0x18181b; // Blue-400 in dark, Zinc-900 in light
    const pointLightColor = isDark ? 0xa855f7 : 0x3b82f6; // Purple in dark, Blue in light
    
    pointLight.color.setHex(pointLightColor);

    const material = new THREE.MeshPhongMaterial({
      color: materialColor,
      wireframe: true,
      transparent: true,
      opacity: 0.8,
      shininess: 80,
      specular: isDark ? 0x93c5fd : 0x27272a,
    });

    // Create starting mesh
    const currentShape = targetShapeRef.current;
    const mesh = new THREE.Mesh(geometries[currentShape], material);
    
    // For waves (plane), rotate slightly so we look down it
    if (currentShape === "words") {
      mesh.rotation.x = -Math.PI / 3;
    }

    scene.add(mesh);
    currentMeshRef.current = mesh;

    // 5. Track Mouse Movement for Interactive Hover Tilt
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      // Clamp values
      mouseRef.current.targetX = Math.max(-1, Math.min(1, x));
      mouseRef.current.targetY = Math.max(-1, Math.min(1, y));
    };

    window.addEventListener("mousemove", handleMouseMove);

    // 6. Animation Loop
    let animationId: number;
    let clock = new THREE.Clock();
    let shapeTransitionTime = 1.0; // Current shape opacity/transition status
    let activeShape = currentShape;

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();
      const audio = getAudioManager();
      const analyserData = audio.getAnalyserData();
      
      // Calculate active audio intensity
      let audioSum = 0;
      if (analyserData.length > 0) {
        for (let i = 0; i < analyserData.length; i++) {
          audioSum += analyserData[i];
        }
      }
      const audioIntensity = analyserData.length > 0 ? audioSum / analyserData.length / 255.0 : 0;
      
      // Update mesh reference & handle page transitions
      if (mesh) {
        // Slowly interpolate mouse coordinates for smooth lag-tilt effect
        mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
        mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

        // Apply route transition check
        if (activeShape !== targetShapeRef.current) {
          // Fade out current mesh
          material.opacity -= 0.08;
          if (material.opacity <= 0.05) {
            // Swap geometry
            activeShape = targetShapeRef.current;
            mesh.geometry.dispose();
            mesh.geometry = geometries[activeShape];
            
            // Adjust geometry rotations for specific layouts
            if (activeShape === "words") {
              mesh.rotation.set(-Math.PI / 3.5, 0, 0);
            } else if (activeShape === "about") {
              mesh.rotation.set(0.3, 0.3, 0);
            } else {
              mesh.rotation.set(0, 0, 0);
            }
          }
        } else if (material.opacity < 0.8) {
          // Fade back in
          material.opacity += 0.08;
        }

        // Apply Rotation: combine automatic rotation + mouse tilt
        const baseSpeed = 0.2 + audioIntensity * 1.5;
        
        if (activeShape === "home") {
          mesh.rotation.y = elapsedTime * 0.15 + mouseRef.current.x * 0.5;
          mesh.rotation.x = elapsedTime * 0.1 + mouseRef.current.y * 0.5;
        } else if (activeShape === "about") {
          mesh.rotation.y = elapsedTime * 0.25 + mouseRef.current.x * 0.6;
          mesh.rotation.z = elapsedTime * 0.15 + mouseRef.current.y * 0.4;
        } else if (activeShape === "portfolio") {
          mesh.rotation.y = elapsedTime * 0.2 + mouseRef.current.x * 0.5;
          mesh.rotation.x = elapsedTime * 0.2 + mouseRef.current.y * 0.5;
        } else if (activeShape === "words") {
          mesh.rotation.z = elapsedTime * 0.05 + mouseRef.current.x * 0.2;
        }

        // 7. Apply Procedural Mesh Vertex Displacement (Oscillating)
        const posAttr = mesh.geometry.attributes.position;
        const originalArray = originalPositions[activeShape];
        const currentArray = posAttr.array as Float32Array;

        if (posAttr && originalArray) {
          const vertexCount = posAttr.count;

          for (let i = 0; i < vertexCount; i++) {
            const x = originalArray[i * 3];
            const y = originalArray[i * 3 + 1];
            const z = originalArray[i * 3 + 2];

            // Use audio frequency buckets or a fallback sine wave
            // Map index to a specific frequency band
            const freqIndex = i % (analyserData.length || 1);
            const freqVal = analyserData.length > 0 ? analyserData[freqIndex] / 255.0 : 0;

            if (activeShape === "home") {
              // Morphing Sphere: push vertices outward/inward based on noise and audio
              const noise = Math.sin(x * 2.5 + elapsedTime * 1.5) * Math.cos(y * 2.5 + elapsedTime * 1.5);
              const factor = 1.0 + (noise * 0.12) + (freqVal * 0.28 * Math.sin(elapsedTime * 6 + i));
              currentArray[i * 3] = x * factor;
              currentArray[i * 3 + 1] = y * factor;
              currentArray[i * 3 + 2] = z * factor;
            } else if (activeShape === "about") {
              // Torus Knot vibration
              const wave = Math.sin(elapsedTime * 2.5 + i * 0.05) * 0.05;
              const soundWave = freqVal * 0.12 * Math.cos(elapsedTime * 8 + i * 0.1);
              currentArray[i * 3] = x + (x / Math.sqrt(x*x + y*y)) * (wave + soundWave);
              currentArray[i * 3 + 1] = y + (y / Math.sqrt(x*x + y*y)) * (wave + soundWave);
            } else if (activeShape === "portfolio") {
              // Floating low-poly block vertices
              const wave = Math.sin(elapsedTime * 3 + (x+y)) * 0.04;
              const soundWave = freqVal * 0.15 * Math.sin(elapsedTime * 10 + i);
              currentArray[i * 3] = x * (1 + wave + soundWave);
              currentArray[i * 3 + 1] = y * (1 + wave + soundWave);
              currentArray[i * 3 + 2] = z * (1 + wave + soundWave);
            } else if (activeShape === "words") {
              // Waves surface displacement along the Z axis
              const waveX = Math.sin(x * 1.5 + elapsedTime * 2.0) * 0.15;
              const waveY = Math.cos(y * 1.5 + elapsedTime * 2.0) * 0.15;
              const soundWave = freqVal * 0.35 * Math.sin(elapsedTime * 7 + (x + y));
              currentArray[i * 3 + 2] = z + waveX + waveY + soundWave;
            }
          }
          posAttr.needsUpdate = true;
        }

        // Pulse camera slightly to beat
        camera.position.z = 8 + Math.sin(elapsedTime * 0.5) * 0.1 - audioIntensity * 0.5;
      }

      renderer.render(scene, camera);
    };

    animate();

    // 8. Handle Container Resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 350;
      
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // 9. Clean up on unmount
    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
      
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      // Dispose resources
      Object.values(geometries).forEach((geo) => geo.dispose());
      material.dispose();
      renderer.dispose();
    };
  }, [theme]); // Re-render scene when dark/light theme changes to swap material colors

  return (
    <div className="relative w-full h-[220px] sm:h-[350px] flex items-center justify-center select-none overflow-hidden rounded-xl border border-zinc-150 dark:border-zinc-850/60 bg-linear-to-b from-zinc-50/20 to-zinc-100/10 dark:from-zinc-950/10 dark:to-zinc-900/5 blueprint-grid">
      {/* Decorative corners */}
      <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-zinc-300 dark:border-zinc-700 pointer-events-none" />
      <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-zinc-300 dark:border-zinc-700 pointer-events-none" />
      <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-zinc-300 dark:border-zinc-700 pointer-events-none" />
      <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-zinc-300 dark:border-zinc-700 pointer-events-none" />

      {/* Grid micro tick */}
      <div className="absolute top-3 right-3 text-[8px] font-mono tracking-widest text-zinc-400 dark:text-zinc-600 pointer-events-none">
        0x3D_GEN
      </div>

      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
    </div>
  );
}
