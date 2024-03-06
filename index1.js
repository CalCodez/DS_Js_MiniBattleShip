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
