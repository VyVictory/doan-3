import { Outlet, Link, useNavigate  } from "react-router-dom";
import Navbar from "./navbar/navBar";
import LeftListMenu from "./menu/LeftMenuList";
import authToken from "../components/authToken";
import { useEffect } from "react";

export default function Layout() {
    const navigate = useNavigate();
    useEffect(() => {
        if (!authToken.getToken()) {
            navigate("/login");
        }
    }, [navigate]);
    return (
        <div className="grid gap-[64px]">
            <div>
                <Navbar />
            </div>
            <Outlet />
        </div>
    )
};
