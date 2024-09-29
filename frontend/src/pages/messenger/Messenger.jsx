import React, { useState, useEffect } from 'react'
import { PaperAirplaneIcon } from '@heroicons/react/16/solid';
import { Textarea } from '@headlessui/react'
import LeftMessenger from "./LeftMessenger";
import clsx from 'clsx'
import CentterMessenger from "./CentterMessenger";
import axios from 'axios';
import GetApiIcons from '../../components/icons/GetApiIcons';
const Messenger = () => {
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    const [textareaHeight, setTextareaHeight] = useState(0);
    const [transfer, setTransfer] = useState(true)
    const [chanecontainer, setChanecontainer] = useState(windowSize.width > 767)
    const [icons, setIcons] = useState([]);

    useEffect(() => {
        // Hàm để gọi API và cập nhật dữ liệu
        const fetchEmojis = async () => {
            const data = await GetApiIcons();
            setIcons(data);
        };

        fetchEmojis();
    }, []); // useEffect với mảng rỗng để gọi API chỉ một lần khi component mount
    function chanetransfer() {
        if (chanecontainer == false) {
            setTransfer(!transfer);
        }

    }
    function backtransfer() {
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
            <div className='flex flex-col' style={{ height: 'calc(100vh - 12vh)' }}>
                <div className="overflow-y-scroll flex-grow mb-4" style={{ maxHeight: 'calc(100vh - 16px)' }}>
                    <div className="flex items-center py-2">
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
                    <div>
                        <h1 className="text-lg">Danh sách Emoji</h1>
                        <ul>
                            {icons.map((icon) => (
                                <li key={icon.slug} className="text-sm">
                                    {icon.character} - {icon.unicodeName}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className='bg-white pt-1 rounded-xl pr-1 pl-1'>
                    <div className={`w-full flex ${textareaHeight > 30 ? 'flex-col' : 'flex-row'} rounded-xl`}>
                        <Textarea
                            className={clsx(
                                'block w-full resize-none pl-2 text-wrap bg-none pt-0 text-sm text-black my-1',
                                'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                            )}
                            rows={1}
                            style={{ height: 'auto', maxHeight: '6rem' }}
                            placeholder='nhập @, tin nhắn'
                            onInput={(e) => {
                                const textarea = e.target;
                                textarea.style.height = 'auto';
                                textarea.style.height = `${textarea.scrollHeight}px`;
                                setTextareaHeight(textarea.scrollHeight);
                            }}
                        />
                        <div className={` ${textareaHeight > 30 ? 'border-t border-t-gray-400' : 'pt-0'} p-1`} style={{ minWidth: '9%' }}>
                            <div className='flex justify-end'>
                                <button className=''>
                                    <PaperAirplaneIcon className='h-8 w-8 fill-sky-500' />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>




        }
    </>);
}

export default Messenger;