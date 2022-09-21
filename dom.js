import { gameboardFactory} from "./ship.js";

let game = gameboardFactory();
let playerOne = game.playerOne;
let playerTwo = game.playerTwo;

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
    console.log(squares[i].dataset.value)
    squares[i].addEventListener('click', (e) => {
        //let coordinates = e.dataset.value
        console.log(this)
        //playerOne.receiveAttack()
    })
}





