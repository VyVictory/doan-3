import { Button } from '@headlessui/react'
import React from 'react'
import { HandThumbUpIcon } from '@heroicons/react/24/outline'
import { ChatBubbleLeftIcon } from '@heroicons/react/24/outline'
import { ShareIcon } from '@heroicons/react/24/outline'
import AVTUser from './AVTUser'

export default function Post() {
    return (
        <div className='flex items-start  p-6 border border-gray-300 rounded-lg shadow-sm shadow-zinc-300 gap-3 max-w-[900px]'>
            <AVTUser />
            <div className='grid gap-2'>
                <article className='text-wrap grid gap-1'>
                    <a className='font-bold text-lg hover:link' href="#">Tên người đăng</a>
                    <p> cách dùng  nên tôi tranh thủ làm tí highlight đỉnh cao cho anh em giải trí buổi chiều ạ 😇 cách dùng  nên tôi tranh thủ làm tí highlight đỉnh cao cho anh em giải trí buổi chiều ạ 😇 cách dùng  nên tôi tranh thủ làm tí highlight đỉnh cao cho anh em giải trí buổi chiều ạ 😇 cách dùng  nên tôi tranh thủ làm tí highlight đỉnh cao cho anh em giải trí buổi chiều ạ 😇 cách dùng  nên tôi tranh thủ làm tí highlight đỉnh cao cho anh em giải trí buổi chiều ạ 😇.</p>
                </article>
                <img className='rounded-xl w-full max-h-[400px]'
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnzOw4JGD9VHLQ46a6nQS4uhdw9QFlA7s0Mg&s" />
                <div className='flex justify-around'>
                    <Button className={"flex items-end gap-1"}>
                        <HandThumbUpIcon className="size-5" />
                        <span>1</span>
                    </Button>
                    <Button className={"flex items-end gap-1"}>
                        <ChatBubbleLeftIcon className="size-5" />
                        <span>2</span>
                    </Button>
                    <Button className={"flex items-end gap-1"}
                    ><ShareIcon className="size-5" />
                        <span>3</span>
                    </Button>
                </div>
            </div>
        </div>
    )
}
