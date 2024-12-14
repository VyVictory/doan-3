import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import friend from '../../service/friend';
export default function Friendinvitation() {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const fetchdata = async () => {
            const res = await friend.getListFriendRequest()
            if (res.success == true) {
                setUsers(res.data)
                console.log(res)
            } else {

            }
        }
        fetchdata()
    }, []);
    console.log(users)
    return (
        <div className='w-full p-5 flex flex-col'>
            <strong className='text-xl'>Lời mời kết bạn </strong>
            {
                users ?
                    <div className='w-full h-full justify-center items-center text-center'>
                        Not Request Add Friend
                    </div>
                    :
                    users.map((_, index) => (
                        <fri userdata={_} key={index} />
                    ))
            }
        </div>
    )
}
