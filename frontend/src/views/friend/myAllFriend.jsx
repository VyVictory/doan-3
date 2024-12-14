import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import friend from '../../service/friend';
import FriendCard from './friendCard';
import MyFriendCard from './myFriendCard';


export default function MyAllFriend() {
    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const res = await friend.getListMyFriend();
                if (res.success) {
                    setFriends(res.data);
                } else {
                    setFriends([]);
                }
            } catch (error) {
                console.error('Error fetching friend requests:', error);
                setFriends([]);
            } finally {
                setLoading(false); // Stop loading
            }
        };
        fetchdata();
    }, []);



    return (
        <div className="w-full p-5 flex flex-col">
            <strong className="text-xl">Lời mời kết bạn</strong>
            {loading ? (
                // Show loading spinner or text
                <div className="w-full h-full flex justify-center items-center">
                    Loading...
                </div>
            ) : friends.length === 0 ? (
                // Show "No Requests" message
                <div className="w-full h-full flex justify-center items-center text-center">
                    No Friend
                </div>
            ) : (
                // Render Friend Cards
                <div className="w-full flex flex-col gap-4">
                    {friends.map((friend, index) => (
                        <MyFriendCard
                            userdata={friend}
                            // idfriend={friends._id}
                            key={index}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
