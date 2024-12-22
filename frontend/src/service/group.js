import axios from 'axios';
import authToken from '../components/authToken';
import Apiuri from './apiuri';
const url = Apiuri()
const createGroup = async (groupName, members) => {
    try {
        const response = await axios.post(`${url}/chat/creategroup`, {
            name: groupName,
            participants: members
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

const getMyListChat = async () => {
    // if(!iduser){
    //     return { success: false};
    // }

    try {
        const response = await axios.get(`${url}/chat/getMylistChat`,
            {
                headers: { Authorization: `Bearer ${authToken.getToken()}` },
            }
        );
        return { success: true, data: response.data };
    } catch (response) {
        return { success: false, data: response.response.data.message };
    }
};
const getMemberIngroup = async (idgr) => {
    if (!idgr) {
        return { success: false };
    }

    try {
        const response = await axios.get(`${url}/chat/MembersGroup/${idgr}`,
            {
                headers: { Authorization: `Bearer ${authToken.getToken()}` },
            }
        );
        return { success: true, data: response.data };
    } catch (response) {
        return { success: false, data: response.response.data.message };
    }
};
const getMessengerGroup = async (idgr) => {
    if (!idgr) {
        return { success: false };
    }

    try {
        const response = await axios.get(`${url}/chat/getmessagegroup/${idgr}`,
            {
                headers: { Authorization: `Bearer ${authToken.getToken()}` },
            }
        );
        return { success: true, data: response.data };
    } catch (response) {
        return { success: false, data: response.response.data.message };
    }
};
const sendMessGroup = async (idgroup, message, file) => {
    try {
        const formData = new FormData();
        formData.append('content', message); // Thêm nội dung tin nhắn

        if (file) {
            formData.append('files', file); // Đảm bảo tên trường là 'files' (khớp với backend)
        }

        const response = await axios.post(
            `${url}/chat/sendmessagetoGroup/${idgroup}`,
            formData,
            {
                headers: {
                    'Authorization': `Bearer ${authToken.getToken()}`,
                    'Content-Type': 'multipart/form-data',
                },
            }
        );

        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, data: error.response ? error.response.data.message : 'An error occurred' };
    }
};
///chat/MembersGroup/{idgr}
//getmessagestouser
export default {
    createGroup,
    getMyListChat,
    getMemberIngroup,
    getMessengerGroup,
    sendMessGroup,
}