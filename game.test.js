import {shipFactory} from './ship.js';

test('factory creates ship with appropriate length', () => {
    const ship = shipFactory(3);
    expect(ship.shipLength.length).toBe(3)
})