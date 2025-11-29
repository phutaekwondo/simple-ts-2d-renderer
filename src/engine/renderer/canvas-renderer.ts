import { CanvasConfig } from "../config/canvas-config.i";
import { Node } from "../node";
import { Renderer } from "./renderer.i";

export class CanvasRenderer implements Renderer
{
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;

    constructor(canvas: HTMLCanvasElement, config: CanvasConfig)
    {
        this.canvas = canvas;
        this.canvas.width = config.width;
        this.canvas.height = config.height;

        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("Canvas2D not supported");
        this.ctx = ctx;
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.translate(config.width / 2, config.height / 2);
    }

    clear()
    {
        const { width, height } = this.canvas;
        this.ctx.clearRect(-width / 2, -height / 2, width, height);
    }

    render(root: Node)
    {
        this.clear();
        this.ctx.save();

        root.render(this.ctx);
        this.ctx.restore();
    }
}
