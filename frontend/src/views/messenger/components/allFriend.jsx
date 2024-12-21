import friend from "../../../service/friend";
import UserFriendCard from "./userFriendCard";
import Loading from "../../../components/Loading";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const AllFriend = () => {
    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const res = await friend.getListMyFriend();
                if (res.success) {
                    setFriends(res.data);
                } else {
                    setFriends([]);
                }
            } catch (error) {
                console.error("Error fetching friend list:", error);
                setFriends([]);
            } finally {
                setLoading(false); // Stop loading
            }
        };
        fetchdata();
        console.log(friends)
    }, []);
    return (
        <>
            {
                loading ?
                    <Loading />
                    :
                    <ul
                        className="h-full flex flex-col "
                        style={{
                            overflowY: "scroll",
                            scrollbarWidth: "none", // Firefox
                            msOverflowStyle: "none", // Internet Explorer and Edge
                        }}
                    >
                        {friends.map((friend, index) => (
                            <li key={index} className="hover:bg-blue-300 px-2 rounded-md shadow-sm">
                                <button
                                    onClick={() =>
                                        navigate(`inbox/?iduser=${friend?.receiver?._id || friend?.sender?._id}`)
                                    }
                                    className="flex items-center py-2 w-full"
                                >
                                    {friend.receiver && friend.receiver._id && (
                                        <UserFriendCard iduser={friend.receiver._id} />
                                    )}
                                    {friend.sender && friend.sender._id && (
                                        <UserFriendCard iduser={friend.sender._id} />
                                    )}
                                </button>
                            </li>
                        ))}

                    </ul>
            }
        </>
    );
}

export default AllFriend;