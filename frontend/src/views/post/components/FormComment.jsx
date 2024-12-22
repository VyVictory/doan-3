import React from 'react'

export default function FormComment() {
    return (
        <label className="form-control">
            <div className="label">
                <span className="label-text">Bình luận</span>

            </div>

            <textarea className="textarea textarea-bordered h-24 resize-none" placeholder="Viết bình luận...">
            </textarea>
            <button className="btn btn-outline btn-info ">Gửi</button>
        </label>
    )
}
