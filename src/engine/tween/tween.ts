import { TweenAnimation } from "./tween-animation.i";
import { TweenItem, TweenUpdateResult } from "./tween-item";
import { TweenTo } from "./tween-to";

//t: number (progress from 0 to 1) => number (eased progress from 0 to 1)
type EaseFn = (t: number) => number;

export interface TweenOptions 
{
    duration: number; // in secs
    ease?: EaseFn;
    onComplete?: () => void;
    onUpdate?: (progress: number) => void;
    repeat?: number; // number of times to repeat, 0 = no repeat, -1 = infinite

    targets: { [key: string]: number };
}


export class Tween
{
    static instance: Tween = new Tween();
    private items: TweenItem[] = [];
    private last = performance.now();

    constructor()
    {
        this.boundToFrame();
    }

    private boundToFrame()
    {
        const now = performance.now();
        const dt = now - this.last;
        this.last = now;
        this.update(dt)
        requestAnimationFrame(() => this.boundToFrame());
    }

    private update(dt: number)
    {
        const completedItems: TweenItem[] = [];
        this.items.forEach(
            item =>
            {
                const updateResult = item.update(dt);
                if (updateResult === TweenUpdateResult.Completed)
                {
                    completedItems.push(item);
                }
            }
        );

        this.removeItems(completedItems);
    }

    private removeItems(needToRemoveItems: TweenItem[])
    {
        needToRemoveItems.forEach(
            item =>
            {
                const index = this.items.indexOf(item);
                if (index !== -1)
                {
                    this.items.splice(index, 1);
                }
            }
        );
    }

    private addItem(item: TweenItem)
    {
        this.items.push(item);
    }

    to(object: any, options: TweenOptions): TweenAnimation
    {
        const toItem = new TweenTo(object, options);
        this.addItem(toItem);
        return toItem;
    }
}

