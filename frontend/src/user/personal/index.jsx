import React from 'react'
import HeadProfile from '../../components/Profile/HeadProfile'
import { Outlet } from 'react-router-dom'
import MenuProfile from '../../components/Profile/MenuProfile'
export default function Personal() {
    return (
        <div className='min-w-[1000px]'>
            <HeadProfile />
            <MenuProfile />
            <Outlet />
        </div>
    )
}
