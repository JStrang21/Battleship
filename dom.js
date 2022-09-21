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
        /*if (i <= 9) {
            i = "0" + i;
        }*/
        const currentElement = document.querySelector(`[value="${i}"`);
        for (let ship in player) {
            let length = player[ship].shipLength.length;
            for (let j = 0; j <= length - 1; j++) {
                /*if (typeof i === "string") {
                    let stringValue = player[ship].actualLocation[j].toString()
                    console.log(stringValue, i)
                    if (i === stringValue) {
                        
                        console.log(player[ship].actualLocation[j])
                    }
                }*/
                if (i === player[ship].actualLocation[j]) {
                    shipSquares.push(currentElement)
                }
            }
        }
    }
    return shipSquares
}

let squares = matchSquaresToShips(playerOne)

console.log(squares)





