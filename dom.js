import { gameboardFactory} from "./ship.js";

let game = gameboardFactory();
console.log(game)

window.addEventListener("load", () => {
    try {
        console.log('Hello')
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
