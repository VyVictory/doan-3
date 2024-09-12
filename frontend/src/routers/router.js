
// import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from '../pages/home.jsx';
import Myfriend from "../friend/myfriend.jsx";
import Layout from "../pages/Layout.js"
import Index from "../authentication/index.jsx";
function routers() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="friend" element={<Myfriend />}></Route>
                    {/* <Route path="*" element={<NoPage />} /> */}
                </Route>
                <Route path="authetication" element={<Index />}>
                    <Route index element={<Index />} />
                    {/* <Route path="*" element={<NoPage />} /> */}
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default routers;
