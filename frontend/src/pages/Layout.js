import { Outlet, Link } from "react-router-dom";
import Navbar from "../components/navbar/navBar";
export default function Layout() {

    return (
        <>
            <Navbar />
            <div className="grid justify-items-center">
                <Outlet />
            </div>
        </>
    )
};
