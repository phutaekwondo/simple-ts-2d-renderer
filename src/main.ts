import { FrameByFrameAnimation } from "./engine/animation-frame-by-frame-animation";
import { AudioPlayer } from "./engine/audio/audio-player";
import { Label } from "./engine/component/label";
import { Sprite } from "./engine/component/sprite";
import { CanvasConfig } from "./engine/config/canvas-config.i";
import { GameLoop } from "./engine/life-cycle/game-loop";
import { Node } from "./engine/node";
import { CanvasRenderer } from "./engine/renderer/canvas-renderer";
import { ArrowKeyControlSquare } from "./game/arrow-key-control-square";

// select the canvas
const canvas = document.getElementById("app") as HTMLCanvasElement;
if (!canvas) throw new Error("No canvas element with id 'app' found.");
const canvasConfig: CanvasConfig = { width: 800, height: 800 };

const musicPlayer = new AudioPlayer();
const renderer = new CanvasRenderer(canvas, canvasConfig);
const root = new Node();
setupScene(root);

const loop = new GameLoop(renderer, root);
loop.start();


function setupScene(root: Node)
{
    const baseMapSprite = new Sprite();
    const overWallSprite = new Sprite();
    const player = new ArrowKeyControlSquare();
    const fire = new FrameByFrameAnimation();
    const guide = createGuideNode();
    guide.x = - canvasConfig.width / 2 + 50;
    guide.y = - canvasConfig.height / 2 + 50;

    root.addChild(baseMapSprite);
    root.addChild(player);
    root.addChild(overWallSprite);
    overWallSprite.addChild(fire);
    fire.scaleX = fire.scaleY = 0.2
    fire.x = -150;

    root.addChild(guide);


    loadImageForSprite(baseMapSprite, "assets/base-map.png");
    loadImageForSprite(overWallSprite, "assets/over-wall.png");
    loadImagesForFrameByFrameAnimation(fire, "assets/fire/fire-frames/row-1-column-", 11, () =>
    {
        fire.play(true, 10);
    });

    const bgm = new Audio("assets/bgm.mp3");
    musicPlayer.play(bgm, true);
}

function createGuideNode(): Node
{
    const node = new Node();

    const guide = new Label();
    guide.text = "Use arrow keys to move the square";
    guide.color = "white";

    const warning = new Label();
    warning.text = "The square can go outside the screen, this is a feature";
    warning.color = "white";
    warning.y = 20;

    node.addChild(guide);
    node.addChild(warning);

    return node;
}


function loadImageForSprite(sprite: Sprite, src: string)
{
    loadImage(src).then(img =>
    {
        sprite.setImage(img);
    }).catch(err =>
    {
        console.error("Failed to load image:", err);
    });
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

async function loadImagesForFrameByFrameAnimation(anim: FrameByFrameAnimation, baseSrc: string, frameAmount: number, onComplete?: () => void)
{
    const frames: HTMLImageElement[] = []
    for (let index = 1; index <= frameAmount; index++)
    {
        const src = `${baseSrc}${index}.png`;
        try
        {
            const img = await loadImage(src);
            frames.push(img);
        } catch (err)
        {
            console.error("Failed to load image:", err);
        }
    }

    anim.images = frames;
    onComplete?.();
}