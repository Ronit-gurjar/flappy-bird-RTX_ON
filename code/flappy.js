//board
let board;
let boardWidth = 360;
let boardHeight = 640;
let context;

//flappy-bird
let birdWidth = 107;
let birdHeight = 109;
let birdx = boardWidth/8;
let birdy = boardHeight/2
let bird_skin;
let bird={
    x:birdx,
    y:birdy,
    width:birdWidth,
    height:birdHeight
}

//pipes
let pipeArray = [];
let pipeWidth = 73;
let pipeHeight = 484;
let pipex = boardWidth;
let pipey = 0;
let topPipeImg;
let bottomPipeImg;

//game physics
let velocityX = -2;//pipe moves left
let velocityY = 0;// bird jump speed
let gravity = 0.2;

let gameOver = false;


window.onload = function(){
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d"); // used to draw on board

    //draw the bird
    bird_skin = new Image();
    bird_skin.src = "./pngwing_bird.png"
    bird_skin.onload = function(){
        context.drawImage(bird_skin,birdx,birdy,bird.width,bird.height);
    }

    //draw pipe
    topPipeImg = new Image();
    topPipeImg.src = "./pngwing_pipedown.png"

    bottomPipeImg = new Image();
    bottomPipeImg.src = "./pngwing_pipe.png"

    requestAnimationFrame(update);
    setInterval(placePipes,1500);//add pipes to the board every 1.5s
    document.addEventListener("keydown",moveBird);
}

function update(){
    requestAnimationFrame(update);
    if (gameOver) {
        alert("gameover");
        return;
    }
    context.clearRect(0,0,boardWidth,boardHeight);

    //bird draw
    velocityY += gravity;
    birdy = Math.max(birdy + velocityY,0); //limit the bird from going top of the canvas
    context.drawImage(bird_skin,birdx,birdy,bird.width,bird.height);

    //pipes draw
    for (let i = 0; i < pipeArray.length; i++) {
        let pipe = pipeArray[i];
        pipe.x += velocityX;
        context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

        if (detectCollision(bird, pipe)) {
            gameOver = true;
        }
    }
}
function placePipes(){
    if (gameOver) {
        return;
    }

    //to generate random pipe heights
    let randomPipey = pipey - pipeHeight/8 - Math.random()*pipeHeight/1.5 - 4;
    let gaping = board.height / 10

    let topPipe ={
        img: topPipeImg,
        x:pipex,
        y:randomPipey,
        width: pipeWidth,
        height: pipeHeight,
        passed: false
    }

    pipeArray.push(topPipe);

    let bottomPipe ={
        img: bottomPipeImg,
        x:pipex,
        y:randomPipey + pipeHeight + gaping,
        width: pipeWidth,
        height: pipeHeight,
        passed: false
    }

    pipeArray.push(bottomPipe);
}

function moveBird(e) {
    if (e.code == "Space" || e.code == "ArrowUp" || e.code == "keyX") {
        //bird jump
        velocityY = -6;
    }
}

function detectCollision(a,b) {
    //to detect collision between two rectangles(Image rects)
    return a.x < b.x + b.width && 
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y;
}