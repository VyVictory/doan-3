import React from 'react'
import { useState, useEffect } from "react";
import { getSearchResult } from "../../service/SearchService";
import { Link, useParams } from "react-router-dom";
export default function CardPost({ post }) {
    return (
        <div className="mt-5">
            <div className="card card-side max-h-[200px] bg-base-100 shadow-xl ">
                <div className="card-body">
                    <div className='flex gap-3'>
                        <img
                            className="w-14 h-14 aspect-square rounded-full"
                            src={post.author.avatar || 'https://th.bing.com/th/id/OIP.PKlD9uuBX0m4S8cViqXZHAHaHa?rs=1&pid=ImgDetMain'}
                            alt=''
                        />
                        <div className='grid gap-3'>
                            <h2 className="font-semibold break-words w-screen max-w-xl">{post.author.firstName} {post.author.lastName}</h2>
                            <p className='text-ellipsis break-words w-screen max-w-xl'>{post.content}</p>
                        </div>
                    </div>

                    <div className="card-actions justify-end">
                        <Link to={`/post/${post._id}`} className="btn btn-primary">Xem</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
