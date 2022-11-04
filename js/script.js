const guessLetter = document.querySelector(".guessed-letters")
const guessBtn = document.querySelector(".guess")
const guessInput = document.querySelector(".letter")
const wordProgress = document.querySelector(".word-in-progress")
const remainGuessNum = document.querySelector(".remaining")
const remainGuessText = document.querySelector("span .remaining")
const topMessage = document.querySelector(".message")
const playAgainBtn = document.querySelector(".play-again hide")
const word = "magnolia"
const guessedLetters = [];

//displaying dot inplace of letters
const dotPlaceholder = function (word) {
    const dots = [];
    for (const letter of word) {
        //console.log(letter)
    dots.push("●");
    }

    wordProgress.innerText = dots.join("")  
      
};

dotPlaceholder(word);  

//Listener for guess button

guessBtn.addEventListener("click", function (e) {
    e.preventDefault();
//top msg text that's hidden and pops back up
    topMessage.innerText = "";
//what was typed in
    const guess = guessInput.value;
    //console.log(guessedLetter);

    //letter input fix it msg 
    const validGuess = validLetterInput(guess);
    console.log(validGuess)

    if (validGuess) {
        makeGuess(guess);
    
    }
//clearing letter
    guessInput.value = "";

});

//Letter input code

const validLetterInput = function (input){
    const acceptedLetter = /[a-zA-Z]/;

    //blank field
    if (input.length === 0) {
        topMessage.innerText = "Please input a letter A-Z";
    }
    //double letters
    else if (input.length >1) {
        topMessage.innerText = "Please input only ONE letter A-Z :)";
   
    }  
    //not a letter
    else if (!input.match(acceptedLetter)) {
        topMessage.innerText = "Please input a letter A-Z, nothing more than those 24, ha! That rhymes! *mic drop*";
    }
    //vaid letter put in
    else {
    return input;
    }
};

const makeGuess = function (guess) {
guess = guess.toUpperCase();
if (guessedLetters.includes(guess)) {
    topMessage.innerText = "Opps! You've already guessed that letter!"
} else {
guessedLetters.push(guess);
console.log(guessedLetters)

letterUpdateShow();

wordInProgress(guessedLetters);
}
};

const letterUpdateShow = function () {
    //clear list of letters
    guessLetter.innerHTML= "";

    for (const letter of guessedLetters){
        const li = document.createElement("li");
        li.innerText = letter;
        guessLetter.append(li);
    }
};
//letters to show up and word to be put in array
const wordInProgress = function (guessedLetters){
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const reveal = [];
    //console.log(wordArray);

    for (const letter of wordArray){
      if (guessedLetters.includes(letter)){
        reveal.push(letter.toUpperCase());
      } else {
        reveal.push("●")
    }  
}

    wordProgress.innerText = reveal.join("");
    winnerCheck();
};

const winnerCheck = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        topMessage.classList.add("win");
        topMessage.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;
    }
};

    