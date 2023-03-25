//board
let board;
let boardwidth = 360;
let boardheight = 640;
let context;

//flappy-bird
let birdwidth = 107;
let birdheight = 109;
let birdx = boardwidth/8;
let birdy = boardheight/2
let bird_skin;

let bird={
    x:birdx,
    y:birdy,
    width:birdwidth,
    height:birdheight
}

window.onload = function(){
    board = document.getElementById("board");
    board.height = boardheight;
    board.width = boardwidth;
    context = board.getContext("2d"); // used to draw on board

    //draw the bird
    bird_skin = new Image();
    bird_skin.src = "./pngwing_bird.png"
    bird_skin.onload = function(){
        context.drawImage(bird_skin,birdx,birdy,bird.width,bird.height);
    }
}