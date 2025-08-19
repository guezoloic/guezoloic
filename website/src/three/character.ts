import * as THREE from "three";

export default class Character {
    private model: THREE.Object3D;
    private hips: THREE.Object3D | null = null;

    private position = new THREE.Vector3();
    private lastHipsLocalPos = new THREE.Vector3();

    constructor(model: THREE.Object3D, scene: THREE.Scene, camera: THREE.PerspectiveCamera) {
        this.model = model;
        scene.add(this.model);

        const box = new THREE.Box3().setFromObject(this.model);
        const size = new THREE.Vector3();
        const center = new THREE.Vector3();
        box.getSize(size);
        box.getCenter(center);
        this.model.position.sub(center);
        this.model.position.y -= size.y * 0.3;

        this.position.copy(this.model.position);

        const fov = camera.fov * (Math.PI / 180);
        const distance = size.y / (2 * Math.tan(fov / 2));
        camera.position.set(0, 0, distance * 1.2);

        model.traverse((child) => {
            if (child.name === "mixamorig:Hips") {
                this.hips = child;
                this.lastHipsLocalPos.copy(this.hips.position);
            }
        });
    }

    public applyRootMotion() {
        if (!this.hips) return;

        const delta = new THREE.Vector3().subVectors(this.hips.position, this.lastHipsLocalPos);

        this.position.x += delta.x;
        this.position.z += delta.z;

        this.model.position.copy(this.position);

        this.lastHipsLocalPos.copy(this.hips.position);
    }

    public setPosition(pos: THREE.Vector3) {
        this.position.copy(pos);
        this.model.position.copy(pos);
    }

    public getPosition(): THREE.Vector3 {
        return this.position.clone();
    }
}