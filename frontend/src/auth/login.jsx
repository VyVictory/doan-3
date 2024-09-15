import React from 'react'
import { Input } from '@headlessui/react'
import { Button } from '@headlessui/react'
import { Link } from 'react-router-dom'
export default function Login() {
    return (
        <div className=''>
            <Link><svg xmlns="http://www.w3.org/2000/svg" height="24" width="22.875" viewBox="0 0 488 512"><path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" /></svg></Link>
            <p>Sử dụng email hoặc số điện thoại của bạn để đăng nhập</p>
            <form className='grid gap-5 min-w-[450px]' action="">
                <Input className={"bg-[#eee] border-none rounded-xl py-3 px-2"} type="email" placeholder='Email' />
                <Input className={"bg-[#eee] border-none rounded-xl py-3 px-2"} type="password" placeholder='Mật khẩu' />
                <Link>Bạn quên mật khẩu?</Link>
                <Button className="rounded bg-sky-600 py-4 px-4 text-sm text-white data-[hover]:bg-sky-500 data-[active]:bg-sky-700">
                    Đăng nhập
                </Button>
            </form>
        </div >
    )
}
