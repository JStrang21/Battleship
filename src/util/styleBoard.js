function styleBoardSquares(ship, targetSquareID, board) {
    const shipDirection = ship.direction;
    const shipLength = ship.shipLength.length;
    if (shipDirection === 'x') {
        const lastID = (shipLength - 1) + targetSquareID;
        const firstElement = document.getElementById(targetSquareID);
        const lastElement = document.getElementById(lastID);
        /*firstElement.style.borderTopLeftRadius = '20px';
        firstElement.style.borderBottomLeftRadius = '20px';*/

    }
}

export default styleBoardSquares