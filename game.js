var gameInfo = document.querySelector('.game-info');
var gameBoard = document.querySelector('#game-board');
var allCells = document.querySelectorAll('.cell');

var updateDisplay = document.querySelector('.display-message');
var playNowButton = document.querySelector('.play-now-btn');
var playAgainBtn = document.querySelector('.playagain-btn');
var resetBtn = document.querySelector('.reset-btn');

var player1Score = document.querySelector("#player1Score");
var player2Score = document.querySelector("#player2Score");

var hide = document.querySelectorAll(".hidy");

var playerNames = {
    'X': 'Red Torio',
    'O': 'Green Torio'
}

// store score as 0 and increment it when player wins.
var score = {
    X: 0,
    O: 0
}

// wincombo
var winners = [];
function loadAnswers() {
    winners.push([0, 1, 2]);
    winners.push([3, 4, 5]);
    winners.push([6, 7, 8]);
    winners.push([0, 3, 6]);
    winners.push([1, 4, 7]);
    winners.push([2, 5, 8]);
    winners.push([0, 4, 8]);
    winners.push([2, 4, 6]);
}
loadAnswers();

//update the display when you won the game.
var updateDisplayWon = function (player) {
    updateDisplay.innerHTML = "Hooray " + playerNames[player] + " won!!!";
}
//update the display when you draw the game.
var updateDisplayDraw = function () {
    updateDisplay.innerText = "Oh!!! It's a Draw - Play Again";
}

var preparePageForGameStart = function () {
    gameInfo.style.display = 'none';
    playNowButton.style.display = 'none';
}

// stored currentplayer as X 
var currentPlayer = 'X' // is of type string tells a player X, O
var playerXChoices = []; // To store choice made by X with every click made in cell.
var playerOChoices = []; // To store choice made by O with every click made in cell.
var hasWon = false; // To terminate once you have done your choices made in cell.which means either won or draw

var switchPlayer = function () {
    if (currentPlayer === 'X') {
        currentPlayer = 'O';
    } else {
        currentPlayer = 'X';
    }
}

var checkForDraw = function () {
    var totalTurns = playerXChoices.length + playerOChoices.length;
    if ((totalTurns >= 9) && !hasWon) {
        updateDisplayDraw();
    }
}

// create function to store the playerMove of X & O.
var playerMove = function (event) {
    if (hasWon === true) {
        return;
    }
    if (currentPlayer === 'X') {
        event.target.classList.add('X');
        playerXChoices.push(parseInt(event.target.getAttribute('id')));
        winCombo('X', playerXChoices);
    } else {
        event.target.classList.add('O');
        playerOChoices.push(parseInt(event.target.getAttribute('id')));
        winCombo('O', playerOChoices);
    }
    // switch player
    switchPlayer();
    //check for draw here
    checkForDraw();
    event.target.removeEventListener('click', playerMove);
};

var hideGameControls = function () {
    hide.forEach(hid => {
        hid.style.display = "none"
    })
}

var showGameControls = function () {
    hide.forEach(hid => {
        hid.style.display = ""
    })
}


// create funtion that - Only start when the player click the button (Let's Play) button
var startGame = function () {
    showGameControls();
    playAgain();

    // register click events
    allCells.forEach(function (cell) {
        cell.addEventListener('click', playerMove);
    });
    // Remove play button once clicked.
    playNowButton.hidden = true;
    // Show game board
    gameBoard.hidden = false;

};
// make gameboard hidden before clicking the Let's play button.
// hide.hidden = true
gameBoard.hidden = true;

// increment score when a player wins
var updateScore = function () {
    player1Score.innerHTML = '' + score['X'];
    player2Score.innerHTML = '' + score['O'];
}

// create a function that when you have already selected the cell and you cannot selected again
// write a function that returns true if all items in the array are same.
// iterate over the winners array and invoke the previous
var winCombo = function (player, choices) {
    for (var i = 0; i < winners.length; i++) {
        var count = 0;
        for (var j = 0; j < winners[i].length; j++) {
            if (choices.includes(winners[i][j])) {
                count++
            }
        }
        if (count >= 3) {
            hasWon = true;
            // winner = 'player1'
            // updateDisplayWon(winner);
            score[player]++;
            updateScore();
            updateDisplayWon(player);
            return;
        }
    }
    console.log(score);
};

//write function to playagain by removes only the image not the score of the game
var playAgain = function () {
    hasWon = false;
    playerXChoices = [];
    playerOChoices = [];
    updateDisplay.innerText = "Tic-Tac-Torio";
    for (var i = 0; i < allCells.length; i++) {
        if (allCells[i].classList.contains('X')) {
            allCells[i].classList.remove('X');
        } else if (allCells[i].classList.contains('O')) {
            allCells[i].classList.remove('O');
        }
    }
    currentPlayer = 'X';
    preparePageForGameStart();
};

var freshStartResetGame = function () {
    resetTotalScore();
    updateScore();
    startGame();
    playAgain();
}
// reset all the score stored in player one and two. and start from 0
var resetTotalScore = function () {
    score['X'] = 0;
    score['O'] = 0;
}

hideGameControls();

playAgainBtn.addEventListener('click', startGame);
playNowButton.addEventListener('click', startGame);
resetBtn.addEventListener('click', freshStartResetGame);

