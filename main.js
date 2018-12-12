var c = document.getElementById("game");
widthScreenSize = c.clientWidth;
heightScreenSize = c.clientHeight;
var ctx = c.getContext("2d");

function start() {
    window.requestAnimationFrame(draw);
}
function draw() {
    ctx.fillRect(0,0,50,50);

}
start();