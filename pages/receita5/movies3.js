import useSWR from 'swr';
import {useState} from 'react';
import Link from 'next/link';

export default function Movies3(){
    const [url, setUrl] = useState('');
    const {data, error} = useSWR(url, theFetcher);
    const onClickHandler = (e) => {
        e.preventDefault();
        if (url === '') setUrl('http://www.omdbapi.com/?apikey=e0dda065&s=bagdad')
        else setUrl('');
    };

    return (
        <div>
            <TheLink url={url} handler={onClickHandler}/>
            <TheMovies data={ error?{error:'Erro na pesquisa'}: data ? data: {Search:''} } show={url !== ''}/>
        </div>
    );
};

export function TheMovies({data,show}){
    if (!show) return (<div></div>);
    if (data.error) return (<div>falha na requisição</div>);
    if (data.Search === '' ) return (<div>carregando...</div>);

    return (
        <div>
            { data.Search.map( (m) =>
                <div key={m.imdbID}>
                    <Link href={`/onemovie/${m.imdbID}`}>
                        {m.Title} --- {m.Year}
                    </Link>
                </div>  
            ) }            
        </div>
    );
};

async function theFetcher(url) {
    if (url === null || url === '') return {Search:''};
    const res = await fetch(url);
    const json = await res.json();
    return json;
};

export function TheLink({url, handler}){    
    return (
        <div>
            <a href="/movies3.js" onClick={handler}> {url === '' ? 'Mostrar' : 'Ocultar'} </a>
        </div>
    );
};
