import React, { useState } from "react";
// import { FaEye, FaEyeSlash, FaCamera } from "react-icons/fa";
import { CameraIcon } from "@heroicons/react/20/solid";
// import { MdCloudUpload } from "react-icons/md";
import { CloudArrowUpIcon } from "@heroicons/react/20/solid";

import clsx from 'clsx'

import FormUpdateProfile from "./FormUpdateProfile";

const ModalUpdateProfile = ({ user }) => {
    //format date dd/mm/yyyy

    //
    const [open, setOpen] = useState(true)
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        birthday: "",
        numberPhone: "",
        gender: "",
        address: ""
    });

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        validateField(name, value);
    };

    // const handleFileChange = (e) => {
    //     const file = e.target.files[0];
    //     setFormData({ ...formData, profilePicture: file });
    // };

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

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            // Handle successful update here
            console.log("Form submitted:", formData);
        }, 2000);
    };

    return (
        <dialog id="my_modal_1" className="modal">
            <div className="modal-box w-11/12 max-w-xl">
                <form onSubmit={handleSubmit}>
                    <div className="space-y-12">
                        <h3 className="font-bold text-2xl  my-5 text-center">Cập nhật thông tin</h3>
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 hover:bg-red-600 hover:text-white">✕</button>
                        </form>

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
                                            value={user.lastName}
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
                                            value={user.firstName}
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
                                        value={user.email}
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
                                            value={user.numberPhone}
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
                                            value={user.birthday}
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
                                            value={user.email}
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
                                    <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                                        Bạn đang ở
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="street-address"
                                            name="street-address"
                                            type="text"
                                            value={user.address}
                                            autoComplete="street-address"
                                            className="block w-full px-2 text-wrap rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>

                    <div className="modal-action mt-6 flex items-center justify-end gap-x-6">
                        <form method="dialog">
                            <button type="btn" className="text-sm font-semibold rounded-md bg-red-600 px-3 py-2 text-white hover:bg-red-500">
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

            </div>
        </dialog>

    );
};

export default ModalUpdateProfile;