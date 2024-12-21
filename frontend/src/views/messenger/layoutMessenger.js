import { Outlet } from "react-router-dom";
import { useState } from "react";
import LeftMessenger from "./components/LeftMessenger";
import RightMessenger from "./components/rightMessenger";
import { createContext } from "react";
export const MessengerContext = createContext();

const LayoutMessenger = () => {
    const [RightShow, setRightShow] = useState(true);
    const [content, setContent] = useState(true);
    const [inboxData, setInboxData] = useState({
        data: [],
        messenger: []
    });
    const handleHiddenRight = () => {
        setRightShow(!RightShow)
    }
    return (
        <MessengerContext.Provider value={{ RightShow, handleHiddenRight, content, setContent, setInboxData, inboxData }}>
            <div className="h-screen flex flex-row bg-gray-100 text-black" style={{ marginTop: '-68px', paddingTop: '68px' }}>
                <div className=' h-full'>
                    {/* {chanecontainer ? 'w-1/4 h-full' : 'w-full h-full'} */}
                    <LeftMessenger />
                    {/* bt_chanetransfer={() => setTransfer(!transfer)}  */}
                </div>
                <div className="w-full min-w-[408.362px]">

                    <Outlet />
                </div>
                {
                    RightShow ?
                        <div className=' h-full'>
                            <RightMessenger />
                        </div>
                        : <></>
                }

            </div>
        </MessengerContext.Provider >
    )
};
export default LayoutMessenger;
