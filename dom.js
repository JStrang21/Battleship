import { gameboardFactory, getRandom } from "./ship.js";

let game = gameboardFactory();
let playerOne = game.playerOne;
let playerTwo = game.playerTwo;
//console.log(game)
//console.log(playerOne)
//console.log(playerTwo)

let unselected = document.getElementsByClassName('canClick');
for (let i = 0; i <= unselected.length - 1; i++) {
    unselected[i].addEventListener('click', () => {
        console.log('1')
    })
}

function playerTwoClick() {
    let random = getRandom(0, unselected.length);
    unselected[random].click()
}

function matchSquaresToShips(player) {
    let shipSquares = [];
    for (let i = 0; i <= 99; i++) {
        const currentElement = document.querySelector(`[data-value="${i}"`);
        for (let ship in player) {
            let length = player[ship].shipLength.length;
            for (let j = 0; j <= length - 1; j++) {
                if (i === player[ship].actualLocation[j]) {
                    currentElement.classList.add('selectedSquare')
                    currentElement.classList.remove('notSelected')
                    shipSquares.push(currentElement)
                }
            }
        }
    }
    return shipSquares
}
function matchSquaresToShips2(player) {
    let shipSquares = [];
    for (let i = 0; i <= 99; i++) {
        const currentElement = document.querySelector(`[data-valueTwo="${i}"`);
        for (let ship in player) {
            let length = player[ship].shipLength.length;
            for (let j = 0; j <= length - 1; j++) {
                if (i === player[ship].actualLocation[j]) {
                    currentElement.classList.add('selectedSquare');
                    currentElement.classList.remove('notSelectedTwo')
                    shipSquares.push(currentElement)
                }
            }
        }
    }
    return shipSquares
}

let squaresPlayerOne = matchSquaresToShips(playerOne)
let squaresPlayerTwo = matchSquaresToShips2(playerTwo);

for (let i = 0; i <= squaresPlayerOne.length - 1; i++) {
    squaresPlayerOne[i].style.backgroundColor = "green";
    let coordinates = squaresPlayerOne[i].dataset.value;
    let board = game.boardOne
    let playerOne = game.playerOne
    //squaresPlayerOne[i].innerHTML = board[coordinates].name
    squaresPlayerOne[i].addEventListener('click', (e) => {
        squaresPlayerOne[i].innerHTML = 'X';
        game.receiveAttack(coordinates, board);
        squaresPlayerOne[i].classList.add('hitSquare');
        squaresPlayerOne[i].classList.remove('canClick')
        let isGameOver = game.checkIfAllSunk(playerOne);
        if (isGameOver) {
            console.log('PlayerTwo Won the Game')
            resetGame();
        }
    })
}

for (let i = 0; i <= squaresPlayerTwo.length - 1; i++) {
    //squaresPlayerTwo[i].style.backgroundColor = "green";
    let coordinates = squaresPlayerTwo[i].dataset.valuetwo;
    let board = game.boardTwo
    let playerTwo = game.playerTwo
    //squaresPlayerTwo[i].innerHTML = board[coordinates].name
    squaresPlayerTwo[i].addEventListener('click', (e) => { 
        squaresPlayerTwo[i].innerHTML = 'X'
        squaresPlayerTwo[i].classList.add('hitSquare');
        game.receiveAttack(coordinates, board);
        playerTwoClick();
        let isGameOver = game.checkIfAllSunk(playerTwo);
        if (isGameOver) {
            console.log('PlayerOne Won the Game')
            resetGame();
        }
    })
}

let unselectedOne = document.getElementsByClassName('notSelected');
for (let i = 0; i <= unselectedOne.length - 1; i++) {
    unselectedOne[i].addEventListener('click', () => {
        let cords = unselectedOne[i].dataset.value;
        game.missedCoordinatesOne.push(cords)
        unselectedOne[i].classList.add('missed');
        unselectedOne[i].innerHTML = 'X'
        unselectedOne[i].classList.remove('canClick')
    })
}

let unselectedTwo = document.getElementsByClassName('notSelectedTwo');
for (let i = 0; i <= unselectedTwo.length - 1; i++) {
    unselectedTwo[i].addEventListener('click', () => {
        let cords = unselectedTwo[i].dataset.valuetwo;
        game.missedCoordinatesTwo.push(cords)
        unselectedTwo[i].classList.add('missed');
        unselectedTwo[i].innerHTML = 'X';
        playerTwoClick();
    })
}

/*ToDo*/
function resetGame() {

}



