import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import friend from '../../service/friend';
import FriendCard from './friendCard';


export default function FriendInvitation() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const res = await friend.getListFriendRequest();
                if (res.success) {
                    setRequests(res.data);
                } else {
                    setRequests([]);
                }
            } catch (error) {
                console.error('Error fetching friend requests:', error);
                setRequests([]);
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
            ) : requests.length === 0 ? (
                // Show "No Requests" message
                <div className="w-full h-full flex justify-center items-center text-center">
                    No Friend Requests
                </div>
            ) : (
                // Render Friend Cards
                <div className="w-full flex flex-col gap-4">
                    {requests.map((request, index) => (
                        <FriendCard
                        iduser={request.sender}
                        idrequest={request._id}
                            key={index}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
