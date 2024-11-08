import React from 'react'
import { Outlet } from 'react-router-dom'

import HeadProfile from '../components/HeadProfile'
import MenuProfile from '../components/MenuProfile'

import LeftMessenger from '../../messenger/LeftMessenger'

export default function Personal() {
    return (
        <div className='min-w-[1000px]'>
            <HeadProfile />
            <MenuProfile />
            <Outlet />
        </div>
    )
}
