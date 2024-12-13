import React from 'react'
import { useState } from 'react';
import { PhotoIcon, CloudArrowUpIcon, CameraIcon } from '@heroicons/react/24/solid';
export default function ModalUpdateAVT() {
    const [formData, setFormData] = useState({
        coverphoto: null,
        profilePicture: null,
    });


    const handleFileAvtChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, profilePicture: file });
    };

    const handleFileCoverChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, coverphoto: file });
    };


    return (
        <dialog id="my_modal_2" className="modal ">
            <form className="modal-box">
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <h3 className="font-bold text-lg">Cập nhật thông tin</h3>
                <div className="col-span-full grid gap-2">
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
                    </div>
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

                            <CameraIcon className=" size-6 text-gray-600" />
                        </button>
                    </div>
                </div>

                <div className="modal-action">
                    <form method="dialog" className='flex gap-4'>
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn bg-red-600 text-white hover:bg-red-500">Hủy</button>
                        <button type='submit' className="btn bg-sky-600 text-white hover:bg-sky-500">Cập nhật</button>
                    </form>
                </div>
            </form>
        </dialog>
    )
}
