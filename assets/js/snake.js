
// tableau

var blockSize = 25; // taille d'un carré
var rows = 20;
var cols = 20;
var canva;
var context;

//tête du serpent
var snakeX = blockSize * 5; // le serpent commence à la coordonnée X = 5
var snakeY = blockSize * 5; // le serpent commence à la coordonnée Y = 5

// faire bouger le serpent
var SnakeMoveX = 0;
var SnakeMoveY = 0;

// corps du serpent
 var SnakeBody = [];

// pomme

var foodX;
var foodY;

// Game Over

var gameOver = false;

window.onload = function() {
    canva = document.getElementById("canva");
    canva.height = rows * blockSize;
    canva.width = cols * blockSize;
    context = canva.getContext("2d"); //permet de dessiner sur le tableau 

    placefood()
    document.addEventListener("keyup", changeDirection);
    //update();
    setInterval(update, 1000/10); // répéter l'image 10 fois dans 1 seconde pour voir le serpent bouger
    // appelle la fonction update ligne 57
}

function changeDirection(e) {
    if (e.code == "ArrowUp" && SnakeMoveY != 1) {
        SnakeMoveX = 0;
        SnakeMoveY = -1;
    }
    else if (e.code == "ArrowRight" && SnakeMoveX != -1) {
        SnakeMoveX = 1;
        SnakeMoveY = 0;
    }
    else if (e.code == "ArrowDown" && SnakeMoveY != -1) {
        SnakeMoveX = 0;
        SnakeMoveY = 1;
    }
    else if (e.code == "ArrowLeft" && SnakeMoveX != 1) {
        SnakeMoveX = -1;
        SnakeMoveY = 0;
    }
}

// création du rectangle noir

function update() {
    if (gameOver) {
        return; // arrêter d'updater le canva
    }

    context.fillStyle = "white"; // change la couleur du pinceau en noir
    context.fillRect(0, 0, canva.width, canva.height); // dessine un rectangle partant de 0,0 jusqu'à canva-width et canva-height

    context.fillStyle = "red" // pour la couleur de la pomme
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if (snakeX == foodX && snakeY == foodY) {
        SnakeBody.push([foodX, foodY])
        placefood();
    } 

    for (let i = SnakeBody.length-1; i >0; i--) {
        SnakeBody[i] = SnakeBody[i-1];
    }
    if (SnakeBody.length) {
        SnakeBody[0] = [snakeX, snakeY];
    }


    context.fillStyle = "lime" // pour la couleur du serpent
    snakeX += SnakeMoveX * blockSize;
    snakeY += SnakeMoveY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize) // induire la couleur dans le serpent
    for (let i = 0; i < SnakeBody.length; i++) {
    context.fillRect(SnakeBody[i][0], SnakeBody[i][1], blockSize, blockSize)
    }

    // Game over conditions

    if (snakeX < 0 || snakeX > cols*blockSize || snakeY < 0 || snakeY > rows*blockSize) {
        gameOver = true;
        alert("Perdu !");
    }

    for (let i = 0; i < SnakeBody.length; i++) {
        if (snakeX == SnakeBody[i][0] && snakeY == SnakeBody[i][1]) {
            gameOver = true;
            alert("Perdu :");
        }
    }

}

function placefood() {
    // math.radom = 0-1 * cols -> (0-19?9999) -> 0-19) * 25
    foodX = Math.floor(Math.random() * cols) * blockSize; // générer une coordonnée aléatoire sur l'une des colonnes (blockSize = taille d'un carré) Math.floor = fonction qui permet d'arrondir un nombre à l'entier inférieur
    foodY = Math.floor(Math.random() * rows) * blockSize;
}