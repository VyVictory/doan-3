import { React, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, UserGroupIcon, ChatBubbleLeftIcon, SpeakerWaveIcon, BookmarkIcon } from '@heroicons/react/24/outline';
import { Tabs, Tab } from '@mui/material';
import SearchBar from './SearchBar';
import DropdownProfile from './DropdownProfile';
import authToken from "../../components/authToken";
import { profileUserCurrent } from '../../service/ProfilePersonal';


export default function Navbar() {
    //
    const [user, setUser] = useState({})

    //e
    useEffect(() => {
        const fetchdata = async () => {
            const response = await profileUserCurrent();
            setUser(response)
        }
        fetchdata()
    }, [])
    //
    const location = useLocation();
    const isActiveTab = (path) => location.pathname === path;

    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    const [chanecontainer, setChanecontainer] = useState(windowSize.width < 767)
    useEffect(() => {
        // Hàm cập nhật kích thước màn hình
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
            setChanecontainer(window.innerWidth > 767);
        };

        // Thêm event listener khi cửa sổ thay đổi kích thước
        window.addEventListener("resize", handleResize);
        // Cleanup event listener khi component bị unmount
        // return () => {
        //     window.removeEventListener("resize", handleResize);
        // };
    }, []);
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

                        {!authToken.getToken() ? (
                            <div></div>
                        ) : (
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-gray-100 border-gray-300 border rounded-box z-10 mt-3 w-52 p-2 shadow"
                            >

                                <Tab
                                    component={Link}
                                    to="/"
                                    icon={<HomeIcon className={`h-6 w-full ${isActiveTab('/') ? 'text-blue-500' : 'text-gray-500'}`} />}
                                    aria-label="Home"
                                />
                                <Tab
                                    component={Link}
                                    to="/friends/list"
                                    icon={<UserGroupIcon className={`h-6 w-full ${(isActiveTab('/friends/list') || isActiveTab('/friends/requests')) ? 'text-blue-500' : 'text-gray-500'}`} />}
                                    aria-label="Friends"
                                />
                                <Tab
                                    component={Link}
                                    to="/messenger"
                                    icon={<ChatBubbleLeftIcon className={`h-6 w-full ${isActiveTab('/messenger') ? 'text-blue-500' : 'text-gray-500'}`} />}
                                    aria-label="Messenger"
                                />
                                <Tab
                                    component={Link}
                                    to="/bookmark"
                                    icon={<BookmarkIcon className={`h-6 w-full ${isActiveTab('/bookmark') ? 'text-blue-500' : 'text-gray-500'}`} />}
                                    aria-label="save"
                                />

                            </ul>
                        )}
                    </div>
                    <button className={`pl-5 pr-2 z-10 ${windowSize.width < 400 ? 'hidden' : ''}`}>
                        <Link to={"/"}>
                            <img src="https://i.pinimg.com/564x/e3/e5/dc/e3e5dc4143d77b3dcea61776d372928c.jpg" alt=''
                                className="h-12 aspect-square rounded-full shadow-md flex items-center justify-center" />
                        </Link>
                    </button>
                    {authToken.getToken() === null ? (
                        <div></div>
                    ) : (
                        <div className={`w-full flex justify-center absolute h-full items-center ${windowSize.width < 767 ? 'hidden' : ''}`}>
                            <Tabs value={false} aria-label="Navigation Tabs" >
                                <Tab
                                    component={Link}
                                    to="/"
                                    icon={<HomeIcon className={`h-6 w-6 ${isActiveTab('/') ? 'text-blue-500' : 'text-gray-500'}`} />}
                                    aria-label="Home"
                                />
                                <Tab
                                    component={Link}
                                    to="/friends/list"
                                    icon={<UserGroupIcon className={`h-6 w-6 ${(isActiveTab('/friends/list') || isActiveTab('/friends/requests')) ? 'text-blue-500' : 'text-gray-500'}`} />}
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
                                    to="/bookmark"
                                    icon={<BookmarkIcon className={`h-6 w-6 ${isActiveTab('/bookmark') ? 'text-blue-500' : 'text-gray-500'}`} />}
                                    aria-label="save"
                                />
                            </Tabs>
                        </div>
                    )}
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

                    <label className="swap swap-rotate">
                        {/* this hidden checkbox controls the state */}
                        <input type="checkbox" />
                        {/* sun icon */}
                        <svg

                            className="swap-on h-7 w-7 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24">
                            <path
                                d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                        </svg>
                        {/* moon icon */}
                        <svg

                            className="swap-off h-7 w-7 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24">
                            <path
                                d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                        </svg>
                    </label>

                    {authToken.getToken() !== null ? (
                        <DropdownProfile user={user} />
                    ) : (
                        <div className="m-1 z-10">
                            <Link to={"/login"} className='bg-[#007bff] px-3 py-3 rounded-lg'>Đăng nhập</Link>
                        </div>
                    )}
                </div>
            </div >
        </>
    );
}
