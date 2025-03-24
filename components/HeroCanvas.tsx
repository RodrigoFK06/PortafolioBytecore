"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useTheme } from "next-themes";

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const gradient = new THREE.Mesh(
      new THREE.PlaneGeometry(5, 3),
      new THREE.ShaderMaterial({
        uniforms: {
          u_time: { value: 0 },
          u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
          u_theme: { value: theme === "light" ? 1 : 0 },
        },
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = vec4(position.xy, 0.0, 1.0);
          }
        `,
        fragmentShader: `
          uniform float u_time;
          uniform vec2 u_mouse;
          uniform float u_theme;
          varying vec2 vUv;

          void main() {
            vec3 baseColor = mix(vec3(0.0, 0.2, 0.6), vec3(0.0, 0.0, 0.1), sin(vUv.y * 4.0 + u_time * 0.6) * 0.5 + 0.5);
            if (u_theme == 1.0) {
              baseColor = mix(baseColor, vec3(0.7, 0.9, 0.9), 0.7);
            }
            float glassEffect = smoothstep(0.2, 0.7, sin(u_time * 0.5 + vUv.x * 3.0) * 0.5 + 0.5);
            vec3 finalColor = mix(baseColor, vec3(1.0), glassEffect * 0.1);
            float dist = distance(vUv, u_mouse);
            finalColor += vec3(1.0, 0.9, 0.8) * 0.3 * smoothstep(0.3, 0.0, dist);
            gl_FragColor = vec4(finalColor, 1.0);
          }
        `,
      })
    );
    scene.add(gradient);

    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 300;
    const positions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 4;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 3;
    }
    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.025,
      color: 0xffffff,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    camera.position.z = 2.5;

    const clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      gradient.material.uniforms.u_time.value = elapsedTime;
      particles.rotation.y = elapsedTime * 0.02;
      particles.rotation.x = elapsedTime * 0.01;
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      gradient.material.uniforms.u_mouse.value.lerp(
        new THREE.Vector2(x * 0.5 + 0.5, y * 0.5 + 0.5),
        0.1
      );
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      gradient.geometry.dispose();
      gradient.material.dispose();
      renderer.dispose();
    };
  }, [mounted, theme]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}