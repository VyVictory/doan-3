import { Outlet, Link } from "react-router-dom";
import Navbar from "./navbar/navBar";
export default function Layout() {

    return (
        <>
            <Navbar />
            <div className="grid justify-items-center text-black">
                <Outlet />
            </div>
        </>
    )
};
