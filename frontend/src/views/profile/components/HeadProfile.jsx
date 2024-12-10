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
                    src="https://www.didongmy.com/vnt_upload/news/05_2024/anh-27-meme-dang-yeu-didongmy.jpg" />
                <h1 className='font-bold text-2xl mt-5'>{dataProfile.lastName} {dataProfile.firstName}</h1>
            </div>
        </div>

    )
}
