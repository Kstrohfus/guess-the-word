const guessLetter = document.querySelector(".guessed-letters")
const guessBtn = document.querySelector(".guess")
const guessInput = document.querySelector(".letter")
const wordProgress = document.querySelector(".word-in-progress")
const remainGuessNum = document.querySelector(".remaining")
const remainGuessText = document.querySelector(" .remaining span")
const topMessage = document.querySelector(".message")
const playAgainBtn = document.querySelector(".play-again")

let word = "magnolia"
let guessedLetters = [];
let remainingGuesses = 8;


//api for words
const getWord = async function () {
    const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt") 
    const words = await response.text(); 

    const wordArray = words.split("\n");
//random word index
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();

    dotPlaceholder(word);
}

//game starting function
getWord();

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

remainingGuessCount(guess)

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

//count guesses remaining and text
    const remainingGuessCount = function (guess) {
        const upWord = word.toUpperCase();

        if (!upWord.includes(guess)){
            topMessage.innerText = `Sorry the word has no ${guess}. `;

            remainingGuesses-= 1
        } else {
        topMessage.innerText = `Yay! The word has the letter ${guess}!`;
            }

            if (remainingGuesses === 0) {
                topMessage.innerHTML = `Game over! The word was <span class="highlight"> ${word} </span>.` 

                startOver();
            }

            else if (remainingGuesses === 1) {
                remainGuessText.innerText = `${remainingGuesses} guess`;
            }
            else {
                remainGuessText.innerText = `${remainingGuesses}  guesses`;
            }
        };

    

//checking for a win
const winnerCheck = function () {
    if (word.toUpperCase() === wordProgress.innerText) {
        topMessage.classList.add("win");
        topMessage.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;

        startOver();
    }
};
//Game over restart elements
  const startOver = function () {
    guessBtn.classList.add("hide");
    remainGuessNum.classList.add("hide");
    guessLetter.classList.add("hide");
    playAgainBtn.classList.remove("hide")

    }
    //event listener to restart game
 playAgainBtn.addEventListener("click", function () {
    topMessage.classList.remove("win");
    guessedLetters = [];
    remainingGuesses = 8;
    remainGuessText.innerText = `${remainingGuesses} guesses`;
    guessLetter.innerHTML = "";
    topMessage.innerText = "";

getWord();

    guessBtn.classList.remove("hide");
    playAgainBtn.classList.add("hide");
    remainGuessNum.classList.remove("hide");
    guessLetter.classList.remove("hide");
     
 });
   

