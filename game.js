console.log("Make this work");

// var gameBoard = document.querySelectorAll('.game-board');

var allCells = document.querySelectorAll('.cell');
var resetBtn = document.querySelector('.reset-btn')
var playerTurnDisplay = document.querySelector("#playerTurnDisplay");
var playNowButton = document.querySelector('.play-now-btn');

var updateDisplay = document.querySelector('.display');
//1st select the location of the cell or all cell or that game

//how do u know that player started the game
//who will start 1st

//Decision: who ever starts the game tht player will be X
//and the next person will be O

//Question: how does player takes turn happen?
//Decision: when you click the cell it has to change it to the player symbol or color

//Question: how to check the next player has to play next
//Question: when you already done the symbol you cannot overwrite it - display saying "already selected"
//Question: check the game has been won
//once the player1 won the 3 cells = make it turn all differnetcolor once you clicked the 3 right one


// Decision:
//if won - terminate the playing process - and display - which player has won the game
//else - continue - till the game ends - and display - "its draw nobody won the game"
//reset the game once you have played or end the game by clicking the reset button


// the winning plan=So I have 3 sets of cells to compare against.

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

var updateDisplayWon = function() {
    updateDisplay.innerText = "Hoooraayyy!!!!! You Won this game";
}

var updateDisplayDraw = function() {
    updateDisplay.innerText = "Oh!!! It's a Draw";
}
// var players = ['X','O']; // Array of strings
// var turnCount = 0; // is used to track turns
var currentPlayer = 'X' // is of type string tells a player X, O
// var gameState = [null,null,null,null,null,null,null,null,null]; //default everything to be nil // each item either X or O or nil
var playerXChoices = [];
var playerOChoices = [];
var hasWon = false;

var playerMove = function(event) {
    if(hasWon === true){
        return;
    } 
    
    if(currentPlayer === 'X') {
        event.target.classList.add('X');
        playerXChoices.push(parseInt(event.target.getAttribute('id')));
        winCombo(playerXChoices);

    } else {
        event.target.classList.add('O');   
        playerOChoices.push(parseInt(event.target.getAttribute('id')));
        winCombo(playerOChoices);
    }
    // debugger
    // switch player
    if(currentPlayer === 'X') {
        currentPlayer = 'O';
    } else {
        currentPlayer = 'X';
    }

    //check for draw here
    var totalTurns = playerXChoices.length + playerOChoices.length;
    if(totalTurns >= 9){
        updateDisplayDraw();
    }
    
};


var addEventListenerToGameCells = function() {
//   If cells Is Clicked
    allCells.forEach(function(cell) {
        cell.addEventListener('click', playerMove);
    });
};

// create a function that when you have already selected the cell and you cannot selected again
// write a function that returns true if all items in
// the array are same.
// iterate over the winners array and invoke the previous
// function to define victory
var winCombo = function(choices) {
for (var i = 0; i < winners.length; i++){
    var count = 0;
    for(var j = 0; j < winners[i].length; j++){

        if (choices.includes(winners[i][j])) {
            count++
            console.log(count);
        }
    }   
        if (count >= 3) {
            hasWon = true;
            updateDisplayWon();
            console.log('yay');
            return;
        }
}
};

//write function to reset the game

var resetThisGame = function(){
    hasWon = false;
    playerXChoices = [];
    playerOChoices = [];
    updateDisplay.innerText = "";
    for(var i =0; i < allCells.length; i++){
        if(allCells[i].classList.contains('X')){
            allCells[i].classList.remove('X');
        }else if(allCells[i].classList.contains('O')){
            allCells[i].classList.remove('O');
        }
    }
};


resetBtn.addEventListener('click', resetThisGame);
playNowButton.addEventListener('click', addEventListenerToGameCells);