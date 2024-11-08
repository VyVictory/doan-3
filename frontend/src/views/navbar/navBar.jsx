import { React, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, UserGroupIcon, ChatBubbleLeftIcon, SpeakerWaveIcon } from '@heroicons/react/24/outline';
import { Tabs, Tab } from '@mui/material';
import SearchBar from './SearchBar';
import DropdownProfile from './DropdownProfile';
import authToken from "../../components/authToken";

export default function Navbar() {
    const location = useLocation();
    const isActiveTab = (path) => location.pathname === path;
    // nó là urrl là cái j thì == thì nó code css
    return (
        <>
            <div className="navbar fixed bg-white border border-b-gray-300 shadow-[0_1px_5px_rgba(0,0,0,0.2)] text-black p-0 z-10">
                <div className="flex-1">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden z-10">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li><a>Bạn bè</a></li>
                            <li><a>Nhắn tin</a></li>
                            <li><a>dddd</a></li>
                        </ul>
                    </div>
                    <button className="pl-5 pr-2 z-10">
                        <Link to={"/"}>
                            <img src="https://i.pinimg.com/564x/e3/e5/dc/e3e5dc4143d77b3dcea61776d372928c.jpg"
                                className="h-12 aspect-square rounded-full shadow-md flex items-center justify-center" />
                        </Link>
                    </button>

                    <div className="w-full flex justify-center absolute h-full items-center">
                        <Tabs value={false} aria-label="Navigation Tabs">
                            <Tab
                                component={Link}
                                to="/"
                                icon={<HomeIcon className={`h-6 w-6 ${isActiveTab('/') ? 'text-blue-500' : 'text-gray-500'}`} />}
                                aria-label="Home"
                            />
                            <Tab
                                component={Link}
                                to="/friends/list"
                                icon={<UserGroupIcon className={`h-6 w-6 ${(isActiveTab('/friends/list')||isActiveTab('/friends/requests')) ? 'text-blue-500' : 'text-gray-500'}`} />}
                                aria-label="Friends"
                            />
                            <Tab
                                component={Link}
                                to="/messenger"
                                icon={<ChatBubbleLeftIcon className={`h-6 w-6 ${isActiveTab('/messenger') ? 'text-blue-500' : 'text-gray-500'}`} />}
                                aria-label="Messenger"
                            />
                            <Tab
                                component={Link}
                                to="/save_cái_đầu_m_á_dũ_là_cái_j_-.-"
                                icon={<SpeakerWaveIcon className={`h-6 w-6 ${isActiveTab('/save_cái_đầu_m_á_dũ_là_cái_j_-.-') ? 'text-blue-500' : 'text-gray-500'}`} />}
                                aria-label="save"
                            />
                        </Tabs>
                    </div>
                </div>

                <div className="flex-none gap-2">
                    <div className="form-control">
                        <SearchBar />
                    </div>
                    <button className="btn btn-ghost btn-circle">
                        <div className="indicator">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                            <span className="badge badge-xs badge-primary indicator-item"></span>
                        </div>
                    </button>

                    {authToken.getToken() !== null ? (
                        <DropdownProfile />
                    ) : (
                        <div className="m-1 z-10">
                            <Link to={"/login"} className='bg-[#007bff] px-3 py-3 rounded-lg'>Đăng nhập</Link>
                        </div>
                    )}
                </div>
            </div>
            <div className="h-[68px]"></div>
        </>
    );
}
