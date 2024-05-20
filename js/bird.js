export default class Bird
{
    constructor(W_WIDTH, W_HEIGHT, ctx, img_src = 'resources/birb.png') {
        this.ctx = ctx;
        this.W_WIDTH = W_WIDTH;
        this.W_HEIGHT = W_HEIGHT;
        this.x = this.W_WIDTH / 2;
        this.y = this.W_HEIGHT / 2;
        this.fall_speed = 0;
        this.S_WIDTH = 50;
        this.S_HEIGHT = 50;
        this.frame = 0;
        this.number_of_frames = 8; // Change if img_src is changed
        this.img = new Image();
        this.img.src = img_src;
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
        // this.ctx.save();
        // this.ctx.rotate(45 * Math.PI / 180);
    }

    update (mouse_down) {
        this.frame = (this.frame + 1) % (5 * this.number_of_frames);

        this.y += this.fall_speed;
        this.gravity();

        if (mouse_down && this.ded == false) {
            this.flap();
        }
    }

    draw () {
        this.ctx.fillStyle = "#ff0000";
        this.ctx.fillRect(this.x, this.y, this.S_WIDTH, this.S_HEIGHT);
        // this.ctx.drawImage(this.img, Math.floor(this.frame / 5) * this.S_WIDTH, 0, this.S_WIDTH, this.S_HEIGHT, this.x, this.y, this.S_WIDTH, this.S_HEIGHT);
        // this.ctx.strokeRect(this.x, this.y, this.S_WIDTH, this.S_HEIGHT);
        // this.ctx.restore();
    }
};