import React from 'react'

function PreviousMovies({previousMovies}) {
  const reversePreviousMovies = previousMovies.slice().reverse();
  return (
    <div className="bg-slate-300 h-4/5 w-3/4 overflow-hidden my-auto">
        <h2 className="text-2xl font-bold text-center mt-7">What movies have we seen so far?</h2>
        {reversePreviousMovies.map((movie, index) => (
            <div className="flex flex-col items-center my-1" key={index}>
                <img src={movie.poster} alt={movie.title} className="h-20" />
                <p className='text-center'>{movie.title}</p>
             </div>
        ))}
    </div>
  )
}

export default PreviousMovies