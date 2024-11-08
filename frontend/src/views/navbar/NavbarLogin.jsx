import React from 'react'
import { Link } from 'react-router-dom'
import SearchBar from './SearchBar'
export default function NavbarLogin() {
    return (
        <div>
            <div className="navbar bg-[#242526] fixed z-10 ">
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
                    <div className=" hidden lg:flex">
                        <ul className="menu menu-horizontal px-2 gap-4">
                            <li><Link to={"/"}>Trang chủ</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="flex-none gap-2">
                    <div className="form-control">
                        <SearchBar />
                    </div>
                    <div className="m-1">
                        <Link to={"/login"} className='bg-[#007bff] px-3 py-3 rounded-lg'>Đăng nhập</Link>
                    </div>

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
                </div>
            </div>
        </div>
    )
}
