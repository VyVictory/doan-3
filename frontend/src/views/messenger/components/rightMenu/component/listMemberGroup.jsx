import { UserGroupIcon, PlusIcon } from '@heroicons/react/24/solid';
import { useContext } from "react";
import { useState, useEffect } from "react";
import { MessengerContext } from "../../../layoutMessenger";
import group from "../../../../../service/group";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import CardFriendAddGroup from "./cardFriendAddGroup";
import { Box, Checkbox, IconButton, Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Loading from '../../../../../components/Loading';
import friend from '../../../../../service/friend';
import { PhotoIcon } from '@heroicons/react/24/solid';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { ToastContainer, toast } from 'react-toastify';
import NotificationCss from '../../../../../module/cssNotification/NotificationCss';
import { Link } from 'react-router-dom';

const ListMemberGroup = () => {
    const { inboxData } = useContext(MessengerContext);
    const [modalImage, setModalImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [openModal, setOpenModal] = useState(false); // Trạng thái modal
    const [visibleImagesCount, setVisibleImagesCount] = useState(6); // Số lượng ảnh hiển thị ban đầu là 6
    const [listMember, setListMember] = useState(null);
    const [showListMember, setShowListMember] = useState(false);
    const [selectedFriends, setSelectedFriends] = useState([]); // Selected friends list
    const [searchTerm, setSearchTerm] = useState("");
    const [friends, setFriends] = useState([]); // Friends data
    const [loading, setLoading] = useState(false);

    const chaneShowListMember = () => {
        setShowListMember(!showListMember)
    };
    const handleOpenModal = () => {
        setOpenModal(true); // Mở modal
    };
    useEffect(() => {
        const fetchMessengerData = async () => {
            if (!inboxData?.data?.group?._id) {
                return;
            }
            try {
                const res = await group.getMemberIngroup(inboxData?.data?.group?._id);
                if (res.success) {
                    // console.log('next')
                    // console.log(res.data)
                    setListMember(res.data);
                }
            } catch (error) {
                console.error('Error fetching messenger data:', error);
            }
        };
        fetchMessengerData();
    }, [inboxData]);

    // Hàm đóng modal
    const handleCloseModal = () => {
        setOpenModal(false); // Đóng modal
    };

    // Hàm xử lý xem thêm ảnh
    const handleSeeMore = () => {
        setVisibleImagesCount(prevCount => prevCount + 3); // Tăng số lượng ảnh hiển thị lên 3
    };
    const toggleFriendSelection = (friendId) => {
        setSelectedFriends((prevSelected) =>
            prevSelected.includes(friendId)
                ? prevSelected.filter((id) => id !== friendId) // Remove if selected
                : [...prevSelected, friendId] // Add if not selected
        );
    };

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value); // Update search term
    };
    const handAddMemberGroup = async (idgr, listMember) => {
        try {
            const res = await group.addMemberGroup(idgr, listMember[0])
            if (res.success) {
                toast.success('Thêm thành viên vào nhóm thành công.', NotificationCss.Success);
            }
        } catch (error) {
            toast.error('Thêm thành viên vào nhóm thất bại, vui lòng thử lại!', NotificationCss.Fail);
        }
        setOpenModal(false);
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await friend.getListMyFriend();
                if (res.success) {
                    // Extract the member IDs from listMember
                    const listMemberIds = listMember?.map((member) => member._id) || [];

                    // Filter friends that are not in the listMember
                    const filteredFriends = res.data.filter(
                        (friend) =>
                            !listMemberIds.includes(friend.receiver?._id) &&
                            !listMemberIds.includes(friend.sender?._id)
                    );

                    setFriends(filteredFriends);
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
    }, [listMember]); // Re-fetch data when listMember changes


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
    console.log(listMember)
    return (
        <>
            <div className="flex flex-col">
                <div className="my-2 bg-white">
                    <div className="p-2 flex flex-row max-w-80 items-center border-b">
                        <strong className="ml-2 w-full">Thành viên nhóm</strong>
                        <button onClick={handleOpenModal}>
                            <PlusIcon className="h-8 w-8 text-green-500 hover:text-gray-600" />
                        </button>
                    </div>
                    <button
                        onClick={chaneShowListMember}
                        className=" p-3 w-full hover:bg-gray-200 flex flex-row max-w-80 ">
                        <div className="w-full flex flex-row">
                            <UserGroupIcon className="ml-2 mr-2 h-6 w-6 text-blue-400" />
                            {listMember?.length} Thành viên

                        </div>
                        {
                            showListMember ?
                                <ChevronUpIcon className="ml-2 mr-2 h-6 w-6 text-blue-400" />
                                :
                                <ChevronDownIcon className="ml-2 mr-2 h-6 w-6 text-blue-400" />
                        }

                    </button>
                    {
                        showListMember && <div className="px-4 mt-1 mb-2 max-h-96 overflow-y-auto custom-scroll">
                            {
                                listMember?.map((member, index) => (
                                    <a href={`/user/${member._id}`}>
                                        <button className="flex flex-row w-full items-center hover:bg-gray-300 rounded-md p-2">
                                            <CardFriendAddGroup key={member?._id} iduser={member?._id} />
                                        </button>
                                    </a>

                                ))

                            }
                        </div>
                    }

                </div>
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
                            height: '90vh', // Ensure modal fits within the viewport
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
                                <strong>Danh sách bạn bè</strong>
                            </div>
                            {/* Search Input */}
                            <div className="w-[96%] ml-[2%] flex justify-center items-center">
                                <div className="w-full border-b-2 p-3 flex flex-col items-center">

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
                        <div className="flex justify-between h-full">
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
                                <div className="flex-grow px-2 py-4 custom-scroll border-l border-b rounded-bl-xl" style={{ maxHeight: '300px', overflowY: 'auto' }}>
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
                            <button
                                onClick={() => handAddMemberGroup(inboxData?.data?.group?._id, selectedFriends)}
                                className="bg-blue-500  p-2 rounded-lg text-white text text-nowrap">Thêm</button>
                        </div>
                    </Box>
                </Modal>
            </div>

        </>
    );
};

export default ListMemberGroup;
