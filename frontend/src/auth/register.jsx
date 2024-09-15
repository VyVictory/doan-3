import React from 'react'
import { Input } from '@headlessui/react'
import { Button } from '@headlessui/react'
import { Link } from 'react-router-dom'
export default function Register() {
    return (
        <div>
            <form className='grid gap-5 min-w-[450px]' action="">
                <Input className={"bg-[#eee] border-none rounded-xl py-3 px-2"} type="email" placeholder='Email' required />
                <Input className={"bg-[#eee] border-none rounded-xl py-3 px-2"} type="tel" placeholder='Số điện thoại' required />
                <Input className={"bg-[#eee] border-none rounded-xl py-3 px-2"} type="password" placeholder='Mật khẩu' required />
                <Button className="rounded bg-sky-600 py-4 px-4 text-sm text-white data-[hover]:bg-sky-500 data-[active]:bg-sky-700">
                    Đăng ký
                </Button>
            </form>
        </div>
    )
}
