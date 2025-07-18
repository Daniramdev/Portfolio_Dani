import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass';

const FloatingBalls = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // Post-processing
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    // Bloom effect
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.5, 0.4, 0.85
    );
    composer.addPass(bloomPass);

    // Glitch effect (random)
    const glitchPass = new GlitchPass();
    glitchPass.goWild = false;
    composer.addPass(glitchPass);

    // Lights
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0xffffff, 1, 100);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    // Create balls
    const balls = [];
    const colors = [0x00ffff, 0xff00ff, 0xffff00];
    const sizes = [1, 0.6, 0.6];
    
    for (let i = 0; i < 3; i++) {
      const geometry = new THREE.SphereGeometry(sizes[i], 32, 32);
      const material = new THREE.MeshPhongMaterial({
        color: colors[i],
        emissive: colors[i],
        emissiveIntensity: 0.5,
        shininess: 100,
        transparent: true,
        opacity: 0.9
      });
      const ball = new THREE.Mesh(geometry, material);
      
      // Position balls in a triangle
      const angle = (i / 3) * Math.PI * 2;
      ball.position.x = Math.cos(angle) * 3;
      ball.position.z = Math.sin(angle) * 3;
      ball.position.y = i === 0 ? 0 : -1; // Main ball in center
      
      scene.add(ball);
      balls.push(ball);
    }

    camera.position.z = 10;

    // Animation
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.01;

      // Animate balls
      balls.forEach((ball, i) => {
        if (i === 0) {
          // Main ball (bigger)
          ball.position.y = Math.sin(time * 0.5) * 0.5;
          ball.rotation.x += 0.01;
          ball.rotation.y += 0.01;
        } else {
          // Smaller balls orbit and attract/repel
          const angle = time * 0.5 + (i * Math.PI * 2 / 3);
          const distance = 3 + Math.sin(time * 0.3) * 1.5;
          
          ball.position.x = Math.cos(angle) * distance;
          ball.position.z = Math.sin(angle) * distance;
          ball.position.y = Math.sin(time * 0.7 + i) * 1.5;
          
          // Attract to main ball occasionally
          if (Math.sin(time * 0.2) > 0.8) {
            ball.position.lerp(balls[0].position, 0.01);
          }
        }
      });

      // Random glitch effect
      if (Math.random() > 0.95) {
        glitchPass.goWild = true;
        setTimeout(() => glitchPass.goWild = false, 200);
      }

      composer.render();
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      composer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0" />;
};

export default FloatingBalls;