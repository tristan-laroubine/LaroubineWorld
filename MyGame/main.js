var c = document.getElementById("game");

widthScreenSize = 2000;
heightScreenSize = 1000;
var ctx = c.getContext("2d");

/* DEBUT CLASS*/

class Obstacle{
    constructor(x,y,w,h,type)
    {
        this.x = 50*x;
        this.y = 50*y;
        this.w = 50*w;
        this.h = 50*h;
        this.vitesse = 5;
        this.img = new Image();
        this.img.src = "img/type"+type+".png";
    }
    draw(){
        for (let i = 0 ; i * 50 < this.w; ++i){
            ctx.drawImage(this.img,this.x+((i)*50),this.y);
        }
        let img1;
        if (this.h > 50) {
            for (let i = 1; i * 50 < this.h; ++i) {
                img1 = new Image();
                img1.src = "img/type" + 0 + ".png";
                ctx.drawImage(img1, this.x, this.y + ((i) * 50));
                if (this.w>50){
                    for (let j =0; j * 50 < this.w;++j){
                        ctx.drawImage(img1, this.x + (j*50), this.y + ((i) * 50));
                    }
                }
            }
        }
    }
    update(decalage)
    {
        this.x = this.x - decalage;
    }
}

class Player {
    constructor() {
        this.x = 400;
        this.y = 50;
        this.w = 50;
        this.h = 100;
        this.vitesseX = 15;
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
        for (let i = 0; i < world.obstacles.length; ++i) {
            obstacle = world.obstacles[i];
            if (this.y + this.h >= obstacle.y && this.y <= obstacle.y + obstacle.h) {
                if (this.x + this.w > obstacle.x && this.x < obstacle.x + obstacle.w)
                {
                    if(this.vitesseY>0) this.y = obstacle.y - this.h;
                    else {
                        this.y=obstacle.y + obstacle.h;
                        this.vitesseY = 2;
                    }
                }
            }
        }
    }
    collisionX(){
        let obstacle;
        for (let i = 0; i < world.obstacles.length; ++i) {
            obstacle = world.obstacles[i];
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
            if(this.x >800 || world.decalage <= 0 )  this.x = this.x - this.vitesseX;

            else world.avancer(-this.vitesseX);
            console.log(world.decalage + " ");
            this.collisionX();
        }
        else if(this.keyPush==="R")
        {
            if (this.x < 1200 ) this.x = this.x + this.vitesseX;
            else world.avancer(this.vitesseX);
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

class World{
    constructor(){
        this.obstacles = [];
        this.decalage = 0;
    }
    initialization()
    {
        let o1 = new Obstacle(5,10,15,4,1);
        let o2 = new Obstacle(20,9,15,5,1);
        let o3 = new Obstacle(5,4,4,1,1);

        this.obstacles.push(o1);
        this.obstacles.push(o2);
        this.obstacles.push(o3);
        // this.obstacles.push(o2);
        // this.obstacles.push(o3);
    }
    draw(){
        for (let i=0; i < this.obstacles.length; ++i )
        {
            this.obstacles[i].draw();
        }
    }
    avancer(decalage)
    {
        this.decalage = this.decalage + decalage;
        for (let i=0; i < this.obstacles.length; ++i )
        {
            this.obstacles[i].update(decalage);
        }
    }
}

let world = new World();
let player = new Player();
function start() {
    world.initialization();
    window.requestAnimationFrame(draw);
}

function draw() {
    ctx.beginPath();
    ctx.rect(0,0,2000,1000);
    ctx.fillStyle = "blue";
    ctx.fill();


    world.draw();
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

