import { Outlet, Link } from "react-router-dom";
import NavBar from "../components/navbar/navBar";
import Footer from "../components/footer/Footer"
export default function Layout() {
    return (
        <div className=" h-full max-h-screen bg-[#020617]  text-[#f8fafc]">
            <NavBar />
            <div className="  mb-5 pt-16">
                <Outlet />
            </div>
            <Footer />
        </div>
    )
};
