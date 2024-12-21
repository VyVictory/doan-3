import { useState, useEffect } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { InboxIcon, UserGroupIcon, UsersIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

import AllFriend from "./allFriend";
import AllGroup from "./allGroup";
import AllInbox from "./allInbox";
const LeftMessenger = () => {
    const [alignment, setAlignment] = useState("friends");

    const navigate = useNavigate(); // React Router navigation function
    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };
    const renderContent = () => {
        switch (alignment) {
            case "inboxs":
                return <AllInbox />;
            case "groups":
                return <AllGroup />;
            case "friends":
                return <AllFriend />;
            default:
                return <AllFriend />;
        }
    };
    return (
        <div className="border-r-gray-300 border-r h-full flex flex-col">
            <div className="w-full flex justify-center">
                <ToggleButtonGroup
                    className="flex justify-center bg-white w-full max-w-lg h-14 rounded-none "
                    color="primary"
                    value={alignment}
                    exclusive
                    onChange={handleChange}
                    aria-label="Platform"
                >
                    <ToggleButton value="inboxs" className="flex-1 font-medium transition-all hover:bg-blue-50">
                        <InboxIcon className="h-6 w-6 text-orange-300" />
                        <span className="ml-2 text-nowrap">Inbox</span>
                    </ToggleButton>
                    <ToggleButton value="groups" className="flex-1 font-medium transition-all hover:bg-blue-50">
                        <UserGroupIcon className="h-6 w-6 text-blue-400" />
                        <span className="ml-2 text-nowrap">Nhóm</span>
                    </ToggleButton>
                    <ToggleButton value="friends" className="flex-1 font-medium transition-all hover:bg-blue-50">
                        <UsersIcon className="h-6 w-6 text-green-400" />
                        <span className="ml-2 text-nowrap">Bạn Bè</span>
                    </ToggleButton>
                </ToggleButtonGroup>
            </div>

            {/* Nội dung động */}
            <div className="flex-1 p-2">
                {renderContent()}
            </div>
        </div>
    );
};

export default LeftMessenger;
