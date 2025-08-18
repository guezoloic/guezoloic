import * as THREE from "three";

export function bindScrollToScrollEffects(
  scrollContainer: HTMLElement,
  camera: THREE.PerspectiveCamera,
  model: THREE.Object3D,
  offsetZ: number = 10
) {
  const initialZ = camera.position.z;
  const targetZ = initialZ + offsetZ;

  const handleScroll = () => {
    const scrollTop = scrollContainer.scrollTop;
    const maxScroll = scrollContainer.scrollHeight - scrollContainer.clientHeight;
    if (maxScroll <= 0) return;

    const factor = scrollTop / maxScroll;

    const translateFactor = Math.min(factor * 2, 1);
    camera.position.z = initialZ + translateFactor * (targetZ - initialZ);

    const rotateFactor = Math.max(factor * 2 - 1, 0);
    model.rotation.y = rotateFactor * Math.PI;
  };

  scrollContainer.addEventListener("scroll", handleScroll);

  return () => scrollContainer.removeEventListener("scroll", handleScroll);
}