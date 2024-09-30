import React, { useState, useEffect } from 'react'
import ModalStatus from './ModalStatus';
export default function PostStatus() {
  const [open, setOpen] = useState(false);
  const handleStatus = () => {
    setOpen(!open);
  }
  return (
    <div className='flex justify-center  py-4 bg-[#242526] rounded-lg px-4 '>
      <button className='bg-[#4A4A4A] border-[#334155]  rounded-2xl w-full h-10' onClick={handleStatus}>Bạn muốn đăng gì ?</button>
      {open ? <ModalStatus status={handleStatus} /> : ''}
    </div>
  )
}
