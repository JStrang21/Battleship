import { gameboardFactory} from "./ship.js";

let game = gameboardFactory();
let playerOne = game.playerOne;
let playerTwo = game.playerTwo;
console.log(game)
console.log(playerOne)

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

let squares = matchSquaresToShips(playerOne)

for (let i = 0; i <= squares.length - 1; i++) {
    squares[i].style.backgroundColor = "green";
    let coordinates = squares[i].dataset.value;
    let board = game.boardOne
    let playerOne = game.playerOne
    squares[i].innerHTML = board[coordinates].name
    squares[i].addEventListener('click', (e) => {
        
        game.receiveAttack(coordinates, board)
        let isGameOver = game.checkIfAllSunk(playerOne);
        if (isGameOver) {
            console.log('Player Won the Game')
        }
    })
}





