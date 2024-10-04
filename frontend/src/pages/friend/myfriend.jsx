import React from 'react'

import { Outlet } from 'react-router-dom'
import MenuFriends from '../../components/friend/MenuFriends'

export default function Myfriend() {
    return (
        <div className='bg-[#18191A] mt-4 max-w-[1000px] w-full min-h-screen'>
            <MenuFriends />
            <Outlet />
        </div>
    )
}