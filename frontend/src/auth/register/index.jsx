import React from 'react'
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
export default function Register() {
    return (
        <div className='bg-gradient-to-r from-[#514A9D] to-[#24C6DC] h-screen'>
            <form className='text-black pt-[15px] px-[48px] fixed rounded-2xl top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 bg-white h-[90%] w-[35%]'>
                <h1 className='font-bold text-3xl text-center pt-[10px]'>Đăng ký</h1>
                <div className='flex gap-20 mt-6 mb-4'>
                    <input type="text" id="lastname" className="bg-white shadow appearance-none border rounded w-full py-4 px-3  leading-tight focus:outline-none focus:shadow-outline" placeholder="Họ" />
                    <input type="text" id="firstname" className="bg-white shadow appearance-none border rounded w-full py-4 px-3  leading-tight focus:outline-none focus:shadow-outline" placeholder="tên" />
                </div>
                <div className='grid gap-3'>
                    <input type="email" id="email" className="bg-white shadow appearance-none border rounded w-full py-3 px-3  leading-tight focus:outline-none focus:shadow-outline" placeholder="email của bạn" />
                    <input type="tel" id="tel" className="bg-white shadow appearance-none border rounded w-full py-3 px-3  leading-tight focus:outline-none focus:shadow-outline" placeholder="Số điện thoại" />
                    <input type="date" name="date" id="date" className='border-black bg-white shadow appearance-none border rounded w-full py-3 px-3  leading-tight focus:outline-none focus:shadow-outline' />
                    <input type="text" id="address" className="bg-white shadow appearance-none border rounded w-full py-3 px-3  leading-tight focus:outline-none focus:shadow-outline" placeholder="Địa chỉ" />
                    <select name='gender' id='gender' className="select select-bordered bg-white shadow appearance-none border rounded w-full py-3 px-3  leading-tight focus:outline-none focus:shadow-outline ">
                        <option disabled selected>Giới tính</option>
                        <option name='gender' value={'nam'}>Nam</option>
                        <option name='gender' value={'nu'}>Nữ</option>
                        <option name='gender' value={'khac'}>Khác</option>
                    </select>
                    <input type="password" id="password" className="bg-white shadow appearance-none border rounded w-full py-3 px-3  leading-tight focus:outline-none focus:shadow-outline" placeholder="Mật khẩu" />
                    <input type="password" id="password" className="bg-white shadow appearance-none border rounded w-full py-3 px-3  leading-tight focus:outline-none focus:shadow-outline" placeholder="Nhập lại mật khẩu" />
                    <button className="btn btn-primary w-full mb-3 text-white">Đăng ký</button>
                </div>
                <div className="flex items-center justify-between">
                    <span className="inline-block align-baseline">Bạn đã có tài khoản?</span>
                    <Link to="/login" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                        Đăng nhập ngay
                    </Link>
                </div>
            </form>
        </div>
    )
}
