import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@headlessui/react';
import { HandThumbUpIcon, ChatBubbleLeftIcon, ShareIcon, HandThumbDownIcon } from '@heroicons/react/24/outline';
import AVTUser from './AVTUser';
import authToken from '../../components/authToken';
import { handleLike, handleDisLike } from '../../service/PostService';
import { profileUserCurrent } from '../../service/ProfilePersonal';
export default function Post() {
    const [posts, setPosts] = useState([]);
    const [userLogin, setUserLogin] = useState({})


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
            const responseUserPersonal = await profileUserCurrent()
            setUserLogin(responseUserPersonal)
        }
        fetchdata()
    }, []);

    if (!posts.length) {
        return <div>Loading...</div>;
    }
    //Like
    const handleLikeClick = async (postId) => {
        try {
            await handleLike(postId);
            setPosts(posts.map(post =>
                post._id === postId ? { ...post, likes: [...post.likes, userLogin._id] } : post
            ));
        } catch (error) {
            console.error("Error liking the post:", error);
        }
    };
    //Dislike 
    const handleDislikeClick = async (postId) => {
        try {
            await handleDisLike(postId);
            setPosts(posts.map(post =>
                post._id === postId ? { ...post, dislikes: [...post.dislikes, userLogin._id] } : post
            ));
        } catch (error) {
            console.error("Error liking the post:", error);
        }
    }
    return (
        <>
            {
                posts.map(post => (
                    <div key={post._id} className='flex items-start p-6 border border-gray-300 rounded-lg shadow-md shadow-zinc-300 gap-3'>
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
                                <div className='flex gap-2'>
                                    <Button onClick={() => handleLikeClick(post._id)} className={"flex items-end gap-1"}>
                                        {post.likes.includes(userLogin._id)
                                            ? <HandThumbUpIcon className="size-5 " color='blue' />
                                            : <HandThumbUpIcon className="size-5 hover:text-blue-900" />
                                        }
                                        <span>{post.likes.length}</span>
                                    </Button>
                                    <Button onClick={() => handleDislikeClick(post._id)} className={"flex items-end gap-1"}>
                                        {post.dislikes.includes(userLogin._id)
                                            ? <HandThumbDownIcon className="size-5" color='red' />
                                            : <HandThumbDownIcon className="size-5 hover:text-red-700" />
                                        }
                                        <span>{post.dislikes.length}</span>
                                    </Button>
                                </div>
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
