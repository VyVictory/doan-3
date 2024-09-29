import React, { useState, useEffect } from 'react'
import { PaperAirplaneIcon } from '@heroicons/react/16/solid';
import { Textarea } from '@headlessui/react'
import LeftMessenger from "./LeftMessenger";
import clsx from 'clsx'
import CentterMessenger from "./CentterMessenger";
const Messenger = () => {
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    const [textareaHeight, setTextareaHeight] = useState(0);
    const [transfer, setTransfer] = useState(true)
    useEffect(() => {
        // Hàm cập nhật kích thước màn hình
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };
        // Thêm event listener khi cửa sổ thay đổi kích thước
        window.addEventListener("resize", handleResize);
        // Cleanup event listener khi component bị unmount
        // return () => {
        //     window.removeEventListener("resize", handleResize);
        // };
    }, []);
    return (<>
        {
            <div class="flex flex-col md:flex-row border-t-gray-400 h-full">
                {transfer && (
                    <div class="w-full md:w-1/4   border-r-gray-400 border-r-2 text-white float-end">
                        <div className="p-4">
                            <h2 className="text-lg font-semibold mb-4">Chat History</h2>
                            <ul className=''>
                                <li >
                                    <button className="flex items-center py-2">
                                        <img src="https://placehold.co/40" alt="user" className="w-10 h-10 rounded-full mr-2" />
                                        <div className='text-start'>
                                            <h3 className="text-primary font-semibold">John Doe</h3>
                                            <p className="text-secondary">Hey! How are you?</p>
                                        </div>
                                    </button>
                                </li>
                                <li >
                                    <button className="flex items-center py-2">
                                        <img src="https://placehold.co/40" alt="user" className="w-10 h-10 rounded-full mr-2" />
                                        <div className='text-start'>
                                            <h3 className="text-primary font-semibold">Jane Smith</h3>
                                            <p className="text-secondary">Hi there!</p>
                                        </div>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                )}
                {windowSize.width > 767 && (
                    <div className=" flex-1 bg-background">
                        <div className="p-4 ">
                            <div className="h-full border border-border rounded-lg overflow-y-auto mb-4 px-3">
                                <div className="flex items-center  py-2">
                                    <img src="https://placehold.co/40" alt="user" className="w-10 h-10 rounded-full mr-2" />
                                    <div>
                                        <h3 className="text-primary font-semibold">John Doe</h3>
                                        <p className="text-secondary">Hey! How are you?</p>
                                    </div>
                                </div>
                                <div className="flex items-center py-2">
                                    <img src="https://placehold.co/40" alt="user" className="w-10 h-10 rounded-full mr-2" />
                                    <div>
                                        <h3 className="text-primary font-semibold">Jane Smith</h3>
                                        <p className="text-secondary">Hi there!</p>
                                    </div>
                                </div>
                            </div>
                            <div className='bg-white pt-1 rounded-xl pr-1 pl-1'>
                                <div className={`w-full flex ${textareaHeight > 50 ? 'flex-col' : 'flex-row'} rounded-xl`}>
                                        <Textarea
                                            className={clsx(
                                                'block w-full resize-none bg-white pt-1 text-sm5 text-black rounded-t-none rounded-xl',
                                                'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                                            )}
                                            rows={1} // Số hàng tối thiểu
                                            style={{ height: 'auto', maxHeight: '6rem' }} // Thiết lập chiều cao tối đa
                                            onInput={(e) => {
                                                const textarea = e.target;
                                                textarea.style.height = 'auto'; // Reset height để tính toán lại
                                                textarea.style.height = `${textarea.scrollHeight}px`; // Đặt chiều cao dựa trên nội dung
                                                setTextareaHeight(textarea.scrollHeight); // Cập nhật chiều cao hiện tại
                                            }}
                                        />
                                    <div className={`${textareaHeight > 50?'border-t border-t-gray-400':'pt-0' } p-1`}>
                                        <div className='flex float-end'> {/* Căn giữa nút */}
                                            <button>
                                                <PaperAirplaneIcon className=' h-8 w-8 fill-sky-500' />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                )}

            </div>

        }
    </>);
}

export default Messenger;