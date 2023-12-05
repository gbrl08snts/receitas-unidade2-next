import useSWR from 'swr';
import Link from 'next/link';

export default function Movies2(){
    const {data, error} = useSWR(`http://www.omdbapi.com/?apikey=e0dda065&s=bagdad`, fetcher);
    if (error) return <div>falha na requisição...</div>
    if (!data) return <div>carregando...</div>

    return (
        <div>
            { data.Search.map( (m) => (
                <div key={m.imdbID}>
                    <Link href={`/movie/${m.imdbID}`}>
                        <span>{m.Title} --- {m.Year}</span>
                    </Link>
                </div>
            ))}
        </div>
    );  
};

async function fetcher(url) {
    const response = await fetch(url);
    const json = await response.json();
    return json;
};
