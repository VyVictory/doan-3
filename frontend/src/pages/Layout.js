import { Outlet, Link } from "react-router-dom";
export default function Layout() {

    return (
        <div className="grid justify-items-center">
            <Outlet />
        </div>
    )
};
