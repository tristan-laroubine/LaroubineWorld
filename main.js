var c = document.getElementById("game");

widthScreenSize = 2000;
heightScreenSize = 1000;
var ctx = c.getContext("2d");
mobiles = [];

/* DEBUT CLASS*/
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

        this.drawImageSprit(9);
    }
    checkBorderMap(){
        if (this.x < -this.width +1){
            this.x = widthScreenSize;
            return;
        }
        else if (this.x   > (widthScreenSize))
        {
            this.x = -this.width;
            return;
        }
        else if (this.y >= heightScreenSize){
            this.y = -this.height;
            return;
        }
        else if (this.y <= -this.height){
            this.y = heightScreenSize;
            return;
        }
    }
    drawImageSprit(row){
        if (this.frameDeplacement %(15-this.vitesse)===0)
        {
            ++this.deplacementImage;
        }
        if (row>= 0 && row <= 4)
        {
            if (this.deplacementImage>=7) this.deplacementImage=0;

        }
        else if(row >= 5 && row <= 8){
            if (this.deplacementImage>=8) this.deplacementImage=0;

        }
        else if(row >= 9 && row <= 12){
            if (this.deplacementImage>= 9) this.deplacementImage=0;
        }
        else if (row >= 13 && row <= 17){

            if (this.deplacementImage>= 6) this.deplacementImage=0;

        }
        else if (row >= 18 && row <= 22){
            if (this.deplacementImage>= 13) this.deplacementImage=0;
        }
        else if (row >= 23){
            if (this.deplacementImage>= 6 )
            {
                this.deplacementImage=0;
            }
        }
            ctx.drawImage(this.mobileImg,this.deplacementImage*64,row*64,64,64,this.x,this.y,this.width,this.height);
    }


}

class Player extends Mobile{

    constructor(skin){
        super(skin, -50, heightScreenSize/2,200,200, 10);
        this.keyPush="None";
    }
    draw(){
        ++this.frameDeplacement;
        this.checkDirection();
        this.checkAvancer();
        this.checkBorderMap();
        this.checkCollision();
    }
    checkDirection(){
        switch (this.keyPush)
        {
            case "None":
                this.deplacementImage = 0;
                this.frameDeplacement = 0;
                this.drawImageSprit(2);

                break;
            case "U":
                this.drawImageSprit(8);
                break;
            case "L":
                this.drawImageSprit(9);
                break;
            case "R":
                this.drawImageSprit(11);
                break;
            case "D":
                this.drawImageSprit(10);
                break;
        }

    }

    checkAvancer(){
        switch (this.keyPush)
        {
            case "None":
                break;
            case "U":
                this.y = this.y - this.vitesse;
                break;
            case "L":
                this.x = this.x - this.vitesse;
                break;
            case "R":
                this.x = this.x + this.vitesse;
                break;
            case "D":
                this.y = this.y + this.vitesse;
                break;
        }
    }

    onEventKeyUp(event) {
        if (event.defaultPrevented) {
            return; // Ne devrait rien faire si l'événement de la touche était déjà consommé.
        }
        switch (event.key) {
            case "s":
                // Faire quelque 1chose pour la touche "flèche vers le bas" pressée.
                if (this.keyPush==="D")
                    this.keyPush = "None";
                break;
            case "z":
                if (this.keyPush==="U")
                {

                    this.keyPush = "None";
                }

                break;
            case "q":
                if (this.keyPush==="L")
                {

                    this.keyPush = "None";
                }

                break;
            case "d":
                if (this.keyPush==="R")
                {
                    this.keyPush = "None";
                }

                break;
            case " ":
                break;
            case "Enter":
                break;
            default:
                return; // Quitter lorsque cela ne gère pas l'événement touche.
        }
        
    }
    onEventKeyPress(event){
        if (event.defaultPrevented) {
            return; // Ne devrait rien faire si l'événement de la touche était déjà consommé.
        }
        switch (event.key) {
            case "s":
                // Faire quelque chose pour la touche "flèche vers le bas" pressée.
                this.keyPush="D";
                break;
            case "z":
                // Faire quelque chose pour la touche "up arrow" pressée.
                this.keyPush="U";
                break;
            case "q":
                // Faire quelque chose pour la touche "left arrow" pressée.
                this.keyPush="L";
                break;
            case "d":
                // Faire quelque chose pour la touche "right arrow" pressée.
                this.keyPush="R";
                break;
            case " ":
                break;
            case "Enter":
                break;
            default:
                return; // Quitter lorsque cela ne gère pas l'événement touche.
        }
    }

    checkCollision(){
        for(let i =0; i < mobiles.length; ++i)
        {
            if (this.x  === mobiles[i].x && this.y === mobiles[i].y)
            {
                continue;

            }

            if (this.x + (this.width-140) >= mobiles[i].x && mobiles[i].x + mobiles[i].width >= this.x + this.width-70) {
                if (this.y + (this.height)-45 >= mobiles[i].y &&mobiles[i].y + mobiles[i].height >= this.y + this.height-140 )
                {
                    switch (this.keyPush)
                    {
                        case "None":
                            break;
                        case "U":
                            this.y = this.y + this.vitesse;
                            break;
                        case "L":
                            this.x = this.x + this.vitesse;
                            break;
                        case "R":
                            this.x = this.x - this.vitesse;
                            break;
                        case "D":
                            this.y = this.y - this.vitesse;
                            break;
                    }
                }
            }
        }

    }
}

class Bot extends Mobile{
    constructor(){
        super("img/skinPlayer/2.png", getRandomInt(widthScreenSize), getRandomInt(heightScreenSize),200,200, getRandomInt(5)+5);
        this.keyPush="None";
        this.frameRandomDeplacement=0;
    }
    draw(){
        this.selectRandomDirection();
        this.checkAvancer();
        this.checkDirection();
        ++this.frameDeplacement;
        this.checkBorderMap();
    }

    checkDirection(){
        switch (this.keyPush)
        {
            case "None":
                this.deplacementImage = 0;
                this.frameDeplacement = 0;
                this.drawImageSprit(2);

                break;
            case "U":
                this.drawImageSprit(8);
                break;
            case "L":
                this.drawImageSprit(9);
                break;
            case "R":
                this.drawImageSprit(11);
                break;
            case "D":
                this.drawImageSprit(10);
                break;
        }

    }
    selectRandomDirection(){
        if(this.frameRandomDeplacement%30 === 0){
            switch (getRandomInt(4))
            {
                case 0:
                    this.keyPush="U";
                    break;
                case 1:
                    this.keyPush="D";
                    break;
                case 2:
                    this.keyPush="R";
                    break;
                case 3:
                    this.keyPush="L";
                    break;
            }
        }
        this.frameRandomDeplacement ++ ;
    }
    checkAvancer(){
        switch (this.keyPush)
        {
            case "None":
                break;
            case "U":
                this.y = this.y - this.vitesse;
                break;
            case "L":
                this.x = this.x - this.vitesse;
                break;
            case "R":
                this.x = this.x + this.vitesse;
                break;
            case "D":
                this.y = this.y + this.vitesse;
                break;
        }
    }
}
/*FIN CLASSE */
function start() {
    window.requestAnimationFrame(draw);
}
deplacementImage = 0;
frameDepalcement = 0;
let testPlayer = new Player("img/skinPlayer/2.png");
let bot = new Bot();
let bot2 = new Bot();
let bot3 = new Bot();
let testColision = new Mobile("img/skinPlayer/2.png",200,200,200,200);
mobiles.push(testColision);
mobiles.push(testPlayer);
// mobiles.push(bot);
// mobiles.push(bot2);
// mobiles.push(bot3);
function draw() {
    ctx.fillRect(0,0,2000,2000);



    testPlayer.draw();
    // bot.draw();
    // bot2.draw();
    // bot3.draw();
    testColision.draw();
    window.requestAnimationFrame(draw);

}
window.addEventListener("keydown", function (event) {
    testPlayer.onEventKeyPress(event);
},true);

window.addEventListener("keyup", function (event) {
    testPlayer.onEventKeyUp(event);
    event.preventDefault();
},true);

start();

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}