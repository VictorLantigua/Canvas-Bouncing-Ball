class Ball {
    /**
     * @param X Initial horizontal position of the ball center.
     * @param Y Initial vertical position of the ball center.
     * @param vX Horizontal increment ball.
     * @param vY Vertical increment of the ball.
     * @param radius Radius of the ball.
     * 
     */

    constructor(public X:number, public Y:number, public readonly radius = 15, private vX = 2, private vY = 2) {}


    /**
     * Draws the ball on a canvas context.
     * 
     * @param ctx Canvas context to define the ball shape.
     * @param color Ball color.
     */
    draw(ctx: CanvasRenderingContext2D, color: string | CanvasGradient | CanvasPattern) {
        ctx.beginPath();

        ctx.arc(this.X, this.Y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.fill()
    }

    /**
     * Applies the increment coefficient to the ball's center coordinates.
     * 
     * @param width Drawing surface width.
     * @param heigth Drawing surface heigth.
     */
    move(width: number, heigth: number) {

        // Incrementing ball's center position.
        this.X += this.vX;
        this.Y += this.vY;

        if (this.X - this.radius < 0 || this.X + this.radius > width) {
            this.vX *= -1;
        }

        if (this.Y - this.radius < 0 || this.Y + this.radius > heigth) {
            this.vY *= -1;
        }
    }

    /**
     * Augments increment coefficient.
     */
    incVelocity() {
        this.X += this.X * 0.05;
        this.Y += this.Y * 0.05;
    }
    
    /**
     * Reduce increment coefficient.
     */
    decVelocity():void {
        if (this.X < 3 || this.Y < 3) {
            return;
        }

        this.X -= this.X * 0.05;
        this.Y -= this.Y * 0.05;
    }
}



class CanvasAnimation {
    private readonly context: CanvasRenderingContext2D;
    private readonly surfaceWidth: number;
    private readonly surfaceHeigth: number;
    private ball: Ball;


    constructor(private readonly canvas: HTMLCanvasElement) {
        this.context = this.canvas.getContext("2d");
        this.surfaceWidth = this.canvas.width;
        this.surfaceHeigth = this.canvas.height;
        this.ball = new Ball(Math.floor(this.surfaceWidth) / 2, Math.floor(this.surfaceHeigth / 2));

        window.requestAnimationFrame(() => this.draw());
    }

    draw() {
        this.context.clearRect(0, 0, this.surfaceWidth, this.surfaceHeigth);
        this.ball.draw(this.context, "red");
        this.ball.move(this.surfaceWidth, this.surfaceHeigth);
        window.requestAnimationFrame(() => this.draw());
    }
}


const _canvas = <HTMLCanvasElement>document.getElementById("canvasId");
new CanvasAnimation(_canvas);