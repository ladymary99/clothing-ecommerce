import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const CharacterTrail = ({ characterPosition = [0, 0, 0] }) => {
  const trailRef = useRef();
  const geometryRef = useRef();
  const [trailPositions, setTrailPositions] = useState([]);

  const maxTrailLength = 50;

  useFrame((state) => {
    if (trailRef.current && geometryRef.current) {
      const time = state.clock.elapsedTime;

      // Add current character position to trail (with some offset for foot position)
      const newPosition = [
        characterPosition[0] + Math.sin(time * 4) * 0.1,
        characterPosition[1] - 1.2, // foot level
        characterPosition[2],
      ];

      setTrailPositions((prev) => {
        const newTrail = [newPosition, ...prev];
        return newTrail.slice(0, maxTrailLength);
      });

      // Update geometry
      if (trailPositions.length > 1) {
        const positions = new Float32Array(trailPositions.length * 3);
        const colors = new Float32Array(trailPositions.length * 3);
        const sizes = new Float32Array(trailPositions.length);

        trailPositions.forEach((pos, i) => {
          positions[i * 3] = pos[0];
          positions[i * 3 + 1] = pos[1];
          positions[i * 3 + 2] = pos[2];

          // Fade color based on age
          const age = i / trailPositions.length;
          const intensity = 1 - age;

          colors[i * 3] = 0.3 + intensity * 0.7; // red
          colors[i * 3 + 1] = 0.6 + intensity * 0.4; // green
          colors[i * 3 + 2] = 1; // blue

          sizes[i] = (1 - age) * 0.1;
        });

        geometryRef.current.setAttribute(
          "position",
          new THREE.BufferAttribute(positions, 3)
        );
        geometryRef.current.setAttribute(
          "color",
          new THREE.BufferAttribute(colors, 3)
        );
        geometryRef.current.setAttribute(
          "size",
          new THREE.BufferAttribute(sizes, 1)
        );
      }
    }
  });

  if (trailPositions.length < 2) return null;

  return (
    <points ref={trailRef}>
      <bufferGeometry ref={geometryRef} />
      <pointsMaterial
        size={1}
        transparent={true}
        opacity={0.6}
        sizeAttenuation={true}
        vertexColors={true}
        alphaTest={0.001}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export default CharacterTrail;
