import React from 'react'
import { useState, useEffect, useCallback } from "react";
import { getSearchUser } from '../../service/SearchService';
import Loading from '../../components/Loading';
import friend from '../../service/friend';
import { toast } from 'react-toastify';
import NotificationCss from '../../module/cssNotification/NotificationCss';
import userImg from '../../img/user.png';
import user from '../../service/user';
import { debounce } from 'lodash';
import ButtonStatus from './buttonStatus';

export default function CardUserResult({ query }) {

    const [userdatas, setUserdatas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [allUsers, setAllUsers] = useState([]); // State to store all users
    useEffect(() => {
        async function fetchAllPosts() {
            setLoading(true);
            try {
                const response = await user.getAllUser(); // Fetch all posts
                const sortedPosts = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setAllUsers(sortedPosts);
                setUserdatas(sortedPosts); // Initially display all posts
            } catch (error) {
                console.error(error);
                setAllUsers([]);
                setUserdatas([]);
            } finally {
                setLoading(false);
            }
        }

        fetchAllPosts();
    }, []);

    useEffect(() => {
        const debouncedFetchData = debounce(async () => {
            if (query === '') {
                setUserdatas(allUsers); // Display all posts if no query
                return;
            }
            setLoading(true);
            try {
                const response = await getSearchUser(query);
                const sortedPosts = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setUserdatas(sortedPosts);
            } catch (error) {
                console.error(error);
                setUserdatas([]);
            } finally {
                setLoading(false);
            }
        }, 500); // 300ms debounce delay

        debouncedFetchData();

        return () => {
            debouncedFetchData.cancel();
        };
    }, [query, allUsers]);





    const handDetailUser = (id) => {
        window.location.href = `/user/${id}`;
    };
    if (loading) {
        return <p className='text-center mt-5'><Loading /></p>;
    }

    if (userdatas.length === 0) {
        return <p className='mt-5'>không tìm thấy dữ liệu, vui lòng nhập tên người dùng</p>;
    }

    console.log(userdatas)
    return (
        <>
            {userdatas.map(userdata => (
                <button
                    onClick={() => handDetailUser(userdata._id)}
                    className="w-full flex flex-row rounded-lg hover:bg-gray-100 justify-between items-center p-2 max-h-[80px] sm:max-h-[60px] md:max-h-[70px] lg:max-h-[80px]"
                >
                    <div className="flex flex-row items-center">
                        <div>
                            <img
                                className="w-14 h-14 rounded-full"
                                src={userdata.avatar || userImg}
                                alt=''
                            />
                        </div>
                        <div className="flex flex-col pl-2">
                            <div className="text-start font-semibold text-nowrap overflow-hidden text-ellipsis max-w-52">
                                {userdata.firstName || ''} {userdata.lastName || ''}  {userdata.status}
                            </div>
                            {/* Bạn chung */}
                        </div>
                    </div>

                 <ButtonStatus _id="userId123" status="no friend" />

                </button>
            ))}
        </>
    )
}
