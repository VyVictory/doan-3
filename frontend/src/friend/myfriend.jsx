import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@headlessui/react'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import Allfriend from '../components/friend/Allfriend'
import Friendinvitation from '../components/friend/friendinvitation'


export default function Myfriend() {
    return (
        <div className='bg-[#18191A] mt-2'>
            <TabGroup>
                <TabList className={"flex justify-around bg-[#242526]"}>
                    <Tab className={"w-full h-full  border-b-8 border-r-4 border-[#18191A] p-4 hover:bg-[#303031]"}>Tất cả bạn bè</Tab>
                    <Tab className={"w-full h-full  border-b-8 border-l-4 border-[#18191A] p-4 hover:bg-[#303031]"}>Lời mời kết bạn</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel className={"grid grid-cols-4 gap-3"}> <Allfriend /> <Allfriend /> <Allfriend /> <Allfriend /> <Allfriend /> <Allfriend /> </TabPanel>
                    <TabPanel className={"grid grid-cols-4 gap-3"}><Friendinvitation /><Friendinvitation /><Friendinvitation /><Friendinvitation /> <Friendinvitation /> <Friendinvitation /></TabPanel>
                </TabPanels>
            </TabGroup>
        </div>
    )
}