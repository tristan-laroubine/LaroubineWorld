var c = document.getElementById("game");

widthScreenSize = 2000;
heightScreenSize = 1000;
var ctx = c.getContext("2d");

/* DEBUT CLASS*/

class Obstacle{
    constructor(x,y,w,h)
    {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.vitesse = 5;
    }
    draw(){
        ctx.beginPath();
        ctx.rect(this.x,this.y,this.w,this.h);
        ctx.fillStyle = "red";
        ctx.fill();
    }

    draw(nb){
        if (nb===0){
            this.avancer();
        }
        else if(nb===1)
        {
            this.reculer();
        }
        ctx.beginPath();
        ctx.rect(this.x,this.y,this.w,this.h);
        ctx.fillStyle = "red";
        ctx.fill();
    }
    avancer(){
        this.x = this.x - this.vitesse;
    }

    reculer() {
        this.x = this.x + this.vitesse;
    }
}

class Player {
    constructor() {
        this.x = 100;
        this.y = 50;
        this.w = 50;
        this.h = 100;
        this.vitesseX = 5;
        this.vitesseY = 1;
        this.keyPush = "none";
    }

    draw() {
        this.gravite();
        this.avance();
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.w, this.h);
        ctx.fillStyle = "black";
        ctx.fill();
    }

    gravite() {
        if(this.vitesseY>0)
        {
            this.vitesseY = this.vitesseY + (this.vitesseY*0.15);
            if (this.vitesseY >=15) this.vitesseY = 15;
        }
        else{
            this.vitesseY = this.vitesseY + (-this.vitesseY*0.15);
            if (this.vitesseY <= 0 && this.vitesseY >= -1)
            {
                this.vitesseY = 1;
            }
        }

        this.y = this.y + this.vitesseY;
        this.collisionY();
    }

    collisionY() {
        let obstacle;
        for (let i = 0; i < obstacles.length; ++i) {
            obstacle = obstacles[i];
            if (this.y + this.h >= obstacle.y && this.y <= obstacle.y + obstacle.h) {
                if (this.x + this.w > obstacle.x && this.x < obstacle.x + obstacle.w)
                {
                    this.y = this.y = obstacle.y - this.h;
                }
            }
        }
    }
    collisionX(){
        let obstacle;
        for (let i = 0; i < obstacles.length; ++i) {
            obstacle = obstacles[i];
            if (this.y + this.h > obstacle.y && this.y < obstacle.y + obstacle.h) {
                if (this.x + this.w >= obstacle.x && this.x <= obstacle.x + obstacle.w) {
                        if (this.keyPush==="R")this.x = obstacle.x - this.w;
                        else if(this.keyPush==="L")this.x = obstacle.x + obstacle.w;
                }
                }
            }

        }

    avance(){
        if (this.keyPush === "none")
        {
            return;
        }
        else if(this.keyPush==="L")
        {
            this.x = this.x - this.vitesseX;
            this.collisionX();
        }
        else if(this.keyPush==="R")
        {
            this.x = this.x + this.vitesseX;
            this.collisionX();
        }
    }

    onEventKeyUp(event) {
        if (event.defaultPrevented) {
            return; // Ne devrait rien faire si l'événement de la touche était déjà consommé.
        }
        switch (event.key) {
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

            case "q":
                // Faire quelque chose pour la touche "left arrow" pressée.
                this.keyPush="L";
                break;
            case "d":
                // Faire quelque chose pour la touche "right arrow" pressée.
                this.keyPush="R";
                break;
            case " ":
                this.vitesseY = -30;
            case "Enter":
                break;
            default:
                return; // Quitter lorsque cela ne gère pas l'événement touche.
        }
    }



}

let o1 = new Obstacle(100,900,500,50);
let o2 = new Obstacle(300,850,50,50);
obstacles = [];

let player = new Player();
function start() {
    window.requestAnimationFrame(draw);
    obstacles.push(o1);
    obstacles.push(o2);
}

function draw() {
    ctx.beginPath();
    ctx.rect(0,0,2000,1000);
    ctx.fillStyle = "blue";
    ctx.fill();


    o1.draw();
    o2.draw();

    player.draw();
    window.requestAnimationFrame(draw);

}
window.addEventListener("keydown", function (event) {
    player.onEventKeyPress(event);
},true);

window.addEventListener("keyup", function (event) {
    player.onEventKeyUp(event);
    event.preventDefault();
},true);

start();

