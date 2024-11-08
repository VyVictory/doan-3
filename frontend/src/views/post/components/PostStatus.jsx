import React, { useState, useEffect } from 'react'
import ModalStatus from './ModalStatus';
export default function PostStatus() {
  const [open, setOpen] = useState(false);
  const handleStatus = () => {
    setOpen(!open);
  }
  return (
    <div className='flex justify-center  py-4 bg-white border border-gray-300 rounded-lg px-4 '>
      <button className='bg-white border border-gray-300 rounded-xl w-full h-10' onClick={handleStatus}>Bạn muốn đăng gì ?</button>
      {open ? <ModalStatus status={handleStatus} /> : ''}
    </div>
  )
}
