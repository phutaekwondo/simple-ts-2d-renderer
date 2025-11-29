import { Square } from "../engine/graph/square";

export class MovingSquare extends Square
{
    protected onUpdate(dt: number): void
    {
        this.x += 0.1 * dt;
    }
}