
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from '../views/home/home.jsx';
import Myfriend from "../views/friend/myfriend.jsx";
import Layout from "../views/Layout.js"
import Personal from "../views/profile/personal/index.jsx";
import AboutProfile from "../views/profile/components/AboutProfile.jsx";
import MyPosts from "../views/profile/components/MyPosts.jsx";
import FriendProfile from "../views/friend/FriendProfile.jsx";
import Messenger from "../views/messenger/Messenger.jsx";
import Searchpage from "../views/search/index.jsx";
import Allfriend from "../views/friend/Allfriend.jsx";
import Friendinvitation from "../views/friend/friendinvitation.jsx";
import Login from "../auth/login/index.jsx";
import Register from "../auth/register/index.jsx";

function routers() {
    return (
        <BrowserRouter>
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
                <Route path="login" element={<Login />}>
                    {/* <Route path="*" element={<NoPage />} /> */}
                </Route>
                <Route path="register" element={<Register />}>
                    {/* <Route path="*" element={<NoPage />} /> */}
                </Route>
            </Routes>
        </BrowserRouter>

    );
}

export default routers;
