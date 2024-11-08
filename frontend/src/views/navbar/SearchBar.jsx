'use client';
import React from 'react';
import { useState } from 'react';
import { Button } from '@headlessui/react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { Input } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
export default function SearchBar({ query }) {
    const [searchTerm, setSearchTerm] = useState("");
    //Search underfi
    if (query === '') {
        return null;
    }
    //REST API

    //Không tìm thấy
    // if (data.length === 0) {
    //     return <p>Không tìm thấy từ khóa: <i>"{query}"</i></p>;
    // }
    // input
    // Xử lý sự kiện khi thay đổi input
    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Xử lý sự kiện khi nhấn nút xóa
    const handleClearSearch = () => {
        setSearchTerm("");
    };
    return (
        <form action="" className="relative w-full justify-center">
            <input
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
                className="rounded-xl pr-10 pl-10 py-2 text-white input input-bordered w-24 md:w-auto bg-[#4A4A4A]"
                placeholder="Tìm kiếm..."
            />
            {searchTerm && (
                <button onClick={handleClearSearch} className='absolute right-4 top-[40%] transform -translate-y-1/2 text-gray-400 h-4 w-4'>
                    <XMarkIcon className="size-6 fill-white" />
                </button>
            )}
            <button className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" type="submit"><MagnifyingGlassIcon className='size-5 fill-white' /></button>
            {/* onChange={(e) => debounceSearch(e.target.value)}
             defaultValue={searchParams.get("query")?.toString()} */}
        </form >
    )
}
