import {useRouter} from 'next/router';
import useSWR from 'swr';

async function fetcher(url) {
    const res = await fetch(url);
    const json = await res.json();
    return json;
}

export default function OneMovie() {
    const router = useRouter();
    const { id } = router.query;
    const { data, error } = useSWR(`http://www.omdbapi.com/?apikey=e0dda065&i=${id}`, fetcher);

    if (error) return <div>Falha na requisição</div>
    if (!data) return <div>Carregando...</div>

    return (
        <div>
            <h1>{data.Title} ({data.Year})</h1>
            <img src={data.Poster} alt={data.Title} />
            <p>{data.Plot}</p>
        </div>
    );
};
