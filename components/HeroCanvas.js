import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroCanvas() {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // 🔹 Crear escena y render
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 🎇 Cargar textura para el flare (destello del mouse)
    const textureLoader = new THREE.TextureLoader();
    const flareTexture = textureLoader.load("/flare.png");

    // 🔥 Flare interactivo (mejorado)
    const spriteMaterial = new THREE.SpriteMaterial({
      map: flareTexture,
      color: 0xffffff,
      transparent: true,
      blending: THREE.AdditiveBlending,
    });

    const flareSprite = new THREE.Sprite(spriteMaterial);
    flareSprite.scale.set(0.5, 0.5, 1); // 🔹 Más pequeño y elegante
    flareSprite.position.set(0, 0, -1);
    scene.add(flareSprite);

    // ✨ Glassmorfismo: Fondo animado con cambio de colores
    const gradient = new THREE.Mesh(
      new THREE.PlaneGeometry(5, 3),
      new THREE.ShaderMaterial({
        uniforms: {
          u_time: { value: 0 },
          u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
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
          varying vec2 vUv;

          void main() {
            // 🌈 Cambio de colores dinámico
            vec3 baseColor = mix(vec3(0.0, 0.2, 0.6), vec3(0.0, 0.0, 0.1), 
                                 sin(vUv.y * 4.0 + u_time * 0.6) * 0.5 + 0.5);
            
            // ✨ Efecto glassmorfismo con luz difusa
            float glassEffect = smoothstep(0.2, 0.7, sin(u_time * 0.5 + vUv.x * 3.0) * 0.5 + 0.5);
            vec3 finalColor = mix(baseColor, vec3(1.0, 1.0, 1.0), glassEffect * 0.1);
            
            // 🌟 Brillo que sigue al mouse
            float dist = distance(vUv, u_mouse);
            finalColor += vec3(1.0, 0.9, 0.8) * 0.3 * smoothstep(0.3, 0.0, dist);

            gl_FragColor = vec4(finalColor, 1.0);
          }
        `,
      })
    );
    scene.add(gradient);

    // ✨ Partículas flotantes más suaves
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 600;
    const positions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 4;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 3;
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.03,
      color: 0xffffff,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // 🎥 Posición de la cámara
    camera.position.z = 2.5;

    // 🏃‍♂️ Animación
    const clock = new THREE.Clock();
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // 🔹 Fondo animado
      gradient.material.uniforms.u_time.value = elapsedTime;

      // 🔹 Movimiento de partículas
      particles.rotation.y = elapsedTime * 0.02;
      particles.rotation.x = elapsedTime * 0.01;

      // 🔹 Efecto dinámico del flare
      flareSprite.scale.set(0.4 + Math.sin(elapsedTime * 2) * 0.1, 0.4 + Math.sin(elapsedTime * 2) * 0.1, 1);

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    // 🖱️ Interacción con el mouse (flare más dinámico)
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;

      // 🌟 Suavizamos el movimiento del flare
      flareSprite.position.x += (x * 1.5 - flareSprite.position.x) * 0.1;
      flareSprite.position.y += (y * 1.5 - flareSprite.position.y) * 0.1;

      // 🔹 Brillo en shader (hace el cambio más gradual)
      gradient.material.uniforms.u_mouse.value.lerp(new THREE.Vector2(x * 0.5 + 0.5, y * 0.5 + 0.5), 0.1);
    };

    window.addEventListener("mousemove", handleMouseMove);

    // 📏 Ajustar tamaño al cambiar de pantalla
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}
