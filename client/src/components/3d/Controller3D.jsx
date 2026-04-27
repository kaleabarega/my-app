import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Box } from "@react-three/drei";

const Controller3D = () => {
  const groupRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.z = Math.sin(t / 4) / 4;
      groupRef.current.rotation.y = Math.cos(t / 4) / 4;
      groupRef.current.position.y = Math.sin(t / 2) / 10;
    }
  });

  return (
    <group ref={groupRef} scale={1.5}>
      {/* Central Body */}
      <Box args={[2, 0.8, 1.2]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#ffffff" roughness={0.1} metalness={0.8} />
      </Box>
      
      {/* Handles */}
      <Sphere args={[0.5, 32, 32]} position={[-1.2, -0.4, 0.3]}>
        <meshStandardMaterial color="#ffffff" />
      </Sphere>
      <Sphere args={[0.5, 32, 32]} position={[1.2, -0.4, 0.3]}>
        <meshStandardMaterial color="#ffffff" />
      </Sphere>

      {/* Buttons / Details */}
      <Box args={[0.3, 0.3, 0.1]} position={[-0.5, 0.2, 0.6]}>
        <meshStandardMaterial color="#000" />
      </Box>
      <Box args={[0.3, 0.3, 0.1]} position={[0.5, 0.2, 0.6]}>
        <meshStandardMaterial color="#000" />
      </Box>
      
      {/* Glowing Light Pad */}
      <Box args={[0.8, 0.4, 0.05]} position={[0, 0.3, 0.6]}>
        <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={2} />
      </Box>

      {/* Abstract Background Elements */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <Sphere args={[0.05, 16, 16]} position={[-2, 1, -1]}>
          <MeshDistortMaterial color="#00ffff" speed={5} distort={0.3} />
        </Sphere>
      </Float>
    </group>
  );
};

export default Controller3D;
