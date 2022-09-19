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
    const board = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                   0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                   0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                   0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                   0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                   0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                   0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                   0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                   0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ];
    const playerOne = playerFactory();
    playerOne[0].hit(0)
    board[0] = playerOne[0].shipLength[0];
    board[1] = playerOne[0].shipLength[1];
    return board;
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






