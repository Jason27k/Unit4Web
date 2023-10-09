import React from 'react'
import { Button } from './ui/button'

function BannedItems({bannedTitles, bannedGenres, lowestVoteAverage, 
                    lowestVoteCount, genres, handleTitleUnban, handleRatingUndo,
                    handleVoteCountUndo, handleGenreUnban}) {
    
    return (
      <div className="bg-slate-300 w-4/5 h-screen overflow-hidden flex flex-col items-center">
          <h2 className="text-2xl font-bold text-center m-8">Ban List</h2>
          <h3 className="text-lg font-bold text-center my-2">Select an item to unban it</h3>
            <Button className='text-xl mb-2' onClick={handleRatingUndo}>
              Rating: &gt;= {lowestVoteAverage == 0? lowestVoteAverage.toFixed(1).toString() + " (DEFAULT)" : lowestVoteAverage.toFixed(1).toString()}
            </Button>
            <Button className='text-xl mb-2' onClick={handleVoteCountUndo}>
              Votes: &gt;= {lowestVoteCount.toString()}
            </Button>
            {bannedTitles.map((title, index) => (
               <Button className='text-xl mb-2' key={index} onClick={() => handleTitleUnban(index)}>
                {title}
               </Button>
            ))}
            {bannedGenres.map((genre, index) => (
               <Button className='text-xl mb-2' key={index} onClick={() => handleGenreUnban(index)}>
                {genre == 27 || genre == 53? genres[genre] + " (DEFAULT)" : genres[genre]}
               </Button>
            ))}
      </div>
    )
  }

export default BannedItems