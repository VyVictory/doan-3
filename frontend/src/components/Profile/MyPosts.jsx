import React from 'react'
import Post from '../Post'
import PostStatus from '../Status/PostStatus'

export default function MyPosts() {
    return (
        <div className="grid gap-5  mt-5 rounded-md text-[#f8fafc]">
            <PostStatus />
            <div>
                <p className='text-xl w-full'>Bài viết của tôi</p>
                <div className='grid gap-3'>
                    <Post />
                    <Post />
                </div>
            </div>
        </div>

    )
}
