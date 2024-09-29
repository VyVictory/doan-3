import Post from "../components/Post";
import PostStatus from "../components/Status/PostStatus";
function Home() {
    return (
        <div className="grid mt-5 gap-5  rounded-md text-[#f8fafc]">
            <PostStatus />
            <Post />
            <Post />
        </div>
    );
}

export default Home;
