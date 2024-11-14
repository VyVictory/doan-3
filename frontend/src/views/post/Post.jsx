import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@headlessui/react';
import { HandThumbUpIcon, ChatBubbleLeftIcon, ShareIcon } from '@heroicons/react/24/outline';
import AVTUser from './AVTUser';
import authToken from '../../components/authToken';
export default function Post() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/post/crpost', {
            headers: {
                Authorization: `Bearer ${authToken.getToken()}`, // Use your auth token provider
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                setPosts(response.data);
            })
            .catch(error => {
                console.error("Error fetching post data:", error);
            });
    }, []);

    if (!posts.length) {
        return <div>Loading...</div>;
    }

    return (
        <>
            {
                posts.map(post => (
                    <div key={post._id} className='flex items-start  p-6 border border-gray-300 rounded-lg shadow-sm shadow-zinc-300 gap-3 max-w-[900px]'>
                        <AVTUser />
                        <div className='grid gap-2'>
                            <article className='text-wrap grid gap-1'>
                                <a className='font-bold text-lg hover:link' href="#">{post.author}</a>
                                <p> {post.content}</p>
                            </article>
                            {post.img.length > 0 && (
                                <img className='rounded-xl w-full max-h-[400px]' src={post.img[0]} alt="Post visual" />
                            )}
                            {/* <img className='rounded-xl w-full max-h-[400px]'
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnzOw4JGD9VHLQ46a6nQS4uhdw9QFlA7s0Mg&s" /> */}
                            <div className='flex justify-around'>
                                <Button className={"flex items-end gap-1"}>
                                    <HandThumbUpIcon className="size-5" />
                                    <span>1</span>
                                </Button>
                                <Button className={"flex items-end gap-1"}>
                                    <ChatBubbleLeftIcon className="size-5" />
                                    <span>2</span>
                                </Button>
                                <Button className={"flex items-end gap-1"}
                                ><ShareIcon className="size-5" />
                                    <span>3</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                ))

            }
        </>
    )
}
