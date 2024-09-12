import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@headlessui/react'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import Allfriend from './allfriend'
import Friendinvitation from './friendinvitation'

export default function Myfriend() {
    return (
        <div className='bg-white mt-5 mx-32 h-screen'>
            <TabGroup>
                <TabList className={"flex justify-around bg-gray-200"}>
                    <Tab className={"w-full h-full border-r-gray-600 border-2 p-3 hover:bg-gray-400"}>Tất cả bạn bè</Tab>
                    <Tab className={"w-full h-full border-l-gray-600 border-2 p-3 hover:bg-gray-400"}>Lời mời kết bạn</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel className={"grid grid-cols-4"}> <Allfriend /> <Allfriend /> <Allfriend /> <Allfriend /> <Allfriend /> </TabPanel>
                    <TabPanel className={"grid grid-cols-4"}><Friendinvitation /></TabPanel>
                </TabPanels>
            </TabGroup>
        </div>
    )
}
