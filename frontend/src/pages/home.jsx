import Post from "../components/Post";
import PostStatus from "../components/Status/PostStatus";
function Home() {
    return (
        <div className="grid gap-5 mt-3 rounded-md">
            <PostStatus />
            <Post />
            <Post />
        </div>
    );
}

export default Home;
