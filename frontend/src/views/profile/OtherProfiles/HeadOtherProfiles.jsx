import React, { useState, useEffect } from 'react';
import { UserPlusIcon, NoSymbolIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import friend from '../../../service/friend';

export default function HeadOtherProfiles({ dataProfile }) {
    const [checkFriend, setCheckFriend] = useState(null); // null khi chưa load xong
    const [loading, setLoading] = useState(true);

    const handAddFriend = async (id) => {
        try {
            const rs = await friend.AddFriend(id);
            if (rs.success) {
                alert('Đã gửi yêu cầu kết bạn');
            } else {
                alert(rs.message);
            }
            console.log(rs);
        } catch (error) {
            console.error(error);
        }
    };

    const checkFr = async () => {
        setLoading(true);
        try {
            const rs = await friend.CheckFriend(dataProfile._id);
            if (rs) {
                setCheckFriend(rs.status);
            } else {
                console.log(rs);
            }
        } catch (error) {
            console.error('Error fetching friend status:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (dataProfile?._id) {
            checkFr();
        }
    }, [dataProfile?._id]);

    function buttonAddFriend() {
        if (loading) {
            return <button className="bg-gray-300 text-white p-2 rounded-full">Loading...</button>;
        }
        switch (checkFriend) {
            case 'pending':
                return (
                    <button
                        onClick={() => dataProfile ? handAddFriend(dataProfile._id) : ''}
                        className="bg-sky-600 text-white p-2 rounded-full flex items-center gap-1"
                    >
                        <UserPlusIcon className="size-5 fill-white" />
                        Hủy yêu cầu kết bạn
                    </button>
                );
            case 'accepted':
                return (
                    <button
                        onClick={() => dataProfile ? handAddFriend(dataProfile._id) : ''}
                        className="bg-sky-600 text-white p-2 rounded-full flex items-center gap-1"
                    >
                        <UserPlusIcon className="size-5 fill-white" />
                        Hủy Kết bạn
                    </button>
                );
            case 'no_request':
                return (
                    <button
                        onClick={() => dataProfile ? handAddFriend(dataProfile._id) : ''}
                        className="bg-sky-600 text-white p-2 rounded-full flex items-center gap-1"
                    >
                        <UserPlusIcon className="size-5 fill-white" />
                        Kết bạn
                    </button>
                );
            default:
                return (
                    <button className="bg-gray-300 text-white p-2 rounded-full">Không xác định</button>
                );
        }
    }

    return (
        <div className="">
            <div
                className="h-[300px] z-0 grid bg-cover bg-no-repeat"
                style={{
                    backgroundImage: "url('https://cellphones.com.vn/sforum/wp-content/uploads/2024/02/anh-thien-nhien-22.jpg')",
                    backgroundPosition: '10%',
                }}
            ></div>
            <div className="grid justify-items-center relative z-0 bottom-20 overflow-hidden gap-4">
                <img
                    className="rounded-full h-40 w-40 items-center"
                    alt=""
                    src={`${dataProfile?.avatar ||
                        'https://th.bing.com/th/id/OIP.PKlD9uuBX0m4S8cViqXZHAHaHa?rs=1&pid=ImgDetMain'
                        }`}
                />
                <h1 className="font-bold text-2xl text-center">
                    {dataProfile?.lastName} {dataProfile?.firstName}
                </h1>
                <div className="flex gap-2">
                    {buttonAddFriend()}
                    <button className="bg-green-600 text-white p-2 rounded-full flex items-center gap-1">
                        <ChatBubbleLeftRightIcon className="size-5" />
                        Nhắn tin
                    </button>
                    <button className="bg-red-600 text-white p-2 rounded-full flex items-center gap-1">
                        <NoSymbolIcon className="size-5" />
                        Chặn
                    </button>
                </div>
            </div>
        </div>
    );
}
