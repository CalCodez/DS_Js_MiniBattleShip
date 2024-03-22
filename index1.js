const readline = require('readline-sync');

const col = [1, 2, 3];
const row = 'ABC';
let grid = [];
let attatcks = [];

//Initialize Grid
function initGrid() {
  for (let i = 0; i < row.length; i++) {
    grid[i] = [];
    for (let j = 0; j < col.length; j++) {
      grid[i][j] = ' ';
    }
  }
}

//Generate Board Location
function randoLoc(arg1, arg2) {
  const index1 = Math.floor(Math.random() * row.length);
  const index2 = Math.floor(Math.random() * col.length);
  return row[index1] + col[index2];
}

function validLocation(location) {
  const regex = /^[A-C][1-3]$/;
  return regex.test(location);
}

function equalLoc(loc1, loc2) {
  return loc1.toUpperCase() === loc2.toUpperCase();
}

function initGame() {
  initGrid();
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
    console.log("  1 2 3");
    for (let i = 0; i < grid.length; i++) {
      process.stdout.write(row[i] + ' ');
      for (let j = 0; j < grid[i].length; j++) {
        process.stdout.write(grid[i][j] + ' ');
      }
      console.log('');
    }
    const userInput = readline.question("> ").toUpperCase();
    if (!attatcks.includes(userInput)) {
      attatcks.push(userInput);
    } else {
      console.log('You have already used this location');
      continue;
    }

    if (!validLocation(userInput)) {
      console.log(`INVALID INPUT! ENTER VALID LOCATION ex: "B2, C3"`);
      continue;
    }
    const rowIdx = row.indexOf(userInput[0].toUpperCase());
    const colIdx = parseInt(userInput.slice(1)) - 1;
    if (equalLoc(userInput, ship1) || equalLoc(userInput, ship2)) {
      shipsRemaining--;
      grid[rowIdx][colIdx] = 'X'; // Hit
      console.log(`HIT! You have sunk a battleship. ${shipsRemaining} ships remaining.`);
    } else {
      grid[rowIdx][colIdx] = 'O'; // Miss
      console.log(`MISSED! Try again.`)
    }
  }
  console.log(`You have destroyed all battleships. Would you like to play again?(Y/N)`);
  const playAgain = readline.question(`>`).toUpperCase();
  if (playAgain === 'Y') {
    initGame();
  } else {
    console.log(`Thanks for playing. Goodbye!`)
    process.exit(0);
  }

}

initGame();