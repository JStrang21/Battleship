import { gameboardFactory} from "./ship.js";

let game = gameboardFactory();
let playerOne = game.playerOne;
let playerTwo = game.playerTwo;
//console.log(game)
//console.log(playerOne)
//console.log(playerTwo)


function matchSquaresToShips(player) {
    let shipSquares = [];
    for (let i = 0; i <= 99; i++) {
        const currentElement = document.querySelector(`[data-value="${i}"`);
        for (let ship in player) {
            let length = player[ship].shipLength.length;
            for (let j = 0; j <= length - 1; j++) {
                if (i === player[ship].actualLocation[j]) {
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
    squaresPlayerOne[i].innerHTML = board[coordinates].name
    squaresPlayerOne[i].addEventListener('click', (e) => {
        game.receiveAttack(coordinates, board)
        squaresPlayerOne[i].setAttribute('class', 'hitSquare')
        let isGameOver = game.checkIfAllSunk(playerOne);
        if (isGameOver) {
            console.log('PlayerTwo Won the Game')
        }
    })
}

for (let i = 0; i <= squaresPlayerTwo.length - 1; i++) {
    squaresPlayerTwo[i].style.backgroundColor = "green";
    let coordinates = squaresPlayerTwo[i].dataset.valuetwo;
    let board = game.boardTwo
    let playerTwo = game.playerTwo
    squaresPlayerTwo[i].innerHTML = board[coordinates].name
    squaresPlayerTwo[i].addEventListener('click', (e) => { 
        squaresPlayerTwo[i].setAttribute('class', 'hitSquare')
        game.receiveAttack(coordinates, board)
        let isGameOver = game.checkIfAllSunk(playerTwo);
        if (isGameOver) {
            console.log('PlayerOne Won the Game')
        }
    })
}





