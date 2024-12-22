import React, { useState, useEffect } from 'react';
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
    const [openModal, setOpenModal] = useState(false); // Modal state
    const [selectedFriends, setSelectedFriends] = useState([]); // Selected friends list
    const [searchTerm, setSearchTerm] = useState("");
    const [friends, setFriends] = useState([]); // Friends data
    const [loading, setLoading] = useState(true);

    const handleOpenModal = () => {
        setOpenModal(true); // Open modal
    };

    const toggleFriendSelection = (friendId) => {
        setSelectedFriends((prevSelected) =>
            prevSelected.includes(friendId)
                ? prevSelected.filter((id) => id !== friendId) // Remove if selected
                : [...prevSelected, friendId] // Add if not selected
        );
    };

    const handleCloseModal = () => {
        setOpenModal(false); // Close modal
    };

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value); // Update search term
    };

    useEffect(() => {
        const fetchData = async () => {
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
        fetchData();
    }, []);

    // Function to remove friend from selected list
    const removeFriendFromSelection = (friendId) => {
        setSelectedFriends((prevSelected) =>
            prevSelected.filter((id) => id !== friendId)
        );
    };

    // Filter friends based on search term
    const filteredFriends = friends.filter((friend) => {
        const friendName = friend.receiver
            ? `${friend.receiver.firstName} ${friend.receiver.lastName}`
            : friend.sender
            ? `${friend.sender.firstName} ${friend.sender.lastName}`
            : '';
        return friendName.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <div className="flex flex-col h-full">
            <div className="bg-white border-b flex justify-between items-center h-[56px]">
                <strong className="text-center w-full">Thông tin nhóm</strong>
                <button onClick={handleOpenModal} className="flex items-center absolute hover:bg-blue-100 p-2 right-0 mr-2 rounded-xl">
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

            {/* Modal */}
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
                    {/* Modal Header */}
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
                        {/* Search Input */}
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
                                    <a className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                        <MagnifyingGlassIcon className="h-4 w-4 fill-black" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex justify-between">
                        {/* Friends List */}
                        <div className="flex-grow px-2 py-4 custom-scroll" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                            {loading ? (
                                <Loading />
                            ) : (
                                filteredFriends.map((friend, index) => (
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

                        {/* Selected Friends List */}
                        {selectedFriends.length > 0 && (
                            <div className="flex-grow px-2 py-4 custom-scroll border-l" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                                {selectedFriends.map((friendId) => {
                                    const selectedFriend = friends.find((friend) => friend.id === friendId);
                                    return (
                                        <div key={friendId} className="flex items-center mb-2 justify-center relative">
                                            <CardFriendAddGroup iduser={friendId} />
                                            <button
                                                onClick={() => removeFriendFromSelection(friendId)}
                                                className="absolute top-0 right-0 p-1 text-red-500"
                                            >
                                                <XMarkIcon className="h-5 w-5" />
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
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
};

export default ToolGroup;
