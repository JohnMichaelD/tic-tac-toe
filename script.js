const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

// grab all data-cell elements in document
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
let circleTurn

startGame()

function startGame() {
    circleTurn = false
    //loop through each cell, every time we click, only ever fire eventListener once
    cellElements.forEach(cell => {
        cell.addEventListener('click', handleClick, {once: true})
    })
    setBoardHoverClass()
}

//called when cell is clicked, 
function handleClick(e) {
    // cell clicked on is gonna be here
    const cell = e.target
    // if its circles turn, return circles, otherwise, return x class
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    //pass cell and currentCLass
    placeMark(cell, currentClass)
    //check fo win
    if (checkWin(currentClass)) {
        console.log('winner')
    }
    //check for draw
    //switch turns
    swapTurns()
    setBoardHoverClass()
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swapTurns() {
    circleTurn = !circleTurn
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS)
    } else {
        board.classList.add(X_CLASS)
    }
}

function checkWin(currentCLass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}