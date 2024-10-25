import React from 'react'
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useFormAction } from 'react-router-dom'

const initFormData = {
    numberPhone: '',
    firstName: '',
    lastName: '',
    address: '',
    gender: '',
    birthday: '',
    password: '',
    confirmPassword: ''
}
export default function Register() {
    const [formData, setFormData] = useState(initFormData);
    const [errors, setErrors] = useState({});
    // Hàm kiểm tra dữ liệu nhập
    const validateForm = () => {
        const errors = {};
        if (!formData.email) {
            errors.email = 'Email là bắt buộc';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Email không hợp lệ';
        }
        if (!formData.password) errors.password = 'Bắt buộc nhập mật khẩu';
        if (formData.password.length < 8) {
            errors.password = 'Mật khẩu quá ngắn';
        }
        if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = 'Mật khẩu không khớp nhau';
        }
        return errors;
    };
    // Hàm xử lý khi submit form
    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length === 0) {
            // Nếu không có lỗi, submit form
            console.log('Form data:', formData);
            alert('Form submitted successfully!');
        } else {
            setErrors(validationErrors);
        }
    };
    // Hàm xử lý khi người dùng nhập liệu
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    return (
        <div className='bg-gradient-to-r from-[#514A9D] to-[#24C6DC] h-screen'>
            <form onSubmit={handleSubmit}
                className='text-black pt-[15px] px-[48px] fixed rounded-2xl top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 bg-white h-[90%] w-[35%]'>
                <h1 className='font-bold text-3xl text-center pt-[10px]'>Đăng ký</h1>
                <div className='flex gap-20 mt-6 mb-4'>
                    <input
                        type="text"
                        id="lastname"
                        className="bg-white shadow appearance-none border rounded w-full py-4 px-3  leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Họ"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        id="firstname"
                        className="bg-white shadow appearance-none border rounded w-full py-4 px-3  leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="tên"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />

                </div>
                <div className='grid gap-3'>
                    <input
                        type="tel"
                        id="tel"
                        className="bg-white shadow appearance-none border rounded w-full py-3 px-3  leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Số điện thoại"
                        value={formData.numberPhone}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="date"
                        name="date"
                        id="date"
                        className='border-black bg-white shadow appearance-none border rounded w-full py-3 px-3  leading-tight focus:outline-none focus:shadow-outline'
                        value={formData.birthday}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        id="address"
                        className="bg-white shadow appearance-none border rounded w-full py-3 px-3  leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Địa chỉ"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />
                    <select
                        name='gender' id='gender' className="select select-bordered bg-white shadow appearance-none border rounded w-full py-3 px-3  leading-tight focus:outline-none focus:shadow-outline "
                        value={formData.gender}
                        onChange={handleChange}
                        required
                    >
                        <option disabled selected>Giới tính</option>
                        <option name='gender' value={'nam'}>Nam</option>
                        <option name='gender' value={'nu'}>Nữ</option>
                        <option name='gender' value={'khac'}>Khác</option>
                    </select>
                    <input
                        type="password"
                        id="password"
                        className="bg-white shadow appearance-none border rounded w-full py-3 px-3  leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Mật khẩu"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
                    <input
                        type="password"
                        id="confirmpassword"
                        className="bg-white shadow appearance-none border rounded w-full py-3 px-3  leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Nhập lại mật khẩu"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                    {errors.confirmPassword && (
                        <p style={{ color: 'red' }}>{errors.confirmPassword}</p>
                    )}
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
