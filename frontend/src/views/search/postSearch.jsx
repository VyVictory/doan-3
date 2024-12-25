import { useState, useEffect } from "react";
import { getSearchResult } from "../../service/SearchService";
import { useParams } from "react-router-dom";
const PostSearch = () => {
    const [search, setSearch] = useState([]);
    const { content } = useParams();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await getSearchResult(content);
                setSearch(response);
            } catch (error) {
                console.error(error);
            }
        };
        fetchPosts();
    }, [content]);
    return (
        <div className="mt-5">
            <span className="mb-1">Kết quả tìm kiếm từ khóa: {content}</span>

            <div className="card card-side max-h-[200px] bg-base-100 shadow-xl">
                <figure>
                    <img
                        src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
                        alt="Movie" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{search.firstName} {search.lastName}</h2>
                    <p>{search.content}</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">Xem</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostSearch;