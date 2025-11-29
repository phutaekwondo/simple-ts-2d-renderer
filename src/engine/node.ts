import { Updatable } from "./life-cycle/updatable.i";

export class Node implements Updatable
{
    x = 0;
    y = 0;
    rotation = 0; // radians
    scaleX = 1;
    scaleY = 1;
    visible = true;
    parent: Node | null = null;
    children: Node[] = [];
    name?: string;

    constructor(name?: string) { this.name = name; }

    protected onRender(_ctx: CanvasRenderingContext2D) {}
    protected onUpdate(_dt: number) {}

    render(ctx: CanvasRenderingContext2D)
    {
        if (!this.visible) return;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.scale(this.scaleX, this.scaleY);
        this.onRender(ctx);
        for (const c of this.children) c.render(ctx);
        ctx.restore();
    }

    addChild(child: Node)
    {
        child.parent = this;
        this.children.push(child);
    }

    removeChild(child: Node)
    {
        const idx = this.children.indexOf(child);
        if (idx >= 0)
        {
            this.children.splice(idx, 1);
            child.parent = null;
        }
    }

    update(dt: number)
    {
        this.onUpdate(dt);
        for (const c of this.children) c.update(dt);
    }
}
