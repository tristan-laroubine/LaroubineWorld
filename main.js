var c = document.getElementById("game");

widthScreenSize = c.clientWidth;
heightScreenSize = c.clientHeight;
var ctx = c.getContext("2d");

var playerImg = new Image();   // Crée un nouvel élément Image
playerImg.src = "https://via.placeholder.com/100x100";


class Mobile{
    constructor(skin, x, y, width, height, vitesse){
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.skin = skin;
        this.vitesse = vitesse;
        this.mobileImg = new Image();
        this.mobileImg.src = skin;
    }
    walk(){

    }
    setup(){

    }
    draw(){
        ctx.drawImage(this.mobileImg,x,y);
    }

}

function start() {
    window.requestAnimationFrame(draw);
}
function draw() {
    ctx.fillRect(0,0,50,50);
    ctx.drawImage(playerImg,50,50);
}
start();