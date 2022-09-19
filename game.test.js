import {shipFactory} from './ship.js';


test('factory creates ship with appropriate length', () => {
    const ship = shipFactory(3);
    expect(ship.shipLength.length).toBe(3)
})

test('hit on ship', () => {
    const ship = shipFactory(3);
    ship.hit(1)
    expect(ship.shipLength).toStrictEqual([0,1,0])
})

test('ship sinks when hit completely', () => {
    const ship = shipFactory(3);
    ship.hit(0);
    ship.hit(1);
    ship.hit(2)
    expect(ship.shipLength).toStrictEqual([1,1,1])
})