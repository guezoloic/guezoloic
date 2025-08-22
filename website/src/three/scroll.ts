import * as THREE from "three";
import AnimationQueue from "./animQueue";
import Animation from "./animation";

export default function bindScrollToScrollEffects(
  camera: THREE.PerspectiveCamera,
  animQueue: AnimationQueue,
  animation: Animation,
  basicAnimation: string,
  offsetZ: number = 10,
  modelToShow?: THREE.Object3D[]
) {
  const initialZ = camera.position.z;
  const targetZ = initialZ + offsetZ;

  let isTyping = false;

  const handleScroll = async () => {
    const scrollTop = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    if (maxScroll <= 0) return;

    const factor = scrollTop / maxScroll;

    if (factor >= 0.8) { // typing
      if (!isTyping) {
        isTyping = true;
        if (modelToShow) modelToShow.map((element) => element.visible = true);
        await animation.setBasicAction("animations/typing.glb");
        animQueue.stop();
        animQueue.tryPlayNext(true);
      }
    } else { // idle
      if (isTyping) {
        isTyping = false;
        if (modelToShow) modelToShow.map((element) => element.visible = false);
        await animation.setBasicAction(basicAnimation);
        animQueue.stop();
        animQueue.startRandom();
        animQueue.tryPlayNext(true);
      }
    }

    const translateFactor = Math.min(factor, 1);
    camera.position.z = initialZ + translateFactor * (targetZ - initialZ);
  };

  window.addEventListener("scroll", handleScroll);

  return () => window.removeEventListener("scroll", handleScroll);
}