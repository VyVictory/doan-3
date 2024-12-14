import axios from 'axios';
import authToken from '../components/authToken';
const getAllUser = async (id) => {
    try {
        const response = await axios.get(`http://localhost:3001/user/getAllUser`);
        return { success: true, data: response.data };
    } catch (response) {
        return { success: false, data: response.response.data.message };
    }
};
export default {
    getAllUser,
}