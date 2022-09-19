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
    let board = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,];
        
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
        //Could use another random number to randomly select up/down/left/right
        if (board[random + i] === 0) {
            board[random + i] = ship;
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
console.table(gametest)



/*for (let i = 0; i <= shipTwo.shipLength.length - 1; i++) {
    shipTwo.hit(i)
}
console.log(shipTwo.isSunk())*/

export {shipFactory, playerFactory, gameboardFactory}






