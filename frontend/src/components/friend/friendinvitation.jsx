import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@headlessui/react'
export default function Friendinvitation() {
    return (
        <div className=' bg-[#242526] max-w-56 max-h-80 h-80 rounded-lg'>
            <Link>
                <img className='h-52 w-full p-2'
                    src="https://www.didongmy.com/vnt_upload/news/05_2024/anh-27-meme-dang-yeu-didongmy.jpg" />
            </Link>
            <Link className='text-white px-3 font-bold flex justify-center'>Tên Người dùng</Link>
            <div className=' flex justify-around mt-5 gap-2 h-10'>
                <Button
                    className=" rounded bg-sky-600 py-2 px-4 text-sm text-white data-[hover]:bg-sky-500 data-[active]:bg-sky-700 data-[disabled]:bg-gray-500"
                >
                    Xác nhận
                </Button>
                <Button
                    className=" rounded bg-red-600 py-2 px-4 text-sm text-white data-[hover]:bg-sky-500 data-[active]:bg-sky-700 data-[disabled]:bg-gray-500"
                >
                    Từ chối
                </Button>
            </div>
        </div>
    )
}
