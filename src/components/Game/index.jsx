import React, { useEffect, useState } from "react";
import Tile from "../Tile";
import Cell from "../Cell";
import Board from "../../modules/Board";

import "./index.scss";

const Game = () => {
  const SIZE_FILED = 4;
  const [board, setBoard] = useState(new Board(SIZE_FILED));
  const [data, setData] = useState([]);
  const [field] = useState([...Array(SIZE_FILED ** 2)]);

  const handlerKeyDown = (evt) => {
    const { keyCode } = evt;

    if (board.hasWon) {
      return;
    }

    if (keyCode >= 37 && keyCode <= 40) {
      const direction = keyCode - 37;
      setBoard(board.move(direction));
      setData(board?.getTiles);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handlerKeyDown);

    return () => {
      window.removeEventListener("keydown", handlerKeyDown);
    };
  }, []);

  useEffect(() => {
    setData(board?.getTiles);
  }, [board]);

  return (
    <div className="relative" style={{ width: `${96 * SIZE_FILED + 8 * SIZE_FILED - 1}px` }}>
      <div className="flex flex-wrap gap-x-2 gap-y-2">
        {field.map((_, index) => (
          <Cell key={index}></Cell>
        ))}
      </div>

      <div className="flex flex-wrap gap-x-2 gap-y-2">
        {data
          ?.filter((tile) => Boolean(tile.value))
          .map((tile, index) => (
            <Tile key={index} tile={tile}></Tile>
          ))}
      </div>
    </div>
  );
};

export default Game;
