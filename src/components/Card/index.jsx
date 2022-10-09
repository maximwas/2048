import React, { useEffect, memo } from 'react'

const Card = ({ tile }) => {
  const getBackgroundColorCard = () => {
    if(tile.value === 2) return 'bg-slate-400 text-gray-900';
    else if(tile.value === 4) return 'bg-red-300 text-gray-900';
    else if(tile.value === 8) return 'bg-yellow-500 text-gray-900';
    else if(tile.value === 16) return 'bg-orange-400 text-gray-900';
    else if(tile.value === 32) return 'bg-lime-500 text-gray-900';
    else if(tile.value === 64) return 'bg-red-600 text-gray-900';
    else if(tile.value === 128) return 'bg-indigo-600 text-gray-900';
    else if(tile.value === 256) return 'bg-rose-500 text-gray-900';
    else if(tile.value === 512) return 'bg-sky-700 text-gray-900';
    else if(tile.value === 1024) return 'bg-fuchsia-800 text-gray-900';
    else if(tile.value === 2048) return 'bg-rose-900 text-gray-900';
    else if(tile.value > 2048) return 'bg-stone-800 text-gray-900';
  }

  const getClasses = () => {
    const classArray = ['tile'];

    if (!tile.mergedInto) {
      classArray.push('position-' + tile.row + '-' + tile.column);
    }
    if (tile.mergedInto) {
      classArray.push('merged');
    }
    if (tile.isNew) {
      classArray.push('new');
    }
    if (tile.hasMoved) {
      classArray.push('row-from-' + tile.fromRow + '-to-' + tile.toRow);
      classArray.push('column-from-' + tile.fromColumn + '-to-' + tile.toColumn);
      classArray.push('isMoving');
    }
    return classArray.join(' ');
  } 

  return (
    <div style={{ userSelect: 'none' }} className={`${getClasses()} ${getBackgroundColorCard()} absolute top-0 w-24 h-24 flex justify-center items-center text-4xl font-bold rounded-2xl`}>{ tile.value }</div>
  )
}

export default Card;