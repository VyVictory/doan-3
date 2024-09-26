
// import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from '../pages/home.jsx';
import Myfriend from "../friend/myfriend.jsx";
import Layout from "../pages/Layout.js"
import Authencation from "../auth/index.jsx";
import Personal from "../user/personal/index.jsx";
import AboutProfile from "../components/Profile/AboutProfile.jsx"
import MyPosts from "../components/Profile/MyPosts.jsx";

import FriendProfile from "../components/Profile/FriendProfile.jsx";

import Messenger from "../components/messenger/Messenger.jsx";

function routers() {
    return (
        <div className="">


            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="friend" element={<Myfriend />} />
                        <Route path="user" element={<Personal />}>
                            <Route index element={<MyPosts />} />
                            <Route path="about" element={<AboutProfile />} />
                            <Route path="friend" element={<FriendProfile />} />
                        </Route>
                        {/* <Route path="*" element={<NoPage />} /> */}
                        <Route path="messenger" element={<Messenger />} />

                    </Route>
                    <Route path="auth" element={<Authencation />}>
                        <Route index element={<Authencation />} />
                        {/* <Route path="*" element={<NoPage />} /> */}
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default routers;
