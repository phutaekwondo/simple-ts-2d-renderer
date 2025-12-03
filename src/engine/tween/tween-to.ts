import { TweenOptions } from "./tween";
import { TweenItem, TweenUpdateResult } from "./tween-item";

export class TweenTo implements TweenItem
{
    private sources: { [key: string]: number } = {};
    private passedTime: number = 0;
    private isStopped: boolean = false;
    private remainRepeats: number = 0;

    constructor(
        private object: any,
        private options: TweenOptions
    )
    {
        const targets = options.targets;
        this.remainRepeats = options.repeat ?? 0;
        const keys = Object.keys(targets);
        for (const key of keys)
        {
            this.sources[key] = object[key];
        }
    }

    update(dt: number): TweenUpdateResult
    {
        if (this.isStopped) return TweenUpdateResult.Completed;

        const currentTime = this.passedTime + (dt / 1000);

        const progress = this.calculateProgress(currentTime);
        this.updateObjectByProgress(progress);

        this.passedTime = currentTime;
        const isComplete = this.passedTime >= this.options.duration;
        const isLastRepeat = this.remainRepeats === 0;

        if (isComplete && !isLastRepeat)
        {
            this.passedTime = 0;
            this.remainRepeats > 0 && this.remainRepeats--;
        }

        this.options.onUpdate?.(progress);

        if (isComplete && isLastRepeat)
        {
            this.options.onComplete?.();
            return TweenUpdateResult.Completed;
        }

        return TweenUpdateResult.InProgress;
    }

    private updateObjectByProgress(progress: number)
    {
        const keys = Object.keys(this.options.targets);
        for (const key of keys)
        {
            const targetValue = this.options.targets[key];
            const sourceValue = this.sources[key];
            this.object[key] = sourceValue + (targetValue - sourceValue) * progress;
        }
    }

    private calculateProgress(passedTime: number): number
    {
        const duration = this.options.duration;
        const linearProgress = Math.min(passedTime / duration, 1);
        const easedProgress = this.options.ease ? this.options.ease(linearProgress) : linearProgress;

        return easedProgress;
    }

    stop(): void
    {
        this.isStopped = true;
    }

    get progress(): number
    {
        return this.calculateProgress(this.passedTime)
    }
}