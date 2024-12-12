import React from 'react'

import { Outlet } from 'react-router-dom'
import MenuFriends from './MenuFriends'

export default function Myfriend() {
    return (
        <div className='flex justify-center '>
            <div className=' mt-4  w-full max-w-[1000px]'>
                <MenuFriends />
                <div className='p-3'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}