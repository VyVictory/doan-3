import React, { useState } from 'react';
import { Button, Typography, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { PhotoIcon } from '@heroicons/react/24/solid'

const FileUploadButton = () => {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile)); // Tạo URL preview cho ảnh
        }
    };

    const handleRemoveFile = () => {
        setFile(null);
        setPreview(null);
    };

    const handleUpload = () => {
        if (file) {
            console.log('Uploading file:', file.name);
            // Thêm logic xử lý upload file tại đây
        } else {
            console.log('No file selected');
        }
    };

    return (
        <Box sx={{ textAlign: 'center', marginTop: 5 }}>
            {/* Input ẩn để chọn file */}


            {/* Nút MUI liên kết với input file */}


            {/* Hiển thị hình ảnh preview */}
            {preview ? (
                <Box sx={{ marginTop: 3, position: 'relative', display: 'inline-block' }}>
                    <img
                        src={preview}
                        alt="Preview"
                        style={{
                            maxWidth: '200px',
                            maxHeight: '200px',
                            borderRadius: '8px',
                            border: '1px solid #ddd',
                        }}
                    />
                    {/* Nút xóa file */}
                    <IconButton
                        onClick={handleRemoveFile}
                        sx={{
                            position: 'absolute',
                            top: 5,
                            right: 5,
                            backgroundColor: 'rgba(255, 255, 255, 0.8)',
                            '&:hover': { backgroundColor: 'rgba(255, 255, 255, 1)' },
                        }}
                    >
                        <CloseIcon color="error" />
                    </IconButton>
                </Box>
            ) :
                <label htmlFor="file-input">
                    <IconButton component="span">
                        <PhotoIcon className="size-7 fill-sky-600" />
                    </IconButton>
                </label>
            }
            <input
                type="file"
                id="file-input"
                style={{ display: 'none' }}
                onChange={handleFileChange}
                accept="image/*" // Chỉ nhận file ảnh
            />
            
            {/* Nút upload */}
            <Button
                variant="contained"
                color="success"
                onClick={handleUpload}
                sx={{ marginTop: 2 }}
                disabled={!file}
            >
                Upload File
            </Button>

        </Box>
    );
};

export default FileUploadButton;
