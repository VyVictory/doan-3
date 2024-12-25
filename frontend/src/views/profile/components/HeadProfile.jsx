import React from 'react'
import { useState, useEffect } from 'react'
import { profileUserCurrent } from '../../../service/ProfilePersonal'
import { PencilIcon } from '@heroicons/react/24/solid'
import ModalUpdateAVT from './ModalUpdateAVT'
export default function HeadProfile() {
    const [dataProfile, setDataProfile] = useState({})

    useEffect(() => {
        const fetchdata = async () => {
            const response = await profileUserCurrent();
            if (response && response.data) {
                setDataProfile(response.data)
            }
        }
        fetchdata()
    }, [])
    return (
        <div className=''>
            <div
                className=" h-[300px] rounded-2xl z-0 grid bg-cover bg-no-repeat"
                style={{
                    backgroundImage: `url(${dataProfile && dataProfile.coverImage ? dataProfile.coverImage : 'https://mcdn.wallpapersafari.com/medium/91/45/MehDBZ.jpg'})`,
                    backgroundPosition: '10%',
                }}>

            </div>
            <div>
                <div className='absolute justify-start top-[22rem] -translate-x-1/2 -translate-y-1/2 left-1/2 transform'>
                    <img
                        className="rounded-full h-40 w-40 items-center border-4"
                        alt=""
                        src={`${dataProfile && dataProfile.avatar
                            ? dataProfile.avatar
                            : 'https://th.bing.com/th/id/OIP.PKlD9uuBX0m4S8cViqXZHAHaHa?rs=1&pid=ImgDetMain'
                            }`}
                    />
                </div>
                <div className='h-20'></div>
                <h1 className="font-bold text-2xl text-center mb-4">
                    {dataProfile?.lastName} {dataProfile?.firstName}
                    <button className="" onClick={() => document.getElementById('my_modal_2').showModal()}><PencilIcon className='size-4 fill-sky-800' /></button>
                </h1>

                <ModalUpdateAVT user={dataProfile} />
            </div>
        </div >

    )
}
