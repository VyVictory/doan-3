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
    const [chanecontainer, setChanecontainer] = useState(windowSize.width > 767)
    function chanetransfer() {
        if (chanecontainer == false) {
            setTransfer(!transfer);
        }

    }
    function backtransfer(){
        setTransfer(true)
    }
    useEffect(() => {
        // Hàm cập nhật kích thước màn hình
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
            setChanecontainer(window.innerWidth > 767);
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
            <div>
                <div class="flex flex-col md:flex-row border-t-gray-400" style={{ maxHeight: '560px' }}>
                    {transfer && (
                        <LeftMessenger bt_chanetransfer={chanetransfer} />
                    )}
                    {(chanecontainer || transfer == false) && (
                        <div className='w-full p-4'>
                            {( transfer == false) &&
                                <div>
                                    <button onClick={backtransfer}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                        <path fillRule="evenodd" d="M16.5 3.75a1.5 1.5 0 0 1 1.5 1.5v13.5a1.5 1.5 0 0 1-1.5 1.5h-6a1.5 1.5 0 0 1-1.5-1.5V15a.75.75 0 0 0-1.5 0v3.75a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V5.25a3 3 0 0 0-3-3h-6a3 3 0 0 0-3 3V9A.75.75 0 1 0 9 9V5.25a1.5 1.5 0 0 1 1.5-1.5h6ZM5.78 8.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 0 0 0 1.06l3 3a.75.75 0 0 0 1.06-1.06l-1.72-1.72H15a.75.75 0 0 0 0-1.5H4.06l1.72-1.72a.75.75 0 0 0 0-1.06Z" clipRule="evenodd" />
                                    </svg>
                                    </button>
                                </div>
                            }
                            <div className=" flex-1 bg-background">
                                <div className="p-0 ">
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
                                        <div className={`w-full flex ${textareaHeight > 30 ? 'flex-col' : 'flex-row'} rounded-xl`}>
                                            <Textarea
                                                className={clsx(
                                                    'block w-full resize-none text-wrap bg-none pt-0 text-sm5 text-black my-1',
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
                                            <div className={`${textareaHeight > 30 ? 'border-t border-t-gray-400' : 'pt-0'} p-1`}>
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
                        </div>

                    )}

                </div>
            </div>
        }
    </>);
}

export default Messenger;