import { Outlet, Link } from "react-router-dom";
import Navbar from "./navbar/navBar";
import LeftListMenu from "./menu/LeftMenuList";
export default function Layout() {
    return (
        <div className="grid gap-[64px]">
            <div>
                <Navbar />
            </div>
            <Outlet />
        </div>
    )
};
