import { gameboardFactory} from "./ship.js";

let game = gameboardFactory();
let playerOne = game.playerOne;
let playerTwo = game.playerTwo;

window.hitOrMiss = hitOrMiss;

function hitOrMiss(event) {
    console.log(event.path[0])
}

function matchSquaresToShips(player) {
    let shipSquares = [];
    for (let i = 0; i <= 99; i++) {
        const currentElement = document.querySelector(`[value="${i}"`);
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
    console.log(squares[i])
    squares[i].addEventListener('click', () => {
        
    })
}





