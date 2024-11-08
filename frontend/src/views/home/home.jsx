import Post from "../post/Post";
import PostStatus from "../post/components/PostStatus.jsx";
import ShortPost from "../shortpost/ShortPost.jsx";
function Home() {
    return (
        <div className="grid gap-5 mt-3 rounded-md max-w-[900px] w-full pb-4 ">
            <PostStatus />
            <ShortPost/>
            <Post />
            <Post />
        </div>
    );
}

export default Home;
