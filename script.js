// بسم الله الرحمن الرحيم
import { WORDS } from "./words.js";
import { WORDS1 } from "./words1.js";
import { WORDSDEF } from "./words1.js";
import { HUROOF} from "./huroof.js";

const NUMBER_OF_GUESSES = 6;
let guessesRemaining = NUMBER_OF_GUESSES;
let currentGuess = [];
let nextLetter = 0;
let rightGuessString = WORDS1[Math.floor(Math.random() * WORDS1.length)]//Selects random word from words list.
var score_n = 0;


//Outputs correct word to console
console.log(rightGuessString)



 // Get the modal
 var modal = document.getElementById("myModal");
 // Get the <span> element that closes the modal
 var span = document.getElementsByClassName("close")[0];
// When the user clicks on <span> (x), close the modal
 span.onclick = function() {
   modal.style.display = "none";
 }
 // When the user clicks anywhere outside of the modal, close it
 window.onclick = function(event) {
   if (event.target == modal) {
     modal.style.display = "none";
   }
 }




function initBoard() {
    let board = document.getElementById("game-board");//assigns "gameboard" in html to board variable

    for (let i = 0; i < NUMBER_OF_GUESSES; i++) {
        let row = document.createElement("div")
        row.className = "letter-row"
        //for every guess allowed, add a row to the gameboard

        for (let j = 0; j < rightGuessString.length; j++) {
            let box = document.createElement("div")
            box.className = "letter-box"
            row.appendChild(box)
        }

        board.appendChild(row)
    }
}

function shadeKeyBoard(letter, color) {
    for (const elem of document.getElementsByClassName("keyboard-button")) {
        if (elem.textContent === letter) {
            let oldColor = elem.style.backgroundColor
            if (oldColor === 'green') {
                return
            }

            if (oldColor === 'yellow' && color !== 'green') {
                return
            }

            elem.style.backgroundColor = color
            break
        }
    }
}

function deleteLetter () {
    let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining]
    let box = row.children[nextLetter - 1]
    box.textContent = ""
    box.classList.remove("filled-box")
    currentGuess.pop()
    nextLetter -= 1
}

function checkGuess () {
    let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining]
    let guessString = ''
    let rightGuess = Array.from(rightGuessString)
    console.log(rightGuess)

    for (const val of currentGuess) {
        guessString += val
    }

    if (guessString.length != rightGuessString.length) {
        modal.style.display = "block";
        document.getElementById("Modal Header").innerHTML = "Not enough letters"
        document.getElementById("Modal Body 1").innerHTML = "You need to add more letters to complete a guess"
        document.getElementById("ModalHeaderDiv").style.backgroundColor="orangered"
        document.getElementById("ModalFooterDiv").style.backgroundColor="orangered"

        return
    }

//    if (!WORDS.includes(guessString)) {
//        toastr.error("Word not in list!")
//        return
//    }
//Needs to be readded once words list is complete

    for (let i = 0; i <rightGuessString.length; i++) {
        let letterColor = ''
        let box = row.children[i]
        let letter = currentGuess[i]

        let letterPosition = rightGuess.indexOf(currentGuess[i])
        // is letter in the correct guess
        if (letterPosition === -1) {
            letterColor = 'grey'
        } else {
            // now, letter is definitely in word
            // if letter index and right guess index are the same
            // letter is in the right position
            if (currentGuess[i] === rightGuess[i]) {
                // shade green
                letterColor = 'green'
                score_n+=2
            } else {
                // shade box yellow
                letterColor = 'yellow'
            }

            rightGuess[letterPosition] = "#"
        }

        let delay = 250 * i
        setTimeout(()=> {
            //flip box
            animateCSS(box, 'flipInX')
            //shade box
            box.style.backgroundColor = letterColor
            shadeKeyBoard(letter, letterColor)
        }, delay)
        document.getElementById("score").innerHTML = "Score: "+score_n
    }

    if (guessString === rightGuessString) {
        score_n+=rightGuessString.length*2
        score_n+=rightGuessString.length*guessesRemaining
        document.getElementById("score").innerHTML = "Score: "+score_n
        guessesRemaining = 0


        modal.style.display = "block";
        document.getElementById("Modal Header").innerHTML = "You win!"
        document.getElementById("Modal Body 1").innerHTML = `"${rightGuessString}" :The correct word was`
        document.getElementById("Modal Body 2").innerHTML = `${WORDSDEF[rightGuessString]}`
        document.getElementById("Modal Footer").innerHTML = `${score_n} :Your Score`
        document.getElementById("ModalHeaderDiv").style.backgroundColor="forestgreen"
        document.getElementById("ModalFooterDiv").style.backgroundColor="forestgreen"



        return
    } else {
        guessesRemaining -= 1;
        currentGuess = [];
        nextLetter = 0;

        if (guessesRemaining === 0) {
            modal.style.display = "block";
            document.getElementById("Modal Header").innerHTML = "You've run out of guesses! Game Over!"
            document.getElementById("Modal Body 1").innerHTML = `"${rightGuessString}" :The correct word was`
            document.getElementById("Modal Body 2").innerHTML = ''
            document.getElementById("Modal Footer").innerHTML = `!Try again`
            document.getElementById("ModalHeaderDiv").style.backgroundColor="red"
            document.getElementById("ModalFooterDiv").style.backgroundColor="red"
        }
    }
}

function insertLetter (pressedKey) {
    if (nextLetter === rightGuessString.length) {
        return
    }
    pressedKey = pressedKey.toLowerCase()

    let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining]
    let box = row.children[nextLetter]
    animateCSS(box, "pulse")
    box.textContent = pressedKey
    box.classList.add("filled-box")
    currentGuess.push(pressedKey)
    nextLetter += 1
}

const animateCSS = (element, animation, prefix = 'animate__') =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    // const node = document.querySelector(element);
    const node = element
    node.style.setProperty('--animate-duration', '0.3s');

    node.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve('Animation ended');
    }

    node.addEventListener('animationend', handleAnimationEnd, {once: true});
});

document.addEventListener("keyup", (e) => {

    if (guessesRemaining === 0) {
        return
    }

    let pressedKey = String(e.key)
    if (pressedKey === "Backspace" && nextLetter !== 0) {
        deleteLetter()
        return
    }

    if (pressedKey === "Enter") {
        checkGuess()
        return
    }



//    let found = pressedKey.match(/[a-z]/gi)
//    if (!found || found.length > 1) {
//        insertLetter(pressedKey)
//    } else {
//        return
//    }

    var found=HUROOF.indexOf(pressedKey)
    if (found != -1){
        insertLetter(pressedKey)
    } else {
        return
    }
})

document.getElementById("keyboard-cont").addEventListener("click", (e) => {
    const target = e.target

    if (!target.classList.contains("keyboard-button")) {
        return
    }
    let key = target.textContent

    if (key === "Del") {
        key = "Backspace"
    }

    document.dispatchEvent(new KeyboardEvent("keyup", {'key': key}))
})

initBoard();
modal.style.display = "block";


document.getElementById("hint").addEventListener("click", (e) => { //if "hint" button is clicked
    var n=(Math. floor(Math. random() * rightGuessString.length));
    //assign n to a random letter in the rightguesstring
    score_n-=2
    //deduct score by 2 for using a hint
    document.getElementById("score").innerHTML = "Score: "+score_n
    //update new score in HTML

    modal.style.display = "block";
    document.getElementById("Modal Header").innerHTML = "Pssst..."
    document.getElementById("Modal Body 1").innerHTML = `"${rightGuessString[n]}" :This word contains the letter `
    document.getElementById("Modal Body 2").innerHTML = ''
    document.getElementById("Modal Footer").innerHTML = `! Each hint deducts 2 points! Don't lose too many`
    document.getElementById("ModalHeaderDiv").style.backgroundColor="dodgerblue"
    document.getElementById("ModalFooterDiv").style.backgroundColor="dodgerblue"
    })
function resest(){

}
