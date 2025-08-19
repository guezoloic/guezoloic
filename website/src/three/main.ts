import * as THREE from "three";
import Animation from "./animation";
import AnimationQueue from "./animQueue";
import Model from "./model";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const animations = [
    "animations/StandingW_BriefcaseIdle.glb",
    "animations/Acknowledging.glb",
    "animations/ArmStretching.glb",
    "animations/OffensiveIdle.glb",
    "animations/ThoughtfulHeadShake.glb",
    "animations/DwarfIdle"
];

export class Main {
    public scene: THREE.Scene;
    public camera: THREE.PerspectiveCamera;
    public renderer: THREE.WebGLRenderer;

    private clock: THREE.Clock;
    private loader: GLTFLoader;

    private model!: Model;
    private animation!: Animation;
    private animQueue!: AnimationQueue;

    private container: HTMLElement;

    constructor(container?: HTMLElement, loadingManager?: THREE.LoadingManager) {
        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );

        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        this.container = container ?? document.body;
        this.container.appendChild(this.renderer.domElement);

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
        const baseModel = this.model.getModel()!;
        
        // Mixer
        const mixer = this.model.getMixer();

        // Animation
        this.animation = new Animation(mixer, this.loader, 'animations/idle.glb');
        this.animQueue = new AnimationQueue(mixer, this.animation);

        // camera settings
        const box = new THREE.Box3().setFromObject(baseModel);
        const size = new THREE.Vector3();
        const center = new THREE.Vector3();

        box.getSize(size);
        box.getCenter(center);

        baseModel.position.sub(center);
        baseModel.position.y -= size.y * 0.3;

        const fov = this.camera.fov * (Math.PI / 180);
        const distance = size.y / (2 * Math.tan(fov / 2));
        this.camera.position.set(0, 0, distance * 1.2);
        this.camera.lookAt(0, 0, 0);

        // run animations
        const wavingAction = await this.animation.loadAnimation('animations/waving.glb');
        this.animQueue.onqueue(wavingAction);
        this.animQueue.startRandom(animations);
    }

    private animate = () => {
        requestAnimationFrame(this.animate);

        const delta = this.clock.getDelta();
        if (this.model) this.model.update(delta);
        this.renderer.render(this.scene, this.camera);
    }

    private handleResize = () => {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
}