import { Node } from "../node";

export class Circle extends Node
{
    protected onRender(_ctx: CanvasRenderingContext2D): void
    {
        const radius = 60;
        const x = 0;
        const y = 0;

        _ctx.fillStyle = "#6b6bff";
        _ctx.beginPath();
        _ctx.arc(x, y, radius, 0, Math.PI * 2);
        _ctx.fill();

        _ctx.lineWidth = 4;
        _ctx.strokeStyle = "#333";
        _ctx.stroke();
    }
}