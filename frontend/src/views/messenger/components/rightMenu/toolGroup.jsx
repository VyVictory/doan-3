import React from 'react';
import { useState, useEffect } from 'react';
import Files from "./component/files";
import PictureAndVideo from "./component/pictureAndVideo";
import { UserGroupIcon, PlusIcon } from '@heroicons/react/24/solid';
import { Box, IconButton, Modal, Button, Checkbox } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { PhotoIcon } from '@heroicons/react/24/solid';

import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { XMarkIcon } from '@heroicons/react/24/outline';
import friend from '../../../../service/friend';
import Loading from '../../../../components/Loading';
import UserFriendCard from '../userFriendCard';
import CardFriendAddGroup from './component/cardFriendAddGroup';

const ToolGroup = () => {
    const [openModal, setOpenModal] = useState(false); // Trạng thái modal
    const [selectedFriends, setSelectedFriends] = useState([]);
    const handleOpenModal = () => {
        setOpenModal(true); // Mở modal
    };
    // Thêm hoặc xóa người dùng khỏi danh sách được chọn
    const toggleFriendSelection = (friendId) => {
        setSelectedFriends((prevSelected) =>
            prevSelected.includes(friendId)
                ? prevSelected.filter((id) => id !== friendId) // Xóa nếu đã chọn
                : [...prevSelected, friendId] // Thêm nếu chưa chọn
        );
    };
    // Hàm đóng modal
    const handleCloseModal = () => {
        setOpenModal(false); // Đóng modal
    };
    const [searchTerm, setSearchTerm] = useState("");

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const res = await friend.getListMyFriend();
                if (res.success) {
                    setFriends(res.data);
                } else {
                    setFriends([]);
                }
            } catch (error) {
                console.error("Error fetching friend list:", error);
                setFriends([]);
            } finally {
                setLoading(false); // Stop loading
            }
        };
        fetchdata();
        console.log(friends)
    }, []);
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
                        <div className="w-[96%] ml-[2%] flex justify-center items-center">
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
                    <div className="flex justify-between">
                        {/* First List */}
                        {/* <div
                            className="flex-grow px-2 py-4 custom-scroll"
                            style={{
                                maxHeight: '300px', // Set a fixed maximum height for the div
                                overflowY: 'auto', // Enable vertical scrolling
                            }}
                        >
                            {loading ? (
                                <Loading />
                            ) : (
                                friends.map((friend, index) => (
                                    <div key={index} className="flex items-center mb-2 justify-center">
                                        <div className="hover:bg-gray-200 px-2 rounded-md shadow-sm w-full">
                                            <button className="flex items-center py-2 w-full">
                                                <Checkbox />
                                                {friend.receiver && friend.receiver._id && (
                                                    <CardFriendAddGroup iduser={friend.receiver._id} />
                                                )}
                                                {friend.sender && friend.sender._id && (
                                                    <CardFriendAddGroup iduser={friend.sender._id} />
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div> */}

                        {/* Second List */}
                        <div
                            className="flex-grow px-2 py-4 custom-scroll"
                            style={{
                                maxHeight: '300px', // Set a fixed maximum height for the div
                                overflowY: 'auto', // Enable vertical scrolling
                            }}
                        >
                            {loading ? (
                                <Loading />
                            ) : (
                                friends.map((friend, index) => (
                                    <div key={index} className="flex items-center mb-2 justify-center">
                                        <div className="hover:bg-gray-200 px-2 rounded-md shadow-sm w-full">
                                            <button className="flex items-center py-2 w-full">
                                                <Checkbox
                                                    checked={selectedFriends.includes(friend.receiver?._id || friend.sender?._id)}
                                                    onChange={() =>
                                                        toggleFriendSelection(friend.receiver?._id || friend.sender?._id)
                                                    }
                                                />
                                                {friend.receiver && friend.receiver._id ? (
                                                    <CardFriendAddGroup iduser={friend.receiver._id} />
                                                ) : friend.sender && friend.sender._id ? (
                                                    <CardFriendAddGroup iduser={friend.sender._id} />
                                                ) : null}
                                            </button>

                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                        {/* Danh sách đã chọn */}
                        {selectedFriends.length > 0 ? (
                            <div className="flex-grow px-2 py-4 custom-scroll border-l" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                                {
                                    selectedFriends.map((friendId) => {
                                        const selectedFriend = friends.find((friend) => friend.id === friendId);
                                        return (
                                            <div key={friendId} className="flex items-center mb-2 justify-center">
                                                <CardFriendAddGroup iduser={friendId} />
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        ) : (
                            ''
                        )}
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