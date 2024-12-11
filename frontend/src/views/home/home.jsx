
import Post from "../post/PostPersonal.jsx";
import PostStatus from "../post/components/PostStatus.jsx";
import { useState, useEffect } from "react";
import { profileUserCurrent } from "../../service/ProfilePersonal.js";
import Story from "../story/Story.jsx";

function Home() {
    const [user, setUser] = useState({})

    //e
    useEffect(() => {
        const fetchdata = async () => {
            const response = await profileUserCurrent();
            setUser(response)
        }
        fetchdata()
    }, [])
    return (
        <div className="flex justify-center">
            <div className="grid gap-5 mt-3 rounded-md pb-4 max-w-[800px]">
                <Story />
                <PostStatus user={user} />


            </div>
        </div>

    );
}
export default Home;
