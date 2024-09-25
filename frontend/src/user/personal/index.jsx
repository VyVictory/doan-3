import React from 'react'
import HeadProfile from '../../components/Profile/HeadProfile'
import { Outlet } from 'react-router-dom'
export default function Personal() {
    return (
        <div className=''>
            <HeadProfile />
            <Outlet />
        </div>
    )
}
