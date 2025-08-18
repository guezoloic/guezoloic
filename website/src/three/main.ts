import * as THREE from "three";
import Animation from "./animation.ts";
import AnimationQueue from "./AnimQueue.ts";
import Character from "./character.ts";
import Model from "./model.ts";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const animations = [
    "animations/idle.glb",
    "animations/waving.glb",
    // "animations/Walking.glb",
    // "animations/LeftTurn.glb",
    // "animations/WalkingBackwards.glb",
    // "animations/RightTurn.glb",
    "animations/StandingW_BriefcaseIdle.glb",
    "animations/Acknowledging.glb",
    "animations/ArmStretching.glb",
    "animations/OffensiveIdle.glb",
    "animations/ThoughtfulHeadShake.glb",
];

export class Main {
    public scene: THREE.Scene;
    public camera: THREE.PerspectiveCamera;
    public renderer: THREE.WebGLRenderer;

    private clock: THREE.Clock;
    private loader: GLTFLoader;

    private model!: Model;
    private character!: Character;
    private animation!: Animation;
    private animQueue!: AnimationQueue;

    constructor(container?: HTMLElement, loadingManager?: THREE.LoadingManager) {
        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );

        this.camera.lookAt(0, 0, 0);

        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        (container ?? document.body).appendChild(this.renderer.domElement);

        const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
        directionalLight.position.set(5, 5, 5);
        this.scene.add(directionalLight);

        this.clock = new THREE.Clock();

        this.loader = new GLTFLoader(loadingManager);

        window.addEventListener("resize", this.handleResize);

        this.main();

        this.animate();
    }

    private async main() {
        // Model
        this.model = new Model(this.loader);
        await this.model.init(`models/BASEmodel.glb`, this.scene);

        // Mixer
        const mixer = this.model.getMixer();

        // Animation
        this.animation = new Animation(mixer, this.loader, 'animations/idle.glb');
        this.animQueue = new AnimationQueue(mixer, this.animation);

        // character
        this.character = new Character(this.model.getModel()!, this.scene, this.camera);

        // run animations
        const wavingAction = await this.animation.loadAnimation('animations/waving.glb');
        this.animQueue.onqueue(wavingAction);
        this.animQueue.startRandom(animations);
    }

    private animate = () => {
        requestAnimationFrame(this.animate);

        const delta = this.clock.getDelta();
        if (this.model) this.model.update(delta);
        if (this.character) this.character.applyRootMotion();
        this.renderer.render(this.scene, this.camera);
    }

    private handleResize = () => {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
}