// Get references to HTML elements
const guessInput = document.getElementById('guess');
const submitButton = document.getElementById('submit');
const resetButton = document.getElementById('reset');
const messages = document.getElementsByClassName('message');
const tooHighMessage = document.getElementById('too-high');
const tooLowMessage = document.getElementById('too-low');
const maxGuessesMessage = document.getElementById('max-guesses');
const numberOfGuessesMessage = document.getElementById('number-of-guesses');
const correctMessage = document.getElementById('correct');

// Initialize variables
let targetNumber; // The random number to guess
let attempts = 0; // Number of attempts made by the user
const maxNumberOfAttempts = 5; // Maximum number of attempts allowed

// Function to generate a random number between min (inclusive) and max (exclusive)
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Function to handle user's guess
function checkGuess() {
  // Get the user's guess from the input element
  const guess = parseInt(guessInput.value, 10);
  attempts++; // Increment the number of attempts

  // Hide all message elements initially
  hideAllMessages();

  // Check if the guess matches the target number
  if (guess === targetNumber) {
    // Display the number of guesses made
    numberOfGuessesMessage.style.display = 'block';
    numberOfGuessesMessage.textContent = `You made ${attempts} guesses`;

    // Display the correct message
    correctMessage.style.display = 'block';

    // Disable the submit button and input field
    submitButton.disabled = true;
    guessInput.disabled = true;

  } else {
    // Check if the guess is too low or too high
    if (guess < targetNumber) {
      tooLowMessage.style.display = 'block'; // Display too low message
    } else {
      tooHighMessage.style.display = 'block'; // Display too high message
    }

    // Calculate remaining attempts
    const remainingAttempts = maxNumberOfAttempts - attempts;

    // Display the number of guesses made and remaining attempts
    numberOfGuessesMessage.style.display = 'block';
    numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttempts} ${remainingAttempts === 1 ? 'guess' : 'guesses'} remaining`;
  }

  // Check if the maximum number of attempts is reached
  if (attempts === maxNumberOfAttempts) {
    // Disable the submit button and input field
    submitButton.disabled = true;
    guessInput.disabled = true;

    // Display the max guesses message
    maxGuessesMessage.style.display = 'block';
  }

  // Clear the input field
  guessInput.value = '';

  // Display the reset button
  resetButton.style.display = 'block';
}

// Function to hide all message elements
function hideAllMessages() {
  for (let elementIndex = 0; elementIndex < messages.length; elementIndex++) {
    messages[elementIndex].style.display = 'none';
  }
}

// Function to set up the game
function setup() {
  // Generate a random target number
  targetNumber = getRandomNumber(1, 100);
  console.log('target number: ' + targetNumber);

  // Reset the number of attempts
  attempts = 0;

  // Enable the submit button and input field
  submitButton.disabled = false;
  guessInput.disabled = false;

  // Hide all message elements
  hideAllMessages();

  // Hide the reset button
  resetButton.style.display = 'none';

  // Clear the input field
  guessInput.value = '';
}

// Event listener for the submit button
submitButton.addEventListener('click', checkGuess);

// Event listener for the reset button
resetButton.addEventListener('click', setup);

// Initialize the game
setup();