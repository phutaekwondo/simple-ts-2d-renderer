import { Node } from "../node";
import { Renderer } from "../renderer/renderer.i";
import { Updatable } from "./updatable.i";

export class GameLoop
{
    private last = 0;
    private running = false;
    private bound = (t: number) => this.frame(t);
    targets: Updatable[] = [];

    constructor(renderer: Renderer, rootNode: Node)
    {
        this.targets.push(rootNode);
        this.targets.push({ update: (_dt) => { renderer.render(rootNode); } });
    }

    start()
    {
        if (this.running) return;
        this.running = true;
        this.last = performance.now();
        requestAnimationFrame(this.bound);
    }

    stop()
    {
        this.running = false;
    }

    frame(now: number)
    {
        const dt = now - this.last;
        this.last = now;

        for (const t of this.targets) t.update(dt);

        if (this.running) requestAnimationFrame(this.bound);
    }
}
