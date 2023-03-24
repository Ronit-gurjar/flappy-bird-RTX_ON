//board
let board;
let boardwidth = 360;
let boardheight = 640;
let context;

window.onload = function(){
    board = document.getElementById("board");
    board.height = boardheight;
    board.width = boardwidth;
    context = board.getContext("2d"); // used to draw on board
}