import React, { useEffect } from 'react'

const Card = ({ value, className }) => {

  const getBackgroundColorCard = () => {
    if(value === 0) return 'bg-slate-100 text-slate-100';
    else if(value === 2) return 'bg-slate-400 text-gray-900';
    else if(value === 4) return 'bg-red-300 text-gray-900';
    else if(value === 8) return 'bg-yellow-500 text-gray-900';
    else if(value === 16) return 'bg-orange-400 text-gray-900';
    else if(value === 32) return 'bg-lime-500 text-gray-900';
    else if(value === 64) return 'bg-red-600 text-gray-900';
    else if(value === 128) return 'bg-indigo-600 text-gray-900';
    else if(value === 256) return 'bg-rose-500 text-gray-900';
    else if(value === 512) return 'bg-sky-700 text-gray-900';
    else if(value === 1024) return 'bg-fuchsia-800 text-gray-900';
    else if(value === 2048) return 'bg-rose-900 text-gray-900';
    else if(value > 2048) return 'bg-stone-800 text-gray-900';
  }

  return (
    <div style={{ userSelect: 'none' }} className={`${className} ${getBackgroundColorCard()} card w-24 h-24 flex justify-center items-center text-4xl font-bold rounded-2xl`}>{ value }</div>
  )
}

export default Card