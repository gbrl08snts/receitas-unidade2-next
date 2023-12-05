import { useRouter } from 'next/router';
import useSWR from 'swr';

export default function Movie() {
    const router = useRouter();
    const { id } = router.query;
    const { data, error } = useSWR(id ? `http://www.omdbapi.com/?apikey=e0dda065&i=${id}` : null, fetcher);

    if (error) return <div>falha na requisição...</div>
    if (!data) return <div>carregando...</div>

    return (
        <div>
            <h1>{data.Title} ({data.Year})</h1>
            <img src={data.Poster} alt={data.Title} />
            <p>{data.Plot}</p>
        </div>
    );
};

async function fetcher(url) {
    const response = await fetch(url);
    const json = await response.json();
    return json;
};
