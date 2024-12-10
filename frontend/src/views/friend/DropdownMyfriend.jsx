
import {
    ChevronDownIcon,
    HeartIcon,
    ChatBubbleOvalLeftIcon,
    NoSymbolIcon,
    UserMinusIcon
} from '@heroicons/react/16/solid'

export default function DropdownMyfriend({ nameBTN }) {
    return (
        <div className="dropdown">
            <div tabIndex={0} role="button" className="p-2 hover:bg-gray-300 rounded-full">
                <ChevronDownIcon className="size-5 fill-black" />
            </div>
            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                <li>
                    <a className=" block data-[focus]:bg-[#3f3f46] p-2 rounded-md flex items-center gap-2" href="#">
                        <HeartIcon className="size-5 fill-red-600" />
                        Yêu thích
                    </a>
                </li>
                <li>
                    <a className=" block data-[focus]:bg-[#3f3f46] p-2 rounded-md flex items-center gap-2" href="#">
                        <ChatBubbleOvalLeftIcon className="size-5 fill-blue-300" />
                        Nhắn tin
                    </a>
                </li>
                <li>
                    <a className=" block data-[focus]:bg-[#3f3f46] p-2 rounded-md flex items-center gap-2" href="#">
                        <NoSymbolIcon className="size-5 fill-red-800" />
                        Chặn
                    </a>
                </li>
                <li>
                    <a className="block data-[focus]:bg-[#3f3f46] p-2 rounded-md flex items-center gap-2" href="#">
                        <UserMinusIcon className="size-5 fill-red-500" />
                        Hủy kết bạn
                    </a>
                </li>
            </ul>
        </div>


        // <Menu>
        //     <MenuButton>
        //         {/* <ChevronDownIcon className="size-7 fill-white/60" /> */}
        //         {nameBTN}
        //     </MenuButton>
        //     <MenuItems anchor="bottom" className="w-52 bg-[#343455] rounded-md p-1">
        //         <MenuItem>
        // <a className="text-white block data-[focus]:bg-[#3f3f46] p-2 rounded-md flex items-center gap-2" href="#">
        //     <HeartIcon className="size-5 fill-red-600" />
        //     Yêu thích
        // </a>
        //         </MenuItem>
        //         <MenuItem>
        // <a className="text-white block data-[focus]:bg-[#3f3f46] p-2 rounded-md flex items-center gap-2" href="#">
        //     <ChatBubbleOvalLeftIcon className="size-5 fill-blue-300" />
        //     Nhắn tin
        // </a>
        //         </MenuItem>
        //         <MenuItem>
        // <a className="text-white block data-[focus]:bg-[#3f3f46] p-2 rounded-md flex items-center gap-2" href="#">
        //     <NoSymbolIcon className="size-5 fill-red-800" />
        //     Chặn
        // </a>
        //         </MenuItem>
        //         <MenuItem>
        // <a className="text-white block data-[focus]:bg-[#3f3f46] p-2 rounded-md flex items-center gap-2" href="#">
        //     <UserMinusIcon className="size-5 fill-red-500" />
        //     Hủy kết bạn
        // </a>
        //         </MenuItem>
        //     </MenuItems>
        // </Menu>
    )
}
