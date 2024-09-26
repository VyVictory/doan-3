import { Outlet, Link } from "react-router-dom";
import NavBar from "../components/navbar/navBar";
export default function Layout() {
    return (
        <div className=" h-full  text-[#f8fafc]">
            <NavBar />
            <div className="h-screen pt-16">
            <Outlet />
            </div>
            
        </div>
    )
};
