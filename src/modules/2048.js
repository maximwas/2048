import _ from "lodash"

class _2048 {
  #size = 4;
  #defaultValue = 0;

  constructor(size = 4) {
    this.#size = size;
    this.field = this.#fillField();
    this.sum = 0; 
  }

  #getField(className = '', value = 0) {
    return {
      className: className,
      value: value,
    }
  }

  #randomNumber() {
    const range = _.range(2, 6, 2);
    
    return range[_.random(0, 1)];
  }

  #fillField() {
    this.#randomNumber();
    const arr1 = []
    for(let col = 0; col < this.#size; col++) {
      let arr = [];

      for(let row = 0; row < this.#size; row++) {
        arr.push(this.#getField())
      }

      arr1[col] = arr
    }

    const col1 = _.random(0, this.#size - 1)
    const col2 = _.random(0, this.#size - 1)
    const row1 = _.random(0, this.#size - 1)
    const row2 = _.random(0, this.#size - 1)

    arr1[col1][row1] = this.#getField(`position-${col1}-${row1}`, this.#randomNumber());
    arr1[col2][row2] = this.#getField(`position-${col2}-${row2}`, this.#randomNumber());

    return arr1;
  }

  #addNumber() {
    while(true) {
      const col = _.random(0, this.#size - 1);
      const row = _.random(0, this.#size - 1);

      if(!this.field[col][row].value) {
        this.field[col][row] = this.#getField(`position-${col}-${row} bubble`, this.#randomNumber());
        break;
      }

      if(this.field.flat().every(({ value }) => Boolean(value))) break;
    }
  }

  #shiftTop() {
    for(let i = this.#size - 1; i >= 0; i--) {
      if(i === 0) {
        break;
      }

      for(let j = 0; j < this.#size; j++) {
        if (this.field[i][j].value === this.#defaultValue) continue;
        else if (this.field[i - 1][j].value === this.#defaultValue) {
          this.field[i - 1][j] = this.#getField(`position-${i - 1}-${j}`, this.field[i][j].value);
          this.field[i][j] = this.#getField();
        }
      }
    }
  }

  #shiftDown() {
    for(let i = 0; i < this.#size; i++) {
      if(i === this.#size - 1) {
        break;
      }

      for(let j = 0; j < this.#size; j++) {
        if (this.field[i][j].value === this.#defaultValue) continue;
        else if (this.field[i + 1][j].value === this.#defaultValue) {
          this.field[i + 1][j] = this.#getField(`position-${i + 1}-${j}`, this.field[i][j].value);
          this.field[i][j] = this.#getField();
        }
      }
    }
  }

  #shiftRight() {
    for(let i = 0; i < this.#size; i++) {
      for(let j = 0; j < this.#size; j++) {
        if(j === this.#size - 1) {
          break;
        }

        if (this.field[i][j].value === this.#defaultValue) continue;
        else if (this.field[i][j + 1].value === this.#defaultValue) { 
          this.field[i][j + 1] = this.#getField(`position-${i }-${j + 1}`, this.field[i][j].value);
          this.field[i][j] = this.#getField();
        }
      }
    }
  }

  #shiftLeft() {
    for(let i = 0; i < this.#size; i++) {
      for(let j = this.#size - 1; j >= 0; j--) {
        if(j === 0) {
          break;
        }

        if (this.field[i][j].value === this.#defaultValue) continue;
        else if (this.field[i][j - 1].value === this.#defaultValue) { 
          this.field[i][j - 1] = this.#getField(`position-${i}-${j - 1}`, this.field[i][j].value);
          this.field[i][j] = this.#getField();
        }
      }
    }
  }

  #removeBubble() {
    for(let i = 0; i < this.#size; i++) {
      for(let j = 0; j < this.#size; j++) {
        if (this.field[i][j].className === 'bubble') this.field[i][j] = this.#getField('', this.field[i][j].value);
      }
    }
  }
  
  moveTop() {
    this.#shiftTop();

    for(let i = this.#size - 1; i >= 0; i--) {
      if(i === 0) {
        break;
      }

      for(let j = 0; j < this.#size; j++) {
        if(this.field[i][j].value === this.field[i - 1][j].value && this.field[i][j].value !== this.#defaultValue) { 
          this.field[i - 1][j] = this.#getField(`position-${i - 1}-${j}`, this.field[i][j].value * 2);
          this.sum += this.field[i][j].value * 2;
          this.field[i][j] = this.#getField();
        } else if (this.field[i - 1][j].value === this.#defaultValue) this.#shiftTop();
      }
    }
    
    this.#removeBubble();
    this.#shiftTop();
    this.#addNumber();
  }

  moveDown() {
    this.#shiftDown();

    for(let i = 0; i < this.#size; i++) {
      if(i === this.#size - 1) {
        break;
      }

      for(let j = 0; j < this.#size; j++) {
        if(this.field[i][j].value === this.field[i + 1][j].value && this.field[i][j].value !== this.#defaultValue) { 
          this.field[i + 1][j] = this.#getField(`position-${i + 1}-${j}`, this.field[i][j].value * 2);
          this.sum += this.field[i][j].value * 2;
          this.field[i][j] = this.#getField();
        } else if (this.field[i + 1][j].value === this.#defaultValue) this.#shiftDown();
      }
    }

    this.#removeBubble();
    this.#shiftDown();
    this.#addNumber();
  }

  moveRight() {
    this.#shiftRight();

    for(let i = 0; i < this.#size; i++) {
      for(let j = 0; j < this.#size; j++) {
        if(j === this.#size - 1) {
          break;
        }

        if(this.field[i][j].value === this.field[i][j + 1].value && this.field[i][j].value !== this.#defaultValue) { 
          this.field[i][j + 1] = this.#getField(`position-${i}-${j + 1}`, this.field[i][j].value * 2);
          this.sum += this.field[i][j].value * 2;
          this.field[i][j] = this.#getField();
        } else if (this.field[i][j + 1].value === this.#defaultValue) this.#shiftRight();
      }
    }

    this.#removeBubble();
    this.#shiftRight();
    this.#addNumber();
  }

  moveLeft() {
    this.#shiftLeft();

    for(let i = 0; i < this.#size; i++) {
      for(let j = this.#size - 1; j >= 0; j--) {
        if(j === 0) {
          break;
        }

        if(this.field[i][j].value === this.field[i][j - 1].value && this.field[i][j].value !== this.#defaultValue) { 
          this.field[i][j - 1] = this.#getField(`position-${i}-${j - 1}`, this.field[i][j].value * 2);
          this.sum += this.field[i][j].value * 2;
          this.field[i][j] = this.#getField();
        } else if (this.field[i][j - 1].value === this.#defaultValue) this.#shiftLeft();
      }
    }

    this.#removeBubble();
    this.#shiftLeft();
    this.#addNumber();
  }
}

export default _2048;