import React from 'react'
import CardUser from './CardUser'

export default function AVTUser({ user }) {
    return (

        <div div className="dropdown dropdown-hover" >
            <div tabIndex={0} >
                <div className="mask mask-squircle w-14 h-14 divide-2">
                    <img
                        src={`${user.avatar ? user.avatar : "https://th.bing.com/th/id/OIP.PKlD9uuBX0m4S8cViqXZHAHaHa?rs=1&pid=ImgDetMain"}`} alt='' />
                </div>
            </div>
            <ul tabIndex={0} className="dropdown-content menu bg-white border-2 rounded-box z-10 w-[350px] p-1 shadow">
                <CardUser />
            </ul>
        </div >

    )
}
