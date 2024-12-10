import axios from "axios";
import authToken from "../components/authToken";
export async function profileUserCurrent() {
    var request = await axios.get(`http://localhost:3001/user/current`, {
        headers: {
            Authorization: `Bearer ${authToken.getToken()}`
        }
    })
    return request.data
}