import React from 'react'

export default function Post() {
    return (
        <div className='p-5'>
            <div className='flex '>
                <img className='rounded-full'
                    width={50}
                    height={50}
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQj9FMNt-22NsZArpe8LemUtt3BHDQVJtiQwA&s" />
                <div className='ml-2'>
                    <a className='font-bold' href="#">Tên người đăng</a>
                    <div>Sếp tôi mới dạy cách dùng OBS nên tôi tranh thủ làm tí highlight đỉnh cao cho anh em giải trí buổi chiều ạ 😇.</div>
                </div>
            </div>
        </div>
    )
}
