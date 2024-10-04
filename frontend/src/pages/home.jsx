import Post from "../components/post/Post";
import PostStatus from "../components/Status/PostStatus";
function Home() {
    return (
        <div className="grid gap-5 mt-3 rounded-md max-w-[900px] w-full">
            <PostStatus />
            <Post />
            <Post />
        </div>
    );
}

export default Home;
