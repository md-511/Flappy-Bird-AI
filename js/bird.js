class Bird
{
    constructor(W_WIDTH, W_HEIGHT, ctx) {
        this.ctx = ctx;
        this.W_WIDTH = W_WIDTH;
        this.W_HEIGHT = W_HEIGHT;
        this.x = this.W_WIDTH / 2;
        this.y = this.W_HEIGHT / 2;
        this.fall_speed = 0;
        this.S_WIDTH = 50;
        this.S_HEIGHT = 50;
        this.ded = false;
        this.score = 0;
    }

    gravity (g = 0.5) {

        // Taken from https://opensource.com/article/19/11/simulate-gravity-python

        this.fall_speed += g;

        if (this.y >= this.W_HEIGHT - this.S_HEIGHT && this.fall_speed >= 0) {
            this.fall_speed = 0;
            this.y = this.W_HEIGHT - this.S_HEIGHT;
        }
    }

    flap () {
        this.fall_speed = -10;
    }

    update (mouse_down) {
        this.y += this.fall_speed;
        this.gravity();

        if (mouse_down && this.ded == false) {
            this.flap();
        }
    }

    draw () {
        this.ctx.fillStyle = "#ff0000";
        this.ctx.fillRect(this.x, this.y, this.S_WIDTH, this.S_HEIGHT);
    }
};