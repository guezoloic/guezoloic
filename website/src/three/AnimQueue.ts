import * as THREE from "three";
import Animation from "./animation.ts";

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

    private tryPlayNext(force: boolean = false) {
        if (!this.currentAction || force) {
            let nextAction = this.queue.shift() || this.animation.getBasicAction();
            const isIdle = nextAction === this.animation.getBasicAction();

            if (this.currentAction === this.animation.getBasicAction() && this.queue.length > 0) {
                this.currentAction.fadeOut(this.animation.getFadeout());
                this.currentAction.stop();
                nextAction = this.queue.shift()!;
            }

            const isSameAction = this.currentAction === nextAction;

            if (!isSameAction) {
                if (this.currentAction && this.currentAction !== this.animation.getBasicAction()) {
                    this.currentAction.fadeOut(this.animation.getFadeout());
                    this.currentAction.stop();
                }

                this.currentAction = nextAction;
                this.currentAction.reset();

                if (isIdle) {
                    this.currentAction.setLoop(THREE.LoopRepeat, Infinity);
                } else {
                    this.currentAction.setLoop(THREE.LoopOnce, 1);
                }

                this.currentAction.clampWhenFinished = true;
                this.currentAction.fadeIn(this.animation.getFadein()).play();

                const onFinish = (e: any) => {
                    if (e.action === this.currentAction) {
                        this.currentAction = null;
                        this.mixer.removeEventListener("finished", onFinish);
                        this.tryPlayNext();
                    }
                };
                this.mixer.addEventListener("finished", onFinish);
            } else {
                this.currentAction.stop();
                this.currentAction.play();
            }
        }
    }

    public startRandom(path_list: string[]) {
        window.setInterval(async () => {
            if (!this.mixer || path_list.length === 0) return;
            const randomIndex = Math.floor(Math.random() * path_list.length);
            this.onqueue(await this.animation.loadAnimation(path_list[randomIndex]));
        }, 15_000);
    }

    public stop() {
        this.queue = [];
        this.currentAction?.fadeOut(this.animation.getFadeout());
        this.currentAction = null;
        this.onqueue(this.animation.getBasicAction());
    }
}