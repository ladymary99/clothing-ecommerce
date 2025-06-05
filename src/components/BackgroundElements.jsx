import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const FloatingCube = ({ position, scale, color }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      meshRef.current.rotation.x = time * 0.5;
      meshRef.current.rotation.y = time * 0.3;
      meshRef.current.position.y =
        position[1] + Math.sin(time + position[0]) * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} transparent opacity={0.3} />
    </mesh>
  );
};

const FloatingSphere = ({ position, scale, color }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      meshRef.current.position.y =
        position[1] + Math.cos(time * 1.5 + position[0]) * 0.3;
      meshRef.current.rotation.z = time * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial color={color} transparent opacity={0.2} />
    </mesh>
  );
};

const FloatingTorus = ({ position, scale, color }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      meshRef.current.rotation.x = time * 0.4;
      meshRef.current.rotation.y = time * 0.6;
      meshRef.current.position.y =
        position[1] + Math.sin(time * 2 + position[0]) * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <torusGeometry args={[1, 0.3, 16, 32]} />
      <meshStandardMaterial color={color} transparent opacity={0.25} />
    </mesh>
  );
};

const BackgroundElements = () => {
  return (
    <group>
      {/* Floating cubes */}
      <FloatingCube
        position={[-8, 2, -5]}
        scale={[0.5, 0.5, 0.5]}
        color="#4a90e2"
      />
      <FloatingCube
        position={[8, -1, -6]}
        scale={[0.3, 0.3, 0.3]}
        color="#e74c3c"
      />
      <FloatingCube
        position={[-6, -3, -4]}
        scale={[0.4, 0.4, 0.4]}
        color="#f39c12"
      />

      {/* Floating spheres */}
      <FloatingSphere
        position={[7, 3, -7]}
        scale={[0.6, 0.6, 0.6]}
        color="#9b59b6"
      />
      <FloatingSphere
        position={[-9, -2, -8]}
        scale={[0.4, 0.4, 0.4]}
        color="#2ecc71"
      />
      <FloatingSphere
        position={[5, -4, -5]}
        scale={[0.3, 0.3, 0.3]}
        color="#34495e"
      />

      {/* Floating torus */}
      <FloatingTorus
        position={[-7, 4, -6]}
        scale={[0.4, 0.4, 0.4]}
        color="#e67e22"
      />
      <FloatingTorus
        position={[9, 1, -9]}
        scale={[0.3, 0.3, 0.3]}
        color="#1abc9c"
      />

      {/* Background plane with subtle pattern */}
      <mesh position={[0, 0, -10]} rotation={[0, 0, 0]}>
        <planeGeometry args={[30, 30, 20, 20]} />
        <meshStandardMaterial
          color="#2c3e50"
          transparent
          opacity={0.1}
          wireframe={true}
        />
      </mesh>
    </group>
  );
};

export default BackgroundElements;
