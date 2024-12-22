import { useState, useEffect } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { InboxIcon, UserGroupIcon, UsersIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

import AllFriend from "./allFriend";
import AllGroup from "./allGroup";
import AllInbox from "./allInbox";
import { MessengerContext } from "../layoutMessenger";

const LeftMessenger = () => {
    const [alignment, setAlignment] = useState("friends");
    const { setContent, content } = useContext(MessengerContext);
    const navigate = useNavigate(); // React Router navigation function
    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };
    const renderContent = () => {

        switch (alignment) {
            case "inbox":
                setContent("inbox")
                return <AllInbox />;
            case "group":
                setContent("group")
                return <AllGroup />;
            case "friend":
                setContent("inbox")
                return <AllFriend />;
            default:
                return <AllFriend />;
        }
    };
    return (
        <div className="h-full flex flex-col border-r-gray-300 border-r ">
            <div className=" min-w-80 h-full">
                <div className="flex flex-col h-full">
                    <div className="w-full flex justify-center relative">
                        <ToggleButtonGroup
                            className="flex justify-center bg-white w-full max-w-lg h-14 rounded-none "
                            color="primary"
                            value={alignment}
                            exclusive
                            onChange={handleChange}
                            aria-label="Platform"
                        >
                            <ToggleButton value="inbox" className="flex-1 font-medium transition-all hover:bg-blue-50">
                                <InboxIcon className="h-6 w-6 text-orange-300" />
                                <span className="ml-2 text-nowrap">Inbox</span>
                            </ToggleButton>
                            <ToggleButton value="group" className="flex-1 font-medium transition-all hover:bg-blue-50">
                                <UserGroupIcon className="h-6 w-6 text-blue-400" />
                                <span className="ml-2 text-nowrap">Nhóm</span>
                            </ToggleButton>
                            <ToggleButton value="friend" className="flex-1 font-medium transition-all hover:bg-blue-50">
                                <UsersIcon className="h-6 w-6 text-green-400" />
                                <span className="ml-2 text-nowrap">Bạn Bè</span>
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </div>

                    {/* Nội dung động */}

                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default LeftMessenger;
