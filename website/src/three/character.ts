import * as THREE from "three";

export default class Character {
    private model: THREE.Object3D;
    private hips: THREE.Object3D;

    private pos = new THREE.Vector3(0, 0, 0);
    private lastHipsPos = new THREE.Vector3();

    constructor(model: THREE.Object3D, scene: THREE.Scene, camera: THREE.PerspectiveCamera) {
        this.model = model;
        model.position.add(this.pos);
        
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

        model.traverse((child) => {
            if (child.name === "mixamorig:Hips") {
                this.hips = child;
                this.hips.getWorldPosition(this.lastHipsPos);
            }
        });
    }

    public applyRootMotion() {
        if (!this.hips) return;

        const currentHipsPos = new THREE.Vector3();
        this.hips.getWorldPosition(currentHipsPos);

        const delta = new THREE.Vector3().subVectors(currentHipsPos, this.lastHipsPos);
        this.model.position.add(delta);

        this.hips.position.sub(delta);
        this.lastHipsPos.copy(currentHipsPos);
    }
}