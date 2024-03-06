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
}