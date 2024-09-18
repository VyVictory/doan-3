import Post from "../components/Post";
import PostStatus from "../components/Status/PostStatus";
function Home() {
    return (
        <div className="grid gap-5  mt-5 mx-60 rounded-md text-[#f8fafc]">
            <PostStatus />
            <Post />
            <Post />
        </div>
    );
}

export default Home;
