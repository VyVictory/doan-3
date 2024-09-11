
// import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from '../pages/home.jsx';
import App from '../pages/App.js';
function routers() {
    return (
        <div className="routers bg-[#7C93C3] h-full">
            <BrowserRouter>
                <div>
                    <App />
                </div>
                <Routes>
                    <Route path="/" element={<Home />}>
                        {/* <Route index element={<Home />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NoPage />} /> */}
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default routers;
