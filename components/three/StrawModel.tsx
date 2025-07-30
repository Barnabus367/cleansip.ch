'use client';

import { useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

interface StrawModelProps {
  mousePosition: { x: number; y: number };
  isHovered: boolean;
}

export default function StrawModel({ mousePosition, isHovered }: StrawModelProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { viewport } = useThree();

  // Create straw geometry - cylindrical with slight taper
  const geometry = useMemo(() => {
    const geo = new THREE.CylinderGeometry(0.05, 0.04, 3, 32, 1);
    // Add bend for more realistic look
    const positionAttribute = geo.attributes.position;
    if (positionAttribute) {
      const positions = positionAttribute.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        const y = positions[i + 1];
        const x = positions[i];
        if (y !== undefined && x !== undefined) {
          positions[i] = x + Math.sin(y * 0.5) * 0.02; // Slight curve
        }
      }
      positionAttribute.needsUpdate = true;
    }
    return geo;
  }, []);

  // Plastic shader material with refraction
  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color('#00BFA6') },
        opacity: { value: 0.8 },
        refractPower: { value: 0.3 },
        mouseInfluence: { value: 0.0 },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying vec2 vUv;
        uniform float time;
        uniform float mouseInfluence;
        
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;
          vUv = uv;
          
          vec3 pos = position;
          
          // Subtle wave animation when hovered
          if (mouseInfluence > 0.0) {
            pos.x += sin(position.y * 2.0 + time * 3.0) * 0.02 * mouseInfluence;
          }
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 color;
        uniform float opacity;
        uniform float refractPower;
        uniform float mouseInfluence;
        
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying vec2 vUv;
        
        void main() {
          vec3 normal = normalize(vNormal);
          
          // Fresnel effect for plastic look
          float fresnel = pow(1.0 - dot(normal, vec3(0.0, 0.0, 1.0)), 2.0);
          
          // Refraction-like distortion
          vec2 distortion = normal.xy * refractPower;
          
          // Color with highlights
          vec3 finalColor = color;
          finalColor += vec3(0.3, 0.3, 0.5) * fresnel;
          
          // Add subtle animation
          finalColor += sin(time + vPosition.y * 2.0) * 0.1 * mouseInfluence;
          
          // Transparency with edge highlights
          float alpha = opacity + fresnel * 0.3;
          
          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
    });
  }, []);

  useFrame((state) => {
    if (!meshRef.current || !materialRef.current) return;

    const time = state.clock.getElapsedTime();
    
    // Update shader uniforms
    if (materialRef.current?.uniforms.time) {
      materialRef.current.uniforms.time.value = time;
    }
    if (materialRef.current?.uniforms.mouseInfluence) {
      materialRef.current.uniforms.mouseInfluence.value = isHovered ? 1.0 : 0.0;
    }

    // Mouse following rotation with quaternions
    const targetRotationX = (mousePosition.y - 0.5) * 0.5;
    const targetRotationY = (mousePosition.x - 0.5) * 0.5;
    
    // Smooth quaternion interpolation
    const targetQuaternion = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(targetRotationX, targetRotationY, 0)
    );
    
    meshRef.current.quaternion.slerp(targetQuaternion, 0.05);
    
    // Floating animation
    meshRef.current.position.y = Math.sin(time * 0.5) * 0.1;
    
    // Scale animation on hover
    const targetScale = isHovered ? 1.1 : 1.0;
    meshRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.1
    );
  });

  return (
    <mesh 
      ref={meshRef} 
      geometry={geometry} 
      material={shaderMaterial}
      position={[0, 0, 0]}
      rotation={[0, 0, Math.PI / 6]}
    >
      <shaderMaterial ref={materialRef} attach="material" {...shaderMaterial} />
    </mesh>
  );
}
