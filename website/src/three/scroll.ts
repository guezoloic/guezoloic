import * as THREE from "three";
import AnimationQueue from "./animQueue";
import Animation from "./animation";

const Mouvement = [
    "animations/Walking.glb",
    "animations/LeftTurn.glb",
    "animations/WalkingBackwards.glb",
    "animations/RightTurn.glb",
];

export default class ScrollAnimation {
    private scrollContainer: HTMLElement;
    private animQueue: AnimationQueue;
    private animation: Animation;

    private turned: boolean = false;
    private backward: boolean = false;

    private currentZone: number = -1;

    constructor(scrollContainer: HTMLElement, animQueue: AnimationQueue, animation: Animation) {
        this.scrollContainer = scrollContainer;
        this.animQueue = animQueue;
        this.animation = animation;

        scrollContainer.addEventListener('scroll', () => this.handleScroll());
    }

    private async handleScroll() {
    const scrollTop = this.scrollContainer.scrollTop;
    const scrollHeight = this.scrollContainer.scrollHeight - this.scrollContainer.clientHeight;
    const scrollPercent = scrollTop / scrollHeight;

    let newZone: number = -1;

    if (scrollPercent < 0.35) {
        if (this.backward) newZone = 0; // Walking
    } else if (scrollPercent >= 0.75) {
        if (this.backward && !this.turned) newZone = 1; // LeftTurn
        else if (this.backward && this.turned) newZone = 3; // RightTurn
    } else { // between 0.5 and 0.75
        if (!this.backward && !this.turned) newZone = 2; // WalkingBackwards
    }

    if (newZone === -1 || newZone === this.currentZone) return;

    this.backward = newZone === 2;
    this.turned = newZone === 1 || newZone === 3;
    this.currentZone = newZone;

    const action = await this.animation.loadAnimation(Mouvement[newZone]);
    this.animQueue.onqueue(action);
}
}