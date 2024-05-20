import Bird from "./bird.js"
import Pipe from "./pipe.js"

/** @type {HTMLCanvasElement} */

// CONSTANTS

const canvas = document.getElementById('main');
const ctx = canvas.getContext('2d');
const WIDTH = canvas.width = 600;
const HEIGHT = canvas.height = 700;
const SPEED = 10;
const DISTANCE_BETWEEN_PIPES = 300;

// Setting up font

ctx.textAlign = "center";
ctx.font = "bold 30px Press VT323";

// Mouse input

let mouse_down = false;

window.addEventListener('mousedown', (e) => {
    if (e.button == 0) { mouse_down = true; running = true; }
});

// window.addEventListener('mouseup', (e) => {
//     if (e.button == 0) mouse_down = false;
// });

// Variables to maintain game speed

let prev_time = 0;
let curr_time = 0;
let delta_time = 0;
let time_since_last_frame = 0;

// instance of Bird class (player)

let birb = new Bird(WIDTH, HEIGHT, ctx);
let pipes = [];
let frame_id = null;
let running = false;

// main function

function main (time_stamp) {

    // clear screen

    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    // calculate time_since_last_frame

    curr_time = time_stamp
    delta_time = curr_time - prev_time;
    time_since_last_frame += delta_time;
    prev_time = curr_time;

    if (running) {
        if (time_since_last_frame >= SPEED) {
            time_since_last_frame = 0;
            // update
            pipes.forEach(pipe => pipe.update(birb));
            birb.update(mouse_down);
            if (mouse_down) { mouse_down = false; }
        }

        // draw
        pipes.forEach(pipe => pipe.draw());
        birb.draw();

        // Checking if pipe out of screen and deleting it

        if (pipes.length > 0 && pipes[0].ded == true) {
            pipes.splice(0, 1);
        }

        // Adding new pipes

        if (pipes.length == 0 || WIDTH - pipes[pipes.length - 1].x >= DISTANCE_BETWEEN_PIPES) {
            pipes.push(new Pipe(WIDTH, HEIGHT, ctx));
        }

        pipes.forEach(pipe => {
            if (pipe.check_collision(birb) == true) {
                // window.removeEventListener('mousedown', () => {});
                birb.ded = true;
            }
        });

        // console.log(birb.score);

        // Drawing the score

        ctx.fillStyle = "#000000";
        // ctx.textAlign = "center";
        // ctx.font = "bold 30px Press VT323";
        ctx.fillText("Score: " + String(birb.score), WIDTH / 2, 40);

        
    }

    frame_id = requestAnimationFrame(main);
    
    // Dead and bird reached bottom then exit

    if (birb.ded == true && birb.y + birb.S_HEIGHT >= HEIGHT) {
        cancelAnimationFrame(frame_id);
        return;
    }
}

main(0);
