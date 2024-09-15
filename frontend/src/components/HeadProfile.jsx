import React from 'react'
import MenuProfile from './MenuProfile'

export default function HeadProfile() {
    return (
        <div className=' text-white grid gap-96'>
            <div className="w-screen h-[400px] z-0 absolute grid bg-center" style={{ "background": `10% / cover no-repeat url('https://www.travelandleisure.com/thmb/xhs5KqfgyqZwdEAqaWu_d7R2gR4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/blue0517-4dfc85cb0200460ab717b101ac07888f.jpg')` }}></div>
            <div className='grid justify-center relative z-0 top-80'>
                <img className='rounded-full h-40 w-40'
                    src="https://www.didongmy.com/vnt_upload/news/05_2024/anh-27-meme-dang-yeu-didongmy.jpg" />
                <h1 className='font-bold text-2xl'>Phạm Tuấn Vũ</h1>
            </div>
            <MenuProfile className="" />
        </div>

    )
}
