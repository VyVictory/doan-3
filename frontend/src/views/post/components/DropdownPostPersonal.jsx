import React from 'react'
import { PencilSquareIcon, BookmarkIcon, EllipsisHorizontalIcon, TrashIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
export default function DropdownPostPersonal() {
  return (
    <div className="dropdown">
      <div tabIndex={0} role="button" className="p-2 hover:bg-gray-300 rounded-full">
        <EllipsisHorizontalIcon className="size-5" />
      </div>
      <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
        <li>
          <Link className=" data-[focus]:bg-[#3f3f46] p-2 rounded-md flex items-center gap-2" to="#">
            <BookmarkIcon className="size-5 text-amber-600" />
            Lưu bài viết
          </Link>
        </li>
        <li>
          <Link className=" data-[focus]:bg-[#3f3f46] p-2 rounded-md flex items-center gap-2" to="#">
            <PencilSquareIcon className="size-5 text-sky-600" />
            Chỉnh sửa bài viết
          </Link>
        </li>
        <li>
          <Link className=" data-[focus]:bg-[#3f3f46] p-2 rounded-md flex items-center gap-2" to="#">
            <TrashIcon className="size-5  text-red-600" />
            Xóa bài viết
          </Link>
        </li>
      </ul>
    </div>
  )
}