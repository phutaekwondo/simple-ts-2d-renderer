import { Circle } from "./engine/graph/circle";
import { GameLoop } from "./engine/life-cycle/game-loop";
import { Node } from "./engine/node";
import { CanvasRenderer } from "./engine/renderer/canvas-renderer";
import { MovingSquare } from "./game/moving-square";

// select the canvas
const canvas = document.getElementById("app") as HTMLCanvasElement;
if (!canvas) throw new Error("No canvas element with id 'app' found.");

const renderer = new CanvasRenderer(canvas, { width: 600, height: 400 });
const root = new Node();
setupScene(root);

const loop = new GameLoop(renderer, root);
loop.start();

function setupScene(root: Node)
{
    const leftCircle = new Circle();
    leftCircle.x = -50;
    const rightCircle = new Circle();
    rightCircle.x = 50

    root.addChild(leftCircle);
    leftCircle.addChild(rightCircle);

    root.addChild(new MovingSquare());
}