import * as THREE from "three";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export default class Model {
    private loader: GLTFLoader;

    constructor(loader: GLTFLoader) {
        this.loader = loader;
    }

    public async init(model_url: string, scene: THREE.Scene, isVisible: boolean = true): Promise<THREE.Object3D> {
        const model = await this.loadModel(model_url);
        model.visible = isVisible;
        scene.add(model);
        return model;
    }

    public loadModel(model_url: string): Promise<THREE.Object3D> {
        return new Promise((resolve, reject) => {
            this.loader.load(
                model_url,
                (gltf: GLTF) => resolve(gltf.scene),
                undefined,
                reject
            );
        });
    }
}