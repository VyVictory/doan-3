
// import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from '../pages/home.jsx';
import App from '../pages/App.js';
import Myfriend from "../friend/myfriend.jsx";
function routers() {
    return (
        <div className="routers bg-[#7C93C3] h-full h-screen">
            <BrowserRouter>
                <div>
                    <App />
                </div>
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="friend" element={<Myfriend />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default routers;
