import axios from "axios";
import authToken from "../components/authToken";
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
    const request = await axios.put(`http://localhost:3001/post/${postId}/like`, {}, {
        headers: {
            Authorization: `Bearer ${authToken.getToken()}`
        }
    })
    return request
}