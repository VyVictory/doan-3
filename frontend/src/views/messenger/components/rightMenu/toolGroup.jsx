import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Files from "./component/files";
import PictureAndVideo from "./component/pictureAndVideo";
import ListMemberGroup from './component/listMemberGroup';

const ToolGroup = () => {
    const location = useLocation();
    const [idgroupExists, setIdgroupExists] = useState(false);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const idgroup = queryParams.get('idgroup');

        if (idgroup ) {
            setIdgroupExists(true);
        } else {
            setIdgroupExists(false);
        }
    }, [location.search]);

    return (
        <div className="flex flex-col h-full">
            <div className="bg-white border-b border-l-2 flex justify-between items-center h-[56px]">
                <strong className="text-center w-full">Thông tin nhóm</strong>
            </div>

            {idgroupExists ? (
                <div className="overflow-y-scroll flex-1 custom-scroll">
                    <ListMemberGroup />
                    <PictureAndVideo />
                    <Files />
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-full">
                    <p className="text-gray-500">Nhóm không tồn tại hoặc không tìm thấy.</p>
                </div>
            )}
        </div>
    );
};

export default ToolGroup;
