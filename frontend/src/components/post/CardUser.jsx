import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@headlessui/react'
import DropdownMyfriend from '../friend/DropdownMyfriend'
export default function CardUser() {
    return (
        <div className='grid gap-2 p-3'>
            <div className='flex gap-5 items-start'>
                <div className="avatar">
                    <div className="w-24 rounded-full">
                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    </div>
                </div>
                <div className='grid gap-2'>
                    <Link to="" className='font-semibold'>Tên(nickname)</Link>
                    <span>Sinh sống tại: Cần Thơ</span>
                    <span>Ngày sinh: 14/12/2003</span>
                </div>
            </div>
            <div className='grid gap-5 grid-cols-2'>
                <Button
                    className=" rounded bg-sky-600 p-3 text-sm text-white data-[hover]:bg-sky-500 data-[active]:bg-sky-700 data-[disabled]:bg-gray-500"
                >
                    Bạn bè
                </Button>
                <Button
                    className=" rounded bg-sky-600 p-3 text-sm text-white data-[hover]:bg-sky-500 data-[active]:bg-sky-700 data-[disabled]:bg-gray-500"
                >
                    nhắn tin
                </Button>
            </div>
        </div>

        //trang chưa kết bạn
        // <div className='grid gap-2 p-3'>
        //     <div className='flex gap-5 items-start'>
        //         <div className="avatar">
        //             <div className="w-24 rounded-full">
        //                 <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        //             </div>
        //         </div>
        //         <div className='grid gap-2'>
        //             <Link to="" className='font-semibold'>Tên(nickname)</Link>
        //             <span>Sinh sống tại: Cần Thơ</span>
        //             <span>Ngày sinh: 14/12/2003</span>
        //         </div>
        //     </div>
        //     <div className='grid gap-5 grid-cols-2'>
        //         <Button
        //             className=" rounded bg-sky-600 p-3 text-sm text-white data-[hover]:bg-sky-500 data-[active]:bg-sky-700 data-[disabled]:bg-gray-500"
        //         >
        //             Kết bạn
        //         </Button>
        //         <Button
        //             className=" rounded bg-sky-600 p-3 text-sm text-white data-[hover]:bg-sky-500 data-[active]:bg-sky-700 data-[disabled]:bg-gray-500"
        //         >
        //             nhắn tin
        //         </Button>
        //     </div>
        // </div>
    )
}
