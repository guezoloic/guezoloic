import * as THREE from "three";
import { Character } from "./character";
import { bindScrollToScrollEffects } from "../three/scroll.ts";

export class Main {
    public scene: THREE.Scene;
    public camera: THREE.PerspectiveCamera;
    public renderer: THREE.WebGLRenderer;
    private clock: THREE.Clock;
    private character: Character | null = null;

    constructor(container: HTMLElement, loadingManager: THREE.LoadingManager) {
        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );

        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        if (container) container.appendChild(this.renderer.domElement);
        else document.body.appendChild(this.renderer.domElement);

        const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
        directionalLight.position.set(5, 5, 5);
        this.scene.add(directionalLight);

        this.clock = new THREE.Clock();


        (async () => {
            this.character = new Character(loadingManager);
            await this.character.init("/models/BASEmodel.glb", this.scene, this.camera);
            const scrollContainer = document.querySelector(".scroll-container");
            if (scrollContainer && this.character.model) {
                bindScrollToScrollEffects(scrollContainer as HTMLElement, this.camera, this.character.model, 5);
            }
        })();

        window.addEventListener("resize", this.handleResize);

        this.animate();
    }

    private animate = () => {
        requestAnimationFrame(this.animate);
        const delta = this.clock.getDelta();

        if (this.character) {
            this.character.update(delta);
        }

        this.renderer.render(this.scene, this.camera);
    }

    private handleResize = () => {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
}