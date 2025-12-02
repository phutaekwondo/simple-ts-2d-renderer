import { TweenAnimation } from "./tween-animation.i";

export enum TweenUpdateResult
{
    Completed,
    InProgress
}

export interface TweenItem extends TweenAnimation
{
    update(dt: number): TweenUpdateResult;
}