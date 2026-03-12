import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Target = (props) => {
  const targetRef = useRef();

  useGSAP(() => {
    if (!targetRef.current) return;

    gsap.to(targetRef.current.position, {
      y: targetRef.current.position.y + 0.5,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
    });
  });

  return (
    <group {...props} ref={targetRef} rotation={[0, Math.PI / 5, 0]} scale={1.5}>
      <mesh position={[0, 0.35, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 1.2, 24]} />
        <meshStandardMaterial color="#9ca3af" metalness={0.6} roughness={0.3} />
      </mesh>

      <mesh position={[0, -0.3, 0]}>
        <cylinderGeometry args={[0.28, 0.35, 0.08, 24]} />
        <meshStandardMaterial color="#4b5563" metalness={0.35} roughness={0.6} />
      </mesh>

      <group position={[0, 0.95, 0.02]}>
        <mesh>
          <circleGeometry args={[0.5, 64]} />
          <meshStandardMaterial color="#f8fafc" />
        </mesh>

        <mesh position={[0, 0, 0.002]}>
          <ringGeometry args={[0.35, 0.5, 64]} />
          <meshStandardMaterial color="#dc2626" />
        </mesh>

        <mesh position={[0, 0, 0.004]}>
          <ringGeometry args={[0.2, 0.35, 64]} />
          <meshStandardMaterial color="#f8fafc" />
        </mesh>

        <mesh position={[0, 0, 0.006]}>
          <ringGeometry args={[0.08, 0.2, 64]} />
          <meshStandardMaterial color="#2563eb" />
        </mesh>

        <mesh position={[0, 0, 0.008]}>
          <circleGeometry args={[0.08, 64]} />
          <meshStandardMaterial color="#f8fafc" />
        </mesh>
      </group>
    </group>
  );
};

export default Target;
