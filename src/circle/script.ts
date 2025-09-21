import { CANVAS_HEIGHT, CANVAS_WIDTH, dpiRatio, Point, pause, ITERATIONS } from "../lib";
import type { Context } from "../lib";



const TWO_PIE = Math.PI * 2;
const RADIUS = 400;
const CENTER = new Point(CANVAS_WIDTH / 2, CANVAS_HEIGHT /2);


function drawCircle(ctx: Context, radius: number, center:Point) {
    // Draws a circle with radius centered at h/2, w/2
    ctx.beginPath();
    ctx.arc(center.x, center.y, radius, 0, TWO_PIE);
    ctx.stroke();
    ctx.closePath();
}

function getRandomPoint(radius:number, center:Point): Point{
    const rad = Math.random() * TWO_PIE;
    return new Point(
        center.x + (radius * Math.cos(rad)),
        center.y + (radius * Math.sin(rad))
    )
}


async function main() {
    const canvas = document.querySelector<HTMLCanvasElement>("canvas#canv")!;
    const ctx = canvas.getContext("2d") as Context;


    canvas.height = CANVAS_HEIGHT;
    canvas.width = CANVAS_WIDTH;
    canvas.style.height = CANVAS_HEIGHT / dpiRatio + "px";
    canvas.style.width = CANVAS_WIDTH / dpiRatio + "px";

    drawCircle(ctx, 400, CENTER);

    let iteration = 0;

    const lastPoint = new Point(CENTER.x, CENTER.y);
    
    while(iteration < ITERATIONS){
        iteration++;
        await pause(1);
        const pt = getRandomPoint(RADIUS, CENTER);
        lastPoint.x = 1/2 * (lastPoint.x + pt.x);
        lastPoint.y = 1/2 * (lastPoint.y + pt.y);
        
        ctx.beginPath();
        ctx.arc(lastPoint.x, lastPoint.y, 2, 0, TWO_PIE);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.closePath();
    }
}

main().catch(console.log);