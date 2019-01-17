console.log("Make this work");

// var gameBoard = document.querySelectorAll('.game-board');

var allCells = document.querySelectorAll('.cell');
var resetBtn = document.querySelector('.reset-btn')
var playerTurnDisplay = document.querySelector("#playerTurnDisplay");


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
//once you the game player one the game make it turn all green once you clicked the 3 right one


// Decision:
//if won - terminate the playing process - and display - which player has won the game
//else - continue - till the game ends - and display - "its draw nobody won the game"
//reset the game once you have played or end the game by clicking the reset button


// the winning plan=So I have 3 sets of cells to compare against.
// Horizontal - [1,2,3][4,5,6][7,8,9] same as reverse

// Vertical - [1,4,7][2,5,8][3,6,9] same as reverse

// diagonal - [1,5,9][3,5,7] same as reverse
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

// write a function that returns true if all items in
// the array are same.




// var players = ['X','O']; // Array of strings
// var turnCount = 0; // is used to track turns
var currentPlayer = 'X' // is of type string tells a player X, O
// var gameState = [null,null,null,null,null,null,null,null,null]; //default everything to be nil // each item either X or O or nil
var playerXChoices = [];
var playerOChoices = [];

var playerMove = function(event) {
    if(currentPlayer === 'X') {
        event.target.classList.add('X');
        playerXChoices.push(parseInt(event.target.getAttribute('id')));
        
    } else {
        event.target.classList.add('O');   
        playerOChoices.push(parseInt(event.target.getAttribute('id')));
    }
    // var id = event.target.getAttribute('id'); // '5'
    // var actualId = parseInt(id); // 4
    // gameState[actualId] = currentPlayer;
    // switch player
    if(currentPlayer === 'X') {
        currentPlayer = 'O';
    } else {
        currentPlayer = 'X';
    }
    // console.log(gameState);
};

//   If cells Is Already Clicked
allCells.forEach(function(cell) {
    cell.addEventListener('click', playerMove);
})

// iterate over the winners array and invoke the previous


for (var i = 0; i < winners.length; i++){
    for(var j = 0; j < playerXChoices.length; i++){
        if(playerXChoices === winners) {
            console.log("Hooraaay!! X has won this game");
        }else
        console.log("Its a draw");
    }
}   for(var k = 0; k < playerOChoices.length; k++){
    if(playerOChoices === winners){
        console.log("Hooraay!! O has won this game");
    }else
    console.log("Its a draw");
}
// allItemsSame function to define victory
// do for loops two times







// var takeTurns = function(event){
//     event.target.classList.add('X') 
//     event.target.classList.add('O') 
// }

// if -> takes a condition
// a condition compares two things
// left (condition) right
// what is possible value on left
// right side is always actual value
// is my right side value one of the possible left