import { Circle } from "./engine/graph/circle";
import { GameLoop } from "./engine/life-cycle/game-loop";
import { Node } from "./engine/node";
import { CanvasRenderer } from "./engine/renderer/canvas-renderer";
import { Tween } from "./engine/tween/tween";
import { ArrowKeyControlSquare } from "./game/arrow-key-control-square";

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
    root.addChild(rightCircle);

    const controlSquare = new ArrowKeyControlSquare();
    root.addChild(controlSquare);

    Tween.instance.to(rightCircle, { duration: 2, targets: { x: 200, scaleX: 1.2 } });
}

function loadImage(src: string): Promise<HTMLImageElement>
{
    return new Promise((resolve, reject) =>
    {
        const img = new Image(); // Create a new HTMLImageElement
        img.src = src; // Set the source of the image
        img.onload = () => resolve(img); // Resolve the promise when the image loads
        img.onerror = (err) => reject(err); // Reject the promise if there's an error
    });
}