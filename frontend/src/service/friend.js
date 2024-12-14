import axios from 'axios';
import authToken from '../components/authToken';
const AddFriend = async (id) => {
    try {
        const response = await axios.post(`http://localhost:3001/user/friendrequest/${id}`, {},
            {
                headers: { Authorization: `Bearer ${authToken.getToken()}` },
            }
        );
        if (response.data) {
            return { success: true, data: response.data, message: 'đã gửi yêu cầu kết bạn thành công' };
        } else {
            return { success: false, message: 'ôi không có lỗi gì đó' };
        }
    } catch (response) {
        return { success: false, message: response.response.data.message };
    }
};
const getListFriendRequest = async () => {
    try {
        const response = await axios.get(``);
        return { success: true, data: response.data };
    } catch (response) {
        return { success: false, data: response.response.data.message };
    }
};
export default {
    AddFriend,
    getListFriendRequest,
}