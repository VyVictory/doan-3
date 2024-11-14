import LeftListMenu from "../menu/LeftMenuList.jsx";
import Post from "../post/Post";
import PostStatus from "../post/components/PostStatus.jsx";
import ShortPost from "../shortpost/ShortPost.jsx";
import Story from "../story/Story.jsx";
import authToken from "../../components/authToken.jsx";
function Home() {
    return (
        <div className="flex justify-center w-full">
            <div className="grid gap-5 mt-3 rounded-md max-w-[900px] w-full pb-4 ">
                <PostStatus />
                <Story />
                <Post />
                {/* {authToken.getToken()} */}
            </div>
        </div>

    );
}

export default Home;
