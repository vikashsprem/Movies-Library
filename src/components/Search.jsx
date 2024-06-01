import React from 'react';
import './Search.css';
import { useState } from 'react';
import { useEffect } from 'react';

const Search = ({ movies }) => {

    const [movieDetails, setMovieDetails] = useState(null);
    useEffect(() => {
        if (movies) {
            setMovieDetails(movies);
        }
    }, [movies]);

    if (!movieDetails) {
        return null;
    }

    return (
        <>
            <div className="search-container">
                <div className="search-header">
                    <h1 className="title">{movieDetails.Title}</h1>
                </div>
                <div className='mb-2'>
                    <span className="year">{movieDetails.Released} </span>
                    <span> • </span>
                    <span className="runtime">{movieDetails.Rated}</span>
                    <span> • </span>
                    <span className="runtime">{movieDetails.Runtime}</span>
                </div>
                <div className="poster-section">
                    <div className='md:w-1/3 w-full'>
                        <img className="poster" src={movieDetails.Poster} alt={movieDetails.Title} />
                        <div className="poster-details flex gap-1">
                            <p className='details-item'>{movieDetails.Language}</p>
                            <p className='details-item'>{movieDetails.Genre}</p>
                            <p className='details-item'><strong>Awards: </strong> {movieDetails.Awards}</p>
                        </div>
                    </div>

                    <div className="details-section">
                        <div className="rating-section">
                            <span className="imdb-rating">{movieDetails.imdbRating}/10</span>
                            <span className="votes">({movieDetails.imdbVotes} votes)</span>
                        </div>
                        <p className="plot">{movieDetails.Plot}</p>
                        <div className="details">
                            <p><strong>Director:</strong> {movieDetails.Director}</p>
                            <p><strong>Writers:</strong> {movieDetails.Writer}</p>
                            <p><strong>Stars:</strong> {movieDetails.Actors}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Search;