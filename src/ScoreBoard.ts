class ScoreBoard {
    chars: HTMLCanvasElement[];

    constructor() {
        const px = 10;

        // Numbers PixelArt in a 3x5 grid
        this.chars = [
            '111101101101111', // 0
            '110010010010111', // 1
            '111001111100111', // 2
            '111001011001111', // 3
            '101101111001001', // 4
            '111100111001111', // 5
            '111100111101111', // 6
            '111001011001001', // 7
            '111101111101111', // 8
            '111101111001111', // 9
        ].map(s => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d')!;
            canvas.width = 3 * px;
            canvas.height = 5 * px;
            ctx.fillStyle = '#0f0';

            // Draw in the canvas
            s.split('').forEach( (d, i) => {
                if( parseInt(d) == 1 ){
                    ctx.fillRect(
                        (i % 3) * px,
                        Math.floor(i / 3) * px,
                        px,
                        px
                    );
                }
            });
            return canvas;
        });
    }

    getScore(num: number): HTMLCanvasElement {
        if( num < 0) return this.chars[0];
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d')!;
        const length = num.toString().length;

        const boards = num.toString().split('').map( s => {
            const n = parseInt(s);
            return this.chars[n];
        });

        canvas.width = boards[0].width * length + (length - 1) * (boards[0].width / 3);
        canvas.height = boards[0].height;

        boards.forEach((b, i) => {
            ctx.drawImage(
                boards[i],
                (boards[i].width + boards[0].width / 3) * i,
                0
            )
        });

        return canvas;
    }

}
