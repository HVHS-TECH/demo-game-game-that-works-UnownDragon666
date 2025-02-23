/*******************************************************/
// P5 play demo game
// Create a demo game
// Written by Idrees Munshi
/*******************************************************/
console.log('script running');

/*******************************************************/
// Variables and constants
/*******************************************************/ 
let player;
const MOVEMENTSPEED = 7;
let score = 0;

let coin;
const COINTIMEOUT = 3000;
let coinArray = [];

/*******************************************************/
// setup()
// 
/*******************************************************/
function setup() {
    console.log('setup run')
    cnv = new Canvas(windowWidth, windowHeight);

    // Player 
    player = new Sprite(width/2, height/2, 30, 30, 'd');
    player.color = 'white';
    createCoin();
    
    // Score
    player.collides(coin, coinCollected);
}

/*******************************************************/
// draw()
// 
/*******************************************************/
function draw() {
    movePlayer();
    background('black');
    
    // Score 
    displayScore();

    checkCoinTime();
}

/*******************************************************/
// movePlayer()
// Moves player sprite
// Called in draw loop
// Input: N/A 
// Output: N/A
/*******************************************************/
function movePlayer() {
    // Up and down
    if (kb.pressing('w')) {
        player.vel.y = -1 * MOVEMENTSPEED;
    } else if (kb.pressing('s')) {
        player.vel.y = MOVEMENTSPEED;
    }

    if (kb.released('w') || kb.released('s')) {
        player.vel.y = 0;
    }

    // Left and right
    if (kb.pressing('a')) {
        player.vel.x = -1 * MOVEMENTSPEED;
    } else if (kb.pressing('d')) {
        player.vel.x = MOVEMENTSPEED;
    }

    if (kb.released('a') || kb.released('d')) {
        player.vel.x = 0;
    }
}

/*******************************************************/
// displayScore()
// Displays score
// Called in draw loop
// Input: N/A 
// Output: N/A
/*******************************************************/
function displayScore() {
    fill('white');
    text("Score: " + score, 10, 30);
}

/*******************************************************/
// createCoin()
// Create coins
// Called in 
// Input: N/A 
// Output: N/A
/*******************************************************/
function createCoin () {
    coin = new Sprite(random(0, width), random(0, height), 20, 's');
    coin.color = 'yellow';
    coin.spawnTime = millis();
    coin.collected = false;
}

function checkCoinTime() {
    if (coin.spawnTime + COINTIMEOUT < millis() && coinCollected == false) {
        // Player loses
        coin.remove();
        score = 'you lose!';
    }
}

/*******************************************************/
// coinCollected()
// Collect coins
// Called in 
// Input: N/A 
// Output: N/A
/*******************************************************/
function coinCollected(_player, _coin) {
    // Increase score
    score++;
    // Delete coin
    _coin.collected = true;
    _coin.remove();
    // Fix player rotation
    player.rotationSpeed = 0;
    player.rotation = 0;
    
}