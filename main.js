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
        this.deplacementImage = 0;
        this.frameDeplacement = 0;
    }
    walk(){

    }
    setup(){

    }
    draw(){
        ++this.frameDeplacement;
    }
    drawImageSprit(row, posX, posY, width, height){
        if (this.frameDeplacement %5===0)
        {
            ++deplacementImage;
        }
        if (row>= 0 && row <= 4)
        {
            if (deplacementImage>=7) deplacementImage=0;

        }
        else if(row >= 5 && row <= 8){
            if (deplacementImage>=8) deplacementImage=0;

        }
        else if(row >= 9 && row <= 12){
            if (deplacementImage>= 9) deplacementImage=0;
        }
        else if (row >= 13 && row <= 17){

            if (deplacementImage>= 6) deplacementImage=0;

        }
        else if (row >= 18 && row <= 22){
            if (deplacementImage>= 13) deplacementImage=0;
        }
        else if (row >= 23){
            if (deplacementImage>= 6 )
            {
                deplacementImage=0;
            }
        }
            ctx.drawImage(this.mobileImg,deplacementImage*64,row*64,64,64,posX,posY,width,height);
    }
}

function start() {
    window.requestAnimationFrame(draw);
}
deplacementImage = 0;
frameDepalcement = 0;

function draw() {
    ctx.fillRect(0,0,500,500);


    let testMobile = new Mobile("img/skinPlayer/1.png",0,0,64,64,5);
    // testMobile.draw();
    testMobile.drawImageSprit(0,0,0,200,200);
    window.requestAnimationFrame(draw);

}
start();