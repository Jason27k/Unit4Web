import React from 'react'
import { Button } from './ui/button'

function MoviePresenter({ genres, voteCount, genreList, title, voteAverage, handleVoteCountClick, handleGenreClick, handleTitleClick, handleRatingClick}) {
  return (
    <div className='flex flex-col items-center'>
        <Button onClick={handleTitleClick} className='text-xl'>
            {title}
        </Button>
        <div className='flex flex-wrap justify-center gap-2 pt-2'>
        <Button onClick={handleRatingClick} className='text-xl'>
          Rating: {voteAverage}
        </Button>
        <Button onClick={handleVoteCountClick} className='text-xl'>
          Votes: {voteCount}
        </Button>
        {genreList.map(value => genres[value])
          .map((value, index) => <Button key={index} className='text-xl' onClick={()=> handleGenreClick(index)}>{value}</Button>)
        }
      </div>
    </div>
  )
}

export default MoviePresenter;