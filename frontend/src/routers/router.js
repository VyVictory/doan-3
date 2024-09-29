
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
import Messenger from "../pages/messenger/Messenger.jsx";
import Searchpage from "../search/index.jsx";
import { NavBar } from "../components/navbar/Navbar.jsx";
function routers() {
    return (
        <div style={{ "background": `10% /  cover no-repeat url('https://img.freepik.com/free-photo/aurora-borealis-landscape-sea_23-2151387599.jpg?t=st=1727617598~exp=1727621198~hmac=077befabd32d849edc1e7b7a5ec9b4376a923ea1344e33589e5c76ed67ca3356&w=1380')` }}>
            <div className="bg-black bg-opacity-75 min-h-screen">
                <BrowserRouter>
                    <NavBar />
                    <Routes>
                        <Route path="/" element={<Layout />}>
                            <Route index element={<Home />} />
                            <Route path="friend" element={<Myfriend />} />
                            <Route path="search" element={<Searchpage />} />
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
        </div>
    );
}

export default routers;
