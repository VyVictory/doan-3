import React from "react"
import DropdownFriendProfile from "../profile/components/DropdownFriendProfile"

export default function FriendProfile() {
  return (
    <ul role="list" className="grid gap-3 sm:grid-cols-2 sm:gap-y-3 xl:col-span-2 bg-[#0F172A] p-3">
      <li className='border-2 border-white rounded-md p-2 bg-[#1e293b]'>
        <div className="flex justify-between">
          <div className="flex items-center gap-x-6">
            <img alt="" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" className="h-16 w-16 rounded-full" />
            <div>
              <h3 className="text-base font-semibold leading-7 tracking-tight text-slate-200">Leslie Alexander</h3>
              <p className="text-sm font-semibold leading-6 text-indigo-600">Co-Founder / CEOd</p>
            </div>
          </div>
          <DropdownFriendProfile />
        </div>
      </li>
      {/* 2 */}
      <li className='border-2 border-white rounded-md p-2 bg-[#1e293b]'>
        <div className="flex justify-between">
          <div className="flex items-center gap-x-6">
            <img alt="" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" className="h-16 w-16 rounded-full" />
            <div>
              <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">Leslie Alexander</h3>
              <p className="text-sm font-semibold leading-6 text-indigo-600">Co-Founder / CEOd</p>
            </div>
          </div>
          <DropdownFriendProfile />
        </div>
      </li>
      {/* 3 */}
      <li className='border-2 border-white rounded-md p-2 bg-[#1e293b]'>
        <div className="flex justify-between">
          <div className="flex items-center gap-x-6">
            <img alt="" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" className="h-16 w-16 rounded-full" />
            <div>
              <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">Leslie Alexander</h3>
              <p className="text-sm font-semibold leading-6 text-indigo-600">Co-Founder / CEOd</p>
            </div>
          </div>
          <DropdownFriendProfile />
        </div>
      </li>
      {/* 4 */}
      <li className='border-2 border-white rounded-md p-2 bg-[#1e293b]'>
        <div className="flex justify-between">
          <div className="flex items-center gap-x-6">
            <img alt="" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" className="h-16 w-16 rounded-full" />
            <div>
              <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">Leslie Alexander</h3>
              <p className="text-sm font-semibold leading-6 text-indigo-600">Co-Founder / CEOd</p>
            </div>
          </div>
          <DropdownFriendProfile />
        </div>
      </li>
    </ul>

  )
}
