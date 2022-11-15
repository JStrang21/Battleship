import { checkForOpenSpace, placement, checkBottom, gameboardFactory, getRandom } from "./ship.js";

//TODO
//Need to document better--difficult to read after not working on it
//Need to refactor when complete-reduce redundancy/clean up/document
//Clearly defined class names-not a number of similar names for similar functions
const game = gameboardFactory();
const playerOne = game.playerOne;
const playerTwo = game.playerTwo;
/*TODO*/
function resetGame() {
    
}

//Maybe rather than drag and drop-implement mini pop up board and go through list of boats and user and can hover over board and place on highlighted area
//https://michalosman.github.io/battleship/
function miniBoard() {
    let p1 = game.playerOne;

}
//Choose one boat at a time and use arrow to point in which direction you want it to face
//Then when placing boat use :hover for board squares to highlight which element it will be placed on

//Ships elements to be dragged and dropped
window.addEventListener("DOMContentLoaded", () => {
    //Ship elements to be placed in heading area
    //Show ships one at a time and dont show next ship until user presses place ship button
    const patrolBoatElement = document.getElementById("patrolBoat");
    patrolBoatElement.addEventListener("dragstart", dragStartHandler);
    const submarine = document.getElementById("submarine");
    submarine.addEventListener("dragstart", dragStartHandler);
    submarine.style.display = 'none';
    const destroyer = document.getElementById("destroyer");
    destroyer.addEventListener("dragstart", dragStartHandler);
    destroyer.style.display = 'none';
    const battleship = document.getElementById("battleship");
    battleship.addEventListener("dragstart", dragStartHandler);
    battleship.style.display = 'none';
    const carrier = document.getElementById("carrier");
    carrier.addEventListener("dragstart", dragStartHandler);
    carrier.style.display = 'none';
    let bList = [patrolBoatElement, submarine, destroyer, battleship, carrier];
    
    function showBoat() {
        //Show boat[0] then pop first one off and call again after place button is pressed
        bList[0].style.display = 'block';
    }
    for (let ship in bList) {
        bList[ship].addEventListener("click", () => {
            switchDirection(bList[ship]);
        })
    }
    
    const placeShipButton = document.querySelector(".placeShip");
    //Once a ship is placed and button pressed then next boat shows up
    placeShipButton.addEventListener("click", () => {
        //Remove first boat from array
        if (bList.length === 1) {
            showBoat();
        }
        else {
            bList.shift();
            showBoat();
        }
        for (let ship in bList) {
            bList[ship].addEventListener("click", () => {
                switchDirection(bList[ship]);
            })
        }
        //Add class to make location look different-ship has been placed here
        //Remove boat and make the location unplaceable
        const shipSquares = document.getElementsByClassName("selectedSquareOne");
        for (let i in shipSquares) {
            if (shipSquares[i].children === undefined) {
                continue;
            }
            if (shipSquares[i].children.length === 1) {
                //Remove child from square/remove ship which was just dragged
                let child = shipSquares[i].children[0];
                child.draggable = "false";
                let garbage = shipSquares[i].removeChild(child);
            }
            //shipSquares[i].classList.remove("selectedSquareOne");
            shipSquares[i].classList.add("shipPlaced");
            //shipSquares[i].removeAttribute("*ondragover");
            //shipSquares[i].removeAttribute("*ondrop");
        }
    })

    //Function to control dragging
    function dragStartHandler(e) {
        e.dataTransfer.setData("text/plain", e.target.id)
        e.dataTransfer.dropEffect = "move";
    }

    let unselectedOne = document.getElementsByClassName('notSelected');
    for (let i = 0; i <= unselectedOne.length - 1; i++) {
        unselectedOne[i].addEventListener('dragover', (e) => {
            dragOverHandler(e);
        })
    }
    for (let i = 0; i <= unselectedOne.length - 1; i++) {
        unselectedOne[i].addEventListener('drop', (e) => {
            dropHandler(e);
        })
    }
    for (let i = 0; i <= unselectedOne.length - 1; i++) {
        unselectedOne[i].addEventListener('dragleave', (e) => {
            //dragLeaveHandler(e, unselected[i]);
        })
    }

    function dragLeaveHandler(e, unselected) {
        e.preventDefault();
        const boatName = e.originalTarget.parentElement.id;
        let boatLength;
        for (let ship in playerOne) {
            if (playerOne[ship].stringName === boatName) {
                boatLength = playerOne[ship].shipLength.length;
            }
        }
        let unselectedID = parseInt(unselected.id);
        const lastSquare = document.getElementById(`${unselectedID}`);
        lastSquare.classList.remove('selectedSquareOne');
        lastSquare.classList.add('notSelected');
        game.boardOne[unselectedID - 1] = 0;
        for (let i = 0; i < boatLength; i++) {
            let square = document.getElementById(`${unselectedID + i}`)
            square.classList.remove('selectedSquareOne');
            square.classList.add('notSelected');
            let boardOne = game.boardOne;
            boardOne[unselectedID + i] = 0;
        }
    }

    //Fn for elements which are dragged over
    function dragOverHandler(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect="move";
    }

    //Fn for dropping ship onto board squares
    function dropHandler(e) {
        e.preventDefault();
        const data = e.dataTransfer.getData("text/plain");
        e.target.appendChild(document.getElementById(data));
        
        let length;
        let ship;
        for (let i in playerOne) {
            if (playerOne[i].stringName === data) {
                length = playerOne[i].shipLength.length;
                ship = playerOne[i];
            }
        }
       
        const targetID = parseInt(e.originalTarget.id);
        for (let i = 0; i < length; i++) {
            let otherID = targetID - 1;
            ship.actualLocation[i] = otherID + i;
            let boardElement = document.getElementById(`${targetID + i}`);
            boardElement.classList.add('selectedSquareOne');
            boardElement.classList.remove('notSelected');
            let boardOne = game.boardOne;
            //boardOne[otherID] = ship;
            boardOne[otherID + i] = ship;
        }
    }
})

function switchDirection(s) {
    const location = parseInt(s.parentNode.id);
    const shipName = s.id;
    for (let i in playerOne) {
        if (playerOne[i].stringName === shipName) {
            const ship = playerOne[i];
            const currentDirection = ship.direction;
            if (currentDirection === 'x') {
                if (checkY(ship, location)) {
                    //rotate to y
                    rotateY(ship, location, s);
                    //console.log(ship);
                    //console.log(game.boardOne);
                    
                }
            }
            if (currentDirection === 'y') {
                if (checkX(ship, location, s)) {
                    //rotate to x
                    rotateX(ship, location, s);

                }
            }
        }
    }
}
function checkY(s, location) {
    let board = game.boardOne;
    let increment = 10;
    //Might have to start i=10 bc first ship square remains stationary
    for (let i = 0; i < s.shipLength.length; i++) {
        if (board[location + increment] !== 0) {
            return false;
        }
        increment += 10;
    }
    s.direction = "y";
    return true;
}
function rotateY(s, location, square) {
    clearXDirection(s, location, square);
    setYDirection(s, location, square);
}
function clearXDirection(s, location) {
    const length = s.shipLength.length;
    let calcLocation = location - 1;
    for (let i = 0; i < length; i++) {
        let square = document.getElementById(`${location + i}`);
        square.classList.remove("selectedSquareOne");
        square.classList.add("notSelected");
        s.actualLocation[i] = 0;
        game.boardOne[location + i] = 0;
    }
}
function setYDirection(s, location) {
    const length = s.shipLength.length;
    let calcLocation = location - 1;
    let increment = 0;
    for (let i = 0; i < length; i++) {
        let square = document.getElementById(`${location + increment}`);
        square.classList.add("selectedSquareOne");
        square.classList.remove("notSelected");
        s.actualLocation[i] = calcLocation + increment;
        game.boardOne[calcLocation + increment] = s;
        increment += 10;
    }
}

function checkX(s, location) {
    let board = game.boardOne;
    let increment = 1;
    for (let i = 0; i < s.shipLength.length; i++) {
        if (board[location + increment] !== 0) {
            return false;
        }
        increment += 1;
    }
    s.direction = "x";
    return true;
}
function rotateX(s, location, square) {
    clearYDirection(s, location, square);
    setXDirection(s, location, square);
}
function clearYDirection(s, location) {
    let calcLocation = location - 1;
    const length = s.shipLength.length;
    let increment = 0;
    for (let i = 0; i < length; i++) {
        let square = document.getElementById(`${location + increment}`);
        square.classList.remove("selectedSquareOne");
        square.classList.add("notSelected");
        s.actualLocation[i] = 0;
        game.boardOne[calcLocation + increment] = 0;
        increment += 10;
    }
}
function setXDirection(s, location) {
    const length = s.shipLength.length;
    let calcLocation = location - 1;
    let increment = 0;
    for (let i = 0; i < length; i++) {
        let square = document.getElementById(`${location + increment}`);
        square.classList.add("selectedSquareOne");
        square.classList.remove("notSelected");
        s.actualLocation[i] = calcLocation + increment;
        game.boardOne[calcLocation + increment] = s;
        increment += 1;
    }
}

setTimeout(() => {
    //console.log('hello')
    resetGame()
    //clickSquares();
}, 3000)

//AI ranomly clicks a square
//TODO implement "smart" AI
let allSquares = document.querySelectorAll(".p1square");
function playerTwoClick() {
    let random = getRandom(0, allSquares.length);
    allSquares[random].click()
}

function playerTwoClickAdjacent(coordinates) {
    
}

//Matches ships to designated squares and returns array of where ships are located
const startButton = document.querySelector(".startButton");
let unselectedOne = [];
let playerShipSquares = [];
startButton.addEventListener("click", () => {
    let playerSquares = document.querySelectorAll(".p1square");
    playerSquares.forEach((square) => {
        square.classList.add("p1ReadySquares")
    })
    //Empty squares(DONT have ships on them)
    playerShipSquares = document.querySelectorAll(".p1ReadySquares.selectedSquareOne");
    playerShipSquares.forEach((square) => {
        square.addEventListener("click", () => {
            if (square.classList.contains("wasClicked")) {
                return;
            }
            let cords = square.dataset.value;
            square.innerHTML = "X";
            square.classList.add("hitSquare");
            square.classList.add("wasClicked");
            square.classList.remove("p1ReadySquares");
            game.receiveAttack(cords, game.boardOne);
            let isGameOver = game.checkIfAllSunk(playerOne);
            if (isGameOver) {
                console.log('PlayerTwo Won the Game')
                resetGame();
            }
        })
    })

    unselectedOne = document.querySelectorAll(".notSelected.p1ReadySquares");
    unselectedOne.forEach((square) => {
        square.addEventListener("click", () => {
            if (square.classList.contains("wasClicked")) {
                return
            }
            let cords = square.dataset.value;
            game.missedCoordinatesOne.push(cords);
            square.classList.add("wasClicked");
            square.classList.add("missed");
            square.classList.remove("p1ReadySquares");
            square.innerHTML = "X";
        })
    })
    return unselectedOne;
}) 

let squaresPlayerTwo = matchSquaresToShips2(playerTwo);
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

//Loop to listen for clicks of ships and then to update ship/square to reflect the hit
for (let i = 0; i <= squaresPlayerTwo.length - 1; i++) {
    //squaresPlayerTwo[i].style.backgroundColor = "green";
    let coordinates = squaresPlayerTwo[i].dataset.valuetwo;
    let board = game.boardTwo
    let playerTwo = game.playerTwo
    //squaresPlayerTwo[i].innerHTML = board[coordinates].name
    squaresPlayerTwo[i].addEventListener('click', (e) => {
        if (squaresPlayerTwo[i].classList.contains("wasClicked")) {
            return;
        }
        squaresPlayerTwo[i].innerHTML = 'X'
        squaresPlayerTwo[i].classList.add('hitSquare');
        squaresPlayerTwo[i].classList.add('wasClicked');
        game.receiveAttack(coordinates, board);
        let isGameOver = game.checkIfAllSunk(playerTwo);
        if (isGameOver) {
            console.log('PlayerOne Won the Game')
            resetGame();
        }
        playerTwoClick();
        //Remove square from array so it can't be clicked again
        //squaresPlayerTwo.splice(i, 1);
    })

}

function clickSquares() {
    const squares = document.getElementsByClassName("p2square")
    for (let i in squares) {
        squares[i].click();
        playerTwoClick();
    }
}

//Loop which listens for a click to a square which isn't occupied by a ship and marks square as clicked
let unselectedTwo = document.getElementsByClassName('notSelectedTwo');
for (let i = 0; i <= unselectedTwo.length - 1; i++) {
    unselectedTwo[i].addEventListener('click', () => {
        if (unselectedTwo[i].classList.contains("wasClicked")) {
            return;
        }
        let cords = unselectedTwo[i].dataset.valuetwo;
        game.missedCoordinatesTwo.push(cords)
        unselectedTwo[i].classList.add('missed');
        unselectedTwo[i].innerHTML = 'X';
        playerTwoClick();
        unselectedTwo[i].classList.add('wasClicked');
    })
}

//Converts array integer to board coordinate ex: 0 = A1/8 = I1
//Then display those in box at above player two
function convertArrayCordToBoardCord(missedCoordinates) {

}


