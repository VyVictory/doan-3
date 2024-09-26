
// import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from '../pages/home.jsx';
import Myfriend from "../friend/myfriend.jsx";
import Layout from "../pages/Layout.js"
import Authencation from "../auth/index.jsx";
import Personal from "../user/personal/index.jsx";
import AboutProfile from "../components/Profile/AboutProfile.jsx"
import MyPosts from "../components/Profile/MyPosts.jsx";

function routers() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="friend" element={<Myfriend />} />
                    <Route path="user" element={<Personal />}>
                        <Route index element={<MyPosts />} />
                        <Route path="about" element={<AboutProfile />} />
                    </Route>
                    {/* <Route path="*" element={<NoPage />} /> */}
                </Route>
                <Route path="auth" element={<Authencation />}>
                    <Route index element={<Authencation />} />
                    {/* <Route path="*" element={<NoPage />} /> */}
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default routers;
