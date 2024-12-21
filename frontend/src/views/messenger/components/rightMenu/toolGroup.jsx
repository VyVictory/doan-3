import React from 'react';
import { useState } from 'react';
import Files from "./component/files";
import PictureAndVideo from "./component/pictureAndVideo";
import { UserGroupIcon, PlusIcon } from '@heroicons/react/24/solid';
import { Box, IconButton, Modal, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { PhotoIcon } from '@heroicons/react/24/solid';

import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { XMarkIcon } from '@heroicons/react/24/outline';

const ToolGroup = () => {
    const [openModal, setOpenModal] = useState(false); // Trạng thái modal
    const handleOpenModal = () => {
        setOpenModal(true); // Mở modal
    };

    // Hàm đóng modal
    const handleCloseModal = () => {
        setOpenModal(false); // Đóng modal
    };
    const [searchTerm, setSearchTerm] = useState("");

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleClearSearch = () => {
        setSearchTerm("/search");
    };
    return (
        <div className="flex flex-col h-full">
            <div className={`bg-white border-b flex justify-between items-center h-[56px]`}>
                <strong className="text-center w-full">Thông tin nhóm</strong>
                <button
                    onClick={() => { handleOpenModal() }}
                    className="flex items-center absolute hover:bg-blue-100 p-2 right-0 mr-2 rounded-xl">
                    <UserGroupIcon className="h-6 w-6 text-gray-700" />
                    <PlusIcon className="h-4 w-4 text-green-500 absolute top-0 right-0" />
                </button>
            </div>

            <div className="overflow-y-scroll flex-1 custom-scroll">
                <PictureAndVideo />
                <Files />
                <Files />
                <Files />
            </div>

            {/* <div className="p-4 border-t-2 bg-white shadow-sm">
                <strong>Footer content or actions here</strong>
            </div> */}
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                }}
            >
                <Box
                    sx={{
                        minWidth: '500px',
                        maxHeight: '90vh', // Ensure modal fits within the viewport
                        position: 'relative',
                        backgroundColor: 'white',
                        padding: 0.4,
                        borderRadius: 1,
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    {/* Header */}
                    <div>
                        <IconButton
                            onClick={handleCloseModal}
                            sx={{
                                position: 'absolute',
                                top: 4,
                                right: 4,
                                backgroundColor: 'rgba(255, 255, 255, 0.4)',
                                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 1)' },
                            }}
                        >
                            <CloseIcon color="error" />
                        </IconButton>
                        <div className="w-full border-b-2 p-2">
                            <strong>Tạo nhóm</strong>
                        </div>
                        <div className="w-[90%] ml-[5%] flex justify-center items-center">
                            <div className="w-full border-b-2 p-3 flex flex-col items-center">
                                <div className="w-full flex flex-row mb-2">
                                    <label htmlFor="file-input" className="mr-1">
                                        <IconButton component="span">
                                            <PhotoIcon className="size-7 fill-sky-600" />
                                        </IconButton>
                                    </label>
                                    <input
                                        className="outline-none w-full border-b border-b-gray-500"
                                        placeholder="Nhập tên nhóm"
                                    />
                                </div>
                                <div className="relative flex justify-center w-full">
                                    <input
                                        type="text"
                                        value={searchTerm}
                                        onChange={handleInputChange}
                                        className="w-full rounded-3xl border border-gray-300 pr-8 pl-9 py-2 text-black bg-white focus:outline-none"
                                        placeholder="Tìm kiếm..."
                                    />
                                    <a
                                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                        type="submit"
                                    >
                                        <MagnifyingGlassIcon className="h-4 w-4 fill-black" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div
                        className="flex-grow mx-6"
                        style={{
                            overflowY: 'auto', // Enable vertical scrolling
                            padding: '8px',
                        }}
                    >
                        {Array.from({ length: 20 }).map((_, index) => (
                            <div key={index} className="flex justify-center items-center mb-2">
                                a
                            </div>
                        ))}
                    </div>

                    {/* Footer */}
                    <div className="w-full border-t-2 p-2 flex justify-end">
                        <button className="bg-gray-300 mr-2 w-24 p-2 rounded-lg text-black">Hủy</button>
                        <button className="bg-blue-500 w-24 p-2 rounded-lg text-white">Tạo nhóm</button>
                    </div>
                </Box>
            </Modal>

        </div>
    );
}

export default ToolGroup;