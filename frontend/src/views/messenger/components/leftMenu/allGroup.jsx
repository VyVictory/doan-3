import friend from "../../../../service/friend";
import UserFriendCard from "../userFriendCard";
import Loading from "../../../../components/Loading";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import group from "../../../../service/group";
import GroupCard from "../groupCard";

const AllGroup = () => {
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredFriends, setFilteredFriends] = useState([]);
    const [filteredGroups, setFilteredGroups] = useState([]);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await group.getMyListChat();
                if (res.success) {
                    setGroups(res.data.Group);
                    setFilteredGroups(res.data.Group);
                    // const members = await group.getMemberIngroup(res.data.Group[0]._id);
                    // if (members.success) {
                    //     console.log(members)
                    //     setGroupd(members.data);
                    // }
                } else {
                    setGroups([]);
                    setFilteredGroups([]);
                }
            } catch (error) {
                console.error("Error fetching friend list:", error);
                setGroups([]);
                setFilteredGroups([]);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    useEffect(() => {
        if (searchTerm.trim() === "") {
            setFilteredGroups(groups);
        } else {
            const filtered = groups.filter((group) => {
                // Assuming the name of the group is stored in 'name'
                return group.name.toLowerCase().includes(searchTerm.toLowerCase());
            });
            setFilteredGroups(filtered);
        }
    }, [searchTerm, groups]);

    // console.log(filteredGroups)
    console.log(groups)
    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <>
                    {/* Search Input */}

                    <div className=" border-b flex justify-between items-center h-[56px]">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={handleInputChange}
                            className="w-full rounded-3xl border border-gray-300 pr-8 pl-9 py-2 text-black bg-white focus:outline-none"
                            placeholder="Tìm kiếm..."
                        />
                        <a className="absolute ml-2 text-gray-400">
                            <MagnifyingGlassIcon className="h-4 w-4 fill-black" />
                        </a>
                    </div>

                    {/* Scrollable Friends List */}
                    <div className="overflow-y-scroll flex-1 custom-scroll">
                        <ul className="flex flex-col ">
                            {filteredGroups.length === 0 ? (
                                <li className="px-2 py-4 text-center text-white">Không có bạn bè nào phù hợp với tìm kiếm.</li>
                            ) : (
                                filteredGroups.map((group, index) => (
                                    <li key={index} className="hover:bg-blue-300 px-2 py-3 rounded-md shadow-sm">
                                        <a href={`/messenger/group/?idgroup=${group?._id}`}>
                                            <button
                                                className="flex items-center w-full"
                                            >
                                                <GroupCard group={group} />
                                            </button>
                                        </a>

                                    </li>

                                ))
                            )}

                        </ul>
                    </div>
                </>
            )}
        </>
    );
};

export default AllGroup;
