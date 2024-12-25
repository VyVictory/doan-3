import { useState, useEffect } from "react";
import { getSearchResult } from "../../service/SearchService";

const PostSearch = () => {
    const [search, setSearch] = useState([]);


    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await getSearchResult("");
                setSearch(response);
            } catch (error) {
                console.error(error);
            }
        };
        fetchPosts();
    }, []);
    return (
        <div className="mt-5">
            <span className="mb-1">Kết quả tìm kiếm</span>
            <div className="card card-side max-h-[200px] bg-base-100 shadow-xl">
                <figure>
                    <img
                        src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
                        alt="Movie" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">Tên người dùng</h2>
                    <p>Content</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">Xem</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostSearch;