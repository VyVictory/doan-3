import UserNavbar from "./UserNavbar";
import {React, useState, useEffect } from 'react';
import SearchBar from './SearchBar'
import DropdownProfile from './DropdownProfile'
import { Link } from 'react-router-dom'
import authToken from "../../Module/authToken";
export default function Navbar() {

    // const [transferUserNavbar, setTransferUserNavbar] = useState(true)
    // const blocklist = ['login', 'admin', 'register'];
    // const location = useLocation();

    // Extracting the path name
    // const path = location.pathname; // This will give you '/auth'

    // // Getting the last part of the path
    // const lastSegment = path.substring(path.lastIndexOf('/') + 1); // 'auth'
    // useEffect(() => {
    //     for (let i = 0; i < blocklist.length; i++) {
    //         if (blocklist[i] == lastSegment) {
    //             setTransferUserNavbar(false)
    //         }
    //     }
    // }, [lastSegment, blocklist]); // Re-run when the URL changes
    return (
        <>
            <div className="navbar fixed bg-white border border-gray-500 text-black   z-10 ">
                <div className="flex-1">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
                            <li>
                                <a>Nhắn tin</a>
                            </li>
                            <li><a>dddd</a></li>
                        </ul>
                    </div>
                    <Link to={"/"} className="btn btn-ghost ">
                        <img src="https://i.pinimg.com/564x/e3/e5/dc/e3e5dc4143d77b3dcea61776d372928c.jpg"
                            className='h-12 w-14 rounded-full' />
                    </Link>
                    <div className="hidden lg:flex">
                        <ul className="menu menu-horizontal px-2 gap-4">
                            <li><Link to={"/"}>Trang chủ</Link></li>
                            <li><Link to={"friends/list"}>Bạn bè</Link></li>
                            <li><Link to={"messenger"}>Nhắn tin</Link></li>
                            <li><a>Đã lưu</a></li>
                        </ul>
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

                    {/* <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 py-2 shadow">
                            <li>
                                <Link to={"user"} className=" py-3">
                                    <UserCircleIcon className='size-5' />
                                    Trang cá nhân
                                </Link>
                            </li>
                            <li><a className="justify-between py-3">Settings</a></li>
                            <li><Link to={'/logout'} className=" py-3">
                                <ArrowRightStartOnRectangleIcon className='size-5' />
                                Đăng xuất
                            </Link></li>
                        </ul> */}
                    {
                        authToken.getToken() !== null ? (
                            <DropdownProfile />
                        ) : (
                            <div className="m-1">
                                <Link to={"/login"} className='bg-[#007bff] px-3 py-3 rounded-lg'>Đăng nhập</Link>
                            </div>
                        )
                    }
                </div>
            </div>
            <div className="h-[68px]"></div>
        </>
    );
}