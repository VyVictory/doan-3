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
import CardUserList from './userCard/cardUserList';

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
                <CardUserList userdata={userdata} />
            ))}
        </>
    )
}
