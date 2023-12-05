import React, { useState } from 'react';

export default function Movies({ initialData }) {
    const [data, setData] = useState(initialData);
    const [search, setSearch] = useState('');

    const searchMovies = async () => {
        const response = await fetch(`https://www.omdbapi.com/?apikey=e0dda065&s=${search}`);
        if (response.ok) {
            const newData = await response.json();
            setData(newData);
        } else {
            console.error('Response from OMDB API was not ok');
        }
    };

    const renderMovies = () => {
        return data.Search.map((movie) => (
            <div key={movie.imdbID}>
                <img src={movie.Poster} alt={movie.Title} />
                <div>{movie.Title} --- {movie.Year}</div>
            </div>
        ));
    };

    return(
        <div>
            <input 
                type="text" 
                value={search} 
                onChange={e => setSearch(e.target.value)} 
                placeholder="Digite uma palavra-chave"
            />
            <button onClick={searchMovies}>Pesquisar</button>
            <div>
                {data.Search && renderMovies()}
            </div>
        </div>
    );    
};

export async function getServerSideProps(context) {
    const response = await fetch("https://www.omdbapi.com/?apikey=e0dda065&s=bagdad");
    if (response.ok) {
        const initialData = await response.json();
        return( { props: { initialData } } );
    } else {
        console.error('Response from OMDB API was not ok');
        return { props: { initialData: {} } };
    }
};
