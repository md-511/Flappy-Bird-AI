export default class Pipe
{
    constructor (W_WIDTH, W_HEIGHT, ctx) {
        this.W_WIDTH = W_WIDTH;
        this.W_HEIGHT = W_HEIGHT;
        this.MARGIN = 100;
        this.ctx = ctx;
        this.S_WIDTH = 100;
        this.G_HEIGHT = 250;
        this.gap_y = Math.random() * (this.W_HEIGHT - this.G_HEIGHT - this.MARGIN) + this.MARGIN / 2; // Top y of gap
        this.speed = -2;
        this.x = this.W_WIDTH;
        this.ded = false;
        this.passed = false;
        this.inc = false;       // Incremented score ? yes or no
    }

    update (birb) {
        if (birb.ded) {
            return;
        }

        if (this.passed && !this.inc) {
            birb.score += 1;
            this.inc = true;
        }

        this.x += this.speed;
        if (this.x + this.S_WIDTH <= 0) {
            this.ded = true;
        }
    }

    draw () {
        this.ctx.fillStyle = "#00ff00";
        this.ctx.fillRect(this.x, 0, this.S_WIDTH, this.gap_y);
        this.ctx.fillRect(this.x, this.gap_y + this.G_HEIGHT, this.S_WIDTH, this.W_HEIGHT - (this.gap_y + this.G_HEIGHT));
    }

    check_collision (birb) {
        if (birb.x + birb.S_WIDTH < this.x) {
            // Cant Collide there
            return false;
        }

        // Passed the pipe
        if (birb.x > this.x + this.S_WIDTH) {
            this.passed = true;
            return false;
        }

        // Need to check for y position
        if (birb.y <= this.gap_y || birb.y + birb.S_HEIGHT >= this.gap_y + this.G_HEIGHT) {
            // console.log("Collided");
            return true;
        }

        return false;
    }
};
