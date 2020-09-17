// JavaScript Document
var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

// tải hình ảnh lên
var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();

bird.src = "btlon/image/bird.png"
bg.src = "btlon/image/bg.png";
fg.src = "btlon/image/fg.png";
pipeNorth.src = "btlon/image/ongTren.png";
pipeSouth.src = "btlon/image/ongDuoi.png";


// tọa độ và điểm ban đầu

var gap = 85; // gap là khoảng cách giữa 2 ống
var constant;

//tọa độ ban đầu của bird
var bX = 10;
var bY = 150;

// độ rớt của bird 
var gravity = 1.5;
var score = best=0;

// nhạc chạy game     
var fly = new Audio();
var scor = new Audio();

fly.src = "btlon/audio/fly.mp3";
scor.src = "btlon/audio/score.mp3";

//lấy dữ liệu từ bàn phím điều khiển game
document.addEventListener("keydown",moveUp);

// chạy ống nước
function moveUp(){
    bY -= 25;
    fly.play();
}

// tạo ống
var pipe = [];

pipe[0] = {
    x : cvs.width,
    y : 0
};

//tạo hình
function draw(){
    
    ctx.drawImage(bg,0,0);
    
    
    for(var i = 0; i < pipe.length; i++){
        
        constant = pipeNorth.height+gap;
        ctx.drawImage(pipeNorth,pipe[i].x,pipe[i].y);
        ctx.drawImage(pipeSouth,pipe[i].x,pipe[i].y+constant);
             
        pipe[i].x--;
        
        if( pipe[i].x == 125 ){
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height
            }); 
        }

        // điều kiện bắt đầu lại game( game over)
        if( bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && (bY <= pipe[i].y + pipeNorth.height || bY+bird.height >= pipe[i].y+constant) || bY + bird.height >=  cvs.height - fg.height){
            location.reload(); // bắt đầu lại từ đầu
        }
        
        if(pipe[i].x == 5){
            score++;
            scor.play();
		
        }
        
        
    }

    ctx.drawImage(fg,0,cvs.height - fg.height);
    
    ctx.drawImage(bird,bX,bY);
    
    bY += gravity;
    
    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Score : "+score,10,cvs.height-20);
   
    
    
    requestAnimationFrame(draw);
    
}

draw();