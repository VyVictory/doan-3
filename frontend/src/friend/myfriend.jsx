import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@headlessui/react'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import Allfriend from '../components/friend/Allfriend'
import Friendinvitation from '../components/friend/friendinvitation'


export default function Myfriend() {
    return (
        <div className='bg-[#0f172a] mx-32 '>
            <TabGroup>
                <TabList className={"flex justify-around bg-[#0f172a]"}>
                    <Tab className={"w-full h-full  border-b-8 border-r-4 border-[#020617] p-4 hover:bg-[#1e293b]"}>Tất cả bạn bè</Tab>
                    <Tab className={"w-full h-full  border-b-8 border-l-4 border-[#020617] p-4 hover:bg-[#1e293b]"}>Lời mời kết bạn</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel className={"grid grid-cols-5"}> <Allfriend /> <Allfriend /> <Allfriend /> <Allfriend /> <Allfriend /> <Allfriend /> </TabPanel>
                    <TabPanel className={"grid grid-cols-5"}><Friendinvitation /><Friendinvitation /><Friendinvitation /><Friendinvitation /> <Friendinvitation /> <Friendinvitation /></TabPanel>
                </TabPanels>
            </TabGroup>
        </div>
    )
}