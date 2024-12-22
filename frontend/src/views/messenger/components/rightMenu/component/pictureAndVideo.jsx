import { useContext } from "react";
import { useState } from "react";
import { MessengerContext } from "../../../layoutMessenger";
import { Box, IconButton, Modal, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const PictureAndVideo = () => {
    const { inboxData } = useContext(MessengerContext);
    const [modalImage, setModalImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [openModal, setOpenModal] = useState(false); // Trạng thái modal
    const [visibleImagesCount, setVisibleImagesCount] = useState(6); // Số lượng ảnh hiển thị ban đầu là 6

    // Kiểm tra và lấy tất cả các mediaURL từ các tin nhắn
    const mediaUrls = inboxData?.messenger
        ? inboxData.messenger.flatMap(message => message.mediaURL || [])
        : [];

    // Hàm mở modal
    const handleOpenModal = (img) => {
        if (!img) {
            setModalImage(preview); // Đặt ảnh vào modal
        } else {
            setModalImage(img);
        }
        setOpenModal(true); // Mở modal
    };
    // Hàm đóng modal
    const handleCloseModal = () => {
        setOpenModal(false); // Đóng modal
    };
    // Hàm xử lý xem thêm ảnh
    const handleSeeMore = () => {
        setVisibleImagesCount(prevCount => prevCount + 3); // Tăng số lượng ảnh hiển thị lên 3
    };

    return (
        <div className="flex flex-col gap-2">
            <div className="p-2 my-2 bg-white border shadow-sm flex flex-col max-w-80">
                <strong className="ml-2">Ảnh/Video</strong>
                <div className="my-3 ">
                    {/* Hiển thị các ảnh/video nếu có */}
                    {mediaUrls.length > 0 ? (
                        <div className="flex gap-1 flex-wrap ml-1">
                            {mediaUrls.slice(0, visibleImagesCount).map((url, index) => (
                                <div key={index} className="w-24 h-24 border">
                                    <img src={url} alt={`media-${index}`}
                                        onClick={() => { handleOpenModal(url) }}
                                        className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>Không có ảnh hoặc video.</p>
                    )}
                </div>

                {/* Nút Xem Thêm */}
                {mediaUrls.length > visibleImagesCount && (
                    <Button onClick={handleSeeMore} variant="outlined" color="primary" className="mt-2">
                        Xem thêm
                    </Button>
                )}
            </div>

            {/* Modal để hiển thị ảnh lớn */}
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
                <Box sx={{ position: 'relative', backgroundColor: 'black', padding: 0.4, borderRadius: 2 }}>
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
                    <img
                        className=''
                        src={modalImage}
                        alt="Modal Preview"
                        style={{
                            maxWidth: '90vw',
                            maxHeight: '90vh',
                            borderRadius: '8px',
                        }}
                    />
                </Box>
            </Modal>
        </div>
    );
};

export default PictureAndVideo;
