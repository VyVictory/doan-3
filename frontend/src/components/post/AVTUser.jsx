import React from 'react'
import CardUser from './CardUser'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'

export default function AVTUser() {
    return (

        <div div className="dropdown dropdown-hover" >
            <div tabIndex={0} >
                <div className="mask mask-squircle w-14">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
            </div>
            <ul tabIndex={0} className="dropdown-content menu bg-blue-700 rounded-box z-0 w-[350px] p-1 shadow">
                <CardUser />
            </ul>
        </div >
        // <Popover className="">
        //     <PopoverButton data-hover ><div className="mask mask-squircle w-14">
        //         <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        //     </div></PopoverButton>
        //     <PopoverPanel data-hover anchor="bottom" className="flex flex-col bg-red-900">
        //         <CardUser />
        //     </PopoverPanel>
        // </Popover>


    )
}
