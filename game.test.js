import {shipFactory, playerFactory, gameboardFactory} from './ship.js';


test('factory creates ship with appropriate length', () => {
    const ship = shipFactory(3);
    expect(ship.shipLength.length).toBe(3)
})

test('factory initializes ship length array to ones', () => {
    const ship = shipFactory(3);
    expect(ship.shipLength).toStrictEqual([1,1,1])
})

test('hit on ship at correct spot', () => {
    const ship = shipFactory(3);
    ship.hit(1)
    expect(ship.shipLength).toStrictEqual([1,2,1])
})

test('ship sinks when hit completely and length equals 3', () => {
    const ship = shipFactory(3);
    ship.hit(0);
    ship.hit(1);
    ship.hit(2)
    expect(ship.shipLength).toStrictEqual([3,3,3])
})

test('checks for ship sunk', () => {
    const ship = shipFactory(3);
    ship.hit(0);
    ship.hit(1);
    ship.hit(2);
    expect(ship.isSunk()).toBeTruthy();
})

test('only sunk when all spots are hit', () => {
    const ship = shipFactory(3);
    ship.hit(0);
    expect(ship.isSunk()).toBeFalsy();
})

test('player factory creates five ships', () => {
    expect(playerFactory().length).toBe(5)
})

test('gameboard creates 10x10 board of zeros', () => {
    const board = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ]
    expect(gameboardFactory()).toHaveLength(100);
})

/*test('player factory returns array of ships')

test('gameboard creates 10x10 board')

test('gameboard randomly places player ships')

test('gameboard updates when ship is hit')

test('gameboard ')*/