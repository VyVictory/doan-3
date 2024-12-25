import { useState, useEffect, Suspense } from "react";
import { getSearchResult } from "../../service/SearchService";
import { useParams } from "react-router-dom";
import CardPost from "./CardPost";
import CardPostResult from "./CardPostResult";
const PostSearch = () => {
    const [query, setQuery] = useState('');

    return (
        <div className="mt-5">
            <label>
                Search albums:
                <input value={query} onChange={e => setQuery(e.target.value)} />
            </label>
            <Suspense fallback={<h2>Loading...</h2>}>
                <CardPostResult query={query} />
            </Suspense>
        </div>
    );
}

export default PostSearch;