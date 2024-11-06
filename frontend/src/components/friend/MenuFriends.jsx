import React from 'react'
import { Link } from 'react-router-dom'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { useLocation } from 'react-router-dom';

export default function MenuFriends() {
    const location = useLocation();
    const categories = [
        {
            name: 'Tất cả bạn bè',
            href: '/friends/list'
        },
        {
            name: 'Lời mời kết bạn',
            href: '/friends/requests'
        }
    ];
    const currentTab = categories.find((category) => location.pathname === category.href);

    return (
        <TabGroup>
            <TabList className={"flex justify-between mt-2"}>
                {categories.map(({ name, href }) => (
                    <Link to={href} className={`w-full mx-2  py-4 px-4 text-sm/6 font-semibold  focus:outline-none ${currentTab?.href === href ? 'bg-gray-200' : ''}`}>{name}</Link>
                ))}
            </TabList>
        </TabGroup>
    )
}
