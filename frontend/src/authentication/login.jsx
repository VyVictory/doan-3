import React from 'react'
import { Input } from '@headlessui/react'
import { Button } from '@headlessui/react'

export default function Login() {
    return (
        <div className='grid justify-center items-center gap-4'>
            <p>Đăng nhập bằng gmail LOGO</p>
            <p>Sử dụng email hoặc số điện thoại của bạn để đăng nhập</p>
            <Input className={"bg-[#eee] border-none rounded-md py-3 px-2"} type="text" placeholder='nhập email/số điện thoại' />
            <Input className={"bg-[#eee] border-none rounded-md py-3 px-2"} type="text" placeholder='nhập mật khẩu' />
            <Button className="rounded bg-sky-600 py-4 px-4 text-sm text-white data-[hover]:bg-sky-500 data-[active]:bg-sky-700">
                Đăng nhập
            </Button>
        </div >
    )
}
