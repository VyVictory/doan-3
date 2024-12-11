import React from 'react'
import { useState, useEffect } from 'react'
import { profileUserCurrent } from '../../../service/ProfilePersonal'
export default function HeadProfile() {
    const [dataProfile, setDataProfile] = useState({})

    useEffect(() => {
        const fetchdata = async () => {
            const response = await profileUserCurrent();
            setDataProfile(response)
        }
        fetchdata()
    }, [])
    return (
        <div className=''>
            <div className=" h-[300px] z-0 grid bg-cover bg-no-repeat bg-[url('https://cellphones.com.vn/sforum/wp-content/uploads/2024/02/anh-thien-nhien-22.jpg')]" style={{ backgroundPosition: '10%' }}></div>
            <div className='grid justify-center relative z-0 bottom-20 overflow-hidden'>
                <img className='rounded-full h-40 w-40' alt=''
                    src={`${dataProfile.avatar ? dataProfile.avatar : "https://th.bing.com/th/id/OIP.PKlD9uuBX0m4S8cViqXZHAHaHa?rs=1&pid=ImgDetMain"}`} />
                <h1 className='font-bold text-2xl text-center mt-5'>{dataProfile.lastName} {dataProfile.firstName}</h1>
            </div>
        </div>

    )
}
