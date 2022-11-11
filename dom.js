import { checkForOpenSpace, placement, checkBottom, gameboardFactory, getRandom } from "./ship.js";

//TODO
//Need to document better--difficult to read after not working on it
//Need to refactor when complete-reduce redundancy/clean up/document

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
    const patrolBoatElement = document.getElementById("patrolBoat");
    patrolBoatElement.addEventListener("dragstart", dragStartHandler);
    const submarine = document.getElementById("submarine");
    submarine.addEventListener("dragstart", dragStartHandler);
    const destroyer = document.getElementById("destroyer");
    destroyer.addEventListener("dragstart", dragStartHandler);
    const battleship = document.getElementById("battleship");
    battleship.addEventListener("dragstart", dragStartHandler);
    const carrier = document.getElementById("carrier");
    carrier.addEventListener("dragstart", dragStartHandler);
    let bList = [patrolBoatElement, submarine, destroyer, battleship, carrier];

    for (let ship in bList) {
        bList[ship].addEventListener("click", () => {
            switchDirection(bList[ship]);
        })
    }

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
            dragLeaveHandler(e, unselected[i]);
        })
    }

    function dragLeaveHandler(e, unselected) {
        e.preventDefault();
        const boatName = e.originalTarget.parentElement.id;
        let boatLength;
        for (let ship in playerOne) {
            if (playerOne[ship].stringName === boatName) {
                boatLength = playerOne[ship].shipLength.length;
                console.log(playerOne[ship])
            }
        }
        let unselectedID = parseInt(unselected.id);
        console.log(unselectedID);
        console.log(game.boardOne);
        const lastSquare = document.getElementById(`${unselectedID}`);
        lastSquare.classList.remove('selectedSquare');
        lastSquare.classList.add('notSelectedTwo');
        game.boardOne[unselectedID - 1] = 0;
        for (let i = 0; i < boatLength; i++) {
            let square = document.getElementById(`${unselectedID + i}`)
            square.classList.remove('selectedSquare');
            square.classList.add('notSelectedTwo');
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

        /*let length;
        for (let ship in playerOne) {
            if (playerOne[ship].stringName === data) {
                length = playerOne[ship].shipLength.length;
            }
        }
        let shipIDs = [];
        let targetNodes = [];
        for (let i = 1, j = 0; i <= length; i++) {
            let id = data + i;
            shipIDs.push(id);
            targetNodes.push(parseInt(e.target.id) + j);
            j++;
        }
        for (let i in targetNodes) {
            const square = document.getElementById(`${targetNodes[i]}`);
            const shipsquare = document.getElementById(`${shipIDs[i]}`);
            square.appendChild(shipsquare);
            console.log(game.boardOne);
            console.log(playerOne);
        }*/        

        if (data === "patrolBoat") {
            const targetID = parseInt(e.originalTarget.id);
            playerOne[0].actualLocation[0] = targetID;
            playerOne[0].actualLocation[1] = targetID + 1;
            let boardElement1 = document.getElementById(`${targetID}`);
            boardElement1.classList.add('selectedSquare');
            boardElement1.classList.remove('notSelectedTwo');
            let boardElement2 = document.getElementById(`${targetID + 1}`);
            boardElement2.classList.add('selectedSquare');
            boardElement2.classList.remove('notSelectedTwo');
            
            let boardOne = game.boardOne;
            boardOne[targetID] = playerOne[0];
            boardOne[targetID + 1] = playerOne[0];
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
        square.classList.remove("selectedSquare");
        square.classList.add("notSelectedTwo");
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
        square.classList.add("selectedSquare");
        square.classList.remove("notSelectedTwo");
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
        square.classList.remove("selectedSquare");
        square.classList.add("notSelectedTwo");
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
        square.classList.add("selectedSquare");
        square.classList.remove("notSelectedTwo");
        s.actualLocation[i] = calcLocation + increment;
        game.boardOne[calcLocation + increment] = s;
        increment += 1;
    }
}


const startButton = document.querySelector(".startButton");
startButton.addEventListener("click", () => {

})

setTimeout(() => {
    //console.log('hello')
    resetGame()
}, 2000)

let unselected = document.getElementsByClassName('canClick');
for (let i = 0; i <= unselected.length - 1; i++) {
    unselected[i].addEventListener('click', () => {
        
    })
}

//AI ranomly clicks a square
//TODO implement "smart" AI
function playerTwoClick() {
    let random = getRandom(0, unselected.length);
    unselected[random].click()
}

function playerTwoClickAdjacent(coordinates) {
    
}

//Matches ships to designated squares and returns array of where ships are located
//let squaresPlayerOne = matchSquaresToShips(playerOne)
let squaresPlayerTwo = matchSquaresToShips2(playerTwo);

/*function matchSquaresToShips(player) {
    let shipSquares = [];
    for (let i = 0; i <= 99; i++) {
        const currentElement = document.querySelector(`[data-value="${i}"`);
        for (let ship in player) {
            let length = player[ship].shipLength.length;
            for (let j = 0; j <= length - 1; j++) {
                if (i === player[ship].actualLocation[j]) {
                    currentElement.classList.add('selectedSquare')
                    currentElement.classList.remove('notSelected')
                    shipSquares.push(currentElement)
                }
            }
        }
    }
    return shipSquares
}*/
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
/*for (let i = 0; i <= squaresPlayerOne.length - 1; i++) {
    squaresPlayerOne[i].style.backgroundColor = "green";
    let coordinates = squaresPlayerOne[i].dataset.value;
    let board = game.boardOne
    let playerOne = game.playerOne
    //squaresPlayerOne[i].innerHTML = board[coordinates].name
    squaresPlayerOne[i].addEventListener('click', (e) => {
        //Drop testing

        squaresPlayerOne[i].innerHTML = 'X';
        game.receiveAttack(coordinates, board);
        squaresPlayerOne[i].classList.add('hitSquare');
        squaresPlayerOne[i].classList.remove('canClick')
        let isGameOver = game.checkIfAllSunk(playerOne);
        if (isGameOver) {
            console.log('PlayerTwo Won the Game')
            resetGame();
        }
    })
}*/
for (let i = 0; i <= squaresPlayerTwo.length - 1; i++) {
    //squaresPlayerTwo[i].style.backgroundColor = "green";
    let coordinates = squaresPlayerTwo[i].dataset.valuetwo;
    let board = game.boardTwo
    let playerTwo = game.playerTwo
    //squaresPlayerTwo[i].innerHTML = board[coordinates].name
    squaresPlayerTwo[i].addEventListener('click', (e) => { 
        squaresPlayerTwo[i].innerHTML = 'X'
        squaresPlayerTwo[i].classList.add('hitSquare');
        squaresPlayerTwo[i].classList.add('wasClicked');
        game.receiveAttack(coordinates, board);
        let isGameOver = game.checkIfAllSunk(playerTwo);
        if (isGameOver) {
            console.log('PlayerOne Won the Game')
            resetGame();
        }
    })
}

//Loop which listens for a click to a square which isn't occupied by a ship and marks square as clicked
/*let unselectedOne = document.getElementsByClassName('notSelected');
for (let i = 0; i <= unselectedOne.length - 1; i++) {
    unselectedOne[i].addEventListener('click', () => {
        let cords = unselectedOne[i].dataset.value;
        game.missedCoordinatesOne.push(cords)
        unselectedOne[i].classList.add('missed');
        unselectedOne[i].innerHTML = 'X'
        unselectedOne[i].classList.remove('canClick')
        console.log(game.missedCoordinatesOne);
    })
}*/
let unselectedTwo = document.getElementsByClassName('notSelectedTwo');
for (let i = 0; i <= unselectedTwo.length - 1; i++) {
    unselectedTwo[i].addEventListener('click', () => {
        let cords = unselectedTwo[i].dataset.valuetwo;
        game.missedCoordinatesTwo.push(cords)
        unselectedTwo[i].classList.add('missed');
        unselectedTwo[i].innerHTML = 'X';
        if (unselectedTwo[i].classList.contains('wasClicked')) {
            return
        }
        playerTwoClick();
        unselectedTwo[i].classList.add('wasClicked');
    })
}

//Converts array integer to board coordinate ex: 0 = A1/8 = I1
//Then display those in box at above player two
function convertArrayCordToBoardCord(missedCoordinates) {

}


