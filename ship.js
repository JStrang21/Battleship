function shipFactory(length, name) {
    let shipLength = [];
    let actualLocation = [];
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
    return {name, hit, shipLength, isSunk, actualLocation}
}

function gameboardFactory() {
    //0 = no ship
    //1 = ship
    //2 = hit ship
    //3 = destroyed ship
    //4 = missed A  B  C  D  E  F  G  H  I  J
            //   0  1  2  3  4  5  6  7  8  9
   let boardOne=[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, /*1*/
           /*10*/0, 0, 0, 0, 0, 0, 0, 0, 0, 0, /*2*/   /*19*/
                 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, /*3*/
                 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, /*4*/
                 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, /*5*/
                 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, /*6*/
                 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, /*7*/
                 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, /*8*/
                 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, /*9*/
           /*90*/0, 0, 0, 0, 0, 0, 0, 0, 0, 0,]/*10*/ /*99*/

    let boardTwo = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ]

    let missedCoordinatesOne = [];
    let missedCoordinatesTwo = [];
    const playerOne = playerFactory();
    const playerTwo = playerFactory();
    //issue with placeships fn
    placeShips(playerOne, boardOne);
    placeShips(playerTwo, boardTwo);

    const recieveAttack = (coordinates) => {
        let actualCoordinate = convertCoordinates(coordinates);
        let valueOfCoord = board[actualCoordinate];
        if (valueOfCoord === 0) {
            board[actualCoordinate] = 4;
            missedCoordinates.push(actualCoordinate);
        } 
        else if (valueOfCoord !== 0) {
            let hitShip = board[actualCoordinate];
            let length = hitShip.shipLength.length
            for (let i = 0; i <= length; i++) {
                if (hitShip.actualLocation[i] === actualCoordinate) {
                    hitShip.hit(i)
                }
            }
        }
        return board
    }
    const checkIfAllSunk = (player) => { 
        for (let ship in player) {
            let length = player[ship].shipLength.length;
            for (let i = 0; i <= length - 1; i++) {
                if (player[ship].shipLength[i] === 1 || player[ship].shipLength[i] === 2) {
                    return false;
                }
                else {
                    continue
                }
            }
        }
        return true
    }

    return {boardOne, boardTwo, playerOne, playerTwo, recieveAttack, missedCoordinatesOne, missedCoordinatesTwo, checkIfAllSunk}
}

function placeShips(player, board) {
    for (let ship in player) {
        //Maybe put ship name in ship creation object to track easier
        let random = getRandom(0, board.length)
        let check = false;
        while (!check) {
            check = checkForOpenSpace(board, player[ship], random);
            random = getRandom(0, board.length)
        }
        if (check.space) {
            placement(board, player[ship], random, check.direction)
        }
        check = false;
    }
    return board
}

function convertCoordinates(coordinates) {
    let splitCoords = coordinates.split("")
    let letter = convertLetter(splitCoords[0]);
    let number = splitCoords[1] - 1;
    let trueCoord = Number(number + "" + letter);
    return trueCoord
}

function convertLetter(letter) {
    switch(letter) {
        case 'A':
            return 0
        case 'B':
            return 1
        case 'C':
            return 2
        case 'D':
            return 3
        case 'E':
            return 4
        case 'F':
            return 5
        case 'G':
            return 6
        case 'H':
            return 7
        case 'I':
            return 8
        case 'J':
            return 9
    }
}

function checkForOpenSpace(board, ship, random) {
    let shipsLength = ship.shipLength.length;
    for (let i = 0; i <= shipsLength - 1; i++) {
        //For edge case where random number is on left or right
        if (random % 10 === 0) {
            let randomDirection = getRandom(0, 3);
            if (randomDirection === 0) {
                return checkTop(board, random, shipsLength)
            }
            else if (randomDirection === 1) {
                return checkBottom(board, random, shipsLength)
            }
            else if (randomDirection === 2) {
                return checkRight(board, random, shipsLength)
            }
        }
        else if ((random - 1) % 10 === 0) {
            let randomDirection = getRandom(0, 3);
            if (randomDirection === 0) {
                return checkTop(board, random, shipsLength)
            }
            else if (randomDirection === 1) {
                return checkBottom(board, random, shipsLength)
            }
            else if (randomDirection === 2) {
                return checkLeft(board, random, shipsLength)
            }
        }
        else {
            let randomDirection = getRandom(0, 4);
            //If space available in given direction then check fn returns true and ship is placed there
            if (randomDirection === 0) {
                return checkTop(board, random, shipsLength)
            }
            else if (randomDirection === 1) {
                return checkBottom(board, random, shipsLength)
            }
            else if (randomDirection === 2) {
                return checkLeft(board, random, shipsLength)
            }
            else if (randomDirection === 3) {
                return checkRight(board, random, shipsLength)
            }
        }
    }
}

function placement(board, ship, random, direction) {
    /*Directions: 0=top/1=bottom/2=left/3=right*/
    let goodDirection = direction;
    if (goodDirection === 0) {
        return insertTop(board, ship, random);
    }
    else if (goodDirection === 1) {
        return insertBottom(board, ship, random)
    }
    else if (goodDirection === 2) {
        return insertLeft(board, ship, random)
    }
    else if (goodDirection === 3) {
        return insertRight(board, ship, random)
    }
}

function insertTop(board, ship, random) {
    let testShipLength = ship.shipLength.length
    let increment = 0;
    for (let i = 0; i <= testShipLength - 1; i++) {
        board[random + increment] = ship
        ship.actualLocation.push(random + increment);
        increment -= 10;
    }
    return board
}

function insertBottom(board, ship, random) {
    let testShipLength = ship.shipLength.length
    let increment = 0;
    for (let i = 0; i <= testShipLength - 1; i++) {
        board[random + increment] = ship;
        ship.actualLocation.push(random + increment);
        increment += 10;
    }
    return board
}

function insertLeft(board, ship, random) {
    let testShipLength = ship.shipLength.length
    let increment = 0;
    for (let i = 0; i <= testShipLength - 1; i++) {
        board[random + increment] = ship;
        ship.actualLocation.push(random + increment);
        increment -= 1;
    }
    return board
}

function insertRight(board, ship, random) {
    let testShipLength = ship.shipLength.length
    let increment = 0;
    for (let i = 0; i <= testShipLength - 1; i++) {
        board[random + increment] = ship;
        ship.actualLocation.push(random + increment);
        increment += 1;
    }
    return board
}

function checkTop(board, random, shipsLength) {
    if (board[random] !== 0) {
        return false
    }
    let increment = 0;
    for (let i = 0; i <=  shipsLength - 1; i++) {
        if (board[random + increment] !== 0) {
            return false
        }
        increment += -10;
    }
    let direction = 0;
    let space = true;
    return {direction, space}
}

function checkBottom(board, random, shipsLength) {
    if (board[random] !== 0) {
        return false
    }
    let increment = 0;
    for (let i = 0; i <=  shipsLength - 1; i++) {
        if (board[random + increment] !== 0) {
            return false
        }
        increment += 10;
    }
    let direction = 1;
    let space = true;
    return {direction, space}
}

function checkLeft(board, random, shipsLength) {
    if (board[random] !== 0) {
        return false
    }
    let increment = 0;
    for (let i = 0; i <=  shipsLength - 1; i++) {
        if (board[random + increment] !== 0) {
            return false;
        }
        increment -= 1;
    }
    let direction = 2;
    let space = true;
    return {direction, space}
}

function checkRight(board, random, shipsLength) {
    if (board[random] !== 0) {
        return false
    }
    let increment = 0;
    for (let i = 0; i <=  shipsLength - 1; i++) {
        if (board[random + increment] !== 0) {
            return false;    
        }
        increment += 1;
    }
    let direction = 3;
    let space = true;
    return {direction, space}
}

function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function playerFactory() {
    let lengths = [2, 3, 3, 4, 5];
    let names = [1, 2, 3, 4, 5]
    let ships = [];
    for (let i in lengths) {
        let newShip = shipFactory(lengths[i], names[i]);
        ships.push(newShip);
    }
    return ships
}


export {
    shipFactory, playerFactory, gameboardFactory, checkForOpenSpace,
    checkTop, checkBottom, checkLeft, checkRight
}






