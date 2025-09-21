import { CANVAS_HEIGHT, CANVAS_WIDTH, dpiRatio, Point, ITERATIONS, pause } from "../lib";
import type { Context } from "../lib";


const edgesSelector = document.querySelector<HTMLInputElement>("input#edges")!;

const TWO_PIE = Math.PI * 2
const SIDELENGTH = 400;
const CENTER = new Point(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
function drawPolygon(ctx: Context, sides: number, sideLength: number, center: Point) {
    const steps = TWO_PIE / sides;
    const vertices:Point[] = []
    
    const offset = -Math.PI /2
    for(let angle=offset ; angle <=TWO_PIE + offset; angle+=steps){
        vertices.push(new Point(
            center.x + sideLength * Math.cos(angle),
            center.y + sideLength * Math.sin(angle)
        ))    
    }
    
    for(let idx=0; idx<sides ; idx++){
        ctx.beginPath();
        ctx.moveTo(vertices[idx].x, vertices[idx].y);
        ctx.lineTo(vertices[idx + 1].x, vertices[idx + 1].y);
        ctx.stroke();
        ctx.closePath();
    }
    
    return vertices;
}

let runnerId = 0;

async function serpenkize(ctx: Context, myId:number) {
    const edges = parseInt(edgesSelector.value);
    
    const vertices = drawPolygon(ctx, edges, SIDELENGTH, CENTER);
    let iteration = 0;
    const lastPoint = new Point(CANVAS_WIDTH/2, CANVAS_HEIGHT/2);
    while(iteration < ITERATIONS){
        if(runnerId !== myId) return;
        await pause(0.1);
        const idx = Math.floor(Math.random() * edges);
        const vertice = vertices[idx];
        
        lastPoint.x = 0.5 * (lastPoint.x + vertice.x);
        lastPoint.y = 0.5 * (lastPoint.y + vertice.y);
        
        ctx.beginPath();
        ctx.arc(lastPoint.x, lastPoint.y, 2, 0, TWO_PIE);
        ctx.fill();
        ctx.closePath();
    }
    
}

function main() {
    const canvas = document.querySelector<HTMLCanvasElement>("canvas#canv")!;
    const ctx = canvas.getContext("2d") as Context;
    
    canvas.height = CANVAS_HEIGHT;
    canvas.width = CANVAS_WIDTH;
    canvas.style.height = CANVAS_HEIGHT / dpiRatio + "px";
    canvas.style.width = CANVAS_HEIGHT / dpiRatio + "px";
    
    const label = document.querySelector<HTMLLabelElement>("span#label")!;
    runnerId = Math.random();

    serpenkize(ctx, runnerId);
    ctx.fillStyle = "red";
    
    edgesSelector.addEventListener("change", () => {
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        label.innerText = edgesSelector.value;
        runnerId = Math.random();
        serpenkize(ctx, runnerId);
    });
}

main();