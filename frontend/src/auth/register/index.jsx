import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Đảm bảo CSS được import
import NotificationCss from '../../module/cssNotification/NotificationCss';
import Apiuri from '../../service/apiuri';

const uri = Apiuri();

export default function Register() {
    const [formData, setFormData] = useState({
        numberPhone: '',
        firstName: '',
        lastName: '',
        address: '',
        gender: '',
        birthday: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validateForm = () => {
        const validationErrors = {};
        if (!formData.password) {
            validationErrors.password = 'Bắt buộc nhập mật khẩu';
        } else if (formData.password.length < 8) {
            validationErrors.password = 'Mật khẩu quá ngắn';
        }

        if (formData.password !== formData.confirmPassword) {
            validationErrors.confirmPassword = 'Mật khẩu không khớp nhau';
        }
        return validationErrors;
    };

    const handleRemoveError = (field) => {
        setErrors((prevErrors) => {
            const updatedErrors = { ...prevErrors };
            delete updatedErrors[field];
            return updatedErrors;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            // Hiển thị thông báo lỗi thông qua Toast
            Object.values(validationErrors).forEach((error) => {
                toast.error(error, NotificationCss.Fail);
            });
            return;
        }

        try {
            const response = await axios.post(`${uri}/user/register`, formData);
            if (response.status === 201) {
                toast.success('Đăng ký thành công!', NotificationCss.Success);
                setTimeout(() => navigate('/login'), 2000);
            } else {
                toast.error(response.data.message, NotificationCss.Fail);
            }
        } catch (error) {
            const errorMessage =
                error.response && error.response.data && error.response.data.message
                    ? error.response.data.message
                    : 'Đăng ký thất bại, vui lòng thử lại!';
            toast.error(errorMessage, NotificationCss.Fail);
            console.error('Lỗi:', error.response || error.message);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        handleRemoveError(name); // Xóa lỗi khi người dùng nhập lại
    };

    return (
        <>
            <div className="bg-gradient-to-r from-[#514A9D] to-[#24C6DC] h-screen grid place-items-center">
                <form
                    method="POST"
                    onSubmit={handleSubmit}
                    className="text-black rounded-2xl bg-white px-10 py-8"
                >
                    <h1 className="font-bold text-3xl text-center pt-[15px]">Đăng ký</h1>
                    <div className="flex gap-20 mt-6 mb-4">
                        <input
                            type="text"
                            name="lastName"
                            className="bg-white shadow appearance-none border rounded w-full py-4 px-3 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Họ"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="firstName"
                            className="bg-white shadow appearance-none border rounded w-full py-4 px-3 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Tên"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="grid gap-3">
                        <input
                            type="tel"
                            name="numberPhone"
                            className="bg-white shadow appearance-none border rounded w-full py-3 px-3 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Số điện thoại"
                            value={formData.numberPhone}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="date"
                            name="birthday"
                            className="border-black bg-white shadow appearance-none border rounded w-full py-3 px-3 leading-tight focus:outline-none focus:shadow-outline"
                            value={formData.birthday}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="address"
                            className="bg-white shadow appearance-none border rounded w-full py-3 px-3 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Địa chỉ"
                            value={formData.address}
                            onChange={handleChange}
                            required
                        />
                        <select
                            name="gender"
                            className="bg-white shadow appearance-none border rounded w-full py-3 px-3 leading-tight focus:outline-none focus:shadow-outline"
                            value={formData.gender}
                            onChange={handleChange}
                            required
                        >
                            <option disabled value="">
                                Giới tính
                            </option>
                            <option value="true">Nam</option>
                            <option value="false">Nữ</option>
                        </select>
                        <input
                            type="password"
                            name="password"
                            className="bg-white shadow appearance-none border rounded w-full py-3 px-3 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Mật khẩu"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
                        <input
                            type="password"
                            name="confirmPassword"
                            className="bg-white shadow appearance-none border rounded w-full py-3 px-3 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Nhập lại mật khẩu"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                        {errors.confirmPassword && (
                            <p style={{ color: 'red' }}>{errors.confirmPassword}</p>
                        )}
                        <button type="submit" className="btn btn-primary w-full mb-3 text-white">
                            Đăng ký
                        </button>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                        <span className="inline-block align-baseline">Bạn đã có tài khoản?</span>
                        <Link
                            to="/login"
                            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                        >
                            Đăng nhập ngay
                        </Link>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </>
    );
}
