import React from 'react'

export default function Post() {
    return (
        <div className='flex items-start  p-6 bg-[#0f172a] rounded-lg gap-4'>
            <img className='rounded-full '
                width={50}
                height={50}
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQj9FMNt-22NsZArpe8LemUtt3BHDQVJtiQwA&s" />
            <div className='grid gap-3'>
                <a className='font-bold' href="#">Tên người đăng</a>
                <div>Sếp tôi mới dạy cách dùng OBS nên tôi tranh thủ làm tí highlight đỉnh cao cho anh em giải trí buổi chiều ạ 😇.</div>
                <img className='rounded-xl'
                    width={500}
                    height={500}
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnzOw4JGD9VHLQ46a6nQS4uhdw9QFlA7s0Mg&s" />
                <div className='flex'>
                    <div>like</div>
                    <div>cmt</div>
                    <div>share</div>
                </div>
            </div>
        </div>
    )
}
