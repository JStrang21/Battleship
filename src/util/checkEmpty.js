function checkEmpty(ship, game, targetLocation) {
    let board = game.boardOne;
    //console.log(board)
    /*let player = game.playerOne;
    let ship;
    for (let i in player) {
        if (player[i].stringName === shipName) {
            ship = player[i];
        }
    }*/
    let location = parseInt(targetLocation);
    const currentDirection = ship.direction;
    
    if (currentDirection === "x") {
        if (checkX(ship, location, board)) {
          return true;
        }
        else {
            return false;
        }
    }
    if (currentDirection === "y") {
        if (checkY(ship, location, board)) {
            return true;
        }
        else {
            return false;
        }
    }
    //return false;
}

function checkY(s, location, board) {
    let increment = 0;
    console.log(location)
    //Might have to start i=10 bc first ship square remains stationary
    for (let i = 0; i < s.shipLength.length - 1; i++) {
      if (board[location + increment] !== 0) { 
        return false;
      }
      increment += 10;
    }
    return true;
}

function checkX(s, location, board) {
    let increment = 0;
    console.log(location)

    for (let i = 0; i < s.shipLength.length; i++) {
      if (board[location + increment] !== 0) {
        return false;
      }
      increment += 1;
    }
    return true;
}

export default checkEmpty;