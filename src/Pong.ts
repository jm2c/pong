class Pong {
    canvas: HTMLCanvasElement;
    ctx:    CanvasRenderingContext2D;
    height: number;
    width:  number;
    ball: Rect;
    playerA: Rect;
    playerB: Rect;

    constructor(width: number, height: number) {
        // Init config
        this.height = height;
        this.width = width;
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d')!;

        // Prepare the canvas
        this.canvas.style.backgroundColor = 'black';
        this.canvas.height = this.height;
        this.canvas.width = this.width;
        document.body.appendChild(this.canvas);

        // Create de Ball
        this.ball = new Rect(
            new Vector2d(this.width / 2, this.height / 2),
            new Vector2d(20, 20)
        );

        // Create the players
        this.playerA = new Rect(
            new Vector2d(30, height / 2),
            new Vector2d(20, 200)
        );
        this.playerB = new Rect(
            new Vector2d(width - 30, height / 2),
            new Vector2d(20, 200)
        );
        
    }

    draw(): void {
        const drawables = new Array<drawable>(
            new Rect(
                new Vector2d(this.width / 2, this.height / 2),
                new Vector2d(1, this.height)
            ),
            this.ball,
            this.playerA,
            this.playerB,
        );

        drawables.forEach(obj => {
            obj.draw(this.ctx);
        });
    }

    update() {}

    start() {
        this.draw();
    }
}