
import Post from "../post/Post";
import PostStatus from "../post/components/PostStatus.jsx";

import Story from "../story/Story.jsx";

function Home() {
    return (
        <div className="flex justify-center">
            <div className="grid gap-5 mt-3 rounded-md pb-4 max-w-[800px]">
                <Story />
                <PostStatus />
                <Post />
                {/* {authToken.getToken()} */}
            </div>
        </div>

    );
}

export default Home;
