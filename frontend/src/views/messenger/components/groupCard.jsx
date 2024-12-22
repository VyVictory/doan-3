import { useState, useEffect } from "react";
import user from "../../../service/user"; // Ensure you import the correct service or API client
import imgUser from '../../../img/user.png'
import Loading from "../../../components/Loading";
import group from "../../../service/group";
const GroupCard = ({ group }) => {
    const [groupdata, setGroupdata] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchdata = async () => {
            if (group?._id) { // Check if iduser is valid
                try {
                    const res = await group.getMemberIngroup(group._id)
                    if (res.success) {
                        setGroupdata(res.data);
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                } finally {
                    setLoading(false); // Stop loading
                }
            }
        };

        fetchdata();
    }, [group]); // Run effect when iduser changes
    // console.log(userdata)
    if (loading) {
        return (
            <Loading />
        );
    }
    console.log(groupdata)
    return (
        <>
            <img
                src={
                    groupdata?.avatar
                        ? groupdata.avatar
                        : imgUser
                }
                alt="user" className="w-12 h-12 rounded-full mr-2 border-white border-2" />
            <div className="text-start line-clamp-3 ">
                <h3 className="font-semibold">
                   { group.name?group.name : "No Name"}
                </h3>
                
                <p className="text-gray-500 line-clamp-1">ô no không có tin xem trướcccccccccccccc</p>
            </div>
        </>
    );
};

export default GroupCard;
