import * as THREE from "three";
import Animation from "./animation";

export default class AnimationQueue {
    private animation: Animation;
    private queue: THREE.AnimationAction[] = [];
    private currentAction: THREE.AnimationAction | null = null;
    private mixer: THREE.AnimationMixer;

    constructor(mixer: THREE.AnimationMixer, animation: Animation) {
        this.mixer = mixer;
        this.animation = animation;
    }

    public onqueue(action: THREE.AnimationAction) {
        this.queue.push(action);
        this.tryPlayNext();
    }

    public replaceFirst(action: THREE.AnimationAction) {
        this.queue.unshift(action);
        this.tryPlayNext(true);
    }

    private async tryPlayNext(force: boolean = false) {
        if (this.currentAction && !force) {
            if (this.currentAction && (this.currentAction as any).isBasicClone) {
                this.currentAction.fadeOut(this.animation.getFadeout());
                this.currentAction = null;
            } else {
                return;
            }
        }

        if (!this.queue.length) this.queue.push(this.animation.getBasicAction());

        const nextAction = this.queue.shift()!;
        nextAction.reset();
        nextAction.setLoop(THREE.LoopOnce, 1);
        nextAction.clampWhenFinished = true;
        nextAction.fadeIn(this.animation.getFadein()).play();

        const onFinish = (e: any) => {
            if (e.action === this.currentAction) {
                if (this.currentAction) this.currentAction.fadeOut(this.animation.getFadeout());
                this.mixer.removeEventListener("finished", onFinish);
                this.currentAction = null;
                return this.tryPlayNext();
            }
        };

        this.currentAction = nextAction;
        this.mixer.addEventListener("finished", onFinish);
    }

    public startRandom(path_list: string[]) {
        window.setInterval(async () => {
            if (!this.mixer || path_list.length === 0) return;
            const randomIndex = Math.floor(Math.random() * path_list.length);
            this.onqueue(await this.animation.loadAnimation(path_list[randomIndex]));
        }, 45_000);
    }

    public stop() {
        this.queue = [];
        this.currentAction?.fadeOut(this.animation.getFadeout());
        this.currentAction = null;
        this.onqueue(this.animation.getBasicAction());
    }
}