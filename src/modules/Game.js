import Tile from './Tile';
import _ from "lodash"

class Game {
  constructor(size) {
    this.size = size;
    this.data = [];
    this.score = 0;
    this.gameOver = false;    
    this.gameRunning = true;
    this.status = true;
  }

  get getData() {
    return this.data.flat().filter((tile => Boolean(tile.value)))
  }

  start() {
		this.status = this.gameRunning;

		for(let col = 0; col < 4; col++) { 
			this.data[col] = [];
			for(var row = 0; row < 4; row++) {
				this.data[col][row] = new Tile({ x: col, y: row });
			}
		}

		this.#randomNumber(); 
		this.#randomNumber();
    console.log(this.data)
	}

  #randomNumber() {
    const range = _.range(2, 6, 2);
    const number = range[_.random(0, 1)];

    while(true) {
      const col = _.random(0, this.size - 1);
      const row = _.random(0, this.size - 1);

      if(!this.data[col][row].value) {
        this.data[col][row] = new Tile({ x: col, y: row }, number);
        break;
      }
    }
  }

  moveTop() {
		for(let col = 0; col < this.size; col++){
			this.moveTopInRow(col);
		}
  }

  moveTopInRow(col) {
		for(let row = 0; row < 3; row++){	
			let nextTile = this.#topGetNextInRow(col, row);

			if (nextTile !== -1) {
				if (this.data[c][r].value === 0) {
					this.data[c][r] = this.data[nextTile][r];
					this.data[nextTile][r] = new Tile({ x: col, y: row });
					c++;
				}
				else if (this.mydata[c][r] == this.mydata[nextc][r]) {
					this.mydata[c][r] *=2;
					this.mydata[nextc][r] =0;
					this.score += this.mydata[c][r];
				}
			}
			else {
				break;
			}
		}
	}

  #topGetNextInRow(col, row) {
		for(let index = row + 1; index < 4; index++){
			if (this.mydata[index][col].value !== 0) {
				return index;
			}
		}
    
		return -1;
	}
}

export default Game;