import React from 'react'
import { Link, useLocation } from 'react-router-dom'
export default function MenuOtherProfiles() {
    const location = useLocation();
    const categories = [
        {
            name: 'Bài đăng',
            href: ''
        },
        {
            name: 'Giới thiệu',
            href: 'about'
        },
        {
            name: 'Bạn bè',
            href: 'friends'
        },
    ];
    const currentTab = categories.find((category) => location.pathname === category.href);

    return (
        <div className=" flex justify-center border-t-[1px] w-full gap-4 p-5">
            {categories.map(({ name, href }) => (
                <Link
                    key={name}
                    to={href}
                    className={`rounded-full py-2 px-4 text-sm/6 font-semibold focus:outline-none ${currentTab?.href === href ? 'bg-gray-600 text-white' : ''}`}>
                    {name}
                </Link>
            ))}
        </div>
    )
}
