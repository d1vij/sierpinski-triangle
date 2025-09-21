export type Context = CanvasRenderingContext2D;

export class Point {
    x: number;
    y: number;
    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }
}

export const dpiRatio = window.devicePixelRatio;
export const CANVAS_HEIGHT = 700 * dpiRatio;
export const CANVAS_WIDTH = 700 * dpiRatio;

export const ITERATIONS = 10e5;


export async function pause(ms: number) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    })
}

