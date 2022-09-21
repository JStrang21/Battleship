import { gameboardFactory} from "./ship.js";

let game = gameboardFactory();
let playerOne = game.playerOne;
let playerTwo = game.playerTwo;

const element = document.querySelector('[value="00"');
element.addEventListener('click', () => {
    
})

function matchSquaresToShips(player) {
    for (let i = 0; i <= 99; i++) {
        if (i <= 9) {
            i = Number(0 + "" + i);
        }
        const currentElement = document.querySelector(`[value="${i}"`);
        for (let ship in player) {
            let length = player[ship].shipLength.length;
            for (let j = 0; j <= length - 1; j++) {
                if (i === player[ship].actualLocation[j]) {
                    console.log(true)
                }
            }
        }
    }
}

window.addEventListener("load", () => {
    matchSquaresToShips(playerOne)
}) 





