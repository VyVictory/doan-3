import { Textarea } from '@headlessui/react'
import { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import clsx from 'clsx'
import { redirect } from 'react-router-dom'
import { PhotoIcon } from '@heroicons/react/24/solid'
import DropdownPrivacy from './DropdownPrivacy'
import axios from 'axios'
export default function ModalStatus({ status }) {
    const [open, setOpen] = useState(true)
    //form
    const [formData, setFormData] = useState({
        content: '',
        files: 'https://images.app.goo.gl/T3n7Z36ZdvumSjG69',
        privacy: '',
    });
    //onchange
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }
    //
    const handlePrivacyChange = (privacy) => {
        setFormData({
            ...formData,
            privacy
        });
    };
    //Submit 
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)

        try {
            const response = await axios.post('http://localhost:3001/post/createPost', formData);

            if (response.status === 201) {
                alert('Đăng post thành công!');
                redirect('/');
            } else {
                alert('Có lỗi xảy ra, vui lòng thử lại.');
            }
            // Xử lý thành công (ví dụ: chuyển hướng sang trang khác)
        } catch (error) {
            console.error('Lỗi:', error.response ? error.response.data : error.message);
        }

    }

    return (
        <Dialog open={open} onClose={setOpen} className="relative z-10">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-900 opacity-75 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                        transition
                        className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                    >
                        <form method="POST" onSubmit={handleSubmit}>
                            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                        <DialogTitle as="h1" className="text-xl font-bold leading-10 grid justify-center text-gray-900">
                                            Tạo bài viết
                                        </DialogTitle>
                                        <div className="mt-2">
                                            <label htmlFor="text-area" className='block text-sm text-gray-700 font-semibold'>
                                                Bạn muốn đăng gì hôm nay?
                                            </label>
                                            <Textarea
                                                id='text-area'
                                                name="content"
                                                className={clsx(
                                                    'block w-full min-w-[420px] resize-none rounded-lg border-2 border-black bg-white/5 py-1.5 px-3 text-sm/6 text-black',
                                                    'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                                                )}
                                                rows={5}
                                                onChange={handleChange}
                                                value={formData.content}
                                                placeholder='Viết nội dung của bạn...'
                                            />
                                            <div className="mt-4 flex items-center gap-5">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Ai có thể xem bài viết của bạn?
                                                </label>
                                                <DropdownPrivacy onChange={handlePrivacyChange} />
                                            </div>
                                            {/* <div className="mt-4 flex items-center gap-5">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Thêm ảnh vào bài viết của bạn
                                                </label>
                                                <div className="file-input-wrapper ">
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        className="hidden"
                                                        id="file-input"
                                                        name='files'
                                                        onChange={handleChange}
                                                        value={formData.files}
                                                    />
                                                    <label htmlFor="file-input" className="file-input-button">
                                                        <PhotoIcon className='size-9 fill-sky-600 ' />
                                                    </label>
                                                </div>
                                        </div> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button
                                    type="submit"

                                    className="inline-flex w-full justify-center rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 sm:ml-3 sm:w-auto"
                                >
                                    Đăng bài
                                </button>
                                <button
                                    type="button"
                                    data-autofocus
                                    onClick={status}
                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                >
                                    Hủy đăng
                                </button>
                            </div>
                        </form>
                    </DialogPanel>
                </div>
            </div>
        </Dialog >
    )
}