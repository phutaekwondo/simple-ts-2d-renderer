import { Sprite } from "./component/sprite";
import { Tween } from "./tween/tween";

export class FrameByFrameAnimation extends Sprite
{
    images: HTMLImageElement[] = [];

    play(loop: boolean = false, framePerSecond: number = 30)
    {
        const tweenObject = { frame: 0 };
        const frameAmount = this.images.length;
        const repeat = loop ? -1 : 0;
        const duration = frameAmount / framePerSecond;
        Tween.instance.to(tweenObject, {
            targets: { frame: frameAmount - 1 },
            duration,
            repeat,
            onUpdate: (progress: number) =>
            {
                this.onFrame(Math.floor(tweenObject.frame));
            }
        })
    }

    private onFrame(frameIndex: number)
    {
        const image = this.images[frameIndex];
        this.setImage(image);
    }
}