import React from 'react'
import { Outlet } from 'react-router-dom'

import HeadProfile from '../components/HeadProfile'
import MenuProfile from '../components/MenuProfile'


export default function Personal() {
    return (
        <div className='flex justify-center'>
            <div className=''>
                <HeadProfile />
                <MenuProfile />
                <Outlet />
            </div>
        </div>
    )
}
