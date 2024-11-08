import React, { useState } from 'react';
import postImg from '../../img/images.jpg';

const ShortPost = () => {
    const totalPosters = 40; // Tổng số lượng poster
    const postersPerPage = 8; // Số lượng poster mỗi lần hiển thị
    const postersToMove = 3; // Số lượng poster di chuyển mỗi lần nhấn
    const [currentIndex, setCurrentIndex] = useState(0);

    const moveLeft = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - postersToMove);
        }
    };

    const moveRight = () => {
        if (currentIndex < totalPosters - postersPerPage) {
            setCurrentIndex(currentIndex + postersToMove);
        }
    };

    // Cập nhật vị trí chuyển động, mỗi poster chiếm 12.5% chiều rộng nếu có 8 ảnh trên một hàng
    const offset = -currentIndex * (100 / postersPerPage);

    // Giả lập dữ liệu các poster
    const posters = Array.from({ length: totalPosters }, (_, index) => ({
        id: index + 1,
        src: `https://via.placeholder.com/200?text=Poster+${index + 1}`,
    }));

    return (
        <div className="border border-gray-300 rounded-lg shadow-sm shadow-zinc-300 w-full">
            <div className="relative mx-auto overflow-hidden">
                {currentIndex > 0 && (
                    <button
                        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white text-gray-500 h-12 aspect-square rounded-full shadow-md flex items-center justify-center"
                        onClick={moveLeft}
                        style={{ zIndex: 1 }}
                    >
                        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                            <path d="M14.791 5.207L8 12l6.793 6.793a1 1 0 1 1-1.415 1.414l-7.5-7.5a1 1 0 0 1 0-1.414l7.5-7.5a1 1 0 1 1 1.415 1.414z" />
                        </svg>
                    </button>
                )}

                <div
                    className="flex duration-300"
                    style={{ transform: `translateX(${offset}%)` }}
                >
                    {posters.map((poster) => (
                        <div key={poster.id} className="flex-shrink-0 w-1/6 p-2 box-border">
                            <div className="w-full h-48 overflow-hidden flex justify-center">
                                <img
                                    src={postImg} // Đảm bảo đường dẫn hợp lệ
                                    alt={`Poster ${poster.id}`} // Thêm thuộc tính alt cho ảnh để cải thiện khả năng truy cập
                                    className=" rounded-md transform transition duration-300 ease-in-out hover:scale-110 " // Ảnh sẽ phóng to khi hover
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {currentIndex < totalPosters - postersPerPage && (
                    <button
                        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white text-gray-500 h-12 aspect-square rounded-full shadow-md flex items-center justify-center"
                        onClick={moveRight}
                        style={{ zIndex: 1 }}
                    >
                        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                            <path d="M9.209 5.207L16 12l-6.791 6.793a1 1 0 1 0 1.415 1.414l7.5-7.5a1 1 0 0 0 0-1.414l-7.5-7.5a1 1 0 1 0-1.415 1.414z" />
                        </svg>
                    </button>
                )}
            </div>
        </div>
    );
};

export default ShortPost;
