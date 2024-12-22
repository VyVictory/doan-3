import React, { useEffect, useState } from 'react'
import { getComment, handleLike, handleUnLike } from '../../../service/CommentService';
import { differenceInMinutes, differenceInHours, differenceInDays } from 'date-fns';
import AVTUser from '../AVTUser';
import 'animate.css';
import { Form } from 'react-router-dom';
import FormReply from './FormReply';
import FormComment from './FormComment';

export default function Comment({ postId, user }) {
  const [comment, setComment] = useState([])
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await getComment(postId)
        if (response) {
          const sortedComments = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setComment(sortedComments)
        }
      } catch (error) {
        console.error("Error liking the post:", error);
      }
    }
    fetchdata()
  }
    , [postId]);
  //format Time CreateAt Comment
  const formatDate = (date) => {
    const postDate = new Date(date);
    const currentDate = new Date();
    const minutesDifference = differenceInMinutes(currentDate, postDate);
    const hoursDifference = differenceInHours(currentDate, postDate);
    const daysDifference = differenceInDays(currentDate, postDate);

    if (minutesDifference < 60) {
      return `${minutesDifference} phút trước`;
    } else if (hoursDifference < 24) {
      return `${hoursDifference} giờ trước`;
    } else if (daysDifference <= 30) {
      return `${daysDifference} ngày trước`;
    } else {
      return postDate.toLocaleDateString('vi-VN');
    }
  };
  //Like
  const handleLikeClick = async (cmtId) => {
    try {
      const cmt = comment.find(e => e._id === cmtId)
      if (cmt.likes.includes(user._id)) {
        // Optimistically update the UI
        cmt.likes = cmt.likes.filter(id => id !== user._id)
        setComment([...comment])
        await handleUnLike(cmtId);
      } else {
        // Optimistically update the UI
        cmt.likes = [...cmt.likes, user._id]
        setComment([...comment])
        await handleLike(cmtId);
      }
    } catch (error) {
      console.error("Error liking the post:", error);
    }
  }

  const handleReply = () => {
    setOpen(!open)
  }

  //


  return (
    <div>

      <div className='mt-3 border-[1px] rounded-xl grid gap-5'>
        {comment.map((e) => (

          <div key={e._id} className="bg-card dark:bg-card-foreground p-4 rounded-lg rounded-b-none border-b-2 ">
            <div className=' '>
              <div className="flex items-center gap-2 ">
                {/* <img className="h-12 w-12 rounded-full mr-4" src="https://placehold.co/50x50" alt="user-avatar" /> */}
                <AVTUser user={e?.author} />
                <div>
                  <h3 className="text-lg font-semibold">{e?.author?.lastName} {e?.author?.firstName}</h3>
                  <p className="text-sm text-muted-foreground">{formatDate(e.createdAt)}</p>
                </div>
              </div>
              <p className="text-base mt-4">{e?.content}</p>
              <div className="flex items-center justify-between mt-4">
                <div className='flex gap-1'>
                  <span>{e?.likes?.length}</span>
                  <button onClick={() => handleLikeClick(e?._id)} className={"flex items-end gap-1"}>
                    {e?.likes?.includes(user._id)
                      ? <div className='text-blue-700 animate__heartBeat'>Like</div>
                      : <div className='text-gray-700 '>Like</div>
                    }
                  </button>

                </div>
                <button onClick={handleReply} className="text-secondary">Phản hồi</button>
              </div>
            </div>
            <FormReply open={open} keycmt={e?.author} />
            {e?.replyTo?.length > 0 && (
              <div>123</div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
