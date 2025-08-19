import * as THREE from "three";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export default class Model {
    private model: THREE.Object3D | null = null;
    private mixer: THREE.AnimationMixer;
    private loader: GLTFLoader;

    constructor(loader: GLTFLoader) {
        this.loader = loader;
    }

    public async init(model_url: string, scene: THREE.Scene) {
        this.model = await this.loadModel(model_url);
        scene.add(this.model);
        this.mixer = new THREE.AnimationMixer(this.model);
    }

    private loadModel(model_url: string): Promise<THREE.Object3D> {
        return new Promise((resolve, reject) => {
            this.loader.load(
                model_url,
                (gltf: GLTF) => resolve(gltf.scene),
                undefined,
                reject
            );
        });
    }

    public update(delta: number) {
        this.mixer?.update(delta);
    }

    public getMixer(): THREE.AnimationMixer { 
        if (!this.mixer) throw new Error("Mixer not initialized yet!"); 
        return this.mixer 
    }
    
    public getModel(): THREE.Object3D | null { return this.model; }
}