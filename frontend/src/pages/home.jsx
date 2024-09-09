import Post from "../components/Post";
import PostStatus from "../components/PostStatus";
function Home() {
    return (
        <>
            <div className="bg-[#55679C] mt-5 py-2 mx-16 rounded-md">
                <PostStatus />
            </div>
            <div className="bg-[#55679C] mt-5 mx-16 rounded-md">
                <Post />
            </div>
        </>
    );
}

export default Home;
