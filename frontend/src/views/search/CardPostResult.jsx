import React from 'react'
import { useState, useEffect } from 'react';
import { getSearchResult } from '../../service/SearchService';

export default function CardPostResult({ query }) {

    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (query === '') {
            setAlbums([]);
            setLoading(false);
            return;
        }

        async function fetchData() {
            setLoading(true);
            try {
                const response = await getSearchResult(query);
                setAlbums(response.data);
            } catch (error) {
                console.error(error);
                setAlbums([]);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [query]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (albums.length === 0) {
        return <p>No matches for <i>"{query}"</i></p>;
    }

    return (
        <ul className='mt-5'>
            {albums.map(album => (
                <li key={album._id}>
                    <div className="card card-side bg-base-100 shadow-xl">
                        <figure>
                            <img
                                src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
                                alt="Movie" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">{album.author.lastName} {album.author.firstName}</h2>
                            <p>{album.content}</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">Watch</button>
                            </div>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    )
}
