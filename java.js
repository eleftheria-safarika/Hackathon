var Alert = new CustomAlert();
function CustomAlert(){
    this.render = function(){
        let popUpBox = document.getElementById('popUpBox');
        popUpBox.style.display = "block";
        document.getElementById('closeModal').innerHTML = '<button onclick="Alert.ok()">OK</button>'
    }
    this.ok = function(){
    document.getElementById('popUpBox').style.display = "none";
    document.getElementById('popUpOverlay').style.display = "none";
    }
}
var myGamePiece;

function startGame() {
    myGamePiece = new component(25, 25, "red", 933, 850);
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 1500;
        this.canvas.height = 900;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function(e){
            myGameArea.key = e.keyCode;
        })
        window.addEventListener('keyup', function(e){
            myGameArea.key = false;
        })
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y) {
    this.gamearea = myGameArea;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;        
    }    
}

function updateGameArea() {
    myGameArea.clear();
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
    if (myGameArea.key && myGameArea.key == 37) {myGamePiece.speedX = -1;}
    if (myGameArea.key && myGameArea.key == 39) {myGamePiece.speedX = 1;}
    if (myGameArea.key && myGameArea.key == 38) {myGamePiece.speedY = -1;}
    if (myGameArea.key && myGameArea.key == 40) {myGamePiece.speedY = 1;}
    myGamePiece.newPos();
    myGamePiece.update();
}

function moveup() {
    myGamePiece.speedY -= 1; 
}

function movedown() {
    myGamePiece.speedY += 1; 
}

function moveleft() {
    myGamePiece.speedX -= 1; 
}

function moveright() {
    myGamePiece.speedX += 1; 
}