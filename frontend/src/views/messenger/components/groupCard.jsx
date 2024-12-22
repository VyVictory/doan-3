import { useState, useEffect } from "react";
import user from "../../../service/user"; // Ensure you import the correct service or API client
import imgUser from '../../../img/user.png'
import Loading from "../../../components/Loading";
import group from "../../../service/group";
const GroupCard = ({ idgr }) => {
    const [groupdata, setGroupdata] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchdata = async () => {
            if (idgr) { // Check if iduser is valid
                try {
                    const res = await group.getMemberIngroup(idgr)
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
    }, [idgr]); // Run effect when iduser changes
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
                    {/* {groupdata
                        ? `${groupdata._id || ''} ${groupdata._id || ''}`.trim()
                        : "No Name"} */}
                        {idgr}
                </h3>
                
                <p className="text-gray-500 line-clamp-1">ô no không có tin xem trướcccccccccccccc</p>
            </div>
        </>
    );
};

export default GroupCard;
