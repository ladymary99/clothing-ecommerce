import { useEffect, useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF } from "@react-three/drei";
import { gsap } from "gsap";
import * as THREE from "three";

// Pants model component
const Model = ({ onLoaded }) => {
  // Note: We're using a placeholder model URL here
  // Replace with your actual Blender model when available
  const gltfPath =
    "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/simple-pants/model.gltf";

  // For development without an actual GLTF file, we'll create a simple placeholder
  const modelRef = useRef();

  useEffect(() => {
    // Signal that the model is "loaded" (or in this case, created)
    onLoaded();

    // Create walking animation using GSAP
    const tl = gsap.timeline({
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    tl.to(modelRef.current.rotation, {
      y: modelRef.current.rotation.y + 0.5,
      duration: 2,
    })
      .to(
        modelRef.current.position,
        {
          y: 0.1,
          duration: 1,
        },
        0
      )
      .to(
        modelRef.current.position,
        {
          y: 0,
          duration: 1,
        },
        1
      );
  }, [onLoaded]);

  useFrame((state) => {
    // Subtle floating animation
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.003;
    }
  });

  // In a real implementation, you would load your model like this:
  // const { scene } = useGLTF(gltfPath)

  return (
    <group ref={modelRef} position={[0, 0, 0]} scale={1}>
      {/* Placeholder geometry for the pants */}
      <mesh position={[0, -0.5, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.5, 0.7, 2, 32]} />
        <meshStandardMaterial color="#333333" roughness={0.7} metalness={0.1} />
      </mesh>

      {/* Left leg */}
      <mesh position={[-0.3, -2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.25, 0.25, 2, 32]} />
        <meshStandardMaterial color="#333333" roughness={0.7} metalness={0.1} />
      </mesh>

      {/* Right leg */}
      <mesh position={[0.3, -2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.25, 0.25, 2, 32]} />
        <meshStandardMaterial color="#333333" roughness={0.7} metalness={0.1} />
      </mesh>

      {/* Details/patterns */}
      <mesh position={[0, -0.5, 0.51]} castShadow receiveShadow>
        <planeGeometry args={[0.8, 0.5]} />
        <meshStandardMaterial color="#222222" roughness={0.5} metalness={0.2} />
      </mesh>
    </group>
  );
};

const PantsModel = ({ onLoaded }) => {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      shadows
      className="pants-canvas"
    >
      <ambientLight intensity={0.5} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        intensity={1}
        castShadow
      />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />

      <Model onLoaded={onLoaded} />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 3}
      />
      <Environment preset="city" />
    </Canvas>
  );
};

export default PantsModel;
