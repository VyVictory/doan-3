import React from 'react'
import { useState, useEffect } from "react";
import { getSearchResult } from "../../service/SearchService";
import { Link, useParams } from "react-router-dom";
export default function CardPost({ post }) {
    //carousel
    const [currentIndexes, setCurrentIndexes] = useState({});
    const handlePrev = (post) => {
        setCurrentIndexes((prevIndexes) => ({
            ...prevIndexes,
            [post._id]: (prevIndexes[post._id] > 0 ? prevIndexes[post._id] : post.img.length) - 1
        }));
    };

    const handleNext = (post) => {
        setCurrentIndexes((prevIndexes) => ({
            ...prevIndexes,
            [post._id]: (prevIndexes[post._id] + 1) % post.img.length
        }));
    };

    return (
        <div className="mt-5">
            <Link to={`/post/${post._id}`} className="card card-side max-h-auto bg-base-100 shadow-xl ">
                <div className="card-body">
                    <div className='flex gap-3'>
                        <img
                            className="w-14 h-14 aspect-square rounded-full"
                            src={post.author.avatar || 'https://th.bing.com/th/id/OIP.PKlD9uuBX0m4S8cViqXZHAHaHa?rs=1&pid=ImgDetMain'}
                            alt=''
                        />
                        <div className='grid gap-3'>
                            <h2 className="font-semibold break-words"> {post.author.lastName} {post.author.firstName}</h2>
                            <p className='text-ellipsis break-words'>{post.content}</p>
                        </div>
                    </div>
                    {post?.img?.length > 0 && (
                        <div className="carousel rounded-box w-96 h-64 relative">
                            {post?.img?.length > 1 && (
                                <button onClick={() => handlePrev(post)} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full">‹</button>
                            )}
                            <div className="carousel-item ">
                                <img
                                    src={post?.img[currentIndexes[post._id] || 0]}
                                    className="w-full"
                                    alt="Post visual"
                                />
                            </div>
                            {post?.img?.length > 1 && (
                                <button onClick={() => handleNext(post)} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full">›</button>
                            )}
                        </div>
                    )}
                </div>
            </Link>
        </div>
    )
}
