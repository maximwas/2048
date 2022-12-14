class Tile {
  constructor(value, row, column) {
    this.value = value || 0;
    this.row = row || -1;
    this.column = column || -1;
    this.oldRow = -1;
    this.oldColumn = -1;
    this.markForDeletion = false;
    this.mergedInto = null;
  }

  moveTo(row, column) {
    this.oldRow = this.row;
    this.oldColumn = this.column;
    this.row = row;
    this.column = column;
  }

  get isNew() {
    return this.oldRow == -1 && !this.mergedInto;
  }

  get hasMoved() {
    return (this.fromRow != -1 && (this.fromRow != this.toRow || this.fromColumn != this.toColumn)) || this.mergedInto;
  }

  get fromRow() {
    return this.mergedInto ? this.row : this.oldRow;
  }

  get fromColumn() {
    return this.mergedInto ? this.column : this.oldColumn;
  }
  
  get toRow() {
    return this.mergedInto ? this.mergedInto.row : this.row;
  }

  get toColumn() {
    return this.mergedInto ? this.mergedInto.column : this.column;
  }
}

export default Tile;