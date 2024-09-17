import { Outlet, Link } from "react-router-dom";
import NavBar from "../components/navbar/navBar";
export default function Layout() {
    return (
        <div className="bg-[#020617] h-full w-full min-h-screen text-[#f8fafc]">
            <NavBar />
            <Outlet />
        </div>
    )
};
