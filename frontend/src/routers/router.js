
// import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from '../pages/home.jsx';
import Myfriend from "../pages/friend/myfriend.jsx";
import Layout from "../pages/Layout.js"
import Authencation from "../auth/index.jsx";
import Personal from "../user/personal/index.jsx";
import AboutProfile from "../components/Profile/AboutProfile.jsx"
import MyPosts from "../components/Profile/MyPosts.jsx";
import FriendProfile from "../components/Profile/FriendProfile.jsx";
import Messenger from "../pages/messenger/Messenger.jsx";
import Searchpage from "../pages/search/index.jsx";
import Navbar from "../components/navbar/navBar.jsx";
import Allfriend from "../components/friend/Allfriend.jsx";
import Friendinvitation from "../components/friend/friendinvitation.jsx";

function routers() {
    return (
        <div className="bg-sky-100 min-h-screen text-white">
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="friends" element={<Myfriend />} >
                            <Route path="list" element={<Allfriend />} />
                            <Route path="requests" element={<Friendinvitation />} />
                        </Route>
                        <Route path="search" element={<Searchpage />} />
                        <Route path="user" element={<Personal />}>
                            <Route index element={<MyPosts />} />
                            <Route path="about" element={<AboutProfile />} />
                            <Route path="friends" element={<FriendProfile />} />
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
