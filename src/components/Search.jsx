import { useState, useEffect } from 'react';
import { searchMovies } from '../services/omdb';

export default function Search({ searchTerm }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (searchTerm) {
      searchMovies(searchTerm).then(response => {
        setMovies(response.data.Search);
      }).catch(error => {
        console.error("Error fetching movies:", error);
      });
    }
  }, [searchTerm]);

  return (
    <div className="flex flex-wrap">
      {movies.map(movie => (
        <div key={movie.imdbID} className="max-w-sm rounded overflow-hidden shadow-lg m-2">
          <img className="w-full" src={movie.Poster} alt={movie.Title} />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{movie.Title}</div>
            <p className="text-gray-700 text-base">{movie.Year}</p>
          </div>
          <div className="px-6 pt-4 pb-2">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add to List</button>
          </div>
        </div>
      ))}
    </div>
  );
}
