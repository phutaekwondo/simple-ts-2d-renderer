import { Node } from "../node";

export class Label extends Node
{
    text = "";
    fontSize = 16;
    fontFamily = "sans-serif";
    color = "black";
    protected onRender(ctx: CanvasRenderingContext2D)
    {
        const font = `${this.fontSize}px ${this.fontFamily}`;
        ctx.font = font;
        ctx.fillStyle = this.color;
        ctx.textBaseline = "middle";
        ctx.fillText(this.text, 0, 0);
    }
}
