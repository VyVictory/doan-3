import React, { useState } from 'react';
import ModalStatus from './ModalStatus';
import AVTUser from '../AVTUser';
export default function PostStatus() {
  const [open, setOpen] = useState(false);

  const handleStatus = () => {
    setOpen(!open);
  };

  return (
    <div className='border border-gray-300 rounded-lg shadow-sm shadow-zinc-300 p-4'>
      <div className="flex column items-center" onClick={handleStatus}>
        <div className='pr-3'>
          <img
            className='h-12 aspect-square rounded-full shadow-md flex items-center justify-center'
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
          />
        </div>
        <button className=" w-full h-12 flex items-center rounded-3xl px-4 border-2 border-gray-200 bg-gray-100">
          <span className="text-sm text-gray-600">Bạn muốn đăng gì?</span>
        </button>
      </div>  
      {/* Conditionally render the ModalStatus component */}
      {open && <ModalStatus status={handleStatus} />}
    </div>
  );
}
