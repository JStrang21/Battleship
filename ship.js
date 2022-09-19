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
        isShipSunk = true;
        return isShipSunk
    }
    return {hit, shipLength, isSunk}
}

let playerOne = []

let ship = shipFactory(3);
ship.hit(0);
ship.hit(2);
ship.hit(1);



console.log(shipTwo.isSunk())