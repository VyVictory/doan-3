import React from 'react'
import { Link } from 'react-router-dom'
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from '@heroicons/react/24/outline'
export default function Login() {
    return (
        <div className='bg-gradient-to-r from-[#24C6DC] to-[#514A9D] h-screen'>
            <form className='text-black pt-[32px] px-[48px] fixed rounded-2xl top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 bg-white h-[80%] w-[35%]'>
                <h1 className='font-bold text-3xl text-center pt-[48px]'>Đăng nhập</h1>
                <div className="mb-4 pt-[24px]">
                    <label for="email" className="block text-gray-700 text-sm font-bold mb-2">Tài khoản</label>
                    <input type="text" id="email" className="bg-white shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Nhập email/sđt" />
                </div>
                <div className="mb-6">
                    <label for="password" className="block text-gray-700 text-sm font-bold mb-2">
                        Mật khẩu
                        <a href="#" className="float-right font-normal text-gray-500 hover:text-gray-700">Quên mật khẩu?</a>
                    </label>
                    <input type="password" id="password" className=" bg-white shadow appearance-none border border-red rounded w-full py-4 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" placeholder="Nhập mật khẩu" />
                </div>
                <button className="btn btn-primary w-full mb-8">Đăng nhập</button>
                <div className='flex justify-center items-center mb-2'>
                    <ChevronDoubleLeftIcon className='size-5' />
                    <div>hoặc đăng nhập bằng</div>
                    <ChevronDoubleRightIcon className='size-5' />
                </div>
                <div className='grid justify-center mb-4'>
                    <div className='border-2 p-2 rounded-xl border-yellow-400 font-semibold flex items-center gap-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="22.875" viewBox="0 0 488 512"><path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" /></svg>
                        GOOGLE
                    </div>
                </div>
                <div className="flex items-center justify-between mt-4">
                    <span className="inline-block align-baseline">Bạn chưa có tài khoản?</span>
                    <Link to="/register" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                        Đăng ký ngay
                    </Link>
                </div>
            </form>
        </div>
    )
}
