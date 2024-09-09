import React, { useState, useEffect } from 'react'
import ModalStatus from './ModalStatus';
export default function PostStatus() {
  const [open, setOpen] = useState(false);
  const handleStatus = () => {
    setOpen(!open);
  }
  return (
    <div className='flex justify-center'>
      <button className='bg-gray-100 border-gray-500 border-[1px] rounded-2xl py-2 px-96' onClick={handleStatus}>Bạn muốn đăng gì ?</button>
      {open ? <ModalStatus status={handleStatus} /> : ''}
    </div>
  )
}
