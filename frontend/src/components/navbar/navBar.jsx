import UserNavbar from "./UserNavbar";
import React, { useState, useEffect } from 'react';

import NavbarLogin from "./NavbarLogin";
export default function Navbar() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log(token)
        if (token) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, []); // Empty dependency array means this effect runs once on mount

    // const [transferUserNavbar, setTransferUserNavbar] = useState(true)
    // const blocklist = ['login', 'admin', 'register'];
    // const location = useLocation();

    // Extracting the path name
    // const path = location.pathname; // This will give you '/auth'

    // // Getting the last part of the path
    // const lastSegment = path.substring(path.lastIndexOf('/') + 1); // 'auth'
    // useEffect(() => {
    //     for (let i = 0; i < blocklist.length; i++) {
    //         if (blocklist[i] == lastSegment) {
    //             setTransferUserNavbar(false)
    //         }
    //     }
    // }, [lastSegment, blocklist]); // Re-run when the URL changes
    return (
        <>
            {isAuthenticated ? (
                <>
                    <UserNavbar />
                    <div className="h-[68px]"></div>
                </>
            ) : (
                <>
                    <NavbarLogin />
                    <div className="h-[68px]"></div>
                </>
            )}
        </>


    );
}