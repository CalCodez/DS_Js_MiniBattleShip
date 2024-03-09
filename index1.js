const readline = require('readline-sync');

// generate a random integer
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// generate random ship location
function generateRandomLocation() {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const row = alphabet[getRandomInt(0, 9)];
  const column = getRandomInt(1, 10);
  return `${row}${column}`;
}

// check for valid location
function isValidLocation(location) {
  const regex = /^[A-J][1-9]$/;
  return regex.test(location);
}

// check for equal location
function areLocationsEqual(loc1, loc2) {
  return loc1.toUpperCase() === loc2.toUpperCase();
}

// Function to initialize the game
function initializeGame() {
  console.log("Press any key to start the game.");
  readline.keyInPause();

  //random locations for two ships
  let ship1Location = generateRandomLocation();
  let ship2Location = generateRandomLocation();

  // Ensure the ships are in different locations
  while (areLocationsEqual(ship1Location, ship2Location)) {
    ship2Location = generateRandomLocation();
  }

  console.log("Enter a location to strike (e.g., 'A2'): ");
  playGame(ship1Location, ship2Location);
}

// Function to play the game
function playGame(ship1Location, ship2Location) {
  let shipsRemaining = 2;

  while (shipsRemaining > 0) {
    const userInput = readline.question("> ");

    if (!isValidLocation(userInput)) {
      console.log("Invalid input. Please enter a valid location (e.g., 'A2'): ");
      continue;
    }

    if (areLocationsEqual(userInput, ship1Location) || areLocationsEqual(userInput, ship2Location)) {
      shipsRemaining--;
      console.log(`Hit! You have sunk a battleship. ${shipsRemaining} ship(s) remaining.`);
    } else {
      console.log("You have missed!");
    }
  }

  console.log("You have destroyed all battleships. Would you like to play again? (Y/N)");
  const playAgain = readline.question("> ").toUpperCase();

  if (playAgain === 'Y') {
    initializeGame();
  } else {
    console.log("Thanks for playing. Goodbye!");
    process.exit(0);
  }
}

// Start the game
initializeGame();
