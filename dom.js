import { gameboardFactory, player } from "./ship.js";



window.addEventListener("load", () => {
    try {
        gameboardFactory();
    }
    catch (error) {
        console.log(error)
    }
}) 



function matchSquaresToShips(player) {
    
}

/*const header = document.getElementBy
const element = document.querySelectorAll("[value='00'");
element.addEventListener('click', () => {
    console.log(element)
})*/
