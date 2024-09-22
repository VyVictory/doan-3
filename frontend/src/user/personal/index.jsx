import React from 'react'
import MenuProfile from '../../components/MenuProfile'
import HeadProfile from '../../components/HeadProfile'
import { Outlet } from 'react-router-dom'
export default function Personal() {
    return (
        <div className='h-screen'>
            <HeadProfile />
            <Outlet />
        </div>
    )
}
