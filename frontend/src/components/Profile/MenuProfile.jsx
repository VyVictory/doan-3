import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { Link, useLocation } from 'react-router-dom'

export default function MenuProfile() {
    const location = useLocation();
    const categories = [
        {
            name: 'Bài đăng',
            href: '/user'
        },
        {
            name: 'Giới thiệu',
            href: '/user/about'
        },
        {
            name: 'Bạn bè',
            href: '/user/friend'
        },
    ];
    const currentTab = categories.find((category) => location.pathname === category.href);

    return (
        <div className="flex justify-center border-t-[1px] mx-60">
            <div className="">
                <TabGroup>
                    <TabList className="flex gap-4 p-5">
                        {categories.map(({ name, href }) => (
                            <Tab
                                key={name}
                            >
                                <Link to={href} className={`rounded-full py-2 px-4 text-sm/6 font-semibold text-white focus:outline-none ${currentTab?.href === href ? 'bg-white/10' : ''}`}>{name}</Link>
                            </Tab>
                        ))}
                    </TabList>
                </TabGroup>
            </div>
        </div>
    )
}
