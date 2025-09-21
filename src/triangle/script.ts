import { CANVAS_HEIGHT, CANVAS_WIDTH, dpiRatio, Point, ITERATIONS, pause } from "../lib";
import type { Context } from "../lib";


function drawVertices(ctx: Context, sideLength: number) {

    // Draws an equilateral triangle centered at h/2, w/2
    const _A = new Point()
    const _B = new Point()
    const _C = new Point()

    _B.x = (CANVAS_WIDTH / 2) - (sideLength / 2);
    _B.y = (CANVAS_HEIGHT / 2) + (sideLength / (Math.sqrt(3) * 2)) + 20;

    _A.x = _B.x + (sideLength / 2);
    _A.y = _B.y - ((Math.sqrt(3) / 2) * sideLength);

    _C.x = _B.x + sideLength;
    _C.y = _B.y;
    /**
     *      A
     * 
     * B        C
     */
    ctx.beginPath();
    ctx.moveTo(_B.x, _B.y);
    ctx.lineTo(_A.x, _A.y);
    ctx.stroke();
    ctx.lineTo(_C.x, _C.y);
    ctx.stroke();
    ctx.lineTo(_B.x, _B.y);
    ctx.stroke();
    ctx.closePath();

    return [_A, _B, _C];
}

enum Vertice {
    A = 0,
    B = 1,
    C = 2
}

function randVertice(): Vertice {
    return Math.floor(Math.random() * 3) as Vertice;
}

async function main() {
    const canvas = document.querySelector<HTMLCanvasElement>("canvas#canv")!;
    const ctx = canvas.getContext("2d") as Context;

    canvas.height = CANVAS_HEIGHT;
    canvas.width = CANVAS_WIDTH;
    canvas.style.height = CANVAS_HEIGHT / dpiRatio + "px";
    canvas.style.width = CANVAS_HEIGHT / dpiRatio + "px";

    const vertices = drawVertices(ctx, 700);


    ctx.strokeStyle = 'rgba(230,230,230, 0.15)';

    let iteration = 0;
    const lastPoint = new Point(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2); //for simplicity ill take the inital "random" point as the centroid of traingle
    while (iteration <= ITERATIONS) {
        iteration++;
        await pause(0.1);
        // Generate random vetex
        let vertice = -1
        // do {
        // vertice = randVertice();
        // } while (vertice == LAST_VERTICE);
        // LAST_VERTICE = vertice;
        vertice = randVertice();

        // ctx.beginPath();
        // ctx.moveTo(lastPoint.x, lastPoint.y);
        // ctx.lineTo(vertices[vertice].x, vertices[vertice].y);
        // ctx.stroke
        // ctx.stroke();
        // ctx.closePath();

        // Calcualating midpoint bw lastpoint and coordinate of vertex
        lastPoint.x = 1 / 2 * (lastPoint.x + vertices[vertice].x);
        lastPoint.y = 1 / 2 * (lastPoint.y + vertices[vertice].y);

        // Drawing a circle at the midpoint

        ctx.beginPath();
        ctx.arc(lastPoint.x, lastPoint.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = "red";
        ctx.fill()
        ctx.closePath();
    }
}

main().catch(console.log);

/**
 * take random initial point
 * randomly takea vertice and from that point draw a line to it 
 * midpoint of this line becomes the starting point for the next line
 */