import { Node } from "../node";

export interface Renderer
{
    render(root: Node): void;
}