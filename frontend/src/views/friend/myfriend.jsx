import React from 'react'

import { Outlet } from 'react-router-dom'
import MenuFriends from './MenuFriends'

export default function Myfriend() {
    return (
        <div className='bg-white border border-gray-300 text-black mt-4 max-w-[1000px] w-full min-h-screen'>
            <MenuFriends />
            <div className='p-3'>
                <Outlet />
            </div>

        </div>
    )
}