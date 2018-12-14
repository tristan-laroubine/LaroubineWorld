var c = document.getElementById("game");

widthScreenSize = c.clientWidth;
heightScreenSize = c.clientHeight;
var ctx = c.getContext("2d");



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
deplacementImage = 0;
frameDepalcement = 0;
function drawImageSprit(Image,row, cols, posX, posY, widthCanvas, HeightCavans){
    ctx.drawImage(Image,row*64,cols*64,64,64,0,0,200,200);
}
function draw() {
    ctx.fillRect(0,0,500,500);

    var playerImg = new Image();   // Crée un nouvel élément Image
    playerImg.src = "img/skinPlayer/1.png";
    drawImageSprit(playerImg,8,0,64,64);
    if (frameDepalcement%5 === 0){
        deplacementImage = deplacementImage + 1;
    }

    ++frameDepalcement;
    if (deplacementImage >= 64*9)
    {
        deplacementImage = 0;
    }
    window.requestAnimationFrame(draw);

}
start();