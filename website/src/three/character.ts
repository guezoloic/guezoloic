import * as THREE from "three";
import { GLTFLoader, GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";

const animations = [
    "animations/idle.glb",
    "animations/waving.glb",
    "animations/StandingW_BriefcaseIdle.glb",
    "animations/Acknowledging.glb",
    "animations/ArmStretching.glb",
    "animations/Defeated.glb",
    "animations/OffensiveIdle.glb",
    "animations/Surprised.glb",
    "animations/ThoughtfulHeadShake.glb"
];

export class Character {
    private model: THREE.Object3D | null = null;
    private mixer: THREE.AnimationMixer | null = null;
    private actions: THREE.AnimationAction[] = [];
    private currentAction: THREE.AnimationAction | null = null;
    private loader: GLTFLoader;

    constructor(model_url: string, scene: THREE.Scene, camera: THREE.PerspectiveCamera, loadingManager?: THREE.LoadingManager) {
        this.loader = new GLTFLoader(loadingManager);

        this.loadModel(model_url, scene, camera)
            .then(() => this.loadAnimation(0))
            .then(() => this.runAnimation(1))
            .then(() => this.startRandomAnimations())
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
                    const clip = gltf.animations[0].clone();
                    clip.tracks = clip.tracks.filter(track => !track.name.endsWith('.position'));
                    const action = this.mixer.clipAction(clip);
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
        if (this.currentAction && this.currentAction !== animation) {
            this.currentAction.fadeOut(0.8);
        }
        this.currentAction = animation;
        
        animation.reset();
        animation.setLoop(THREE.LoopOnce, 1);
        animation.clampWhenFinished = true;
        
        animation.play();
        
        const onFinish = (event: any) => {
            if (event.action === animation) {
                const idleAnimation = this.actions[0];
                idleAnimation.reset();
                idleAnimation.setLoop(THREE.LoopRepeat, Infinity);
                idleAnimation.fadeIn(0.5).play();
                
                this.currentAction = idleAnimation;
                this.mixer?.removeEventListener("finished", onFinish);
            }
        };
        
        this.mixer.addEventListener("finished", onFinish);
    }

    private startRandomAnimations() {
        window.setInterval(async () => {
            if (!this.mixer || !this.actions.length) return;

            const minIndex = 2;
            const maxIndex = animations.length - 1;
            const randomIndex = Math.floor(Math.random() * (maxIndex - minIndex + 1)) + minIndex;

            this.runAnimation(randomIndex);
        }, 35_000);
    }

    public update(delta: number) {
        this.mixer?.update(delta);
    }
}