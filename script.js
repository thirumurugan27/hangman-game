// Hangman images array
const hangmanImages = [
    "hangmanback0.png",
    "hangmanback1.png",
    "hangmanback2.png",
    "hangmanback3.png",
    "hangmanback4.png",
    "hangmanback6.png"
];

let words = {
    animals: ["ELEPHANT", "TIGER", "GIRAFFE", "KANGAROO", "ZEBRA"],
    fruits: ["APPLE", "BANANA", "CHERRY", "GRAPE", "MANGO"],
    countries: ["CANADA", "INDIA", "FRANCE", "BRAZIL", "JAPAN"]
};

let chosenWord = "";
let guessedWord = [];
let wrongGuesses = 0;

// Function to start the game with a chosen category
function buttons(event) {
    let category = event.target.className.toLowerCase();
    startGame(category);
}

// Function to start the game
function startGame(category) {
    // Pick a random word from the category
    let wordsArray = words[category];
    chosenWord = wordsArray[Math.floor(Math.random() * wordsArray.length)];

    // Create dashes
    guessedWord = Array(chosenWord.length).fill("_");
    document.querySelector(".dashes").innerText = guessedWord.join(" ");

    // Reset wrong guesses
    wrongGuesses = 0;
    updateHangmanImage();

    // Enable all alphabet buttons
    document.querySelectorAll(".alphabet-button").forEach(button => {
        button.disabled = false;
        button.style.backgroundColor = "#007bff";
    });
}

// Function to handle letter selection
function letterSelected(event) {
    let letter = event.target.innerText;
    event.target.disabled = true;  // Disable the button
    event.target.style.backgroundColor = "gray";  // Change color

    if (chosenWord.includes(letter)) {
        // Correct guess - update dashes
        for (let i = 0; i < chosenWord.length; i++) {
            if (chosenWord[i] === letter) {
                guessedWord[i] = letter;
            }
        }
        document.querySelector(".dashes").innerText = guessedWord.join(" ");

        // Check if player won
        if (!guessedWord.includes("_")) {
            setTimeout(() => alert("Congratulations! You won!"), 500);
        }
    } else {
        // Wrong guess - increase the counter
        wrongGuesses++;
        updateHangmanImage();

        // Check if player lost
        if (wrongGuesses >= hangmanImages.length - 1) {
            setTimeout(() => alert(`Game Over! The word was: ${chosenWord}`), 500);
        }
    }
}

// Function to update the hangman image
function updateHangmanImage() {
    document.querySelector(".lbox").style.backgroundImage = `url(${hangmanImages[wrongGuesses]})`;
}

// Add event listeners to alphabet buttons
document.querySelectorAll(".alphabet-button").forEach(button => {
    button.addEventListener("click", letterSelected);
});
function buttons(event) {
    let category = event.target.className.toLowerCase();

    // Remove fade effect from all buttons first
    document.querySelectorAll(".typebut button").forEach(button => {
        button.classList.remove("faded");
    });

    // Add fade effect to all buttons except the selected one
    document.querySelectorAll(".typebut button").forEach(button => {
        if (button !== event.target) {
            button.classList.add("faded");
        }
    });

    startGame(category);
}

