import React, { useEffect, useState } from 'react'
import Card from './components/Card';
import Game from "./modules/Game"

function App() {
  const [ game, setGame ] = useState();
  const [ data, setData ] = useState([]);
  const [ count, setCount ] = useState(4);
  const [field , setField] = useState([...Array(count ** 2)])

  useEffect(() => {
    setGame(new Game(count));
  }, [])

  useEffect(() => {
    game?.start();
    setData(game?.getData)
  }, [game])

  return (
    <div className='relative' style={{ width: `${96 * count + 8 * count - 1}px`}}>
      <div className='flex flex-wrap gap-x-2 gap-y-2'>
        { field.map((_, index) => <Card key={index} value={0}></Card>) }
      </div>
      <div>
        { data?.map((tile, index) => <Card key={index} className={`absolute top-0 lef[3px] position-${tile.x}-${tile.y}`} value={tile.value}></Card>) }
      </div>
    </div>
  );
}

export default App;
