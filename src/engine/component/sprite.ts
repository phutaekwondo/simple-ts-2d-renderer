import { Node } from "../node";

export class Sprite extends Node
{
    image?: HTMLImageElement;
    width = 0;
    height = 0;
    anchorX = 0.5;
    anchorY = 0.5;

    constructor(img?: HTMLImageElement)
    {
        super();
        if (img) this.setImage(img);
    }

    setImage(img: HTMLImageElement)
    {
        this.image = img;
        this.width = img.naturalWidth;
        this.height = img.naturalHeight;
    }

    protected onRender(ctx: CanvasRenderingContext2D)
    {
        if (!this.image) return;
        ctx.drawImage(
            this.image,
            -this.width * this.anchorX,
            -this.height * this.anchorY,
            this.width,
            this.height
        );
    }
}
