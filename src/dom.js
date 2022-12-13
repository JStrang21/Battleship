import {
  checkForOpenSpace,
  placement,
  checkBottom,
  gameboardFactory,
  getRandom,
} from "./ship.js";
//import switchDirection from "./util/checkAndPlace.js";
import checkEmpty from './util/checkEmpty.js';

//TODO
//Add option to randomly place ships
//Make smarter AI
//Need to document better--difficult to read after not working on it
//Clearly defined class names-not a number of similar names for similar functions
//Maybe can impelment functino which iterates over x vs y direction because I'm rewriting a lot of the same loops just slightly different

//TODO: don't allow ships to be placed over edges
//TODO: Dont allow ships to be placed over each other

//Factory which creates a game object which consists of the players, ships, and boards-imported from ship.js
const game = gameboardFactory();
const playerOne = game.playerOne;
const playerTwo = game.playerTwo;
/*TODO*/
function resetGame() {}

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
  submarine.style.display = "none";
  const destroyer = document.getElementById("destroyer");
  destroyer.addEventListener("dragstart", dragStartHandler);
  destroyer.style.display = "none";
  const battleship = document.getElementById("battleship");
  battleship.addEventListener("dragstart", dragStartHandler);
  battleship.style.display = "none";
  const carrier = document.getElementById("carrier");
  carrier.addEventListener("dragstart", dragStartHandler);
  carrier.style.display = "none";
  let bList = [patrolBoatElement, submarine, destroyer, battleship, carrier];
  
  function showBoat() {
    //Show boat[0] then pop first one off and call again after place button is pressed
    //TODO: Picking up and dropping doesnt work when set to grid-leaves boat at last spot as well as drags
    bList[0].style.display = "block";  
  }
  for (let ship in bList) {
    bList[ship].addEventListener("click", () => {
      switchDirection(bList[ship], game);
    });
  }

  const placeShipButton = document.querySelector(".placeShip");
  //Once a ship is placed and button pressed then next boat shows up
  placeShipButton.addEventListener("click", () => {
    //Remove first boat from array
    if (bList.length === 1) {
      showBoat();
    } else {
      bList.shift();
      showBoat();
    }
    for (let ship in bList) {
      bList[ship].addEventListener("click", () => {
        switchDirection(bList[ship]);
      });
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
      shipSquares[i].classList.add("shipPlaced");
    }
  });

  //Function to control dragging
  function dragStartHandler(e) {
    e.dataTransfer.setData("text/plain", e.target.id);
    e.dataTransfer.dropEffect = "move";
  }

  let unselectedOne = document.getElementsByClassName("notSelected");
  for (let i = 0; i <= unselectedOne.length - 1; i++) {
    unselectedOne[i].addEventListener("dragover", (e) => {
      //console.log(e)
      dragOverHandler(e);
    });
  }
  let dropAllowed;
  let currentShip;
  let previousSquareID;
  for (let i = 0; i <= unselectedOne.length - 1; i++) {
    unselectedOne[i].addEventListener("drop", (e) => {
      if (dropAllowed) {
        dropHandler(e);
      }
      else {
        let shipLength = currentShip.shipLength.length;
        if (currentShip.direction === 'x') {
          for (let i = 0; i < shipLength; i++) {
             const square = document.getElementById(previousSquareID + i);
             square.style.backgroundColor = 'lightblue';
          }
        }
        else if (currentShip.direction === 'y') {
          for (let i = 0, j = 0; i < shipLength; i++) {
             const square = document.getElementById(previousSquareID + j);
             square.style.backgroundColor = 'lightblue';
             j += 10;
          }
        }
        console.log(game.boardOne)
        let shipName = currentShip.stringName;
        let shipElement = document.getElementById(shipName);
        let shipContainer = document.querySelector('.shipContainer');
        shipContainer.prepend(shipElement);
      }
    });
  }
  let selectedSquare = document.getElementsByClassName("p1square");
  for (let i = 0; i <= selectedSquare.length - 1; i++) {
    selectedSquare[i].addEventListener("dragleave", (e) => {
      //console.log(e.selectedSquare)
      dragLeaveHandler(e, selectedSquare[i]);
      let boatName = bList[0].id;
      let boatLength;
      let shipDirection;
      for (let ship in playerOne) {
        if (playerOne[ship].stringName === boatName) {
          boatLength = playerOne[ship].shipLength.length;
          shipDirection = playerOne[ship].direction;
        }
      }
      if (shipDirection === 'x') {
        for (let j = 0; j < boatLength; j++) {
          selectedSquare[i + j].style.backgroundColor = 'lightBlue';
        }
      }
      else if (shipDirection === 'y') {
        for (let j = 0, l = 0; j < boatLength; j++) {
          selectedSquare[i + l].style.backgroundColor = 'lightBlue';
          l += 10;
        }
      }
    });
  }

  function dragLeaveHandler(e, unselected) {
    e.preventDefault();
    //TODO hover effect    
    const boatName = e.originalTarget.id;
    let lastLetter = boatName.slice(-1);
    if (boatName === "" || typeof lastLetter === "number") {
      return;
    }
    //Get boat from e
    let boatLength;
    let targetShip;
    for (let ship in playerOne) {
      if (playerOne[ship].stringName === boatName) {
        boatLength = playerOne[ship].shipLength.length;
        targetShip = playerOne[ship];
        //console.log(targetShip)
      }
    }
    //////
    let unselectedID = parseInt(unselected.id);
    let targetID = unselectedID - 1;
    
    if (targetShip) {
      game.boardOne[targetID] = 0;
      if (targetShip.direction === "x") {
        //game.boardOne[unselectedID - 1] = 0;
        for (let i = 0; i < boatLength; i++) {
          let square = document.getElementById(`${unselectedID + i}`);
          square.classList.remove("selectedSquareOne");
          square.classList.add("notSelected");
          //square.style.backgroundColor = "lightblue";
          let boardOne = game.boardOne;
          boardOne[targetID + i] = 0;
        }
      }
      if (targetShip.direction === "y") {
        //game.boardOne[unselectedID + 10] = 0;
        let j = 0;
        for (let i = 0; i < boatLength; i++) {
          let square = document.getElementById(`${unselectedID + j}`);
          square.classList.remove("selectedSquareOne");
          square.classList.add("notSelected");
         //square.style.backgroundColor = "lightblue";
          let boardOne = game.boardOne;
          boardOne[targetID + j] = 0;
          j += 10;
        }
      }
      /*console.log(playerOne);
            console.log(game.boardOne)*/
    }
  }

  //Fn for elements which are dragged over
  function dragOverHandler(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    const data = e.dataTransfer.getData("text/plain");
    //TODO: add hover effect
    //e.target.style.backgroundColor = "green";
    //const ship = document.getElementById(data);
    const targetLocation = e.originalTarget.id;
    if (targetLocation.length > 3) {
      return;
    }
    const shipName = data;
    let ship;
    for (let i in playerOne) {
        if (playerOne[i].stringName === shipName) {
            ship = playerOne[i];
        }
    }
    currentShip = ship;
    //Check if squares in direction of ship are empty and if empty then show green else red
    const isEmpty = checkEmpty(ship, game, targetLocation);

    let target = parseInt(targetLocation)
    previousSquareID = target;

    const shipLength = ship.shipLength.length;
    const placeButton = document.querySelector(".placeShip");
    if (isEmpty === true) {
      dropAllowed = true;
      placeButton.style.display = 'block';
      if (ship.direction === 'x') {
        for (let i = 0; i < shipLength; i++) {
          let targetId = target + i;
          const element = document.getElementById(targetId);
          element.style.backgroundColor = 'lightgreen';
        }
      }
      else if (ship.direction === 'y') {
        for (let i = 0, j = 0; i < shipLength; i++) {
          let targetId = target + j;
          j += 10;
          const element = document.getElementById(targetId);
          element.style.backgroundColor = 'lightgreen';
        }
      }
    }
    //If square is filled/not placeable then red highlighting
    if (isEmpty === false) {
      dropAllowed = false;
      placeButton.style.display = 'none';
      if (ship.direction === 'x') {
        for (let i = 0; i < shipLength; i++) {
          let targetId = target + i;
          const element = document.getElementById(targetId);
          element.style.backgroundColor = 'red';
        }
      }
      else if (ship.direction === 'y') {
        for (let i = 0, j = 0; i < shipLength; i++) {
          let targetId = target + j;
          j += 10;
          const element = document.getElementById(targetId);
          element.style.backgroundColor = 'red';
        }
      }
    }
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
    //console.log(game.boardOne)
    const targetID = parseInt(e.originalTarget.id);
    if (ship.direction === "x") {
      let otherID = targetID - 1;
      for (let i = 0; i < length; i++) {
        ship.actualLocation[i] = otherID + i;
        let boardElement = document.getElementById(`${targetID + i}`);
        boardElement.classList.add("selectedSquareOne");
        boardElement.classList.remove("notSelected");
        let boardOne = game.boardOne;
        //boardOne[otherID] = ship;
        boardOne[otherID + i] = ship;
      }
    }
    if (ship.direction === "y") {
      let j = 0;
      let otherID = targetID - 1;
      for (let i = 0; i < length; i++) {
        ship.actualLocation[i] = otherID + j;
        let boardElement = document.getElementById(`${targetID + j}`);
        boardElement.classList.add("selectedSquareOne");
        boardElement.classList.remove("notSelected");
        let boardOne = game.boardOne;
        //boardOne[otherID] = ship;
        boardOne[otherID + j] = ship;
        j += 10;
      }
    }
  }
});

//TODO: Bug-When ship is moved while in y-direction it doesnt clear the old position
function switchDirection(s) {
  if (!s) {
    return;
  }
  const location = parseInt(s.parentNode.id);
  const shipName = s.id;
  for (let i in playerOne) {
    if (playerOne[i].stringName === shipName) {
      const ship = playerOne[i];
      const currentDirection = ship.direction;
      document.querySelector(".placeShip").style.display = 'block';
      if (currentDirection === "x") {
        if (checkY(ship, location)) {
          //rotate to y
          rotateY(ship, location, s);
          ship.direction = "y";
          //console.log(ship);
          //console.log(game.boardOne);
        }
      }
      if (currentDirection === "y") {
        if (checkX(ship, location, s)) {
          //rotate to x
          rotateX(ship, location, s);
          ship.direction = "x";
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
      document.querySelector(".placeShip").style.display = 'none';
      return false;
    }
    increment += 10;
  }
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
    square.style.backgroundColor = 'lightblue'
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
      document.querySelector(".placeShip").style.display = 'none';
      return false;
    }
    increment += 1;
  }
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
    square.style.backgroundColor = 'lightblue'
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
  resetGame();
  //clicker();
}, 20000);

//AI ranomly clicks a square
//TODO implement "smart" AI
let allSquares = document.querySelectorAll(".p1square:not(.clicked)");
function playerTwoClick() {
  setTimeout(() => {
    let random = getRandom(0, allSquares.length);
    if (allSquares[random].classList.contains("clicked")) {
      allSquares = document.querySelectorAll(".p1square:not(.clicked)");
      playerTwoClick();
      console.log("hello");
    } else {
      allSquares[random].click();
      allSquares[random].classList.add("clicked");
    }
  }, 750)
}
//Simulate players clicking with async/await function to test gameplay
//Credit: https://stackoverflow.com/questions/3583724/how-do-i-add-a-delay-in-a-javascript-loop
let availableSquares = document.getElementsByClassName("p2square");
const timer = (ms) => new Promise((res) => setTimeout(res, ms));
async function clicker() {
  for (let square in availableSquares) {
    availableSquares[square].click();
    //playerTwoClick();
    await timer(500);
  }
}

let counter = 0;
function clickSquares() {
  let clickSquaresTwo = document.getElementsByClassName("p2square");
  clickSquaresTwo[counter].click();
  playerTwoClick();
  counter++;
  return counter;
}

function playerTwoClickAdjacent(coordinates) {}

//Matches ships to designated squares and returns array of where ships are located
const startButton = document.querySelector(".startButton");
let unselectedOne = [];
let playerShipSquares = [];
startButton.addEventListener("click", () => {
  let playerSquares = document.querySelectorAll(".p1square");
  playerSquares.forEach((square) => {
    square.classList.add("p1ReadySquares");
  });
  //Empty squares(DONT have ships on them)
  playerShipSquares = document.querySelectorAll(
    ".p1ReadySquares.selectedSquareOne"
  );
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
        console.log("PlayerTwo Won the Game");
        resetGame();
      }
    });
  });

  unselectedOne = document.querySelectorAll(".notSelected.p1ReadySquares");
  unselectedOne.forEach((square) => {
    square.addEventListener("click", () => {
      if (square.classList.contains("wasClicked")) {
        return;
      }
      let cords = square.dataset.value;
      game.missedCoordinatesOne.push(cords);
      square.classList.add("wasClicked");
      square.classList.add("missed");
      square.classList.remove("p1ReadySquares");
      square.innerHTML = "X";
    });
  });
  return unselectedOne;
});

let squaresPlayerTwo = matchSquaresToShips2(playerTwo);
function matchSquaresToShips2(player) {
  let shipSquares = [];
  for (let i = 0; i <= 99; i++) {
    const currentElement = document.querySelector(`[data-valueTwo="${i}"`);
    for (let ship in player) {
      let length = player[ship].shipLength.length;
      for (let j = 0; j <= length - 1; j++) {
        if (i === player[ship].actualLocation[j]) {
          currentElement.classList.add("selectedSquare");
          currentElement.classList.remove("notSelectedTwo");
          shipSquares.push(currentElement);
        }
      }
    }
  }
  return shipSquares;
}

//Loop to listen for clicks of ships and then to update ship/square to reflect the hit
for (let i = 0; i <= squaresPlayerTwo.length - 1; i++) {
  //squaresPlayerTwo[i].style.backgroundColor = "green";
  let coordinates = squaresPlayerTwo[i].dataset.valuetwo;
  let board = game.boardTwo;
  let playerTwo = game.playerTwo;
  //squaresPlayerTwo[i].innerHTML = board[coordinates].name
  squaresPlayerTwo[i].addEventListener("click", (e) => {
    if (squaresPlayerTwo[i].classList.contains("wasClicked")) {
      return;
    }
    squaresPlayerTwo[i].innerHTML = "X";
    squaresPlayerTwo[i].classList.add("hitSquare");
    squaresPlayerTwo[i].classList.add("wasClicked");
    game.receiveAttack(coordinates, board);
    let isGameOver = game.checkIfAllSunk(playerTwo);
    if (isGameOver) {
      console.log("PlayerOne Won the Game");
      resetGame();
    }
    playerTwoClick();
    //Remove square from array so it can't be clicked again
    //squaresPlayerTwo.splice(i, 1);
  });
}

//Loop which listens for a click to a square which isn't occupied by a ship and marks square as clicked
let unselectedTwo = document.getElementsByClassName("notSelectedTwo");
for (let i = 0; i <= unselectedTwo.length - 1; i++) {
  unselectedTwo[i].addEventListener("click", () => {
    if (unselectedTwo[i].classList.contains("wasClicked")) {
      return;
    }
    let cords = unselectedTwo[i].dataset.valuetwo;
    game.missedCoordinatesTwo.push(cords);
    unselectedTwo[i].classList.add("missed");
    unselectedTwo[i].innerHTML = "X";
    playerTwoClick();
    unselectedTwo[i].classList.add("wasClicked");
  });
}



//Converts array integer to board coordinate ex: 0 = A1/8 = I1
//Then display those in box at above player two
function convertArrayCordToBoardCord(missedCoordinates) {}
