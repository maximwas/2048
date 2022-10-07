class Tile {
  constructor({ x, y }, value) {
    this.x = x;
    this.y = y;
    this.value = value || 0;
    this.previousPosition = null;
    this.mergedFrom = null;
  }

  savePosition() {
    this.previousPosition = {
      x: this.x,
      y: this.y
    };
  }

  updatePosition({ x, y }) {
    this.x = x;
    this.y = y;
  }

  serialize() {
    return {
      position: {
        x: this.x,
        y: this.y
      },
      value: this.value
    };
  }
}

export default Tile;