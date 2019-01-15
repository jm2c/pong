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
        this.canvas.style.backgroundColor = '#111';
        this.canvas.height = height;
        this.canvas.width = width;
        document.body.appendChild(this.canvas);

        // Create de Ball
        this.ball = new Rect(
            new Vector2d(width / 2, height / 2),
            new Vector2d(20, 20)
        );
        this.ball.vel = new Vector2d(3, 3);
        
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

    // Draw all the objects
    draw(): void {
        this.ctx.clearRect(0,0,this.width, this.height);

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

    // Game Main Loop
    update(): void {
        // Collitions
        if(this.ball.top < 0 || this.ball.bottom > this.height)
            this.ball.vel.y *= -1;

        if(this.ball.left < 0 || this.ball.right > this.width)
            this.ball.vel.x *= -1;
        
        if(
               this.ball.horizontalCollide(this.playerA)
            || this.ball.horizontalCollide(this.playerB)
        ) { this.ball.vel.x *= -1; }

        if(
               this.ball.verticalCollide(this.playerA)
            || this.ball.verticalCollide(this.playerB)
        ) { this.ball.vel.y *= -1; }

        // Update the objects
        const updateables = new Array<drawable>(
            this.ball,
            this.playerA,
            this.playerB
        );
        updateables.forEach(obj => {
            obj.update();
        });
        this.draw();
        requestAnimationFrame( () => this.update() );
    }

    // Start the main loop
    start(): void {
        requestAnimationFrame( () => this.update() );
    }
}