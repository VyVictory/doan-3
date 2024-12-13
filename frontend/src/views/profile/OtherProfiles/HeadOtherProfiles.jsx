import React from 'react'
import { UserPlusIcon, NoSymbolIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline'
import friend from '../../../service/friend'
export default function HeadOtherProfiles({ dataProfile }) {
    const handAddFriend = async (id) => {
        try {
            const rs = await friend.AddFriend(id);
            if (rs.success) {
                alert('đã gửi yêu cầu kết bạn ')
            } else {
                alert(rs.message)
            }
            console.log(rs)
        } catch (error) {
            console.error(error)
        }
    };
    return (
        <div className=''>
            <div className=" h-[300px] z-0 grid bg-cover bg-no-repeat bg-[url('https://cellphones.com.vn/sforum/wp-content/uploads/2024/02/anh-thien-nhien-22.jpg')]" style={{ backgroundPosition: '10%' }}></div>
            <div className='grid justify-items-center relative z-0 bottom-20 overflow-hidden gap-4'>
                <img className='rounded-full h-40 w-40 items-center' alt=''
                    src={`${dataProfile && dataProfile.avatar ? dataProfile.avatar : "https://th.bing.com/th/id/OIP.PKlD9uuBX0m4S8cViqXZHAHaHa?rs=1&pid=ImgDetMain"}`} />
                <h1 className='font-bold text-2xl text-center '>{dataProfile && dataProfile.lastName} {dataProfile && dataProfile.firstName}</h1>
                <div className='flex gap-2'>
                    <button onClick={() => dataProfile ? handAddFriend(dataProfile._id) : ''} className='bg-sky-600 text-white p-2 rounded-full flex items-center gap-1'>
                        <UserPlusIcon className='size-5 fill-white' />
                        Kết bạn
                    </button>
                    <button className='bg-green-600 text-white p-2 rounded-full flex items-center gap-1'>
                        <ChatBubbleLeftRightIcon className='size-5 ' />
                        Nhắn tin
                    </button>
                    <button className='bg-red-600 text-white p-2 rounded-full flex items-center gap-1'>
                        <NoSymbolIcon className='size-5 ' />
                        Chặn
                    </button>
                </div>
            </div>

        </div>
    )
}
