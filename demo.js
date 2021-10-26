var Ball = /** @class */ (function () {
    /**
     * @param X Initial horizontal position of the ball center.
     * @param Y Initial vertical position of the ball center.
     * @param vX Horizontal increment ball.
     * @param vY Vertical increment of the ball.
     * @param radius Radius of the ball.
     *
     */
    function Ball(X, Y, radius, vX, vY) {
        if (radius === void 0) { radius = 15; }
        if (vX === void 0) { vX = 4; }
        if (vY === void 0) { vY = 4; }
        this.X = X;
        this.Y = Y;
        this.radius = radius;
        this.vX = vX;
        this.vY = vY;
    }
    /**
     * Draws the ball on a canvas context.
     *
     * @param ctx Canvas context to define the ball shape.
     * @param color Ball color.
     */
    Ball.prototype.draw = function (ctx, color) {
        ctx.beginPath();
        ctx.arc(this.X, this.Y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.fill();
    };
    /**
     * Applies the increment coefficient to the ball's center coordinates.
     *
     * @param width Drawing surface width.
     * @param heigth Drawing surface heigth.
     */
    Ball.prototype.move = function (width, heigth) {
        // Incrementing ball's center position.
        this.X += this.vX;
        this.Y += this.vY;
        if (this.X - this.radius < 0 || this.X + this.radius > width) {
            this.vX *= -1;
        }
        if (this.Y - this.radius < 0 || this.Y + this.radius > heigth) {
            this.vY *= -1;
        }
    };
    /**
     * Augments increment coefficient.
     */
    Ball.prototype.incVelocity = function () {
        this.X += this.X * 0.05;
        this.Y += this.Y * 0.05;
    };
    /**
     * Reduce increment coefficient.
     */
    Ball.prototype.decVelocity = function () {
        if (this.X < 3 || this.Y < 3) {
            return;
        }
        this.X -= this.X * 0.05;
        this.Y -= this.Y * 0.05;
    };
    return Ball;
}());
var CanvasAnimation = /** @class */ (function () {
    function CanvasAnimation(canvas) {
        var _this = this;
        this.canvas = canvas;
        this.context = this.canvas.getContext("2d");
        this.surfaceWidth = this.canvas.width;
        this.surfaceHeigth = this.canvas.height;
        this.ball = new Ball(Math.floor(this.surfaceWidth) / 2, Math.floor(this.surfaceHeigth / 2));
        window.requestAnimationFrame(function () { return _this.draw(); });
    }
    CanvasAnimation.prototype.draw = function () {
        var _this = this;
        this.context.clearRect(0, 0, this.surfaceWidth, this.surfaceHeigth);
        this.ball.draw(this.context, "red");
        this.ball.move(this.surfaceWidth, this.surfaceHeigth);
        window.requestAnimationFrame(function () { return _this.draw(); });
    };
    return CanvasAnimation;
}());
var canvas = document.getElementById("canvasId");
new CanvasAnimation(canvas);
