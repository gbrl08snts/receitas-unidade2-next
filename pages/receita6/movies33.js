import React, { useState } from 'react';
import useSWR from 'swr';

export default function Movies33(){
    const [state, setState] = useState({url:'', titleSearchString:''});
    const [sortAscending, setSortAscending] = useState(true);
    const {data, error} = useSWR(state.url, async (u) => {
        if (!state.url || !state.titleSearchString) return {Search:[]};
        if (state.url === '' || state.titleSearchString ==='') return {Search:[]};
        const res = await fetch(`${state.url}/?apiKey=e0dda065&s=${state.titleSearchString}`);
        const json = await res.json();
        return json;
    });

    const onSubmitHandler = e => {
        e.preventDefault();
        let s = document.getElementById('titleSearchString').value;
        if (s.trim() === '') {
            alert('O campo é obrigatório');
            return;
        }
        if (state.url === '') {
            setState({url:'http://www.omdbapi.com',titleSearchString:s});
        }
        else setState({url:'',titleSearchString: state.titleSearchString});
    };

    const sortMovies = () => {
        setSortAscending(!sortAscending);
    };

    return (
        <div>

            <TheForm handler={onSubmitHandler}/>
            <TheMovies data={data ? data: {Search:[]} } show={state.url !== ''} sortAscending={sortAscending} sortMovies={sortMovies} />

        </div>
    );
};

export function TheMovies({data,show, sortAscending, sortMovies}){
    if (!show) return (<div></div>);
    if (!data) return (<div></div>);
    if (data.error) return (<div>falha na pesquisa</div>);
    if (!data.Search || data.Search.length === 0 ) return (<div>carregando...</div>);

    const sortedMovies = [...data.Search].sort((a, b) => {
        if (a.Title < b.Title) return sortAscending ? -1 : 1;
        if (a.Title > b.Title) return sortAscending ? 1 : -1;
        return 0;
    });

    return (
        <div>
            <button onClick={sortMovies}>Ordenar por título</button>
            { sortedMovies.map( (m) => <div key={m.imdbID}>{m.Title} --- {m.Year}</div>  ) }           
        </div>
    );
};

export function TheForm({handler}){
    return (
        <div>
            <form onSubmit={handler}>
                <label htmlFor="titleSearchString">Filtro de Título</label>
                <input id="titleSearchString" name="titleSearchString" type="text" autoComplete="true"/>
            </form>
        </div>
    );
};

