import { getRandom} from '../ship.js';
import { game } from '../dom.js';

let hits = {
    previousHit: null,
    1: [0, 2],
    2: [0, 3],
    3: [0, 3],
    4: [0, 4],
    5: [0, 5],
}

function aiMove() {
    let squares = document.querySelectorAll(".p1square:not(.clicked)");
    let random = getRandom(0, squares.length);
    if (squares[random].classList.contains("clicked")) {
        squares = document.querySelectorAll(".p1square:not(.clicked)");
        aiMove();
    } else {
        squares[random].click();
        squares[random].classList.add("clicked");
        if (squares[random].classList.contains("hitSquare")) {
            let hitSquareID = squares[random].id;
            //Board array starts at 0 and dom board element id's start at 1
            let gameBoardEquivalent = hitSquareID - 1;
            //Get ship object of hit square
            let shipHit = game.boardOne[gameBoardEquivalent];
            //Get ship number and mark it as hit in hits object to 'remember' previous hit
            let shipNumber = shipHit.name;
            hits[previous] = shipNumber;
            
            hits[shipNumber][0] += 1;
            /*console.log(game.boardOne[gameBoardEquivalent])
            console.log(squares[random].id)*/
            //console.log(squares[random]) = <div id="29" class="p1square selectedSquareO…uare wasClicked clicked" data-value="28" style="background-color: lightgreen;">
        }
    }
}

export default aiMove;