import _ from "lodash";
import Tile from './Tile';

class Board {
  constructor(size) {
    this.size = size;
    this.tiles = [];
    this.cells = [];
    this.won = false;

    this.#fillTile();
    this.#addRandomTile();
    this.#setPositions();
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
    const range = _.range(2, 6, 2);
    const number = range[_.random(0, 1)];

    while(true) {
      const col = _.random(0, this.size - 1);
      const row = _.random(0, this.size - 1);

      if(!this.cells[col][row].value) {
        this.cells[col][row] = this.#addTile(number);
        break;
      }
    }
  }

  #setPositions() {
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

  #moveLeft() {
    let hasChanged = false;

    for (let row = 0; row < this.size; ++row) {
      const currentRow = this.cells[row].filter(tile => tile.value !== 0);
      const resultRow = [];
      for (let target = 0; target < this.size; ++target) {
        let targetTile = currentRow.length ? currentRow.shift() : this.#addTile();
        if (currentRow.length > 0 && currentRow[0].value === targetTile.value) {
          const tile1 = targetTile;
          targetTile = this.#addTile(targetTile.value);
          tile1.mergedInto = targetTile;
          const tile2 = currentRow.shift();
          tile2.mergedInto = targetTile;
          targetTile.value += tile2.value;
        }
        resultRow[target] = targetTile;
        this.won |= (targetTile.value === 65536);
        hasChanged |= (targetTile.value !== this.cells[row][target].value);
      }
      this.cells[row] = resultRow;
    }

    return hasChanged;
  }

  #rotateLeft(matrix) {
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

  move(direction) {
    this.#clearOldTiles();

    for (let i = 0; i < direction; ++i) {
      this.cells = this.#rotateLeft(this.cells);
    }

    let hasChanged = this.#moveLeft();
    for (let i = direction; i < this.size; ++i) {
      this.cells = this.#rotateLeft(this.cells);
    }

    if (hasChanged) {
      this.#addRandomTile();
    }

    this.#setPositions();

    return this;
  }

  #clearOldTiles() {
    this.tiles = this.tiles.filter(tile => tile.markForDeletion == false);
    this.tiles.forEach(tile => { tile.markForDeletion = true; });
  }

  get hasWon() {
    return this.won;
  }

  get getTiles() {
    return this.tiles;
  }
}

export default Board;