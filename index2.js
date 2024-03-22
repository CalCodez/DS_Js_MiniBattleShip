const readline = require('readline-sync');
const row = 'ABCDEFGHIJ';
const col = row.split('').map((_item, index) => index + 1)
let grid = [];

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
function randoLoc(length) {
  const direction = Math.random() > 0.5 ? 'horizontal' : 'vertical';
  const startRow = Math.floor(Math.random() * row.length);
  const startCol = Math.floor(Math.random() * col.length);
  const shipLocations = [];

  for (let i = 0; i < length; i++) {
    let newRow = startRow;
    let newCol = startCol;
    if (direction === 'horizontal') {
      newCol += i;
    } else {
      newRow += i;
    }
    if (newRow >= row.length || newCol >= col.length) {
      return randoLoc(length);
    }
    shipLocations.push(row[newRow] + col[newCol]);
  }
  return shipLocations;
}

function validLocation(location) {
  const regex = /^[A-J][1-9]$/;
  return regex.test(location);
}

function initGame() {
  initGrid();
  console.log("Press any key to start the game.");
  readline.keyInPause();

  const shipLengths = [2, 3, 3, 4, 5];
  let shipsRemaining = shipLengths.length;
  let ships = [];

  for (let i = 0; i < shipLengths.length; i++) {
    let newShip;
    do {
      newShip = randoLoc(shipLengths[i]);
    } while (shipOverlap(newShip, ships));
    ships.push(newShip);
  }

  console.log(`Enter a strike Location ex: "A2" `);
  playGame(ships);
}

function shipOverlap(newShip, ships) {
  for (const ship of ships) {
    for (const loc of newShip) {
      if (ship.includes(loc)) {
        return true;
      }
    }
  }
  return false;
}

function playGame(ships) {
  let shipsRemaining = ships.length;

  while (shipsRemaining > 0) {
    console.log("  1 2 3 4 5 6 7 8 9 10");
    for (let i = 0; i < grid.length; i++) {
      process.stdout.write(row[i] + ' ');
      for (let j = 0; j < grid[i].length; j++) {
        process.stdout.write(grid[i][j] + ' ');
      }
      console.log('');
    }
    const userInput = readline.question("> ");
    if (!validLocation(userInput)) {
      console.log(`INVALID INPUT! ENTER VALID LOCATION ex: "B2, C3"`);
      continue;
    }
    const rowIdx = row.indexOf(userInput[0].toUpperCase());
    const colIdx = parseInt(userInput.slice(1)) - 1;
    let hit = false;
    for (const ship of ships) {
      if (ship.includes(userInput.toUpperCase())) {
        const locIdx = ship.indexOf(userInput.toUpperCase());
        ship.splice(locIdx, 1);
        hit = true;
        if (ship.length === 0) {
          shipsRemaining--;
          console.log(`HIT! You have sunk a battleship. ${shipsRemaining} ships remaining.`);
        } else {
          console.log(`HIT!`);
        }
        grid[rowIdx][colIdx] = 'X'; // Hit
        break;
      }
    }
    if (!hit) {
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