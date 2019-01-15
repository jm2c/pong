class Rect implements drawable {
    pos: Vector2d;
    size: Vector2d;
    vel: Vector2d;

    constructor(pos: Vector2d, size: Vector2d) {
        this.pos = pos;
        this.size = size;
        this.vel = new Vector2d();
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = 'white';
        ctx.fillRect(this.left, this.top, this.size.x, this.size.y);
    }

    get top(): number {
        return (this.pos.y - (this.size.y / 2));
    }

    get bottom(): number {
        return (this.pos.y + (this.size.y / 2));
    }

    get left(): number {
        return (this.pos.x - (this.size.x / 2));
    }

    get right(): number {
        return (this.pos.x + (this.size.x / 2));
    }

}
