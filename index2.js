const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to build the grid
function buildGrid(size) {
  let grid = [];
  for (let i = 0; i < size; i++) {
    let row = [];
    for (let j = 0; j < size; j++) {
      row.push('_');
    }
    grid.push(row);
  }
  return grid;
}

// Function to generate random ship locations
function generateRandomLocation(size) {
  const row = Math.floor(Math.random() * size);
  const col = Math.floor(Math.random() * size);
  return [row, col];
}

// Function to place ships on the grid
function placeShips(grid, shipSize) {
  const size = grid.length;
  let shipLocations = [];

  for (let i = 0; i < shipSize; i++) {
    let shipLocation;
    do {
      shipLocation = generateRandomLocation(size);
    } while (!isValidLocation(shipLocations, shipLocation, shipSize, size));

    shipLocations.push(shipLocation);
  }

  return shipLocations;
}

// Function to check if ship location is valid
function isValidLocation(shipLocations, newLocation, shipSize, gridSize) {
  const newRow = newLocation[0];
  const newCol = newLocation[1];

  // Check if ship is within grid boundaries
  if (newRow < 0 || newRow >= gridSize || newCol < 0 || newCol >= gridSize) {
    return false;
  }

  // Check if ship intersects with existing ships
  for (let i = 0; i < shipLocations.length; i++) {
    const existingLocation = shipLocations[i];
    const existingRow = existingLocation[0];
    const existingCol = existingLocation[1];

    if (newRow === existingRow && Math.abs(newCol - existingCol) < shipSize) {
      return false;
    }

    if (newCol === existingCol && Math.abs(newRow - existingRow) < shipSize) {
      return false;
    }
  }

  return true;
}

// Function to print the grid
function printGrid(grid) {
  console.log("  A B C D E F G H I J");
  for (let i = 0; i < grid.length; i++) {
    console.log(`${i + 1} ${grid[i].join(' ')}`);
  }
}

// Function to check if all ships are destroyed
function allShipsDestroyed(ships) {
  return ships.every(ship => ship.length === 0);
}

// Initialize game variables
const gridSize = 10;
const shipSizes = [2, 3, 3, 4, 5];
let grid = buildGrid(gridSize);
let ships = [];

// Place ships on the grid
shipSizes.forEach(shipSize => {
  const shipLocations = placeShips(grid, shipSize);
  ships.push(shipLocations);
});

// Start the game
console.log("Press any key to start the game.");
rl.once('line', () => {
  printGrid(grid);
  console.log("Enter a location to strike i.e., 'A2'");
  rl.on('line', (guess) => {
    const row = parseInt(guess.substring(1)) - 1;
    const col = guess.charCodeAt(0) - 65;

    if (row < 0 || row >= gridSize || col < 0 || col >= gridSize) {
      console.log("Invalid guess. Please enter a valid location.");
      return;
    }

    let hit = false;
    ships.forEach(ship => {
      ship.forEach((location, index) => {
        if (location[0] === row && location[1] === col) {
          console.log("Hit! You've sunk a battleship.");
          ship.splice(index, 1);
          hit = true;
        }
      });
    });

    if (!hit) {
      console.log("You have missed!");
    }

    grid[row][col] = hit ? 'X' : 'O';
    printGrid(grid);

    if (allShipsDestroyed(ships)) {
      console.log("Congratulations! You have destroyed all battleships. Would you like to play again? Y/N");
      rl.close();
    }
  });
});