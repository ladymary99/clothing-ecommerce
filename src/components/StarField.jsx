import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const StarField = () => {
  const starsRef = useRef();
  const geometryRef = useRef();

  const starsCount = 300;

  // Create star positions and properties
  const { positions, colors, sizes } = useMemo(() => {
    const positions = new Float32Array(starsCount * 3);
    const colors = new Float32Array(starsCount * 3);
    const sizes = new Float32Array(starsCount);

    for (let i = 0; i < starsCount; i++) {
      // Random positions in a sphere
      const radius = 15 + Math.random() * 10;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      // Random colors (mostly white/blue/yellow)
      const colorChoice = Math.random();
      if (colorChoice < 0.7) {
        colors[i * 3] = 1; // white
        colors[i * 3 + 1] = 1;
        colors[i * 3 + 2] = 1;
      } else if (colorChoice < 0.85) {
        colors[i * 3] = 0.8; // blue-ish
        colors[i * 3 + 1] = 0.9;
        colors[i * 3 + 2] = 1;
      } else {
        colors[i * 3] = 1; // yellow-ish
        colors[i * 3 + 1] = 1;
        colors[i * 3 + 2] = 0.8;
      }

      // Random sizes
      sizes[i] = Math.random() * 0.03 + 0.01;
    }

    return { positions, colors, sizes };
  }, []);

  // Animate stars (twinkling effect)
  useFrame((state) => {
    if (starsRef.current && geometryRef.current) {
      const time = state.clock.elapsedTime;
      const sizeArray = geometryRef.current.attributes.size.array;

      for (let i = 0; i < starsCount; i++) {
        // Twinkling effect
        const baseSize = sizes[i];
        sizeArray[i] = baseSize + Math.sin(time * 3 + i) * baseSize * 0.5;
      }

      geometryRef.current.attributes.size.needsUpdate = true;

      // Slow rotation
      starsRef.current.rotation.y = time * 0.01;
    }
  });

  return (
    <points ref={starsRef}>
      <bufferGeometry ref={geometryRef}>
        <bufferAttribute
          attach="attributes-position"
          count={starsCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={starsCount}
          array={colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={starsCount}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={1}
        transparent={true}
        opacity={0.8}
        sizeAttenuation={true}
        vertexColors={true}
        alphaTest={0.001}
      />
    </points>
  );
};

export default StarField;
