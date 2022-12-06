import {shipFactory, playerFactory, gameboardFactory, checkForOpenSpace, checkBottom, checkTop, checkLeft, checkRight} from './ship.js';


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

test('gameboard creates 10x10 board of zeros', () => {
    expect(gameboardFactory()).toHaveLength(100);
})

test('returns true if space is available top', () => {
    let random = 10;
    let shipLength = 2;
    expect(checkTop(board, random, shipLength)).toBeTruthy();
})

test('returns false if not enough available space top', () => {
    let random= 10;
    let shiplength = 5;
    expect(checkTop(board, random, shiplength)).toBeFalsy();
})

test('returns true if space is available bottom', () => {
    let random = 80;
    let shipLength = 2;
    expect(checkBottom(board, random, shipLength)).toBeTruthy();
})

test('returns false if not enough available space bottom', () => {
    let random= 80;
    let shiplength = 5;
    expect(checkBottom(board, random, shiplength)).toBeFalsy();
})

test('returns false if not enough space left', () => {
    let random = 10;
    let shiplength = 3;
    expect(checkLeft(board, random, shiplength)).toBeFalsy();
})

test('returns false if not enough space right', () => {
    let random = 9;
    let shiplength = 3;
    expect(checkRight(board, random, shiplength)).toBeFalsy();
})

/*test('returns true if space is available top', () => {
    let random = 10;
    expect(checkForOpenSpace(board, playerOne[0], random)).toBeTruthy();
})

test('returns false if not enough space at top', () => {
    let random = 0;
    expect(checkForOpenSpace(board, playerOne))
})*/

/*
test('gameboard places ships in empty squares");
test('gameboard checks underneath/above sqaures if cant place at top/bottom')
test('gameboard checks left/right squares if cant place at right/left')
test('gameboard trys to place ship again if cant place it initially')

test('player factory returns array of ships')

test('gameboard creates 10x10 board')

test('gameboard randomly places player ships')

test('gameboard updates when ship is hit')*/