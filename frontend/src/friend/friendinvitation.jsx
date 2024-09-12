import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@headlessui/react'
export default function Friendinvitation() {
    return (
        <div className=' m-4 bg-gray-700 max-w-64 max-h-80 h-80 rounded-sm'>
            <Link>
                <img className='h-56 w-full p-2 rounded-xl'
                    src="https://www.didongmy.com/vnt_upload/news/05_2024/anh-27-meme-dang-yeu-didongmy.jpg" />
            </Link>
            <Link className='text-white px-3 font-bold flex justify-center'>Tên Người dùng</Link>
            <div className='px-2 flex justify-around mt-2'>
                <Button
                    className="rounded bg-sky-600 py-2 px-4 text-sm text-white data-[hover]:bg-sky-500 data-[active]:bg-sky-700 data-[disabled]:bg-gray-500"
                >
                    Xác nhận
                </Button>
                <Button
                    className="rounded bg-sky-600 py-2 px-4 text-sm text-white data-[hover]:bg-sky-500 data-[active]:bg-sky-700 data-[disabled]:bg-gray-500"
                >
                    Từ chối
                </Button>
            </div>
        </div>
    )
}
