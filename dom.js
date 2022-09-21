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
            i = 0 + "" + i;
        }
        const currentElement = document.querySelector(`[value="${i}"`);
        console.log(currentElement)
    }
}

window.addEventListener("load", () => {
    matchSquaresToShips(playerOne)
}) 





