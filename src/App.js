import React, { useEffect, useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Card from "./components/Card";
import Board from "./modules/Board";

function App() {
  const [board, setBoard] = useState(new Board(4));
  const [data, setData] = useState([]);
  const [field, setField] = useState([...Array(4 ** 2)]);

  const keyBoard = (evt) => {
    const { keyCode  } = evt;

    if (board.hasWon) {
      return;
    }

    if (keyCode >= 37 && keyCode <= 40) {
      const direction = keyCode - 37;
      setBoard(board.move(direction))
      setData(board?.getTiles);
    }
  };

  useEffect(() => {
    console.log(1)
    setData(board?.getTiles);
    window.addEventListener("keydown", keyBoard);
  }, [board]);

  return (
    <div className="relative" style={{ width: `${96 * 4 + 8 * 4 - 1}px` }}>
      <div className="flex flex-wrap gap-x-2 gap-y-2">
        {field.map((_, index) => (
          <div className="w-24 h-24 flex justify-center items-center text-4xl font-bold rounded-2xl bg-slate-100 text-slate-100" key={index} ></div>
        ))}
      </div>

      <div className="flex flex-wrap gap-x-2 gap-y-2">
        {data?.filter(tile => Boolean(tile.value)).map((tile, index) => (
          <Card key={index} tile={tile}></Card>
        ))}
      </div>
    </div>
  );
}

export default App;
