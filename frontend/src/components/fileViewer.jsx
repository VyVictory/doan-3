import React from 'react';

const FileViewer = ({ file }) => {
    // Determine the file type (image, video, or file)
    const checkFileType = (file) => {
        if (!file || typeof file !== 'string') {
            return 'invalid';
        }

        // Check for image
        const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg', '.webp'];
        if (imageExtensions.some(ext => file.toLowerCase().endsWith(ext))) {
            return 'picture';
        }

        // Check for video
        const videoExtensions = ['.mp4', '.avi', '.mov', '.wmv', '.flv', '.mkv'];
        if (videoExtensions.some(ext => file.toLowerCase().endsWith(ext))) {
            return 'video';
        }

        // Default to 'file' for unsupported types
        return 'file';
    };

    const fileType = checkFileType(file); // Check file type

    // Render the appropriate preview based on file type
    const renderFilePreview = () => {
        switch (fileType) {
            case 'picture':
                return (
                    <img
                        src={file}
                        alt="Preview"
                        className="rounded border cursor-pointer"
                    />
                );
            case 'video':
                return (
                    <video controls className="rounded border cursor-pointer">
                        <source src={file} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                );
            case 'file':
                return (
                    <div className="rounded border bg-gray-100 flex justify-center items-center cursor-pointer">
                        <span>File</span>
                    </div>
                );
            default:
                return <video controls className="rounded border cursor-pointer">
                    <source src={file} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
        }
    };

    return <>{renderFilePreview()}</>;
};

export default FileViewer;
