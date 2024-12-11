import { React, useState } from 'react'

import { Link } from 'react-router-dom'
import { UserCircleIcon } from '@heroicons/react/24/outline'
import authToken from '../../components/authToken'
import LogOut from '../Status/Logout'

export default function DropdownProfile({ user }) {
    const [logout, setLogout] = useState(false)
    function sys() {
        setLogout(!logout);
    }

    return (
        // <div className='block relative'> {/* Add relative positioning here */}
        //     <Menu>
        //         <MenuButton className="rounded-full inline-flex items-center bg-gray-800 p-1 text-sm font-semibold text-white shadow-inner shadow-white/10 focus:outline-none">
        // <img
        //     className='rounded-full w-12'
        //     alt="Profile"
        //     src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        //         </MenuButton>
        //         <div className='z-50'>
        //             {authToken.getToken() !== null ? (
        //                 <MenuItems
        //                     anchor="bottom end"
        //                     className="w-56 mt-3 origin-top-right rounded-xl border border-white/5 p-1 text-sm text-white transition duration-100 ease-out focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 absolute z-50 bg-gray-800" // Set a solid background color (bg-gray-800)
        //                 >   
        //                     <MenuItem>
        // <Link to={"user"} className="group flex w-full items-center gap-2 rounded-lg p-3 data-[focus]:bg-white/10 text-border">
        //     <UserCircleIcon className='size-5' />
        //     Trang cá nhân
        // </Link>
        //                     </MenuItem>
        //                     <MenuItem>
        //                         <Link onClick={sys} className="group flex w-full items-center gap-2 rounded-lg p-3 data-[focus]:bg-white/10 text-border">
        //                             Đăng xuất
        //                         </Link>
        //                     </MenuItem>
        //                 </MenuItems>
        //             ) : (
        //                 <MenuItems
        //                     transition
        //                     anchor="bottom end"
        //                     className="w-56 mt-3 origin-top-right rounded-xl border border-white/5 p-1 text-sm text-white transition duration-100 ease-out focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 absolute z-50 bg-gray-800" // Set a solid background color (bg-gray-800)
        //                 >
        //                     <MenuItem>
        // <Link to={"/login"} className="group flex w-full items-center gap-2 rounded-lg p-3 data-[focus]:bg-white/10 text-border">
        //     Login
        // </Link>
        //                     </MenuItem>
        //                 </MenuItems>
        //             )}
        //         </div>

        // {logout && (
        //     <LogOut btnOffLogout={sys} />
        // )}
        //     </Menu>
        // </div>
        <div className="dropdown dropdown-end ">
            <div tabIndex={0} role="button" className="m-3">
                <img
                    className='rounded-full aspect-square w-12'
                    alt="Profile"
                    src={`${user.avatar ? user.avatar : "https://th.bing.com/th/id/OIP.PKlD9uuBX0m4S8cViqXZHAHaHa?rs=1&pid=ImgDetMain"}`} />
            </div>
            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">

                <li>
                    <Link to={"user"} className="group flex w-full items-center gap-2 rounded-lg p-3 data-[focus]:bg-white/10 text-border">
                        <UserCircleIcon className='size-5' />
                        Trang cá nhân
                    </Link>
                </li>
                <li>
                    <Link onClick={sys} className="group flex w-full items-center gap-2 rounded-lg p-3 data-[focus]:bg-white/10 text-border">
                        Đăng xuất
                    </Link>
                </li>
            </ul>
            {logout && (
                <LogOut btnOffLogout={sys} />
            )}
        </div>
    )
}
