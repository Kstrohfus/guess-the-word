const guessLetter = document.querySelector(".guessed-letters")
const guessBtn = document.querySelector(".guess")
const guessInput = document.querySelector(".letter")
const wordProgress = document.querySelector(".word-in-progress")
const remainGuessNum = document.querySelector(".remaining")
const remainGuessText = document.querySelector("span .remaining")
const topMessage = document.querySelector(".message")
const playAgainBtn = document.querySelector(".play-again hide")
const word = "magnolia"

//displaying dot inplace of letters
const dotPlaceholder = function (word) {
    const dots = [];
    for (const letter of word) {
        //console.log(letter)
    dots.push("●");
    }

    wordProgress.innerText = dots.join("●")  
      
};

dotPlaceholder(word);  

//Listener for guess button

guessBtn.addEventListener("click", function (e) {
    e.preventDefault();
    const guessedLetter = guessInput.value;
console.log(guessedLetter);
    guessInput.value = "";
});

//Letter input code

const validLetterInput = function (input){
    const acceptedLetter = /[a-zA-Z]/;

    //blank field
    if (input.length === 0) {
        topMessage.innerText("Please input a letter A-Z");
    }
    //double letters
    else if (input.length >1) {
        topMessage.innerText("Please input only ONE letter A-Z :)");
   
    }  
    //not a letter
    else if (!input.match(acceptedLetter)) {
        topMessage.innerText("Please input a letter A-Z, nothing more than those 24, ha! That rhymes! *mic drop*");
    }
    //vaid letter put in
    else {
    return input;
    }

}



