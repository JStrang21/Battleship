//TODO: Bug-When ship is moved while in y-direction it doesnt clear the old position

function switchDirection(s, game) {
    let playerOne = game.playerOne;
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
          if (checkY(ship, location, game)) {
            //rotate to y
            rotateY(ship, location, game);
            ship.direction = "y";
            //console.log(ship);
            //console.log(game.boardOne);
          }
        }
        if (currentDirection === "y") {
          if (checkX(ship, location, game)) {
            //rotate to x
            rotateX(ship, location, game);
            ship.direction = "x";
          }
        }
      }
    }
  }
  function checkY(s, location, game) {
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
  function rotateY(s, location, game) {
    clearXDirection(s, location, game);
    setYDirection(s, location, game);
  }
  function clearXDirection(s, location, game) {
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
  function setYDirection(s, location, game) {
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
  
  function checkX(s, location, game) {
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
  function rotateX(s, location, game) {
    clearYDirection(s, location, game);
    setXDirection(s, location, game);
  }
  function clearYDirection(s, location, game) {
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
  function setXDirection(s, location, game) {
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

export default switchDirection;