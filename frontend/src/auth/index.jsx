import React from 'react'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import Login from './login'
import Register from './register'

export default function Authencation() {
    return (
        <div className="bg-[#c9d6ff] bg-gradient-to-r from-[#e2e2e2] to-[#c9d6ff] flex justify-center items-center h-screen">
            <TabGroup className={"bg-[#fff] rounded-3xl shadow-2xl relative overflow-hidden w-[768px] max-w-full min-h-[480px]"}>
                <TabList className={"bg-[#512da8] bg-gradient-to-r from-[#5c6bc0] to-[#8c97d2] flex justify-around rounded-3xl"}>
                    <Tab className={"p-5 w-full hover:bg-[#2e3560] hover:text-white rounded-l-3xl"}>Đăng nhập</Tab>
                    <Tab className={"p-5 w-full hover:bg-[#2e3560] hover:text-white rounded-r-3xl"}>Đăng ký</Tab>
                </TabList>
                <TabPanels className={"grid justify-center items-center w-full my-14"}>
                    <TabPanel><Login /></TabPanel>
                    <TabPanel><Register /></TabPanel>
                </TabPanels>
            </TabGroup>
        </div>
    )
}
