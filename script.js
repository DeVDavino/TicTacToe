const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle'
const WINNING_COMBINATIONS = [ //Remember that an array always begins at 0 LOL!!!
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const cellElements = document.querySelectorAll('[data-cell]'); 
const board = document.getElementById('board'); //import elements from HTML
const winningMessageElement = document.getElementById('winningMessage');
const restartButton = document.getElementById('restartButton');
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
let circleTurn; //variable

startGame(); 

restartButton.addEventListener('click', startGame);

function startGame(){
    circleTurn = false; //X == first player, O == second player, game always starts with first player.
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, {once: true}) //Only fire this event once, only adds Elements once in the specified cell 
    });
    setBoardHoverClass();
    winningMessageElement.classList.remove('show'); 

}

function handleClick(e){
    const cell = e.target; //cell gets bounden to the target
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS; // if it's circle's turn than == CIRCLE_CLASS otherwise X_CLASS
    placeMark(cell, currentClass);
    if(checkWin(currentClass)){
        endGame(false);
    }
    else if(isDraw()){
        endGame(true);
    }
    else{
        swapTurns();
        setBoardHoverClass();
    }
  
}

function endGame(draw){
    if(draw){
        winningMessageTextElement.innerText = 'Draw!'
    }else{
        winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`;
    }
    winningMessageElement.classList.add('show');
}

function isDraw(){
    return [...cellElements].every(cell => { //cellElements doesn't have an every class so, destructior the cellElements in an array to use the every class
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS);
    });
}

function placeMark(cell, currentClass) { //adds a cell to the current class, whilst also looking who's turn it is (X or Circle)
    cell.classList.add(currentClass);
}

function swapTurns(){
    circleTurn = !circleTurn; //the opposite of the current value in circleTurn (X or Circle)
}

function setBoardHoverClass(){ //Hover effect based on who's turn it currently is!
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);
    if(circleTurn){
        board.classList.add(CIRCLE_CLASS);
    }
    else{
        board.classList.add(X_CLASS);
    }
}

function checkWin(currentClass){ //Check all of the winning combinations, to see if they match the current combinations
    return WINNING_COMBINATIONS.some(combinations => { //if any of the values of the WINNING_COMBINATIONS are true.
        return combinations.every(index => { //check if all the values in the cell elements have the same class (X OR CIRCLE)
            return cellElements[index].classList.contains(currentClass); //for every single cell in the combination is correct = WIN 
        });
    });
}
