import { Outlet, Link } from "react-router-dom";
import NavBar from "../components/navbar/navBar";
import Footer from "../components/footer/Footer"
export default function Layout() {

    return (
<<<<<<< Updated upstream
        <div className=" grid justify-items-center bg-[#020617]  text-[#f8fafc]" >
            <NavBar />
            <div className=" mb-5 pt-16" style={{ maxWidth: 1536 }}>
                <Outlet />
            </div>
            <Footer />
        </ div>
=======
        <div className=" h-full min-h-screen bg-[#020617] text-[#f8fafc]" >
             <NavBar />
            <div className="block h-16">
            </div>
            <div className="">
                <Outlet />
            </div>
            {/* <Footer /> */}
        </div>
>>>>>>> Stashed changes
    )
};
