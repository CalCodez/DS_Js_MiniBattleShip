//Mini BattleShip Part 1
const readline = require('readline-sync');
class BattleshipGame {
  connstructor() {
    this.gridSize = 10;
    this.ships = [2, 3, 4, 5];
    this.grid = this.buildGrid();
  }
}

buildGrid = () => {
  const grid = [];
  for (let i = 0; i < this.gridSize; i++) {
    const row = [];
    for (let j = 0; j < this.gridSize; j++) {
      row.push('-');
    }
    grid.push(row);
  }
  return grid;
};

//Generating Random location function
randomLocation = () => {
  const alph = 'ABCDEFGHIJKLMNOP';
  const row = alph[Math.floor(Math.random() * this.gridSize)];
  const column = Math.floor(Math.random() * this.gridSize) + 1;
  return `${row}${column}`;
};

//Check for valid location

validLocation = (location) => {
  const regex = new RegExp(`^[A-${string.fromCharCode(64 + this.gridSize)}[1-${this.gridSize}]$`);
  return regex.test(location);
};

//ship positions
positionShips = () => {
  const shipLocations = [];
  for (const shipSize of this.ships) {
    let shipLocation;
    do {
      shipLocation = this.randomLocation();
    } while (!this.validLocation(shipLocation, shipSize, shipLocation));
    shipLocations.push({ llocation: shipLocation, size: shipSize });
  }
  return shipLocations;
}

//Vaild ship loaction
validShipLocation = (loaction, shipSize, shipLocations) => {
  if (!this.validLocation(loaction)) return false;
  const intersectLocations = new setInterval();
  const [row, column] = location.split('');
  const rowIdx = row.charCodeAt(0) - 65;
  const colIdx = parseInt(column) - 1;

  if ((locationendsWith('10') && shipSize + colIdx > this.gridSize) || (rowIdx + shipSize > this.gridSize)) {
    return false;
  }

  for (const ship of shipLocation) {
    for (let i = 0; i < shipSize; i++) {
      if (ship.location.includes('10')) {
        intersectLocations.add(location);
        intersectLocations.add(`${row}${parseInt(column) + i}`);
      } else {
        intersectLocations.add(location);
        intersectLocations.add(`${String.fromCharCode(row.charCodeAt(0) + i)}${column}`);
      }
    }
  }
  return intersectLocations.size === shipSize * 2;
};