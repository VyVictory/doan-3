import { Outlet, Link } from "react-router-dom";
import Navbar from "./navbar/navBar";
import LeftListMenu from "./menu/LeftMenuList";
export default function Layout() {
    return (
        <>
            <Navbar />
            {/* <LeftListMenu /> */}

            <div className="grid justify-items-center text-black">
                <Outlet />
            </div>
        </>
    )
};
