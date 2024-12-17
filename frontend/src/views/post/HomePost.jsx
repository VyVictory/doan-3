import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { HandThumbUpIcon, ChatBubbleLeftIcon, ShareIcon, HandThumbDownIcon } from '@heroicons/react/24/outline';
import AVTUser from './AVTUser';
import { handleLike, handleDisLike, handleUnDisLike, handleUnLike, getHomeFeed } from '../../service/PostService';
import 'animate.css';
import { format, differenceInMinutes, differenceInHours, differenceInDays } from 'date-fns';
import { getAllOtherPosts } from '../../service/OtherProfile';
import { profileUserCurrent } from '../../service/ProfilePersonal';
import DropdownOtherPost from './components/DropdownOtherPost';
import DropdownPostPersonal from './components/DropdownPostPersonal';
import Loading from '../../components/Loading';
export default function HomePost() {

    const [posts, setPosts] = useState([]);
    const [userLogin, setUserLogin] = useState({})
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const fetchdata = async () => {
            setLoading(true)
            const response = await getHomeFeed()
            if (response) {
                const sortedPosts = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setPosts(sortedPosts)
                const responseUserPersonal = await profileUserCurrent()
                setUserLogin(responseUserPersonal.data)
            }
            setLoading(false)
        }
        setTimeout(fetchdata, 1000);
    }, []);
    console.log(posts)


    //Like
    const handleLikeClick = async (postId) => {
        try {
            const post = posts.find(post => post._id === postId);
            if (post.likes.includes(userLogin._id)) {
                // Optimistically update the UI
                setPosts(posts.map(post =>
                    post._id === postId ? { ...post, likes: post.likes.filter(id => id !== userLogin._id) } : post
                ));
                await handleUnLike(postId);
            } else {
                // Optimistically update the UI
                setPosts(posts.map(post =>
                    post._id === postId ? { ...post, likes: [...post.likes, userLogin._id], dislikes: post.dislikes.filter(id => id !== userLogin._id) } : post
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
            if (post.dislikes.includes(userLogin._id)) {
                // Optimistically update the UI
                setPosts(posts.map(post =>
                    post._id === postId ? { ...post, dislikes: post.dislikes.filter(id => id !== userLogin._id) } : post
                ));
                await handleUnDisLike(postId);
            } else {
                // Optimistically update the UI
                setPosts(posts.map(post =>
                    post._id === postId ? { ...post, dislikes: [...post.dislikes, userLogin._id], likes: post.likes.filter(id => id !== userLogin._id) } : post
                ));
                await handleDisLike(postId);
                await handleUnLike(postId); // Unlike when disliking
            }
        } catch (error) {
            console.error("Error disliking the post:", error);
        }
    }
    // Time CreateAt Post
    const formatDate = (date) => {
        const postDate = new Date(date);
        const currentDate = new Date();
        const minutesDifference = differenceInMinutes(currentDate, postDate);
        const hoursDifference = differenceInHours(currentDate, postDate);
        const daysDifference = differenceInDays(currentDate, postDate);

        if (minutesDifference < 60) {
            return `${minutesDifference} phút trước`;
        } else if (hoursDifference < 24) {
            return `${hoursDifference} giờ trước`;
        } else if (daysDifference <= 30) {
            return `${daysDifference} ngày trước`;
        } else {
            return format(postDate, 'dd/MM/yyyy HH:mm');
        }
    };
    //
    const formatPrivacy = (privacy) => {
        switch (privacy) {
            case 'public':
                return <span className="text-blue-500">công khai</span>;
            case 'friends':
                return <span className="text-green-500">bạn bè</span>;
            case 'private':
                return <span className="text-black">chỉ mình tôi</span>;
            default:
                return <span>{privacy}</span>;
        }
    };
    //post của bản thân thì hiển thị dropdown PostPersonal


    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                posts.map((post) => (
                    <div key={post._id}
                        className='flex items-start p-6 border border-gray-300 rounded-lg shadow-md shadow-zinc-300 gap-3'>
                        <AVTUser user={post.author} />

                        <div className='grid gap-2 w-full'>
                            <div className='flex justify-between'>
                                <article className='text-wrap grid gap-5'>
                                    <div className='grid'>

                                        <Link className='font-bold text-lg hover:link ' to="#">{post.author.lastName} {post.author.firstName}</Link>
                                        <div className='flex gap-2'>
                                            <span className='text-xs'>{formatDate(post.createdAt)}</span>
                                            <span className='text-xs'>{formatPrivacy(post.privacy)}</span>
                                        </div>
                                    </div>
                                    <p>{post.content}</p>
                                </article>
                                {userLogin._id === post.author._id ? (
                                    <DropdownPostPersonal postId={post._id} />
                                ) : (
                                    <DropdownOtherPost postId={post._id} />
                                )}
                            </div>
                            {post.img.length > 0 && (
                                <img className='rounded-xl max-h-[300px]' src={post.img[0]} alt="Post visual" />
                            )}

                            {/* <img className='rounded-xl w-full max-h-[400px]'
                                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnzOw4JGD9VHLQ46a6nQS4uhdw9QFlA7s0Mg&s" alt='' /> */}
                            <div className='flex justify-between'>
                                <div className='flex gap-2'>
                                    <button onClick={() => handleLikeClick(post._id)} className={"flex items-end gap-1"}>
                                        {post.likes.includes(userLogin._id)
                                            ? <HandThumbUpIcon className="size-5 animate__heartBeat" color='blue' />
                                            : <HandThumbUpIcon className="size-5 hover:text-blue-700 " />
                                        }
                                        <span>{post.likes.length}</span>
                                    </button>
                                    <button onClick={() => handleDislikeClick(post._id)} className={"flex items-end gap-1 "}>
                                        {post.dislikes.includes(userLogin._id)
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
                )))
            }

        </>
    )
}
