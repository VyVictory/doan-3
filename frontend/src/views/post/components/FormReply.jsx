import React from 'react'

export default function FormReply({ open, keycmt }) {
    return (
        <>
            {open === true && (
                <label className="form-control">
                    <textarea className="textarea focus:outline-none textarea-bordered rounded-b-none h-24 resize-none" placeholder={`Phản hồi @${keycmt?.lastName} ${keycmt?.firstName}`}>
                    </textarea>
                    <button className="btn btn-outline rounded-t-none btn-info ">Gửi</button>
                </label>
            )}
        </>
    )
}
