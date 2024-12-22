import axios from "axios";
import authToken from "../components/authToken";
import Apiuri from './apiuri';
const url = Apiuri();

export async function changepass(currentPassword, newPassword) {
    try {
        const request = await axios.put(`${url}/user/change-password`, { currentPassword, newPassword }, {
            headers: {
                Authorization: `Bearer ${authToken.getToken()}`
            }
        });
        return request;
    } catch (error) {
        if (error.response && error.response.data) {
            return error.response.data;
        } else {
            return { error: "An unknown error occurred" };
        }
    }
}