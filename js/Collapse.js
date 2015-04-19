/**
 * Created by Ethan on 4/18/2015.
 */
//
    //Program : Collapse
    //Author : Ethan Shimooka
    //


var background_load = false;

var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
ctx.fillStyle = "#FF0000";
canvas.width = 600;
canvas.height = 800;
document.body.appendChild(canvas);

//load assets

var background_asset = new Image();
    background_asset.onload = function () {
        background_load = true;
    };
    background_asset.src = "assets/bg.png";



Array.matrix = function (m, n, initial) {
    var a, i, j, mat = [];
    for (i = 0; i < m; i++) {
        a = [];
        for (j = 0; j < n; j++) {
            a[j] = 0;
        }
        mat[i] = a;
    }
    return mat;
};


//Game Object container.
//

var Game = {};

Game.CELL_SIZE = 30;
Game.X = 600;
Game.Y = 600;
Game.WIDTH = Game.X / Game.CELL_SIZE;
Game.HEIGHT = Game.Y / Game.CELL_SIZE;

Game.RED = 0;
Game.BLUE = 1;
Game.YELLOW = 2;
Game.POPPED = 9;



// All tile positions and color information are stored in a 2d array object, with each entry containing
// an integer representing a game color.

Game.grid = Array.matrix(Game.HEIGHT, Game.WIDTH, 0);




// grid_populate()

// : populates grid with random integers (0,1,2) representing colors.

function grid_populate(){
   for (var h = 0; h < Game.HEIGHT; h++) {
      for (var w = 0; w < Game.WIDTH; w++) {

          Game.grid[h][w] = Math.floor(Math.random() * 3);

      }
   }

}

//draw_rect ()

// Draws the Game.grid object when called.

function draw_rect(){
    var color;
    for (var h = 0; h < Game.HEIGHT; h++) {
        for (var w = 0; w < Game.WIDTH; w++) {
            color = Game.grid[h][w];
            ctx.beginPath();
            if (color === 0) {
                ctx.fillStyle = "red";

                var grd=ctx.createRadialGradient(0,0,2,90,70,1000);
                grd.addColorStop(0," #D0FF00");
                grd.addColorStop(1,"white");

                ctx.fillStyle=grd;


            } else if (color === 1) {

                var grd=ctx.createRadialGradient(300,300,2,90,70,1000);
                grd.addColorStop(0," #FF00BB");
                grd.addColorStop(1,"white");

                ctx.fillStyle=grd;

            }else if (color === 9){
                ctx.fillStyle = "black";
            } else {

                var grd=ctx.createRadialGradient(600,600,2,90,70,1000);
                grd.addColorStop(0,"#4400FF");
                grd.addColorStop(1,"white");

                ctx.fillStyle=grd;

            }

            ctx.fillRect(w * Game.CELL_SIZE + 1, h * Game.CELL_SIZE + 1, Game.CELL_SIZE - 1, Game.CELL_SIZE - 1);
                //ctx.stroke();
        }
        }
}

function draw_score(){





    ctx.beginPath();


    var my_grad=ctx.createLinearGradient(0,0,0,900);
    my_grad.addColorStop(0,"#0073FF");
    my_grad.addColorStop(1,"white");
    ctx.fillStyle=my_grad;
    ctx.fillRect(10, 610, 580, 180);






}








//function

function canvasOnClickHandler(event) {
    var block = cursor_Position(event);
    var popStack = new Array();

    popStack = [];


    match_check(block, popStack);
   // match_check_nr(block, popStack);


    // console.log("selected block is :" + block);


    for (var h = 0; h < popStack.length; h++) {
        var  y = popStack[h][0];
        var  x = popStack[h][1];
        Game.grid[y][x] = 9;

        console.log(popStack[h]);
     }


    render();
}

function cursor_Position(event) {
    var x; var y;

    if (event.pageX || event.pageY) {
        x = event.pageX;
        y = event.pageY;
    } else {
        x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }

    x -= canvas.offsetLeft;
    y -= canvas.offsetTop;

    var block = [Math.floor((y - 4) / Game.CELL_SIZE),
        Math.floor((x - 2) / Game.CELL_SIZE)];
    return block;
}


//

function match_check(block, popStack) {

    if ( Game.grid[block[0]],[block[1]]) {  //check that block exists

        popStack.push(block);

        if (Game.grid[block[0]][block[1]] === Game.grid[block[0]][(block[1] + 1)]) {   //check if right block matches
                var blockcurr = [block[0], (block[1] + 1)];
                var recFlag = popStack.indexOf(blockcurr);
                if (recFlag  < 0) {
                    match_check(blockcurr, popStack);
                }
            }
/*
            if (Game.grid[block[0]][block[1]] === Game.grid[block[0]][(block[1] - 1)]) {   //check if right block matches
                var blockcurr = [block[0], (block[1] - 1)];
                var recFlag = popStack.indexOf(blockcurr);
                if (recFlag < 0) {
                    match_check(blockcurr, popStack);
                }
            }
*/


            console.log("listbool check :" + popStack[0][1]);
    }
}




function update() {

    for (var h = 0; h < Game.HEIGHT; h++) {
        for (var w = 0; w < Game.WIDTH; w++) {

            if (Game.grid[h][w] === 9) {

                for (var i = h;i > 0;i--){

                    Game.grid[i][w] = Game.grid[i - 1][w];
                }
                Game.grid[0][w] = Math.floor(Math.random() * 3);
            }
        }
    }
}


//load ()

//any onetime operations can be put here

function load () {
    grid_populate();
    canvas.addEventListener("click", canvasOnClickHandler, false);


}


// main()

// main game loop

function main (){

    update();
    render();
    requestAnimationFrame(main);
}

//render()

function render () {
    if (background_load) {
        ctx.drawImage(background_asset, 0, 0);
    }


    draw_rect();
    draw_score();
}


load();
main();