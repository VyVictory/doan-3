import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@headlessui/react';
import { HandThumbUpIcon, ChatBubbleLeftIcon, ShareIcon } from '@heroicons/react/24/outline';
import AVTUser from './AVTUser';
import authToken from '../../components/authToken';
import { handleLike } from '../../service/PostService';
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
                //sort
                const sortedPosts = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setPosts(sortedPosts);
            })
            .catch(error => {
                console.error("Error fetching post data:", error);
            })
    }, []);

    if (!posts.length) {
        return <div>Loading...</div>;
    }
    //Like
    const handleLikeClick = async (postId) => {
        try {
            await handleLike(postId);
            setPosts(posts.map(post =>
                post._id === postId ? { ...post, likes: [...post.likes, 'newLike'] } : post
            ));

        } catch (error) {
            console.error("Error liking the post:", error);
        }
    };


    return (
        <>
            {
                posts.map(post => (
                    <div key={post._id} className='flex items-start  p-6 border border-gray-300 rounded-lg shadow-md shadow-zinc-300 gap-3'>
                        <AVTUser />
                        <div className='grid gap-2 w-full'>
                            <article className='text-wrap grid gap-1'>
                                <a className='font-bold text-lg hover:link' href="#">{post.author}</a>
                                <p> {post.content}</p>
                            </article>
                            {post.img.length > 0 && (
                                <img className='rounded-xl max-h-[300px]' src={post.img[0]} alt="Post visual" />
                            )}
                            {/* <img className='rounded-xl w-full max-h-[400px]'
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnzOw4JGD9VHLQ46a6nQS4uhdw9QFlA7s0Mg&s" /> */}
                            <div className='flex justify-between'>
                                <Button onClick={() => handleLikeClick(post._id)} className={"flex items-end gap-1"}>

                                    <HandThumbUpIcon className="size-5" color='blue' />
                                    <HandThumbUpIcon className="size-5" />
                                    <span>{post.likes.length}</span>
                                </Button>
                                <Button className={"flex items-end gap-1"}>
                                    <ChatBubbleLeftIcon className="size-5" />
                                    <span>{post.comments.length}</span>
                                </Button>
                                <Button className={"flex items-end gap-1"}>
                                    <ShareIcon className="size-5" />
                                </Button>
                            </div>
                        </div>
                    </div>
                ))
            }

        </>
    )
}
