const BG_COLOUR = '#000000';
const SNAKE_COLOUR = '#f5f12a';
const FOOD_COLOUR = '#228B22';

const socket = io('https://sleepy-island-33889.herokuapp.com/', { transports: ['websocket', 'polling', 'flashsocket'] });

socket.on('init', handleInit);
socket.on('gameState', handleGameState);
socket.on('gameOver', handleGameOver);
socket.on('gameCode', handleGameCode);
socket.on('unknownCode', handleUnknownCode);
socket.on('tooManyPlayers', handleTooManyPlayers);

const gameScreen = document.getElementById('gameScreen');
const initialScreen = document.getElementById('initialScreen');
const newGameBtn = document.getElementById('newGameButton');
const joinGameBtn = document.getElementById('joinGameButton');
const gameCodeInput = document.getElementById('gameCodeInput');
const gameCodeDisplay = document.getElementById('gameCodeDisplay');
const codeText = document.getElementById("codeText");

newGameBtn.addEventListener('click', newGame);
joinGameBtn.addEventListener('click', joinGame);


function newGame() {
    socket.emit('newGame');
    init();
}

function joinGame() {
    const code = gameCodeInput.value;
    if (code === "") {
        alert("Empty Game Code");
        return;
    }

    socket.emit('joinGame', code);
    codeText.innerHTML = "Snake Game";
    init();
}

let canvas, ctx;
let playerNumber;
let gameActive = false;

function init() {
    initialScreen.style.display = "none";
    gameScreen.style.display = "block";

    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    canvas.width = 600;
    canvas.height = 600;


    ctx.fillStyle = BG_COLOUR;
    //drawGrid(600, 600, "canvas");
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    document.addEventListener('keydown', keydown);
    gameActive = true;
}

function keydown(e) {
    socket.emit('keydown', e.keyCode);
}

function paintGame(state) {
    // ctx.fillStyle = BG_COLOUR;
    // ctx.fillRect(0, 0, canvas.width, canvas.height);
    var drawGrid = function(w, h, id) {
        canvas = document.getElementById(id);
        ctx = canvas.getContext('2d');
        ctx.canvas.width = w;
        ctx.canvas.height = h;
        for (x = 0; x <= w; x += 30) {
            ctx.moveTo(x, 0);
            ctx.lineTo(x, h);
            for (y = 0; y <= h; y += 30) {
                ctx.moveTo(0, y);
                ctx.lineTo(w, y);
            }
        }
        ctx.stroke();
    };

    drawGrid(600, 600, "canvas");

    const food = state.food;
    const gridsize = state.gridsize;
    const size = canvas.width / gridsize;

    ctx.fillStyle = FOOD_COLOUR;
    ctx.fillRect(food.x * size, food.y * size, size, size);

    paintPlayer(state.players[0], size, SNAKE_COLOUR);
    paintPlayer(state.players[1], size, 'red');
}

function paintPlayer(playerState, size, colour) {
    const snake = playerState.snake;

    ctx.fillStyle = colour;
    for (let cell of snake) {
        ctx.fillRect(cell.x * size, cell.y * size, size, size);
    }
    ctx.fillStyle = '#000000';
    let s = snake.length;
    let cell = snake[s - 1];
    ctx.fillRect(cell.x * size + 10, cell.y * size + 10, 6, 6);
}

function handleInit(number) {
    playerNumber = number;
}

function handleGameState(gameState) {
    if (!gameActive) {
        return;
    }
    gameState = JSON.parse(gameState);
    requestAnimationFrame(() => paintGame(gameState));
}

function handleGameOver(data) {
    if (!gameActive) {
        return;
    }
    data = JSON.parse(data);

    gameActive = false;

    if (data.winner === playerNumber) {
        alert('You Win!');
    } else {
        alert('You Lose :(');
    }
}

function handleGameCode(gameCode) {
    gameCodeDisplay.innerText = gameCode;
}

function handleUnknownCode() {
    reset();
    alert('Unknown Game Code')
}

function handleTooManyPlayers() {
    reset();
    alert('This game is already in progress');
}

function reset() {
    playerNumber = null;
    gameCodeInput.value = '';
    initialScreen.style.display = "block";
    gameScreen.style.display = "none";
}