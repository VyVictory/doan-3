import { Outlet, Link } from "react-router-dom";
import NavBar from "../components/navbar/navBar";
export default function Layout() {
    return (
        <>
            <NavBar />
            <Outlet />
        </>
    )
};
