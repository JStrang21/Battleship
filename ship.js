function shipFactory(length) {
    let shipLength = [];
    let i = 0;
    while (i <= length - 1) {
        shipLength[i] = 0;
        i++;
    }
    const hit = (hitLocation) => {
        for (let i = 0; i <= shipLength.length; i++) {
            if (hitLocation === i) {
                shipLength[i] = 1;
                isSunk();
                return;
            }
        }
    }
    const isSunk = () => {
        let isShipSunk;
        for (let i in shipLength) {
            if (shipLength[i] === 0) {
                return isShipSunk = false;
            }
        }
        return isShipSunk = true;
    }
    return {hit, shipLength, isSunk}
}

function gameboardFactory() {
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
    for (let ship in playerOne) {
        
    }
    
}

let ship = shipFactory(2);


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
console.log(playerOne[4])


/*for (let i = 0; i <= shipTwo.shipLength.length - 1; i++) {
    shipTwo.hit(i)
}
console.log(shipTwo.isSunk())*/

export {shipFactory, playerFactory, gameboardFactory}






