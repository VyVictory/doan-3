import { Outlet, Link, useNavigate } from "react-router-dom";
import Navbar from "./navbar/navBar";
import LeftListMenu from "./menu/LeftMenuList";
import authToken from "../components/authToken";
import { useEffect, useState } from "react";
import { profileUserCurrent } from "../service/ProfilePersonal";
export default function Layout() {

    const navigate = useNavigate();
    useEffect(() => {
        if (!authToken.getToken()||profileUserCurrent()=='') {
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
