import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import {
    ArchiveBoxXMarkIcon,
    ChevronDownIcon,
    PencilIcon,
    Square2StackIcon,
    TrashIcon,
    BellIcon
} from '@heroicons/react/16/solid'

export default function Notification() {
    return (

        <Menu>
            <MenuButton className="inline-flex items-center gap-2 rounded-full bg-gray-800 py-2 px-2.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-700 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
                <BellIcon aria-hidden="true" className="h-6 w-6" />
            </MenuButton>

            <MenuItems
                transition
                anchor="bottom end"
                className="w-80 origin-top-right relative z-10 rounded-xl border border-white/5 bg-[#475569] p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
            >
                <MenuItem>
                    <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                        <PencilIcon className="size-4 fill-white/30" />
                        Edit
                        <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">⌘E</kbd>
                    </button>
                </MenuItem>
                <MenuItem>
                    <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                        <Square2StackIcon className="size-4 fill-white/30" />
                        Duplicate
                        <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">⌘D</kbd>
                    </button>
                </MenuItem>
                <div className="my-1 h-px bg-white/5" />
                <MenuItem>
                    <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                        <ArchiveBoxXMarkIcon className="size-4 fill-white/30" />
                        Archive
                        <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">⌘A</kbd>
                    </button>
                </MenuItem>
                <MenuItem>
                    <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                        <TrashIcon className="size-4 fill-white/30" />
                        Delete
                        <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">⌘D</kbd>
                    </button>
                </MenuItem>
            </MenuItems>
        </Menu>

    )
}