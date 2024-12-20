import axios from 'axios';
import authToken from '../components/authToken';
const getListMessenger = async (iduser, message) => {
    try {
        const response = await axios.get(`http://localhost:3001/chat/getMylistChat`,
            {
                headers: { Authorization: `Bearer ${authToken.getToken()}` },
            }
        );
        return { success: true, data: response.data };
    } catch (response) {
        return { success: false, data: response.response.data.message };
    }
};
const sendMess = async (iduser, message) => {
    try {
        const response = await axios.post(`http://localhost:3001/chat/sendmessageToUser/${iduser}`,
            {
                files :'',
                content:message
            },
            {
                headers: { Authorization: `Bearer ${authToken.getToken()}` },
            }
        );

        return { success: true, data: response.data };
    } catch (response) {
        return { success: false, data: response.response.data.message };
    }
};
//getMylistChat
export default {
    sendMess,
    getListMessenger,
}