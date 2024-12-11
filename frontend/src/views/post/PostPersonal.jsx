import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { HandThumbUpIcon, ChatBubbleLeftIcon, ShareIcon, HandThumbDownIcon } from '@heroicons/react/24/outline';
import AVTUser from './AVTUser';
import authToken from '../../components/authToken';
import { handleLike, handleDisLike, handleUnDisLike, handleUnLike } from '../../service/PostService';
import 'animate.css';
import DropdownPostPersonal from './components/DropdownPostPersonal';



export default function Post({ user }) {
    const [posts, setPosts] = useState([]);


    useEffect(() => {
        const fetchdata = async () => {
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
        }
        fetchdata()
    }, []);

    if (!posts.length) {
        return <div>Loading...</div>;
    }
    //Like
    const handleLikeClick = async (postId) => {
        try {
            const post = posts.find(post => post._id === postId);
            if (post.likes.includes(user._id)) {
                // Optimistically update the UI
                setPosts(posts.map(post =>
                    post._id === postId ? { ...post, likes: post.likes.filter(id => id !== user._id) } : post
                ));
                await handleUnLike(postId);
            } else {
                // Optimistically update the UI
                setPosts(posts.map(post =>
                    post._id === postId ? { ...post, likes: [...post.likes, user._id], dislikes: post.dislikes.filter(id => id !== user._id) } : post
                ));
                await handleLike(postId);
                await handleUnDisLike(postId); // Undislike when liking
            }
        } catch (error) {
            console.error("Error liking the post:", error);
        }
    };
    //Dislike 
    const handleDislikeClick = async (postId) => {
        try {
            const post = posts.find(post => post._id === postId);
            if (post.dislikes.includes(user._id)) {
                // Optimistically update the UI
                setPosts(posts.map(post =>
                    post._id === postId ? { ...post, dislikes: post.dislikes.filter(id => id !== user._id) } : post
                ));
                await handleUnDisLike(postId);
            } else {
                // Optimistically update the UI
                setPosts(posts.map(post =>
                    post._id === postId ? { ...post, dislikes: [...post.dislikes, user._id], likes: post.likes.filter(id => id !== user._id) } : post
                ));
                await handleDisLike(postId);
                await handleUnLike(postId); // Unlike when disliking
            }
        } catch (error) {
            console.error("Error disliking the post:", error);
        }
    }
    return (
        <>
            {
                posts.map((post) => (
                    <div key={post._id}
                        className='flex items-start p-6 border border-gray-300 rounded-lg shadow-md shadow-zinc-300 gap-3'>
                        <AVTUser user={user} />

                        <div className='grid gap-4 w-full'>
                            <div className='flex justify-between'>
                                <article className='text-wrap grid gap-1'>
                                    <Link className='font-bold text-lg hover:link ' to="#">{user.lastName} {user.firstName}</Link>
                                    <p>{post.content}</p>
                                </article>
                                <DropdownPostPersonal />
                            </div>
                            {post.img.length > 0 && (
                                <img className='rounded-xl max-h-[300px]' src={post.img[0]} alt="Post visual" />
                            )}

                            {/* <img className='rounded-xl w-full max-h-[400px]'
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnzOw4JGD9VHLQ46a6nQS4uhdw9QFlA7s0Mg&s" alt='' /> */}
                            <div className='flex justify-between'>
                                <div className='flex gap-2'>
                                    <button onClick={() => handleLikeClick(post._id)} className={"flex items-end gap-1"}>
                                        {post.likes.includes(user._id)
                                            ? <HandThumbUpIcon className="size-5 animate__heartBeat" color='blue' />
                                            : <HandThumbUpIcon className="size-5 hover:text-blue-700 " />
                                        }
                                        <span>{post.likes.length}</span>
                                    </button>
                                    <button onClick={() => handleDislikeClick(post._id)} className={"flex items-end gap-1 "}>
                                        {post.dislikes.includes(user._id)
                                            ? <HandThumbDownIcon className="size-5 animate__heartBeat" color='red' />
                                            : <HandThumbDownIcon className="size-5 hover:text-red-700" />
                                        }
                                        <span>{post.dislikes.length}</span>
                                    </button>
                                </div>
                                <button className={"flex items-end gap-1"}>
                                    <ChatBubbleLeftIcon className="size-5" />
                                    <span>{post.comments.length}</span>
                                </button>
                                <button className={"flex items-end gap-1"}>
                                    <ShareIcon className="size-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            }

        </>
    )
}
