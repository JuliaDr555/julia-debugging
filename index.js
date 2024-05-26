const guessInput = document.getElementById('guess');
const submitButton = document.getElementById('submit');
const resetButton = document.getElementById('reset');
const messages = document.getElementsByClassName('message');
const tooHighMessage = document.getElementById('too-high');
const tooLowMessage = document.getElementById('too-low');
const maxGuessesMessage = document.getElementById('max-guesses');
const numberOfGuessesMessage = document.getElementById('number-of-guesses');
const correctMessage = document.getElementById('correct');

let targetNumber;
let attempts = 0;
const maxNumberOfAttempts = 5;

// Returns a random number from min (inclusive) to max (exclusive)
// Usage:
// > getRandomNumber(1, 100)
// <- 32
// > getRandomNumber(1, 100)
// <- 11
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function checkGuess() {
  // Get value from guess input element
  const guess = parseInt(guessInput.value, 10);
  attempts = attempts + 1;

  hideAllMessages();

  if (guess === targetNumber) {
    numberOfGuessesMessage.style.display = '';
    numberOfGuessesMessage.textContent = 'You made ${attempts} guesses';

    correctMessage.style.display = '';

    submitButton.disabled = true;
    guessInput.disabled = true;

  } else {
    if (guess < targetNumber) {
      tooLowMessage.style.display = ''; // Bug: Incorrect message display for too low guess
    } else {
      //changed to High
      tooHighMessage.style.display = '';// Bug: Incorrect message display for too high guess
    }

    const remainingAttempts = maxNumberOfAttempts - attempts;

    //Numbers displaying
    numberOfGuessesMessage.style.display = '';
  }

  //Disable the submit button
  if (attempts === maxNumberOfAttempts) { //extra equal mark
    submitButton.disabled = true;
    guessInput.disabled = true;
    //added message
    maxGuessesMessage.style.display = '';// Bug: Max guesses message not displayed
  }

  guessInput.value = '';

  resetButton.style.display = '';
}

function hideAllMessages() {
  for (let elementIndex = 0; elementIndex < messages.length; elementIndex++) {
    messages[elementIndex].style.display = 'none';
  }
}

function setup() {
  // Get random number
  targetNumber = getRandomNumber(1, 100);
  console.log('target number: ${targetNumber}');

  attempts = 0;
  // Reset number of attempts
  //maxNumberOfAttempts = 5;

  // Enable the input and submit button
  submitButton.disabled = false; // Corrected spelling of disabled
  guessInput.disabled = false;

  hideAllMessages();
  resetButton.style.display = 'none';

  // Reset the form to its initial state
  //guessInput.value = ''; // Clear the input field

}
submitButton.addEventListener('click', checkGuess);
resetButton.addEventListener('click', setup);

setup();
