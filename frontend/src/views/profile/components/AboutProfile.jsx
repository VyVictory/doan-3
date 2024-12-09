import { PaperClipIcon } from '@heroicons/react/20/solid'
import { PencilSquareIcon } from '@heroicons/react/24/solid'
import { Button } from '@headlessui/react'
import ModalUpdateProfile from './ModalUpdateProfile'
import { useState } from 'react';
export default function About() {
    const [open, setOpen] = useState(false);
    const handleUpdate = () => {
        setOpen(!open);
    }
    return (
        <div className='w-full py-4 px-10 bg-gradient-to-r from-[#b2aebc] to-[#a891cc] rounded-lg border-[1px] shadow-lg border-[#000000]'>
            <div className="px-4 sm:px-0 text-white flex justify-between">
                <h3 className="text-base font-semibold leading-7 ">Thông tin cá nhân</h3>
                <Button onClick={handleUpdate}><PencilSquareIcon className='size-8' /></Button>
                {open ? <ModalUpdateProfile update={handleUpdate} /> : ''}
            </div>
            <div className="mt-6 border-t-[1px] border-gray-100">
                <dl className="divide-y divide-gray-500">
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 ">Email</dt>
                        <dd className="mt-1 text-sm leading-6  sm:col-span-2 sm:mt-0">ABC@gmail.com</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 ">Nickname</dt>
                        <dd className="mt-1 text-sm leading-6  sm:col-span-2 sm:mt-0">anhvudeptraiso1CTUET</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 ">ngày/tháng/năm sinh</dt>
                        <dd className="mt-1 text-sm leading-6  sm:col-span-2 sm:mt-0">31/02/2003</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 ">Số điện thoại</dt>
                        <dd className="mt-1 text-sm leading-6  sm:col-span-2 sm:mt-0">7749-4953-2169</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 ">Giới tính</dt>
                        <dd className="mt-1 text-sm leading-6  sm:col-span-2 sm:mt-0">Bí mật</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 ">Quốc tịch</dt>
                        <dd className="mt-1 text-sm leading-6  sm:col-span-2 sm:mt-0">Việt Nam</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 ">Bạn đang ở</dt>
                        <dd className="mt-1 text-sm leading-6  sm:col-span-2 sm:mt-0">
                            Cần Thơ
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 ">Tình trạng</dt>
                        <dd className="mt-1 text-sm leading-6  sm:col-span-2 sm:mt-0">Trai 1 con</dd>
                    </div>
                </dl>
            </div >
        </div >
    )
}
