import * as THREE from "three";

export default function bindScrollToScrollEffects(
  camera: THREE.PerspectiveCamera,
  model: THREE.Object3D,
  offsetZ: number = 10
) {
  const initialZ = camera.position.z;
  const targetZ = initialZ + offsetZ;

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    if (maxScroll <= 0) return;

    const factor = scrollTop / maxScroll;
    console.log(factor);

    const translateFactor = Math.min(factor, 1);
    camera.position.z = initialZ + translateFactor * (targetZ - initialZ);
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}