import { Square } from "../engine/graph/square";
import { InputManager } from "../engine/input/input-manager";

const SPEED = 0.2;

export class ArrowKeyControlSquare extends Square
{
    protected onUpdate(dt: number): void
    {
        if (InputManager.instance.isDown("ArrowUp"))
        {
            this.y -= SPEED * dt;
        }
        if (InputManager.instance.isDown("ArrowDown"))
        {
            this.y += SPEED * dt;
        }
        if (InputManager.instance.isDown("ArrowLeft"))
        {
            this.x -= SPEED * dt;
        }
        if (InputManager.instance.isDown("ArrowRight"))
        {
            this.x += SPEED * dt;
        }
    }
}