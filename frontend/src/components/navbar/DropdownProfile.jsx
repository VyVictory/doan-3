import React from 'react'
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Link } from 'react-router-dom'
import { UserCircleIcon } from '@heroicons/react/24/outline'
export default function DropdownProfile() {
    return (
        <Menu>
            <MenuButton className=" rounded-full inline-flex items-center bg-gray-800 p-1 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-700 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">

                <img
                    className='rounded-full w-12'
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                {/* <ChevronDownIcon className="size-4 fill-white/60" /> */}
            </MenuButton>

            <MenuItems
                transition
                anchor="bottom end"
                className="w-56 mt-3 origin-top-right rounded-xl border border-white/5 bg-white/5 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
            >
                <MenuItem>
                    <Link to={"user"} className="group flex w-full items-center gap-2 rounded-lg p-3 data-[focus]:bg-white/10">
                        {/* <PencilIcon className="size-4 fill-white/30" /> */}
                        <UserCircleIcon className='size-5' />
                        Trang cá nhân
                    </Link>
                </MenuItem>

            </MenuItems>
        </Menu>
    )
}
