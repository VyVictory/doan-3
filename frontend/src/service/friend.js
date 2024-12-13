import axios from 'axios';
import authToken from '../components/authToken';
const AddFriend = async (id) => {
    if (!authToken.getToken()) {
        return { success: false, message: 'ko có token má' }
    }
    try {
        const response = await axios.post(`http://localhost:3001/friend/request/${id}`, {},
            {
                headers: { Authorization: `Bearer ${authToken.getToken()}` },
            }
        );
        return { success: true, message: response.data.message };
    } catch (response) {
        return { success: false, message: response.response.data.message };
    }
};
const CheckFriend = async (id) => {
    if (!authToken.getToken()) {
        return { success: false, message: 'ko có token má' }
    }
    try {
        const response = await axios.post(`http://localhost:3001/friend/status/${id}`, {},
            {
                headers: { Authorization: `Bearer ${authToken.getToken()}` },
            }
        );
        return { success: true};
    } catch (response) {
        return { success: false };
    }
};
// const login = async (form) => {
//     try {
//         const response = await axios.post("http://localhost:3001/auth/login", {
//             "username": form.username,
//             "password": form.password,
//         });
//         authToken.setToken(response.data.accessToken)
//         return { success: true, message: response.message };
//     } catch (response) {
//         return {
//             success: false, message: response.response.data.message, data: {
//                 "username": form.username,
//                 "password": form.password,
//             }
//         };
//     }
// };
// const current = async () => {
//     let token = authToken.getToken()
//     if (authToken.getToken()) {
//         try {
//             const response = await axios.get("http://localhost:3001/auth/current", {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             return { success: true, user: response.data };
//         } catch (error) {
//             return { success: false, token: token };
//         }
//     } else {
//         return { success: false,mess:'not token', token: token };
//     }

// };
// const response = await axios.post("http://localhost:3001/api/chat", data, {
//     headers: { Authorization: `Bearer ${token}` },
// });
export default {
    AddFriend,
    CheckFriend,
    // login,
    // current,
}