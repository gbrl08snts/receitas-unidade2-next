import React, { useState } from 'react';      
import useSWR from 'swr';                       

async function fetchData(url) {
    const response = await fetch(url);
    return response.json();
};

function MovieDetails({ movie, goBack }) {
    return (
        <div>
            <h1>{movie.Title} ({movie.Year})</h1>
            <img src={movie.Poster} alt={movie.Title} />
            <p>{movie.Plot}</p>
            <button onClick={goBack}>Go Back</button>
        </div>
    );
};

function MovieList({ movies, selectMovie }) {
    return movies.Search.map((movie) => (
        <div key={movie.imdbID}>
            <a href="#" onClick={() => selectMovie(movie.imdbID)}>{movie.Title} --- {movie.Year}</a>
        </div>
    ));
};

function IpInfo({ ip }) {
    return (
        <div>
            <h2>IP Information:</h2>
            <p>IP: {ip.ip}</p>
            <p>Latitude: {ip.latitude}</p>
            <p>Longitude: {ip.longitude}</p>
            <p>City: {ip.city}</p>
        </div>
    );
};

export default function Movies2() {
    const [movieId, setMovieId] = useState(null);

    const { data: movieData, error: movieError } = useSWR("https://www.omdbapi.com/?apikey=e0dda065&s=bagdad", fetchData);
    const { data: singleMovieData, error: singleMovieError } = useSWR(movieId ? `https://www.omdbapi.com/?apikey=e0dda065&i=${movieId}` : null, fetchData);
    const { data: ipData, error: ipError } = useSWR("https://ipapi.co/json", fetchData);

    if (movieError || ipError) return <div>falha na requisição...</div>
    if (!movieData || !ipData) return <div>carregando...</div>

    if (movieId) {
        if (singleMovieError) return <div>falha na requisição...</div>
        if (!singleMovieData) return <div>carregando...</div>
        return <MovieDetails movie={singleMovieData} goBack={() => setMovieId(null)} />;
    }

    return (
        <div>
            <IpInfo ip={ipData} />
            <h2>Filmes:</h2>
            <MovieList movies={movieData} selectMovie={setMovieId} />
        </div>
    );
};
