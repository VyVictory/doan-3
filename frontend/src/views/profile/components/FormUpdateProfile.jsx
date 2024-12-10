import React from 'react'
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { useState } from 'react';
import clsx from 'clsx'

import { CloudArrowUpIcon, CameraIcon } from '@heroicons/react/24/solid';
export default function FormUpdateProfile() {
    const [formData, setFormData] = useState({
        coverphoto: null,
        profilePicture: null,
        username: "",
        email: "",
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
    });
    // lỗi
    const [errors, setErrors] = useState({});
    const validateField = (name, value) => {
        let newErrors = { ...errors };

        switch (name) {
            case "username":
                if (value.length < 3) {
                    newErrors.username = "Username must be at least 3 characters long";
                } else {
                    delete newErrors.username;
                }
                break;
            case "email":
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    newErrors.email = "Invalid email format";
                } else {
                    delete newErrors.email;
                }
                break;
            case "newPassword":
                const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
                if (!passwordRegex.test(value)) {
                    newErrors.newPassword =
                        "Password must be at least 8 characters long and include uppercase, lowercase, numbers, and special characters";
                } else {
                    delete newErrors.newPassword;
                }
                break;
            case "confirmNewPassword":
                if (value !== formData.newPassword) {
                    newErrors.confirmNewPassword = "Passwords do not match";
                } else {
                    delete newErrors.confirmNewPassword;
                }
                break;
            default:
                break;
        }

        setErrors(newErrors);
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        validateField(name, value);
    };

    const handleFileAvtChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, profilePicture: file });
    };

    const handleFileCoverChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, coverphoto: file });
    };



    return (
        <form>
            <div className="space-y-12">
                <h3 className="font-bold text-2xl  my-5 text-center">Cập nhật thông tin</h3>
                <div className="col-span-full">
                    <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                        Ảnh bìa
                    </label>
                    <div className="relative h-52 w-full bg-gray-100 rounded-md overflow-hidden">
                        {formData.coverphoto ? (
                            <img
                                src={URL.createObjectURL(formData.coverphoto)}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="flex items-center justify-center h-full">
                                {/* <MdCloudUpload className="text-4xl text-gray-400" /> */}
                                <PhotoIcon className="size-[80%] text-gray-400" />
                            </div>
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileCoverChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            aria-label="Upload profile picture"
                        />
                    </div>
                </div>
                <div className="col-span-full">
                    <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                        Ảnh đại diện
                    </label>
                    <div className="relative h-48 w-48 bg-gray-100 rounded-md overflow-hidden">
                        {formData.profilePicture ? (
                            <img
                                src={URL.createObjectURL(formData.profilePicture)}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="flex items-center justify-center h-full">
                                {/* <MdCloudUpload className="text-4xl text-gray-400" /> */}
                                <CloudArrowUpIcon className="size-[80%] text-gray-400" />
                            </div>
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileAvtChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            aria-label="Upload profile picture"
                        />
                        <button
                            type="button"
                            className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md"
                            aria-label="Take photo"
                        >
                            {/* <FaCamera className="text-gray-600" /> */}
                            <CameraIcon className=" size-6 text-gray-600" />
                        </button>
                    </div>
                </div>
                <div className="border-b border-gray-900/10 pb-12">
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="col-span-full">
                            <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                                Giới thiệu
                            </label>
                            <div className="mt-2">
                                <textarea
                                    placeholder='Viết cái gì đó dơ dơ vào đây đi bae'
                                    className={clsx(
                                        'mt-3 block w-full resize-none rounded-lg border-2 bg-white/5 py-1.5 px-3 text-sm/6 text-black',
                                        'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                                    )}
                                    rows={3}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-b border-gray-900/10 pb-12">

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                                Họ
                            </label>
                            <div className="mt-2">
                                <input
                                    id="last-name"
                                    name="last-name"
                                    type="text"
                                    autoComplete="family-name"
                                    className="block w-full rounded-md border-0 py-3 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-3">
                            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                Tên
                            </label>
                            <div className="mt-2">
                                <input
                                    id="first-name"
                                    name="first-name"
                                    type="text"
                                    autoComplete="given-name"
                                    className="block w-full  rounded-md border-0 py-3 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? "border-red-500" : "border-gray-300"}`}
                                aria-invalid={errors.email ? "true" : "false"}
                                aria-describedby={errors.email ? "email-error" : undefined}
                                list="email-suggestions"
                            />
                            <datalist id="email-suggestions">
                                <option value="@gmail.com" />
                                <option value="@outlook.com" />
                                <option value="@yahoo.com" />
                            </datalist>
                            {errors.email && (
                                <p
                                    id="email-error"
                                    className="mt-1 text-sm text-red-600"
                                    role="alert"
                                >
                                    {errors.email}
                                </p>
                            )}
                        </div>
                        <div className="col-span-full">
                            <label htmlFor="tel" className="block text-sm font-medium leading-6 text-gray-900">
                                Số điện thoại
                            </label>
                            <div className="mt-2">
                                <input
                                    type="tel"
                                    id="tel"
                                    name="tel"
                                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? "border-red-500" : "border-gray-300"}`}
                                />
                            </div>
                        </div>
                        <div className="col-span-full">
                            <label htmlFor="birthday" className="block text-sm font-medium leading-6 text-gray-900">
                                Ngày/tháng/năm sinh
                            </label>
                            <div className="mt-2">
                                <input
                                    id="birthday"
                                    name="birthday"
                                    type="date"
                                    autoComplete="birthday"
                                    className="block w-full rounded-md border-0 py-3 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                Giới tính
                            </label>
                            <div className="mt-2">
                                <select
                                    id="country"
                                    name="country"
                                    autoComplete="country-name"
                                    className="block w-full rounded-md border-0 py-3 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                >
                                    <option>Nam</option>
                                    <option>Nữ</option>
                                    <option>Bí mật</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-span-full">
                            <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                Tình trạng
                            </label>
                            <div className="mt-2">
                                <select
                                    id="country"
                                    name="country"
                                    autoComplete="country-name"
                                    className="block w-full rounded-md border-0 py-3 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                >
                                    <option>Độc thân</option>
                                    <option>Đang yêu</option>
                                    <option>Mập mờ</option>
                                    <option>Friendzone</option>
                                    <option>Gái 2D</option>
                                    <option>Kết hôn</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-span-full">
                            <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                                Bạn đang ở
                            </label>
                            <div className="mt-2">
                                <input
                                    id="street-address"
                                    name="street-address"
                                    type="text"
                                    autoComplete="street-address"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                    </div>
                </div>


            </div>

            <div className="modal-action mt-6 flex items-center justify-end gap-x-6">
                <form method="dialog">
                    <button type="btn" className="text-sm font-semibold leading-6 text-gray-900">
                        Hủy
                    </button>
                </form>
                <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Chỉnh sửa
                </button>
            </div>
        </form >
    )
}
