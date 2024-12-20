import React from "react"
import DropdownMyfriend from "./DropdownMyfriend"
import { useState, useEffect } from "react"
import friend from "../../service/friend"
import Loading from "../../components/Loading"
export default function FriendProfile() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchdata = async () => {
      setLoading(true);
      const response = await friend.getListMyFriend();
      setData(response.data)
      setLoading(false);
    }
    setTimeout(fetchdata, 1000);
  }, [])
  return (
    <ul className="grid gap-3 sm:grid-cols-2 sm:gap-y-3 xl:col-span-2 p-3 ">
      {loading ? (
        <Loading />
      ) : (
        data.length > 0 ? (
          data.map((e) => (
            <li className='border-[1px] rounded-md p-2 shadow-lg'>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-x-6 ">
                  <img
                    className="w-14 aspect-square rounded-full shadow-md"
                    alt=""
                    src={`${e.receiver.avatar}`} />
                  <div>
                    <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900 ">{e.receiver.firstName} {e.receiver.lastName}</h3>
                  </div>
                </div>
                <DropdownMyfriend />
              </div>
            </li>
          ))
        ) : (<span>Chưa có bạn bè</span>))}
    </ul>

  )
}
