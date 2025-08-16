import * as THREE from "three";
import { GLTFLoader, GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";

const animations = [
    "animations/idle.glb",
    "animations/waving.glb",
];

export class Character {
    private model: THREE.Object3D | null = null;
    private mixer: THREE.AnimationMixer | null = null;
    private actions: THREE.AnimationAction[] = [];
    private currentAction: THREE.AnimationAction | null = null;
    private loader = new GLTFLoader();

    constructor(model_url: string, scene: THREE.Scene, camera: THREE.PerspectiveCamera, loadingManager?: THREE.LoadingManager) {
        this.loader = new GLTFLoader(loadingManager);

        this.loadModel(model_url, scene, camera)
            .then(() => this.runAnimation(0))
            .catch(console.error);
    }

    private loadModel(url: string, scene: THREE.Scene, camera: THREE.PerspectiveCamera): Promise<void> {
        return new Promise((resolve, reject) => {
            this.loader.load(
                url,
                (gltf) => {
                    this.model = gltf.scene;

                    const box = new THREE.Box3().setFromObject(this.model);
                    const size = new THREE.Vector3();
                    const center = new THREE.Vector3();

                    box.getSize(size);
                    box.getCenter(center);

                    this.model.position.sub(center);
                    this.model.position.y -= size.y * 0.3;

                    scene.add(this.model);

                    const fov = camera.fov * (Math.PI / 180);
                    const distance = size.y / (2 * Math.tan(fov / 2));
                    camera.position.set(0, 0, distance * 1.2);
                    camera.lookAt(0, 0, 0);

                    this.mixer = new THREE.AnimationMixer(this.model);
                    resolve();
                },
                undefined,
                reject
            );
        });
    }

     private async runAnimation(index: number) {
        if (!this.actions[index]) await this.loadAnimation(index);
        if (this.currentAction) this.currentAction.stop();
        this.playAnimation(index);
    }

    private loadAllAnimations(): Promise<void[]> {
        return Promise.all(animations.map((path, index) => this.loadAnimation(index)));
    }

    private loadAnimation(index: number): Promise<void> {
        return new Promise((resolve, reject) => {
            const path = animations[index];
            this.loader.load(
                path,
                (gltf: GLTF) => {
                    if (!gltf.animations[0]) return reject(new Error(`${path} has no animations`));
                    if (!this.mixer) return reject(new Error("Mixer not initialized"));
                    const action = this.mixer.clipAction(gltf.animations[0]);
                    this.actions[index] = action;
                    resolve();
                },
                undefined,
                reject
            );
        });
    }

    public playAnimation(index: number) {
        if (!this.actions[index]) throw new Error(`Animation index ${index} not loaded`);
        if (!this.mixer) throw new Error("Mixer not initialized");

        const animation = this.actions[index];

        if (this.currentAction) {
            this.currentAction.stop();
        }

        animation.reset();
        animation.setLoop(THREE.LoopOnce, 1);
        animation.clampWhenFinished = true;

        const onFinish = (event: THREE.Event) => {
            if ((event as any).action === animation) {
                const idle = this.actions[0];
                idle?.play();
                this.currentAction = idle || null;
                this.mixer?.removeEventListener("finished", onFinish);
            }
        };

        this.mixer.addEventListener("finished", onFinish);
        animation.play();
        this.currentAction = animation;
    }

    public update(delta: number) {
        this.mixer?.update(delta);
    }
}