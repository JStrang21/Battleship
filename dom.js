import { gameboardFactory, getRandom } from "./ship.js";

//Need to document better-hard coming back to work on after a few weeks

const game = gameboardFactory();
const playerOne = game.playerOne;
const playerTwo = game.playerTwo;
console.log(playerTwo[0].actualLocation[0]);
console.log(playerOne);

/*ToDo*/
function resetGame() {
    
}

//Maybe rather than drag and drop-implement mini pop up board and go through list of boats and user and can hover over board and place on highlighted area
//https://michalosman.github.io/battleship/
function miniBoard() {
    let p1 = game.playerOne;

}

//Ships elements to be dragged and dropped
window.addEventListener("DOMContentLoaded", () => {
    //Creates boats for playerOne to place
    //let boats = createBoats();
    const patrolBoatElement = document.getElementById("patrolBoat");
    patrolBoatElement.addEventListener("dragstart", dragStartHandler)

    //Function to control dragging
    function dragStartHandler(e) {
        e.dataTransfer.setData("text/plain", e.target.id)
        e.dataTransfer.dropEffect = "move";
        //console.log(e)
    }

    let unselectedOne = document.getElementsByClassName('notSelected');
    for (let i = 0; i <= unselectedOne.length - 1; i++) {
        unselectedOne[i].addEventListener('dragover', (e) => {
            dragOverHandler(e);
            dropHandler(e);
        })
    }
    for (let i = 0; i <= unselectedOne.length - 1; i++) {
        unselectedOne[i].addEventListener('drop', (e) => {
            //dropHandler(e);
        })
    }

    //Fn for elements which are dragged over
    function dragOverHandler(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect="move";
        //console.log(e)
    }

    //Fn for dropping ship onto board squares
    function dropHandler(e) {
        e.preventDefault();
        const data = e.dataTransfer.getData("text/plain");
        e.target.appendChild(document.getElementById(data));
        if (data === "patrolBoat") {
            /*console.log(e);
            console.log(e.dataTransfer);
            console.log(e.originalTarget.id);*/
            playerOne[0].actualLocation[0] = parseInt(e.originalTarget.id);
            playerOne[0].actualLocation[1] = parseInt(e.originalTarget.id) + 1;
            console.log(playerOne);
        }
    }
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


