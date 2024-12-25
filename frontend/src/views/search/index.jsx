import React from 'react'
import CardUserList from './userCard/cardUserList'
import { useEffect, useState } from 'react';
import user from '../../service/user';
import { useUser } from '../../service/UserContext';
import { getHomeFeed } from '../../service/PostService';
export default function Searchpage() {

    const { userContext, setUserContext } = useUser();
    const [users, setUsers] = useState([]);
    const [post, setPost] = useState([]);
    useEffect(() => {
        const fetchdata = async () => {
            const res = await user.getAllUser();
            const resPost = await getHomeFeed();
            if (res.success == true) {
                setUsers(res.data)
                console.log(res)
            } else {

            }
            if (resPost.success == true) {
                setPost(resPost.data)
            }
        }
        fetchdata()
    }, []);
    // console.log(users)
    return (
        <div className="flex justify-center pt-3 items-center w-full">
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
                {post.map((post) => (
                    <div>
                    </div>
                ))}
            </div>
        </div>
    )
}
