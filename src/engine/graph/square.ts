import { Node } from "../node";

export class Square extends Node
{
    protected onRender(_ctx: CanvasRenderingContext2D): void
    {
        this.drawSquare(_ctx)
    }

    private drawSquare(ctx: CanvasRenderingContext2D)
    {
        const size = 120;
        const x = 0
        const y = 0

        ctx.fillStyle = "#ff6b6b";
        ctx.fillRect(x, y, size, size);

        ctx.lineWidth = 4;
        ctx.strokeStyle = "#333";
        ctx.strokeRect(x, y, size, size);
    }
}
