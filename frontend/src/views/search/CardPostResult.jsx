import React from 'react'
import { useState, useEffect } from 'react';
import { getSearchResult } from '../../service/SearchService';
import AVTUser from '../post/AVTUser';
import { Link } from 'react-router-dom';
import Loading from '../../components/Loading';

export default function CardPostResult({ query }) {

    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (query === '') {
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
        return <p className='text-center mt-5'><Loading /></p>;
    }

    if (albums.length === 0) {
        return <p className='mt-5'>không tìm thấy dữ liệu</p>;
    }

    return (
        <ul className='mt-5 grid gap-1'>
            {albums.map(album => (
                <li key={album._id}>
                    <div className="card card-side bg-base-100 shadow-xl">
                        <div className="card-body">
                            <div className='grid gap-3'>
                                <div>
                                    <div className='grid justify-center'>
                                        <AVTUser user={album.author} />
                                    </div>
                                    <h2 className="card-title justify-center">{album.author.lastName} {album.author.firstName}</h2>
                                </div>
                                <p className='text-center'>{album.content}</p>
                            </div>
                            <div className="card-actions justify-end">
                                <Link to={`/post/${album._id}`} className="btn btn-info w-full">Xem bài viết</Link>
                            </div>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    )
}
