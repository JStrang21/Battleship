function shipFactory(length) {
    let shipLength = [];
    let i = 0;
    while (i <= length - 1) {
        shipLength[i] = 1;
        i++;
    }
    const hit = (hitLocation) => {
        for (let i = 0; i <= shipLength.length; i++) {
            if (hitLocation === i) {
                shipLength[i] = 2;
                isSunk();
                return;
            }
        }
    }
    const isSunk = () => {
        let isShipSunk;
        for (let i in shipLength) {
            if (shipLength[i] === 1) {
                return isShipSunk = false;
            }
        }
        let i = 0;
        while (i <= length - 1) {
            shipLength[i] = 3;
            i++;
        }
        return isShipSunk = true;
    }
    return {hit, shipLength, isSunk}
}

function gameboardFactory() {
    //0 = no ship
    //1 = ship
    //2 = hit ship
    //3 = destroyed ship
            //   0                          9
    let board = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
           /*10*/0, 0, 0, 0, 0, 0, 0, 0, 0, 0,/*19*/
                 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
           /*90*/0, 0, 0, 0, 0, 0, 0, 0, 0, 0,];/*99*/
        
    const playerOne = playerFactory();
    let random = getRandom(0, board.length - 1)
    placement(board, playerOne[0], random);

    /*for (let ship in playerOne) {
        let random = getRandom(0, board.length - 1)
        placement(board, playerOne[ship], random)
        for (let i = 0; i <= playerOne[ship].shipLength.length - 1; i++) {
            if (board[random] === 0 && placement(board, playerOne[ship], random)) {
                //Check if space for vertical or horizontal placement
                board[random] = playerOne[ship];
            }
        }
    }*/
    return board;
}

function placement(board, ship, random) {
    if (board[random] !== 0) {
        return false
    }
    let testShipLength = ship.shipLength.length
    for (let i = 0; i <= testShipLength - 1; i++) {
        let randomDirection = getRandom(0, 4);
        //If space available in given direction then check fn returns true and ship is placed there
        if (randomDirection === 0) {
            checkTop(board, random, testShipLength, ship)
            /*if (checkTop(board, random, testShipLength, ship)) {
                
            }*/
        }
        else if (randomDirection === 1) {
            checkBottom(board, random, testShipLength, ship)
            /*if (checkBottom(board, random, testShipLength, ship)) {

            }*/
        }
        else if (randomDirection === 2) {
            checkLeft(board, random, testShipLength, ship)
            /*if (checkLeft(board, random, testShipLength, ship)) {
                
            }*/
        }
        else if (randomDirection === 3) {
            checkRight(board, random, testShipLength, ship)
            /*if (checkRight(board, random, testShipLength, ship)) {
                
            }*/
        }
    }
}

function checkTop(board, random, shipsLength, ship) {
    if (board[random] !== 0) {
        return false
    }
    let increment;
    for (let i = 0; i <=  shipsLength; i++) {
        if (board[random + increment] === 0) {
            board[random + increment] = ship.shipLength[i];
            increment += -10;
        }
        else if (board[random + increment] !== 0) {
            return false
        }
    }
}
function checkBottom(board, random, shipsLength, ship) {
    if (board[random] !== 0) {
        return false
    }
    let increment;
    for (let i = 0; i <=  shipsLength; i++) {
        if (board[random + increment] === 0) {
            board[random + increment] = ship.shipLength[i];
            increment += 10;
        }
        else if (board[random + increment] !== 0) {
            return false
        }
    }
}
function checkLeft(board, random, shipsLength, ship) {
    if (board[random] !== 0) {
        return false
    }
    let increment;
    for (let i = 0; i <=  shipsLength; i++) {
        if (board[random + increment] === 0) {
            board[random + increment] = ship.shipLength[i];
            increment += -1;
        }
        else if (board[random + increment] !== 0) {
            return false
        }
    }
}
function checkRight(board, random, shipsLength, ship) {
    if (board[random] !== 0) {
        return false
    }
    let increment;
    for (let i = 0; i <=  shipsLength; i++) {
        if (board[random + increment] === 0) {
            board[random + increment] = ship.shipLength[i];
            increment += 1;
        }
        else if (board[random + increment] !== 0) {
            return false
        }
    }
}

function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function playerFactory() {
    let lengths = [2, 3, 3, 4, 5]
    let ships = [];
    for (let i in lengths) {
        let newShip = shipFactory(lengths[i]);
        ships.push(newShip);
    }
    return ships
}

let playerOne = playerFactory();

//console.log(playerOne[4].shipLength[1])

let gametest = gameboardFactory();
//console.table(gametest)





/*for (let i = 0; i <= shipTwo.shipLength.length - 1; i++) {
    shipTwo.hit(i)
}
console.log(shipTwo.isSunk())*/

export {shipFactory, playerFactory, gameboardFactory}






