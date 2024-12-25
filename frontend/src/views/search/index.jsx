import React from 'react'
import CardUserList from './userCard/cardUserList'
import { useEffect, useState } from 'react';
import user from '../../service/user';
import { useUser } from '../../service/UserContext';
import { getHomeFeed } from '../../service/PostService';
import CardPost from './CardPost';
import Loading from '../../components/Loading';
export default function Searchpage() {

    const { userContext, setUserContext } = useUser();
    const [users, setUsers] = useState([]);
    const [post, setPost] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchdata = async () => {
            setLoading(true);
            const res = await user.getAllUser();
            const resPost = await getHomeFeed();
            setUsers(res.data);
            setPost(resPost.data);
            setLoading(false);
        }
        fetchdata()
    }, []);

    if (loading) {
        return <p className='text-center mt-5'><Loading /></p>;
    }
    console.log(post)
    return (
        <div className=" justify-center pt-3 items-center w-full">
            <div className='px-4 py-3 shadow-md shadow-gray-300 w-full mt-5'>
                <strong className='text-lg'>Mọi người</strong>
                {
                    users.map((_, index) => (
                        userContext._id == _._id ? '' :
                            <CardUserList userdata={_} key={index} />
                    ))
                }
            </div>
            <div className='px-4 py-3 shadow-md shadow-gray-300 w-full mt-5'>
                <strong className='text-lg'>Bài đăng</strong>
                {post.map((e) => (
                    <CardPost post={e} />
                ))}
            </div>
        </div>
    )
}
