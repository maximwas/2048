import _ from "lodash";
import Tile from './Tile';

let rotateLeft = function (matrix) {
  let rows = matrix.length;
  let columns = matrix[0].length;
  let res = [];
  for (let row = 0; row < rows; ++row) {
    res.push([]);
    for (let column = 0; column < columns; ++column) {
      res[row][column] = matrix[column][columns - row - 1];
    }
  }
  return res;
};

class Board {
  #deltaX = [-1, 0, 1, 0];
  #deltaY = [0, -1, 0, 1];

  constructor(size) {
    this.size = size;
    this.tiles = [];
    this.cells = [];
    this.#fillTile();
    this.#addRandomTile();
    this.setPositions();
    this.won = false;
  }

  #fillTile() {
    for (let i = 0; i < this.size; ++i) {
      const tiles = [];
      for (let j = 0; j < this.size; ++j) {
        tiles.push(this.#addTile())
      }
      this.cells.push(tiles)
    }
  }

  #addTile(value = 0, row = 0, column = 0) {
    let res = new Tile(value, row, column);
    this.tiles.push(res);

    return res;
  }

  #addRandomTile() {
    let emptyCells = [];
    for (let r = 0; r < this.size; ++r) {
      for (let c = 0; c < this.size; ++c) {
        if (this.cells[r][c].value == 0) {
          emptyCells.push({r: r, c: c});
        }
      }
    }
    let index = ~~(Math.random() * emptyCells.length);
    let cell = emptyCells[index];
    let newValue = Math.random() < Board.fourProbability ? 4 : 2;
    this.cells[cell.r][cell.c] = this.#addTile(newValue);
  }

  setPositions = function () {
    this.cells.forEach((row, rowIndex) => {
      row.forEach((tile, columnIndex) => {
        tile.oldRow = tile.row;
        tile.oldColumn = tile.column;
        tile.row = rowIndex;
        tile.column = columnIndex;
        tile.markForDeletion = false;
      });
    });
  }

  moveLeft() {
    let hasChanged = false;
    for (let row = 0; row < this.size; ++row) {
      const currentRow = this.cells[row].filter(tile => tile.value != 0);
      const resultRow = [];
      for (let target = 0; target < this.size; ++target) {
        let targetTile = currentRow.length ? currentRow.shift() : this.#addTile();
        if (currentRow.length > 0 && currentRow[0].value == targetTile.value) {
          let tile1 = targetTile;
          targetTile = this.#addTile(targetTile.value);
          tile1.mergedInto = targetTile;
          let tile2 = currentRow.shift();
          tile2.mergedInto = targetTile;
          targetTile.value += tile2.value;
        }
        resultRow[target] = targetTile;
        this.won |= (targetTile.value == 2048);
        hasChanged |= (targetTile.value != this.cells[row][target].value);
      }
      this.cells[row] = resultRow;
    }
    return hasChanged;
  }

  move(direction) {
    this.clearOldTiles();
    for (let i = 0; i < direction; ++i) {
      this.cells = rotateLeft(this.cells);
    }
    let hasChanged = this.moveLeft();
    for (let i = direction; i < 4; ++i) {
      this.cells = rotateLeft(this.cells);
    }
    if (hasChanged) {
      this.#addRandomTile();
    }
    this.setPositions();
    return this;
  }

  clearOldTiles() {
    this.tiles = this.tiles.filter(tile => tile.markForDeletion == false);
    this.tiles.forEach(tile => { tile.markForDeletion = true; });
  }

  get hasWon() {
    return this.won;
  }

  get getTiles() {
    return this.tiles;
  }

  hasLost() {
    let canMove = false;
    for (let row = 0; row < this.size; ++row) {
      for (let column = 0; column < this.size; ++column) {
        canMove |= (this.cells[row][column].value == 0);
        for (let dir = 0; dir < 4; ++dir) {
          let newRow = row + this.#deltaX[dir];
          let newColumn = column + this.#deltaY[dir];
          if (newRow < 0 || newRow >= this.size || newColumn < 0 || newColumn >= this.size) {
            continue;
          }
          canMove |= (this.cells[row][column].value == this.cells[newRow][newColumn].value);
        }
      }
    }
    return !canMove;
  }
}

export default Board;