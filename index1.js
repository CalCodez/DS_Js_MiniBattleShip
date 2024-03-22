const readline = require('readline-sync');
const row = 'ABC';
const col = row.split('').map((_item, index) => index + 1)
let attatcks = [];
let shipsRemaining = 0;

//Initialize Grid
function initGrid(row, col) {
  const grid = [];
  for (let i = 0; i < row.length; i++) {
    grid[i] = [];
    for (let j = 0; j < col.length; j++) {
      grid[i][j] = ' ';
    }
  }
  return grid;
}

//Generate Board Location
function randoLoc(row, col) {
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

function initGame(row, col) {
  const grid = initGrid(row, col);
  console.log("Press any key to start the game.");
  readline.keyInPause();

  let [ship1, ship2] = [1, 2].map((_) => randoLoc(row, col));

  while (equalLoc(ship1, ship2)) {
    ship2 = randoLoc(row, col);
  }

  console.log(`Enter a strike Location ex: "A2" `);
  playGame(ship1, ship2, row, col, grid);
}

//Reset Game Function
const resetGame = () => {
  console.log(`You have destroyed all battleships. Would you like to play again?(Y/N)`);
  const playAgain = readline.keyInYNStrict(`>`);
  if (playAgain) {
    return initGame(row, col);
  } else {
    console.log(`Thanks for playing. Goodbye!`)
    process.exit(0);
  }
}

//Handle Attack Fucntion
const handleAttacks = (userInput, ship1, ship2, grid, rowIdx, colIdx) => {
  if (equalLoc(userInput, ship1) || equalLoc(userInput, ship2)) {
    shipsRemaining--;
    grid[rowIdx][colIdx] = 'X'; // Hit
    console.log(`HIT! You have sunk a battleship. ${shipsRemaining} ships remaining.`);
  } else {
    grid[rowIdx][colIdx] = 'O'; // Miss
    console.log(`MISSED! Try again.`)
  }
}

const handleRepeatedAttacks = (userInput) => {
  if (!attatcks.includes(userInput)) {
    attatcks.push(userInput);
  } else {
    console.log('You have already used this location');
    return false;
  }
  return true;
}

const handleValidLocation = (userInput) => {
  if (!validLocation(userInput)) {
    console.log(`INVALID INPUT! ENTER VALID LOCATION ex: "B2, C3"`);
    return false
  }
  return true;
}


function playGame(ship1, ship2, row, col, grid) {
  shipsRemaining = 2;
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
    const isRepeatedAttack = handleRepeatedAttacks(userInput);
    const isValidAttack = handleValidLocation(userInput);

    if (isRepeatedAttack || !isValidAttack) continue;



    const rowIdx = row.indexOf(userInput[0].toUpperCase());
    const colIdx = parseInt(userInput.slice(1)) - 1;
    handleAttacks(userInput, ship1, ship2, grid, rowIdx, colIdx)

  }


  resetGame();
}

initGame(row, col);