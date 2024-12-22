
import { useContext } from "react";
import { useState, useEffect } from "react";
import { MessengerContext } from "../../../layoutMessenger";
import { Box, IconButton, Modal, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import group from "../../../../../service/group";

const ListMemberGroup = () => {
    const { inboxData } = useContext(MessengerContext);
    const [modalImage, setModalImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [openModal, setOpenModal] = useState(false); // Trạng thái modal
    const [visibleImagesCount, setVisibleImagesCount] = useState(6); // Số lượng ảnh hiển thị ban đầu là 6
    const [listMember, setListMember] = useState(null);
    // Kiểm tra và lấy tất cả các mediaURL từ các tin nhắn
    // const listMember = inboxData?.data
    //     ? inboxData?.data.flatMap(member => member._id || [])
    //     : [];

    // Hàm mở modal
    const handleOpenModal = (img) => {
        if (!img) {
            setModalImage(preview); // Đặt ảnh vào modal
        } else {
            setModalImage(img);
        }
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
    console.log(listMember)
    return (
        <div className="flex flex-col gap-2">
            <div className="p-2 my-2 bg-white border shadow-sm flex flex-col max-w-80">
                <strong className="ml-2">Thành viên nhóm</strong>
                <div className="">
                    
                </div>
            </div>
        </div>
    );
};

export default ListMemberGroup;
