
var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth / 3;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');
c.font = "45px Sans";

////////////////////////////////////////////////////////////////////
const gameBoard = document.getElementById('game-board');
let lastRenderTime = 0;
const speed = 8;
var dx = 1;
var dy = 0;
var delayFiller = 0;
const snakeBody = [
    {x: 4, y: 11},
];
const food = {x: 11, y: 11};
var signal = 0;
var score = 0;

////////////////////////////////////////////////////////////////////


//main game
function main(currentTime) {
    window.requestAnimationFrame(main);
    const delay = (currentTime - lastRenderTime) / 1000;
    if (delay < 1/speed) return;
    

    lastRenderTime = currentTime;
    gameBoard.innerHTML = '';
    updateSnake();
    drawfood();
    drawSnake(gameBoard);
    delayFiller = 0;
    c.fillStyle = 'black'; 
    c.fillRect(0, 0, canvas.width, canvas.height);
    c.fillStyle = 'red'; 
    c.fillText('SnakeVAnsh', canvas.width/8, 150, 400);
    c.fillText('Score : ' + score, canvas.width/8, 220, 400);
    c.fillText('W for Up', canvas.width/8, 400, 400);
    c.fillText('S for Down', canvas.width/8, 455, 400);
    c.fillText('A for Left', canvas.width/8, 510, 400);
    c.fillText('D for Right', canvas.width/8, 565, 400);
}

// drawin the snake
function drawSnake(gameBoard) {
    var filler = 0;
    snakeBody.forEach (segment => {
        if (validateHead(snakeBody[0].x, snakeBody[0].y)) {
            snakeBody[0].x = 11;
            snakeBody[0].y = 11;
            restart();
        }
        if (validateOutside(snakeBody[0].x, snakeBody[0].y)) {
            snakeBody[0].x = 11;
            snakeBody[0].y = 11;
            restart();
        }
        const snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = segment.y;
        snakeElement.style.gridColumnStart = segment.x;
        if (filler == 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        gameBoard.appendChild(snakeElement);
        filler++;
    })
}

//Updating the snake
function updateSnake() {
    var filler = 0;
    for (let i = snakeBody.length - 2; i >= 0; i--) {
        if (filler == 0) {
            if (snakeBody[0].x == food.x && snakeBody[0].y == food.y) {
                snakeBody.push({...snakeBody[snakeBody.length - 1]});
                signal = 1;
                filler++;
                score++;
            }
        }
        snakeBody[i + 1] = {... snakeBody[i]};
    }
    if (snakeBody.length == 1) {
        if (snakeBody[0].x == food.x && snakeBody[0].y == food.y) {
            snakeBody.push({...snakeBody[snakeBody.length - 1]});
            signal = 1;
            score++;
        }
    }

    snakeBody[0].x += dx;
    snakeBody[0].y += dy;
}

//Drawing the food
function drawfood() {
    const foodElement = document.createElement('div');
    if (signal == 1) {
        food.x = Math.floor(Math.random() * 21) + 1;
        food.y = Math.floor(Math.random() * 21) + 1;
        while (validate(food.x, food.y)) {
            food.x = Math.floor(Math.random() * 21) + 1;
            food.y = Math.floor(Math.random() * 21) + 1;
        }
        signal = 0;
    }
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    gameBoard.appendChild(foodElement);
}

// changing direction
window.addEventListener('keydown', function(event) {
    if (delayFiller == 0) {
        if (event.key == 'w') {
            if (dy == 0) {
                dx = 0;
                dy = -1;
            }
        } 
        else if (event.key == 's') {
            if (dy == 0) {
                dx = 0;
                dy = 1;
            }
        }
        else if (event.key == 'a') {
            if (dx == 0) {
                dx = -1;
                dy = 0;
            }
        }
        else if (event.key == 'd') {
            if (dx == 0) {
                dx = 1;
                dy = 0;
            }
        }
    }   
    delayFiller++;
})

function validate(x, y) {
    for (let i = snakeBody.length - 1; i >= 0; i--) { 
        if (snakeBody[i].x == x && snakeBody[i].y == y) return true;
    }
    return false;
}

function validateHead(x, y) {
    for (let i = snakeBody.length - 1; i > 0; i--) { 
        if (snakeBody[i].x == x && snakeBody[i].y == y) return true;
    }
    return false;
}

function validateOutside(x, y) {
    if(snakeBody[0].x < 1 || snakeBody[0].y < 1 || snakeBody[0].x > 21 || snakeBody[0].y > 21) return true;
    return false;
}

function restart() {
    if (confirm('How tragic seems your skills are not Gojo level yet. How abt you click ok to try again.')) {
        location.reload();
    }
}


main(0);
