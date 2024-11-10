import { useState } from 'react';
import { Dialog, DialogBackdrop } from '@headlessui/react';
import PublicIcon from '@mui/icons-material/Public'; // MUI's "Public" icon
import GroupIcon from '@mui/icons-material/Group'; // MUI's "Group" icon for Friends
import LockIcon from '@mui/icons-material/Lock'; // MUI's "Lock" icon for Only Me
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'; // MUI's dropdown arrow icon
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import clsx from 'clsx';

export default function ModalStatus({ status }) {
    const [open, setOpen] = useState(true);
    const [rows, setRows] = useState(3);
    const [visibility, setVisibility] = useState('Public'); // State for visibility option
    const [showDropdown, setShowDropdown] = useState(false); // State to toggle dropdown visibility

    const maxRows = 12;

    const handleInputChange = (event) => {
        const textareaLineHeight = 24;
        const previousRows = event.target.rows;
        event.target.rows = 3;
        const currentRows = Math.floor(event.target.scrollHeight / textareaLineHeight);
        if (currentRows === previousRows) {
            event.target.rows = currentRows;
        }
        if (currentRows >= maxRows) {
            event.target.rows = maxRows;
            event.target.scrollTop = event.target.scrollHeight;
        } else {
            event.target.rows = currentRows;
        }
        setRows(currentRows < maxRows ? currentRows : maxRows);
    };

    const handleVisibilityChange = (newVisibility) => {
        setVisibility(newVisibility); // Update the visibility state
        setShowDropdown(false); // Close dropdown after selection
    };

    // Determine the icon based on visibility selection
    const renderVisibilityIcon = (visibility) => {
        switch (visibility) {
            case 'Public':
                return <PublicIcon className="text-blue-500" />;
            case 'Friends':
                return <GroupIcon className="text-green-500" />;
            case 'Only Me':
                return <LockIcon className="text-gray-500" />;
            default:
                return <PublicIcon className="text-blue-500" />;
        }
    };

    return (
        <Dialog open={open} onClose={setOpen} className="relative z-10">
            <DialogBackdrop className="fixed inset-0 bg-gray-900 opacity-75 transition-opacity" />
            <div className="fixed inset-0 z-10 overflow-y-auto flex items-center justify-center p-4">
                <div className="relative w-full max-w-lg mx-auto rounded-lg bg-white overflow-hidden shadow-xl sm:w-4/5 lg:w-1/2">
                    {/* Close button */}
                    <button
                        className="absolute right-2 top-2 border bg-gray-200 border-gray-200 shadow-sm text-gray-700 h-10 w-10 rounded-full flex items-center justify-center"
                        onClick={() => setOpen(false)}
                    >
                        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                            <path d="M6 6L18 18M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </button>

                    {/* Header */}
                    <div className="border-b border-gray-300 py-3 px-4 flex justify-center">
                        <strong className="text-black text-xl">Tạo bài đăng</strong>
                    </div>

                    {/* Content */}
                    <div className="p-4 space-y-4">
                        {/* Profile and Privacy */}
                        <div className="flex items-center space-x-3">
                            <div className="bg-gray-600 h-12 w-12 rounded-full flex items-center justify-center text-white">
                                AVT
                            </div>
                            <div>
                                <strong className="text-lg text-gray-600">
                                    Pro Code
                                    <strong
                                        className="text-lg"
                                        style={{
                                            animation: 'colorWave 3s linear infinite',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        {"<VIP>"}
                                    </strong>
                                </strong>
                                <button
                                    className="flex items-center p-2 rounded-full border border-gray-200 text-gray-700 hover:bg-gray-200"
                                    onClick={() => setShowDropdown(!showDropdown)} // Toggle dropdown on click
                                    aria-label="Edit privacy. Sharing with Public."
                                >
                                    {renderVisibilityIcon(visibility)} {/* Dynamically render icon */}
                                    <span className="ml-1 text-sm">{visibility}</span>
                                    <ArrowDropDownIcon fontSize="small" />
                                </button>

                                {/* Dropdown for selecting visibility */}
                                {showDropdown && (
                                    <div className="absolute bg-white border border-gray-300 rounded-md shadow-md mt-2 p-2 w-40">
                                        <button
                                            className="w-full text-left py-2 px-4 hover:bg-gray-100"
                                            onClick={() => handleVisibilityChange('Public')}
                                        >
                                            <PublicIcon className="mr-2" /> Public
                                        </button>
                                        <button
                                            className="w-full text-left py-2 px-4 hover:bg-gray-100"
                                            onClick={() => handleVisibilityChange('Friends')}
                                        >
                                            <GroupIcon className="mr-2" /> Friends
                                        </button>
                                        <button
                                            className="w-full text-left py-2 px-4 hover:bg-gray-100"
                                            onClick={() => handleVisibilityChange('Only Me')}
                                        >
                                            <LockIcon className="mr-2" /> Only Me
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Textarea */}
                        <div>
                            <textarea
                                className={clsx(
                                    'sm:text-lg border-none w-full resize-none rounded-lg bg-gray-100 py-2 px-3 text-black',
                                    'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-200',
                                    'overflow-y-auto max-h-[60vh]' // Expands up to 60% of viewport height
                                )}
                                rows={rows}
                                placeholder="Nội dung bài đăng, tại đây:"
                                onChange={handleInputChange}
                                style={{ lineHeight: '1.5rem' }}
                            />
                            <div className="flex justify-end w-full">
                                <button>
                                    <EmojiEmotionsIcon className="" fontSize="large" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Post Button */}
                    <div className="p-4 border-t border-gray-200 flex justify-end">
                        <button
                            type="button"
                            onClick={status}
                            className="bg-green-400 text-white px-4 py-2 rounded-md hover:bg-green-500 transition duration-150"
                        >
                            Đăng bài
                        </button>
                    </div>
                </div>
            </div>
        </Dialog>
    );
}
