import React from 'react'
import { Link } from 'react-router-dom'
import DropdownMyfriend from './DropdownMyfriend'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
export default function Allfriend() {
    return (
        <div className='border border-gray-300 shadow-lg max-w-56 max-h-96 h-80 rounded-lg '>
            <Link>
                <img className='h-52 w-full p-2' alt=''
                    src="https://www.didongmy.com/vnt_upload/news/05_2024/anh-27-meme-dang-yeu-didongmy.jpg" />
            </Link>
            <Link className='text-white px-3 font-bold flex justify-center'>Tên Người dùng</Link>
            <div className='flex justify-around mt-5 items-center'>
                <button
                    className=" rounded bg-sky-600 p-3 text-sm text-white data-[hover]:bg-sky-500 data-[active]:bg-sky-700 data-[disabled]:bg-gray-500"
                >
                    Xem trang cá nhân
                </button>

                <DropdownMyfriend nameBTN={<ChevronDownIcon className="size-7 fill-white/60" />} />
            </div>
        </div>
    )
}
