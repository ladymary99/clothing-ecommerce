import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const ParticleSystem = () => {
  const pointsRef = useRef();
  const geometryRef = useRef();

  // Create particle positions
  const particlesCount = 200;
  const positions = useMemo(() => {
    const positions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20; // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20; // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20; // z
    }

    return positions;
  }, []);

  // Animate particles
  useFrame((state) => {
    if (pointsRef.current && geometryRef.current) {
      const time = state.clock.elapsedTime;
      const positions = geometryRef.current.attributes.position.array;

      for (let i = 0; i < particlesCount; i++) {
        const i3 = i * 3;

        // Add floating motion
        positions[i3 + 1] += Math.sin(time + i) * 0.001; // y movement
        positions[i3] += Math.cos(time + i * 0.5) * 0.001; // x movement

        // Reset particles that go too far
        if (positions[i3 + 1] > 10) positions[i3 + 1] = -10;
        if (positions[i3 + 1] < -10) positions[i3 + 1] = 10;
        if (positions[i3] > 10) positions[i3] = -10;
        if (positions[i3] < -10) positions[i3] = 10;
      }

      geometryRef.current.attributes.position.needsUpdate = true;

      // Rotate the entire particle system slowly
      pointsRef.current.rotation.y = time * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry ref={geometryRef}>
        <bufferAttribute
          attach="attributes-position"
          count={particlesCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color="#ffffff"
        transparent={true}
        opacity={0.7}
        sizeAttenuation={true}
      />
    </points>
  );
};

export default ParticleSystem;
