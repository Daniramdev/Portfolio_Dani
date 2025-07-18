import { MeshDistortMaterial } from '@react-three/drei';

export default function Blob(props) {
  return (
    <mesh {...props}>
      <sphereGeometry args={[2, 100, 100]} />
      <MeshDistortMaterial
        color="#22d3ee"
        distort={0.4}
        speed={2}
        transparent
        opacity={0.92}
      />
    </mesh>
  );
}