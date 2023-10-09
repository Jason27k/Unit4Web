import React, { useEffect, useState } from "react";
import axios from 'axios';
import MoviePresenter from "./components/MoviePresenter";
import { Button } from './components/ui/button'
import PreviousMovies from "./components/PreviousMovies";
import { Alert, AlertDescription, AlertTitle } from "./components/ui/alert"
import BannedItems from "./components/BannedItems";

const App = () => {
  var genres = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Science Fiction",
    10770: "TV Movie",
    53: "Thriller",
    10752: "War",
    37: "Western"
  };

  const [poster, setPoster] = useState(null);
  const [genreList, setGenreList] = useState([]);
  const [title, setTitle] = useState('');
  const [voteAverage, setVoteAverage] = useState(0);
  const [voteCount, setVoteCount] = useState(0);
  const [page, setPage] = useState(1);
  const [previousMovies, setPreviousMovies] = useState([]);
  const [showNoMoreMoviesAlert, setShowNoMoreMoviesAlert] = useState(false);

  const [bannedGenreList, setBannedGenreList] = useState([27, 53]);
  const [bannedTitleList, setBannedTitleList] = useState([]);
  const [lowestVoteAverage, setLowestVoteAverage] = useState(0);
  const [lowestVoteCount, setLowestVoteCount] = useState(200);
  
  useEffect(() => {
    getMovie();
  }, [previousMovies]); 

  const getMovie = async () => {
    try {
      const options = {
        method: 'GET',
        url:  'https://api.themoviedb.org/3/discover/movie?' +
              '&certification.lte=PG-13'+
              '&certification_country=US'+
              '&include_adult=false'+
              '&include_video=false'+
              '&language=en-US'+
              `&page=${page}`+
              '&primary_release_date.gte=2018-01-01'+
              '&sort_by=vote_count.asc'+
              '&with_original_language=en'+
              `&without_genres=${bannedGenreList.join(",")}`+
              `&vote_average.gte=${lowestVoteAverage}`+
              `&vote_count.gte=${lowestVoteCount}`,
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZDk0YmFjOTM2YmNhODdjOTJhNTY4MmUwOTAwMDQ3OCIsInN1YiI6IjY1MjIwNmQ5OTVjMGFmMDExZDVjYWJmYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.85wGwO_ra0lye0v2DbZO7HZ_HfTfmPZZj-CKN070jrs'
        }
      };
      const response = await axios.request(options);
      console.log(response.data);
      console.log(options.url);
      const filteredResults = response.data.results.filter((value) => !bannedTitleList.includes(value.title))
      console.log(filteredResults.length);
      console.log(response.data.total_pages > page);
      if (filteredResults.length == 0) {
        if (response.data.total_pages > page) {
          setPage(page + 1);
          return;
        } else {
          throw new Error("No more movies");
        }
      }
      const newIndex = Math.floor(Math.random() * filteredResults.length);
      setPoster(`https://image.tmdb.org/t/p/w500/${filteredResults[newIndex].poster_path}`);
      setGenreList(filteredResults[newIndex].genre_ids);
      setTitle(filteredResults[newIndex].title);
      setVoteCount(filteredResults[newIndex].vote_count);
      setVoteAverage(filteredResults[newIndex].vote_average);
    } catch (error) {
      setShowNoMoreMoviesAlert(true);
    }
  }
  
  const handleTitleClick = () => {
    if (bannedTitleList.includes(title)) {
      return;
    }
    setBannedTitleList([...bannedTitleList, title]);
  }
  
  const handleRatingClick = () => {
    setLowestVoteAverage(voteAverage+0.1);
  }
  
  const handleVoteCountClick = () => {
    setLowestVoteCount(voteCount+1);
  }
  
  const handleGenreClick = (index) => {
    if(bannedGenreList.includes(genreList[index])) {
      return;
    }
    setBannedGenreList([ ...bannedGenreList, genreList[index]]);
  }

  const handleDiscoverClick = () => {
    setPreviousMovies([ ...previousMovies, {title: title, poster: poster}]);
  }
  
  const handleRatingUndo = () => {
    setLowestVoteAverage(0);
  }
  
  const handleVoteCountUndo = () => {
    setLowestVoteCount(200);
  }

  const handleTitleUnban = (index) => {
    setBannedTitleList(bannedTitleList.filter((_, i) => i !== index));
  }
  
  const handleGenreUnban = (index) => {
    if(index > 1) {
      setBannedGenreList(bannedGenreList.filter((_, i) => i !== index));
    }
  }

  const resetOptions = () => {
    setBannedGenreList([27, 53]);
    setBannedTitleList([]);
    setLowestVoteAverage(0);
    setLowestVoteCount(200);
    setPage(1);
  };


  return (
    <div className="grid grid-cols-4 bg-slate-800">
      <div className="h-screen flex flex-row items-center justify-start">
        <PreviousMovies previousMovies={previousMovies}/>
      </div>
      <div className="flex flex-col justify-center items-center bg-slate-600 col-span-2 h-2/3 my-auto rounded-md shadow-lg shadow-slate-600/50">
        <h1 className="text-6xl font-bold text-white mb-4 text-center">Movie Roulette</h1>
        <h2 className="text-xl font-bold text-white mb-4 text-center">What movie should we watch?</h2>
        <h3 className="text-lg font-bold text-white mb-4 text-center">
          Click on the title, ratings, votes, or genres to block them and see something new
        </h3>
        <MoviePresenter genres={genres} genreList={genreList} voteCount={voteCount}
                        title={title} voteAverage={voteAverage} handleVoteCountClick={handleVoteCountClick}
                        handleGenreClick={handleGenreClick} handleTitleClick={handleTitleClick} 
                        handleRatingClick={handleRatingClick} />
        <img src={poster} alt="" className="h-1/2 mt-2"/>
        <Button className="mt-2 text-xl" onClick={handleDiscoverClick}>Discover</Button>
      </div>
      <div className="h-screen flex flex-row items-center justify-end">
        <BannedItems bannedTitles={bannedTitleList} bannedGenres={bannedGenreList} 
                    lowestVoteCount={lowestVoteCount} lowestVoteAverage={lowestVoteAverage} genres={genres}
                    handleTitleUnban={handleTitleUnban} handleRatingUndo={handleRatingUndo}
                    handleVoteCountUndo={handleVoteCountUndo} handleGenreUnban={handleGenreUnban}/>
      </div>
      {showNoMoreMoviesAlert && (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-700 bg-opacity-50 z-50">
          <Alert variant="destructive" className="bg-white w-1/3">
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
              There are no more movies that match your criteria. Resetting Criteria.
            </AlertDescription>
            <button
              onClick={() => {
                setShowNoMoreMoviesAlert(false);
                resetOptions();
              }}
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full focus:outline-none"
            >
              OK, Got It!
            </button>
          </Alert>
        </div>
      )}
    </div>
    
  );
};

export default App;