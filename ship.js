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

let shipOne = shipFactory(3);
let shipTwo = shipFactory(4);
let shipThree = shipFactory(2);
console.log(shipOne)

/*for (let i = 0; i <= shipTwo.shipLength.length - 1; i++) {
    shipTwo.hit(i)
}
console.log(shipTwo.isSunk())*/

export {shipFactory}






