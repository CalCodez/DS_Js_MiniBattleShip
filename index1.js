const readline = require('readline-sync');

const col = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const row = 'ABCDEFGHIJ';
//Generate Board Location
function randoLoc(arg1, arg2) {
  const index1 = Math.floor(Math.random() * row.length);
  const index2 = Math.floor(Math.random() * col.length);
  return row[index1] + col[index2];
}


function validLocation(location) {
  const regex = /^[A-J][1-9]$/;
  return regex.test(location);
}

function equalLoc(loc1, loc2) {
  return loc1.toUpperCase() === loc2.toUpperCase();
}

function initGame() {
  console.log("Press any key to start the game.");
  readline.keyInPause();

  let ship1 = randoLoc();
  let ship2 = randoLoc();

  while (equalLoc(ship1, ship2)) {
    ship2 = randoLoc();
  }

  console.log(`Enter a strike Location ex: "A2" `);
  playGame(ship1, ship2);
}

function playGame(ship1, ship2) {
  let shipsRemaining = 2;

  while (shipsRemaining > 0) {
    const userInput = readline.question("> ");
    if (!validLocation(userInput)) {
      console.log(`INVALID INPUT! ENTER VALID LOCATION ex: "B2, C3"`);
      continue;
    }
    if (equalLoc(userInput, ship1) || equalLoc(userInput, ship2)) {
      shipsRemaining--;
      console.log(`HIT! You have sunk a battleship. ${shipsRemaining} ships remaining.`);
    } else {
      console.log(`MISSED! Try again.`)
    }
  }
  console.log(`You have destroyed all battleships. Would you like to play again?(Y/N)`);
  const playAgain = readline.question(`>`).toUpperCasse();
  if (playAgain === 'Y') {
    initGame();
  } else {
    console.log(`Tahnks for playing. Goodbye!`)
    process.exit(0);
  }

}

initGame();
