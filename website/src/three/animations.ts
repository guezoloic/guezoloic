import * as THREE from "three";
import { GLTFLoader, GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";

const animations = [
    "animations/idle.glb", // idle
    "animations/waving.glb", // first animation
];

class Animations {
    // setup animation model
    private mixer: THREE.AnimationMixer;
    // list of all loaded animations
    private actions: Map<string, THREE.AnimationAction> = new Map();
    // basic animation
    private idleAction: THREE.AnimationAction | null = null;
    // current animation
    private currentAction: THREE.AnimationAction | null = null;
    private loader = new GLTFLoader();

    constructor(model: THREE.Object3D) {
        this.mixer = new THREE.AnimationMixer(model);
        this.load_animation(0);
    }

    private load_animation(index: number): Promise<void> {
        return new Promise((resolve, reject) => {
            const animation = animations[index];
            if (!animation) return reject("Error: animation not found.");

            this.loader.load(
                animation, 
                (gltf: GLTF) => {
                    if (!gltf.animations[0]) 
                        return reject("Error: " + animation + " has no animations.");
                    const clip = gltf.animations[0];
                    const action = this.mixer.clipAction(clip);

                    if (index === 0)
                        this.idleAction = action;

                    resolve();
                },
                undefined,
                (err) => reject(err)
            );
        });
    }

    public play_animation(index: number, fadeDuration: number): Promise<void> {
        return new Promise((resolve, reject) => {
            const animation = animations[index];
            const action = this.actions.get(animation);
            if (!action) return reject("Error: animation couldn't be load.");

            action.reset();
            action.setLoop(THREE.LoopOnce, 1);
            action.clampWhenFinished = true;

            if (this.currentAction) 
                this.currentAction.crossFadeTo(action, fadeDuration, false);

            action.play();
            this.currentAction = action;

            this.mixer.addEventListener("finished", () => {
                if (this.idleAction) {
                    action.crossFadeTo(this.idleAction, fadeDuration, false);
                    this.idleAction.play();
                    this.currentAction = this.idleAction;
                }
                resolve();
            });
        });
    }

    public update(delta: number) {
        this.mixer.update(delta);
    }
}