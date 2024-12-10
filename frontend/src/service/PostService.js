import axios from "axios";
import authToken from "../components/authToken";

//post user current
export async function getPostPersonal() {
    const request = await axios.get(`http://localhost:3001/post/crpost`,
        {
            headers: {
                Authorization: `Bearer ${authToken.getToken()}`, // Use your auth token provider
                'Content-Type': 'application/json'
            }
        }
    )
    return request.data
}
//Like
export async function handleLike(postId) {
    const request = await axios.put(`http://localhost:3001/post/${postId}/like`, {}, {
        headers: {
            Authorization: `Bearer ${authToken.getToken()}`
        }
    })
    return request
}
// Dislike
export async function handleDisLike(postId) {
    const request = await axios.put(`http://localhost:3001/post/${postId}/dislike`, {}, {
        headers: {
            Authorization: `Bearer ${authToken.getToken()}`
        }
    })
    return request
}
