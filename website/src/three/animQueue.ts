import * as THREE from "three";
import Animation from "./animation";

const animations = [
    "animations/StandingW_BriefcaseIdle.glb",
    "animations/Acknowledging.glb",
    "animations/ArmStretching.glb",
    "animations/OffensiveIdle.glb",
    "animations/ThoughtfulHeadShake.glb",
    "animations/DwarfIdle.glb"
];

export default class AnimationQueue {
    private animation: Animation;
    private queue: THREE.AnimationAction[] = [];
    private currentAction: THREE.AnimationAction | null = null;
    private mixer: THREE.AnimationMixer;
    private randomIntervalId: number | null = null;

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

    public async tryPlayNext(force: boolean = false) {
        if (this.currentAction) {
            if (force) {
                this.currentAction.fadeOut(this.animation.getFadeout());
                this.currentAction = null;
            } else {
                if ((this.currentAction as any).isBasicClone) {
                    this.currentAction.fadeOut(this.animation.getFadeout());
                    this.currentAction = null;
                } else {
                    return;
                }
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

    public startRandom() {
        if (this.randomIntervalId !== null) return;

        this.randomIntervalId = window.setInterval(async () => {
            if (!this.mixer) return;
            const randomIndex = Math.floor(Math.random() * animations.length);
            this.onqueue(await this.animation.loadAnimation(animations[randomIndex]));
        }, 30_000);
    }

    public stopRandom() {
        if (this.randomIntervalId !== null) {
            clearInterval(this.randomIntervalId);
            this.randomIntervalId = null;
        }
    }

    public clearQueue() {
        this.queue = [];
    }

    public stop() {
        this.clearQueue();
        this.currentAction?.fadeOut(this.animation.getFadeout());
        this.currentAction = null;
        this.stopRandom();
    }
}