import React from 'react'
import MenuProfile from './MenuProfile'
import { Outlet, Link } from "react-router-dom";
export default function HeadProfile() {
    return (
        <div className=' text-white'>
            <div className="w-full  h-[400px] z-0  grid bg-center" style={{ "background": `10% / cover no-repeat url('https://cellphones.com.vn/sforum/wp-content/uploads/2024/02/anh-thien-nhien-22.jpg')` }}></div>
            <div className='grid justify-center relative z-0 bottom-20 overflow-hidden'>
                <img className='rounded-full h-40 w-40'
                    src="https://www.didongmy.com/vnt_upload/news/05_2024/anh-27-meme-dang-yeu-didongmy.jpg" />
                <h1 className='font-bold text-2xl'>Phạm Tuấn Vũ</h1>
            </div>
            <MenuProfile />
        </div>

    )
}
