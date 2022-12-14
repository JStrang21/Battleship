import { getRandom } from '../ship.js';

function aiMove(x) {
    let squares = document.querySelectorAll(".p1square:not(.clicked)");
    let random = getRandom(0, squares.length);
    if (squares[random].classList.contains("clicked")) {
        squares = document.querySelectorAll(".p1square:not(.clicked)");
        aiMove();
    } else {
        squares[random].click();
        squares[random].classList.add("clicked");
    }
}

export default aiMove;