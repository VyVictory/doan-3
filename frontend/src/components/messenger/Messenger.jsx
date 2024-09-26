import React, { useState, useEffect } from 'react'

import LeftMessenger from "./LeftMessenger";
import CentterMessenger from "./CentterMessenger";
const Messenger = () => {
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    const [transfer, setTransfer]= useState(true)
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
                            <ul>
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
                    <div className="w-full flex-1 bg-background">
                        <div className="p-4">
                            <div className="h-4/5 border border-border rounded-lg overflow-y-auto mb-4">
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
                            </div>
                            <div className="flex items-center">
                                <input type="text" placeholder="Type a message..." className="flex-1 p-2 rounded-l-lg bg-input text-input text-primary border border-border focus:outline-none" />
                                <button className="bg-primary text-primary-foreground p-2 rounded-r-lg">Send</button>
                            </div>
                        </div>
                    </div>
                )}

            </div>

        }
    </>);
}

export default Messenger;