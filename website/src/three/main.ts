import * as THREE from "three";
import Animation from "./animation";
import AnimationQueue from "./animQueue";
import Model from "./model";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import bindScrollToScrollEffects from "./scroll";
import Camera from "./camera";

export class Main {
    private scene: THREE.Scene;
    private renderer: THREE.WebGLRenderer;
    private camera: THREE.PerspectiveCamera;

    private controls: OrbitControls;

    private clock: THREE.Clock;
    private loader: GLTFLoader;

    private model!: Model;
    private animation!: Animation;
    private animQueue!: AnimationQueue;

    private container: HTMLElement;

    private isMobile: boolean;

    constructor(container?: HTMLElement, loadingManager?: THREE.LoadingManager) {
        this.isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ? false : true;

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

        if (this.isMobile) {
            this.controls = new OrbitControls(this.camera, this.container);
            this.controls.minPolarAngle = Math.PI / 2;
            this.controls.maxPolarAngle = Math.PI / 2;
            this.controls.enableZoom = false;
            this.controls.enablePan = false;

            this.renderer.domElement.style.touchAction = 'pan-y';
        }

        this.clock = new THREE.Clock();

        this.loader = new GLTFLoader(loadingManager);

        window.addEventListener("resize", this.handleResize);

        this.main();

        this.animate();
    }

    private async main() {
        // Model
        this.model = new Model(this.loader);
        const deskModel = await this.model.init("models/desk_low-poly.glb", this.scene, false);
        const baseModel = await this.model.init(`models/BASEmodel.glb`, this.scene);
        // const chairModel= await this.model.init("models/chair.glb", this.scene, false);

        // camera
        const cameraBaseModel = new Camera(this.camera, baseModel);
        cameraBaseModel.centerCamera((box, size, center) => {
            baseModel.position.sub(center);
            baseModel.position.y -= size.y * 0.3;
        });
        cameraBaseModel.positionCamera();

        const cameraDeskModel = new Camera(this.camera, deskModel);

        cameraDeskModel.centerCamera((box, size, center) => {
            deskModel.rotation.y = Math.PI / 2;
            const scaleFactor = 0.01;
            deskModel.scale.set(scaleFactor, scaleFactor, scaleFactor);

            const deskBox = new THREE.Box3().setFromObject(deskModel);
            const deskCenter = new THREE.Vector3();

            deskBox.getCenter(center);
            deskModel.position.sub(center);

            deskModel.position.z += 1.8;
            deskModel.position.y -= 1.3;
        });

        // Animation
        this.animation = new Animation(baseModel, this.loader, 'animations/idle.glb');
        this.animQueue = new AnimationQueue(this.animation);

        // run animations
        const wavingAction = await this.animation.loadAnimation('animations/waving.glb');
        this.animQueue.onqueue(wavingAction);
        this.animQueue.startRandom();

        bindScrollToScrollEffects(this.camera, this.animQueue, this.animation, 'animations/idle.glb', 4.5, [deskModel]);
    }

    private animate = () => {
        requestAnimationFrame(this.animate);

        const delta = this.clock.getDelta();
        if (this.animation) this.animation.update(delta);
        if (this.isMobile) this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }

    private handleResize = () => {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
}