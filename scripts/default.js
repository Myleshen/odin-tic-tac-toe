const board = [[], [], []];

const player1Details = document.getElementById("player1-detail");
const player2Details = document.getElementById("player2-detail");

const gameBoxes = document.querySelectorAll('.game-box');
gameBoxes.forEach(gameBox => gameBox.addEventListener('click', playWithPlayer));

const resetGame = document.getElementById("reset-game");
resetGame.addEventListener('click', reloadPage);

const displayWinnerDiv = document.querySelector(".display-winner");
const greeting = "Wins :)";

let player1Marker = "X";
let player2Marker = "O";

let isPlayer1 = true;


function playWithPlayer(gameBox) {
    gameBox = gameBox.target;
    if (!gameBox.innerHTML != '' || gameBox.innerHTML == 'X' || gameBox.innerHTML == 'O') {
        return;
    }
    let row = gameBox.getAttribute('data-tile-row');
    let col = gameBox.getAttribute('data-tile-col');
    if (isPlayer1) {
        gameBox.innerHTML = player1Marker;
        player1Details.classList.remove("curr-player");
        player2Details.classList.add("curr-player");
        updateBoard(row, col, player1Marker);
    } else {
        gameBox.innerHTML = player2Marker;
        player2Details.classList.remove("curr-player");
        player1Details.classList.add("curr-player");
        updateBoard(row, col, player2Marker);
    }
    isPlayer1 = !isPlayer1;
    gameBox.classList.add("prevent-select", "played")
    setTimeout(gameFinished, 200);
}

function updateBoard(row, col, marker) {
    board[row][col] = marker;
}

function gameFinished() {
    if (checkBoardForWinner(player1Marker)) {
        postGameFinish(`Player 1 ${greeting}`);
    }
    if (checkBoardForWinner(player2Marker)) {
        postGameFinish(`Player 2 ${greeting}`);
    }
    if (document.querySelectorAll(".played").length === 9) {
        postGameFinish("Draw");
    }
}

function checkBoardForWinner(playerMarker) {
    // Check rows, columns and diagonals
    for (let i = 0; i < 3; i++) {
        if ((board[i][0] === playerMarker
            && board[i][1] === playerMarker
            && board[i][2] === playerMarker) ||
            (board[0][i] === playerMarker
                && board[1][i] === playerMarker
                && board[2][i] === playerMarker) ||
            (board[0][0] === playerMarker
                && board[1][1] === playerMarker
                && board[2][2] === playerMarker) ||
            (board[2][0] === playerMarker
                && board[1][1] === playerMarker
                && board[0][2] === playerMarker)) {
            return true;
        }
    }
    return false;
}

function postGameFinish(message) {
    displayWinnerDiv.innerHTML = message;
    gameBoxes.forEach(gameBox => gameBox.removeEventListener('click', playWithPlayer));
    resetGame.innerHTML = "Start New Game";
}

function reloadPage() {
    window.location.reload();
}
