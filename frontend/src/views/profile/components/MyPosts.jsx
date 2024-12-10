import React from 'react'
import Post from '../../post/Post'
import PostStatus from '../../post/components/PostStatus.jsx'

export default function MyPosts() {
    return (
        <div className="grid gap-5  mt-5 rounded-md">
            <PostStatus />
            <div>
                <p className='text-xl '>Bài viết của tôi</p>
                <div className='grid gap-3'>
                    <Post />
                </div>
            </div>
        </div>

    )
}
