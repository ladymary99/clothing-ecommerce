import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const WalkingCharacter = ({ onLoaded }) => {
  const groupRef = useRef();

  // Create a simple humanoid figure with walking animation
  useEffect(() => {
    if (onLoaded) {
      onLoaded();
    }
  }, [onLoaded]);

  // Animation loop for walking
  useFrame((state, delta) => {
    if (groupRef.current) {
      // Continuous walking motion
      const time = state.clock.elapsedTime;

      // Bob up and down motion
      groupRef.current.position.y = Math.sin(time * 4) * 0.1;

      // Slight rotation for dynamic movement
      groupRef.current.rotation.y = Math.sin(time * 0.5) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[0, -1, 0]} scale={[1.5, 1.5, 1.5]}>
      {/* Main body */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.3, 0.4, 1, 8]} />
        <meshStandardMaterial
          color="#4a90e2"
          emissive="#1a2744"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Head */}
      <mesh position={[0, 1.2, 0]}>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial
          color="#f0c674"
          emissive="#3d2f1a"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Arms */}
      <group>
        {/* Left arm */}
        <WalkingArm position={[-0.5, 0.7, 0]} side="left" />
        {/* Right arm */}
        <WalkingArm position={[0.5, 0.7, 0]} side="right" />
      </group>

      {/* Legs */}
      <group>
        {/* Left leg */}
        <WalkingLeg position={[-0.15, -0.5, 0]} side="left" />
        {/* Right leg */}
        <WalkingLeg position={[0.15, -0.5, 0]} side="right" />
      </group>
    </group>
  );
};

const WalkingArm = ({ position, side }) => {
  const armRef = useRef();

  useFrame((state) => {
    if (armRef.current) {
      const time = state.clock.elapsedTime;
      // Arms swing opposite to legs
      const swingMultiplier = side === "left" ? 1 : -1;
      armRef.current.rotation.x = Math.sin(time * 4) * 0.5 * swingMultiplier;
    }
  });

  return (
    <group ref={armRef} position={position}>
      <mesh position={[0, -0.3, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.6, 8]} />
        <meshStandardMaterial color="#4a90e2" />
      </mesh>
    </group>
  );
};

const WalkingLeg = ({ position, side }) => {
  const legRef = useRef();

  useFrame((state) => {
    if (legRef.current) {
      const time = state.clock.elapsedTime;
      // Legs alternate walking motion
      const swingMultiplier = side === "left" ? 1 : -1;
      legRef.current.rotation.x = Math.sin(time * 4) * 0.3 * swingMultiplier;
    }
  });

  return (
    <group ref={legRef} position={position}>
      <mesh position={[0, -0.4, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.8, 8]} />
        <meshStandardMaterial color="#2c3e50" />
      </mesh>
      {/* Foot */}
      <mesh position={[0, -0.9, 0.1]}>
        <boxGeometry args={[0.2, 0.1, 0.3]} />
        <meshStandardMaterial color="#34495e" />
      </mesh>
    </group>
  );
};

export default WalkingCharacter;
