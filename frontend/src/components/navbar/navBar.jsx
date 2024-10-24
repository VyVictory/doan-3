import UserNavbar from "./UserNavbar";
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'
export default function Navbar() {
    const [transferUserNavbar, setTransferUserNavbar] = useState(true)
    const blocklist = ['login', 'admin', 'register'];
    const location = useLocation();

    // Extracting the path name
    const path = location.pathname; // This will give you '/auth'

    // Getting the last part of the path
    const lastSegment = path.substring(path.lastIndexOf('/') + 1); // 'auth'
    useEffect(() => {
        for (let i = 0; i < blocklist.length; i++) {
            if (blocklist[i] == lastSegment) {
                setTransferUserNavbar(false)
            }
        }
    }, [lastSegment, blocklist]); // Re-run when the URL changes
    return (
        <>

            {transferUserNavbar && (
                <>
                    <UserNavbar />
                    <div className="h-[68px]">

                    </div>
                </>
            )}
        </>
    );
}