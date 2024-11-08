import Post from "../post/Post";
import PostStatus from "../post/components/PostStatus";
function Home() {
    return (
        <div className="grid gap-5 mt-3 rounded-md max-w-[900px] w-full pb-4">
            <PostStatus />
            <Post />
            <Post />
        </div>
    );
}

export default Home;
