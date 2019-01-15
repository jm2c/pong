class Vector2d {
    x: number;
    y: number;

    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;

    }

    add(v: Vector2d): Vector2d {
        return new Vector2d(
            this.x + v.x,
            this.y + v.y
        );
    }

    scalarMultiplication(k: number): Vector2d {
        return new Vector2d(
            this.x * k,
            this.y * k
        );
    }

}

Vector2d.prototype.toString = function(): string {
    return `(${this.x}, ${this.y})`;
}