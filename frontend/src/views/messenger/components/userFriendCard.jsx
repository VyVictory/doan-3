import { useState, useEffect } from "react";
import user from "../../../service/user"; // Ensure you import the correct service or API client
import imgUser from '../../../img/user.png'
const UserFriendCard = ({ iduser }) => {
    const [userdata, setUserdata] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchdata = async () => {
            if (iduser) { // Check if iduser is valid
                try {
                    console.log('Fetching data for id:', iduser);
                    const res = await user.getProfileUser(iduser);
                    if (res.success) {
                        setUserdata(res.data);
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                } finally {
                    setLoading(false); // Stop loading
                }
            }
        };

        fetchdata();
    }, [iduser]); // Run effect when iduser changes
    console.log(userdata)
    if (loading) {
        return (
            <div className="w-full h-full flex justify-center items-center">
                Loading...
            </div>
        );
    }

    return (
        <>
            <img
                src={
                    userdata?.avatar
                        ? userdata.avatar
                        : imgUser
                }
                alt="user" className="w-10 h-10 rounded-full mr-2" />
            <div className="text-start line-clamp-3">
                <h3 className="font-semibold">
                    {userdata
                        ? `${userdata.firstName || ''} ${userdata.lastName || ''}`.trim()
                        : "No Name"}
                </h3>
                <p className="text-gray-400">messss</p>
            </div>
        </>
    );
};

export default UserFriendCard;
