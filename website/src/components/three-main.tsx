import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader, GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";

const Three = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 2);
    scene.add(ambientLight);

    const light = new THREE.DirectionalLight(0xffffff, 2);
    light.position.set(5, 5, 5);
    scene.add(light);

    const loadingManager = new THREE.LoadingManager(
      () => setLoading(false),
      (item, loaded, total) => console.log(`Loaded ${loaded} of ${total} files: ${item}`),
      (url) => console.error(`Erreur de chargement : ${url}`)
    );

    const loader = new GLTFLoader(loadingManager);
    let model: THREE.Object3D | null = null;
    let mixer: THREE.AnimationMixer | null = null;
    let idleAction: THREE.AnimationAction | null = null;
    const clock = new THREE.Clock();

    loader.load(
      "/models/mixamo_test.glb",
      async (gltf) => {
        model = gltf.scene;

        const box = new THREE.Box3().setFromObject(model);
        const size = new THREE.Vector3();
        const center = new THREE.Vector3();
        box.getSize(size);
        box.getCenter(center);

        model.position.x -= center.x;
        model.position.y -= center.y;
        model.position.z -= center.z;
        model.position.y -= size.y * 0.3;

        scene.add(model);

        const fov = camera.fov * (Math.PI / 180);
        const distance = size.y / (2 * Math.tan(fov / 2));
        camera.position.set(0, 0, distance * 1.2);
        camera.lookAt(0, 0, 0);

        if (model && gltf.animations.length > 0) {
          mixer = new THREE.AnimationMixer(model);

          try {
            const wavingGltf = await new Promise<GLTF>((resolve, reject) => {
              loader.load("/models/waving.glb", resolve, undefined, reject);
            });

            if (wavingGltf.animations.length > 0 && mixer) {
              const wavingAction = mixer.clipAction(wavingGltf.animations[0]);
              wavingAction.setLoop(THREE.LoopOnce, 1);
              wavingAction.clampWhenFinished = true;
              wavingAction.play();

              idleAction = mixer.clipAction(gltf.animations[0]);
              idleAction.play();
              idleAction.enabled = false;

              const onFinish = (e: any) => {
                if (e.action === wavingAction) {
                  wavingAction.crossFadeTo(idleAction, 0.9, true);
                  idleAction.enabled = true;
                  mixer.removeEventListener("finished", onFinish);
                }
              };
              mixer.addEventListener("finished", onFinish);
            }
          } catch (error) {
            console.error("Error loading waving animation:", error);
          }
        }
      },
      undefined,
      (error) => console.error("Error while loading model:", error)
    );

    const animate = () => {
      requestAnimationFrame(animate);
      const delta = clock.getDelta();
      if (mixer) mixer.update(delta);
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="fixed w-full h-full z-20">
      <div ref={mountRef} className="top-0 left-0 w-full h-full pointer-events-none" />
      {loading && (
        <div className="absolute top-1/2 left-1/2 w-16 h-16 -translate-x-1/2 -translate-y-1/2 border-4 border-white border-t-transparent rounded-full animate-spin" />
      )}
    </div>
  );
};

export default Three;